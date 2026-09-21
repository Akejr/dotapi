import type { SiteContent } from '@/content/types';

/**
 * Portuguese copy, in the European/Angolan register ("contacto", "equipa",
 * "definições", "para si"). Figures use Portuguese number formatting
 * (48.291,20 rather than 48,291.20) and abbreviated month names.
 */
export const pt: SiteContent = {
  meta: {
    htmlLang: 'pt-AO',
    ogLocale: 'pt_AO',
    languageName: 'Português',
    tagline: 'Venda em Angola. Receba globalmente.',
    description:
      'A DOT é a maior plataforma de pagamentos digitais de Angola. Integre uma vez com a nossa API para aceitar Multicaixa Express e Referência Bancária de milhões de clientes angolanos, e receba na moeda que escolher.',
    keywords: [
      'pagamentos Angola',
      'gateway de pagamentos Angola',
      'Multicaixa Express',
      'Referência Bancária',
      'API de pagamentos Angola',
      'liquidações globais',
      'pagamentos transfronteiriços',
      'vender em Angola',
    ],
  },

  a11y: {
    skipToContent: 'Ir para o conteúdo',
    home: 'DOT — página inicial',
    mainNav: 'Principal',
    footerNav: 'Rodapé',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    languageSwitcher: 'Idioma',
    dashboardAlt:
      'O painel da DOT: volume total, receita de Angola, a data da próxima liquidação e uma lista de pagamentos recentes por Multicaixa Express e Referência Bancária.',
  },

  /* Sections of this page only, in the order they appear. */
  nav: [
    { label: 'Como funciona', href: '#how-it-works' },
    { label: 'Produto', href: '#product' },
    { label: 'Benefícios', href: '#benefits' },
    { label: 'Contacto', href: '#contact' },
  ],

  hero: {
    headline: { first: 'Venda em Angola.', second: 'Receba globalmente.' },
    body: 'A DOT é a maior plataforma de pagamentos digitais de Angola. Integre uma vez com a nossa API para aceitar os métodos que os angolanos já usam — Multicaixa Express e Referência Bancária — e receba na moeda que escolher.',
    primaryCta: { label: 'Obter acesso à API', href: '#contact' },
    secondaryCta: { label: 'Ver documentação', href: '/documentation' },
    assurances: ['Métodos de pagamento locais', 'Liquidações globais', 'Licenciada em Angola'],
  },

  paymentFlow: {
    source: {
      title: 'Clientes em Angola\npagam com métodos locais',
      methods: [
        { name: 'MULTICAIXA', suffix: 'Express', icon: 'multicaixa' },
        { name: 'Referência', suffix: 'Bancária', icon: 'bank' },
      ],
    },
    destination: {
      title: 'Recebe na moeda\nque preferir',
      currencies: [
        { symbol: '€', code: 'EUR' },
        { symbol: '$', code: 'USD' },
        { symbol: 'R$', code: 'BRL' },
      ],
    },
    badge: 'Simples. Local. Global.',
  },

  capabilities: {
    heading: 'Uma integração para chegar\nao mercado de pagamentos de Angola',
    body: 'A DOT já opera a infraestrutura local. Integra uma vez e começa a vender.',
    items: [
      {
        icon: 'code',
        title: 'Uma só integração',
        body: 'Integre uma vez com a API da DOT e aceite todos os métodos locais que suportamos.',
      },
      {
        icon: 'card',
        title: 'Métodos de pagamento locais',
        body: 'Multicaixa Express e Referência Bancária, as opções em que os angolanos já confiam.',
      },
      {
        icon: 'globe',
        title: 'Liquidações globais',
        body: 'Receba os seus fundos em EUR, USD, BRL ou noutra moeda suportada.',
      },
      {
        icon: 'chart',
        title: 'Acompanhamento em tempo real',
        body: 'Acompanhe pagamentos, saldos e liquidações no painel da DOT.',
      },
    ],
  },

  benefits: {
    heading: 'Feito para empresas globais\nque querem crescer em Angola',
    body: 'Seja uma loja de e-commerce, uma plataforma SaaS, uma empresa de educação ou um serviço digital, a DOT dá-lhe a infraestrutura local — métodos, licenciamento, reconciliação e liquidação — sem abrir empresa em Angola.',
    items: [
      'Chegue a milhões de clientes em Angola',
      'Aumente as suas taxas de conversão',
      'Receba na sua moeda, não em Kwanzas',
      'Uma equipa local por trás de cada transação',
    ],
    cta: { label: 'Obter acesso à API', href: '#contact' },
  },

  dashboard: {
    range: 'Últimos 30 dias',
    title: 'Visão geral',
    nav: [
      { label: 'Visão geral', icon: 'overview' },
      { label: 'Pagamentos', icon: 'card' },
      { label: 'Saldos', icon: 'balance' },
      { label: 'Liquidações', icon: 'settlements' },
      { label: 'Desenvolvedores', icon: 'code' },
      { label: 'Definições', icon: 'settings' },
    ],
    stats: [
      {
        label: 'Volume total',
        value: '€ 48.291,20',
        delta: '12,9%',
        trend: [
          0.18, 0.2, 0.24, 0.22, 0.3, 0.34, 0.31, 0.42, 0.4, 0.52, 0.58, 0.54, 0.68, 0.72, 0.86,
        ],
      },
      {
        label: 'Receita de Angola',
        value: 'Kz 52.480.920',
        delta: '18,4%',
        trend: [
          0.12, 0.16, 0.14, 0.24, 0.28, 0.26, 0.36, 0.34, 0.46, 0.5, 0.62, 0.6, 0.74, 0.8, 0.92,
        ],
      },
    ],
    settlement: { label: 'Próxima liquidação', value: '€ 8.420,00', date: '18 set 2024' },
    payments: {
      title: 'Pagamentos',
      viewAll: 'Ver tudo',
      columns: ['Data', 'Método', 'Valor', 'Estado'],
      rows: [
        { date: '12 set 2024', method: 'Multicaixa Express', amount: 'Kz 25.000', status: 'Pago' },
        { date: '12 set 2024', method: 'Referência Bancária', amount: 'Kz 48.500', status: 'Pago' },
        { date: '11 set 2024', method: 'Multicaixa Express', amount: 'Kz 12.000', status: 'Pago' },
        { date: '10 set 2024', method: 'Referência Bancária', amount: 'Kz 76.000', status: 'Pago' },
      ],
    },
  },

  bridge: {
    heading: 'Uma ponte\nentre Angola\ne o mundo.',
    body: 'Ligamos pagamentos locais\na oportunidades globais.\nMais negócio para si.\nUma Angola mais conectada.',
    stats: [
      { value: 'nº 1', label: 'Plataforma de pagamentos digitais em Angola' },
      { value: '30M+', label: 'Pessoas em Angola ao seu alcance' },
      { value: '2', label: 'Métodos de pagamento locais (Multicaixa Express e Referência)' },
      { value: 'Global', label: 'Liquidações na moeda que escolher' },
    ],
  },

  industries: {
    heading: 'A confiança de empresas globais',
    body: 'De produtos digitais à educação, ajudamos empresas de todo o mundo a crescer em Angola.',
    items: [
      { label: 'E-commerce', icon: 'cart' },
      { label: 'Educação', icon: 'education' },
      { label: 'Streaming', icon: 'streaming' },
      { label: 'SaaS', icon: 'saas' },
      { label: 'Gaming', icon: 'gaming' },
      { label: 'Serviços digitais', icon: 'digital' },
    ],
  },

  contact: {
    heading: 'Vamos crescer\njuntos',
    body: 'Fale-nos do seu negócio e a nossa equipa entrará em contacto para configurar o seu acesso à API e acompanhar o arranque em Angola.',
    fields: {
      company: 'Nome da empresa',
      name: 'O seu nome',
      email: 'Email profissional',
      businessType: 'Tipo de negócio',
      message: 'Fale-nos das suas necessidades',
    },
    businessTypes: [
      'E-commerce',
      'Educação',
      'Streaming',
      'SaaS',
      'Gaming',
      'Serviços digitais',
      'Outro',
    ],
    submit: 'Enviar mensagem',
    sending: 'A enviar…',
    success: {
      title: 'Mensagem enviada',
      body: 'Obrigado pelo contacto. A nossa equipa responderá no prazo de um dia útil.',
    },
    errors: {
      required: 'O campo {field} é obrigatório.',
      tooLong: 'Não exceda os {max} caracteres.',
      invalidEmail: 'Introduza um endereço de email válido.',
      invalidOption: 'Escolha uma das opções da lista.',
      generic: 'Algo não correu bem. Tente novamente.',
      network: 'Não foi possível contactar o servidor. Verifique a sua ligação e tente novamente.',
    },
  },

  footer: {
    links: [
      { label: 'Produto', href: '#product' },
      { label: 'Documentação', href: '/documentation' },
      { label: 'Contacto', href: '#contact' },
    ],
    legal: 'Todos os direitos reservados.',
    note: 'Pagamentos sem fronteiras.',
  },

  notFound: {
    eyebrow: '404',
    heading: 'Esta página seguiu o caminho errado.',
    body: 'O link pode estar desatualizado. Volte à página inicial para ver como a DOT liga os pagamentos locais em Angola às liquidações globais.',
    cta: 'Voltar ao início',
  },

  docs: {
    eyebrow: 'Desenvolvedores',
    heading: { first: 'Integre uma vez.', second: 'Receba globalmente.' },
    body: 'A documentação completa é partilhada com a sua equipa durante o arranque, juntamente com as credenciais de teste. Aqui fica o que ela cobre — fale connosco e enviamos as suas chaves.',
    primaryCta: 'Pedir acesso à API',
    secondaryCta: 'Voltar ao início',
    snippetCaption:
      'Exemplo ilustrativo. Os endpoints e parâmetros são confirmados no seu pacote de arranque.',
    sections: [
      {
        id: 'getting-started',
        title: 'Primeiros passos',
        body: 'Crie uma conta de teste, gere as suas chaves de API e faça um pagamento de ponta a ponta antes de entrar em produção. O ambiente de teste espelha a produção, incluindo os fluxos de Multicaixa Express e Referência Bancária.',
        points: [
          'Chaves de teste e de produção, separadas por ambiente',
          'Uma só integração para todos os métodos locais suportados',
          'Exemplos de SDK para Node, Python e PHP',
        ],
      },
      {
        id: 'api-reference',
        title: 'Referência da API',
        body: 'Uma API REST sobre HTTPS, com recursos previsíveis e escritas idempotentes. Crie um pagamento, acompanhe a liquidação e reconcilie com os seus saldos.',
        points: [
          'Pagamentos — criar, consultar e listar pagamentos locais',
          'Saldos — fundos retidos por moeda',
          'Liquidações — transferências em EUR, USD, BRL e mais',
        ],
      },
      {
        id: 'webhooks',
        title: 'Webhooks',
        body: 'Subscreva eventos de pagamento e liquidação para que os seus sistemas reajam no momento em que o dinheiro se move. Cada entrega é assinada, repetida com backoff e reenviável a partir do painel.',
        points: [
          'Payloads assinados que verifica numa linha de código',
          'Repetições automáticas com backoff exponencial',
          'Reenvie qualquer evento no separador Desenvolvedores',
        ],
      },
    ],
    closing: {
      heading: 'Pronto para começar a testar?',
      body: 'Fale-nos do seu negócio e configuramos o seu ambiente de teste, partilhamos a documentação completa e acompanhamos a sua equipa na integração.',
      cta: 'Obter acesso à API',
    },
    emailLead: 'Dúvidas entretanto? Escreva para',
  },
};
