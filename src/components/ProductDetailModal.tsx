import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { X, Check, Truck, RotateCcw, Ruler, ArrowRight, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { analytics } from '../utils/analytics';
import { PRODUCTS } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onBuyNow: (product: Product, size: string, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onSelectProduct
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.color);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeAngle, setActiveAngle] = useState<'front' | 'back' | 'detail'>('front');
  const [showFitCalculator, setShowFitCalculator] = useState<boolean>(false);
  const [calcHeight, setCalcHeight] = useState<number>(182);
  const [calcWeight, setCalcWeight] = useState<number>(75);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Accordion open states
  const [openSection, setOpenSection] = useState<'desc' | 'size' | 'material' | 'shipping' | 'returns' | null>('desc');

  const toggleSection = (section: 'desc' | 'size' | 'material' | 'shipping' | 'returns') => {
    setOpenSection(openSection === section ? null : section);
  };

  // Dynamic size suggestion based on height & weight
  const calculateSuggestedSize = (): string => {
    if (calcHeight < 172 || calcWeight < 64) return 'S';
    if (calcHeight < 180 && calcWeight < 74) return 'M';
    if (calcHeight < 188 && calcWeight < 86) return 'L';
    return 'XL';
  };

  const suggestedSize = calculateSuggestedSize();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.color);
      setQuantity(1);
      setActiveAngle('front');
      setOpenSection('desc');

      analytics.trackEvent('view_item', {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        item_drop: product.dropName,
        value: product.price,
        currency: 'CZK'
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    onAddToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    onBuyNow(product, selectedSize, quantity);
  };

  // Related products from same drop or category
  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.dropId === product.dropId || p.category === product.category)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-[#0c0c0c] border border-neutral-800 text-neutral-100 shadow-2xl z-10 my-auto min-h-screen md:min-h-0 md:max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0c0c0c] sticky top-0 z-20">
          <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-400">
            <span className="text-white font-bold tracking-wider">{product.dropName}</span>
            <span aria-hidden="true" className="text-neutral-700">/</span>
            <span className="text-neutral-400 uppercase">{product.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            aria-label="Zavřít detail"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: Two Column Studio Experience */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Large Product Photography */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-square w-full bg-[#141414] border border-neutral-800 flex items-center justify-center overflow-hidden">
                <ProductImage
                  imageUrl={
                    activeAngle === 'back'
                      ? (product.images?.back || product.imageUrl)
                      : activeAngle === 'detail'
                      ? (product.images?.detail || product.imageUrl)
                      : (product.images?.front || product.imageUrl)
                  }
                  alt={`${product.name} — ${activeAngle.toUpperCase()}`}
                  className="w-full h-full"
                />

                {/* Status Badge */}
                {product.status !== 'AVAILABLE' && (
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-white text-black">
                      {product.status === 'LIMITED'
                        ? 'LIMITED RUN'
                        : product.status === 'LAST PIECES'
                        ? 'LAST PIECES'
                        : product.status}
                    </span>
                  </div>
                )}
              </div>

              {/* View angle toggles: FRONT / BACK / DETAIL */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveAngle('front')}
                  className={`py-2 text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                    activeAngle === 'front'
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  FRONT
                </button>
                <button
                  onClick={() => setActiveAngle('back')}
                  className={`py-2 text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                    activeAngle === 'back'
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  BACK
                </button>
                <button
                  onClick={() => setActiveAngle('detail')}
                  className={`py-2 text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                    activeAngle === 'detail'
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  DETAIL
                </button>
              </div>

              {/* Garment Quick Specs */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-mono">
                <div className="p-2.5 bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase block">GRAMÁŽ</span>
                  <span className="text-white font-bold mt-0.5 block">{product.material.includes('450') ? '450 GSM' : '240 GSM'}</span>
                </div>
                <div className="p-2.5 bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase block">STŘIH</span>
                  <span className="text-white font-bold mt-0.5 block">{product.fit.split(' ')[0]} Fit</span>
                </div>
                <div className="p-2.5 bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase block">PŮVOD</span>
                  <span className="text-white font-bold mt-0.5 block">Sítotisk Brno</span>
                </div>
              </div>
            </div>

            {/* Right Column: Information & Purchase Module */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                {/* 1. PRODUCT NAME */}
                <div>
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                    {product.dropName}
                  </div>
                  <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight text-white uppercase leading-tight">
                    {product.name}
                  </h1>
                </div>

                {/* 2. PRICE */}
                <div className="flex items-baseline gap-3 pb-3 border-b border-neutral-800">
                  <span className="font-mono text-3xl font-bold text-white tabular-nums">
                    {product.price} Kč
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-base text-neutral-400 line-through tabular-nums">
                      {product.originalPrice} Kč
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-neutral-400 ml-auto">
                    VČETNĚ 21% DPH
                  </span>
                </div>

                {/* 3. COLOR SELECTOR */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-neutral-400 uppercase">BARVA:</span>
                    <span className="text-white font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedColor(product.color)}
                      className="px-3 py-1.5 bg-neutral-950 border border-white text-xs font-mono text-white flex items-center gap-2"
                    >
                      <span className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-600" />
                      <span>{product.color.split(' ')[0]}</span>
                    </button>
                  </div>
                </div>

                {/* 4. SIZE SELECTOR */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-neutral-400 uppercase">VELIKOST:</span>
                    <button
                      onClick={() => setShowFitCalculator(!showFitCalculator)}
                      className="text-white underline hover:text-neutral-300 flex items-center gap-1 font-bold text-[11px]"
                    >
                      <Ruler size={12} />
                      <span>Kalkulátor velikosti</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-mono font-bold uppercase tracking-wider border transition-all ${
                          selectedSize === size
                            ? 'bg-white text-black border-white shadow-lg'
                            : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Interactive Fit Calculator Slider Dropdown */}
                  {showFitCalculator && (
                    <div className="mt-3 p-3.5 bg-neutral-950 border border-neutral-700 text-xs font-mono space-y-3">
                      <div className="text-white font-bold text-[11px] flex justify-between">
                        <span>STUDENTSKÝ FIT KALKULÁTOR</span>
                        <span className="text-neutral-400">FP VUT</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">
                            VÝŠKA: <strong className="text-white">{calcHeight} cm</strong>
                          </label>
                          <input
                            type="range"
                            min="160"
                            max="205"
                            value={calcHeight}
                            onChange={e => setCalcHeight(Number(e.target.value))}
                            className="w-full accent-white cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 block mb-1">
                            VÁHA: <strong className="text-white">{calcWeight} kg</strong>
                          </label>
                          <input
                            type="range"
                            min="50"
                            max="115"
                            value={calcWeight}
                            onChange={e => setCalcWeight(Number(e.target.value))}
                            className="w-full accent-white cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                        <span className="text-[11px] text-neutral-300">
                          Doporučeno: <strong className="text-white">{suggestedSize} (Boxy fit)</strong>
                        </span>
                        <button
                          onClick={() => {
                            if (product.sizes.includes(suggestedSize)) {
                              setSelectedSize(suggestedSize);
                              setShowFitCalculator(false);
                            }
                          }}
                          className="px-2.5 py-1 bg-white text-black font-bold text-[10px] uppercase hover:bg-neutral-200"
                        >
                          Zvolit {suggestedSize}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. AVAILABILITY */}
                <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                  <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-neutral-300">
                    {product.inStock
                      ? `Skladem v Brně (${product.stockCount} ks) • Z-BOX Kolejní do 24h`
                      : 'Vyprodáno — přihlas se k informacím o restocku'}
                  </span>
                </div>

                {/* 6. ADD TO BAG & BUY NOW BUTTONS */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-mono">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="text-neutral-400 hover:text-white disabled:opacity-30 p-0.5"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 font-bold text-white tabular-nums">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stockCount || 10, quantity + 1))}
                        disabled={quantity >= (product.stockCount || 10)}
                        className="text-neutral-400 hover:text-white disabled:opacity-30 p-0.5"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`flex-1 py-3 px-6 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                        addedAnimation
                          ? 'bg-emerald-500 text-black'
                          : product.inStock
                          ? 'bg-white text-black hover:bg-neutral-200'
                          : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                      }`}
                    >
                      {addedAnimation ? (
                        <>
                          <Check size={16} />
                          <span>PŘIDÁNO DO TAŠKY</span>
                        </>
                      ) : (
                        <span>PŘIDAT DO TAŠKY — {product.price * quantity} Kč</span>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="w-full py-3 text-xs font-bold uppercase tracking-widest bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-neutral-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>RYCHLÝ CHECKOUT</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* 7. EXPANDABLE SECTIONS: DESCRIPTION, SIZE GUIDE, MATERIAL, SHIPPING, RETURNS */}
                <div className="pt-4 border-t border-neutral-800 divide-y divide-neutral-800/80 text-xs font-mono">
                  {/* DESCRIPTION */}
                  <div>
                    <button
                      onClick={() => toggleSection('desc')}
                      className="w-full py-3 flex items-center justify-between text-neutral-200 hover:text-white text-left font-bold"
                    >
                      <span>POPIS & INSPIRACE</span>
                      {openSection === 'desc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {openSection === 'desc' && (
                      <div className="pb-3 text-neutral-400 leading-relaxed font-sans text-xs">
                        <p>{product.description}</p>
                        <p className="mt-2 text-neutral-300 font-mono text-[11px]">
                          Vytištěno v limitované sérii pro studenty Fakulty podnikatelské VUT.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* SIZE GUIDE */}
                  <div>
                    <button
                      onClick={() => toggleSection('size')}
                      className="w-full py-3 flex items-center justify-between text-neutral-200 hover:text-white text-left font-bold"
                    >
                      <span>TABULKA VELIKOSTÍ (BOXY FIT)</span>
                      {openSection === 'size' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {openSection === 'size' && (
                      <div className="pb-3 text-neutral-300">
                        <p className="text-[11px] text-neutral-400 mb-2 font-mono">
                          Míry v centimetrech. Model měří 183 cm a má velikost L.
                        </p>
                        <table className="w-full text-[11px] font-mono border-collapse text-left">
                          <thead>
                            <tr className="border-b border-neutral-800 text-neutral-400">
                              <th className="py-1">VEL</th>
                              <th className="py-1">HRUDNÍK</th>
                              <th className="py-1">DÉLKA</th>
                              <th className="py-1">RUKÁV</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-900 text-neutral-300">
                            <tr><td className="py-1 font-bold text-white">S</td><td>55 cm</td><td>71 cm</td><td>22 cm</td></tr>
                            <tr><td className="py-1 font-bold text-white">M</td><td>58 cm</td><td>74 cm</td><td>23 cm</td></tr>
                            <tr><td className="py-1 font-bold text-white">L</td><td>61 cm</td><td>77 cm</td><td>24 cm</td></tr>
                            <tr><td className="py-1 font-bold text-white">XL</td><td>64 cm</td><td>80 cm</td><td>25 cm</td></tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* MATERIAL */}
                  <div>
                    <button
                      onClick={() => toggleSection('material')}
                      className="w-full py-3 flex items-center justify-between text-neutral-200 hover:text-white text-left font-bold"
                    >
                      <span>MATERIÁL & ÚDRŽBA</span>
                      {openSection === 'material' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {openSection === 'material' && (
                      <div className="pb-3 text-neutral-400 text-xs font-mono space-y-1">
                        <div>• Složení: <strong className="text-white">{product.material}</strong></div>
                        <div>• Lokální ruční sítotisk s vysokým krytím vytvrzený při 160 °C</div>
                        <div>• Prát naruby na 30 °C, nesušit v sušičce, žehlit mimo potisk</div>
                      </div>
                    )}
                  </div>

                  {/* SHIPPING */}
                  <div>
                    <button
                      onClick={() => toggleSection('shipping')}
                      className="w-full py-3 flex items-center justify-between text-neutral-200 hover:text-white text-left font-bold"
                    >
                      <span>DOPRAVA & VYZVEDNUTÍ</span>
                      {openSection === 'shipping' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {openSection === 'shipping' && (
                      <div className="pb-3 text-neutral-400 text-xs font-mono space-y-1.5">
                        <div className="text-white font-bold flex items-center gap-1">
                          <Truck size={13} />
                          <span>Zásilkovna (69 Kč) & Osobní odběr FP (0 Kč)</span>
                        </div>
                        <div>• Doprava ZDARMA při objednávce nad 1 000 Kč</div>
                        <div>• Osobní předání po přednáškách na Kolejní 29 zdarma</div>
                        <div>• Z-BOX Kolejní 2 (Koleje VUT Pod Palackého vrchem) do 24 hodin</div>
                      </div>
                    )}
                  </div>

                  {/* RETURNS */}
                  <div>
                    <button
                      onClick={() => toggleSection('returns')}
                      className="w-full py-3 flex items-center justify-between text-neutral-200 hover:text-white text-left font-bold"
                    >
                      <span>VÝMĚNA VELIKOSTI & VRÁCENÍ</span>
                      {openSection === 'returns' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {openSection === 'returns' && (
                      <div className="pb-3 text-neutral-400 text-xs font-mono space-y-1">
                        <div className="text-white font-bold flex items-center gap-1">
                          <RotateCcw size={13} />
                          <span>14 dní na bezplatnou výměnu velikosti</span>
                        </div>
                        <div>Nesedí velikost? Vyměníme ji přímo na fakultě nebo přes Zásilkovnu.</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8. YOU MAY ALSO LIKE (Related Streetwear) */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-800">
              <h3 className="font-display font-black text-sm uppercase tracking-wider text-neutral-400 mb-4">
                YOU MAY ALSO LIKE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="p-3 bg-neutral-950 border border-neutral-800 hover:border-neutral-500 cursor-pointer flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-16 h-16 shrink-0 bg-[#161616] border border-neutral-800">
                      <ProductImage
                        imageUrl={rel.images?.front || rel.imageUrl}
                        alt={rel.name}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-white uppercase truncate group-hover:text-neutral-200">
                        {rel.name}
                      </h4>
                      <p className="text-xs font-mono text-neutral-400 mt-0.5">{rel.price} Kč</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Mobile Quick Buy Bar */}
        <div className="md:hidden sticky bottom-0 z-30 bg-[#0c0c0c] border-t border-neutral-800 p-3 flex items-center justify-between gap-3 shadow-2xl">
          <div>
            <div className="font-mono text-sm font-bold text-white tabular-nums">{product.price * quantity} Kč</div>
            <div className="text-[10px] font-mono text-neutral-400 uppercase">Velikost: <strong className="text-white">{selectedSize}</strong></div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 py-3 px-4 font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
              addedAnimation ? 'bg-emerald-500 text-black' : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            {addedAnimation ? <Check size={14} /> : null}
            <span>{addedAnimation ? 'PŘIDÁNO DO TAŠKY' : 'PŘIDAT DO TAŠKY'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
