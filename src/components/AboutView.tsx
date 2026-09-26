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
      q: 'Jak funguje koncept limitovaných dropů?',
      a: 'Všechny produkty FP DROP vycházejí v jednorázových, přísně limitovaných edicích (zpravidla 50 až 150 kusů na design). Jakmile se drop vyprodá, dotisk v téže konfiguraci neprobíhá. Tento systém eliminuje skladový odpad a zajišťuje, že oblečení zůstává jedinečným kouskem pro lidi z kampusu.'
    },
    {
      q: 'Jsou střihy skutečně unisex a oversized?',
      a: 'Ano. Naše trička i mikiny mají autentický boxy střih s padlými rameny a zpevněným límcem (240 GSM bio bavlna u triček, 450 GSM u mikin). Pokud preferujete uvolněný streetwear look, volte svou běžnou velikost. Pokud chcete přiléhavější střih, doporučujeme zvolit o jedno číslo menší velikost.'
    },
    {
      q: 'Kde a jak probíhá doručení v Brně?',
      a: 'Doručujeme po celé České republice přes Zásilkovnu (Z-BOXy a výdejní místa) i kurýrem. Pro studenty VUT nabízíme bezplatné expresní doručení přímo do Z-BOXu u kolejí Pod Palackého vrchem (Kolejní 2) do 24 hodin od objednávky.'
    },
    {
      q: 'Jaké materiály používáte?',
      a: 'Používáme výhradně 100% česanou bio bavlnu s certifikací GOTS o vysoké gramáži 240 g/m² (heavyweight). Potisky jsou realizovány technologií tradičního sítotisku s barvami na vodní bázi v brněnské dílně, což zaručuje maximální prodyšnost a odolnost při praní.'
    },
    {
      q: 'Lze zboží vrátit nebo vyměnit velikost?',
      a: 'Samozřejmě. Máte 14 dní na bezplatné vrácení nebo výměnu nenošeného zboží s původními visačkami. Výměnu velikosti lze navíc vyřešit osobně přímo na kampusu na Kolejní 29.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-100">
      {/* 1. Hero Manifesto Banner */}
      <section className="border-b border-neutral-800 bg-[#090909] px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <span className="px-2 py-0.5 bg-white text-black font-bold">ABOUT FP DROP</span>
            <span>·</span>
            <span>EST. 2026 BRNO</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter text-white leading-none">
            STUDENT CULTURE.<br />
            <span className="text-neutral-400">STREETWEAR UNIFORM.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-sans max-w-2xl leading-relaxed">
            FP DROP vznikl na kampusu Fakulty podnikatelské VUT v Brně jako přímá odpověď na nudný a neosobní univerzitní merch. Věříme, že studentské oblečení má být syrové, kvalitní a žádoucí.
          </p>
        </div>
      </section>

      {/* 2. Academic & Legal Disclaimer Banner (Mandatory requirement) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-5 bg-neutral-950 border border-neutral-800 flex items-start gap-4">
          <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs font-mono text-neutral-300 space-y-1">
            <strong className="text-white block uppercase tracking-wider">
              PRÁVNÍ & AKADEMICKÉ UPOZORNĚNÍ:
            </strong>
            <p className="text-neutral-400 leading-relaxed">
              Značka <strong>FP DROP</strong> a tento e-shop představují <strong>fiktivní studentský merchandise koncept a případovou studii</strong> vytvořenou pro akademické účely na Fakultě podnikatelské VUT v Brně. Nejedná se o oficiální internetový obchod Vysokého učení technického v Brně.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Pillars (3 Columns) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs">
          <div className="p-6 bg-black border border-neutral-800 space-y-3">
            <div className="text-white font-display font-black text-lg uppercase tracking-tight">
              01 / STUDENT HUMOR
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Žádná generická loga fakulty. Stavíme na autentickém humoru ze zkouškového, ranních výstupech na Kolejní 29 a brněnském nočním životě.
            </p>
          </div>

          <div className="p-6 bg-black border border-neutral-800 space-y-3">
            <div className="text-white font-display font-black text-lg uppercase tracking-tight">
              02 / 240 GSM HEAVYWEIGHT
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Těžká česaná bio bavlna, která drží tvar i po desítkách vyprání. Uvolněný boxy unisex střih a trvanlivý ruční sítotisk z brněnské dílny.
            </p>
          </div>

          <div className="p-6 bg-black border border-neutral-800 space-y-3">
            <div className="text-white font-display font-black text-lg uppercase tracking-tight">
              03 / LIMITED DROPS
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Žádná masová nadprodukce. Každý kousek vzniká v limitovaném nákladu cca 150 kusů. Jakmile se drop vyprodá, dotisk v téže variantě se neopakuje.
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
              <span>LOKACE & KOMUNITA</span>
            </div>
            <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-white tracking-tight">
              ZROZENO NA KOLEJNÍ 29, BRNO
            </h2>
            <p className="text-xs text-neutral-300 font-mono leading-relaxed">
              Koleje Pod Palackého vrchem a Fakulta podnikatelská VUT jsou naším domovem. Vše od prvních skic a typografie přes testování střihů až po balení objednávek probíhá přímo v Brně.
            </p>
            <div className="flex gap-4 pt-2 font-mono text-xs">
              <button
                onClick={onNavigateToShop}
                className="px-6 py-3 bg-white text-black font-bold uppercase hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
              >
                <span>PROZKOUMAT SHOP</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          <div className="p-6 bg-black border border-neutral-800 font-mono text-xs space-y-3 text-neutral-400">
            <div className="text-white font-bold uppercase border-b border-neutral-800 pb-2">
              TECHNICKÉ SPECIFIKACE ZNAČKY:
            </div>
            <div className="flex justify-between">
              <span>SÍDLO & DESIGN:</span>
              <span className="text-white">FP VUT, Kolejní 29, Brno</span>
            </div>
            <div className="flex justify-between">
              <span>VÝROBA & POTISK:</span>
              <span className="text-white">Brněnská sítotisková dílna</span>
            </div>
            <div className="flex justify-between">
              <span>STANDARD MATERIÁLŮ:</span>
              <span className="text-white">GOTS Certified Bio Bavlna</span>
            </div>
            <div className="flex justify-between">
              <span>DISTRIBUCE V BRNĚ:</span>
              <span className="text-emerald-400">Z-BOX Kolejní (do 24h)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-neutral-800/80">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            ČASTO KLADENÉ DOTAZY
          </span>
          <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-white tracking-tight mt-1">
            VŠECHNO, CO POTŘEBUJEŠ VĚDĚT
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
