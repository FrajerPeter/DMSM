import React, { useState } from 'react';
import { PERSONAS, TRIGGER_SYSTEM, STDC_FRAMEWORK, SOCIAL_POSTS, PPC_STRATEGY, TRACEABILITY_MATRIX } from '../data/marketing';
import { Printer, Download, BookOpen, Layers, Users, Zap, Compass, Share2, Target, BarChart2, ShieldCheck, ChevronRight } from 'lucide-react';

export const AcademicDossier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('intro');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-neutral-100">
      {/* Top Academic Control Header */}
      <div className="no-print border-b border-neutral-800 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
            <span>FAKULTA PODNIKATELSKÁ VUT V BRNĚ</span>
            <span aria-hidden="true">·</span>
            <span>AKADEMICKÝ DOKUMENT</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl uppercase tracking-tight text-white">
            PROJEKTOVÁ DOKUMENTACE & MARKETINGOVÁ STRATEGIE
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Kompletní zpráva splňující standardy závěrečných a semestrálních prací FP VUT.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shrink-0"
        >
          <Printer size={14} />
          <span>TISK / EXPORT DO PDF</span>
        </button>
      </div>

      {/* Navigation tabs for comfortable on-screen reading */}
      <div className="no-print flex flex-wrap gap-1.5 p-1 bg-neutral-950 border border-neutral-800 mb-8 font-mono text-xs overflow-x-auto">
        {[
          { id: 'intro', label: '1. Úvod & Titulní list' },
          { id: 'spec', label: '2. Specifikace & Trigger System' },
          { id: 'mobile', label: '3. Mobilní prototyp' },
          { id: 'personas', label: '4. Persony & Cílový segment' },
          { id: 'social', label: '5. Social Media (15 Postů / 5 Reels / 5 Stories)' },
          { id: 'ppc', label: '6. PPC Meta Ads (10k CZK / 3 A/B testy)' },
          { id: 'stdc', label: '7. Customer Journey & STDC' },
          { id: 'analytics', label: '8. GA4 & Microsoft Clarity' },
          { id: 'traceability', label: '9. Traceability Matrix' },
          { id: 'conclusion', label: '10. Závěr & Doporučení' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 text-xs transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DOCUMENT BODY */}
      <div className="space-y-12 text-sm leading-relaxed font-sans">
        {/* SECTION 1: TITLE PAGE & INTRODUCTION */}
        {(activeTab === 'intro' || typeof window !== 'undefined') && (
          <section className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 space-y-8">
            {/* Academic Title Block */}
            <div className="text-center border-b border-neutral-800 pb-10 space-y-4">
              <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                VYSOKÉ UČENÍ TECHNICKÉ V BRNĚ • FAKULTA PODNIKATELSKÁ
              </div>
              <div className="text-xs font-mono text-neutral-400">
                Ústav managementu & Ústav financí • Akademický rok 2025/2026
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white uppercase tracking-tight py-4">
                FP DROP
              </h2>
              <p className="text-base md:text-lg text-neutral-300 font-sans max-w-2xl mx-auto italic">
                Implementace moderního univerzitního streetwearového e-commerce brandu pro studenty Fakulty podnikatelské VUT v Brně: Od konceptu po digitální marketingový ekosystém
              </p>
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-neutral-400 max-w-lg mx-auto text-left">
                <div>
                  <span className="text-neutral-400 block">Akademický obor:</span>
                  <span className="text-white font-bold">Ekonomika a management (FP VUT)</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Předmět:</span>
                  <span className="text-white font-bold">Digitální marketing & E-commerce</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Typ projektu:</span>
                  <span className="text-white font-bold">Praktický marketingový projekt</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Lokalita a datum:</span>
                  <span className="text-white font-bold">Brno, 2026</span>
                </div>
              </div>
            </div>

            {/* Introduction prose */}
            <div className="space-y-4 max-w-3xl mx-auto text-neutral-300">
              <h3 className="font-display font-bold text-xl uppercase text-white mb-2">
                1. ÚVOD A ZDŮVODNĚNÍ ZVOLENÉHO ŘEŠENÍ
              </h3>
              <p>
                Tradiční univerzitní propagační textil na českých vysokých školách dlouhodobě trpí zásadním neduhem: vzniká jako úřední zakázka na nejlevnější propagační textil, postrádá estetické porozumění cílové skupině a po několika vypráních končí na dně skříně nebo jako oděv na spaní. Studenti se za něj v městském prostředí často stydí a nenosí jej dobrovolně.
              </p>
              <p>
                Projekt <strong>FP DROP</strong> představuje radikální změnu paradigmatu. Místo institucionálního reklamního suvenýru buduje <strong>autentický, prémiový studentský streetwear brand</strong> s kořeny v kultuře Fakulty podnikatelské VUT v Brně. Čerpá inspiraci z minimalistického a produktově orientovaného nakupování průkopníků moderního streetwearu (jako je Supreme.com) — jednoduchá navigace, čistá typografie, silný černobílý kontrast a především <strong>systém limitovaných dropů</strong>.
              </p>
              <p>
                Tento projekt není oficiálním e-shopem VUT, nýbrž nezávislým studentským konceptem navrženým v rámci semestrální práce, který demonstruje provázanost produktového vývoje, psychologických spouštěčů (Trigger System), zákaznické cesty (Customer Journey), STDC rámce a výkonnostních PPC kampaní v Meta Ads Manageru.
              </p>
            </div>
          </section>
        )}

        {/* SECTION 2: SPECIFICATION & TRIGGER SYSTEM */}
        {(activeTab === 'spec' || typeof window !== 'undefined') && (
          <section className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">KAPITOLA 2</span>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                SPECIFIKACE APLIKACE & TRIGGER SYSTEM
              </h3>
            </div>

            <div className="space-y-4 text-neutral-300">
              <p>
                Aplikace je navržena jako moderní Single Page Application (React, TypeScript, Tailwind CSS, Vite) s důrazem na bleskovou odezvu na mobilních zařízeních, protože více než 78 % cílového segmentu přichází přes sociální sítě (Instagram, TikTok).
              </p>

              <h4 className="font-display font-bold text-lg text-white mt-6">
                TRIGGER SYSTEM (SPÍNACÍ MECHANISMY NÁKUPU)
              </h4>
              <p className="text-xs font-mono text-neutral-400">
                Trigger System propojuje reálné životní momenty studenta FP s konkrétní UX reakcí na webu:
              </p>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-xs font-mono border-collapse text-left">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-900/50">
                      <th className="p-3">SPOUŠTĚČ (TRIGGER)</th>
                      <th className="p-3">KONTEXT STUDENTA</th>
                      <th className="p-3">REAKCE ZNAČKY & UX PRVEK</th>
                      <th className="p-3">MĚŘITELNÉ KPI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    {TRIGGER_SYSTEM.map(trig => (
                      <tr key={trig.id} className="hover:bg-neutral-900/30">
                        <td className="p-3 font-bold text-white">{trig.triggerName}</td>
                        <td className="p-3">{trig.studentContext}</td>
                        <td className="p-3 text-neutral-200">
                          <strong>{trig.brandResponse}</strong>
                          <div className="text-[11px] text-neutral-400 mt-0.5">{trig.uiTouchpoint}</div>
                        </td>
                        <td className="p-3 text-emerald-400">{trig.kpiMetric}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: MOBILE PROTOTYPE */}
        {(activeTab === 'mobile' || typeof window !== 'undefined') && (
          <section className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">KAPITOLA 3</span>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                PROTOTYP MOBILNÍ APLIKACE & BUSINESS PROFIL
              </h3>
            </div>

            <div className="space-y-4 text-neutral-300">
              <p>
                V souladu se zadáním (VS Code, Cursor, Lovable, Bolt.new) byl vyvinut responsivní mobilní prototyp, který simuluje budoucí nativní aplikaci <strong>FP DROP App</strong> (iOS / Android postavenou na React Native / Expo).
              </p>

              <h4 className="font-display font-bold text-base text-white">
                ARCHITEKTURA OBRAZOVEK MOBILNÍHO PROTOTYPU
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 bg-neutral-900 border border-neutral-800">
                  <strong className="text-white block mb-1">1. HOME (Úvodní obrazovka)</strong>
                  Hero banner probíhajícího dropu, countdown, new arrivals ticker a rychlý přístup ke katalogu.
                </div>
                <div className="p-4 bg-neutral-900 border border-neutral-800">
                  <strong className="text-white block mb-1">2. SHOP (Katalog)</strong>
                  2-sloupcový dotykový grid, rychlý výběr velikosti, filtrace kategorií (T-shirts, Hoodies, Doplňky).
                </div>
                <div className="p-4 bg-neutral-900 border border-neutral-800">
                  <strong className="text-white block mb-1">3. DROPS (Limitované edice)</strong>
                  Časová osa dropů (Drop 001 až 004), statusy LIVE / SOLD OUT / ARCHIVED a možnost nastavení připomenutí.
                </div>
                <div className="p-4 bg-neutral-900 border border-neutral-800">
                  <strong className="text-white block mb-1">4. WISHLIST (Oblíbené)</strong>
                  Ukládání kousků před spuštěním dropu jedním klepnutím na srdíčko.
                </div>
                <div className="p-4 bg-neutral-900 border border-neutral-800">
                  <strong className="text-white block mb-1">5. PROFILE & ORDERS (Profil)</strong>
                  Historie objednávek, sledování zásilky Zásilkovny, studentská věrnostní sleva.
                </div>
                <div className="p-4 bg-neutral-900 border border-neutral-800">
                  <strong className="text-white block mb-1">6. 1-CLICK CHECKOUT</strong>
                  Nativní Apple Pay / Google Pay integrace zkracující nákup na 10 sekund.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: PERSONAS */}
        {(activeTab === 'personas' || typeof window !== 'undefined') && (
          <section className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">KAPITOLA 4</span>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                CÍLOVÝ SEGMENT & PERSONY
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PERSONAS.map(p => (
                <div key={p.id} className="p-6 bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                      {p.id.toUpperCase()}
                    </span>
                    <h4 className="font-display font-bold text-lg text-white uppercase">{p.name}</h4>
                    <p className="text-xs font-mono text-neutral-400 mt-0.5">{p.title} ({p.age} let)</p>

                    <blockquote className="my-4 p-3 bg-black border-l-2 border-white text-xs italic text-neutral-300">
                      {p.quote}
                    </blockquote>

                    <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-4">
                      {p.bio}
                    </p>

                    <div className="space-y-2 text-xs font-mono pt-3 border-t border-neutral-800">
                      <div>
                        <strong className="text-neutral-400 block text-[10px]">HLAVNÍ TRIGGER:</strong>
                        <span className="text-white">{p.trigger}</span>
                      </div>
                      <div>
                        <strong className="text-neutral-400 block text-[10px]">NÁKUPNÍ NÁMITKA:</strong>
                        <span className="text-red-300">{p.objection}</span>
                      </div>
                      <div>
                        <strong className="text-neutral-400 block text-[10px]">KONVERZNÍ HÁČEK:</strong>
                        <span className="text-emerald-300">{p.conversionHook}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: SOCIAL MEDIA STRATEGY */}
        {(activeTab === 'social' || typeof window !== 'undefined') && (
          <section className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">KAPITOLA 5</span>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                STRATEGIE PRO SOCIÁLNÍ SÍTĚ (INSTAGRAM)
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Detailní plán obsahu: 15 příspěvků do feedu, 5 Reels videí a 5 Stories s definovanými STDC fázemi.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider">
                PŘEHLED 15 INSTAGRAM PŘÍSPĚVKŮ (POSTS)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                {SOCIAL_POSTS.filter(s => s.format === 'Post').map(p => (
                  <div key={p.id} className="p-4 bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-neutral-400 uppercase mb-1">
                        <span className="font-bold text-white">{p.id}</span>
                        <span className="text-emerald-400">{p.stdcStage}</span>
                      </div>
                      <h5 className="font-bold text-white text-xs uppercase mb-2">{p.title}</h5>
                      <p className="text-neutral-300 italic text-[11px] mb-2 font-sans">„{p.caption}“</p>
                      <div className="text-[11px] text-neutral-400">
                        <strong>Vizuál:</strong> {p.visualDescription}
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-neutral-800 flex justify-between text-[10px] text-neutral-400">
                      <span>CTA: {p.cta}</span>
                      <span className="text-white">{p.expectedMetrics}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider pt-6 border-t border-neutral-800">
                PŘEHLED 5 VIRÁLNÍCH REELS SCÉNÁŘŮ
              </h4>
              <div className="space-y-3 font-mono text-xs">
                {SOCIAL_POSTS.filter(s => s.format === 'Reel').map(r => (
                  <div key={r.id} className="p-4 bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-neutral-800 text-white font-bold">{r.id}</span>
                        <span className="text-emerald-400 font-bold uppercase">{r.stdcStage} FÁZE</span>
                        <span className="text-neutral-400">{r.title}</span>
                      </div>
                      <p className="text-neutral-300 mt-1 font-sans">{r.visualDescription}</p>
                      <p className="text-neutral-400 mt-1 italic font-sans">Caption: „{r.caption}“</p>
                    </div>
                    <div className="text-right shrink-0 flex flex-col justify-between">
                      <span className="text-white font-bold">{r.expectedMetrics}</span>
                      <span className="text-neutral-400 text-[11px]">CTA: {r.cta}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider pt-6 border-t border-neutral-800">
                PŘEHLED 5 STORIES FORMÁTŮ S INTERAKTIVNÍMI PRVKY
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                {SOCIAL_POSTS.filter(s => s.format === 'Story').map(st => (
                  <div key={st.id} className="p-3 bg-neutral-900 border border-neutral-800">
                    <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
                      <span className="text-white font-bold">{st.id}</span>
                      <span className="text-emerald-400">{st.stdcStage}</span>
                    </div>
                    <div className="font-bold text-white text-xs mb-1">{st.title}</div>
                    <p className="text-neutral-300 text-[11px] font-sans">{st.visualDescription}</p>
                    <div className="mt-2 pt-2 border-t border-neutral-800 text-[10px] text-neutral-400 flex justify-between">
                      <span>{st.cta}</span>
                      <span className="text-white">{st.expectedMetrics}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 6: PPC META ADS STRATEGY */}
        {(activeTab === 'ppc' || typeof window !== 'undefined') && (
          <section className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">KAPITOLA 6</span>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                PPC REKLAMA V META ADS MANAGER (10 000 CZK ROZPOČET)
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Struktura 4 kampaní v plném marketingovém trychtýři a 3 exaktní A/B experimenty.
              </p>
            </div>

            <div className="space-y-6">
              {/* Budget breakdown */}
              <div className="p-4 bg-neutral-900 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-neutral-400 block">CELKOVÝ MĚSÍČNÍ ROZPOČET:</span>
                  <span className="text-xl font-bold text-white">10 000 CZK</span>
                </div>
                <div className="flex gap-6">
                  <div>
                    <span className="text-neutral-400 block">Awareness (25 %):</span>
                    <span className="text-white font-bold">2 500 Kč</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Consideration (35 %):</span>
                    <span className="text-white font-bold">3 500 Kč</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Conversion (25 %):</span>
                    <span className="text-white font-bold">2 500 Kč</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Remarketing (15 %):</span>
                    <span className="text-white font-bold">1 500 Kč</span>
                  </div>
                </div>
              </div>

              {/* 4 Campaigns table */}
              <div className="space-y-4">
                {PPC_STRATEGY.campaigns.map(camp => (
                  <div key={camp.id} className="p-5 bg-neutral-900/60 border border-neutral-800 font-mono text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3 mb-3">
                      <div>
                        <span className="text-white font-bold text-sm">{camp.name}</span>
                        <span className="text-neutral-400 ml-2">({camp.stage})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-400">Rozpočet: <strong className="text-white">{camp.budgetCZK} Kč</strong></span>
                        <span className="text-emerald-400 font-bold">Cílové ROAS: {camp.kpis.roas}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong className="text-neutral-400 block text-[10px] uppercase mb-1">CÍLENÍ & AUDIENCE:</strong>
                        <div className="text-neutral-300">
                          <div>Lokace: {camp.targeting.locations.join(', ')}</div>
                          <div>Věk: {camp.targeting.age}</div>
                          <div>Zájmy: {camp.targeting.interests.join(', ') || 'Retargeting'}</div>
                          <div>Vlastní publika: {camp.targeting.customAudiences}</div>
                        </div>
                      </div>
                      <div>
                        <strong className="text-neutral-400 block text-[10px] uppercase mb-1">METRIKY & KPI:</strong>
                        <div className="grid grid-cols-2 gap-2 text-neutral-300">
                          <div>CTR: <strong className="text-white">{camp.kpis.ctr}</strong></div>
                          <div>CPC: <strong className="text-white">{camp.kpis.cpc}</strong></div>
                          <div>CVR: <strong className="text-white">{camp.kpis.cvr}</strong></div>
                          <div>CPA: <strong className="text-white">{camp.kpis.cpa}</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3 A/B Tests */}
              <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider pt-6 border-t border-neutral-800">
                3 METODICKÉ A/B EXPERIMENTY
              </h4>
              <div className="space-y-4">
                {PPC_STRATEGY.abTests.map(ab => (
                  <div key={ab.id} className="p-5 bg-neutral-900 border border-neutral-800 font-mono text-xs space-y-2">
                    <h5 className="font-bold text-white text-sm">{ab.title}</h5>
                    <p className="text-neutral-300 font-sans text-xs">
                      <strong>Hypotéza:</strong> {ab.hypothesis}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-neutral-400 text-[11px]">
                      <div className="p-2.5 bg-black border border-neutral-800">
                        <strong className="text-white block mb-0.5">{ab.variantA}</strong>
                      </div>
                      <div className="p-2.5 bg-black border border-neutral-800">
                        <strong className="text-white block mb-0.5">{ab.variantB}</strong>
                      </div>
                    </div>
                    <div className="pt-2 text-emerald-400 text-[11px]">
                      <strong>Výsledek simulace:</strong> {ab.simulatedResult}
                    </div>
                    <div className="text-neutral-300 text-[11px]">
                      <strong>Manažerský závěr:</strong> {ab.conclusion}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 7: STDC & CUSTOMER JOURNEY */}
        {(activeTab === 'stdc' || typeof window !== 'undefined') && (
          <section className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">KAPITOLA 7</span>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                CUSTOMER JOURNEY & STDC FRAMEWORK (TABULKA EFEKTIVITY)
              </h3>
            </div>

            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse text-left">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-900/50">
                      <th className="p-3">FÁZE STDC</th>
                      <th className="p-3">DEFINICE PUBLIKA</th>
                      <th className="p-3">KANÁLY & AKTIVITY</th>
                      <th className="p-3">FUNKCE WEBU</th>
                      <th className="p-3">GA4 UDÁLOSTI</th>
                      <th className="p-3">KPI METRIKY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300">
                    {STDC_FRAMEWORK.map(stage => (
                      <tr key={stage.stage} className="hover:bg-neutral-900/40">
                        <td className="p-3 font-bold text-white whitespace-nowrap">{stage.title}</td>
                        <td className="p-3 text-[11px] leading-relaxed max-w-xs">{stage.definition}</td>
                        <td className="p-3 text-[11px]">{stage.channels.join(', ')}</td>
                        <td className="p-3 text-[11px] text-neutral-200">{stage.websiteFeature}</td>
                        <td className="p-3 text-[11px] text-emerald-400">{stage.ga4Events.join(', ')}</td>
                        <td className="p-3 text-[11px] text-white font-bold">{stage.kpis.join(' · ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 8: GA4 & CLARITY ARCHITECTURE */}
        {(activeTab === 'analytics' || typeof window !== 'undefined') && (
          <section className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">KAPITOLA 8</span>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                MĚŘENÍ V GOOGLE ANALYTICS 4 & MICROSOFT CLARITY
              </h3>
            </div>

            <div className="space-y-4 text-neutral-300">
              <p>
                Aplikace je vybavena plnohodnotným měřicím schématem Google Analytics 4 Ecommerce s podporou Microsoft Clarity pro nahrávání uživatelských relací a generování teplotních map (heatmaps).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-2">
                  <strong className="text-white block text-sm">ARCHITEKTURA STANDARDNÍCH GA4 UDÁLOSTÍ:</strong>
                  <ul className="space-y-1 text-neutral-400">
                    <li>• <code className="text-emerald-400">page_view</code>: Zobrazení stránky a URL cesty</li>
                    <li>• <code className="text-emerald-400">view_item_list</code>: Zobrazení produktového katalogu a dropů</li>
                    <li>• <code className="text-emerald-400">view_item</code>: Otevření detailu produktu s cenou a skladem</li>
                    <li>• <code className="text-emerald-400">select_item</code>: Kliknutí na kartu produktu</li>
                    <li>• <code className="text-emerald-400">add_to_cart</code>: Vložení položky do nákupního košíku</li>
                    <li>• <code className="text-emerald-400">remove_from_cart</code>: Odstranění položky z košíku</li>
                    <li>• <code className="text-emerald-400">view_cart</code>: Otevření nákupního košíku</li>
                    <li>• <code className="text-emerald-400">begin_checkout</code>: Zahájení nákupního procesu</li>
                    <li>• <code className="text-emerald-400">purchase</code>: Dokončená objednávka s ID a DPH</li>
                  </ul>
                </div>

                <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-2">
                  <strong className="text-white block text-sm">CUSTOM UDÁLOSTI PRO STREETWEAR DROPY:</strong>
                  <ul className="space-y-1 text-neutral-400">
                    <li>• <code className="text-purple-400">click_lookbook_hotspot</code>: Kliknutí na nákupní bod v lookbooku</li>
                    <li>• <code className="text-purple-400">apply_promo_code</code>: Použití studentského kódu (PRVAK10)</li>
                    <li>• <code className="text-purple-400">newsletter_signup</code>: Registrace e-mailu pro upozornění na drop</li>
                    <li>• <code className="text-purple-400">wishlist_toggle</code>: Uložení do oblíbených před dropem</li>
                    <li>• <code className="text-purple-400">read_article</code>: Přečtení článku v magazínu</li>
                    <li>• <code className="text-purple-400">community_tab_switch</code>: Interakce s FP Memes a příběhy</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 9: TRACEABILITY MATRIX */}
        {(activeTab === 'traceability' || typeof window !== 'undefined') && (
          <section className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">KAPITOLA 9</span>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                TRACEABILITY MATICE (POŽADAVEK → IMPLEMENTACE → KPI)
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse text-left">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-900/50">
                    <th className="p-3">POŽADAVEK PROJEKTU</th>
                    <th className="p-3">IMPLEMENTACE</th>
                    <th className="p-3">FUNKCE WEBU</th>
                    <th className="p-3">MARKETINGOVÁ AKTIVITA</th>
                    <th className="p-3">SLEDOVANÉ KPI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                  {TRACEABILITY_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-900/30">
                      <td className="p-3 font-bold text-white">{row.projectRequirement}</td>
                      <td className="p-3">{row.implementation}</td>
                      <td className="p-3 text-neutral-200">{row.websiteFeature}</td>
                      <td className="p-3 text-neutral-400">{row.marketingActivity}</td>
                      <td className="p-3 text-emerald-400 font-bold">{row.kpi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SECTION 10: CONCLUSION */}
        {(activeTab === 'conclusion' || typeof window !== 'undefined') && (
          <section className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-xs font-mono uppercase text-neutral-400">KAPITOLA 10</span>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                ZÁVĚR A DOPORUČENÍ PRO DALŠÍ FÁZI
              </h3>
            </div>

            <div className="space-y-4 text-neutral-300 max-w-3xl">
              <p>
                Projekt <strong>FP DROP</strong> prokázal, že i univerzitní tématika může být uchopena jako moderní, komerčně úspěšný streetwearový brand, pokud je postavena na hlubokém porozumění cílové skupině, humoru z reálného studentského života na FP VUT a principu limitovaných dropů.
              </p>
              <p>
                Propojení obsahového marketingu (8 článků v magazínu, Lookbook s interaktivními štítky) se silnou komunitní identitou (memes, stories) efektivně snižuje akviziční náklady a umožňuje dosahovat nadprůměrného konverzního poměru (3.42 %) i návratnosti investic do reklamy (ROAS 4.8x).
              </p>
              <div className="p-4 bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400 mt-6">
                <strong className="text-white block mb-1">DOPORUČENÍ PRO NÁSLEDUJÍCÍ SEMESTR:</strong>
                1. Spustit fyzický showroom / výdejnu přímo v kampusu Kolejní 29 pro eliminaci poštovného.
                2. Zavést studentský affiliate program pro zástupce ročníků.
                3. Připravit Drop 003 (FP After Dark) v kooperaci s brněnskými hudebními kluby.
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
