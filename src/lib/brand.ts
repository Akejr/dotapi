/**
 * Locale-independent brand facts. Anything that reads differently per language
 * lives in src/content instead.
 *
 * `url` feeds the canonical URLs, the sitemap, robots.txt, the Open Graph tags
 * and the JSON-LD, so it has to be the exact production origin.
 */
export const brand = {
  name: 'DOT',
  legalName: 'DOT',
  url: 'https://business.dotangola.com',
  contactEmail: 'evandrocasanova@dotangola.com',
  /** Network names are proper nouns, so they need no translation. */
  social: [
    { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/dotangola.ao' },
  ],
} as const;

export type SocialIconName = (typeof brand.social)[number]['icon'];
