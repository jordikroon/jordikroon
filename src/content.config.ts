import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    role: z.string().optional(),
    period: z.string().optional(),
    status: z.enum(['active', 'maintained', 'archived', 'reference']).default('active'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = { blog, projects };
