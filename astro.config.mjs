import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sampleIntegrations from './src/integrations/pandoc-builder'

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://himihiromu.github.io',
	base: '/lt-slide-warehouse',
	// Preserve the whitespace behavior used before Astro 7.
	compressHTML: true,
	integrations: [mdx(), sitemap(), sampleIntegrations()],
});
