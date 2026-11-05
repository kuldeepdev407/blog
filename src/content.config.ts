import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		published_at: z.coerce.date(),
		updated_at: z.coerce.date().optional(),
		cover_image: z.string().optional(),
		tags: z.array(z.string()),
		published: z.boolean(),
		author: z.string(),
		read_time: z.number().optional()
	}),
});

export const collections = { blog};
