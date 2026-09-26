import React, { useState } from 'react';
import { ARTICLES } from '../data/news';
import { PRODUCTS } from '../data/products';
import { Article, Product } from '../types';
import { ProductImage } from './ProductImage';
import { ArrowLeft, Clock, User, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface NewsViewProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToShop: () => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onSelectProduct, onNavigateToShop }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('VŠECHNO');

  const categories = ['VŠECHNO', 'STYL & KULTURA', 'KOMUNITA', 'STUDENTSKÝ ŽIVOT', 'BRNO GUIDE', 'ZÁKULISÍ BRANDU', 'AKADEMICKÝ PROJEKT'];

  const filteredArticles = activeCategory === 'VŠECHNO'
    ? ARTICLES
    : ARTICLES.filter(a => a.category.toUpperCase().includes(activeCategory));

  const handleArticleClick = (article: Article) => {
    analytics.trackEvent('read_article', {
      article_id: article.id,
      title: article.title,
      category: article.category
    });
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Article Reader Detail
  if (selectedArticle) {
    const relatedProducts = PRODUCTS.filter(p => selectedArticle.relatedProductIds.includes(p.id));

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <button
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>ZPĚT NA VŠECHNY ČLÁNKY</span>
        </button>

        <article className="border-b border-neutral-800 pb-12">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
            <span className="text-white font-bold">{selectedArticle.category}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedArticle.date}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {selectedArticle.readTime}</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl md:text-4xl text-white tracking-tight uppercase leading-tight mb-4">
            {selectedArticle.title}
          </h1>

          <p className="text-base md:text-lg text-neutral-300 font-sans leading-relaxed mb-8 border-l-2 border-white pl-4 italic">
            {selectedArticle.subtitle}
          </p>

          {/* Author box */}
          <div className="flex items-center justify-between py-4 border-y border-neutral-800 text-xs font-mono text-neutral-400 mb-8">
            <div className="flex items-center gap-2">
              <User size={14} className="text-white" />
              <span>Autor: <strong className="text-white">{selectedArticle.author}</strong> ({selectedArticle.authorRole})</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Odkaz zkopírován do schránky');
                }}
                className="hover:text-white flex items-center gap-1"
              >
                <Share2 size={13} />
                <span>Sdílet</span>
              </button>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none text-neutral-300 space-y-6 text-sm md:text-base leading-relaxed font-sans">
            {selectedArticle.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            {selectedArticle.quote && (
              <blockquote className="my-8 p-6 bg-neutral-950 border border-neutral-800 text-white font-display font-bold text-lg md:text-xl not-italic">
                {selectedArticle.quote}
              </blockquote>
            )}
          </div>

          {/* Related Products CTA Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    SHOP THE ARTICLE
                  </span>
                  <h3 className="font-display font-bold text-lg uppercase text-white">
                    PRODUKTY SPOJENÉ S TÍMTO TÉMATEM
                  </h3>
                </div>

                <button
                  onClick={onNavigateToShop}
                  className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 underline underline-offset-4"
                >
                  <span>Celý shop</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="p-3 bg-neutral-950 border border-neutral-800 hover:border-neutral-600 cursor-pointer transition-colors group"
                  >
                    <div className="aspect-square bg-neutral-900 border border-neutral-800 mb-3">
                      <ProductImage
                        imageUrl={prod.images?.front || prod.imageUrl}
                        alt={prod.name}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">{prod.category}</div>
                    <h4 className="font-display font-bold text-xs uppercase text-white truncate group-hover:text-neutral-200 mt-0.5">
                      {prod.name}
                    </h4>
                    <div className="font-mono text-xs font-bold text-white tabular-nums mt-1">
                      {prod.price} Kč
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    );
  }

  // Articles Grid Listing
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Magazine Header */}
      <div className="border-b border-neutral-800 pb-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
          <span>EDITORIAL MAGAZINE</span>
          <span aria-hidden="true">·</span>
          <span>FP VUT BRNO</span>
          <span aria-hidden="true">·</span>
          <span>STUDENT DISCOURSE</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-white">
          NEWS & CULTURE
        </h1>

        <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
          Články, rozbory materiálů, průvodce brněnským studentským životem a příběhy za limitovanými dropy. Propojujeme obsahový marketing s univerzitní identitou.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mt-8 font-mono text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 border uppercase tracking-wider transition-colors ${
                activeCategory === cat
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Lead Article */}
      {filteredArticles.length > 0 && (
        <div
          onClick={() => handleArticleClick(filteredArticles[0])}
          className="mb-12 p-6 md:p-8 bg-neutral-950 border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
            <span className="text-white font-bold">HLAVNÍ TÉMA</span>
            <span aria-hidden="true">·</span>
            <span>{filteredArticles[0].category}</span>
            <span aria-hidden="true">·</span>
            <span>{filteredArticles[0].date}</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white uppercase tracking-tight group-hover:text-neutral-200">
            {filteredArticles[0].title}
          </h2>

          <p className="text-sm md:text-base text-neutral-400 mt-3 max-w-3xl leading-relaxed">
            {filteredArticles[0].excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between text-xs font-mono text-neutral-400 pt-4 border-t border-neutral-900">
            <span>Autor: {filteredArticles[0].author}</span>
            <span className="text-white font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              PŘEČÍST ČLÁNEK <ArrowRight size={13} />
            </span>
          </div>
        </div>
      )}

      {/* Articles Grid (Remaining) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.slice(1).map(art => (
          <article
            key={art.id}
            onClick={() => handleArticleClick(art)}
            className="flex flex-col justify-between p-6 bg-neutral-950/70 border border-neutral-800/80 hover:border-neutral-600 transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                <span>{art.category}</span>
                <span>{art.readTime}</span>
              </div>

              <h3 className="font-display font-bold text-base uppercase text-white group-hover:text-neutral-200 tracking-tight leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-neutral-400 mt-2.5 line-clamp-3 leading-relaxed">
                {art.excerpt}
              </p>

              {/* Connected Products Pill */}
              {art.relatedProductIds.length > 0 && (
                <div className="mt-4 pt-3 border-t border-neutral-900/80 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                  <span className="uppercase text-neutral-400">MERCH:</span>
                  <span className="text-white truncate">
                    {PRODUCTS.find(p => p.id === art.relatedProductIds[0])?.name || 'Kolekce FP'}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{art.date}</span>
              <span className="text-white font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Číst esej <ArrowRight size={12} />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
