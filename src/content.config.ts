import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { experienceSchema, projectSchema } from './content/schemas';

// Entry ids look like "es/judigo-legal"; the locale is the folder.
export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: projectSchema,
  }),
  experience: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
    schema: experienceSchema,
  }),
};
