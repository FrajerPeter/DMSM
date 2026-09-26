import React, { useState } from 'react';
import { X, User, Package, MapPin, Heart, Bell, Check, ShieldCheck, LogOut, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductImage } from './ProductImage';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToShop: () => void;
  wishlistCount: number;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onNavigateToShop,
  wishlistCount
}) => {
  const [activeTab, setActiveTab] = useState<'ORDERS' | 'ADDRESSES' | 'NOTIFICATIONS'>('ORDERS');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [emailInput, setEmailInput] = useState('tomas.dvorak@vut.cz');
  const [isicVerified, setIsicVerified] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#0c0c0c] border border-neutral-800 text-neutral-100 shadow-2xl p-6 md:p-8 my-auto z-10 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <User size={18} className="text-white" />
            <div>
              <span className="font-display font-black text-sm uppercase tracking-tight text-white block">
                STUDENT ACCOUNT / FP DROP ID
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                PROFIL STUDENTA FP VUT BRNO
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors"
            aria-label="Zavřít"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Card & ISIC Status */}
        <div className="p-4 bg-black border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white uppercase text-sm">Tomáš Dvořák</span>
              <span className="px-1.5 py-0.5 bg-emerald-950 border border-emerald-700 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                <Check size={10} />
                ISIC AKTIVNÍ (-10 %)
              </span>
            </div>
            <div className="text-[11px] text-neutral-400">
              {emailInput} · Fakulta podnikatelská VUT
            </div>
          </div>

          <div className="text-[11px] text-neutral-400 text-left sm:text-right">
            <span className="block text-white font-bold">STATUS: PRVÁK VIP</span>
            <span>Kolejní 29, Brno</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 font-mono text-xs gap-6">
          <button
            onClick={() => setActiveTab('ORDERS')}
            className={`pb-2 transition-colors uppercase flex items-center gap-1.5 ${
              activeTab === 'ORDERS'
                ? 'text-white border-b-2 border-white font-bold'
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            <Package size={13} />
            <span>OBJEDNÁVKY</span>
          </button>
          <button
            onClick={() => setActiveTab('ADDRESSES')}
            className={`pb-2 transition-colors uppercase flex items-center gap-1.5 ${
              activeTab === 'ADDRESSES'
                ? 'text-white border-b-2 border-white font-bold'
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            <MapPin size={13} />
            <span>ADRESY</span>
          </button>
          <button
            onClick={() => setActiveTab('NOTIFICATIONS')}
            className={`pb-2 transition-colors uppercase flex items-center gap-1.5 ${
              activeTab === 'NOTIFICATIONS'
                ? 'text-white border-b-2 border-white font-bold'
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            <Bell size={13} />
            <span>NOTIFIKACE DROPŮ</span>
          </button>
        </div>

        {/* Tab Content: ORDERS */}
        {activeTab === 'ORDERS' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="border border-neutral-800 bg-neutral-950 p-4 space-y-3">
              <div className="flex items-center justify-between text-[11px] border-b border-neutral-900 pb-2">
                <span className="text-white font-bold">OBJEDNÁVKA #FP-94821</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DORUČENO DO Z-BOXU
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-black border border-neutral-800 shrink-0 overflow-hidden">
                  <ProductImage
                    imageUrl={PRODUCTS[0].images?.front || PRODUCTS[0].imageUrl}
                    alt={PRODUCTS[0].name}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="font-bold text-white uppercase text-xs">HOT GIRLS GO TO FP TEE</div>
                  <div className="text-[11px] text-neutral-400">Velikost: L · Washed Black · 240 GSM</div>
                  <div className="text-[10px] text-neutral-500">Místo: Z-BOX VUT Kolejní 2, Brno</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white block">349 Kč</span>
                  <span className="text-[10px] text-neutral-500">Apple Pay</span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-900 flex justify-between items-center text-[10px] text-neutral-400">
                <span>Kód zásilky Zásilkovny: <strong>Z942088192</strong></span>
                <span className="text-white underline cursor-pointer">Stáhnout fakturu (PDF)</span>
              </div>
            </div>

            <div className="p-3 bg-black border border-neutral-900 text-center text-neutral-500 text-[11px]">
              Žádné další otevřené objednávky. DROP 002 startuje za 14 dní.
            </div>
          </div>
        )}

        {/* Tab Content: ADDRESSES */}
        {activeTab === 'ADDRESSES' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <strong className="text-white uppercase">VÝCHOZÍ KAMPUSOVÁ ADRESA (KOLEJE VUT)</strong>
                <span className="px-1.5 py-0.5 bg-neutral-800 text-white text-[9px] uppercase">VÝCHOZÍ</span>
              </div>
              <p className="text-neutral-300 text-[11px] leading-relaxed pt-1">
                Tomáš Dvořák<br />
                VUT Koleje Pod Palackého vrchem, Blok A03<br />
                Kolejní 2, 612 00 Brno-Královo Pole<br />
                Tel: +420 773 124 890
              </p>
            </div>

            <div className="p-4 bg-neutral-950 border border-neutral-900 space-y-1 text-neutral-400">
              <div className="text-[11px] text-white font-bold uppercase">PREFEROVANÝ Z-BOX:</div>
              <p className="text-[11px] leading-relaxed">
                Z-BOX VUT Brno, Kolejní 2 (přímo u vchodu na koleje)<br />
                K dispozici 24/7 pro vyzvednutí aplikací Zásilkovna.
              </p>
            </div>
          </div>
        )}

        {/* Tab Content: NOTIFICATIONS */}
        {activeTab === 'NOTIFICATIONS' && (
          <div className="space-y-3 font-mono text-xs">
            <label className="p-3.5 bg-neutral-950 border border-neutral-800 flex items-center justify-between cursor-pointer">
              <div>
                <strong className="text-white block">UPOZORNĚNÍ NA NOVÝ DROP (E-MAIL)</strong>
                <span className="text-[11px] text-neutral-400">
                  Zaslat upozornění 15 minut před otevřením DROP 002 na {emailInput}
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={e => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-white bg-black border-neutral-700"
              />
            </label>

            <label className="p-3.5 bg-neutral-950 border border-neutral-800 flex items-center justify-between cursor-pointer">
              <div>
                <strong className="text-white block">SMS DROP ALERTY</strong>
                <span className="text-[11px] text-neutral-400">
                  Blesková SMS při restocku a spuštění secret drops
                </span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={e => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 accent-white bg-black border-neutral-700"
              />
            </label>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between font-mono text-xs">
          <button
            onClick={() => {
              onClose();
              onNavigateToShop();
            }}
            className="text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Pokračovat v nákupu</span>
            <ArrowRight size={13} />
          </button>

          <button
            onClick={() => {
              setIsLoggedIn(false);
              onClose();
            }}
            className="text-neutral-500 hover:text-rose-400 flex items-center gap-1.5 transition-colors"
          >
            <LogOut size={13} />
            <span>Odhlásit se</span>
          </button>
        </div>
      </div>
    </div>
  );
};
