import React from 'react';
import { X, ShieldAlert, Sparkles, MapPin, Truck, RefreshCw, Layers } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'ABOUT' | 'FAQ';
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'ABOUT'
}) => {
  const [tab, setTab] = React.useState<'ABOUT' | 'FAQ'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0e0e0e] border border-neutral-800 text-neutral-100 shadow-2xl p-6 md:p-8 my-auto z-10 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex gap-4 text-xs font-mono">
            <button
              onClick={() => setTab('ABOUT')}
              className={`font-bold uppercase tracking-wider pb-1 transition-colors ${
                tab === 'ABOUT' ? 'text-white border-b-2 border-white' : 'text-neutral-500 hover:text-white'
              }`}
            >
              O ZNAČCE (BRAND CONCEPT)
            </button>
            <button
              onClick={() => setTab('FAQ')}
              className={`font-bold uppercase tracking-wider pb-1 transition-colors ${
                tab === 'FAQ' ? 'text-white border-b-2 border-white' : 'text-neutral-500 hover:text-white'
              }`}
            >
              ČASTO KLADENÉ DOTAZY (FAQ)
            </button>
          </div>

          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Tab: ABOUT */}
        {tab === 'ABOUT' && (
          <div className="space-y-6 text-xs md:text-sm font-sans text-neutral-300 leading-relaxed">
            {/* Legal / Academic Disclaimer Box as required by section 30 */}
            <div className="p-4 bg-neutral-950 border border-neutral-800 flex items-start gap-3">
              <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs font-mono text-neutral-300">
                <strong className="text-white block mb-0.5 uppercase">PRÁVNÍ & AKADEMICKÉ UPOZORNĚNÍ:</strong>
                Tento web a značka <strong>FP DROP</strong> je <strong>fiktivní studentský merchandise koncept</strong> vytvořený výhradně pro účely akademického projektu na Fakultě podnikatelské VUT v Brně. Nejedná se o oficiální obchod Vysokého učení technického v Brně.
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-base uppercase text-white mb-2">
                FILOZOFIE: STUDENT CULTURE × STREETWEAR × LIMITED DROPS
              </h3>
              <p>
                FP DROP vznikl jako reakce na nudný propagační textil. Věříme, že univerzitní oblečení může být stejně žádoucí, kvalitní a stylové jako kousky od předních světových streetwearových labelů.
              </p>
              <p className="mt-2">
                Naše produkty stavíme na třech pevných pilířích: <strong>autentický studentský humor z Kolejní 29</strong>, <strong>masivní 240g česaná bio bavlna</strong> a <strong>princip limitovaných dropů</strong>, které nezahlcují trh skladovými přebytky.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800 font-mono text-xs">
              <div className="p-3 bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-400 block text-[10px]">LOKALITA:</span>
                <span className="text-white font-bold">Kolejní 29, Brno (FP VUT)</span>
              </div>
              <div className="p-3 bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-400 block text-[10px]">VÝROBA:</span>
                <span className="text-white font-bold">Brněnská sítotisková dílna</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab: FAQ */}
        {tab === 'FAQ' && (
          <div className="space-y-4 font-mono text-xs text-neutral-300">
            <div className="p-3.5 bg-neutral-950 border border-neutral-800 space-y-1">
              <strong className="text-white block">Jak fungují limitované dropy?</strong>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Každý drop vychází v omezeném množství (cca 50–150 kusů na design). Jakmile se kousek označí jako SOLD OUT, dotisk v téže barevné variantě se již neopakuje.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-950 border border-neutral-800 space-y-1">
              <strong className="text-white block">Jak je to s velikostmi? Jsou střihy skutečně oversized?</strong>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Ano! Naše trička i mikiny mají uvolněný boxy střih s padlými rameny. Pokud preferujete běžný přiléhavější střih, doporučujeme zvolit o jedno číslo menší velikost. Detailní centimetry najdete v tabulce velikostí.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-950 border border-neutral-800 space-y-1">
              <strong className="text-white block">Kde a kdy mohu využít osobní odběr zdarma?</strong>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Osobní odběr probíhá po předchozí domluvě přímo na Fakultě podnikatelské (Kolejní 29) u studentského spolku nebo v knihovně VUT v pracovní dny mezi 10:00 a 16:00.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-950 border border-neutral-800 space-y-1">
              <strong className="text-white block">Jak uplatnit studentskou slevu 10 %?</strong>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                V nákupním košíku zadejte promo kód <strong>PRVAK10</strong>. Sleva 10 % se okamžitě odečte z celkové hodnoty zboží.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
