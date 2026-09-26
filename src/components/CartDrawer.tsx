import React, { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { ProductImage } from './ProductImage';
import { X, Trash2, ArrowRight, Plus, Minus, Tag, Check, Sparkles, Clock } from 'lucide-react';
import { analytics } from '../utils/analytics';
import { PRODUCTS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onAddProduct: (product: Product, size: string, quantity: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onAddProduct
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscountRate, setPromoDiscountRate] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [reservationSeconds, setReservationSeconds] = useState<number>(885); // 14:45

  // Reservation countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setReservationSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const FREE_SHIPPING_THRESHOLD = 1000;
  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = Math.round(subtotal * promoDiscountRate);
  const total = Math.max(0, subtotal - discountAmount);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const applyCode = (codeToApply: string) => {
    setPromoError(null);
    const code = codeToApply.trim().toUpperCase();
    if (code === 'PRVAK10') {
      setAppliedPromo('PRVAK10');
      setPromoDiscountRate(0.10);
      analytics.trackEvent('apply_promo_code', { promo_code: 'PRVAK10', discount: 10 });
    } else if (code === 'FPSTREET' || code === 'ZKOUSKOVE') {
      setAppliedPromo(code);
      setPromoDiscountRate(0.15);
      analytics.trackEvent('apply_promo_code', { promo_code: code, discount: 15 });
    } else if (code === 'ISIC') {
      setAppliedPromo('ISIC');
      setPromoDiscountRate(0.12);
      analytics.trackEvent('apply_promo_code', { promo_code: 'ISIC', discount: 12 });
    } else {
      setPromoError('Neplatný studentský kód. Zkus PRVAK10 nebo FPSTREET');
    }
  };

  const handleApplyPromo = () => {
    applyCode(promoCode);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscountRate(0);
    setPromoCode('');
  };

  const handleCheckoutClick = () => {
    analytics.trackEvent('begin_checkout', {
      value: total,
      currency: 'CZK',
      items: items.map(i => ({
        item_id: i.product.id,
        item_name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        size: i.size
      }))
    });
    onCheckout();
  };

  // Cross-sell accessory suggestions (Socks or Stickers)
  const crossSellAccessories = PRODUCTS.filter(p => p.id === 'prod-21' || p.id === 'prod-23');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0e0e] border-l border-neutral-800 text-neutral-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="font-display font-extrabold text-base tracking-wider uppercase text-white">
                NÁKUPNÍ KOŠÍK
              </h2>
              <span className="font-mono text-xs text-neutral-400">
                ({items.reduce((s, i) => s + i.quantity, 0)} ks)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Zavřít košík"
            >
              <X size={18} />
            </button>
          </div>

          {/* Streetwear Drop Reservation Alert */}
          {items.length > 0 && (
            <div className="px-6 py-2.5 bg-neutral-900 border-b border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                DROP 001 REZERVACE
              </span>
              <span className="text-white font-bold flex items-center gap-1 tabular-nums">
                <Clock size={12} className="text-amber-400" />
                {formatTimer(reservationSeconds)} min zbývá
              </span>
            </div>
          )}

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-neutral-950 border-b border-neutral-800/80">
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-neutral-300">
                {amountToFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles size={12} />
                    MÁŠ DOPRAVU ZDARMA!
                  </span>
                ) : (
                  <span>Do dopravy zdarma ti chybí <strong className="text-white">{amountToFreeShipping} Kč</strong></span>
                )}
              </span>
              <span className="text-neutral-400 font-mono">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-600 font-mono">
                  0
                </div>
                <h3 className="font-display font-bold text-sm uppercase text-neutral-300">
                  TVŮJ KOŠÍK JE PRÁZDNÝ
                </h3>
                <p className="text-xs text-neutral-400 max-w-xs font-mono">
                  Prohlédni si Drop 001 nebo ostatní kousky a doplň svůj univerzitní šatník.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2.5 bg-white text-black text-xs font-bold font-mono uppercase tracking-wider hover:bg-neutral-200"
                >
                  PROZKOUMAT DROPY
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                >
                  <div className="w-20 h-20 shrink-0 bg-[#141414] border border-neutral-800 overflow-hidden">
                    <ProductImage
                      imageUrl={item.product.images?.front || item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display font-bold text-xs uppercase text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => {
                            analytics.trackEvent('remove_from_cart', {
                              item_id: item.product.id,
                              item_name: item.product.name,
                              price: item.product.price,
                              size: item.size
                            });
                            onRemoveItem(item.id);
                          }}
                          className="text-neutral-500 hover:text-red-400 p-0.5 transition-colors"
                          aria-label="Odstranit položku"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-neutral-400">
                        <span>VELIKOST: <strong className="text-neutral-200">{item.size}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span className="text-neutral-400">{item.product.price} Kč / ks</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-neutral-900">
                      <div className="flex items-center border border-neutral-800 bg-[#0d0d0d] px-1.5 py-0.5 text-xs font-mono">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 text-neutral-400 hover:text-white disabled:opacity-30"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2 font-bold text-white tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-neutral-400 hover:text-white"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="font-mono text-xs font-bold text-white tabular-nums">
                        {item.product.price * item.quantity} Kč
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Quick Cross-sell Addons if cart has items */}
            {items.length > 0 && amountToFreeShipping > 0 && (
              <div className="pt-2">
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  DOPLŇKEM ZÍSKEJ DOPRAVU ZDARMA:
                </div>
                <div className="space-y-2">
                  {crossSellAccessories.map(acc => (
                    <div
                      key={acc.id}
                      className="p-2.5 bg-neutral-900/50 border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-10 h-10 shrink-0 bg-black border border-neutral-800">
                          <ProductImage
                            imageUrl={acc.images?.front || acc.imageUrl}
                            alt={acc.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-white truncate text-[11px]">{acc.name}</div>
                          <div className="font-mono text-[10px] text-neutral-400">{acc.price} Kč</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onAddProduct(acc, acc.sizes[0] || 'ONE SIZE', 1)}
                        className="px-2.5 py-1 bg-white text-black font-mono text-[10px] font-bold uppercase hover:bg-neutral-200 shrink-0"
                      >
                        + PŘIDAT
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-[#0d0d0d] space-y-4">
              {/* Promo Code Input */}
              <div className="flex flex-col gap-1.5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2 bg-emerald-950/40 border border-emerald-800/80 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <Check size={13} />
                      <span>KÓD: <strong>{appliedPromo}</strong> (-{promoDiscountRate * 100} %)</span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-neutral-400 hover:text-white text-[11px] underline"
                    >
                      Odebrat
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={12} className="absolute left-2.5 top-2.5 text-neutral-500" />
                        <input
                          type="text"
                          placeholder="Kód slevy (např. PRVAK10)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 text-white text-xs pl-8 pr-3 py-2 uppercase font-mono placeholder:text-neutral-600 focus:outline-none focus:border-white"
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono uppercase"
                      >
                        POUŽÍT
                      </button>
                    </div>

                    {/* Quick 1-click Student Codes */}
                    <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono">
                      <span className="text-neutral-400">RYCHLÝ KÓD:</span>
                      <button
                        onClick={() => applyCode('PRVAK10')}
                        className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white"
                      >
                        PRVAK10 (-10%)
                      </button>
                      <button
                        onClick={() => applyCode('FPSTREET')}
                        className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white"
                      >
                        FPSTREET (-15%)
                      </button>
                      <button
                        onClick={() => applyCode('ISIC')}
                        className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white"
                      >
                        ISIC (-12%)
                      </button>
                    </div>
                  </div>
                )}
                {promoError && (
                  <span className="text-[11px] font-mono text-red-400">{promoError}</span>
                )}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800">
                <div className="flex justify-between">
                  <span>Mezisoučet</span>
                  <span className="text-white tabular-nums">{subtotal} Kč</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Studentská sleva</span>
                    <span className="tabular-nums">-{discountAmount} Kč</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Odhad dopravy</span>
                  <span className="text-white tabular-nums">
                    {amountToFreeShipping === 0 ? 'ZDARMA' : 'Od 69 Kč'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                  <span className="font-display">CELKEM S DPH</span>
                  <span className="font-mono text-base tabular-nums">{total} Kč</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 text-xs font-bold font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <span>POKRAČOVAT K OBJEDNÁVCE</span>
                <ArrowRight size={14} />
              </button>

              <div className="text-[10px] font-mono text-center text-neutral-400">
                Bezpečný checkout • Zásilkovna • Apple Pay • Garance vrácení
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
