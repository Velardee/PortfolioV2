import type { Locale } from '../i18n';
import { getProjects, slugOf } from './content';

/** getStaticPaths for case pages: one per case, with wrap-around prev/next. */
export async function casePaths(locale: Locale) {
  const cases = await getProjects(locale, 'case');
  return cases.map((project, i) => ({
    params: { slug: slugOf(project) },
    props: {
      project,
      prev: cases[(i - 1 + cases.length) % cases.length],
      next: cases[(i + 1) % cases.length],
    },
  }));
}
