import React, { useState } from 'react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { Heart, Plus, Check, ArrowRight } from 'lucide-react';
import { analytics } from '../utils/analytics';
import { PRODUCT_IMAGES } from '../data/productImages';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  isWishlisted = false,
  onToggleWishlist
}) => {
  // Explicit CLICK-ONLY control for FRONT / BACK side
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>(product.sizes[0] || 'M');
  const [justAdded, setJustAdded] = useState(false);

  const hasBackImage = Boolean(PRODUCT_IMAGES[product.id]?.back);

  const handleCardClick = () => {
    analytics.trackEvent('select_item', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      item_category: product.category,
      item_drop: product.dropName
    });
    onSelect(product);
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    onQuickAdd(product, selectedQuickSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      analytics.trackEvent('wishlist_toggle', {
        item_id: product.id,
        item_name: product.name,
        action: isWishlisted ? 'remove' : 'add'
      });
      onToggleWishlist(product.id);
    }
  };

  // Consistent status badge text
  const badgeText =
    product.status === 'LIMITED'
      ? 'LIMITED RUN'
      : product.status === 'LAST PIECES'
      ? 'LAST PIECES'
      : product.status === 'NEW'
      ? 'NEW'
      : product.status === 'SOLD OUT'
      ? 'SOLD OUT'
      : null;

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#0b0b0b] border border-neutral-800 hover:border-neutral-500 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* 1. REAL PRODUCT PHOTOGRAPHY CONTAINER */}
      <div className="relative aspect-square w-full bg-[#121212] overflow-hidden select-none">
        <ProductImage
          imageUrl={
            cardSide === 'back'
              ? (product.images?.back || product.imageUrl)
              : (product.images?.front || product.imageUrl)
          }
          alt={`${product.name} — ${cardSide.toUpperCase()}`}
          className="transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
        />

        {/* 2. BADGE (Top Left) & WISHLIST (Top Right) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
          <div>
            {badgeText && (
              <span
                className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 ${
                  product.status === 'LIMITED'
                    ? 'bg-white text-black'
                    : product.status === 'LAST PIECES'
                    ? 'bg-amber-400 text-black'
                    : product.status === 'SOLD OUT'
                    ? 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                    : 'bg-neutral-900 text-neutral-200 border border-neutral-700'
                }`}
              >
                {badgeText}
              </span>
            )}
          </div>

          {onToggleWishlist && (
            <button
              onClick={handleWishlistClick}
              aria-label="Přidat do oblíbených"
              className="p-1.5 bg-black/80 hover:bg-black text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors pointer-events-auto backdrop-blur-sm"
            >
              <Heart
                size={14}
                className={isWishlisted ? 'fill-white text-white' : 'text-neutral-400'}
              />
            </button>
          )}
        </div>

        {/* 3. CLICKABLE FRONT / BACK CONTROL (Click only, never switches on hover) */}
        {hasBackImage && (
          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-black/85 border border-neutral-800 p-0.5 backdrop-blur-sm">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCardSide('front');
              }}
              className={`px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase transition-colors ${
                cardSide === 'front'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              FRONT
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCardSide('back');
              }}
              className={`px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase transition-colors ${
                cardSide === 'back'
                  ? 'bg-white text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              BACK
            </button>
          </div>
        )}

        {/* 4. SUBTLE HOVER INDICATOR: Minimal "VIEW PRODUCT →" Center Badge */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <span className="px-3.5 py-1.5 bg-black/85 border border-neutral-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5 shadow-2xl">
            <span>VIEW PRODUCT</span>
            <ArrowRight size={12} />
          </span>
        </div>

        {/* 5. HOVER ACTION BAR: Quick size selector + ADD TO BAG on desktop hover */}
        {product.inStock && (
          <div className="absolute inset-x-0 bottom-0 bg-black/95 border-t border-neutral-800 px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200 hidden md:flex items-center justify-between z-20">
            <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
              <span className="text-neutral-500 mr-0.5 uppercase">VEL:</span>
              {product.sizes.slice(0, 5).map(size => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedQuickSize(size);
                  }}
                  className={`px-1.5 py-0.5 border text-[10px] font-mono transition-colors ${
                    selectedQuickSize === size
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={handleQuickAddClick}
              className={`flex items-center gap-1 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider transition-colors shrink-0 ${
                justAdded ? 'bg-emerald-500 text-black' : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={12} />
                  <span>PŘIDÁNO</span>
                </>
              ) : (
                <>
                  <Plus size={12} />
                  <span>+ KOŠÍK</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* 6. CARD HIERARCHY: CATEGORY, PRODUCT NAME, SHORT DESCRIPTION, PRICE, AVAILABILITY */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5 bg-[#0b0b0b]">
        <div>
          {/* CATEGORY */}
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
            {product.category}
          </div>

          {/* PRODUCT NAME (Clean, full uppercase, never truncated) */}
          <h3 className="font-display font-black text-sm uppercase tracking-tight text-white group-hover:text-neutral-200 leading-snug">
            {product.name}
          </h3>

          {/* SHORT DESCRIPTION */}
          <p className="text-[11px] text-neutral-400 font-mono mt-1 line-clamp-1 italic">
            „{product.fit} — {product.material.split('(')[0].trim()}“
          </p>
        </div>

        {/* PRICE & AVAILABILITY */}
        <div className="flex items-baseline justify-between pt-2 border-t border-neutral-900">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {product.price} Kč
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-neutral-500 line-through tabular-nums">
                {product.originalPrice} Kč
              </span>
            )}
          </div>

          <div className="text-[10px] font-mono uppercase tracking-widest text-right">
            {product.inStock ? (
              <span className="text-neutral-400">
                {product.stockCount && product.stockCount <= 5
                  ? `POSLEDNÍ ${product.stockCount} KS`
                  : 'SKLADEM BRNO'}
              </span>
            ) : (
              <span className="text-neutral-600 font-bold">VYPRODÁNO</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
