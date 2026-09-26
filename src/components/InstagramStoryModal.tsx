import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { X, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, Check, Flame } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface InstagramStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
}

interface StorySlide {
  id: string;
  title: string;
  location: string;
  timeAgo: string;
  productId: string;
  caption: string;
  stickerText: string;
  tags: string[];
}

const STORIES: StorySlide[] = [
  {
    id: 'story-1',
    title: '@fpdrop • Kolejní 29',
    location: 'Areál FP VUT Brno',
    timeAgo: 'Před 2h',
    productId: 'prod-01', // HOT GIRLS GO TO FP
    caption: '„Drop 001 je venku. Už žádný nudný univerzitní textil. 240 GSM bio bavlna na těle.“',
    stickerText: '🔥 KOUPIT TEE — 399 Kč',
    tags: ['#fpdrop', '#kolejni29', '#fpvut']
  },
  {
    id: 'story-2',
    title: '@fpdrop • Studovna FP',
    location: 'Knihovna FP VUT',
    timeAgo: 'Před 4h',
    productId: 'prod-13', // NO SLEEP JUST DEADLINES HOODIE
    caption: '„Zkouškové se blíží. 450 GSM těžká mikina pro noční učení a litry kávy.“',
    stickerText: '☕ KOUPIT MIKINU — 899 Kč',
    tags: ['#nosleep', '#deadlines', '#survivor']
  },
  {
    id: 'story-3',
    title: '@fpdrop • Noční Brno',
    location: 'Jakubské náměstí & Noční rozjezd',
    timeAgo: 'Před 6h',
    productId: 'prod-04', // FP AFTER DARK
    caption: '„Když skončí přednášky a začíná brněnská noc. Streetwear pro ty, co nespí.“',
    stickerText: '🌙 KOUPIT AFTER DARK — 399 Kč',
    tags: ['#afterdark', '#brnolife', '#salina12']
  },
  {
    id: 'story-4',
    title: '@fpdrop • Unboxing',
    location: 'Koleje Pod Palackého vrchem',
    timeAgo: 'Před 8h',
    productId: 'prod-23', // STICKER PACK
    caption: '„Balíček dorazil do Z-BOXu u bloku A03 za necelých 24 hodin! Samolepky top.“',
    stickerText: '⚡ SAMOLEPKY ZDARMA S KÓDEM',
    tags: ['#zasilkovna', '#zbox', '#merch']
  }
];

export const InstagramStoryModal: React.FC<InstagramStoryModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onQuickAdd
}) => {
  if (!isOpen) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [addedItem, setAddedItem] = useState(false);

  const currentStory = STORIES[currentIndex];
  const product = PRODUCTS.find(p => p.id === currentStory.productId) || PRODUCTS[0];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < STORIES.length - 1) return prev + 1;
        return 0;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < STORIES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleStickerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    analytics.trackEvent('instagram_story_sticker_click', {
      story_id: currentStory.id,
      product_id: product.id
    });
    onQuickAdd(product, product.sizes[0] || 'M');
    setAddedItem(true);
    setTimeout(() => setAddedItem(false), 2000);
  };

  const handleViewProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    onSelectProduct(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md">
      {/* Close Outside */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Story Phone Container */}
      <div
        className="relative w-full max-w-sm h-full md:h-[680px] bg-[#0c0c0c] border border-neutral-800 md:rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Top Progress Bars */}
        <div className="absolute top-3 inset-x-3 z-30 flex items-center gap-1.5">
          {STORIES.map((s, idx) => (
            <div key={s.id} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full bg-white transition-all ${
                  idx < currentIndex
                    ? 'w-full'
                    : idx === currentIndex
                    ? 'w-full duration-[5500ms] ease-linear'
                    : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="absolute top-6 inset-x-4 z-30 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center font-display font-black text-[10px]">
                FP
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                <span>{currentStory.title}</span>
                <span className="text-neutral-400 font-normal">{currentStory.timeAgo}</span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block">
                {currentStory.location}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white bg-black/50 rounded-full backdrop-blur-sm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tap areas for next/prev */}
        <div className="absolute inset-0 z-20 flex">
          <div className="w-1/3 h-full cursor-w-resize" onClick={handlePrev} />
          <div className="w-2/3 h-full cursor-e-resize" onClick={handleNext} />
        </div>

        {/* Story Body Visual */}
        <div className="relative flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-neutral-900 via-black to-neutral-950">
          <div className="relative w-full max-w-[260px] aspect-square my-auto pointer-events-none">
            <ProductImage
              imageUrl={product.images?.front || product.imageUrl}
              alt={product.name}
              className="w-full h-full"
            />
          </div>

          {/* Interactive Instagram "Link Sticker" overlay */}
          <div className="relative z-30 w-full space-y-3 pb-6">
            <button
              onClick={handleStickerClick}
              className={`w-full py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-2xl flex items-center justify-center gap-2 transition-transform transform active:scale-95 border ${
                addedItem
                  ? 'bg-emerald-500 text-black border-emerald-400'
                  : 'bg-white text-black hover:bg-neutral-200 border-white'
              }`}
            >
              {addedItem ? (
                <>
                  <Check size={16} />
                  <span>PŘIDÁNO DO KOŠÍKU!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={15} />
                  <span>{currentStory.stickerText}</span>
                </>
              )}
            </button>

            {/* Caption Card */}
            <div className="p-3 bg-black/75 backdrop-blur-md border border-neutral-800 rounded-xl text-left">
              <p className="text-xs text-white font-sans leading-relaxed">
                {currentStory.caption}
              </p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800 text-[10px] font-mono text-neutral-400">
                <span>{currentStory.tags.join(' ')}</span>
                <button
                  onClick={handleViewProduct}
                  className="text-white underline hover:text-neutral-200 font-bold"
                >
                  Detail kousku →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar indicator */}
        <div className="relative z-30 px-4 py-3 border-t border-neutral-900 bg-black/90 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>STORY {currentIndex + 1} Z {STORIES.length}</span>
          <span className="text-neutral-500">Klepni vpravo pro další</span>
        </div>
      </div>
    </div>
  );
};
