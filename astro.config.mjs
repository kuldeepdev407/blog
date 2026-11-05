import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.kuldeepdev407.com',
	integrations: [mdx(), sitemap()],
	// Keep Astro 4's whitespace handling so rendered pages don't change.
	compressHTML: true,
});
