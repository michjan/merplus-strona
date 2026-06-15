// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://www.merplus.pl',
  output: 'static',

  integrations: [sitemap(), robotsTxt()],

  redirects: {
    '/oferta/torby-reklamowe/': '/torby-reklamowe',
    '/oferta/torby-reklamowe-z-nadrukiem/': '/torby-reklamowe-z-logo',
    '/oferta/torby-reklamowe-z-logo/': '/torby-reklamowe-z-logo',
    '/oferta/pudelka-na-prezenty/': '/pudelka-prezentowe',
    '/oferta/torby-na-alkohol/': '/torby-na-alkohol',
    '/oferta/torby-reklamowe-eko-kraft/': '/torby-eko',
    '/torby-ozdobne/': '/torby-ozdobne',
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Oswald',
      cssVariable: '--font-display',
      weights: ['400', '600', '700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: ['400', '500', '700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    },
    server: {
      allowedHosts: true,
    },
  },
});
