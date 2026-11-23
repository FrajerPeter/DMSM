import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'node:url';
import {defineConfig, loadEnv} from 'vite';
import {analyticsHeadPlugin, resolveAnalyticsConfig} from './analytics.plugin.ts';
import {seoPlugin} from './seo.plugin.ts';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({mode}) => {
  // Načíta .env, .env.local, .env.[mode] … (prázdny prefix = aj premenné bez VITE_).
  const env = {...loadEnv(mode, projectRoot, ''), ...process.env} as Record<string, string>;
  const analyticsConfig = resolveAnalyticsConfig(env);
  // Verejná adresa webu pre sitemap.xml a robots.txt (na localhoste stačí predvolená hodnota).
  const siteUrl = env.SITE_URL || 'http://localhost:3000';

  return {
    plugins: [react(), tailwindcss(), analyticsHeadPlugin(analyticsConfig), seoPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': path.resolve(projectRoot),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
