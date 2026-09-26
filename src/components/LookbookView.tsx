import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../data/marketing';
import { PRODUCTS } from '../data/products';
import { Product, LookbookItem } from '../types';
import { ProductImage } from './ProductImage';
import { Eye, ArrowUpRight, Camera, MapPin, Tag } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface LookbookViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd?: (product: Product, size: string) => void;
}

export const LookbookView: React.FC<LookbookViewProps> = ({ onSelectProduct, onQuickAdd }) => {
  const [activeDropFilter, setActiveDropFilter] = useState<string>('ALL');
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filteredItems = activeDropFilter === 'ALL'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter(item => item.dropId === activeDropFilter);

  const handleHotspotClick = (productId: string, label: string) => {
    analytics.trackEvent('click_lookbook_hotspot', {
      product_id: productId,
      label
    });
    const found = PRODUCTS.find(p => p.id === productId);
    if (found) {
      onSelectProduct(found);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Editorial Header */}
      <div className="border-b border-neutral-800 pb-8 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
          <span>EDITORIAL LOOKBOOK</span>
          <span aria-hidden="true">·</span>
          <span>SEASON 2026</span>
          <span aria-hidden="true">·</span>
          <span>BRNO CAMPUS & STREETS</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-white">
          LOOKBOOK
        </h1>

        <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed font-sans">
          Vizuální kronika studentského života na FP VUT v Brně. Syrový beton kampusu Kolejní 29, noční tramvaje, kavárenské útočiště a 240g česaná bavlna. Žádní modelové z agentur, pouze reální studenti.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mt-8 font-mono text-xs">
          {['ALL', 'drop-001', 'drop-002', 'drop-003', 'drop-004'].map(dId => (
            <button
              key={dId}
              onClick={() => setActiveDropFilter(dId)}
              className={`px-3 py-1.5 border uppercase tracking-wider transition-colors ${
                activeDropFilter === dId
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-600'
              }`}
            >
              {dId === 'ALL' ? 'VŠECHNY LOOKY' :
               dId === 'drop-001' ? 'DROP 001: FIRST SEMESTER' :
               dId === 'drop-002' ? 'DROP 002: EXAM SEASON' :
               dId === 'drop-003' ? 'DROP 003: FP AFTER DARK' : 'DROP 004: BRNO'}
            </button>
          ))}
        </div>
      </div>

      {/* Lookbook Spreads */}
      <div className="space-y-24">
        {filteredItems.map((item, index) => {
          const featuredProds = PRODUCTS.filter(p => item.featuredProductIds.includes(p.id));

          return (
            <article key={item.id} className="group border-b border-neutral-800/80 pb-16">
              {/* Spread Info Header */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    <span>{item.title}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {item.location}</span>
                  </div>
                  <h2 className="font-display font-bold text-xl md:text-2xl uppercase tracking-tight text-white mt-1">
                    {item.subtitle}
                  </h2>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1"><Camera size={12} /> Foto: {item.photographer}</span>
                  <span className="hidden sm:inline" aria-hidden="true">·</span>
                  <span className="hidden sm:inline uppercase text-neutral-400">{item.vibe}</span>
                </div>
              </div>

              {/* Main Visual Spread with interactive Hotspots */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Large Editorial Photograph Mockup */}
                <div className="lg:col-span-8 relative aspect-[4/3] bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col justify-between p-6">
                  {/* Atmospheric Streetwear Backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
                  
                  {/* Subtle Concrete / Grain simulation */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />

                  {/* Centered Garment Mockup composition representing the look */}
                  <div className="relative w-full h-full flex items-center justify-center z-0">
                    {featuredProds[0] && (
                      <div className="w-80 h-80 transform -rotate-2">
                        <ProductImage
                          imageUrl={featuredProds[0].images?.front || featuredProds[0].imageUrl}
                          alt={featuredProds[0].name}
                          className="w-full h-full"
                        />
                      </div>
                    )}
                    {featuredProds[1] && (
                      <div className="w-48 h-48 absolute bottom-4 right-8 transform rotate-6 drop-shadow-2xl">
                        <ProductImage
                          imageUrl={featuredProds[1].images?.front || featuredProds[1].imageUrl}
                          alt={featuredProds[1].name}
                          className="w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Top Location Watermark */}
                  <div className="relative z-20 flex justify-between items-start text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
                    <span>FP DROP ARCHIVE</span>
                    <span>KOLEJNÍ 29 // BRNO</span>
                  </div>

                  {/* Interactive Hotspot Tags directly on the photo */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    {item.hotspots.map((hs, hIdx) => {
                      const prod = PRODUCTS.find(p => p.id === hs.productId);
                      if (!prod) return null;

                      return (
                        <div
                          key={hIdx}
                          style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                          className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <button
                            onClick={() => handleHotspotClick(hs.productId, hs.label)}
                            className="group/btn relative flex items-center gap-2 bg-white/95 text-black hover:bg-white px-2.5 py-1 text-[11px] font-mono font-bold tracking-tight shadow-2xl border border-black transition-all hover:scale-105"
                          >
                            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                            <span>{prod.name.split(' ')[0]} {prod.name.split(' ')[1]}</span>
                            <span className="font-bold tabular-nums text-neutral-800">{prod.price} Kč</span>
                            <ArrowUpRight size={12} />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Caption */}
                  <div className="relative z-20 flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span>{item.imageAlt}</span>
                    <span className="text-[10px] uppercase text-neutral-400">KLIKNI NA BOD PRO NÁKUP</span>
                  </div>
                </div>

                {/* Right Side: Featured Products in this Look */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-400">
                      PRODUKTY V TOMTO OUTFITU
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {featuredProds.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => onSelectProduct(prod)}
                        className="p-3 bg-neutral-950 border border-neutral-800 hover:border-neutral-500 cursor-pointer flex items-center gap-3 transition-colors group/item"
                      >
                        <div className="w-16 h-16 shrink-0 bg-neutral-900 border border-neutral-800">
                          <ProductImage
                            imageUrl={prod.images?.front || prod.imageUrl}
                            alt={prod.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase">{prod.category}</span>
                          <h4 className="text-xs font-bold text-white truncate group-hover/item:text-neutral-200">
                            {prod.name}
                          </h4>
                          <div className="font-mono text-xs font-bold text-white tabular-nums mt-0.5">
                            {prod.price} Kč
                          </div>
                        </div>

                        {onQuickAdd && prod.inStock && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onQuickAdd(prod, prod.sizes[0] || 'M');
                              setQuickAddedId(prod.id);
                              setTimeout(() => setQuickAddedId(null), 1500);
                            }}
                            className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase transition-colors shrink-0 ${
                              quickAddedId === prod.id
                                ? 'bg-emerald-500 text-black'
                                : 'bg-white text-black hover:bg-neutral-200'
                            }`}
                          >
                            {quickAddedId === prod.id ? 'PŘIDÁNO' : '+ KOŠÍK'}
                          </button>
                        )}

                        <div className="text-neutral-500 group-hover/item:text-white p-1">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-neutral-950/60 border border-neutral-800/80 text-xs font-mono text-neutral-400 leading-relaxed">
                    <strong className="text-white block mb-1">STYLING NOTE:</strong>
                    Všechny kousky v tomto looku mají uvolněný unisex oversized fit. Doporučujeme kombinovat s černými volnými cargo kalhotami nebo rovnou džínovinou a teniskami v neutrálních tónech.
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
