import { AnalyticsEventLog } from '../types';

/**
 * Analytika FP DROP — Google Analytics 4 + Microsoft Clarity.
 *
 * Samotné sledovacie skripty (gtag.js a Clarity tag) vkladá do <head> každej stránky
 * Vite plugin vo `vite.config.ts` podľa premenných GA_MEASUREMENT_ID a CLARITY_PROJECT_ID
 * zo súboru `.env`. Tento modul už iba:
 *   - posiela page_view pri každej zmene URL (SPA),
 *   - sleduje kliknutia na odkazy/tlačidlá (ui_click) a hĺbku scrollu (scroll_depth),
 *   - prepína súhlas (Consent Mode v2 pre GA4, consentv2 pre Clarity),
 *   - drží lokálny log udalostí pre debug panel v prípadovej štúdii.
 */

export const CONSENT_STORAGE_KEY = 'fp-drop-analytics-consent';

interface AnalyticsRuntimeConfig {
  ga4Id: string;
  clarityId: string;
  requireConsent: boolean;
}

type Listener = (event: AnalyticsEventLog) => void;

const SCROLL_THRESHOLDS = [25, 50, 75, 90];
// Ukážkové formuláre (checkout, newsletter) nie sú skutočné nákupy ani registrácie.
const DEMO_ONLY_EVENTS = new Set(['purchase', 'demo_order_completed', 'newsletter_signup', 'newsletter_form_submit_demo']);

function readConfig(): AnalyticsRuntimeConfig {
  const cfg = (typeof window !== 'undefined' ? (window as any).__FP_ANALYTICS__ : undefined) || {};
  return {
    ga4Id: typeof cfg.ga4Id === 'string' ? cfg.ga4Id : '',
    clarityId: typeof cfg.clarityId === 'string' ? cfg.clarityId : '',
    requireConsent: cfg.requireConsent !== false
  };
}

class AnalyticsManager {
  private events: AnalyticsEventLog[] = [];
  private listeners: Listener[] = [];
  private config = readConfig();
  private currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  private scrollSent = new Set<number>();
  private scrollTicking = false;
  private ignoreScrollUntil = 0;

  constructor() {
    if (typeof window === 'undefined') return;
    document.addEventListener('click', this.handleClick, { capture: true });
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  // ---------- konfigurácia a stav ----------

  public getGa4Id(): string {
    return this.config.ga4Id || 'NENASTAVENÉ';
  }

  public getClarityId(): string {
    return this.config.clarityId || 'NENASTAVENÉ';
  }

  public isConfigured(provider: 'ga4' | 'clarity'): boolean {
    return provider === 'ga4' ? Boolean(this.config.ga4Id) : Boolean(this.config.clarityId);
  }

  public hasConfiguredProviders(): boolean {
    return this.isConfigured('ga4') || this.isConfigured('clarity');
  }

  public requiresConsent(): boolean {
    return this.config.requireConsent;
  }

  public getClarityStatus(): string {
    if (!this.isConfigured('clarity')) return 'nenastavené';
    const script = document.querySelector<HTMLScriptElement>('script[data-fp-clarity]');
    const state = script?.dataset.fpClarityState;
    if (state === 'loaded') return 'načítané';
    if (state === 'error') return 'zablokované';
    return 'načítava sa';
  }

  public getGa4Status(): string {
    if (!this.isConfigured('ga4')) return 'nenastavené';
    const script = document.querySelector<HTMLScriptElement>('script[data-fp-ga4]');
    const state = script?.dataset.fpGa4State;
    if (state === 'loaded') return 'načítané';
    if (state === 'error') return 'zablokované';
    return 'načítava sa';
  }

  // ---------- súhlas ----------

  /** Udelenie súhlasu: GA4 začne používať cookies, Clarity plnohodnotne nahráva. */
  public initialize(consentGranted: boolean): void {
    if (!consentGranted) return;
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    }
    if (typeof win.clarity === 'function') {
      win.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });
    }
  }

  public revokeConsent(): void {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    }
    if (typeof win.clarity === 'function') {
      win.clarity('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
    }
  }

  // ---------- udalosti ----------

  /** page_view pre SPA — volá sa pri každej zmene URL (GA4 má send_page_view: false). */
  public trackPageView(path: string, title: string, viewName: string): void {
    this.currentPath = path;
    this.scrollSent.clear();
    // Po zmene stránky sa okno posúva hore — tento posun nepočítame ako scroll používateľa.
    this.ignoreScrollUntil = Date.now() + 1000;
    const win = window as any;
    if (typeof win.clarity === 'function') win.clarity('set', 'page', path);
    this.trackEvent('page_view', {
      page_location: `${window.location.origin}${path}`,
      page_path: path,
      page_title: title,
      page_view_name: viewName
    });
  }

  public trackEvent(eventName: string, params: Record<string, any> = {}): void {
    const enriched: Record<string, any> = { ...params, client_timestamp: new Date().toISOString() };
    if (enriched.value !== undefined || enriched.price !== undefined) enriched.currency = params.currency || 'CZK';

    const event: AnalyticsEventLog = {
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString('cs-CZ', { hour12: false }),
      eventName,
      params: enriched
    };

    this.events.unshift(event);
    if (this.events.length > 100) this.events.pop();

    this.sendToProviders(eventName, enriched);
    this.listeners.forEach(l => l(event));
  }

  private sendToProviders(eventName: string, params: Record<string, any>): void {
    if (typeof window === 'undefined' || DEMO_ONLY_EVENTS.has(eventName)) return;
    const win = window as any;
    if (this.isConfigured('ga4') && typeof win.gtag === 'function') {
      // Consent Mode v2 rozhodne, či GA4 použije cookies (po súhlase) alebo pošle anonymný ping.
      win.gtag('event', eventName, { ...params, send_to: this.config.ga4Id });
    }
    if (this.isConfigured('clarity') && typeof win.clarity === 'function' && eventName !== 'page_view') {
      // Clarity nahráva relácie automaticky; vlastné udalosti umožnia filtrovať nahrávky podľa akcií.
      const clarityEvent = eventName.replace(/[^a-z0-9_-]/gi, '_').slice(0, 50);
      if (clarityEvent) win.clarity('event', clarityEvent);
    }
  }

  // ---------- automatické sledovanie kliknutí a scrollu ----------

  private handleClick = (e: MouseEvent): void => {
    const target = (e.target as Element | null)?.closest?.('a, button, [role="button"]') as HTMLElement | null;
    if (!target || target.closest('[data-analytics-ignore]')) return;
    const rawLabel = target.dataset.analyticsLabel || target.getAttribute('aria-label') || target.textContent || '';
    const label = rawLabel.replace(/\s+/g, ' ').trim().slice(0, 80);
    const href = target instanceof HTMLAnchorElement ? target.getAttribute('href') || '' : '';
    this.trackEvent('ui_click', {
      click_label: label || '(bez textu)',
      click_element: target.tagName.toLowerCase(),
      ...(href ? { link_url: href } : {}),
      page_path: this.currentPath
    });
  };

  private handleScroll = (): void => {
    if (this.scrollTicking || Date.now() < this.ignoreScrollUntil) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      this.scrollTicking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable < 200) return; // krátke stránky nemajú zmysel merať
      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !this.scrollSent.has(threshold)) {
          this.scrollSent.add(threshold);
          this.trackEvent('scroll_depth', { percent_scrolled: threshold, page_path: this.currentPath });
        }
      }
    });
  };

  // ---------- debug panel ----------

  public getEvents(): AnalyticsEventLog[] {
    return [...this.events];
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public clearEvents(): void {
    this.events = [];
    this.listeners.forEach(l => l({
      id: 'clear',
      timestamp: new Date().toLocaleTimeString('cs-CZ'),
      eventName: 'debug_log_cleared',
      params: {}
    }));
  }
}

export const analytics = new AnalyticsManager();
