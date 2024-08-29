import { defineCollection, z } from 'astro:content';

const slides = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
	}),
});

export const collections = { slides };
