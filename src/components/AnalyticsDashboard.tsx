import React, { useState, useEffect } from 'react';
import { MOCK_DASHBOARD_DATA, PPC_STRATEGY } from '../data/marketing';
import { analytics } from '../utils/analytics';
import { AnalyticsEventLog } from '../types';
import { BarChart3, TrendingUp, ShoppingBag, Users, Activity, DollarSign, Eye, RefreshCw, Trash2, ArrowUpRight, Search } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [events, setEvents] = useState<AnalyticsEventLog[]>(analytics.getEvents());
  const [selectedEvent, setSelectedEvent] = useState<AnalyticsEventLog | null>(null);
  const [eventFilter, setEventFilter] = useState<string>('');

  useEffect(() => {
    const unsubscribe = analytics.subscribe(newEvt => {
      setEvents(analytics.getEvents());
    });
    return unsubscribe;
  }, []);

  const { summary, trafficSources, topProducts, funnelSteps } = MOCK_DASHBOARD_DATA;

  const filteredEvents = eventFilter
    ? events.filter(e => e.eventName.toLowerCase().includes(eventFilter.toLowerCase()))
    : events;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <Activity size={14} className="text-white" />
            <span>EXECUTIVE E-COMMERCE INTELLIGENCE</span>
            <span aria-hidden="true">·</span>
            <span>GA4 & META ADS METRICS</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl md:text-4xl uppercase tracking-tight text-white">
            E-COMMERCE KPI DASHBOARD
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 mt-2 font-mono">
            Měření výkonnosti pro akademický projekt FP VUT. Integrovaná GA4 architektura a simulace Meta Ads.
          </p>
        </div>

        {/* System IDs */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <div className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 text-neutral-300">
            GA4: <span className="text-white font-bold">{analytics.getGa4Id()}</span>
          </div>
          <div className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 text-neutral-300">
            CLARITY: <span className="text-white font-bold">{analytics.getClarityId()}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <div className="p-4 bg-neutral-950 border border-neutral-800">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">CELKOVÉ TRŽBY</div>
          <div className="font-mono text-xl font-bold text-white mt-1 tabular-nums">
            {summary.revenue.toLocaleString()} Kč
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp size={11} /> {summary.revenueChange}
          </div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">OBJEDNÁVKY</div>
          <div className="font-mono text-xl font-bold text-white mt-1 tabular-nums">
            {summary.orders}
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp size={11} /> {summary.ordersChange}
          </div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">KONVERZNÍ POMĚR</div>
          <div className="font-mono text-xl font-bold text-white mt-1 tabular-nums">
            {summary.conversionRate}%
          </div>
          <div className="text-[10px] font-mono text-neutral-400 mt-1">E-commerce CVR</div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">PRŮMĚRNÁ OBJEDNÁVKA</div>
          <div className="font-mono text-xl font-bold text-white mt-1 tabular-nums">
            {summary.averageOrderValue} Kč
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1">{summary.averageOrderValueChange}</div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">ADD TO CART RATE</div>
          <div className="font-mono text-xl font-bold text-white mt-1 tabular-nums">
            {summary.addToCartRate}%
          </div>
          <div className="text-[10px] font-mono text-neutral-400 mt-1">814 košíků</div>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">OPUŠTĚNÉ KOŠÍKY</div>
          <div className="font-mono text-xl font-bold text-white mt-1 tabular-nums">
            {summary.cartAbandonmentRate}%
          </div>
          <div className="text-[10px] font-mono text-neutral-400 mt-1">Remarketováno</div>
        </div>
      </div>

      {/* Main Grid: Funnel + Traffic + PPC Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left: Conversion Funnel */}
        <div className="lg:col-span-6 bg-neutral-950 border border-neutral-800 p-6">
          <h3 className="font-display font-bold text-sm uppercase text-white mb-4 flex items-center justify-between">
            <span>E-COMMERCE NÁKUPNÍ FUNNEL</span>
            <span className="text-[11px] font-mono text-neutral-400">8 304 NÁVŠTĚV</span>
          </h3>

          <div className="space-y-4">
            {funnelSteps.map((step, idx) => (
              <div key={step.step} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-300">{step.step}</span>
                  <span className="text-white font-bold tabular-nums">
                    {step.count.toLocaleString()} ({step.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-900 h-2">
                  <div
                    className="bg-white h-full transition-all duration-500"
                    style={{ width: `${step.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900 text-[11px] font-mono text-neutral-400 leading-relaxed">
            <strong>Analýza:</strong> Největší drop-off nastává mezi zobrazením produktu a přidáním do košíku (58.9% → 9.8%). Pro zkouškové období zavádíme dynamic scarcity badge („Zbývají 4 kusy“) a přímou slevu pro prváky PRVAK10.
          </div>
        </div>

        {/* Right: Traffic Sources Breakdown */}
        <div className="lg:col-span-6 bg-neutral-950 border border-neutral-800 p-6">
          <h3 className="font-display font-bold text-sm uppercase text-white mb-4">
            ZDROJE NÁVŠTĚVNOSTI (ACQUISITION)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="pb-2">KANÁL</th>
                  <th className="pb-2">PODÍL</th>
                  <th className="pb-2">NÁVŠTĚVY</th>
                  <th className="pb-2">TRŽBY</th>
                  <th className="pb-2">CVR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {trafficSources.map(ts => (
                  <tr key={ts.source}>
                    <td className="py-2.5 font-bold text-white">{ts.source}</td>
                    <td className="py-2.5">{ts.percentage}%</td>
                    <td className="py-2.5 tabular-nums">{ts.visits}</td>
                    <td className="py-2.5 font-bold text-white tabular-nums">{ts.revenue.toLocaleString()} Kč</td>
                    <td className="py-2.5 tabular-nums text-emerald-400">{ts.convRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900 flex justify-between items-center text-xs font-mono text-neutral-400">
            <span>Dominantní kanál: <strong>Instagram (54 %)</strong></span>
            <span>Meta Ads ROAS: <strong className="text-white">4.8x</strong></span>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-neutral-950 border border-neutral-800 p-6 mb-12">
        <h3 className="font-display font-bold text-sm uppercase text-white mb-4">
          TOP PRODÁVANÉ PRODUKTY
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="pb-2">PRODUKT</th>
                <th className="pb-2">PRODANÉ KUSY</th>
                <th className="pb-2">TRŽBY V CZK</th>
                <th className="pb-2">ZOBRAZENÍ DETAILU</th>
                <th className="pb-2">MÍRA NÁKUPU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 text-neutral-300">
              {topProducts.map(tp => (
                <tr key={tp.id}>
                  <td className="py-3 font-bold text-white">{tp.name}</td>
                  <td className="py-3 tabular-nums">{tp.salesCount} ks</td>
                  <td className="py-3 font-bold text-white tabular-nums">{tp.revenue.toLocaleString()} Kč</td>
                  <td className="py-3 tabular-nums">{tp.views}</td>
                  <td className="py-3 tabular-nums text-emerald-400">
                    {((tp.salesCount / tp.views) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time GA4 Debugger & Event Log Inspector */}
      <div className="bg-[#0b0b0b] border border-neutral-800 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-display font-bold text-sm uppercase text-white">
                LIVE GA4 EVENT INSPECTOR & LOG
              </h3>
            </div>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              Reálné události odesílané při kliknutí na webu (view_item, add_to_cart, purchase, atd.)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-2.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Filtrovat události..."
                value={eventFilter}
                onChange={e => setEventFilter(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 text-white text-xs pl-7 pr-3 py-1.5 font-mono focus:outline-none focus:border-neutral-500"
              />
            </div>
            <button
              onClick={() => analytics.clearEvents()}
              className="p-1.5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              title="Vymazat log"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Events List */}
          <div className="lg:col-span-6 space-y-1.5 max-h-96 overflow-y-auto pr-2">
            {filteredEvents.length === 0 ? (
              <div className="text-xs font-mono text-neutral-400 py-8 text-center">
                Žádné události neodpovídají filtru. Proveďte akci v obchodě (klikněte na produkt, přidejte do košíku).
              </div>
            ) : (
              filteredEvents.map(evt => (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`p-2.5 border text-xs font-mono cursor-pointer transition-colors flex items-center justify-between ${
                    selectedEvent?.id === evt.id
                      ? 'bg-neutral-800 border-white text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400">{evt.timestamp}</span>
                    <span className="font-bold text-white">{evt.eventName}</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 truncate max-w-[150px]">
                    {evt.params.item_name || evt.params.transaction_id || evt.params.page_title || ''}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Selected Event Payload JSON */}
          <div className="lg:col-span-6 bg-black border border-neutral-800 p-4 max-h-96 overflow-y-auto">
            <div className="text-[11px] font-mono text-neutral-400 uppercase mb-2">
              EVENT PAYLOAD (JSON SCHÉMA)
            </div>
            {selectedEvent ? (
              <pre className="text-xs font-mono text-emerald-400 overflow-x-auto">
                {JSON.stringify(selectedEvent, null, 2)}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-xs font-mono text-neutral-400">
                Vyberte událost ze seznamu vlevo pro zobrazení parametrů payloadu.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
