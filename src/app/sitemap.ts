import type { MetadataRoute } from 'next';
import { getContent, localePath } from '@/content';
import { defaultLocale, locales } from '@/content/types';
import { brand } from '@/lib/brand';
import { CONTENT_UPDATED_AT } from '@/lib/seo';

/**
 * Every locale of every page, each declaring the full set of alternates.
 *
 * Google requires the hreflang cluster to be reciprocal: if /en names /pt, /pt
 * must name /en and both must name themselves. Generating both directions from
 * the same loop is what keeps that true.
 */
const PATHS = [
  { path: '/', priority: 1 },
  { path: '/documentation', priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[getContent(locale).meta.htmlLang] = `${brand.url}${localePath(locale, path)}`;
    }
    languages['x-default'] = `${brand.url}${localePath(defaultLocale, path)}`;
    return { languages };
  };

  return PATHS.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: `${brand.url}${localePath(locale, path)}`,
      lastModified: CONTENT_UPDATED_AT,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: alternates(path),
    })),
  );
}
