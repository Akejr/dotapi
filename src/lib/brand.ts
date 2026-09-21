/**
 * Locale-independent brand facts. Anything that reads differently per language
 * lives in src/content instead.
 *
 * TODO(brand): `url` and `contactEmail` are placeholders. Point them at the real
 * DOT domain and inbox before this goes live — they feed the canonical URLs, the
 * sitemap, robots.txt, the Open Graph tags and the JSON-LD.
 */
export const brand = {
  name: 'DOT',
  legalName: 'DOT',
  url: 'https://www.dot.ao',
  contactEmail: 'api@dot.ao',
  /** Network names are proper nouns, so they need no translation. */
  social: [
    { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/dotangola.ao' },
  ],
} as const;

export type SocialIconName = (typeof brand.social)[number]['icon'];
