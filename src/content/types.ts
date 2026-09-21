/**
 * The shape every locale must provide. Written out explicitly rather than
 * inferred from one language, so adding a locale gives precise type errors for
 * anything left untranslated.
 */

export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/* -------------------------------------------------------------------------- */

/**
 * This is a single-page landing site, so the header only ever links to sections
 * of the home page. Anything that lives on another route (the documentation)
 * is reached from the hero CTA and the footer instead.
 */
export type NavItem = { label: string; href: string };

export type CapabilityIcon = 'code' | 'card' | 'globe' | 'chart';
export type IndustryIcon = 'cart' | 'education' | 'streaming' | 'saas' | 'gaming' | 'digital';
export type MethodIcon = 'multicaixa' | 'bank';
export type DashboardIcon =
  | 'overview'
  | 'card'
  | 'balance'
  | 'settlements'
  | 'code'
  | 'settings';

export type ContactFieldName = 'company' | 'name' | 'email' | 'businessType' | 'message';

export type SiteContent = {
  /** Document-level metadata. */
  meta: {
    /** Value for <html lang>. */
    htmlLang: string;
    /** Open Graph locale, e.g. en_US / pt_AO. */
    ogLocale: string;
    /** Human name of this language, for the switcher. */
    languageName: string;
    tagline: string;
    description: string;
    keywords: string[];
  };

  /** Labels that exist purely for assistive technology. */
  a11y: {
    skipToContent: string;
    home: string;
    mainNav: string;
    footerNav: string;
    openMenu: string;
    closeMenu: string;
    languageSwitcher: string;
    dashboardAlt: string;
  };

  nav: NavItem[];

  hero: {
    headline: { first: string; second: string };
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    assurances: string[];
  };

  paymentFlow: {
    source: {
      title: string;
      methods: { name: string; suffix: string; icon: MethodIcon }[];
    };
    destination: {
      title: string;
      currencies: { symbol: string; code: string }[];
    };
    badge: string;
  };

  capabilities: {
    heading: string;
    body: string;
    items: { icon: CapabilityIcon; title: string; body: string }[];
  };

  benefits: {
    heading: string;
    body: string;
    items: string[];
    cta: { label: string; href: string };
  };

  dashboard: {
    range: string;
    title: string;
    nav: { label: string; icon: DashboardIcon }[];
    stats: { label: string; value: string; delta: string; trend: number[] }[];
    settlement: { label: string; value: string; date: string };
    payments: {
      title: string;
      viewAll: string;
      columns: string[];
      rows: { date: string; method: string; amount: string; status: string }[];
    };
  };

  bridge: {
    heading: string;
    body: string;
    stats: { value: string; label: string }[];
  };

  industries: {
    heading: string;
    body: string;
    items: { label: string; icon: IndustryIcon }[];
  };

  contact: {
    heading: string;
    body: string;
    fields: Record<ContactFieldName, string>;
    businessTypes: string[];
    submit: string;
    sending: string;
    success: { title: string; body: string };
    errors: {
      /** `{field}` is replaced with the field label. */
      required: string;
      /** `{max}` is replaced with the character limit. */
      tooLong: string;
      invalidEmail: string;
      invalidOption: string;
      /** Shown when the request itself fails. */
      generic: string;
      network: string;
    };
  };

  footer: {
    links: { label: string; href: string }[];
    legal: string;
    note: string;
  };

  notFound: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: string;
  };

  docs: {
    eyebrow: string;
    heading: { first: string; second: string };
    body: string;
    primaryCta: string;
    secondaryCta: string;
    snippetCaption: string;
    sections: { id: string; title: string; body: string; points: string[] }[];
    closing: { heading: string; body: string; cta: string };
    emailLead: string;
  };
};
