import { afterEach, expect, test, vi } from 'vitest';
import { initReveal } from '../../src/scripts/reveal';

afterEach(() => {
  vi.unstubAllGlobals();
});

// A section taller than the viewport can never be 30% visible (e.g. "Trabajo" on a phone:
// ~2950px tall in a ~664px viewport → max ratio 0.22). It must still reveal.
test('a very tall section reveals as soon as it enters the viewport', async () => {
  const classes = new Set<string>();
  const el = { classList: { add: (c: string) => classes.add(c) }, dispatchEvent: () => true };
  let options: IntersectionObserverInit | undefined;
  let callback!: IntersectionObserverCallback;

  class FakeIO {
    constructor(cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) {
      callback = cb;
      options = opts;
    }
    observe() {}
    unobserve() {}
  }
  vi.stubGlobal('IntersectionObserver', FakeIO);
  vi.stubGlobal('window', { IntersectionObserver: FakeIO });
  vi.stubGlobal('CustomEvent', class { constructor(public type: string) {} });
  vi.stubGlobal('document', { querySelector: () => null, querySelectorAll: () => [el] });

  initReveal();
  await Promise.resolve();
  await Promise.resolve();

  const threshold = options?.threshold ?? 0;
  const min = Array.isArray(threshold) ? Math.min(...threshold) : threshold;
  const maxVisibleRatio = 664 / 2953;
  expect(min).toBeLessThanOrEqual(maxVisibleRatio);

  callback([{ isIntersecting: true, intersectionRatio: 0.05, target: el } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
  expect(classes.has('in')).toBe(true);
});
