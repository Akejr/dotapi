import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getContent, isLocale, localePath } from '@/content';
import { locales } from '@/content/types';
import { brand } from '@/lib/brand';

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { docs, meta } = getContent(locale);
  const languages: Record<string, string> = {};
  for (const other of locales) {
    languages[getContent(other).meta.htmlLang] = localePath(other, '/documentation');
  }

  return {
    title: locale === 'pt' ? 'Documentação' : 'Documentation',
    description: docs.body,
    alternates: {
      canonical: localePath(locale, '/documentation'),
      languages: { ...languages, 'x-default': '/documentation' },
    },
    openGraph: {
      title: `${brand.name} — ${docs.eyebrow}`,
      description: docs.body,
      locale: meta.ogLocale,
    },
  };
}

/**
 * The approved design covers the marketing page only. This is a deliberately
 * small, on-brand landing spot for the "Documentation" links so nothing in the
 * navigation dead-ends — replace it with the real developer docs when they land.
 */
const SNIPPET = `curl https://api.dot.ao/v1/payments \\
  -H "Authorization: Bearer $DOT_SECRET_KEY" \\
  -d amount=25000 \\
  -d currency=AOA \\
  -d method=multicaixa_express \\
  -d settlement_currency=EUR`;

export default async function DocumentationPage({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { docs } = getContent(locale);

  return (
    <>
      <section className="surface-ink pt-[104px] pb-16 lg:pt-[150px] lg:pb-20">
        <Container>
          <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-brand uppercase">
            {docs.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[36rem] text-[2rem] leading-[1.08] tracking-[-0.035em] text-white sm:text-[2.5rem] lg:text-[3rem]">
            {docs.heading.first} <span className="text-brand">{docs.heading.second}</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-[0.9375rem] leading-[1.75] text-white/75 lg:text-base">
            {docs.body}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              href={localePath(locale, '/#contact')}
              size="lg"
              withArrow
              className="w-full sm:w-auto"
            >
              {docs.primaryCta}
            </Button>
            <Button
              href={localePath(locale, '/')}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              {docs.secondaryCta}
            </Button>
          </div>

          {/* Illustrative only — the real request shape ships with your keys. */}
          <figure className="mt-12 max-w-[38rem]">
            <div className="card-on-ink overflow-x-auto rounded-[var(--radius-card)] p-5">
              <pre className="text-[0.8125rem] leading-relaxed text-white/85">
                <code>{SNIPPET}</code>
              </pre>
            </div>
            <figcaption className="mt-3 text-[0.75rem] text-on-dark-muted">
              {docs.snippetCaption}
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="bg-paper py-[4.5rem] lg:py-[6rem]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            {docs.sections.map((section) => (
              <article key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-[1.375rem] lg:text-[1.5rem]">{section.title}</h2>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-body">{section.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand-deep" />
                      <span className="text-[0.875rem] leading-relaxed text-body">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-[1.5rem] bg-mist p-8 sm:p-10 lg:mt-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-[1.375rem] lg:text-[1.5rem]">{docs.closing.heading}</h2>
                <p className="mt-2 max-w-[32rem] text-[0.9375rem] leading-relaxed text-body">
                  {docs.closing.body}
                </p>
              </div>
              <Button
                href={localePath(locale, '/#contact')}
                size="lg"
                withArrow
                className="shrink-0"
              >
                {docs.closing.cta}
              </Button>
            </div>
          </div>

          <p className="mt-10 text-[0.8125rem] text-subtle">
            {docs.emailLead}{' '}
            <a
              href={`mailto:${brand.contactEmail}`}
              className="font-medium text-brand-deep underline decoration-brand-deep/40 underline-offset-4 hover:decoration-brand-deep"
            >
              {brand.contactEmail}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
