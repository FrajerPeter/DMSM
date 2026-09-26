import React, { useState } from 'react';
import { Home, Grid, Zap, Heart, User, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { DROPS } from '../data/drops';
import { ProductImage } from './ProductImage';
import { Product } from '../types';
import { analytics } from '../utils/analytics';

interface MobileAppSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
  cartCount: number;
}

export const MobileAppSimulator: React.FC<MobileAppSimulatorProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  wishlistIds,
  cartCount
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'HOME' | 'SHOP' | 'DROPS' | 'WISHLIST' | 'PROFILE'>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const wishlistedProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));
  const filteredProducts = selectedCategory === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        {/* Device frame toggle header */}
        <div className="w-full flex items-center justify-between pb-3 px-2 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5 text-white font-bold">
            <Sparkles size={13} className="text-emerald-400" />
            <span>FP DROP APP (PROTOTYP)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white"
            aria-label="Zavřít simulátor"
          >
            <X size={18} />
          </button>
        </div>

        {/* iPhone Chassis Container */}
        <div className="w-full h-[760px] max-h-[85vh] bg-[#000] border-[8px] border-neutral-800 rounded-[48px] shadow-2xl overflow-hidden flex flex-col relative select-none">
          {/* Dynamic Island & Status Bar */}
          <div className="h-10 bg-black flex items-center justify-between px-7 shrink-0 text-[11px] font-mono text-neutral-400 z-30">
            <span>09:41</span>
            <div className="w-24 h-5 bg-neutral-900 rounded-full flex items-center justify-center">
              <span className="w-2.5 h-2.5 bg-neutral-800 rounded-full mr-2" />
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
            <span>5G 100%</span>
          </div>

          {/* App Top App Bar */}
          <div className="h-12 bg-[#0d0d0d] border-b border-neutral-800/80 px-4 flex items-center justify-between shrink-0 z-20">
            <span className="font-display font-black text-sm tracking-wider text-white">
              FP DROP
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-[10px] px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300">
                BRNO
              </span>
            </div>
          </div>

          {/* Screen Content Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto bg-[#0a0a0a] text-neutral-100 p-4 space-y-5">
            {/* SCREEN: HOME */}
            {activeTab === 'HOME' && (
              <div className="space-y-4">
                {/* Hero Drop Widget */}
                <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase">
                    <span className="text-white font-bold">DROP 001 LIVE</span>
                    <span className="text-emerald-400 animate-pulse">● SKLADEM</span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-white uppercase leading-tight">
                    FIRST SEMESTER
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans">
                    Tvůj nový studentský uniform. Heavyweight 240g bavlna a nadsázka.
                  </p>
                  <button
                    onClick={() => setActiveTab('SHOP')}
                    className="w-full py-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 mt-2"
                  >
                    PROZKOUMAT DROP
                  </button>
                </div>

                {/* Popular Tee Spotlight */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                    <span className="uppercase text-white font-bold">BEST SELLER</span>
                    <button onClick={() => setActiveTab('SHOP')} className="text-neutral-400 hover:text-white">Vše</button>
                  </div>
                  <div
                    onClick={() => {
                      onClose();
                      onSelectProduct(PRODUCTS[0]);
                    }}
                    className="p-3 bg-neutral-900 border border-neutral-800 cursor-pointer flex gap-3 items-center"
                  >
                    <div className="w-16 h-16 shrink-0 bg-neutral-950 border border-neutral-800">
                      <ProductImage
                        imageUrl={PRODUCTS[0].images?.front || PRODUCTS[0].imageUrl}
                        alt={PRODUCTS[0].name}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-white uppercase">{PRODUCTS[0].name}</h4>
                      <p className="font-mono text-xs text-white mt-1">{PRODUCTS[0].price} Kč</p>
                      <span className="text-[10px] font-mono text-neutral-400">Klikni pro detail</span>
                    </div>
                  </div>
                </div>

                {/* Quick News Banner */}
                <div className="p-3 bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400">
                  <strong className="text-white block mb-0.5">ZÁSILKOVNA & OSOBNÍ ODBĚR</strong>
                  Osobní odběr zdarma přímo na Kolejní 29 na Fakultě podnikatelské VUT.
                </div>
              </div>
            )}

            {/* SCREEN: SHOP */}
            {activeTab === 'SHOP' && (
              <div className="space-y-4">
                {/* Horizontal Category Filters */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
                  {['ALL', 'T-SHIRTS', 'HOODIES', 'ACCESSORIES'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 border whitespace-nowrap uppercase ${
                        selectedCategory === cat
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* 2-column mobile grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {filteredProducts.slice(0, 10).map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(p);
                      }}
                      className="p-2 bg-neutral-900 border border-neutral-800 cursor-pointer flex flex-col justify-between"
                    >
                      <div className="aspect-square bg-neutral-950 border border-neutral-800 mb-2">
                        <ProductImage
                          imageUrl={p.images?.front || p.imageUrl}
                          alt={p.name}
                          className="w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-neutral-400 uppercase truncate">{p.category}</div>
                        <h4 className="font-display font-bold text-[11px] text-white uppercase truncate">{p.name}</h4>
                        <div className="font-mono text-[11px] font-bold text-white mt-1">{p.price} Kč</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCREEN: DROPS */}
            {activeTab === 'DROPS' && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm uppercase text-white mb-2">
                  LIMITOVANÉ DROPY (2026)
                </h3>
                {DROPS.map(drop => (
                  <div key={drop.id} className="p-4 bg-neutral-900 border border-neutral-800 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-white font-bold">{drop.code}</span>
                      <span className="px-1.5 py-0.5 bg-neutral-800 text-neutral-300 uppercase">{drop.status}</span>
                    </div>
                    <div className="font-display font-bold text-sm text-white uppercase">{drop.title}</div>
                    <p className="text-xs text-neutral-400 font-sans">{drop.subtitle}</p>
                    <div className="text-[10px] font-mono text-neutral-400 pt-1">
                      Kampaň: {drop.campaignHeadline}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SCREEN: WISHLIST */}
            {activeTab === 'WISHLIST' && (
              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm uppercase text-white mb-2">
                  OBLÍBENÉ KUSY ({wishlistedProducts.length})
                </h3>
                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-10 text-xs font-mono text-neutral-400">
                    Nemáte zatím uloženy žádné oblíbené produkty. Klikněte na srdíčko na kartě v obchodě.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {wishlistedProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(p);
                        }}
                        className="p-2.5 bg-neutral-900 border border-neutral-800 flex items-center gap-3 cursor-pointer"
                      >
                        <div className="w-12 h-12 bg-black border border-neutral-800">
                          <ProductImage
                            imageUrl={p.images?.front || p.imageUrl}
                            alt={p.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold text-xs text-white truncate">{p.name}</h4>
                          <span className="font-mono text-xs text-white">{p.price} Kč</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SCREEN: PROFILE */}
            {activeTab === 'PROFILE' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-neutral-900 border border-neutral-800">
                  <div className="font-display font-bold text-sm text-white uppercase">TEREZA NOVÁKOVÁ</div>
                  <div className="text-neutral-400 text-[11px] mt-0.5">tereza.novakova@vut.cz</div>
                  <div className="mt-2 text-[10px] px-2 py-0.5 bg-emerald-950/60 border border-emerald-800 text-emerald-300 inline-block">
                    STUDENTSKÝ ÚČET FP VUT (SLEVA 10 %)
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="p-3 bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-neutral-300">
                    <span>Moje objednávky</span>
                    <span className="text-neutral-400">1 aktivní</span>
                  </div>
                  <div className="p-3 bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-neutral-300">
                    <span>Oblíbené Z-BOXY</span>
                    <span className="text-neutral-400">Kolejní 2</span>
                  </div>
                  <div className="p-3 bg-neutral-900/60 border border-neutral-800 flex justify-between items-center text-neutral-300">
                    <span>Notifikace na další drop</span>
                    <span className="text-emerald-400">ZAPNUTO</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM NAVIGATION BAR (Strictly matching prompt: HOME, SHOP, DROP, WISHLIST, PROFILE) */}
          <div className="h-16 bg-[#0a0a0a] border-t border-neutral-800 px-3 flex items-center justify-around shrink-0 z-30 font-mono text-[10px]">
            <button
              onClick={() => setActiveTab('HOME')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'HOME' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Home size={18} />
              <span>HOME</span>
            </button>

            <button
              onClick={() => setActiveTab('SHOP')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'SHOP' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Grid size={18} />
              <span>SHOP</span>
            </button>

            <button
              onClick={() => setActiveTab('DROPS')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'DROPS' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Zap size={18} />
              <span>DROP</span>
            </button>

            <button
              onClick={() => setActiveTab('WISHLIST')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'WISHLIST' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Heart size={18} />
              <span>WISHLIST</span>
            </button>

            <button
              onClick={() => setActiveTab('PROFILE')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'PROFILE' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <User size={18} />
              <span>PROFILE</span>
            </button>
          </div>

          {/* iPhone Home Indicator bar */}
          <div className="h-4 bg-[#0a0a0a] flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-neutral-700 rounded-full" />
          </div>
        </div>

        <p className="mt-3 text-[11px] font-mono text-neutral-400 text-center">
          Budoucí React Native / Expo architektura pro iOS a Android.
        </p>
      </div>
    </div>
  );
};
