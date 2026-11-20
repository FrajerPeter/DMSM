import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ARTICLES } from '../data/news';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductImage } from './ProductImage';
import { ArrowRight, Flame, Check, Quote, Sparkles } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface HomeViewProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onNavigateToShop: () => void;
  onNavigateToDrops: () => void;
  onNavigateToLookbook: () => void;
  onNavigateToNews: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectProduct,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
  onNavigateToShop,
  onNavigateToDrops,
  onNavigateToLookbook,
  onNavigateToNews
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // 1. NEW DROP / DROP 001 (4 strong items from Drop 001)
  const drop001Products = PRODUCTS.filter(p => p.dropId === 'drop-001').slice(0, 4);
  const heroProduct = PRODUCTS[0]; // HOT GIRLS GO TO FP TEE

  // 2. BEST SELLERS (4 top best selling products across all categories)
  const bestSellerProducts = [
    PRODUCTS.find(p => p.id === 'prod-13') || PRODUCTS[12], // NO SLEEP HOODIE
    PRODUCTS.find(p => p.id === 'prod-01') || PRODUCTS[0],  // HOT GIRLS TEE
    PRODUCTS.find(p => p.id === 'prod-04') || PRODUCTS[3],  // FP AFTER DARK TEE
    PRODUCTS.find(p => p.id === 'prod-03') || PRODUCTS[2],  // ECTS ARE TEMPORARY TEE
  ];

  // 3. Sample student stories for the prototype (fictional)
  const studentStories = [
    {
      id: 's1',
      name: 'Tereza M.',
      detail: '1. ročník · Ekonomika a manažment',
      quote: '„Prvý týždeň v Brne bol poriadny šok. Potom prišli večery na Fléde, ranné prednášky a nočné spoje z hlavnej stanice. Tričko FP DROP by som nosila do školy aj na párty. Pôsobí skôr ako streetwear než reklamný predmet.“',
      piece: 'HOT GIRLS GO TO FP TEE',
      location: 'Kolejní 29, Brno'
    },
    {
      id: 's2',
      name: 'Lukáš K.',
      detail: '2. ročník · Informačný manažment',
      quote: '„Keď som prišiel na skúšku z makroekonómie v ťažkej mikine s nápisom NO SLEEP JUST DEADLINES, vyučujúci sa usmial, že ten pocit dobre pozná. Skúšku som zvládol a mikinu nosím ďalej.“',
      piece: 'NO SLEEP JUST DEADLINES HOODIE',
      location: 'Knihovna VUT'
    },
    {
      id: 's3',
      name: 'Klára & Tomáš',
      detail: '3. ročník · Podnikové financie',
      quote: '„Kvalita bavlny nás zaujala. Tričko s gramážou 240 g/m² drží tvar a po niekoľkých praniach sa nezrazí. Ľudia z iných fakúlt sa nás pýtajú, kde sme ho kúpili.“',
      piece: 'ECTS ARE TEMPORARY TEE',
      location: 'Jakubské náměstí'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    analytics.trackEvent('newsletter_form_submit_demo', { source: 'brand_statement' });
    setNewsletterSubscribed(true);
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Minimalist, Editorial, High-Impact Streetwear)           */}
      {/* ========================================================================= */}
      <section className="relative border-b border-neutral-800 bg-[#070707] px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bold Typography & Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-wider">
                DROP 001
              </span>
              <span className="text-white font-mono uppercase tracking-widest">
                FIRST SEMESTER
              </span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE V BRNĚ
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter text-white leading-none">
              YOUR UNIVERSITY.<br />
              <span className="text-neutral-400">YOUR UNIFORM.</span>
            </h1>

            <p className="text-sm md:text-base text-neutral-300 font-sans max-w-xl leading-relaxed">
              Návrh brnianskeho streetwearu pre študentov FP VUT. Materiály a výroba sú zatiaľ iba návrhové predpoklady na overenie.
            </p>

            {/* Quick Urgency Ticker */}
            <div className="p-3 bg-[#0d0d0d] border border-neutral-800 max-w-lg font-mono text-xs space-y-1.5">
              <div className="flex justify-between items-baseline text-[11px]">
                <span className="text-neutral-400 uppercase">UKÁŽKOVÝ STAV: DROP 001</span>
                <span className="text-white font-bold tabular-nums">DEMO ÚDAJ</span>
              </div>
              <div className="w-full bg-neutral-900 h-1">
                <div className="bg-white h-full" style={{ width: '50%' }} />
              </div>
            </div>

            {/* Hero CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <button
                onClick={() => {
                  analytics.trackEvent('hero_cta_click', { drop: 'drop-001' });
                  onNavigateToShop();
                }}
                className="px-8 py-4 bg-white text-black hover:bg-neutral-200 font-bold uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <span>POZRIEŤ KOLEKCIU 001</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={onNavigateToLookbook}
                className="px-6 py-4 bg-neutral-950 hover:bg-neutral-900 border border-neutral-700 text-white font-bold uppercase tracking-widest transition-colors"
              >
                GALÉRIA 2026
              </button>
            </div>
          </div>

          {/* Right Column: Hero Product Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={() => onSelectProduct(heroProduct)}
              className="relative w-full max-w-md bg-[#0e0e0e] border border-neutral-800 p-6 shadow-2xl cursor-pointer group hover:border-neutral-500 transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-3">
                <span className="px-2 py-0.5 bg-black border border-neutral-800 text-white uppercase flex items-center gap-1.5">
                  <Flame size={12} className="text-orange-400" />
                  SIGNATURE DROP 001
                </span>
                <span>240 GSM</span>
              </div>

              <div className="aspect-square bg-[#121212] border border-neutral-900 overflow-hidden mb-4">
                <ProductImage
                  imageUrl={heroProduct.images?.front || heroProduct.imageUrl}
                  alt={heroProduct.name}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-baseline justify-between border-t border-neutral-800 pt-3">
                <div>
                  <h3 className="font-display font-black text-sm uppercase text-white group-hover:text-neutral-200">
                    {heroProduct.name}
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400">Voľný strih • ukážkový produkt</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-lg font-bold text-white tabular-nums block">
                    {heroProduct.price} Kč
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Ukážkové údaje</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. IMMEDIATELY AFTER HERO: NEW DROP / DROP 001 (4 strong products)        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-neutral-800 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
              LIMITOVANÁ KOLEKCE · PRVNÍ SEMESTR
            </div>
            <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-white tracking-tight">
              NEW DROP / DROP 001
            </h2>
          </div>

          <button
            onClick={onNavigateToShop}
            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 underline underline-offset-4"
          >
            <span>Zobrazit všechny kousky v shopu</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 4 Strong Drop 001 Products with Image, Name, Price, Availability, Quick Add */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {drop001Products.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
              isWishlisted={wishlistIds.includes(prod.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BEST SELLERS (4 top products with Image, Name, Price, Quick Add)        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-neutral-800 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
              VÝBER TÍMU FP DROP
            </div>
            <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-white tracking-tight">
              VYBRANÉ KÚSKY
            </h2>
          </div>

          <button
            onClick={onNavigateToShop}
            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 underline underline-offset-4"
          >
            <span>Všetky produkty →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellerProducts.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
              isWishlisted={wishlistIds.includes(prod.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LOOKBOOK (Editorial Streetwear Preview)                                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              NÁVRHY KOLEKCIE
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-white tracking-tight">
              LOOKBOOK
            </h2>
          </div>

          <button
            onClick={onNavigateToLookbook}
            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 underline underline-offset-4"
          >
            <span>Otvoriť galériu 2026</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={onNavigateToLookbook}
            className="group relative aspect-[16/10] bg-[#111] border border-neutral-800 p-8 flex flex-col justify-between cursor-pointer overflow-hidden hover:border-neutral-500 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div className="relative z-20 flex justify-between text-xs font-mono text-neutral-400">
              <span className="px-2 py-0.5 bg-black/80 border border-neutral-800 text-white">LOOK 01</span>
              <span>KOLEJNÍ 29 CAMPUS</span>
            </div>
            <div className="relative z-20">
              <h3 className="font-display font-black text-xl uppercase text-white group-hover:text-neutral-200">
                FIRST SEMESTER ARRIVAL
              </h3>
              <p className="text-xs font-mono text-neutral-300 mt-1">
                HOT GIRLS GO TO FP TEE & CAMPUS SURVIVAL TOTE
              </p>
              <span className="text-[11px] font-mono text-white underline mt-2 block">
                Pozrieť návrh →
              </span>
            </div>
          </div>

          <div
            onClick={onNavigateToLookbook}
            className="group relative aspect-[16/10] bg-[#111] border border-neutral-800 p-8 flex flex-col justify-between cursor-pointer overflow-hidden hover:border-neutral-500 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div className="relative z-20 flex justify-between text-xs font-mono text-neutral-400">
              <span className="px-2 py-0.5 bg-black/80 border border-neutral-800 text-white">LOOK 03</span>
              <span>JAKUBSKÉ NÁMĚSTÍ & NOČNÍ BRNO</span>
            </div>
            <div className="relative z-20">
              <h3 className="font-display font-black text-xl uppercase text-white group-hover:text-neutral-200">
                FP AFTER DARK
              </h3>
              <p className="text-xs font-mono text-neutral-300 mt-1">
                NIGHTLINE HOODIE & KOLEJNÍ SOCKS
              </p>
              <span className="text-[11px] font-mono text-white underline mt-2 block">
                Pozrieť návrh →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. STUDENT STORIES (Authentic Student Quotes & Campus Culture)              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-neutral-800 pb-4 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            KOMUNITA A ŠTUDENTSKÉ PRÍBEHY
          </span>
          <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-white tracking-tight mt-1">
            PRÍBEHY Z KAMPUSU
          </h2>
          <p className="mt-2 text-xs font-mono text-amber-200">
            Ukážkové citácie a mená – nejde o skutočné recenzie ani výpovede študentov.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentStories.map(story => (
            <div
              key={story.id}
              className="p-6 bg-[#0c0c0c] border border-neutral-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <Quote size={20} className="text-neutral-600" />
                <p className="text-xs sm:text-sm font-sans text-neutral-200 leading-relaxed italic">
                  {story.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-900 font-mono text-xs">
                <div className="text-white font-bold">{story.name}</div>
                <div className="text-[11px] text-neutral-400">{story.detail}</div>
                <div className="text-[10px] text-neutral-500 mt-2 flex items-center justify-between">
                  <span>Obľúbený kúsok: <strong className="text-neutral-300">{story.piece}</strong></span>
                  <span>{story.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. NEWS (Editorial Essays & Brand Releases Connected to Products)          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              ČLÁNKY A PRÍBEHY
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl uppercase text-white tracking-tight">
              MAGAZÍN
            </h2>
          </div>

          <button
            onClick={onNavigateToNews}
            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 underline underline-offset-4"
          >
            <span>Všechny články</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.slice(0, 3).map(art => (
            <article
              key={art.id}
              onClick={onNavigateToNews}
              className="p-6 bg-[#0c0c0c] border border-neutral-800 hover:border-neutral-500 transition-colors cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase mb-2">
                  {art.category} • {art.date}
                </div>
                <h3 className="font-display font-black text-base uppercase text-white group-hover:text-neutral-200">
                  {art.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-3 font-sans leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 text-xs font-mono text-white flex items-center justify-between">
                <span>Číst esej</span>
                <ArrowRight size={12} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BRAND STATEMENT (Short, Impactful Closing Statement)                    */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 md:p-12 bg-[#0c0c0c] border border-neutral-800 text-center space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              FP DROP / BRAND STATEMENT
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl uppercase text-white tracking-tight leading-tight">
              INDEPENDENT STUDENT STREETWEAR.<br />
              <span className="text-neutral-400">BORN AT KOLEJNÍ 29, BRNO.</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-sans leading-relaxed">
              Nezávislý koncept vytvořený v rámci akademického projektu na FP VUT. Žádné propagační klišé ani generická loga. Pouze poctivá 240g bio bavlna, uvolněné střihy a autentická studentská identita.
            </p>
          </div>

          {/* Student 10% Discount Coupon Form */}
          <div className="pt-2 max-w-md mx-auto">
            {newsletterSubscribed ? (
              <div className="p-4 bg-black border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center justify-center gap-2">
                <Check size={16} />
                <span>Kód aktivován: <strong className="text-white font-bold">PRVAK10</strong> (-10 % sleva)</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="tvuj.email@vut.cz"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-black border border-neutral-800 px-4 py-3 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-white"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black font-mono font-bold text-xs uppercase hover:bg-neutral-200 transition-colors shrink-0"
                >
                  ZÍSKAT SLEVU 10 %
                </button>
              </form>
            )}
            <div className="text-[10px] font-mono text-neutral-500 mt-2">
              Kód PRVAK10 je platný pro všechny studenty VUT.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
