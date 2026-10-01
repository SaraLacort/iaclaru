import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const outputDir = path.join(projectRoot, 'dist')
const routes = ['/', '/como-funciona', '/sobre', '/faq', '/indicacao', '/privacidade', '/termos', '/contato']

function publicUrl(origin, pathname) {
  return pathname === '/' ? `${origin}/` : `${origin}${pathname}/`
}

const server = await createServer({
  configFile: path.join(projectRoot, 'vite.config.ts'),
  root: projectRoot,
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { site, getSiteOrigin } = await server.ssrLoadModule('/src/config/site.ts')
  const origin = getSiteOrigin()
  const sitemapEntries = origin
    ? routes.map((route) => `  <url><loc>${publicUrl(origin, route)}</loc></url>`).join('\n')
    : ''
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries ? `\n${sitemapEntries}\n` : ''}</urlset>\n`
  const sitemapLine = origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''
  const robots = `User-agent: Googlebot\nAllow: /\n\nUser-agent: AdsBot-Google\nAllow: /\n\nUser-agent: *\nAllow: /\n\n${sitemapLine}`

  await mkdir(outputDir, { recursive: true })
  await writeFile(path.join(outputDir, 'sitemap.xml'), sitemap, 'utf8')
  await writeFile(path.join(outputDir, 'robots.txt'), robots, 'utf8')

  // Route HTML is generated for Vite and Cloudflare Pages, then removed from source.
  for (const route of routes) {
    const file = route === '/' ? 'index.html' : path.join(route.slice(1), 'index.html')
    if (route !== '/') {
      await copyFile(
        path.join(outputDir, route.slice(1), 'index.html'),
        path.join(outputDir, `${route.slice(1)}.html`),
      )
    }
    await rm(path.join(projectRoot, file), { force: true })
    if (route !== '/') await rm(path.join(projectRoot, route.slice(1)), { recursive: true, force: true })
  }

  console.log(`SEO files generated for ${origin || 'an unconfigured domain'}.`)
  if (!origin) console.log('Canonical URLs, absolute social URLs and sitemap entries are omitted until siteUrl is configured.')
} finally {
  await server.close()
}
