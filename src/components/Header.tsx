import React from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowUpRight } from 'lucide-react';

export type MainNavView = 'home' | 'shop' | 'drops' | 'lookbook' | 'news' | 'about' | 'case-study';

interface HeaderProps {
  activeView: MainNavView;
  setActiveView: (view: MainNavView) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenWishlist: () => void;
  onNavigateToCaseStudy: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  onOpenWishlist,
  onNavigateToCaseStudy
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Strictly customer-facing streetwear navigation as instructed:
  // SHOP, DROPS, LOOKBOOK, NEWS, ABOUT
  const customerNavLinks = [
    { id: 'shop', label: 'SHOP' },
    { id: 'drops', label: 'DROPS' },
    { id: 'lookbook', label: 'LOOKBOOK' },
    { id: 'news', label: 'NEWS' },
    { id: 'about', label: 'ABOUT' }
  ] as const;

  const handleNavClick = (viewId: typeof customerNavLinks[number]['id']) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner (Slim single ticker with announcement and discreet Case Study link) */}
      <div className="bg-neutral-950 border-b border-neutral-800 text-[11px] font-mono py-1.5 px-4 text-center text-neutral-400 overflow-hidden select-none">
        <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
          <span className="text-white font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            DROP 001 IS LIVE (84 % SOLD)
          </span>
          <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">/</span>
          <span className="hidden sm:inline text-neutral-300">
            DOPRAVA ZDARMA NAD 1 000 KČ • OSOBNÍ ODBĚR KOLEJNÍ 29 ZDARMA
          </span>
          <span aria-hidden="true" className="text-neutral-700 hidden md:inline">/</span>
          <button
            onClick={onNavigateToCaseStudy}
            className="text-neutral-400 hover:text-white underline underline-offset-2 flex items-center gap-1 transition-colors"
          >
            <span>AKADEMICKÝ PROJEKT: CASE STUDY →</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
          {/* ZONE 1: Single text element wordmark in display face */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group"
            >
              <span className="font-display font-black text-xl md:text-2xl tracking-tighter text-white group-hover:text-neutral-300 transition-colors">
                FP DROP
              </span>
            </button>

            {/* Secondary discreet Case Study badge (desktop) */}
            <button
              onClick={onNavigateToCaseStudy}
              className={`hidden xl:inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider border transition-colors ${
                activeView === 'case-study'
                  ? 'border-white text-white bg-neutral-900'
                  : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
              }`}
              title="Otevřít akademickou případovou studii a metriky"
            >
              <span>CASE STUDY</span>
              <ArrowUpRight size={10} />
            </button>
          </div>

          {/* ZONE 2: 5 clean customer text navigation links: SHOP, DROPS, LOOKBOOK, NEWS, ABOUT */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono font-medium tracking-wider">
            {customerNavLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-1 relative transition-colors ${
                  activeView === link.id
                    ? 'text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {activeView === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                )}
              </button>
            ))}
          </nav>

          {/* ZONE 3: Customer Actions: SEARCH, ACCOUNT, WISHLIST, BAG / CART */}
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Vyhledávání"
              title="Vyhledat v produktech"
            >
              <Search size={18} />
            </button>

            {/* Student Account Trigger */}
            <button
              onClick={onOpenAccount}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Můj účet"
              title="Studentský profil & objednávky"
            >
              <User size={18} />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-neutral-400 hover:text-white relative transition-colors"
              aria-label="Oblíbené"
              title="Oblíbené kousky"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white text-black font-bold text-[9px] flex items-center justify-center rounded-full tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart / Bag Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 py-2 bg-white text-black hover:bg-neutral-200 font-bold transition-all select-none ml-1"
              aria-label="Nákupní taška"
            >
              <ShoppingBag size={15} />
              <span className="text-xs font-mono font-bold">BAG</span>
              {cartCount > 0 && (
                <span className="bg-black text-white text-[10px] px-1.5 py-0.2 rounded font-mono font-bold tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white lg:hidden transition-colors ml-1"
              aria-label={mobileMenuOpen ? 'Zavřít menu' : 'Otevřít menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#0a0a0a]/98 border-b border-neutral-800 z-30 px-6 py-8 backdrop-blur-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-5 text-sm font-mono tracking-wider">
            {customerNavLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2 border-b border-neutral-900 transition-colors uppercase ${
                  activeView === link.id
                    ? 'text-white font-black pl-2 border-l-2 border-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Secondary Academic Area in Mobile Menu */}
            <div className="pt-4 border-t border-neutral-800">
              <span className="text-[10px] text-neutral-500 uppercase font-mono block mb-2">
                AKADEMICKÁ PŘÍPADOVÁ STUDIE (FP VUT)
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToCaseStudy();
                }}
                className={`w-full text-left py-2.5 px-3 border border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors flex items-center justify-between text-xs font-mono`}
              >
                <span>PROJECT / CASE STUDY</span>
                <ArrowUpRight size={14} className="text-neutral-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
