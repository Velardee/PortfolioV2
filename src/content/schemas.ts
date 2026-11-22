import { z } from 'astro/zod';

export const projectSchema = z
  .object({
    title: z.string(),
    client: z.string(),
    kind: z.enum(['case', 'lab']),
    year: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    summary: z.string(),
    headline: z.string(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    // Always required: the true fallback sentence while metrics are unconfirmed.
    outcome: z.string(),
    // Only confirmed metrics go here.
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    liveUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    order: z.number(),
    featured: z.boolean(),
  })
  .superRefine((p, ctx) => {
    if (p.kind === 'case') {
      if (!p.problem) ctx.addIssue({ code: 'custom', path: ['problem'], message: 'case needs problem' });
      if (!p.solution) ctx.addIssue({ code: 'custom', path: ['solution'], message: 'case needs solution' });
    }
  });

export const experienceSchema = z.object({
  version: z.string(),
  company: z.string(),
  role: z.string(),
  start: z.string(),
  end: z.string(),
  freelance: z.boolean(),
  stack: z.array(z.string()),
  plus: z.array(z.string()),
  minus: z.array(z.string()).default([]),
  order: z.number(),
});

export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
