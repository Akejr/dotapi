/**
 * One validation contract shared by the browser and the route handler, so the
 * client can give instant feedback while the server never trusts it.
 *
 * The rules are locale-independent; only the messages are localised, which the
 * caller supplies as `copy`.
 */

import type { ContactFieldName, SiteContent } from '@/content/types';

export type { ContactFieldName };

export type ContactPayload = Record<ContactFieldName, string> & {
  /** Hidden field: real users leave it empty, most bots do not. */
  referralSource?: string;
};

export type ContactErrors = Partial<Record<ContactFieldName, string>>;

/** The slice of localised copy the validator needs. */
export type ValidationCopy = Pick<SiteContent['contact'], 'fields' | 'businessTypes' | 'errors'>;

export const LIMITS = {
  company: 120,
  name: 120,
  email: 200,
  businessType: 60,
  message: 2000,
} as const satisfies Record<ContactFieldName, number>;

/* Deliberately permissive: enough to catch typos without rejecting valid addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@,]+\.[a-z]{2,}$/i;

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));

export function validateContact(
  input: Partial<ContactPayload>,
  copy: ValidationCopy,
): ContactErrors {
  const errors: ContactErrors = {};
  const value = (key: ContactFieldName) => (input[key] ?? '').trim();
  const required = (key: ContactFieldName) =>
    fill(copy.errors.required, { field: copy.fields[key] });
  const tooLong = (key: ContactFieldName) => fill(copy.errors.tooLong, { max: LIMITS[key] });

  for (const key of ['company', 'name', 'message'] as const) {
    if (!value(key)) errors[key] = required(key);
    else if (value(key).length > LIMITS[key]) errors[key] = tooLong(key);
  }

  if (!value('email')) errors.email = required('email');
  else if (!EMAIL_PATTERN.test(value('email'))) errors.email = copy.errors.invalidEmail;
  else if (value('email').length > LIMITS.email) errors.email = tooLong('email');

  if (!value('businessType')) errors.businessType = required('businessType');
  else if (!copy.businessTypes.includes(value('businessType')))
    errors.businessType = copy.errors.invalidOption;

  return errors;
}
