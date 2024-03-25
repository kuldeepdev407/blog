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
		author: z.array(z.string()),
		read_time: z.number().optional()
	}),
});

const author = defineCollection({
	type:"data",
	schema: z.object({
		name: z.string(),
		short_desc:z.string(),
		profile_img: z.string().optional()
	})
})
export const collections = { blog, author };
