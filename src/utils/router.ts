// Jednoduchý routing nad History API: každá hlavná stránka má vlastnú URL
// (/shop, /blog, /blog/<slug> …), funguje tlačidlo Späť a odkazy sa dajú zdieľať.
// Vite dev server aj `vite preview` vracajú index.html pre neznáme cesty (SPA fallback).

export type MainNavView = 'home' | 'shop' | 'drops' | 'lookbook' | 'news' | 'blog' | 'about' | 'case-study' | 'not-found';

export interface Route {
  view: MainNavView;
  blogSlug?: string;
  /** Pôvodná adresa pri neexistujúcej stránke (zostane v adresnom riadku). */
  path?: string;
}

const VIEW_PATHS: Record<Exclude<MainNavView, 'not-found'>, string> = {
  home: '/',
  shop: '/shop',
  drops: '/drops',
  lookbook: '/lookbook',
  news: '/news',
  blog: '/blog',
  about: '/about',
  'case-study': '/case-study'
};

/** Verejné adresy pre sitemap.xml (bez detailov článkov, tie sa doplnia z blogu). */
export const PUBLIC_PATHS = Object.values(VIEW_PATHS);

export const VIEW_TITLES: Record<MainNavView, string> = {
  home: 'Domov',
  shop: 'Obchod',
  drops: 'Dropy',
  lookbook: 'Galéria',
  news: 'Magazín',
  blog: 'Blog',
  about: 'O značke',
  'case-study': 'Prípadová štúdia',
  'not-found': 'Stránka sa nenašla'
};

/** Meta popisy (description / og:description) pre jednotlivé stránky. */
export const VIEW_DESCRIPTIONS: Record<MainNavView, string> = {
  home: 'Moderný študentský streetwear pre študentov Fakulty podnikateľskej VUT v Brne. Limitované dropy, oversized strihy a univerzitná identita.',
  shop: 'Celá ponuka FP DROP: heavyweight tričká, mikiny, crewnecky, šiltovky, tašky, ponožky a nálepky z kolekcie Winter ’26.',
  drops: 'Limitované kolekcie FP DROP naviazané na študentský rok — od prvého semestra cez skúškové až po nočné Brno.',
  lookbook: 'Galéria FP DROP: študentský streetwear v uliciach Brna a na kampuse Kolejní 29.',
  news: 'Magazín FP DROP: novinky, kultúra a študentský život na FP VUT v Brne.',
  blog: 'Blog FP DROP: príbehy zo zákulisia značky, študentský život v Brne a predstavenie kolekcie Winter ’26.',
  about: 'Čo je FP DROP a prečo vznikol: študentská značka streetwearu pre Fakultu podnikateľskú VUT v Brne.',
  'case-study': 'Akademická prípadová štúdia e-shopu FP DROP: marketingová stratégia, STDC, PPC, analytika a finančný plán.',
  'not-found': 'Požadovaná stránka na webe FP DROP neexistuje.'
};

export function routeToPath(route: Route): string {
  if (route.view === 'not-found') return route.path || '/404';
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
  return entry ? { view: entry[0] } : { view: 'not-found', path: pathname };
}
