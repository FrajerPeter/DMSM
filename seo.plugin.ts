import type { Plugin } from 'vite';
import { BLOG_POSTS } from './src/data/blog.ts';
import { PUBLIC_PATHS } from './src/utils/router.ts';

/**
 * Vite plugin: /robots.txt a /sitemap.xml.
 * - v dev režime ich servíruje middleware (http://localhost:3000/sitemap.xml),
 * - pri `npm run build` ich zapíše do dist/.
 * Adresy v sitemap sú absolútne, preto sa berie SITE_URL z .env (napr. https://fpdrop.cz).
 */
export function seoPlugin(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '');
  const today = new Date().toISOString().slice(0, 10);

  const sitemap = () => {
    const urls = [
      ...PUBLIC_PATHS.map(path => ({ loc: `${base}${path}`, lastmod: today })),
      ...BLOG_POSTS.map(post => ({ loc: `${base}/blog/${post.slug}`, lastmod: post.date }))
    ];
    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`),
      '</urlset>',
      ''
    ].join('\n');
  };

  const robots = () => `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;

  return {
    name: 'fp-drop-seo',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(sitemap());
          return;
        }
        if (url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(robots());
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots() });
    }
  };
}
