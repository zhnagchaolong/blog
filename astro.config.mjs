import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import { transformerNotationHighlight } from '@shikijs/transformers';

export default defineConfig({
  site: 'https://zhnagchaolong.github.io/blog',
  base: '/blog',
  output: 'static',
  prefetch: true,
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkGfm],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
      transformers: [
        transformerNotationHighlight(),
      ],
    },
  },
});
