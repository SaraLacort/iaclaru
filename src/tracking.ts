import { site } from './config/site'

const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const hasTrackingIds = Boolean(site.gtmId || site.ga4Id || site.googleAdsId)

function dataLayer(): unknown[] {
  window.dataLayer ??= []
  return window.dataLayer
}

function gtag(...args: unknown[]): void {
  window.gtag ??= (...queued) => {
    dataLayer().push(queued)
  }

  window.gtag(...args)
}

let tagsLoaded = false

export function loadGoogleTags(): void {
  if (!hasTrackingIds || tagsLoaded) return

  tagsLoaded = true

  if (site.gtmId) {
    dataLayer().push({
      'gtm.start': Date.now(),
      event: 'gtm.js',
    })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(site.gtmId)}`
    document.head.append(script)

    return
  }

  const configuredIds = [site.ga4Id, site.googleAdsId].filter(Boolean)
  const firstId = configuredIds[0]

  if (!firstId) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(firstId)}`
  document.head.append(script)

  gtag('js', new Date())

  for (const id of configuredIds) {
    gtag('config', id, {
      send_page_view: false,
    })
  }
}

export function trackingAllowed(): boolean {
  return hasTrackingIds
}

export function trackEvent(
  name: string,
  parameters: Record<string, string | number | boolean> = {},
): void {
  if (!trackingAllowed()) return

  if (site.gtmId) {
    dataLayer().push({
      event: name,
      ...parameters,
    })
    return
  }

  window.gtag?.('event', name, parameters)
}

export function currentUtmParameters(): Record<string, string> {
  const result: Record<string, string> = {}

  if (typeof window === 'undefined') return result

  const current = new URLSearchParams(window.location.search)

  for (const key of utmKeys) {
    const value = current.get(key)

    if (value) {
      result[key] = value
    }
  }

  return result
}

export function referralHref(): string {
  if (typeof window === 'undefined') {
    return site.claruReferralUrl
  }

  try {
    const target = new URL(site.claruReferralUrl)

    for (const [key, value] of Object.entries(currentUtmParameters())) {
      if (!target.searchParams.has(key)) {
        target.searchParams.set(key, value)
      }
    }

    return target.toString()
  } catch {
    return site.claruReferralUrl
  }
}

export function observeTrackedSections(): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    return () => undefined
  }

  const elements = document.querySelectorAll<HTMLElement>('[data-track-visible]')

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !trackingAllowed()) continue

        const name = (entry.target as HTMLElement).dataset.trackVisible

        if (name && !entry.target.hasAttribute('data-tracked')) {
          entry.target.setAttribute('data-tracked', 'true')
          trackEvent(name)
          observer.unobserve(entry.target)
        }
      }
    },
    {
      threshold: 0.25,
    },
  )

  elements.forEach((element) => observer.observe(element))

  return () => observer.disconnect()
}
export function trackGoogleAdsConversion(): void {
  if (!hasTrackingIds) return

  window.gtag?.('event', 'conversion', {
    send_to: 'AW-18228796227/dca_CKLts44dEMO2lfRD',
    event_callback: () => {
      // Conversão enviada ao Google Ads.
    },
  })
}