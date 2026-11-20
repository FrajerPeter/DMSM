import { AnalyticsEventLog } from '../types';

type Listener = (event: AnalyticsEventLog) => void;

class AnalyticsManager {
  private events: AnalyticsEventLog[] = [];
  private listeners: Listener[] = [];
  private ga4Id = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() || '';
  private clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim() || '';
  private initialized = false;

  constructor() {
    // Initial page view event
    this.trackEvent('page_view', {
      page_title: 'FP DROP — Student Streetwear FP VUT',
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }

  public getGa4Id(): string {
    return this.ga4Id || 'NENASTAVENÉ';
  }

  public getClarityId(): string {
    return this.clarityId || 'NENASTAVENÉ';
  }

  public getClarityStatus(): string {
    if (!this.isConfigured('clarity')) return 'nenastavené';
    if (!this.initialized) return 'čaká na súhlas';
    const script = document.querySelector<HTMLScriptElement>(`script[data-fp-clarity="${this.clarityId}"]`);
    if (!script) return 'načítava sa';
    if (script.dataset.fpClarityState === 'loaded') return 'načítané';
    if (script.dataset.fpClarityState === 'error') return 'zablokované';
    return 'načítava sa';
  }

  public hasConfiguredProviders(): boolean {
    return this.isConfigured('ga4') || this.isConfigured('clarity');
  }

  public isConfigured(provider: 'ga4' | 'clarity'): boolean {
    return provider === 'ga4'
      ? /^G-[A-Z0-9]+$/i.test(this.ga4Id)
      : /^[a-z0-9]{10}$/i.test(this.clarityId);
  }

  public initialize(consentGranted: boolean): void {
    if (!consentGranted || this.initialized) return;

    if (this.isConfigured('ga4')) {
      const win = window as any;
      win.dataLayer = win.dataLayer || [];
      win.gtag = win.gtag || function gtag(...args: unknown[]) { win.dataLayer.push(args); };
      win.gtag('js', new Date());
      win.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      win.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      win.gtag('config', this.ga4Id, { send_page_view: false, allow_google_signals: false });

      if (!document.querySelector(`script[data-fp-ga4="${this.ga4Id}"]`)) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(this.ga4Id)}`;
        script.dataset.fpGa4 = this.ga4Id;
        document.head.appendChild(script);
      }
    }

    if (this.isConfigured('clarity')) {
      const win = window as any;
      if (!win.clarity) {
        const clarity = (...args: unknown[]) => { (clarity as any).q.push(args); };
        (clarity as any).q = [];
        win.clarity = clarity;
      }
      // Queue consent before the async Clarity script can start collecting.
      win.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });
      if (!document.querySelector(`script[data-fp-clarity="${this.clarityId}"]`)) {
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = `https://www.clarity.ms/tag/${encodeURIComponent(this.clarityId)}`;
        script.dataset.fpClarity = this.clarityId;
        script.dataset.fpClarityState = 'loading';
        script.addEventListener('load', () => { script.dataset.fpClarityState = 'loaded'; }, { once: true });
        script.addEventListener('error', () => {
          script.dataset.fpClarityState = 'error';
          console.error('[FP DROP] Microsoft Clarity did not load. Check the project ID and browser tracker blocking.');
        }, { once: true });
        const firstScript = document.getElementsByTagName('script')[0];
        if (firstScript?.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
        else document.head.appendChild(script);
      }
    }

    this.initialized = this.isConfigured('ga4') || this.isConfigured('clarity');
    // Never backfill behavior collected before consent; send only the initial page view.
    const initialPageView = [...this.events].reverse().find(event => event.eventName === 'page_view');
    if (initialPageView) this.sendToProviders(initialPageView.eventName, initialPageView.params);
  }

  public revokeConsent(): void {
    const win = window as any;
    if (win.gtag) win.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    if (win.clarity) win.clarity('consent', false);
    if (win.clarity) win.clarity('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
    this.initialized = false;
  }

  public getEvents(): AnalyticsEventLog[] {
    return [...this.events];
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public trackEvent(eventName: string, params: Record<string, any> = {}): void {
    const event: AnalyticsEventLog = {
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString('cs-CZ', { hour12: false }),
      eventName,
      params: {
        ...params,
        currency: params.currency || 'CZK',
        client_timestamp: new Date().toISOString()
      }
    };

    this.events.unshift(event);
    if (this.events.length > 100) {
      this.events.pop();
    }

    this.sendToProviders(eventName, event.params);

    // Notify listeners (UI debuggers)
    this.listeners.forEach(l => l(event));
  }

  private sendToProviders(eventName: string, params: Record<string, any>): void {
    if (!this.initialized || typeof window === 'undefined') return;
    // Prototype checkout and newsletter forms are not completed transactions or signups.
    if (eventName === 'purchase' || eventName === 'demo_order_completed' || eventName === 'newsletter_signup' || eventName === 'newsletter_form_submit_demo') return;
    const win = window as any;
    if (this.isConfigured('ga4') && typeof win.gtag === 'function') {
      win.gtag('event', eventName, { ...params, send_to: this.ga4Id });
    }
    if (this.isConfigured('clarity') && typeof win.clarity === 'function') {
      // Clarity records sessions automatically; custom events make SPA actions
      // such as switching views and opening articles searchable in its dashboard.
      const clarityEvent = eventName.replace(/[^a-z0-9_-]/gi, '_').slice(0, 50);
      if (clarityEvent) win.clarity('event', clarityEvent);
    }
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
