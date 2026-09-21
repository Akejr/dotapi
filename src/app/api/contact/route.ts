import { NextResponse } from 'next/server';
import { getContent, isLocale } from '@/content';
import { defaultLocale } from '@/content/types';
import { brand } from '@/lib/brand';
import { validateContact, type ContactPayload } from '@/lib/contact-schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* -------------------------------------------------------------------------- */
/* Rate limiting                                                              */
/* -------------------------------------------------------------------------- */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * Per-instance counter. Good enough to blunt casual abuse of a single form; a
 * multi-instance deployment should swap this for a shared store (Redis, Upstash,
 * Vercel KV) before relying on it.
 */
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  /* Opportunistic cleanup so the map cannot grow without bound. */
  if (hits.size > 5000) {
    for (const [existingKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(existingKey);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  return first || request.headers.get('x-real-ip') || 'unknown';
}

/* -------------------------------------------------------------------------- */
/* Delivery                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Forwards the enquiry to whatever the deployment is wired up to.
 *
 * Set CONTACT_WEBHOOK_URL to a Slack/Teams/Zapier style endpoint, or replace the
 * body of this function with your transactional email provider. Until one of
 * those is configured the submission is logged and nothing leaves the server —
 * see README.md before going live.
 */
async function deliver(payload: ContactPayload & { locale: string }): Promise<void> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    console.warn('[contact] No CONTACT_WEBHOOK_URL configured — enquiry was not forwarded.', {
      company: payload.company,
      email: payload.email,
    });
    return;
  }

  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      source: `${brand.url}/${payload.locale}#contact`,
      receivedAt: new Date().toISOString(),
      ...payload,
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded with ${response.status}`);
  }
}

/* -------------------------------------------------------------------------- */
/* Handler                                                                    */
/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
  let body: Partial<ContactPayload> & { locale?: string };
  try {
    body = (await request.json()) as Partial<ContactPayload> & { locale?: string };
  } catch {
    return NextResponse.json({ ok: false, message: 'Malformed request.' }, { status: 400 });
  }

  /* Messages are returned to the browser, so answer in the visitor's language. */
  const locale = isLocale(body.locale) ? body.locale : defaultLocale;
  const copy = getContent(locale).contact;

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json({ ok: false, message: copy.errors.generic }, { status: 429 });
  }

  /* Honeypot: accept and discard so bots get no signal from the response. */
  if (body.referralSource) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(body, copy);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const payload = {
    company: String(body.company).trim(),
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    businessType: String(body.businessType).trim(),
    message: String(body.message).trim(),
    locale,
  };

  try {
    await deliver(payload);
  } catch (error) {
    console.error('[contact] Delivery failed', error);
    return NextResponse.json({ ok: false, message: copy.errors.generic }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
