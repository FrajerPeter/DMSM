import React from 'react';
import { ArrowLeft, ArrowRight, Clock, PenLine } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { BLOG_POSTS, BlogPost, formatBlogDate, getBlogPost } from '../data/blog';
import { ProductImage } from './ProductImage';
import { analytics } from '../utils/analytics';

// Farba svetlého pozadia produktových fotiek Winter ’26 — titulky blogu ju použijú okolo celej fotky.
const COVER_BG = 'bg-[#f3f2ee]';

interface BlogViewProps {
  slug?: string;
  onOpenPost: (slug: string) => void;
  onBackToList: () => void;
  onSelectProduct: (product: Product) => void;
}

/** Odkaz, ktorý má skutočnú URL (dá sa otvoriť v novej karte), ale v rámci SPA naviguje bez reloadu. */
const PostLink: React.FC<{ post: BlogPost; onOpen: (slug: string) => void; className?: string; children: React.ReactNode }> = ({ post, onOpen, className, children }) => (
  <a
    href={`/blog/${post.slug}`}
    className={className}
    data-analytics-label={`blog_post:${post.slug}`}
    onClick={e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      onOpen(post.slug);
    }}
  >
    {children}
  </a>
);

const PostMeta: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
    <span className="text-neutral-300">{post.category}</span>
    <span aria-hidden="true">·</span>
    <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
    <span aria-hidden="true">·</span>
    <span className="inline-flex items-center gap-1"><Clock size={11} />{post.readMinutes} min čítania</span>
  </div>
);

const BlogList: React.FC<Pick<BlogViewProps, 'onOpenPost'>> = ({ onOpenPost }) => {
  const [featured, ...rest] = BLOG_POSTS.slice().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-100">
      <section className="border-b border-neutral-800 bg-[#090909] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <span className="bg-white px-2 py-1 font-bold text-black">BLOG</span>
            <span>·</span><span>PRÍBEHY, PRODUKTY A ŠTUDENTSKÝ ŽIVOT</span>
          </div>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">FP DROP Blog</h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            Zo zákulisia značky, o materiáloch a o tom, ako vyzerá študentský deň na FP VUT v Brne.
          </p>
          <p className="mt-6 max-w-3xl border border-amber-900/70 bg-amber-950/30 p-4 text-xs leading-relaxed text-amber-200">
            Ukážkový obsah pre školský prototyp. Články sú redakčné koncepty značky, nie výpovede konkrétnych študentov.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mb-7 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
          <PenLine size={14} /><span>NAJNOVŠIE ČLÁNKY</span><span>·</span><span>{BLOG_POSTS.length} ČLÁNKY</span>
        </div>

        {featured && (
          <PostLink post={featured} onOpen={onOpenPost} className="group mb-6 grid overflow-hidden border border-neutral-800 bg-neutral-950 transition-colors hover:border-neutral-500 md:grid-cols-2">
            <ProductImage src={featured.coverImage} alt={featured.coverAlt} aspectRatio="aspect-[4/3]" loading="eager" fit="contain" backgroundClassName={COVER_BG} />
            <div className="flex flex-col justify-center p-6 md:p-10">
              <PostMeta post={featured} />
              <h2 lang="sk" className="mt-4 font-display text-2xl font-black uppercase leading-tight text-white break-words hyphens-auto md:text-3xl">{featured.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">{featured.perex}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-white">
                Čítať článok <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </PostLink>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map(post => (
            <PostLink key={post.slug} post={post} onOpen={onOpenPost} className="group flex flex-col overflow-hidden border border-neutral-800 bg-neutral-950 transition-colors hover:border-neutral-500">
              <ProductImage src={post.coverImage} alt={post.coverAlt} aspectRatio="aspect-[16/9]" fit="contain" backgroundClassName={COVER_BG} />
              <div className="flex flex-1 flex-col p-6">
                <PostMeta post={post} />
                <h2 lang="sk" className="mt-4 font-display text-xl font-bold uppercase leading-snug text-white break-words hyphens-auto">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">{post.perex}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-white">
                  Čítať článok <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </PostLink>
          ))}
        </div>
      </section>
    </div>
  );
};

const BlogDetail: React.FC<{ post: BlogPost } & Omit<BlogViewProps, 'slug'>> = ({ post, onOpenPost, onBackToList, onSelectProduct }) => {
  const related = post.relatedProductIds
    .map(id => PRODUCTS.find(product => product.id === id))
    .filter((product): product is Product => Boolean(product));
  const others = BLOG_POSTS.filter(other => other.slug !== post.slug);

  return (
    <article className="min-h-screen bg-[#070707] text-neutral-100">
      <header className="border-b border-neutral-800 bg-[#090909] px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Omrvinková navigácia" className="mb-8 text-xs font-mono uppercase tracking-wider text-neutral-500">
            <a
              href="/blog"
              onClick={e => { if (e.metaKey || e.ctrlKey) return; e.preventDefault(); onBackToList(); }}
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white"
            >
              <ArrowLeft size={13} /> Späť na blog
            </a>
          </nav>
          <PostMeta post={post} />
          <h1 lang="sk" className="mt-4 font-display text-[clamp(1.5rem,7vw,1.875rem)] font-black uppercase leading-tight tracking-tight text-white break-words hyphens-auto sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-neutral-300 sm:text-lg">{post.perex}</p>
          <p className="mt-5 text-xs font-mono uppercase text-neutral-500">Autor: {post.author}</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-0">
        <ProductImage src={post.coverImage} alt={post.coverAlt} aspectRatio="aspect-[16/9]" loading="eager" fit="contain" backgroundClassName={COVER_BG} className="border border-neutral-800" />

        <div className="mt-10 space-y-8">
          {post.sections.map((section, index) => (
            <section key={index}>
              {section.heading && <h2 className="mb-3 font-display text-xl font-bold uppercase text-white sm:text-2xl">{section.heading}</h2>}
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-4 text-[15px] leading-relaxed text-neutral-300">{paragraph}</p>
              ))}
              {section.list && (
                <ul className="ml-5 list-disc space-y-1.5 text-[15px] leading-relaxed text-neutral-300 marker:text-neutral-500">
                  {section.list.map(item => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="border border-neutral-800 px-2.5 py-1 text-[11px] font-mono uppercase text-neutral-400">#{tag}</span>
          ))}
        </div>

        {related.length > 0 && (
          <section className="mt-14 border-t border-neutral-800 pt-10">
            <h2 className="mb-6 text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Produkty z článku</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {related.map(product => (
                <button
                  key={product.id}
                  onClick={() => {
                    analytics.trackEvent('blog_product_click', { article_slug: post.slug, item_id: product.id, item_name: product.name });
                    onSelectProduct(product);
                  }}
                  className="group border border-neutral-800 bg-neutral-950 text-left transition-colors hover:border-neutral-500"
                >
                  <ProductImage src={product.images?.front || product.imageUrl} alt={product.name} />
                  <div className="p-3">
                    <p className="text-xs font-bold uppercase leading-snug text-white">{product.name}</p>
                    <p className="mt-1 text-xs font-mono text-neutral-400">{product.price} Kč</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {others.length > 0 && (
          <section className="mt-14 border-t border-neutral-800 pt-10">
            <h2 className="mb-6 text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Ďalšie články</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {others.map(other => (
                <PostLink key={other.slug} post={other} onOpen={onOpenPost} className="group border border-neutral-800 bg-neutral-950 p-5 transition-colors hover:border-neutral-500">
                  <PostMeta post={other} />
                  <h3 className="mt-3 font-display text-base font-bold uppercase leading-snug text-white">{other.title}</h3>
                </PostLink>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

export const BlogView: React.FC<BlogViewProps> = props => {
  if (!props.slug) return <BlogList onOpenPost={props.onOpenPost} />;

  const post = getBlogPost(props.slug);
  if (!post) {
    return (
      <div className="min-h-[60vh] bg-[#070707] px-4 py-20 text-center text-neutral-100">
        <h1 className="font-display text-3xl font-black uppercase">Článok sa nenašiel</h1>
        <p className="mt-3 text-sm text-neutral-400">Odkaz je neplatný alebo bol článok odstránený.</p>
        <button onClick={props.onBackToList} className="mt-8 bg-white px-5 py-3 text-xs font-mono font-bold uppercase text-black">Späť na blog</button>
      </div>
    );
  }
  return <BlogDetail post={post} onOpenPost={props.onOpenPost} onBackToList={props.onBackToList} onSelectProduct={props.onSelectProduct} />;
};
