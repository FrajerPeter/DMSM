import React, { useState } from 'react';
import { Product, CartItem, Order, ProductCategory } from './types';
import { PRODUCTS } from './data/products';
import { Header, MainNavView } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { DropsView } from './components/DropsView';
import { LookbookView } from './components/LookbookView';
import { NewsView } from './components/NewsView';
import { AboutView } from './components/AboutView';
import { CaseStudyHub } from './components/CaseStudyHub';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { MobileAppSimulator } from './components/MobileAppSimulator';
import { InstagramStoryModal } from './components/InstagramStoryModal';
import { analytics } from './utils/analytics';
import { Home, Grid, Zap, BookOpen, ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<MainNavView>('home');
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0], // HOT GIRLS GO TO FP TEE
      size: 'M',
      quantity: 1
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-01', 'prod-03']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isMobileAppOpen, setIsMobileAppOpen] = useState<boolean>(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [initialShopCategory, setInitialShopCategory] = useState<ProductCategory>('ALL');
  const [initialShopDropId, setInitialShopDropId] = useState<string | undefined>(undefined);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        product,
        size,
        quantity
      };
      return [...prev, newItem];
    });

    analytics.trackEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity,
      size,
      value: product.price * quantity,
      currency: 'CZK'
    });

    showToast(`Přidáno do košíku: ${product.name} (${size})`);
  };

  const handleBuyNow = (product: Product, size: string, quantity: number = 1) => {
    handleAddToCart(product, size, quantity);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleQuickAdd = (product: Product, size: string) => {
    handleAddToCart(product, size, 1);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCart(prev => prev.map(i => (i.id === cartItemId ? { ...i, quantity: newQty } : i)));
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.id !== cartItemId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Odebráno z oblíbených');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Přidáno do oblíbených');
        return [...prev, productId];
      }
    });
  };

  const handleOrderSuccess = (order: Order) => {
    setCart([]);
  };

  const handleFilterShopByDrop = (dropId: string) => {
    setInitialShopDropId(dropId);
    setInitialShopCategory('ALL');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 bg-white text-black px-4 py-2.5 font-mono text-xs font-bold shadow-2xl flex items-center gap-2 border border-neutral-300 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Streetwear Header */}
      <Header
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenWishlist={() => {
          setInitialShopCategory('ALL');
          setActiveView('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCaseStudy={() => {
          setActiveView('case-study');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeView === 'home' && (
          <HomeView
            onSelectProduct={setSelectedProduct}
            onQuickAdd={handleQuickAdd}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onNavigateToShop={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToDrops={() => {
              setActiveView('drops');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToLookbook={() => {
              setActiveView('lookbook');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToNews={() => {
              setActiveView('news');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'shop' && (
          <ShopView
            onSelectProduct={setSelectedProduct}
            onQuickAdd={handleQuickAdd}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            initialCategory={initialShopCategory}
            initialDropId={initialShopDropId}
          />
        )}

        {activeView === 'drops' && (
          <DropsView
            onSelectProduct={setSelectedProduct}
            onQuickAdd={handleQuickAdd}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onFilterShopByDrop={handleFilterShopByDrop}
          />
        )}

        {activeView === 'lookbook' && (
          <LookbookView
            onSelectProduct={setSelectedProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeView === 'news' && (
          <NewsView
            onSelectProduct={setSelectedProduct}
            onNavigateToShop={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'about' && (
          <AboutView
            onNavigateToShop={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToDrops={() => {
              setActiveView('drops');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'case-study' && (
          <CaseStudyHub
            onBackToShop={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenMobileApp={() => setIsMobileAppOpen(true)}
            onOpenInstagramStories={() => setIsStoriesOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMobileApp={() => setIsMobileAppOpen(true)}
        onOpenInstagramStories={() => setIsStoriesOpen(true)}
      />

      {/* Persistent Mobile Bottom Navigation (Native App Feeling for Smartphone viewports) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-neutral-800 px-4 py-2 flex items-center justify-around font-mono text-[10px] text-neutral-400">
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 ${activeView === 'home' ? 'text-white font-bold' : 'hover:text-white'}`}
        >
          <Home size={18} />
          <span>HOME</span>
        </button>

        <button
          onClick={() => {
            setActiveView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 ${activeView === 'shop' ? 'text-white font-bold' : 'hover:text-white'}`}
        >
          <Grid size={18} />
          <span>SHOP</span>
        </button>

        <button
          onClick={() => {
            setActiveView('drops');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 ${activeView === 'drops' ? 'text-white font-bold' : 'hover:text-white'}`}
        >
          <Zap size={18} />
          <span>DROPS</span>
        </button>

        <button
          onClick={() => {
            setActiveView('lookbook');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 ${activeView === 'lookbook' ? 'text-white font-bold' : 'hover:text-white'}`}
        >
          <BookOpen size={18} />
          <span>LOOKBOOK</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 relative text-neutral-200"
        >
          <div className="relative">
            <ShoppingBag size={18} />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-white text-black font-bold text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full tabular-nums">
                {totalCartCount}
              </span>
            )}
          </div>
          <span>BAG</span>
        </button>
      </nav>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onSelectProduct={setSelectedProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onAddProduct={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        discount={0}
        onOrderSuccess={handleOrderSuccess}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={setSelectedProduct}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onNavigateToShop={() => {
          setIsAccountOpen(false);
          setActiveView('shop');
        }}
        wishlistCount={wishlistIds.length}
      />

      <MobileAppSimulator
        isOpen={isMobileAppOpen}
        onClose={() => setIsMobileAppOpen(false)}
        onSelectProduct={setSelectedProduct}
        wishlistIds={wishlistIds}
        cartCount={totalCartCount}
      />

      <InstagramStoryModal
        isOpen={isStoriesOpen}
        onClose={() => setIsStoriesOpen(false)}
        onSelectProduct={setSelectedProduct}
        onQuickAdd={handleQuickAdd}
      />
    </div>
  );
}
