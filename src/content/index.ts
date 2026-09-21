import { en } from '@/content/en';
import { pt } from '@/content/pt';
import { defaultLocale, locales, type Locale, type SiteContent } from '@/content/types';

export { defaultLocale, locales };
export type { Locale, SiteContent };
export type * from '@/content/types';

const content: Record<Locale, SiteContent> = { en, pt };

export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/** Every locale paired with its display name, for the language switcher. */
export const localeOptions = locales.map((locale) => ({
  locale,
  name: content[locale].meta.languageName,
}));

/**
 * Prefixes a path with a locale. In-page anchors and absolute URLs are returned
 * untouched, so `#contact` keeps working from any locale.
 */
export function localePath(locale: Locale, href: string): string {
  if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return href;
  const clean = href === '/' ? '' : href;
  return `/${locale}${clean}`;
}
