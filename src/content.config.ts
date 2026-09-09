import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string().default('Team'),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: blogSchema,
});

// English translations of a subset of blog posts (phase 2, in progress).
const blogEn = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog-en' }),
  schema: blogSchema,
});

export const collections = { blog, blogEn };
