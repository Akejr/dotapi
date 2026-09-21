import type { SiteContent } from '@/content/types';

/**
 * Portuguese copy, in the European/Angolan register ("contacto", "equipa",
 * "definições", "para si"). Figures use Portuguese number formatting
 * (48.291,20 rather than 48,291.20) and abbreviated month names.
 *
 * Same house style as the English: short sentences, active voice, benefit first,
 * no em dashes.
 */
export const pt: SiteContent = {
  meta: {
    htmlLang: 'pt-AO',
    ogLocale: 'pt_AO',
    languageName: 'Português',
    tagline: 'Venda em Angola. Receba globalmente.',
    description:
      'A DOT é a maior plataforma de pagamentos digitais de Angola. Uma só API para aceitar Multicaixa Express e Referência Bancária e receber na moeda que escolher.',
    keywords: [
      'API de pagamentos Angola',
      'gateway de pagamentos Angola',
      'API Multicaixa Express',
      'integração Multicaixa Express',
      'Referência Bancária Angola',
      'aceitar pagamentos em Angola',
      'vender em Angola',
      'pagamentos transfronteiriços Angola',
      'receber em EUR de Angola',
      'métodos de pagamento Angola',
    ],
  },

  seo: {
    home: {
      title: 'API de Pagamentos Angola para Multicaixa Express | DOT',
      description:
        'Aceite Multicaixa Express e Referência Bancária de clientes angolanos com uma só API. Receba em EUR, USD ou BRL. Sem empresa em Angola.',
    },
    documentation: {
      title: 'Documentação da API de Pagamentos Angola | DOT',
      description:
        'Como integrar a API de pagamentos da DOT: chaves de teste, criação de pagamentos, webhooks e liquidações para o mercado angolano.',
    },
    serviceName: 'API de Pagamentos DOT para Angola',
    serviceDescription:
      'Processamento de pagamentos para empresas fora de Angola. Aceite Multicaixa Express e Referência Bancária através de uma só integração e receba na moeda que escolher.',
    methodNames: ['Multicaixa Express', 'Referência Bancária'],
  },

  a11y: {
    skipToContent: 'Ir para o conteúdo',
    home: 'Página inicial da DOT',
    mainNav: 'Principal',
    footerNav: 'Rodapé',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    languageSwitcher: 'Idioma',
    dashboardAlt:
      'O painel da DOT com volume total, receita de Angola, data da próxima liquidação e pagamentos recentes por Multicaixa Express e Referência Bancária.',
  },

  /* Sections of this page only, in the order they appear. */
  nav: [
    { label: 'Como funciona', href: '#product' },
    { label: 'Benefícios', href: '#benefits' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contact' },
  ],

  hero: {
    headline: { first: 'Venda em Angola.', second: 'Receba globalmente.' },
    body: 'A DOT é a maior plataforma de pagamentos digitais de Angola. Integre uma vez com a nossa API e aceite Multicaixa Express e Referência Bancária. Recebe na moeda que escolher.',
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
    body: 'Venda para Angola sem se instalar em Angola. E-commerce, SaaS, educação ou serviços digitais: a DOT dá-lhe os métodos locais, o licenciamento, a reconciliação e a liquidação. A sua equipa continua focada no produto.',
    items: [
      'Chegue a milhões de clientes em Angola',
      'Converta mais com os métodos em que confiam',
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

  faq: {
    heading: 'Perguntas sobre aceitar pagamentos em Angola',
    body: 'O que as equipas fora de Angola costumam perguntar antes de integrar.',
    items: [
      {
        question: 'Como pode uma empresa fora de Angola aceitar pagamentos de clientes angolanos?',
        answer:
          'Através da API da DOT. Integra uma vez. Os seus clientes pagam com Multicaixa Express ou Referência Bancária, os métodos que já usam. A DOT liquida os fundos na moeda que escolher. Não precisa de registar empresa em Angola.',
      },
      {
        question: 'O que é o Multicaixa Express?',
        answer:
          'O Multicaixa Express é a aplicação de pagamentos móveis usada em todo o país, construída sobre a rede Multicaixa de Angola. O cliente aprova o pagamento no telemóvel. É um dos dois métodos locais disponíveis na API da DOT.',
      },
      {
        question: 'O que é um pagamento por Referência Bancária?',
        answer:
          'O cliente recebe um número de referência e paga-o através do seu banco, num ATM, ao balcão ou na aplicação bancária. É muito usado em Angola por clientes que preferem pagar a partir de uma conta bancária em vez de cartão.',
      },
      {
        question: 'Preciso de uma empresa registada em Angola para usar a DOT?',
        answer:
          'Não. A DOT detém o licenciamento local e opera a infraestrutura local. Vende para Angola como empresa estrangeira, integra com a API da DOT e recebe a liquidação no exterior.',
      },
      {
        question: 'Em que moedas posso receber?',
        answer:
          'EUR, USD e BRL são suportadas, e outras moedas mediante pedido. Os seus clientes pagam em Kwanzas. Você recebe na moeda que escolheu, pelo que não fica com saldo em Kwanzas nas suas contas.',
      },
      {
        question: 'Posso testar a integração antes de entrar em produção?',
        answer:
          'Sim. O ambiente de teste espelha a produção, incluindo os fluxos de Multicaixa Express e Referência Bancária. Os seus programadores fazem um pagamento de ponta a ponta antes de existir dinheiro real.',
      },
      {
        question: 'Como obtenho acesso à API?',
        answer:
          'Peça acesso nesta página. A equipa configura as suas credenciais de teste, partilha a documentação completa e acompanha os seus programadores na integração antes do arranque.',
      },
      {
        question: 'Que tipos de negócio usam a DOT?',
        answer:
          'E-commerce, educação, streaming, SaaS, gaming e serviços digitais. Qualquer empresa que venda a clientes angolanos e queira métodos de pagamento locais sem operação local.',
      },
    ],
  },

  contact: {
    heading: 'Vamos crescer\njuntos',
    body: 'Fale-nos do seu negócio. A nossa equipa entrará em contacto para configurar o seu acesso à API e acompanhar o arranque em Angola.',
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
      { label: 'FAQ', href: '#faq' },
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
    body: 'A documentação completa é partilhada com a sua equipa durante o arranque, juntamente com as credenciais de teste. Aqui fica o que ela cobre. Fale connosco e enviamos as suas chaves.',
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
          'Pagamentos: criar, consultar e listar pagamentos locais',
          'Saldos: fundos retidos por moeda',
          'Liquidações: transferências em EUR, USD, BRL e mais',
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
