import type { HtmlTagDescriptor, Plugin } from 'vite';

/**
 * Vite plugin: vloží sledovacie skripty Google Analytics 4 a Microsoft Clarity
 * do <head> index.html — v dev režime (localhost) aj v produkčnom builde.
 * Keďže ide o SPA, všetky stránky (/, /shop, /blog, /blog/<slug> …) zdieľajú tento <head>.
 *
 * Konfigurácia v `.env` (alebo `.env.local`) v koreni projektu:
 *   GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *   CLARITY_PROJECT_ID=xxxxxxxxxx
 *   ANALYTICS_REQUIRE_CONSENT=true   # false = bez lišty so súhlasom (napr. pri testovaní)
 *   ANALYTICS_DEBUG=false            # true = GA4 debug_mode (udalosti v GA4 DebugView)
 * Kvôli spätnej kompatibilite fungujú aj VITE_GA4_MEASUREMENT_ID a VITE_CLARITY_PROJECT_ID.
 */

export interface AnalyticsEnvConfig {
  ga4Id: string;
  clarityId: string;
  requireConsent: boolean;
  debug: boolean;
}

const GA4_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;
const CLARITY_ID_PATTERN = /^[a-z0-9]{6,20}$/;

const isTrue = (value: string | undefined, fallback: boolean) =>
  value === undefined || value.trim() === '' ? fallback : /^(1|true|yes|on)$/i.test(value.trim());

export function resolveAnalyticsConfig(env: Record<string, string>): AnalyticsEnvConfig {
  const rawGa = (env.GA_MEASUREMENT_ID || env.VITE_GA4_MEASUREMENT_ID || '').trim().toUpperCase();
  const rawClarity = (env.CLARITY_PROJECT_ID || env.VITE_CLARITY_PROJECT_ID || '').trim().toLowerCase();

  // Validácia zabraňuje vloženiu ľubovoľného textu do HTML a odhalí preklepy v ID.
  if (rawGa && !GA4_ID_PATTERN.test(rawGa)) {
    console.warn(`[analytics] GA_MEASUREMENT_ID "${rawGa}" nemá formát G-XXXXXXXXXX — GA4 sa nenačíta.`);
  }
  if (rawClarity && !CLARITY_ID_PATTERN.test(rawClarity)) {
    console.warn(`[analytics] CLARITY_PROJECT_ID "${rawClarity}" nemá platný formát — Clarity sa nenačíta.`);
  }

  return {
    ga4Id: GA4_ID_PATTERN.test(rawGa) ? rawGa : '',
    clarityId: CLARITY_ID_PATTERN.test(rawClarity) ? rawClarity : '',
    requireConsent: isTrue(env.ANALYTICS_REQUIRE_CONSENT, true),
    debug: isTrue(env.ANALYTICS_DEBUG, false)
  };
}

export function analyticsHeadPlugin(config: AnalyticsEnvConfig): Plugin {
  return {
    name: 'fp-drop-analytics-head',
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [];
      const { ga4Id, clarityId, requireConsent, debug } = config;

      // Spoločná konfigurácia pre aplikáciu + predvolený stav súhlasu (uložená voľba sa načíta hneď,
      // takže po obnovení stránky nedochádza k prepínaniu denied → granted).
      tags.push({
        tag: 'script',
        injectTo: 'head-prepend',
        children:
          `window.__FP_ANALYTICS__=${JSON.stringify({ ga4Id, clarityId, requireConsent })};` +
          `window.__FP_ANALYTICS__.granted=!window.__FP_ANALYTICS__.requireConsent||(function(){try{return localStorage.getItem('fp-drop-analytics-consent')==='granted'}catch(e){return false}})();`
      });

      if (ga4Id) {
        tags.push(
          {
            tag: 'script',
            injectTo: 'head-prepend',
            attrs: {
              async: true,
              src: `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`,
              'data-fp-ga4': ga4Id,
              onload: "this.dataset.fpGa4State='loaded'",
              onerror: "this.dataset.fpGa4State='error';console.error('[FP DROP] Google Analytics sa nenačítal (blokovanie sledovania v prehliadači?)')"
            }
          },
          {
            tag: 'script',
            injectTo: 'head-prepend',
            children: [
              'window.dataLayer=window.dataLayer||[];',
              'function gtag(){dataLayer.push(arguments);}',
              "var __fpGranted=window.__FP_ANALYTICS__.granted?'granted':'denied';",
              "gtag('consent','default',{analytics_storage:__fpGranted,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});",
              "gtag('js',new Date());",
              // page_view posiela aplikácia pri každej zmene URL (SPA), preto send_page_view:false.
              `gtag('config','${ga4Id}',${JSON.stringify({ send_page_view: false, allow_google_signals: false, ...(debug ? { debug_mode: true } : {}) })});`
            ].join('')
          }
        );
      }

      if (clarityId) {
        tags.push({
          tag: 'script',
          injectTo: 'head-prepend',
          children: [
            // Oficiálny Clarity snippet, doplnený o stav načítania pre debug panel.
            '(function(c,l,a,r,i,t,y){',
            'c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};',
            't=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;',
            't.setAttribute("data-fp-clarity",i);t.setAttribute("data-fp-clarity-state","loading");',
            't.onload=function(){t.setAttribute("data-fp-clarity-state","loaded")};',
            't.onerror=function(){t.setAttribute("data-fp-clarity-state","error");console.error("[FP DROP] Microsoft Clarity sa nenačítal (blokovanie sledovania v prehliadači?)")};',
            'y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);',
            `})(window,document,"clarity","script","${clarityId}");`,
            "clarity('consentv2',{ad_Storage:'denied',analytics_Storage:window.__FP_ANALYTICS__.granted?'granted':'denied'});"
          ].join('')
        });
      }

      return tags;
    }
  };
}
