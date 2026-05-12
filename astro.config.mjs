import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/site.config.ts';

export default defineConfig({
  site: SITE.url,
  base: SITE.base,
  trailingSlash: 'ignore',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      defaultColor: 'light',
      wrap: true,
    },
  },
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
});
