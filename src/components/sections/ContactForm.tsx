'use client';

import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircleIcon, ChevronDownIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import type { ContactFieldName, Locale, SiteContent } from '@/content/types';
import { cn } from '@/lib/cn';
import { LIMITS, validateContact, type ContactErrors, type ContactPayload } from '@/lib/contact-schema';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/* Field metrics from the design: 52px controls on a 16px row grid. */
const FIELD_BASE =
  'text-body-base w-full rounded-[0.75rem] border bg-white px-5 text-heading transition-colors ' +
  'placeholder:text-subtle focus:border-brand focus:outline-none';
const FIELD_HEIGHT = 'h-[3.25rem]';

export function ContactForm({
  locale,
  copy,
}: {
  locale: Locale;
  copy: SiteContent['contact'];
}) {
  const formId = useId();
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const fieldId = (name: ContactFieldName) => `${formId}-${name}`;
  const errorId = (name: ContactFieldName) => `${formId}-${name}-error`;
  const borderFor = (name: ContactFieldName) =>
    errors[name] ? 'border-red-400' : 'border-mist-line';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload: ContactPayload = {
      company: String(data.get('company') ?? ''),
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      businessType: String(data.get('businessType') ?? ''),
      message: String(data.get('message') ?? ''),
      referralSource: String(data.get('referralSource') ?? ''),
    };

    const nextErrors = validateContact(payload, copy);
    setErrors(nextErrors);
    setFormError(null);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      const control = firstInvalid ? form.elements.namedItem(firstInvalid) : null;
      if (control instanceof HTMLElement) control.focus();
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...payload, locale }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: ContactErrors;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        if (result.errors) setErrors(result.errors);
        setFormError(result.message ?? copy.errors.generic);
        setStatus('error');
        return;
      }

      form.reset();
      setStatus('success');
    } catch {
      setFormError(copy.errors.network);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex h-full min-h-[18rem] flex-col items-center justify-center rounded-[1rem] border border-mist-line bg-white/70 p-8 text-center"
      >
        <CheckCircleIcon className="size-11 text-brand-deep" />
        <h3 className="text-h3 mt-5">{copy.success.title}</h3>
        <p className="text-body-base mt-2 max-w-[26rem] text-body">{copy.success.body}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="relative grid grid-cols-2 gap-x-3 gap-y-4">
      <Field
        className="col-span-2 md:col-span-1"
        id={fieldId('company')}
        errorId={errorId('company')}
        error={errors.company}
        label={copy.fields.company}
      >
        <input
          id={fieldId('company')}
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={LIMITS.company}
          placeholder={`${copy.fields.company}*`}
          aria-invalid={errors.company ? true : undefined}
          aria-describedby={errors.company ? errorId('company') : undefined}
          className={cn(FIELD_BASE, FIELD_HEIGHT, borderFor('company'))}
        />
      </Field>

      <Field
        className="col-span-1"
        id={fieldId('name')}
        errorId={errorId('name')}
        error={errors.name}
        label={copy.fields.name}
      >
        <input
          id={fieldId('name')}
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name}
          placeholder={`${copy.fields.name}*`}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? errorId('name') : undefined}
          className={cn(FIELD_BASE, FIELD_HEIGHT, borderFor('name'))}
        />
      </Field>

      <Field
        className="col-span-1"
        id={fieldId('email')}
        errorId={errorId('email')}
        error={errors.email}
        label={copy.fields.email}
      >
        <input
          id={fieldId('email')}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={LIMITS.email}
          placeholder={`${copy.fields.email}*`}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? errorId('email') : undefined}
          className={cn(FIELD_BASE, FIELD_HEIGHT, borderFor('email'))}
        />
      </Field>

      <Field
        className="col-span-2 md:col-span-1"
        id={fieldId('businessType')}
        errorId={errorId('businessType')}
        error={errors.businessType}
        label={copy.fields.businessType}
      >
        <div className="relative">
          <select
            id={fieldId('businessType')}
            name="businessType"
            defaultValue=""
            /* `required` is what makes the :invalid placeholder colour work;
               native blocking is already off via the form's noValidate. */
            required
            aria-invalid={errors.businessType ? true : undefined}
            aria-describedby={errors.businessType ? errorId('businessType') : undefined}
            className={cn(
              FIELD_BASE,
              FIELD_HEIGHT,
              'appearance-none pr-11',
              borderFor('businessType'),
              'text-heading [&:invalid]:text-subtle',
            )}
          >
            <option value="" disabled>
              {`${copy.fields.businessType}*`}
            </option>
            {copy.businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-subtle"
            aria-hidden="true"
          />
        </div>
      </Field>

      <Field
        className="col-span-2"
        id={fieldId('message')}
        errorId={errorId('message')}
        error={errors.message}
        label={copy.fields.message}
      >
        <textarea
          id={fieldId('message')}
          name="message"
          rows={3}
          maxLength={LIMITS.message}
          placeholder={`${copy.fields.message}*`}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? errorId('message') : undefined}
          className={cn(FIELD_BASE, 'resize-y py-4', borderFor('message'))}
        />
      </Field>

      {/* Honeypot — hidden from people, left in the DOM for bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${formId}-referral`}>Referral source</label>
        <input id={`${formId}-referral`} name="referralSource" type="text" tabIndex={-1} />
      </div>

      <div className="col-span-2">
        <Button
          type="submit"
          size="lg"
          withArrow
          disabled={status === 'submitting'}
          className="w-full"
        >
          {status === 'submitting' ? copy.sending : copy.submit}
        </Button>

        {formError ? (
          <p role="alert" className="mt-3 text-center text-[0.875rem] text-red-600">
            {formError}
          </p>
        ) : null}
      </div>
    </form>
  );
}

/** Wraps a control with its visually hidden label and inline error message. */
function Field({
  id,
  label,
  error,
  errorId,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  errorId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-1.5 text-[0.8125rem] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
