import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))
const routeEntries = [
  'index.html',
  'como-funciona/index.html',
  'sobre/index.html',
  'faq/index.html',
  'indicacao/index.html',
  'privacidade/index.html',
  'termos/index.html',
  'contato/index.html',
]

const input = Object.fromEntries(
  routeEntries.map((entry) => [entry.replaceAll('/', '-'), resolve(root, entry)]),
)

export default defineConfig({
  base: '/',
  publicDir: resolve(root, 'public'),
  build: {
    outDir: resolve(root, 'dist'),
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: { input },
  },
})
