import type { SiteContent } from '@/content/types';

/**
 * English copy. DOT already operates Angola's largest digital payments platform,
 * so this page speaks to companies outside Angola who want to sell into the
 * market without setting up locally.
 */
export const en: SiteContent = {
  meta: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    languageName: 'English',
    tagline: 'Sell in Angola. Get paid globally.',
    description:
      "DOT is Angola's largest digital payments platform. Connect once to our API to accept Multicaixa Express and Bank Reference from millions of Angolan customers, and settle globally in the currency you choose.",
    keywords: [
      'Angola payments API',
      'Angola payment gateway',
      'Multicaixa Express API',
      'Multicaixa Express integration',
      'Bank Reference payment Angola',
      'accept payments in Angola',
      'sell in Angola',
      'cross-border payments Angola',
      'settle in EUR from Angola',
      'Angola payment methods',
    ],
  },

  seo: {
    home: {
      /* 53 chars. Leads with the query, keeps the brand as the tail. */
      title: 'Angola Payments API — Multicaixa Express | DOT',
      /* 141 chars. Names the methods, the settlement, and the main objection. */
      description:
        'Accept Multicaixa Express and Bank Reference from Angolan customers through one API, and settle in EUR, USD or BRL. No local entity needed.',
    },
    documentation: {
      title: 'Payments API Documentation for Angola | DOT',
      description:
        'How to integrate the DOT payments API: sandbox keys, creating payments, webhooks and settlements for the Angolan market.',
    },
    serviceName: 'DOT Payments API for Angola',
    serviceDescription:
      'Payment processing for companies outside Angola: accept Multicaixa Express and Bank Reference locally through a single API integration, with settlement in the currency of your choice.',
    methodNames: ['Multicaixa Express', 'Bank Reference'],
  },

  a11y: {
    skipToContent: 'Skip to content',
    home: 'DOT — home',
    mainNav: 'Main',
    footerNav: 'Footer',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageSwitcher: 'Language',
    dashboardAlt:
      'The DOT dashboard: total volume, Angola revenue, the next settlement date and a list of recent Multicaixa Express and Bank Reference payments.',
  },

  /* Sections of this page only, in the order they appear. */
  nav: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Product', href: '#product' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    /* The two halves of the DOT tagline, exactly as they appear in the logo. */
    headline: { first: 'Sell in Angola.', second: 'Get paid globally.' },
    body: "DOT is Angola's largest digital payments platform. Connect once to our API to accept the methods Angolans already use — Multicaixa Express and Bank Reference — and settle in the currency you choose.",
    primaryCta: { label: 'Get API access', href: '#contact' },
    secondaryCta: { label: 'View documentation', href: '/documentation' },
    assurances: ['Local payment methods', 'Global settlements', 'Licensed in Angola'],
  },

  paymentFlow: {
    source: {
      title: 'Customers in Angola\npay with local methods',
      methods: [
        { name: 'MULTICAIXA', suffix: 'Express', icon: 'multicaixa' },
        { name: 'Bank', suffix: 'Reference', icon: 'bank' },
      ],
    },
    destination: {
      title: 'You receive in your\npreferred currency',
      currencies: [
        { symbol: '€', code: 'EUR' },
        { symbol: '$', code: 'USD' },
        { symbol: 'R$', code: 'BRL' },
      ],
    },
    badge: 'Simple. Local. Global.',
  },

  capabilities: {
    heading: "One integration to reach\nAngola's payment market",
    body: 'DOT already runs the local infrastructure. You connect once and start selling.',
    items: [
      {
        icon: 'code',
        title: 'One integration',
        body: 'Connect once to the DOT API and accept every local method we support.',
      },
      {
        icon: 'card',
        title: 'Local payment methods',
        body: 'Multicaixa Express and Bank Reference, the options Angolans already trust.',
      },
      {
        icon: 'globe',
        title: 'Global settlements',
        body: 'Receive your funds in EUR, USD, BRL or another supported currency.',
      },
      {
        icon: 'chart',
        title: 'Real-time tracking',
        body: 'Follow payments, balances and settlements in the DOT dashboard.',
      },
    ],
  },

  benefits: {
    heading: 'Built for global businesses\nthat want to grow in Angola',
    body: "Whether you're an e-commerce store, a SaaS platform, an education company or a digital service, DOT gives you the local rails — methods, licensing, reconciliation and settlement — without opening a company in Angola.",
    items: [
      'Reach millions of customers in Angola',
      'Increase your conversion rates',
      'Settle in your currency, not Kwanza',
      'A local team behind every transaction',
    ],
    cta: { label: 'Get API access', href: '#contact' },
  },

  dashboard: {
    range: 'Last 30 days',
    title: 'Overview',
    nav: [
      { label: 'Overview', icon: 'overview' },
      { label: 'Payments', icon: 'card' },
      { label: 'Balances', icon: 'balance' },
      { label: 'Settlements', icon: 'settlements' },
      { label: 'Developers', icon: 'code' },
      { label: 'Settings', icon: 'settings' },
    ],
    stats: [
      {
        label: 'Total volume',
        value: '€ 48,291.20',
        delta: '12.9%',
        /* Normalised 0-1 samples, traced from the sparkline in Dashboard.png */
        trend: [
          0.18, 0.2, 0.24, 0.22, 0.3, 0.34, 0.31, 0.42, 0.4, 0.52, 0.58, 0.54, 0.68, 0.72, 0.86,
        ],
      },
      {
        label: 'Angola revenue',
        value: 'Kz 52,480,920',
        delta: '18.4%',
        trend: [
          0.12, 0.16, 0.14, 0.24, 0.28, 0.26, 0.36, 0.34, 0.46, 0.5, 0.62, 0.6, 0.74, 0.8, 0.92,
        ],
      },
    ],
    settlement: { label: 'Next settlement', value: '€ 8,420.00', date: 'Sep 18, 2024' },
    payments: {
      title: 'Payments',
      viewAll: 'View all',
      columns: ['Date', 'Method', 'Amount', 'Status'],
      rows: [
        { date: 'Sep 12, 2024', method: 'Multicaixa Express', amount: 'Kz 25,000', status: 'Paid' },
        { date: 'Sep 12, 2024', method: 'Bank Reference', amount: 'Kz 48,500', status: 'Paid' },
        { date: 'Sep 11, 2024', method: 'Multicaixa Express', amount: 'Kz 12,000', status: 'Paid' },
        { date: 'Sep 10, 2024', method: 'Bank Reference', amount: 'Kz 76,000', status: 'Paid' },
      ],
    },
  },

  bridge: {
    heading: 'A bridge\nbetween Angola\nand the world.',
    body: 'We connect local payments\nto global opportunities.\nMore business for you.\nA more connected Angola.',
    stats: [
      { value: '#1', label: 'Digital payments platform in Angola' },
      { value: '30M+', label: 'People in Angola you can reach' },
      { value: '2', label: 'Local payment methods (Multicaixa Express and Reference)' },
      { value: 'Global', label: 'Settlements in the currency you choose' },
    ],
  },

  industries: {
    heading: 'Trusted by global businesses',
    body: 'From digital products to education, we help companies around the world grow in Angola.',
    items: [
      { label: 'E-commerce', icon: 'cart' },
      { label: 'Education', icon: 'education' },
      { label: 'Streaming', icon: 'streaming' },
      { label: 'SaaS', icon: 'saas' },
      { label: 'Gaming', icon: 'gaming' },
      { label: 'Digital services', icon: 'digital' },
    ],
  },

  faq: {
    heading: 'Questions about accepting payments in Angola',
    body: 'What teams outside Angola usually ask before they integrate.',
    items: [
      {
        question: 'How can a company outside Angola accept payments from Angolan customers?',
        answer:
          'Through the DOT API. You integrate once, your customers pay with the local methods they already use — Multicaixa Express or a Bank Reference — and DOT settles the funds to you in the currency you choose. You do not need to register a company in Angola.',
      },
      {
        question: 'What is Multicaixa Express?',
        answer:
          "Multicaixa Express is the mobile payment app used across Angola, built on the country's Multicaixa network. The customer approves the payment on their phone. It is one of the two local methods available through the DOT API.",
      },
      {
        question: 'What is a Bank Reference payment?',
        answer:
          'The customer receives a reference number and pays it through their bank — at an ATM, at the counter or in their banking app. It is widely used in Angola by customers who prefer to pay from a bank account rather than with a card or an app.',
      },
      {
        question: 'Do I need a company registered in Angola to use DOT?',
        answer:
          'No. DOT holds the local licensing and runs the local infrastructure, so you can sell into Angola as a foreign company. Your integration is with the DOT API, and settlement reaches you abroad.',
      },
      {
        question: 'Which currencies can I settle in?',
        answer:
          'EUR, USD and BRL are supported, along with other currencies on request. Your customers pay in Kwanza and you receive in the currency you chose, so no Kwanza balance sits on your books.',
      },
      {
        question: 'Can I test the integration before going live?',
        answer:
          'Yes. The sandbox mirrors production, including the Multicaixa Express and Bank Reference flows, so your developers can take a payment end to end before any real money moves.',
      },
      {
        question: 'How do I get access to the API?',
        answer:
          'Request access from this page. The team sets up your sandbox credentials, shares the full documentation and walks your developers through the integration before you go live.',
      },
      {
        question: 'What kinds of business use DOT?',
        answer:
          'E-commerce, education, streaming, SaaS, gaming and digital services — any company selling to Angolan customers that wants local payment methods without local operations.',
      },
    ],
  },

  contact: {
    heading: "Let's grow\ntogether",
    body: 'Tell us about your business and our team will get in touch to set up your API access and walk you through going live in Angola.',
    fields: {
      company: 'Company name',
      name: 'Your name',
      email: 'Business email',
      businessType: 'Type of business',
      message: 'Tell us about your needs',
    },
    businessTypes: [
      'E-commerce',
      'Education',
      'Streaming',
      'SaaS',
      'Gaming',
      'Digital services',
      'Other',
    ],
    submit: 'Send message',
    sending: 'Sending…',
    success: {
      title: 'Message sent',
      body: 'Thanks for reaching out. Our team will get back to you within one business day.',
    },
    errors: {
      required: '{field} is required.',
      tooLong: 'Please keep this under {max} characters.',
      invalidEmail: 'Enter a valid email address.',
      invalidOption: 'Choose one of the listed options.',
      generic: 'Something went wrong. Please try again.',
      network: 'We could not reach the server. Please check your connection and try again.',
    },
  },

  footer: {
    links: [
      { label: 'Product', href: '#product' },
      { label: 'Documentation', href: '/documentation' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    legal: 'All rights reserved.',
    note: 'Payments without borders.',
  },

  notFound: {
    eyebrow: '404',
    heading: 'This page took a wrong turn.',
    body: 'The link may be out of date. Head back to the homepage to see how DOT connects local payments in Angola to global settlements.',
    cta: 'Back to home',
  },

  docs: {
    eyebrow: 'Developers',
    heading: { first: 'Integrate once.', second: 'Get paid globally.' },
    body: 'The full developer documentation is shared with your team during onboarding, along with sandbox credentials. Here is what it covers — get in touch and we will send your keys.',
    primaryCta: 'Request API access',
    secondaryCta: 'Back to home',
    snippetCaption:
      'Illustrative example. Endpoints and parameters are confirmed in your onboarding pack.',
    sections: [
      {
        id: 'getting-started',
        title: 'Getting started',
        body: 'Create a sandbox account, generate your API keys and take a test payment end to end before you go live. Sandbox mirrors production, including the Multicaixa Express and Bank Reference flows.',
        points: [
          'Sandbox and live API keys, scoped per environment',
          'A single integration for every supported local method',
          'Server-side SDK examples for Node, Python and PHP',
        ],
      },
      {
        id: 'api-reference',
        title: 'API reference',
        body: 'A REST API over HTTPS with predictable resources and idempotent writes. Create a payment, watch it settle, and reconcile against your balances and settlements.',
        points: [
          'Payments — create, retrieve and list local payments',
          'Balances — funds held per currency',
          'Settlements — payouts in EUR, USD, BRL and more',
        ],
      },
      {
        id: 'webhooks',
        title: 'Webhooks',
        body: 'Subscribe to payment and settlement events so your systems react the moment money moves. Every delivery is signed, retried with backoff and replayable from the dashboard.',
        points: [
          'Signed payloads you can verify in one line',
          'Automatic retries with exponential backoff',
          'Replay any event from the Developers tab',
        ],
      },
    ],
    closing: {
      heading: 'Ready to start testing?',
      body: 'Tell us about your business and we will set up your sandbox, share the full documentation and walk your team through the integration.',
      cta: 'Get API access',
    },
    emailLead: 'Questions in the meantime? Email',
  },
};
