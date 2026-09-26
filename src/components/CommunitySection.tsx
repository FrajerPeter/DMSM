import React, { useState } from 'react';
import { Quote, MessageSquare, Flame, Sparkles, Laugh } from 'lucide-react';
import { analytics } from '../utils/analytics';

export const CommunitySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MEMES' | 'STORIES' | 'BAG'>('MEMES');

  const memes = [
    {
      id: 'm1',
      title: 'Zkouškové z makroekonomie',
      quote: '„Když se tě zkoušející zeptá, co je to Phillipsova křivka, a ty mu ukážeš křivku svých zbývajících sil.“',
      author: 'Honza, 2. ročník FP',
      tags: ['#MAKRO', '#ZKOUŠKOVÉ', '#KOLEJNÍ29'],
      likes: 342
    },
    {
      id: 'm2',
      title: 'Výstup na Kolejní 29 v 7:55 ráno',
      quote: '„Kdo nepotřeboval po výstupu z Červinkovy na Kolejní plicní ventilaci, ten na FP nikdy doopravdy nestudoval.“',
      author: 'Veronika, 1. ročník FP',
      tags: ['#KARDIO', '#TRAMVAJ12', '#RÁNO'],
      likes: 512
    },
    {
      id: 'm3',
      title: 'ECTS kalkulace před zápočtovým týdnem',
      quote: '„Matematika na střední: 2 + 2 = 4. Matematika na FP: Když dostanu 3 body z testu a napíšu esej do půlnoci, projdu s 51 body a zachráním stipendium.“',
      author: 'Filip, 3. ročník FP',
      tags: ['#ECTS', '#DEADLINES', '#SURVIVAL'],
      likes: 678
    },
    {
      id: 'm4',
      title: 'Technici z FIT vs. My z Podnikatelky',
      quote: '„Oni: Naše servery zvládnou 10 000 požadavků za sekundu. My: Skvělé, a kdo vám to prodá a spočítá DPH?“',
      author: 'Matěj, 3. ročník FP',
      tags: ['#FPvsFIT', '#STARTUP', '#BUSINESS'],
      likes: 820
    }
  ];

  const stories = [
    {
      id: 's1',
      author: 'Tereza, 19 let (Ekonomika a management)',
      story: 'První týden v Brně byl totální šok. Na seznamováku jsem si říkala, že se budu učit každý den poctivě. Pak přišly první klubové noci na Flédě, rozjezdy ve 3 ráno a ranní přednáška z práva. Oblečení z FP DROP pro mě není jen triko, je to takový znak, že v tom blázinci nejsme sami.',
      favoriteItem: 'HOT GIRLS GO TO FP TEE'
    },
    {
      id: 's2',
      author: 'Lukáš, 22 let (Informační management)',
      story: 'Když jsem přišel na zkoušku ze statistiky v Signature mikině s nápisem KOLEJNÍ 29, pan docent se jen usmál a řekl: „Vidím, že jste připraven na dlouhý boj.“ Zkoušku jsem dal na C a mikinu nosím dodnes.',
      favoriteItem: 'FP 001 SIGNATURE HOODIE'
    },
    {
      id: 's3',
      author: 'Klára, 24 let (Absolventka FP)',
      story: 'Když jsme dělali státnice, koupily jsme si s holkama celá studijní skupina stejná trika. Dneska pracujeme v Praze, Brně i Vídni, ale když se sejdeme na srazu, bereme si je na sebe. FP v Brně byla nejlepší léta.',
      favoriteItem: 'ECTS ARE TEMPORARY TEE'
    }
  ];

  const bagItems = [
    { item: '16" MacBook Pro', note: 'Plný otevřených tabů se skripty a canva prezentacemi' },
    { item: 'FP DROP Campus Survival Tote', note: 'Těžké 320g plátno s vnitřní kapsou na zip' },
    { item: 'Termohrnek s dvojitým espressem', note: 'Záchrana pro přednášky od 8:00 ráno' },
    { item: 'AirPods s noise-cancellingem', note: 'Nutnost do studovny v knihovně VUT' },
    { item: 'Balíček samolepek FP DROP', note: 'Polepený notebook je vizitkou studenta' },
    { item: 'Náhradní triko NO SLEEP', note: 'Když se studium protáhne do noci' }
  ];

  return (
    <section className="py-16 bg-[#0a0a0a] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              <Sparkles size={14} className="text-white" />
              <span>IF YOU KNOW, YOU KNOW</span>
              <span aria-hidden="true">·</span>
              <span>COMMUNITY CULTURE</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl md:text-4xl uppercase text-white tracking-tight">
              STUDENT CULTURE & HUMOR
            </h2>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => {
                setActiveTab('MEMES');
                analytics.trackEvent('community_tab_switch', { tab: 'MEMES' });
              }}
              className={`px-3 py-1.5 border uppercase transition-colors ${
                activeTab === 'MEMES'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              FP MEMES
            </button>
            <button
              onClick={() => {
                setActiveTab('STORIES');
                analytics.trackEvent('community_tab_switch', { tab: 'STORIES' });
              }}
              className={`px-3 py-1.5 border uppercase transition-colors ${
                activeTab === 'STORIES'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              STUDENT STORIES
            </button>
            <button
              onClick={() => {
                setActiveTab('BAG');
                analytics.trackEvent('community_tab_switch', { tab: 'BAG' });
              }}
              className={`px-3 py-1.5 border uppercase transition-colors ${
                activeTab === 'BAG'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              WHAT'S IN YOUR BAG?
            </button>
          </div>
        </div>

        {/* Tab 1: MEMES */}
        {activeTab === 'MEMES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {memes.map(meme => (
              <div
                key={meme.id}
                className="p-5 bg-neutral-950 border border-neutral-800 flex flex-col justify-between hover:border-neutral-600 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-neutral-400 mb-3 text-xs font-mono">
                    <span className="uppercase text-white font-bold">{meme.title}</span>
                    <Laugh size={14} className="text-neutral-400" />
                  </div>
                  <p className="text-sm font-sans text-neutral-200 leading-relaxed italic">
                    {meme.quote}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>{meme.author}</span>
                    <span className="flex items-center gap-1 text-white font-bold">
                      <Flame size={12} className="text-orange-400" /> {meme.likes}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {meme.tags.map(t => (
                      <span key={t} className="text-[10px] font-mono text-neutral-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: STORIES */}
        {activeTab === 'STORIES' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map(st => (
              <div
                key={st.id}
                className="p-6 bg-neutral-950 border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <Quote size={24} className="text-neutral-600 mb-3" />
                  <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                    „{st.story}“
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900 text-xs font-mono">
                  <div className="font-bold text-white">{st.author}</div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Oblíbený kousek: <strong className="text-neutral-300">{st.favoriteItem}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: WHAT'S IN YOUR BAG? */}
        {activeTab === 'BAG' && (
          <div className="bg-neutral-950 border border-neutral-800 p-6 md:p-8">
            <div className="max-w-2xl mb-6">
              <h3 className="font-display font-bold text-lg uppercase text-white mb-2">
                CAMPUS SURVIVAL FLATLAY
              </h3>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                Co s sebou táhnou studenti FP na 10hodinový blok přednášek a cvičení na Kolejní 29?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bagItems.map((bi, idx) => (
                <div key={idx} className="p-4 bg-[#111] border border-neutral-800">
                  <div className="text-xs font-mono text-neutral-400">0{idx + 1}.</div>
                  <div className="font-display font-bold text-sm text-white mt-1 uppercase">{bi.item}</div>
                  <p className="text-xs text-neutral-400 mt-1 font-sans">{bi.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
