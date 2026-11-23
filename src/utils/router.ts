// Jednoduchý routing nad History API: každá hlavná stránka má vlastnú URL
// (/shop, /blog, /blog/<slug> …), funguje tlačidlo Späť a odkazy sa dajú zdieľať.
// Vite dev server aj `vite preview` vracajú index.html pre neznáme cesty (SPA fallback).

export type MainNavView = 'home' | 'shop' | 'drops' | 'lookbook' | 'news' | 'blog' | 'about' | 'case-study';

export interface Route {
  view: MainNavView;
  blogSlug?: string;
}

const VIEW_PATHS: Record<MainNavView, string> = {
  home: '/',
  shop: '/shop',
  drops: '/drops',
  lookbook: '/lookbook',
  news: '/news',
  blog: '/blog',
  about: '/about',
  'case-study': '/case-study'
};

export const VIEW_TITLES: Record<MainNavView, string> = {
  home: 'Domov',
  shop: 'Obchod',
  drops: 'Dropy',
  lookbook: 'Galéria',
  news: 'Magazín',
  blog: 'Blog',
  about: 'O značke',
  'case-study': 'Prípadová štúdia'
};

export function routeToPath(route: Route): string {
  if (route.view === 'blog' && route.blogSlug) return `/blog/${encodeURIComponent(route.blogSlug)}`;
  return VIEW_PATHS[route.view];
}

export function pathToRoute(pathname: string): Route {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const blogMatch = clean.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) return { view: 'blog', blogSlug: decodeURIComponent(blogMatch[1]) };
  // Staršia adresa „vlog“ presmeruje na blog.
  if (clean === '/vlog') return { view: 'blog' };
  const entry = (Object.entries(VIEW_PATHS) as [MainNavView, string][]).find(([, path]) => path === clean);
  return { view: entry ? entry[0] : 'home' };
}
