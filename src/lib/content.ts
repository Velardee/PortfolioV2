import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export type ProjectEntry = CollectionEntry<'projects'>;
export type ExperienceEntry = CollectionEntry<'experience'>;

/** "es/judigo-legal" → "judigo-legal" */
export const slugOf = (entry: { id: string }) => entry.id.split('/').pop()!;

export async function getProjects(locale: Locale, kind?: 'case' | 'lab'): Promise<ProjectEntry[]> {
  const all = await getCollection('projects', (e) => e.id.startsWith(`${locale}/`) && (!kind || e.data.kind === kind));
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getExperience(locale: Locale): Promise<ExperienceEntry[]> {
  const all = await getCollection('experience', (e) => e.id.startsWith(`${locale}/`));
  return all.sort((a, b) => b.data.order - a.data.order);
}
