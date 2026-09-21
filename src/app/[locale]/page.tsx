import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Benefits } from '@/components/sections/Benefits';
import { Bridge } from '@/components/sections/Bridge';
import { Capabilities } from '@/components/sections/Capabilities';
import { Contact } from '@/components/sections/Contact';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { Industries } from '@/components/sections/Industries';
import { getContent, isLocale, localePath } from '@/content';
import { locales } from '@/content/types';
import { brand } from '@/lib/brand';
import { languageAlternates, ogImages, pageRobots } from '@/lib/seo';
import { homeGraph, serialiseGraph } from '@/lib/structured-data';

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { meta, seo } = getContent(locale);

  return {
    /* Absolute, so the search-facing title is not lengthened by the template. */
    title: { absolute: seo.home.title },
    description: seo.home.description,
    keywords: meta.keywords,
    alternates: {
      canonical: localePath(locale, '/'),
      languages: languageAlternates('/'),
    },
    openGraph: {
      type: 'website',
      url: localePath(locale, '/'),
      siteName: brand.name,
      title: seo.home.title,
      description: seo.home.description,
      locale: meta.ogLocale,
      images: ogImages(`${brand.name} — ${meta.tagline}`),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.home.title,
      description: seo.home.description,
      images: ogImages(`${brand.name} — ${meta.tagline}`),
    },
    robots: pageRobots,
  };
}

export default async function HomePage({ params }: LocaleParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialiseGraph(homeGraph(content, locale)) }}
      />

      <Hero locale={locale} content={content} />
      <Capabilities content={content} />
      <Benefits locale={locale} content={content} />
      <Bridge content={content} />
      <Industries content={content} />
      <Faq content={content} />
      <Contact locale={locale} content={content} />
    </>
  );
}
