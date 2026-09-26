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

    analytics.trackEvent('newsletter_signup', {
      email,
      source: 'footer'
    });
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
              Moderní studentský streetwear pro studenty Fakulty podnikatelské VUT v Brně.
              Limitované dropy, těžká 240g bio bavlna, univerzitní identita a brněnská komunita.
            </p>

            <div className="p-3 bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-400 leading-snug">
              <strong className="text-white block mb-0.5 uppercase">AKADEMICKÝ PROJEKT FP VUT:</strong>
              Tento web je fiktivní studentský koncept vytvořený pro účely akademického projektu na VUT. Nejedná se o oficiální e-shop VUT.
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
                  Shop (Katalog)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('drops')}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Dropy & Harmonogram
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lookbook')}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Lookbook 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  News & Magazín
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  O značce (About)
                </button>
              </li>
            </ul>
          </div>

          {/* Secondary Academic Section (Project / Case Study) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-white font-bold uppercase tracking-wider block flex items-center gap-1.5">
              <span>PROJECT / CASE STUDY</span>
              <ArrowUpRight size={13} className="text-neutral-400" />
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('case-study')}
                  className="text-neutral-300 hover:text-white transition-colors text-left"
                >
                  📄 Akademická dokumentace (Dossier)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('case-study')}
                  className="text-neutral-300 hover:text-white transition-colors text-left"
                >
                  📊 KPI Dashboard & Analytika
                </button>
              </li>
              {onOpenMobileApp && (
                <li>
                  <button
                    onClick={onOpenMobileApp}
                    className="text-neutral-300 hover:text-white transition-colors text-left"
                  >
                    📱 App prototyp (Simulátor)
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
              Zadej studentský e-mail pro slevový kód a přednostní přístup k novým dropům.
            </p>

            {subscribed ? (
              <div className="p-3 bg-neutral-950 border border-emerald-800 text-xs font-mono text-emerald-300 flex items-center gap-2">
                <Check size={14} />
                <span>Kód: <strong className="text-white font-bold">PRVAK10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="tvuj.email@vut.cz"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-white"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-white text-black font-mono font-bold text-xs uppercase hover:bg-neutral-200 transition-colors shrink-0"
                >
                  ODESLAT
                </button>
              </form>
            )}
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
            <span>240 GSM BIO BAVLNA</span>
            <span>·</span>
            <span>SÍTOTISK BRNO</span>
            <span>·</span>
            <span>Z-BOX KOLEJNÍ 29</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
