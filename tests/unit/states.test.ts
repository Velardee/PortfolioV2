import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createStateMachine, type UiState } from '../../src/lib/states';

let seen: UiState[];
let m: ReturnType<typeof createStateMachine>;
const last = () => seen[seen.length - 1];

beforeEach(() => {
  vi.useFakeTimers();
  seen = [];
  m = createStateMachine((s) => seen.push(s));
});
afterEach(() => {
  m.dispose();
  vi.useRealTimers();
});

test('loading turns into success after 1800ms, then idle after 3200ms', () => {
  m.set('loading');
  expect(last()).toBe('loading');
  vi.advanceTimersByTime(1799);
  expect(last()).toBe('loading');
  vi.advanceTimersByTime(1);
  expect(last()).toBe('success');
  vi.advanceTimersByTime(3200);
  expect(last()).toBe('idle');
});

test('error returns to idle after 3200ms', () => {
  m.set('error');
  vi.advanceTimersByTime(3200);
  expect(last()).toBe('idle');
});

test('a new set cancels the pending timer', () => {
  m.set('error');
  m.set('loading');
  vi.advanceTimersByTime(1799);
  expect(last()).toBe('loading');
});

test('idle stays idle', () => {
  m.set('idle');
  vi.advanceTimersByTime(10000);
  expect(seen).toEqual(['idle']);
});

test('dispose stops pending transitions', () => {
  m.set('loading');
  m.dispose();
  vi.advanceTimersByTime(5000);
  expect(seen).toEqual(['loading']);
});
