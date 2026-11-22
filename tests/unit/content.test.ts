import { expect, test } from 'vitest';
import { experienceSchema, projectSchema } from '../../src/content/schemas';

const base = {
  title: 'Judigo Legal',
  client: 'Advante Digital',
  year: '2022–2024',
  role: 'Fullstack',
  stack: ['Next.js'],
  summary: 'Chat cliente-abogado.',
  headline: 'Un chat en el que se puede confiar.',
  outcome: 'Chat en producción.',
  order: 1,
  featured: true,
};

test('a case without problem/solution is rejected', () => {
  expect(() => projectSchema.parse({ ...base, kind: 'case' })).toThrow();
});

test('a case with problem and solution is accepted', () => {
  const p = projectSchema.parse({ ...base, kind: 'case', problem: 'p', solution: 's' });
  expect(p.metrics).toEqual([]);
});

test('a lab project needs no problem/solution and defaults metrics to []', () => {
  expect(projectSchema.parse({ ...base, kind: 'lab' }).metrics).toEqual([]);
});

test('outcome is always required (fallback text for unconfirmed metrics)', () => {
  const { outcome: _omit, ...noOutcome } = base;
  expect(() => projectSchema.parse({ ...noOutcome, kind: 'lab' })).toThrow();
});

test('invalid live url is rejected', () => {
  expect(() => projectSchema.parse({ ...base, kind: 'lab', liveUrl: 'not a url' })).toThrow();
});

test('experience defaults minus to []', () => {
  const e = experienceSchema.parse({
    version: 'v1.0', company: 'Advante Digital', role: 'Full stack Developer',
    start: 'oct 2022', end: 'oct 2024', freelance: false, stack: [], plus: ['x'], order: 1,
  });
  expect(e.minus).toEqual([]);
});
