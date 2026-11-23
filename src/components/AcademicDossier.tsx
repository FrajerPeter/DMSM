import React, { useState } from 'react';
import { PERSONAS, TRIGGER_SYSTEM, STDC_FRAMEWORK, CUSTOMER_JOURNEY, SOCIAL_POSTS, PPC_STRATEGY, TRACEABILITY_MATRIX } from '../data/marketing';
import { ACADEMIC_CHAPTERS } from '../data/fullAcademicDocument';
import { Printer, Download, BookOpen, Layers, Users, Zap, Compass, Share2, Target, BarChart2, ShieldCheck, ChevronRight, Copy, Check, FileText, Terminal, Server, Globe } from 'lucide-react';

export const AcademicDossier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('intro');
  const [copiedChapterId, setCopiedChapterId] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyChapter = (id: string, html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    navigator.clipboard.writeText(temp.innerText).then(() => {
      setCopiedChapterId(id);
      setTimeout(() => setCopiedChapterId(null), 3000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-neutral-100">
      {/* Top Academic Control Header */}
      <div className="no-print border-b border-neutral-800 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
            <span>FAKULTA PODNIKATELSKÁ VUT V BRNĚ</span>
            <span aria-hidden="true">·</span>
            <span>AKADEMICKÁ DOKUMENTACE FP VUT</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl uppercase tracking-tight text-white">
            PROJEKTOVÁ DOKUMENTACE & MARKETINGOVÁ STRATEGIE
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Kompletní zpráva splňující standardy závěrečných a semestrálních prací FP VUT (33 800+ znaků, 11 kapitol).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href="/fp_drop_full_web_project.zip"
            download="fp_drop_full_web_project.zip"
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors rounded shadow-lg"
            title="Stiahnuť kompletný zdrojový kód celého webu do Visual Studio Code"
          >
            <Download size={14} />
            <span>VS CODE WEB PROJEKT (.ZIP)</span>
          </a>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors rounded"
          >
            <Printer size={14} />
            <span>PDF</span>
          </button>
        </div>
      </div>


      {/* Navigation tabs for comfortable on-screen reading */}
      <div className="no-print flex flex-wrap gap-1.5 p-1 bg-neutral-950 border border-neutral-800 mb-8 font-mono text-xs overflow-x-auto">
        {[
          { id: 'full-text', label: '📄 Celé znění práce' },
          { id: 'intro', label: '1. Úvod & Titulní list' },
          { id: 'spec', label: '2. Specifikace & Trigger System' },
          { id: 'mobile', label: '3. Mobilní prototyp' },
          { id: 'personas', label: '4. Persony & Cílový segment' },
          { id: 'social', label: '5. Social Media (15 Postů / 5 Reels / 5 Stories)' },
          { id: 'ppc', label: '6. PPC Meta Ads (10k CZK / 3 A/B testy)' },
          { id: 'stdc', label: '7. Customer Journey & STDC' },
          { id: 'analytics', label: '8. GA4 & Microsoft Clarity' },
          { id: 'traceability', label: '9. Traceability Matrix' },
          { id: 'conclusion', label: '10. Závěr & Doporučení' },
          { id: 'deploy-guide', label: '💻 Návod: VS Code & PrestaShop' }
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
        {/* SECTION 0: FULL ACADEMIC TEXT */}
        {activeTab === 'full-text' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
              <div className="space-y-1">
                <div className="text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                  <FileText size={15} />
                  <span>Kompletní znění semestrální práce (11 kapitol / 33 800+ znaků)</span>
                </div>
                <p className="text-neutral-400 font-sans text-xs">
                  Všechny kapitoly jsou kompletně rozpracované v akademickém standardu VUT a zůstávají k dispozici pro čtení přímo na webu.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-white hover:bg-neutral-200 text-black font-bold rounded flex items-center gap-2 uppercase tracking-wider shadow"
                >
                  <Printer size={14} />
                  <span>Tisk / export do PDF</span>
                </button>
              </div>
            </div>

            {/* Individual Chapters Viewer with per-chapter copy */}
            <div className="space-y-8 font-sans">
              {ACADEMIC_CHAPTERS.map(ch => (
                <div key={ch.id} className="bg-white text-slate-900 p-8 md:p-12 rounded-xl shadow-xl border border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6 font-mono text-xs text-slate-500">
                    <span className="font-bold text-slate-700 uppercase">KAPITOLA {ch.num} • FP VUT V BRNĚ</span>
                    <button
                      onClick={() => handleCopyChapter(ch.id, ch.contentHtml)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold flex items-center gap-1 transition-colors"
                      title="Skopírovať túto kapitolu"
                    >
                      {copiedChapterId === ch.id ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      <span>{copiedChapterId === ch.id ? 'Skopírované!' : 'Kopírovať kapitolu'}</span>
                    </button>
                  </div>
                  <div
                    className="prose prose-slate max-w-none text-slate-800"
                    dangerouslySetInnerHTML={{ __html: ch.contentHtml }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                    <span>Python 3.10+ • VS Code Prototyp</span>
                  </div>
                  <h4 className="font-display font-extrabold text-base text-white mt-0.5">
                    FUNKČNÍ PROTOTYP V PYTHONU PRO VS CODE
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    Spustitelný stiskem F5 ve Visual Studio Code (zero dependencies web simulator + Flet Flutter).
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href="/fp_drop_mobile_python.zip"
                    download="fp_drop_mobile_python.zip"
                    className="flex items-center justify-center gap-2 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-lg"
                  >
                    <Download size={14} />
                    <span>PYTHON KÓD (.ZIP)</span>
                  </a>
                </div>
              </div>

              <p>
                V souladu se zadáním (VS Code, Cursor, Python, Lovable, Bolt.new) byl vyvinut plně funkční mobilní prototyp v <strong>Pythonu</strong> (složka <code>python_mobile_app/</code>), který simuluje nativní mobilní aplikaci <strong>FP DROP App</strong> (iOS / Android) s napojením na datový model produktů a drops kalendář.
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
                <div className="flex flex-wrap gap-x-6 gap-y-2">
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
                        <span className="text-neutral-400 ml-2 inline-block">({camp.stage})</span>
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
              <div className="space-y-3">
                <h4 className="font-display font-bold text-lg uppercase text-white">Zákaznická cesta od prvního kontaktu po doporučení</h4>
                <p className="text-sm leading-relaxed text-neutral-400">Journey rozlišuje plánované produkčné kroky od funkcií dnešného prototypu. Checkout je ukážkový; platba, sklad, doručenie ani následné e-maily nie sú pripojené k reálnym službám.</p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1100px] text-xs font-mono border-collapse text-left">
                    <thead><tr className="border-b border-neutral-800 bg-neutral-900/50 text-neutral-400">
                      <th className="p-3">KROK / STDC</th><th className="p-3">SPÚŠŤAČ A POTREBA</th><th className="p-3">KANÁL A AKCIA</th><th className="p-3">BARIÉRA → REAKCIA</th><th className="p-3">EVENTY</th><th className="p-3">MERANIE</th>
                    </tr></thead>
                    <tbody className="divide-y divide-neutral-900 text-neutral-300">
                      {CUSTOMER_JOURNEY.map(step => <tr key={step.id} className="align-top hover:bg-neutral-900/40">
                        <td className="p-3 font-bold text-white">{step.stage}<span className="mt-1 block text-emerald-400">{step.stdc}</span></td>
                        <td className="p-3"><strong className="text-white">{step.trigger}</strong><span className="mt-2 block">{step.userNeed}</span></td>
                        <td className="p-3">{step.touchpoints.map(point => <div key={point} className="mb-1">• {point}</div>)}</td>
                        <td className="p-3"><strong className="text-neutral-200">{step.friction}</strong><span className="mt-2 block text-neutral-400">{step.response}</span></td>
                        <td className="p-3 text-emerald-400">{step.events.join(', ')}</td>
                        <td className="p-3">{step.kpis.join(' · ')}</td>
                      </tr>)}
                    </tbody>
                  </table>
                </div>
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
                Projekt obsahuje připravenou integraci Google Analytics 4 a Microsoft Clarity. Služby se načtou až po vložení vlastních ID do souboru .env.local a po souhlasu návštěvníka. Bez ID zůstává panel v ukázkovém režimu a události se ukládají pouze lokálně v paměti stránky.
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
                    <li>• <code className="text-emerald-400">purchase</code>: Produkčná udalosť až po skutočne dokončenej platbe</li>
                  </ul>
                </div>

                <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-2">
                  <strong className="text-white block text-sm">CUSTOM UDÁLOSTI PRO STREETWEAR DROPY:</strong>
                  <ul className="space-y-1 text-neutral-400">
                    <li>• <code className="text-purple-400">click_lookbook_hotspot</code>: Kliknutí na nákupní bod v lookbooku</li>
                    <li>• <code className="text-purple-400">apply_promo_code</code>: Použití studentského kódu (PRVAK10)</li>
                    <li>• <code className="text-purple-400">newsletter_signup</code>: Produkčná registrácia; e-mail sa do analytiky neposiela</li>
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

        {/* SECTION: VS CODE & PRESTASHOP GUIDE */}
        {activeTab === 'deploy-guide' && (
          <section className="bg-neutral-950 border border-purple-900/60 p-8 md:p-12 space-y-8 rounded-xl animate-fade-in">
            <div className="border-b border-neutral-800 pb-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-bold">
                <Terminal size={14} />
                <span>PRAKTICKÝ NÁVOD PRE ŠTUDENTA & VÝVOJÁRA</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl uppercase text-white mt-1">
                AKO OTVORIŤ CELÝ WEB VO VS CODE A ZVEREJNIŤ HO NA PRESTASHOP
              </h2>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                Krok za krokom od stiahnutia balíka, cez spustenie v Node.js/React na Windows, až po 3 spôsoby integrácie s PrestaShop e-shopom.
              </p>
            </div>

            {/* Quick Download Card */}
            <div className="p-6 bg-purple-950/30 border border-purple-800/60 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-purple-300 font-bold block">1. KROK – STIAHNUTIE ARCHÍVU</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Kompletný archív celého projektu</h3>
                <p className="text-xs text-neutral-300 mt-1">
                  Obsahuje kompletný kód webu (React, TypeScript, Vite, Tailwind CSS), simulátor, dáta aj návod README.
                </p>
              </div>
              <a
                href="/fp_drop_full_web_project.zip"
                download="fp_drop_full_web_project.zip"
                className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xl flex items-center justify-center gap-2 shrink-0"
              >
                <Download size={16} />
                <span>STIAHNUŤ CELÝ PROJEKT (.ZIP)</span>
              </a>
            </div>

            {/* Part 1: VS Code */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-mono">1</span>
                <span>Otvorenie a spustenie projektu vo VS Code (Windows)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-2">
                  <span className="text-purple-400 font-bold block">A. Predpoklady na PC</span>
                  <p className="text-neutral-300">
                    Nainštalujte si bezplatne <strong>Node.js (LTS verzia)</strong> z oficiálnej stránky <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">nodejs.org</a>.
                  </p>
                  <p className="text-neutral-400">
                    Node.js vám do systému pridá príkazy <code className="bg-neutral-800 px-1 py-0.5 rounded text-white">node</code> a <code className="bg-neutral-800 px-1 py-0.5 rounded text-white">npm</code>, ktoré riadia celý web.
                  </p>
                </div>

                <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-2">
                  <span className="text-purple-400 font-bold block">B. Rozbalenie a otvorenie</span>
                  <p className="text-neutral-300">
                    Rozbaľte stiahnutý <code className="text-white">fp_drop_full_web_project.zip</code> do priečinka (napr. <code className="text-white">C:\Projekty\fp-drop</code>).
                  </p>
                  <p className="text-neutral-400">
                    Vo VS Code kliknite na <strong>File -&gt; Open Folder...</strong> a vyberte tento rozbalený priečinok.
                  </p>
                </div>
              </div>

              <div className="bg-black/60 border border-neutral-800 rounded-lg p-4 font-mono text-xs space-y-3">
                <span className="text-neutral-400 uppercase text-[10px] tracking-wider block">PRÍKAZY DO TERMINÁLU VO VS CODE (Stlačte Ctrl + ~):</span>

                <div className="space-y-1">
                  <p className="text-neutral-400"># 1. Nainštalujte knižnice a závislosti:</p>
                  <div className="bg-neutral-900 p-2.5 rounded text-emerald-400 select-all font-bold">
                    npm install
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-neutral-400"># 2. Spustite lokálny vývojový server webu:</p>
                  <div className="bg-neutral-900 p-2.5 rounded text-emerald-400 select-all font-bold">
                    npm run dev
                  </div>
                  <p className="text-neutral-500 text-[11px]">
                    👉 V termináli sa zobrazí odkaz http://localhost:5173 — kliknite naň a web máte na obrazovke!
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-neutral-400"># 3. Vygenerujte hotový produkčný balík pre nasadenie:</p>
                  <div className="bg-neutral-900 p-2.5 rounded text-purple-400 select-all font-bold">
                    npm run build
                  </div>
                  <p className="text-neutral-500 text-[11px]">
                    👉 Vytvorí sa priečinok <strong>dist/</strong> s hotovými optimalizovanými HTML, CSS a JS súbormi.
                  </p>
                </div>
              </div>
            </div>

            {/* Part 2: PrestaShop Integration */}
            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-mono">2</span>
                <span>Ako to prepojiť a zverejniť na PrestaShope</span>
              </h3>

              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong>PrestaShop</strong> je e-commerce systém v jazyku PHP/MySQL (slúži na sklad, košík, platby kartou). Táto aplikácia <strong>FP DROP</strong> je moderný React SPA frontend. V praxi sa integrujú jedným z 3 spôsobov:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                {/* Method A */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px] uppercase font-bold inline-block">
                      SPÔSOB A (ODPORÚČANÝ)
                    </div>
                    <h4 className="font-bold text-white text-sm">Subdoména na hostingu</h4>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      PrestaShop máte na <code className="text-white">eshop.vutdrop.cz</code> a túto aplikáciu nahráte do subdomény <code className="text-white">app.vutdrop.cz</code>.
                    </p>
                    <ol className="list-decimal pl-4 space-y-1 text-neutral-300 text-[11px]">
                      <li>Spustite <code className="text-white">npm run build</code> (vznikne priečinok <code className="text-white">dist/</code>).</li>
                      <li>Cez FTP nahrajte obsah <code className="text-white">dist/</code> na hosting do zložky subdomény.</li>
                      <li>V PrestaShope v hornom menu pridajte odkaz <em>„FP DROP Aplikácia“</em> na subdoménu.</li>
                    </ol>
                  </div>
                </div>

                {/* Method B */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="px-2 py-0.5 bg-blue-950 text-blue-400 rounded text-[10px] uppercase font-bold inline-block">
                      SPÔSOB B (NAJRÝCHLEJŠÍ)
                    </div>
                    <h4 className="font-bold text-white text-sm">Vloženie ako CMS stránka</h4>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      Zobrazí celý interaktívny web priamo vnútri PrestaShopu medzi hlavičkou a pätou e-shopu.
                    </p>
                    <ol className="list-decimal pl-4 space-y-1 text-neutral-300 text-[11px]">
                      <li>V PrestaShope: <em>Nastavenia obchodu -&gt; Všeobecné -&gt; Povoliť iframe</em> dajte <strong>ÁNO</strong>.</li>
                      <li>V menu <em>Vzhľad -&gt; Stránky (CMS)</em> vytvorte novú stránku.</li>
                      <li>Do HTML kódu vložte: <code className="text-purple-400">&lt;iframe src="URL" width="100%" height="850"&gt;&lt;/iframe&gt;</code>.</li>
                    </ol>
                  </div>
                </div>

                {/* Method C */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="px-2 py-0.5 bg-purple-950 text-purple-400 rounded text-[10px] uppercase font-bold inline-block">
                      SPÔSOB C (PROFI API)
                    </div>
                    <h4 className="font-bold text-white text-sm">PrestaShop Webservice API</h4>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      Prepojenie skladu a košíka cez REST API.
                    </p>
                    <ol className="list-decimal pl-4 space-y-1 text-neutral-300 text-[11px]">
                      <li>V PrestaShope: <em>Rozšírené parametre -&gt; Webservice</em> -&gt; vygenerujte API kľúč.</li>
                      <li>V React kóde volajte API na načítanie produktov a cien.</li>
                      <li>Tlačidlá „Kúpiť“ automaticky vložia produkt do PrestaShop košíka.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
