import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sampleIntegrations from './src/integrations/pandoc-builder'

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://himihiromu.github.io',
	base: '/lt-slide-warehouse',
	integrations: [mdx(), sitemap(), sampleIntegrations()],
});
