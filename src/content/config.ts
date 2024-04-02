import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
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
