/**
 * Structured data, emitted as a single JSON-LD `@graph` per page.
 *
 * One graph with cross-referenced `@id`s beats several disconnected blocks:
 * search engines can tell that the Organization publishing the WebSite is the
 * same entity that provides the Service the page describes, instead of guessing
 * from three isolated islands. That linkage is what makes DOT resolvable as an
 * entity rather than just a string of matching words.
 */

import { localePath } from '@/content';
import { locales, type Locale, type SiteContent } from '@/content/types';
import { brand } from '@/lib/brand';

/* Stable node identifiers, so every page points at the same entities. */
const ID = {
  organization: `${brand.url}/#organization`,
  website: `${brand.url}/#website`,
  logo: `${brand.url}/#logo`,
  service: `${brand.url}/#payments-api`,
} as const;

const abs = (path: string) => `${brand.url}${path}`;

function organization(content: SiteContent) {
  return {
    '@type': ['Organization', 'FinancialService'],
    '@id': ID.organization,
    name: brand.name,
    legalName: brand.legalName,
    url: brand.url,
    description: content.meta.description,
    slogan: content.meta.tagline,
    logo: { '@id': ID.logo },
    image: { '@id': ID.logo },
    email: brand.contactEmail,
    sameAs: brand.social.map((item) => item.href),
    /* Angola is where the rails are; that is the service area, not the audience. */
    areaServed: {
      '@type': 'Country',
      name: 'Angola',
      alternateName: 'AO',
    },
    knowsLanguage: locales.map((locale) => locale === 'pt' ? 'pt-AO' : 'en'),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        email: brand.contactEmail,
        availableLanguage: ['en', 'pt'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

function logo() {
  return {
    '@type': 'ImageObject',
    '@id': ID.logo,
    url: abs('/brand/dot-wordmark.png'),
    contentUrl: abs('/brand/dot-wordmark.png'),
    width: 1024,
    height: 287,
    caption: brand.name,
  };
}

function website(content: SiteContent, locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: brand.url,
    name: brand.name,
    description: content.meta.description,
    publisher: { '@id': ID.organization },
    inLanguage: locales.map((other) => (other === 'pt' ? 'pt-AO' : 'en')),
    /* The locale actually being served right now. */
    workTranslation: locales
      .filter((other) => other !== locale)
      .map((other) => ({
        '@type': 'WebPage',
        url: abs(localePath(other, '/')),
        inLanguage: other === 'pt' ? 'pt-AO' : 'en',
      })),
  };
}

/**
 * The thing being sold. This is what should surface for "Angola payments API"
 * style queries, so the two local methods are enumerated as an offer catalogue.
 */
function service(content: SiteContent) {
  return {
    '@type': 'Service',
    '@id': ID.service,
    name: content.seo.serviceName,
    description: content.seo.serviceDescription,
    serviceType: 'Payment processing',
    category: 'Payments infrastructure',
    provider: { '@id': ID.organization },
    areaServed: { '@type': 'Country', name: 'Angola' },
    audience: {
      '@type': 'BusinessAudience',
      name: 'Companies outside Angola selling to Angolan customers',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: abs('/en/documentation'),
      name: 'DOT payments API',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: content.seo.serviceName,
      itemListElement: content.seo.methodNames.map((method) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: method,
          serviceType: 'Local payment method',
          areaServed: { '@type': 'Country', name: 'Angola' },
        },
      })),
    },
  };
}

function webPage({
  content,
  locale,
  path,
  seo,
  type = 'WebPage',
}: {
  content: SiteContent;
  locale: Locale;
  path: string;
  seo: { title: string; description: string };
  type?: string;
}) {
  const url = abs(localePath(locale, path));
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: seo.title,
    description: seo.description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.service },
    inLanguage: content.meta.htmlLang,
    primaryImageOfPage: { '@id': ID.logo },
  };
}

function faqPage(content: SiteContent, locale: Locale) {
  const url = abs(localePath(locale, '/'));
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: content.meta.htmlLang,
    isPartOf: { '@id': ID.website },
    mainEntity: content.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* -------------------------------------------------------------------------- */
/* Page graphs                                                                */
/* -------------------------------------------------------------------------- */

export function homeGraph(content: SiteContent, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(content),
      logo(),
      website(content, locale),
      service(content),
      webPage({ content, locale, path: '/', seo: content.seo.home }),
      faqPage(content, locale),
    ],
  };
}

export function documentationGraph(content: SiteContent, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(content),
      logo(),
      website(content, locale),
      service(content),
      webPage({
        content,
        locale,
        path: '/documentation',
        seo: content.seo.documentation,
        type: 'TechArticle',
      }),
      breadcrumbs([
        { name: brand.name, url: abs(localePath(locale, '/')) },
        { name: content.docs.eyebrow, url: abs(localePath(locale, '/documentation')) },
      ]),
    ],
  };
}

/**
 * Renders a graph for injection. JSON.stringify is not enough on its own: a
 * literal `</script>` inside any string would close the tag early, so the
 * forward slash is escaped.
 */
export function serialiseGraph(graph: unknown): string {
  return JSON.stringify(graph).replace(/</g, '\\u003c');
}
