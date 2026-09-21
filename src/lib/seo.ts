import type { Metadata } from 'next';
import { getContent, localePath } from '@/content';
import { defaultLocale, locales } from '@/content/types';
import { brand } from '@/lib/brand';

/**
 * hreflang map for a path across every locale, plus x-default.
 *
 * x-default points at the default locale's real URL rather than at `/`. `/` is a
 * permanent redirect to it, and sending crawlers through a redirect hop for the
 * fallback is wasted crawl budget.
 */
export function languageAlternates(path = '/'): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[getContent(locale).meta.htmlLang] = localePath(locale, path);
  }
  languages['x-default'] = localePath(defaultLocale, path);
  return languages;
}

/**
 * The social card, as a helper rather than a constant spread by hand.
 *
 * Next's `generateMetadata` replaces the parent `openGraph` object instead of
 * deep-merging it, so a page that sets `openGraph` without images silently drops
 * the card inherited from the layout. Every page builds its OG block through
 * this, and scripts/seo-audit.mjs fails the build if one ever slips.
 */
export function ogImages(alt: string) {
  return [
    {
      /*
       * Absolute on purpose. og:image must be an absolute URL for scrapers to
       * fetch it, and building it from `brand.url` here means the tag does not
       * depend on `metadataBase` surviving the layout-to-page metadata merge.
       */
      url: `${brand.url}/images/og.png`,
      width: 1200,
      height: 630,
      alt,
      type: 'image/png',
    },
  ];
}

/**
 * Index everything, and explicitly lift Google's default caps on snippet length
 * and image preview size. Without `max-snippet: -1` long-tail answers can be cut
 * short in the result; without `max-image-preview: large` the social card is shown
 * as a thumbnail.
 */
export const pageRobots: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

/**
 * Bumped by hand when the copy meaningfully changes.
 *
 * Deliberately not `new Date()`: a lastmod that moves on every deploy tells
 * crawlers the content changed when it did not, and they learn to distrust it.
 */
export const CONTENT_UPDATED_AT = new Date('2026-09-21T00:00:00.000Z');
