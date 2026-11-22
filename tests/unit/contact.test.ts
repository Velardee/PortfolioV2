import { expect, test } from 'vitest';
import { validateContact } from '../../src/lib/contact';

const ok = { type: 'project' as const, name: 'Ana', email: 'ana@studio.mx', message: 'Necesito un MVP' };

test('valid input passes, even with surrounding spaces', () => {
  expect(validateContact({ ...ok, email: ' ana@studio.mx ' }, 'es')).toEqual({ ok: true });
});

test('empty name gets the localized message', () => {
  expect(validateContact({ ...ok, name: '   ' }, 'es')).toEqual({ ok: false, errors: { name: '¿Cómo te llamo?' } });
  expect(validateContact({ ...ok, name: '' }, 'en')).toEqual({ ok: false, errors: { name: 'What should I call you?' } });
});

test('incomplete emails are rejected', () => {
  for (const email of ['ana@', 'ana', 'ana@studio', '@studio.mx', 'a na@studio.mx', '']) {
    const r = validateContact({ ...ok, email }, 'es');
    expect(r, email).toEqual({ ok: false, errors: { email: 'Ese email no parece completo. ¿Falta el @ o el dominio?' } });
  }
});

test('empty message is rejected', () => {
  expect(validateContact({ ...ok, message: '\n ' }, 'en')).toEqual({ ok: false, errors: { message: 'A couple of lines is enough to start.' } });
});

test('reports every invalid field at once', () => {
  const r = validateContact({ type: 'hire', name: '', email: 'x', message: '' }, 'es');
  expect(r.ok).toBe(false);
  if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(['email', 'message', 'name']);
});
