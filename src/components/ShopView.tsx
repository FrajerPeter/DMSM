import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { DROPS } from '../data/drops';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Filter } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface ShopViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  initialCategory?: ProductCategory;
  initialDropId?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onSelectProduct,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
  initialCategory = 'ALL',
  initialDropId
}) => {
  const [category, setCategory] = useState<ProductCategory>(initialCategory);
  const [selectedDrop, setSelectedDrop] = useState<string>(initialDropId || 'ALL');
  const [selectedSize, setSelectedSize] = useState<string>('ALL');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'NEWEST' | 'PRICE_ASC' | 'PRICE_DESC' | 'POPULAR'>('POPULAR');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const categories: ProductCategory[] = ['ALL', 'T-SHIRTS', 'HOODIES', 'SWEATSHIRTS', 'ACCESSORIES'];
  const sizes = ['ALL', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Category filter
      if (category !== 'ALL' && prod.category !== category) return false;
      // Drop filter
      if (selectedDrop !== 'ALL' && prod.dropId !== selectedDrop) return false;
      // Size filter
      if (selectedSize !== 'ALL' && !prod.sizes.includes(selectedSize)) return false;
      // Stock filter
      if (onlyInStock && !prod.inStock) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_ASC') return a.price - b.price;
      if (sortBy === 'PRICE_DESC') return b.price - a.price;
      if (sortBy === 'NEWEST') return (b.status === 'NEW' ? 1 : 0) - (a.status === 'NEW' ? 1 : 0);
      // Popular default
      return (b.originalPrice ? 1 : 0) - (a.originalPrice ? 1 : 0);
    });
  }, [category, selectedDrop, selectedSize, onlyInStock, sortBy]);

  const handleCategoryChange = (cat: ProductCategory) => {
    setCategory(cat);
    analytics.trackEvent('filter_category', { category: cat });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <span>OFFICIAL CATALOGUE</span>
            <span aria-hidden="true">·</span>
            <span>24 ITEMS</span>
            <span aria-hidden="true">·</span>
            <span>FP VUT BRNO</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-white">
            SHOP ALL
          </h1>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <ArrowUpDown size={14} />
            <span className="hidden sm:inline">ŘAZENÍ:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-neutral-950 border border-neutral-800 text-white px-3 py-1.5 focus:outline-none focus:border-white font-mono"
            >
              <option value="POPULAR">Nejpopulárnější</option>
              <option value="NEWEST">Nejnovější</option>
              <option value="PRICE_ASC">Cena: Od nejnižší</option>
              <option value="PRICE_DESC">Cena: Od nejvyšší</option>
            </select>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden p-2 bg-neutral-900 border border-neutral-800 text-neutral-300"
            aria-label="Filtry"
          >
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Category Tabs (Segmented Clean Streetwear Controls) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-neutral-800/80 mb-8 text-xs font-mono">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3.5 py-1.5 border uppercase tracking-wider transition-colors whitespace-nowrap ${
              category === cat
                ? 'bg-white text-black border-white font-bold'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-600'
            }`}
          >
            {cat === 'ALL' ? 'VŠECHNO' :
             cat === 'T-SHIRTS' ? 'TRIČKA (TEES)' :
             cat === 'HOODIES' ? 'MIKINY S KAPUCÍ' :
             cat === 'SWEATSHIRTS' ? 'CREWNECK MIKINY' : 'DOPLŇKY'}
          </button>
        ))}
      </div>

      {/* Filter Bar (Drop, Size, Stock status) */}
      <div className={`mb-8 p-4 bg-neutral-950 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono ${mobileFilterOpen ? 'block' : 'hidden md:flex'}`}>
        {/* Drop Selector */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">DROP:</span>
          <select
            value={selectedDrop}
            onChange={e => setSelectedDrop(e.target.value)}
            className="bg-black border border-neutral-800 text-white px-2.5 py-1"
          >
            <option value="ALL">Všechny dropy</option>
            {DROPS.map(d => (
              <option key={d.id} value={d.id}>{d.code} — {d.title}</option>
            ))}
          </select>
        </div>

        {/* Size Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400 mr-1">VELIKOST:</span>
          {sizes.map(s => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`px-2 py-0.5 border text-[11px] ${
                selectedSize === s
                  ? 'bg-neutral-200 text-black border-white font-bold'
                  : 'bg-black text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Stock Toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={e => setOnlyInStock(e.target.checked)}
            className="rounded bg-black border-neutral-800"
          />
          <span>Pouze skladem</span>
        </label>

        {/* Reset filter if any active */}
        {(category !== 'ALL' || selectedDrop !== 'ALL' || selectedSize !== 'ALL' || onlyInStock) && (
          <button
            onClick={() => {
              setCategory('ALL');
              setSelectedDrop('ALL');
              setSelectedSize('ALL');
              setOnlyInStock(false);
            }}
            className="text-neutral-400 hover:text-white underline underline-offset-2 flex items-center gap-1 ml-auto"
          >
            <X size={12} />
            <span>Resetovat filtry</span>
          </button>
        )}
      </div>

      {/* Product Results Counter */}
      <div className="mb-6 flex justify-between items-center text-xs font-mono text-neutral-400">
        <span>Zobrazeno {filteredProducts.length} z {PRODUCTS.length} produktů</span>
        {selectedDrop !== 'ALL' && (
          <span className="text-white font-bold">
            {DROPS.find(d => d.id === selectedDrop)?.title}
          </span>
        )}
      </div>

      {/* Product Grid (3-column desktop as required by e-commerce design specs) */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <p className="font-display font-bold text-lg uppercase text-neutral-400">
            ŽÁDNÉ PRODUKTY NEODPOVÍDAJÍ ZVOLENÝM FILTRŮM
          </p>
          <button
            onClick={() => {
              setCategory('ALL');
              setSelectedDrop('ALL');
              setSelectedSize('ALL');
              setOnlyInStock(false);
            }}
            className="px-4 py-2 bg-white text-black font-mono text-xs uppercase font-bold"
          >
            ZOBRAZIT VŠECHNY PRODUKTY
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map(product => (
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
      )}
    </div>
  );
};
