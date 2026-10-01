import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const routes = [
  '/',
  '/como-funciona',
  '/sobre',
  '/faq',
  '/indicacao',
  '/privacidade',
  '/termos',
  '/contato',
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}

function publicUrl(origin, pathname) {
  return pathname === '/' ? `${origin}/` : `${origin}${pathname}/`
}

function structuredData(pathname, title, description, origin, site, faqItems) {
  if (!origin) return ''

  const canonical = publicUrl(origin, pathname)
  const websiteId = `${origin}/#website`
  const graph = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: site.siteName,
      url: `${origin}/`,
      inLanguage: 'pt-BR',
    },
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': websiteId },
    },
  ]

  const breadcrumbs = pathname === '/' ? [{ name: site.siteName, url: `${origin}/` }] : [
    { name: site.siteName, url: `${origin}/` },
    { name: title, url: canonical },
  ]
  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  })

  if (pathname === '/faq') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  return `<script type="application/ld+json">${safeJson({ '@context': 'https://schema.org', '@graph': graph })}</script>`
}

const server = await createServer({
  configFile: path.join(projectRoot, 'vite.config.ts'),
  root: projectRoot,
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const [{ App }, siteModule, faqModule] = await Promise.all([
    server.ssrLoadModule('/src/App.tsx'),
    server.ssrLoadModule('/src/config/site.ts'),
    server.ssrLoadModule('/src/faq.ts'),
  ])
  const { site, pageMetadata, getSiteOrigin } = siteModule
  const { faqItems } = faqModule
  const origin = getSiteOrigin()

  for (const pathname of routes) {
    const meta = pageMetadata[pathname]
    const canonical = origin ? `<link rel="canonical" href="${escapeHtml(publicUrl(origin, pathname))}">` : ''
    const image = origin ? new URL(site.socialImage, `${origin}/`).toString() : ''
    const imageType = site.socialImage.toLowerCase().endsWith('.png') ? 'image/png' : 'image/svg+xml'
    const socialImageTags = image
      ? `<meta property="og:image" content="${escapeHtml(image)}"><meta property="og:image:alt" content="Ilustração original sobre dados do mundo real e inteligência artificial"><meta property="og:image:type" content="${imageType}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:image" content="${escapeHtml(image)}">`
      : ''
    const twitterCard = image ? 'summary_large_image' : 'summary'
    const schema = structuredData(pathname, meta.title, meta.description, origin, site, faqItems)
    const body = renderToStaticMarkup(React.createElement(App, { pathname }))
    const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f6f8f6">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="stylesheet" href="/src/styles.css">
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}">
    ${canonical}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="${escapeHtml(site.siteName)}">
    <meta property="og:title" content="${escapeHtml(meta.title)}">
    <meta property="og:description" content="${escapeHtml(meta.description)}">
    ${origin ? `<meta property="og:url" content="${escapeHtml(publicUrl(origin, pathname))}">` : ''}
    ${socialImageTags}
    <meta name="twitter:card" content="${twitterCard}">
    <meta name="twitter:title" content="${escapeHtml(meta.title)}">
    <meta name="twitter:description" content="${escapeHtml(meta.description)}">
    ${schema}
  </head>
  <body>
    <div id="root">${body}</div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
    const relativeFile = pathname === '/' ? 'index.html' : path.join(pathname.slice(1), 'index.html')
    const destination = path.join(projectRoot, relativeFile)
    await mkdir(path.dirname(destination), { recursive: true })
    await writeFile(destination, html, 'utf8')
  }
} finally {
  await server.close()
}

console.log(`Pre-rendered ${routes.length} public routes.`)
