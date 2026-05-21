import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sections = defineCollection({
    loader: glob({ pattern: '**/*.json', base: 'src/content/sections' }),
    schema: z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        content: z.string(),
        ctaText: z.string().optional(),
        ctaLink: z.string().optional(),
        image: z.string().optional(),
        order: z.number(),
        active: z.boolean().default(true),
    }),
});

export const collections = { sections };
