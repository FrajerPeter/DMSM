import React, { useState } from 'react';
import { DROPS } from '../data/drops';
import { PRODUCTS } from '../data/products';
import { Product, Drop } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowRight, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface DropsViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onFilterShopByDrop: (dropId: string) => void;
}

export const DropsView: React.FC<DropsViewProps> = ({
  onSelectProduct,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
  onFilterShopByDrop
}) => {
  const [selectedDropId, setSelectedDropId] = useState<string>('drop-001');

  const selectedDrop = DROPS.find(d => d.id === selectedDropId) || DROPS[0];
  const dropProducts = PRODUCTS.filter(p => selectedDrop.productIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-8 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
          <span>LIMITED RELEASE CALENDAR</span>
          <span aria-hidden="true">·</span>
          <span>SEASON 2026</span>
          <span aria-hidden="true">·</span>
          <span>KOLEJNÍ 29</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-white">
          THE DROPS
        </h1>

        <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
          Náš obchod nefunguje jako nudný permanentní katalog. Vydáváme limitované tematické série vázané na životní cyklus studenta FP VUT — od prvního týdne semestru přes zkouškové až po noční život v Brně.
        </p>

        {/* Drop Navigation Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {DROPS.map(drop => (
            <button
              key={drop.id}
              onClick={() => {
                setSelectedDropId(drop.id);
                analytics.trackEvent('select_drop_tab', { drop_code: drop.code });
              }}
              className={`p-4 border text-left transition-all ${
                selectedDropId === drop.id
                  ? 'bg-neutral-900 border-white text-white shadow-xl'
                  : 'bg-neutral-950/70 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span>{drop.code}</span>
                <span className="text-emerald-400 uppercase">{drop.status.replace('_', ' ')}</span>
              </div>
              <div className="font-display font-bold text-sm uppercase text-white truncate">
                {drop.title}
              </div>
              <div className="text-[11px] font-mono text-neutral-400 mt-1">
                {drop.date}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Drop Showcase Banner */}
      <div className="p-8 md:p-12 bg-neutral-950 border border-neutral-800 mb-12 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2 py-0.5 bg-white text-black font-bold uppercase">{selectedDrop.code}</span>
            <span className="text-emerald-400 font-bold uppercase flex items-center gap-1">
              <CheckCircle2 size={13} /> NYNÍ SKLADEM V BRNĚ
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl md:text-4xl text-white uppercase tracking-tight">
            {selectedDrop.title}
          </h2>

          <p className="text-base text-neutral-300 font-sans italic border-l-2 border-white pl-4">
            „{selectedDrop.subtitle}“
          </p>

          <p className="text-xs md:text-sm text-neutral-400 font-sans leading-relaxed">
            {selectedDrop.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono">
            <button
              onClick={() => onFilterShopByDrop(selectedDrop.id)}
              className="px-5 py-2.5 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
              <span>ZOBRAZIT VŠECH {dropProducts.length} KUSŮ V SHOPU</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => {
                const title = `FP DROP: ${selectedDrop.code} (${selectedDrop.title})`;
                const details = `Spuštění limitovaného dropu FP DROP pro studenty FP VUT. Místo: fpdrop.cz`;
                const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=FP+VUT+Brno`;
                window.open ? window.open(gCalUrl, '_blank') : null;
              }}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold uppercase transition-colors flex items-center gap-1.5"
            >
              <Clock size={13} />
              <span>PŘIDAT DO KALENDÁŘE</span>
            </button>

            <span className="text-neutral-400">
              Kampaň: <strong className="text-white">{selectedDrop.campaignHeadline}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Products in this Drop */}
      <div>
        <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-3">
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-neutral-400">
            PRODUKTY V TOMTO DROPU ({dropProducts.length})
          </h3>
          <span className="text-xs font-mono text-neutral-400">
            100% bio bavlna • Lokální sítotisk
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dropProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
