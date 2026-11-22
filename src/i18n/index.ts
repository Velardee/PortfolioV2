import { es, type UiKey } from './es';
import { en } from './en';

export type Locale = 'es' | 'en';
export type { UiKey };
export const locales: Locale[] = ['es', 'en'];

const dict: Record<Locale, Record<UiKey, string>> = { es, en };

export function t(locale: Locale, key: UiKey): string {
  return dict[locale][key];
}

type Route = 'home' | 'case' | 'thanks';

const routes: Record<Locale, Record<Route, string>> = {
  es: { home: '/', case: '/trabajo/', thanks: '/gracias' },
  en: { home: '/en/', case: '/en/work/', thanks: '/en/thanks' },
};

export function localizedPath(locale: Locale, route: Route, slug?: string): string {
  return route === 'case' ? routes[locale].case + slug : routes[locale][route];
}

export function alternatePath(pathname: string): Record<Locale, string> {
  const p = pathname.replace(/\/+$/, '') || '/';
  const caseMatch = p.match(/^(?:\/en\/work|\/trabajo)\/([^/]+)$/);
  if (caseMatch) {
    const slug = caseMatch[1];
    return { es: localizedPath('es', 'case', slug), en: localizedPath('en', 'case', slug) };
  }
  if (p === '/gracias' || p === '/en/thanks') {
    return { es: localizedPath('es', 'thanks'), en: localizedPath('en', 'thanks') };
  }
  return { es: localizedPath('es', 'home'), en: localizedPath('en', 'home') };
}

export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}
