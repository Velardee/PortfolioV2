import { describe, expect, test } from 'vitest';
import { es } from '../../src/i18n/es';
import { en } from '../../src/i18n/en';
import { alternatePath, localizedPath, t } from '../../src/i18n';

describe('dictionaries', () => {
  test('en has exactly the same keys as es', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort());
  });
  test('no empty strings', () => {
    for (const [k, v] of [...Object.entries(es), ...Object.entries(en)]) expect(v, k).not.toBe('');
  });
  test('t returns the locale text', () => {
    expect(t('es', 'nav.work')).toBe('Trabajo');
    expect(t('en', 'nav.work')).toBe('Work');
  });
});

describe('localizedPath', () => {
  test('builds every route for both locales', () => {
    expect(localizedPath('es', 'home')).toBe('/');
    expect(localizedPath('en', 'home')).toBe('/en/');
    expect(localizedPath('en', 'case', 'motionode')).toBe('/en/work/motionode');
    expect(localizedPath('es', 'case', 'motionode')).toBe('/trabajo/motionode');
    expect(localizedPath('es', 'thanks')).toBe('/gracias');
    expect(localizedPath('en', 'thanks')).toBe('/en/thanks');
  });
});

describe('alternatePath', () => {
  test('maps a case page to its twin in the other language', () => {
    expect(alternatePath('/trabajo/judigo-legal')).toEqual({ es: '/trabajo/judigo-legal', en: '/en/work/judigo-legal' });
    expect(alternatePath('/en/work/judigo-legal/')).toEqual({ es: '/trabajo/judigo-legal', en: '/en/work/judigo-legal' });
  });
  test('maps thanks and home', () => {
    expect(alternatePath('/en/thanks')).toEqual({ es: '/gracias', en: '/en/thanks' });
    expect(alternatePath('/en/')).toEqual({ es: '/', en: '/en/' });
    expect(alternatePath('/')).toEqual({ es: '/', en: '/en/' });
  });
  test('unknown paths fall back to the homes', () => {
    expect(alternatePath('/no-existe')).toEqual({ es: '/', en: '/en/' });
  });
});
