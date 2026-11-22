type Area = 'local' | 'session';

// Storage can be missing or throw (private mode, blocked site data); never let it break the page.
function area(a: Area): Storage | undefined {
  try {
    return a === 'local' ? globalThis.localStorage : globalThis.sessionStorage;
  } catch {
    return undefined;
  }
}

export const safeStorage = {
  get(a: Area, key: string): string | null {
    try {
      return area(a)?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },
  set(a: Area, key: string, value: string): void {
    try {
      area(a)?.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
};
