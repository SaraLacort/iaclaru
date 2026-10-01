export const site = {
  // Add the final HTTPS origin only: no path, query, fragment, or route.
  siteName: 'TreinandoIA',
  siteUrl: '',
  operatorName: '',
  contactEmail: '',

  claruOfficialUrl: 'https://claru.ai/pt-br',
  // Keep the referral URL here. CTA components read this value.
  claruReferralUrl: 'https://app.claru.ai/signup?ref=ref_6v5dad7gpwpn',

  // Optional. Leave empty until each ID exists and the site operator has configured consent.
  ga4Id: '',
  gtmId: '',
  googleAdsId: '',

  socialImage: '/images/share-card.png',
} as const

export const pageMetadata = {
  '/': {
    title: 'Claru AI: como funciona e projetos | TreinandoIA',
    description:
      'Entenda como a Claru AI apresenta projetos de coleta de dados para IA, como funciona o perfil de colaborador e o que conferir antes de se cadastrar.',
  },
  '/como-funciona': {
    title: 'Como funciona a Claru AI: perfil e projetos',
    description:
      'Veja as etapas do perfil de colaborador, a análise de compatibilidade, os briefings e os critérios que variam de projeto para projeto na Claru.',
  },
  '/sobre': {
    title: 'Sobre este guia independente da Claru AI',
    description:
      'Conheça o propósito, as fontes e os limites deste guia independente sobre a Claru AI e seus projetos para colaboradores.',
  },
  '/faq': {
    title: 'Dúvidas sobre Claru AI, cadastro e projetos',
    description:
      'Respostas verificadas sobre perfil, projetos, Brasil, requisitos, remuneração, pagamentos e links de indicação da Claru AI.',
  },
  '/indicacao': {
    title: 'Aviso sobre link de indicação da Claru AI',
    description:
      'Entenda como este guia independente usa um link de indicação da Claru AI e o que isso não significa para seleção ou projetos.',
  },
  '/privacidade': {
    title: 'Política de privacidade | TreinandoIA',
    description:
      'Saiba quais dados este site estático processa, como a escolha de consentimento funciona e o que ocorre ao acessar serviços externos.',
  },
  '/termos': {
    title: 'Termos de uso | TreinandoIA',
    description:
      'Leia as condições de uso e os limites deste guia independente sobre a Claru AI.',
  },
  '/contato': {
    title: 'Contato | TreinandoIA',
    description:
      'Entre em contato com a pessoa responsável por este guia independente sobre a Claru AI.',
  },
} as const

export type RoutePath = keyof typeof pageMetadata

export function getSiteOrigin(): string | null {
  const value = site.siteUrl.trim()
  if (!value) return null

  try {
    const url = new URL(value)
    if (
      url.protocol !== 'https:' ||
      url.pathname !== '/' ||
      url.search !== '' ||
      url.hash !== '' ||
      url.username !== '' ||
      url.password !== ''
    ) {
      return null
    }
    return url.origin
  } catch {
    return null
  }
}

export function normalizePath(pathname: string): RoutePath {
  const path = pathname.replace(/\/+$/, '') || '/'
  return path in pageMetadata ? (path as RoutePath) : '/'
}
