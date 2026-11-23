import React from 'react';
import { Product } from '../types';
import { getProductImageUrl } from '../data/productImages';
import { ProductImage } from './ProductImage';

interface ProductVisualProps {
  product: Product;
  view?: 'front' | 'back' | 'detail';
  className?: string;
  isHovered?: boolean;
  showTag?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  view = 'front',
  className = '',
  showTag = true
}) => {
  const activeView: 'front' | 'back' | 'detail' = view || 'front';
  const imageUrl =
    (activeView === 'back' && product.images?.back) ||
    (activeView === 'detail' && product.images?.detail) ||
    product.images?.front ||
    product.imageUrl ||
    getProductImageUrl(product.id, activeView);

  return (
    <div className={`relative aspect-square w-full bg-[#0c0c0c] overflow-hidden ${className}`}>
      {/* 1. Real Product Image component with standard <img> tag */}
      <ProductImage
        imageUrl={imageUrl}
        alt={`${product.name} — ${activeView.toUpperCase()}`}
        className="w-full h-full"
      />

      {/* 2. Status Badge (Optional) */}
      {showTag && product.status !== 'AVAILABLE' && (
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span
            className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 font-bold ${
              product.status === 'LIMITED'
                ? 'bg-white text-black'
                : product.status === 'SOLD OUT'
                ? 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                : product.status === 'LAST PIECES'
                ? 'bg-amber-400 text-black'
                : 'bg-neutral-900 text-neutral-200 border border-neutral-700'
            }`}
          >
            {product.status === 'LIMITED'
              ? 'LIMITED RUN'
              : product.status === 'SOLD OUT'
              ? 'SOLD OUT'
              : product.status === 'LAST PIECES'
              ? 'LAST PIECES'
              : 'NEW'}
          </span>
        </div>
      )}
    </div>
  );
};
