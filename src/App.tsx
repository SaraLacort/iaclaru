import { useEffect } from 'react'
import { normalizePath } from './config/site'
import { SiteShell } from './components/SiteShell'
import { PageContent } from './pages'
import {
  observeTrackedSections,
  trackEvent,
} from './tracking'

type Props = { pathname: string }

export function App({ pathname }: Props) {
  const route = normalizePath(pathname)

  useEffect(() => {
    trackEvent('page_view', { page_path: route })
    return observeTrackedSections()
  }, [route])

  useEffect(() => {
    if (typeof window === 'undefined') return

    document
      .querySelectorAll<HTMLAnchorElement>('[data-referral-link]')
      .forEach((link) => {
        try {
          const url = new URL(link.href)
          const current = new URLSearchParams(window.location.search)

          for (const key of [
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'utm_content',
            'utm_term',
          ]) {
            const value = current.get(key)

            if (value && !url.searchParams.has(key)) {
              url.searchParams.set(key, value)
            }
          }

          link.href = url.toString()
        } catch {
          // Mantém o link original se a URL não puder ser processada.
        }
      })
  }, [route])

  return (
    <SiteShell pathname={route}>
      <PageContent pathname={route} />
    </SiteShell>
  )
}