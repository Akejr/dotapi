import type { MetadataRoute } from 'next';
import { getContent, localePath } from '@/content';
import { locales } from '@/content/types';
import { brand } from '@/lib/brand';

/** Both locales of both pages, each cross-referencing the other via hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const alternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[getContent(locale).meta.htmlLang] = `${brand.url}${localePath(locale, path)}`;
    }
    return { languages };
  };

  return locales.flatMap((locale) => [
    {
      url: `${brand.url}${localePath(locale, '/')}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1,
      alternates: alternates('/'),
    },
    {
      url: `${brand.url}${localePath(locale, '/documentation')}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: alternates('/documentation'),
    },
  ]);
}
