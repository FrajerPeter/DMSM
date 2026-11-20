import React, { useState } from 'react';
import { ArrowRight, Check, ArrowUpRight } from 'lucide-react';
import { analytics } from '../utils/analytics';
import { MainNavView } from './Header';

interface FooterProps {
  onNavigate: (view: MainNavView) => void;
  onOpenMobileApp?: () => void;
  onOpenInstagramStories?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenMobileApp,
  onOpenInstagramStories
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    analytics.trackEvent('newsletter_form_submit_demo', { source: 'footer' });
    setSubscribed(true);
  };

  return (
    <footer className="bg-black border-t border-neutral-800 text-neutral-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-neutral-900">
          {/* Brand Info & Legal Disclaimer */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display font-black text-2xl tracking-tighter text-white block">
              FP DROP
            </span>
            <p className="text-xs font-mono text-neutral-400 leading-relaxed">
              Moderný študentský streetwear pre študentov Fakulty podnikateľskej VUT v Brne.
              Limitované kolekcie, univerzitná identita a brnianska komunita.
            </p>

            <div className="p-3 bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-400 leading-snug">
              <strong className="text-white block mb-0.5 uppercase">AKADEMICKÝ PROJEKT FP VUT:</strong>
              Ide o študentský koncept vytvorený na akademické účely. Nie je to oficiálny e-shop VUT; produkty, ceny, sklad a objednávky sú ukážkové.
            </div>
          </div>

          {/* Customer E-Commerce Links */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-neutral-400 font-bold uppercase tracking-wider block">
              NAVIGACE
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Obchod (katalóg)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('drops')}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Dropy a harmonogram
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lookbook')}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Galéria 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Novinky a magazín
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  O značke
                </button>
              </li>
            </ul>
          </div>

          {/* Secondary Academic Section (Project / Case Study) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-white font-bold uppercase tracking-wider block flex items-center gap-1.5">
              <span>PROJEKT / PRÍPADOVÁ ŠTÚDIA</span>
              <ArrowUpRight size={13} className="text-neutral-400" />
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('case-study')}
                  className="text-neutral-300 hover:text-white transition-colors text-left"
                >
                  📄 Akademická dokumentácia (11 kapitol)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('case-study')}
                  className="text-neutral-300 hover:text-white transition-colors text-left"
                >
                  📊 Prehľad ukazovateľov a analytika
                </button>
              </li>
              {onOpenMobileApp && (
                <li>
                  <button
                    onClick={onOpenMobileApp}
                    className="text-neutral-300 hover:text-white transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>📱 Prototyp aplikácie (simulátor a Python vo VS Code)</span>
                  </button>
                </li>
              )}
              {onOpenInstagramStories && (
                <li>
                  <button
                    onClick={onOpenInstagramStories}
                    className="text-neutral-300 hover:text-white transition-colors text-left"
                  >
                    📸 Instagram Stories (@fpdrop)
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter / Student Discount */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-neutral-400 font-bold font-mono text-xs uppercase tracking-wider block">
              STUDENTSKÁ SLEVA 10 %
            </span>
            <p className="text-xs text-neutral-400 font-mono">
              Zadaj študentský e-mail pre zľavový kód a prednostný prístup k novým kolekciám.
            </p>

            {subscribed ? (
              <div className="p-3 bg-neutral-950 border border-emerald-800 text-xs font-mono text-emerald-300 flex items-center gap-2">
                <Check size={14} />
                <span>Ukážkový kód: <strong className="text-white font-bold">PRVAK10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="tvoj.email@vut.sk"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-white"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-white text-black font-mono font-bold text-xs uppercase hover:bg-neutral-200 transition-colors shrink-0"
                >
                  ODOSLAŤ
                </button>
              </form>
            )}
            <div className="text-[10px] font-mono text-neutral-500">
              Ukážkový formulár: e-mail sa neukladá ani neposiela.
            </div>
            <div className="text-[10px] font-mono text-neutral-500">
              Kolejní 29, Fakulta podnikatelská VUT v Brně
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
          <div>
            © 2026 FP DROP. Nezávislý studentský projekt vytvořený pro FP VUT v Brně.
          </div>
          <div className="flex gap-6">
            <span>ŠTUDENTSKÝ KONCEPT</span>
            <span>·</span>
            <span>BRNIANSKA IDENTITA</span>
            <span>·</span>
            <span>UKÁŽKOVÝ OBCHOD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
