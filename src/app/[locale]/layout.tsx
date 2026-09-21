import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { getContent, isLocale, localePath } from '@/content';
import { locales, type Locale } from '@/content/types';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { brand } from '@/lib/brand';
import './globals.css';

/* The geometric sans used in the DOT lockup. */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** hreflang map for every locale plus x-default. */
function languageAlternates(path = '') {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[getContent(locale).meta.htmlLang] = `${localePath(locale, '/')}${path}`;
  }
  return languages;
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { meta } = getContent(locale);

  return {
    metadataBase: new URL(brand.url),
    title: {
      default: `${brand.name} — ${meta.tagline}`,
      template: `%s — ${brand.name}`,
    },
    description: meta.description,
    applicationName: brand.name,
    keywords: meta.keywords,
    authors: [{ name: brand.name }],
    alternates: {
      canonical: localePath(locale, '/'),
      languages: { ...languageAlternates(), 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      url: localePath(locale, '/'),
      siteName: brand.name,
      title: `${brand.name} — ${meta.tagline}`,
      description: meta.description,
      locale: meta.ogLocale,
      images: [
        {
          url: '/images/og.png',
          width: 1200,
          height: 630,
          alt: `${brand.name} — ${meta.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand.name} — ${meta.tagline}`,
      description: meta.description,
      images: ['/images/og.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export const viewport: Viewport = {
  /* Brand navy, matching --color-ink. */
  themeColor: '#001330',
  colorScheme: 'dark light',
};

/**
 * Arms the scroll reveals before first paint, so they never flash hidden content
 * and never hide anything when JavaScript is off.
 *
 * It sets a data attribute rather than a class: React renders `className` on
 * <html>, and mutating that before hydration is a guaranteed mismatch.
 */
const REVEAL_BOOTSTRAP = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-reveal','on')}}catch(e){}`;

/*
 * `suppressHydrationWarning` on <html> covers only that element's own
 * attributes, never its children. The single intentional difference is
 * `data-reveal`, which REVEAL_BOOTSTRAP sets before React hydrates.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const content = getContent(locale);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    legalName: brand.legalName,
    url: brand.url,
    description: content.meta.description,
    logo: `${brand.url}/brand/dot-wordmark.png`,
    slogan: content.meta.tagline,
    areaServed: 'AO',
    email: brand.contactEmail,
    sameAs: brand.social.map((item) => item.href),
  };

  return (
    <html lang={content.meta.htmlLang} className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-paper-soft antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-[0.875rem] focus:font-semibold focus:text-ink"
        >
          {content.a11y.skipToContent}
        </a>

        <Header locale={locale} content={content} />
        <main id="main">{children}</main>
        <Footer locale={locale} content={content} />
      </body>
    </html>
  );
}
