import React, { useState } from 'react';
import { CartItem, CustomerInfo, Order } from '../types';
import { X, CheckCircle, Package, CreditCard, Smartphone, Building2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { analytics } from '../utils/analytics';
import { ProductImage } from './ProductImage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: 'Tereza',
    lastName: 'Nováková',
    email: 'tereza.novakova@vut.cz',
    phone: '+420 777 123 456',
    street: 'Kolejní 2',
    city: 'Brno',
    postalCode: '612 00',
    deliveryMethod: 'zasilkovna',
    pickupBranch: 'Z-BOX Kolejní 2 (Koleje VUT Pod Palackého vrchem)',
    paymentMethod: 'applepay',
    note: 'Doručit do Z-BOXu u bloku A03'
  });

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Delivery costs
  const FREE_SHIPPING_THRESHOLD = 1000;
  const isFreeShipping = (subtotal - discount) >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = customer.deliveryMethod === 'pickup' ? 0 : (isFreeShipping ? 0 : (customer.deliveryMethod === 'zasilkovna' ? 69 : 89));
  const finalTotal = Math.max(0, subtotal - discount + shippingCost);

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = () => {
    const orderId = `FP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      orderId,
      date: new Date().toLocaleDateString('cs-CZ'),
      customer,
      items: [...items],
      subtotal,
      discount,
      shippingCost,
      total: finalTotal,
      status: 'CONFIRMED'
    };

    // Track GA4 Purchase Event
    analytics.trackEvent('purchase', {
      transaction_id: orderId,
      value: finalTotal,
      currency: 'CZK',
      tax: Math.round(finalTotal * 0.21),
      shipping: shippingCost,
      coupon: discount > 0 ? 'STUDENT_PROMO' : undefined,
      items: items.map(i => ({
        item_id: i.product.id,
        item_name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        item_category: i.product.category,
        item_variant: i.size
      }))
    });

    setConfirmedOrder(newOrder);
    setStep('success');
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-0 md:p-6">
      <div className="relative w-full max-w-4xl bg-[#0c0c0c] border border-neutral-800 text-neutral-100 shadow-2xl my-auto min-h-screen md:min-h-0 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-[#0c0c0c] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold text-sm tracking-wider uppercase text-white">
              FP DROP CHECKOUT
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-400">
              PROTOTYP AKADEMICKÉHO PROJEKTU
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Multi-step progress bar (if not completed) */}
        {step !== 'success' && (
          <div className="bg-neutral-950 px-6 py-3 border-b border-neutral-800/80 flex items-center justify-between text-xs font-mono">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : 'text-neutral-500'}`}>
              <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[11px] font-bold ${step === 1 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'}`}>1</span>
              <span>DORUČENÍ & ADRESA</span>
            </div>
            <div className="w-8 h-px bg-neutral-800" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : 'text-neutral-500'}`}>
              <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[11px] font-bold ${step === 2 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'}`}>2</span>
              <span>PLATBA</span>
            </div>
            <div className="w-8 h-px bg-neutral-800" />
            <div className={`flex items-center gap-2 ${step === 3 ? 'text-white' : 'text-neutral-500'}`}>
              <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[11px] font-bold ${step === 3 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-300'}`}>3</span>
              <span>KONTROLA</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Form Left */}
              <div className="md:col-span-7 space-y-6">
                {/* 1-click student dorm preset */}
                <div className="p-3 bg-neutral-900 border border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <div>
                    <span className="text-white font-bold block flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      STUDUJEŠ NA FP NEBO BYDLÍŠ NA KOLEJÍCH?
                    </span>
                    <span className="text-[11px] text-neutral-400">1-klikem předvyplň doručení do Z-BOXu na Kolejní 2 (Pod Palackého vrchem)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomer(prev => ({
                        ...prev,
                        street: 'Kolejní 2',
                        city: 'Brno',
                        postalCode: '612 00',
                        deliveryMethod: 'zasilkovna',
                        pickupBranch: 'Z-BOX Kolejní 2 (Koleje VUT Pod Palackého vrchem, blok A03)',
                        note: 'Doručit do Z-BOXu u bloku A03 (areál Pod Palackého vrchem)'
                      }));
                    }}
                    className="px-3 py-1.5 bg-white text-black font-bold uppercase hover:bg-neutral-200 transition-colors text-[10px] shrink-0 self-start sm:self-auto"
                  >
                    ⚡ PŘEDVYPLNIT KOLEJE
                  </button>
                </div>

                <div>
                  <h3 className="font-display font-bold text-sm uppercase text-white mb-3">
                    1. KONTAKTNÍ ÚDAJE
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">JMÉNO</label>
                      <input
                        type="text"
                        value={customer.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">PŘÍJMENÍ</label>
                      <input
                        type="text"
                        value={customer.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">E-MAIL</label>
                      <input
                        type="email"
                        value={customer.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">TELEFON</label>
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-sm uppercase text-white mb-3">
                    2. ZPŮSOB DORUČENÍ
                  </h3>
                  <div className="space-y-2">
                    <label className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${customer.deliveryMethod === 'zasilkovna' ? 'border-white bg-neutral-900' : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'}`}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={customer.deliveryMethod === 'zasilkovna'}
                        onChange={() => handleInputChange('deliveryMethod', 'zasilkovna')}
                        className="mt-1"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between font-bold text-white font-mono">
                          <span>ZÁSILKOVNA (VÝDEJNÍ MÍSTO / Z-BOX)</span>
                          <span className="tabular-nums">{isFreeShipping ? 'ZDARMA' : '69 Kč'}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-1">Doručení do 24 hodin do kteréhokoliv ze 7 000 Z-BOXů v ČR a na kolejích VUT.</p>
                        {customer.deliveryMethod === 'zasilkovna' && (
                          <div className="mt-2.5 pt-2 border-t border-neutral-800">
                            <span className="text-[10px] font-mono text-neutral-400 block mb-1">VYBRANÁ POBOČKA:</span>
                            <input
                              type="text"
                              value={customer.pickupBranch || ''}
                              onChange={(e) => handleInputChange('pickupBranch', e.target.value)}
                              className="w-full bg-black border border-neutral-700 px-2.5 py-1.5 text-xs font-mono text-white"
                            />
                          </div>
                        )}
                      </div>
                    </label>

                    <label className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${customer.deliveryMethod === 'pickup' ? 'border-white bg-neutral-900' : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'}`}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={customer.deliveryMethod === 'pickup'}
                        onChange={() => handleInputChange('deliveryMethod', 'pickup')}
                        className="mt-1"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between font-bold text-white font-mono">
                          <span>OSOBNÍ ODBĚR NA FP VUT (KOLEJNÍ 29)</span>
                          <span className="text-emerald-400 font-bold">ZDARMA VŽDY</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-1">Vyzvednutí přímo na Fakultě podnikatelské v Králově Poli (Kolejní 29) po přednáškách.</p>
                      </div>
                    </label>

                    <label className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${customer.deliveryMethod === 'ppl' ? 'border-white bg-neutral-900' : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'}`}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={customer.deliveryMethod === 'ppl'}
                        onChange={() => handleInputChange('deliveryMethod', 'ppl')}
                        className="mt-1"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex justify-between font-bold text-white font-mono">
                          <span>PPL KURÝR NA ADRESU</span>
                          <span className="tabular-nums">{isFreeShipping ? 'ZDARMA' : '89 Kč'}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-1">Doručení až k vašim dveřím kdekoliv v České republice.</p>
                      </div>
                    </label>
                  </div>
                </div>

                {customer.deliveryMethod !== 'pickup' && (
                  <div>
                    <h3 className="font-display font-bold text-sm uppercase text-white mb-3">
                      3. DODACÍ ADRESA
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">ULICE A ČÍSLO POPISNÉ</label>
                        <input
                          type="text"
                          value={customer.street}
                          onChange={(e) => handleInputChange('street', e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">MĚSTO</label>
                          <input
                            type="text"
                            value={customer.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 mb-1">PSČ</label>
                          <input
                            type="text"
                            value={customer.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Right */}
              <div className="md:col-span-5 bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-400 mb-4">
                    SOUHRN POLOŽEK ({items.length})
                  </h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-3 text-xs">
                        <div className="w-12 h-12 shrink-0 bg-neutral-900 border border-neutral-800">
                          <ProductImage
                            imageUrl={item.product.images?.front || item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white truncate">{item.product.name}</div>
                          <div className="text-[11px] font-mono text-neutral-400">
                            Velikost: {item.size} × {item.quantity} ks
                          </div>
                        </div>
                        <div className="font-mono font-bold text-white tabular-nums">
                          {item.product.price * item.quantity} Kč
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-neutral-400">
                      <span>Mezisoučet</span>
                      <span className="text-white tabular-nums">{subtotal} Kč</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Studentská sleva</span>
                        <span className="tabular-nums">-{discount} Kč</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-400">
                      <span>Doprava</span>
                      <span className="text-white tabular-nums">
                        {shippingCost === 0 ? 'ZDARMA' : `${shippingCost} Kč`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                      <span>CELKEM</span>
                      <span className="font-mono text-base tabular-nums">{finalTotal} Kč</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full py-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span>POKRAČOVAT K PLATBĚ</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-xl mx-auto space-y-6">
              <h3 className="font-display font-bold text-lg uppercase text-white mb-2">
                VYBER ZPŮSOB PLATBY
              </h3>
              <p className="text-xs font-mono text-neutral-400 mb-4">
                Platba probíhá v testovacím módu prototypu. Žádné reálné finance nebudou strženy.
              </p>

              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${customer.paymentMethod === 'applepay' ? 'border-white bg-neutral-900' : 'border-neutral-800 bg-neutral-950'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={customer.paymentMethod === 'applepay'}
                    onChange={() => handleInputChange('paymentMethod', 'applepay')}
                    className="mt-1"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-white font-mono">
                      <span className="flex items-center gap-2">
                        <Smartphone size={16} />
                        APPLE PAY / GOOGLE PAY
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-800 text-neutral-300">EXPRESNÍ</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">1-click bezpečná autorizace otiskem prstu nebo Face ID.</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${customer.paymentMethod === 'card' ? 'border-white bg-neutral-900' : 'border-neutral-800 bg-neutral-950'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={customer.paymentMethod === 'card'}
                    onChange={() => handleInputChange('paymentMethod', 'card')}
                    className="mt-1"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-white font-mono">
                      <span className="flex items-center gap-2">
                        <CreditCard size={16} />
                        PLATEBNÍ KARTA (VISA / MASTERCARD)
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">Platba přes zabezpečenou 3D Secure platební bránu.</p>
                    {customer.paymentMethod === 'card' && (
                      <div className="mt-3 pt-3 border-t border-neutral-800 space-y-2">
                        <input
                          type="text"
                          placeholder="4111 •••• •••• 1111"
                          defaultValue="4111 2222 3333 4444"
                          className="w-full bg-black border border-neutral-700 px-3 py-1.5 text-xs font-mono text-white"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="MM/RR"
                            defaultValue="12/28"
                            className="w-full bg-black border border-neutral-700 px-3 py-1.5 text-xs font-mono text-white"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            defaultValue="888"
                            className="w-full bg-black border border-neutral-700 px-3 py-1.5 text-xs font-mono text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${customer.paymentMethod === 'transfer' ? 'border-white bg-neutral-900' : 'border-neutral-800 bg-neutral-950'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={customer.paymentMethod === 'transfer'}
                    onChange={() => handleInputChange('paymentMethod', 'transfer')}
                    className="mt-1"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-white font-mono">
                      <span className="flex items-center gap-2">
                        <Building2 size={16} />
                        BANKOVNÍ PŘEVOD / OKAMŽITÁ QR PLATBA
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">Vygenerujeme QR kód pro mobilní bankovnictví (Česká spořitelna, KB, Air Bank, ČSOB).</p>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-neutral-800">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>ZPĚT NA ADRESU</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 flex items-center gap-2"
                >
                  <span>REKAPITULACE OBJEDNÁVKY</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-xl mx-auto space-y-6">
              <h3 className="font-display font-bold text-lg uppercase text-white mb-2">
                ZKONTROLUJ A POTVRĎ OBJEDNÁVKU
              </h3>

              <div className="bg-neutral-950 border border-neutral-800 p-5 space-y-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 uppercase block text-[10px]">ZÁKAZNÍK</span>
                  <span className="text-white font-bold">{customer.firstName} {customer.lastName}</span>
                  <span className="text-neutral-400 block">{customer.email} • {customer.phone}</span>
                </div>

                <div className="pt-3 border-t border-neutral-900">
                  <span className="text-neutral-500 uppercase block text-[10px]">ZPŮSOB DORUČENÍ</span>
                  <span className="text-white font-bold uppercase">{customer.deliveryMethod}</span>
                  <span className="text-neutral-400 block">
                    {customer.deliveryMethod === 'pickup'
                      ? 'Osobní odběr FP VUT, Kolejní 29, Brno'
                      : customer.deliveryMethod === 'zasilkovna'
                      ? customer.pickupBranch
                      : `${customer.street}, ${customer.city} ${customer.postalCode}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-900">
                  <span className="text-neutral-500 uppercase block text-[10px]">PLATBA</span>
                  <span className="text-white font-bold uppercase">{customer.paymentMethod}</span>
                </div>

                <div className="pt-3 border-t border-neutral-900">
                  <span className="text-neutral-500 uppercase block text-[10px]">POLOŽKY K ODESLÁNÍ</span>
                  <div className="space-y-1 mt-1">
                    {items.map(i => (
                      <div key={i.id} className="flex justify-between text-neutral-300">
                        <span>{i.product.name} ({i.size}) × {i.quantity}</span>
                        <span className="tabular-nums text-white font-bold">{i.product.price * i.quantity} Kč</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-900 flex justify-between text-sm font-bold text-white">
                  <span>FINÁLNÍ ČÁSTKA K ÚHRADĚ</span>
                  <span className="text-base font-mono tabular-nums">{finalTotal} Kč</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-neutral-900/60 border border-neutral-800 text-xs font-mono text-neutral-400">
                <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
                <span>Kliknutím odešlete nezávaznou zkušební objednávku v rámci akademického projektu.</span>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>ZPĚT K PLATBĚ</span>
                </button>
                <button
                  onClick={handleCompleteOrder}
                  className="px-8 py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-xl"
                >
                  DOKONČIT OBJEDNÁVKU ({finalTotal} Kč)
                </button>
              </div>
            </div>
          )}

          {step === 'success' && confirmedOrder && (
            <div className="max-w-lg mx-auto py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle size={32} />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                  ORDER CONFIRMED
                </span>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-tight text-white">
                  THANKS FOR THE DROP.
                </h2>
                <p className="text-sm font-mono text-neutral-300 mt-2">
                  Číslo objednávky: <strong className="text-white underline underline-offset-4">{confirmedOrder.orderId}</strong>
                </p>
              </div>

              <div className="p-5 bg-neutral-950 border border-neutral-800 text-left text-xs font-mono space-y-3">
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-500">Stav zásilky:</span>
                  <span className="text-emerald-400 font-bold">Připravujeme k expedici</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-500">Doručení do:</span>
                  <span className="text-white">{confirmedOrder.customer.deliveryMethod === 'pickup' ? 'FP VUT Kolejní 29 (zítra 10:00)' : 'Z-BOX / Adresa (do 24–48 h)'}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-500">E-mailové potvrzení:</span>
                  <span className="text-white">{confirmedOrder.customer.email}</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1">
                  <span>Celková částka:</span>
                  <span className="tabular-nums">{confirmedOrder.total} Kč</span>
                </div>
              </div>

              <p className="text-xs font-mono text-neutral-400 max-w-sm mx-auto">
                Do každého balíčku přikládáme zdarma balíček matných vinyl samolepek FP DROP pro tvůj notebook!
              </p>

              <button
                onClick={onClose}
                className="w-full py-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200"
              >
                ZPĚT DO OBCHODU
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
