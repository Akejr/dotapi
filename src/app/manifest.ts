import type { MetadataRoute } from 'next';
import { getContent } from '@/content';
import { defaultLocale } from '@/content/types';
import { brand } from '@/lib/brand';

/**
 * Web app manifest. Mostly matters for how the site presents when someone saves
 * it to a phone home screen, which is common for a page that gets shared around
 * a procurement or engineering team.
 */
export default function manifest(): MetadataRoute.Manifest {
  const { meta, seo } = getContent(defaultLocale);

  return {
    name: `${brand.name} — ${meta.tagline}`,
    short_name: brand.name,
    description: seo.home.description,
    start_url: `/${defaultLocale}`,
    display: 'standalone',
    background_color: '#001330',
    theme_color: '#001330',
    categories: ['business', 'finance'],
    lang: meta.htmlLang,
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
