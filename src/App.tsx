import { useEffect, useState } from 'react'
import { normalizePath, type RoutePath } from './config/site'
import { ConsentBanner } from './components/ConsentBanner'
import { SiteShell } from './components/SiteShell'
import { PageContent } from './pages'
import {
  applyConsent,
  hasTrackingIds,
  loadSavedConsent,
  observeTrackedSections,
  trackEvent,
  type ConsentChoice,
} from './tracking'

type Props = { pathname: string }

export function App({ pathname }: Props) {
  const route = normalizePath(pathname)
  const [consent, setConsent] = useState<ConsentChoice | null>(null)
  const [consentOpen, setConsentOpen] = useState(false)

  useEffect(() => {
    const saved = loadSavedConsent()
    setConsent(saved)
    if (saved === 'accepted') {
      trackEvent('page_view', { page_path: route })
      return observeTrackedSections()
    }
    return undefined
  }, [route])

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.querySelectorAll<HTMLAnchorElement>('[data-referral-link]').forEach((link) => {
      const url = new URL(link.href)
      const current = new URLSearchParams(window.location.search)
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
        const value = current.get(key)
        if (value && !url.searchParams.has(key)) url.searchParams.set(key, value)
      }
      link.href = url.toString()
    })
  }, [route])

  function acceptTracking() {
    applyConsent('accepted')
    setConsent('accepted')
    setConsentOpen(false)
    trackEvent('page_view', { page_path: route })
    window.setTimeout(() => observeTrackedSections(), 0)
  }

  function rejectTracking() {
    applyConsent('rejected')
    setConsent('rejected')
    setConsentOpen(false)
  }

  const showConsentBanner = hasTrackingIds && (consentOpen || consent === null)

  return (
    <SiteShell pathname={route} onOpenConsent={() => setConsentOpen(true)}>
      <PageContent pathname={route} />
      <ConsentBanner open={showConsentBanner} onAccept={acceptTracking} onReject={rejectTracking} />
    </SiteShell>
  )
}
