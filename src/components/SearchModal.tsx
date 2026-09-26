import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { ARTICLES } from '../data/news';
import { Product, Article } from '../types';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { analytics } from '../utils/analytics';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.trim().length > 1) {
      analytics.trackEvent('search', {
        search_term: query.trim()
      });
    }
  }, [query]);

  const trimmed = query.trim().toLowerCase();

  const matchingProducts = trimmed === ''
    ? []
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(trimmed) ||
        p.slogan.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.dropName.toLowerCase().includes(trimmed) ||
        p.description.toLowerCase().includes(trimmed)
      );

  const matchingArticles = trimmed === ''
    ? []
    : ARTICLES.filter(a =>
        a.title.toLowerCase().includes(trimmed) ||
        a.excerpt.toLowerCase().includes(trimmed) ||
        a.category.toLowerCase().includes(trimmed)
      );

  const quickSearchTags = ['HOT GIRLS', 'DEADLINES', 'HOODIE', 'KOLEJNÍ 29', 'BRNO', 'ECTS', 'TOTE BAG'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 p-4 bg-black/80 backdrop-blur-md">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0e0e0e] border border-neutral-800 text-neutral-100 shadow-2xl overflow-hidden flex flex-col z-10">
        {/* Input bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
          <Search size={18} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Hledej trička, mikiny, slogany, články (např. 'hot girls', 'deadlines')..."
            value={query}
            autoFocus
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm md:text-base font-mono text-white placeholder:text-neutral-600 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-500 hover:text-white text-xs font-mono"
            >
              Vymazat
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-4 py-2.5 bg-neutral-950 border-b border-neutral-900 flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-neutral-400">
          <span className="shrink-0 text-neutral-400">ČASTÉ DOTAZY:</span>
          {quickSearchTags.map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 border border-neutral-800 hover:border-neutral-600 hover:text-white bg-black whitespace-nowrap transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {trimmed === '' ? (
            <div className="text-center py-8 text-xs font-mono text-neutral-400">
              Začněte psát název produktu, slogan nebo kategorii...
            </div>
          ) : matchingProducts.length === 0 && matchingArticles.length === 0 ? (
            <div className="text-center py-8 text-xs font-mono text-neutral-400">
              Nebyly nalezeny žádné výsledky pro dotaz „{query}“.
            </div>
          ) : (
            <>
              {matchingProducts.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2">
                    PRODUKTY ({matchingProducts.length})
                  </div>
                  <div className="space-y-2">
                    {matchingProducts.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(prod);
                        }}
                        className="p-2.5 bg-neutral-950 border border-neutral-800 hover:border-neutral-600 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-12 h-12 shrink-0 bg-black border border-neutral-800">
                            <ProductImage
                              imageUrl={prod.images?.front || prod.imageUrl}
                              alt={prod.name}
                              className="w-full h-full"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-display font-bold text-xs uppercase text-white truncate">
                              {prod.name}
                            </h4>
                            <div className="text-[11px] font-mono text-neutral-400">
                              {prod.dropName.split('—')[0]} • {prod.category}
                            </div>
                          </div>
                        </div>
                        <div className="font-mono text-xs font-bold text-white tabular-nums shrink-0">
                          {prod.price} Kč
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingArticles.length > 0 && (
                <div className="pt-2 border-t border-neutral-800">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-2">
                    ČLÁNKY V MAGAZÍNU ({matchingArticles.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingArticles.map(art => (
                      <div
                        key={art.id}
                        className="p-2.5 bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-white">{art.title}</div>
                          <div className="text-[10px] text-neutral-400">{art.category} • {art.date}</div>
                        </div>
                        <ArrowRight size={13} className="text-neutral-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
