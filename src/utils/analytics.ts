import { AnalyticsEventLog } from '../types';

type Listener = (event: AnalyticsEventLog) => void;

class AnalyticsManager {
  private events: AnalyticsEventLog[] = [];
  private listeners: Listener[] = [];
  private ga4Id: string = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-FPVUT2026MOCK';
  private clarityId: string = import.meta.env.VITE_CLARITY_PROJECT_ID || 'CLARITY-FPVUT-MOCK';

  constructor() {
    // Initial page view event
    this.trackEvent('page_view', {
      page_title: 'FP DROP — Student Streetwear FP VUT',
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }

  public getGa4Id(): string {
    return this.ga4Id;
  }

  public getClarityId(): string {
    return this.clarityId;
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
        measurement_id: this.ga4Id,
        currency: params.currency || 'CZK',
        client_timestamp: new Date().toISOString()
      }
    };

    this.events.unshift(event);
    if (this.events.length > 100) {
      this.events.pop();
    }

    // Call dataLayer if present in window (standard GA4 behavior)
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (win.dataLayer) {
        win.dataLayer.push({
          event: eventName,
          ecommerce: params,
          ...params
        });
      }
    }

    // Notify listeners (UI debuggers)
    this.listeners.forEach(l => l(event));
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
