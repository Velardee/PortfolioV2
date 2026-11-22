import { t, type Locale } from '../i18n';

export type ContactType = 'hire' | 'project' | 'hello';
export type ContactInput = { type: ContactType; name: string; email: string; message: string };
type Field = 'name' | 'email' | 'message';
export type ContactResult = { ok: true } | { ok: false; errors: Partial<Record<Field, string>> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactInput, locale: Locale): ContactResult {
  const errors: Partial<Record<Field, string>> = {};
  if (!input.name.trim()) errors.name = t(locale, 'form.errName');
  if (!EMAIL.test(input.email.trim())) errors.email = t(locale, 'form.errEmail');
  if (!input.message.trim()) errors.message = t(locale, 'form.errMessage');
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true };
}
