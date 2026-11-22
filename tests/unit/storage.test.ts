import { afterEach, expect, test, vi } from 'vitest';
import { safeStorage } from '../../src/lib/storage';

afterEach(() => vi.unstubAllGlobals());

const throwing = {
  getItem: () => { throw new Error('SecurityError'); },
  setItem: () => { throw new Error('SecurityError'); },
};

test('get returns null when storage throws (private mode)', () => {
  vi.stubGlobal('localStorage', throwing);
  expect(safeStorage.get('local', 'theme')).toBeNull();
});

test('set does not throw when storage throws', () => {
  vi.stubGlobal('sessionStorage', throwing);
  expect(() => safeStorage.set('session', 'preloaded', '1')).not.toThrow();
});

test('get returns null when storage is missing entirely', () => {
  expect(safeStorage.get('local', 'theme')).toBeNull();
});

test('round-trips a value when storage works', () => {
  const m = new Map<string, string>();
  vi.stubGlobal('localStorage', { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => m.set(k, v) });
  safeStorage.set('local', 'theme', 'light');
  expect(safeStorage.get('local', 'theme')).toBe('light');
});
