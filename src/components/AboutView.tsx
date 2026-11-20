import React, { useState } from 'react';
import { ShieldAlert, Sparkles, MapPin, Layers, RefreshCw, Truck, ArrowRight, Check } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface AboutViewProps {
  onNavigateToShop: () => void;
  onNavigateToDrops: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateToShop, onNavigateToDrops }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Ako funguje návrh limitovaných kolekcií?',
      a: 'Limitované kolekcie sú súčasťou konceptu FP DROP. Počty kusov ani výroba zatiaľ nie sú potvrdené; ide o návrhový model, ktorý by bolo potrebné overiť s dodávateľom a študentmi.'
    },
    {
      q: 'Sú navrhované strihy unisex a oversized?',
      a: 'Prototyp počíta s voľnejšími unisex strihmi. Gramáž, materiál aj veľkostná tabuľka sú ukážkové návrhy a pred výrobou ich treba potvrdiť na reálnych vzorkách.'
    },
    {
      q: 'Ako by mohlo fungovať doručenie v Brne?',
      a: 'Osobný odber a doručenie cez výdajné miesto sú iba návrhy. Projekt nemá aktívne objednávky ani dohodnutú dopravu.'
    },
    {
      q: 'Aké materiály sú v návrhu?',
      a: 'Návrh pracuje s bavlnenými tričkami a ťažšími mikinami. Zloženie, gramáž, certifikáciu aj spôsob potlače treba overiť u dodávateľa; výroba zatiaľ neprebieha.'
    },
    {
      q: 'Dá sa tovar vrátiť alebo vymeniť veľkosť?',
      a: 'Keďže obchod je iba prototyp, nákup, vrátenie ani výmena momentálne nie sú dostupné. Podmienky by sa museli určiť pred prípadným spustením predaja.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-100">
      {/* 1. Hero Manifesto Banner */}
      <section className="border-b border-neutral-800 bg-[#090909] px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <span className="px-2 py-0.5 bg-white text-black font-bold">O FP DROP</span>
            <span>·</span>
            <span>EST. 2026 BRNO</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter text-white leading-none">
            ŠTUDENTSKÁ KULTÚRA.<br />
            <span className="text-neutral-400">STREETWEAR PRE FAKULTU.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-sans max-w-2xl leading-relaxed">
            FP DROP vznikol ako študentský návrh oblečenia s identitou Fakulty podnikateľskej VUT v Brne. Projekt skúma, ako prepojiť fakultnú komunitu so súčasným streetwearom.
          </p>
        </div>
      </section>

      {/* 2. Academic & Legal Disclaimer Banner (Mandatory requirement) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-5 bg-neutral-950 border border-neutral-800 flex items-start gap-4">
          <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs font-mono text-neutral-300 space-y-1">
            <strong className="text-white block uppercase tracking-wider">
              AKADEMICKÉ UPOZORNENIE:
            </strong>
            <p className="text-neutral-400 leading-relaxed">
              Značka <strong>FP DROP</strong> a tento web predstavujú <strong>študentský koncept a prípadovú štúdiu</strong> vytvorenú na akademické účely. Nie je to oficiálny e-shop VUT. Produkty, ceny, zásoby, recenzie aj údaje o výrobe sú ukážkové a neoverené.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Pillars (3 Columns) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs">
          <div className="p-6 bg-black border border-neutral-800 space-y-3">
            <div className="text-white font-display font-black text-lg uppercase tracking-tight">
              01 / ŠTUDENTSKÝ HUMOR
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Namiesto generického loga návrh pracuje s humorom zo skúškového, rannými cestami na Kolejní 29 a brnianskym nočným životom.
            </p>
          </div>

          <div className="p-6 bg-black border border-neutral-800 space-y-3">
            <div className="text-white font-display font-black text-lg uppercase tracking-tight">
              02 / NÁVRH MATERIÁLU
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Ťažšia bavlna, voľnejší unisex strih a sítotlač sú pracovné návrhy. Materiály ani výroba zatiaľ neboli potvrdené.
            </p>
          </div>

          <div className="p-6 bg-black border border-neutral-800 space-y-3">
            <div className="text-white font-display font-black text-lg uppercase tracking-tight">
              03 / LIMITOVANÉ KOLEKCIE
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Koncept počíta s menšími kolekciami. Konkrétne množstvo ani termíny vydania nie sú stanovené.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Campus Location & Workshop */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-800/80">
        <div className="bg-[#0b0b0b] border border-neutral-800 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <MapPin size={14} className="text-white" />
              <span>MIESTO A KOMUNITA</span>
            </div>
            <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-white tracking-tight">
              INŠPIROVANÉ MIESTOM KOLEJNÍ 29, BRNO
            </h2>
            <p className="text-xs text-neutral-300 font-mono leading-relaxed">
              Koleje Pod Palackého vrchom a Fakulta podnikateľská VUT tvoria kontext projektu. Návrhy a prototypy vznikli na akademické účely; balenie objednávok ani výroba neprebiehajú.
            </p>
            <div className="flex gap-4 pt-2 font-mono text-xs">
              <button
                onClick={onNavigateToShop}
                className="px-6 py-3 bg-white text-black font-bold uppercase hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
              >
                <span>POZRIEŤ OBCHOD</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          <div className="p-6 bg-black border border-neutral-800 font-mono text-xs space-y-3 text-neutral-400">
            <div className="text-white font-bold uppercase border-b border-neutral-800 pb-2">
              UKÁŽKOVÉ PARAMETRE KONCEPTU:
            </div>
            <div className="flex justify-between">
              <span>INŠPIRÁCIA A DIZAJN:</span>
              <span className="text-white">FP VUT, Kolejní 29, Brno</span>
            </div>
            <div className="flex justify-between">
              <span>VÝROBA A POTLAČ:</span>
              <span className="text-white">Zatiaľ nepotvrdené</span>
            </div>
            <div className="flex justify-between">
              <span>MATERIÁL:</span>
              <span className="text-white">Ukážkový návrh</span>
            </div>
            <div className="flex justify-between">
              <span>DORUČENIE:</span>
              <span className="text-emerald-400">Iba návrh</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-neutral-800/80">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            ČASTÉ OTÁZKY
          </span>
          <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-white tracking-tight mt-1">
            ČO BY SI MAL/A VEDIEŤ
          </h2>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-800 bg-neutral-950 transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-white font-bold uppercase hover:text-neutral-300"
                >
                  <span>{faq.q}</span>
                  <span className="text-neutral-500 font-normal">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-neutral-400 leading-relaxed border-t border-neutral-900 text-[11px]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
