import { site } from './config/site'

export type ConsentChoice = 'accepted' | 'rejected'

const consentKey = 'ia-em-contexto-consent-v1'
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

export function readConsent(): ConsentChoice | null {
  try {
    const saved = localStorage.getItem(consentKey)
    return saved === 'accepted' || saved === 'rejected' ? saved : null
  } catch {
    return null
  }
}

export function initializeConsentDefaults(): void {
  if (!hasTrackingIds) return
  dataLayer()
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('set', 'ads_data_redaction', true)
}

function updateConsent(choice: ConsentChoice): void {
  gtag('consent', 'update', {
    analytics_storage: choice === 'accepted' ? 'granted' : 'denied',
    ad_storage: choice === 'accepted' ? 'granted' : 'denied',
    ad_user_data: choice === 'accepted' ? 'granted' : 'denied',
    ad_personalization: choice === 'accepted' ? 'granted' : 'denied',
  })
}

function saveConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(consentKey, choice)
  } catch {
    // Consent still applies to the current page when browser storage is unavailable.
  }
}

let tagsLoaded = false

export function applyConsent(choice: ConsentChoice): void {
  if (!hasTrackingIds) return
  initializeConsentDefaults()
  updateConsent(choice)
  saveConsent(choice)
  if (choice === 'accepted') loadGoogleTags()
}

export function loadSavedConsent(): ConsentChoice | null {
  if (!hasTrackingIds) return null
  initializeConsentDefaults()
  const saved = readConsent()
  if (saved) {
    updateConsent(saved)
    if (saved === 'accepted') loadGoogleTags()
  }
  return saved
}

function loadGoogleTags(): void {
  if (tagsLoaded) return
  tagsLoaded = true

  if (site.gtmId) {
    dataLayer().push({ 'gtm.start': Date.now(), event: 'gtm.js' })
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
  for (const id of configuredIds) gtag('config', id, { send_page_view: false })
}

export function trackingAllowed(): boolean {
  return hasTrackingIds && readConsent() === 'accepted'
}

export function trackEvent(name: string, parameters: Record<string, string | number | boolean> = {}): void {
  if (!trackingAllowed()) return
  if (site.gtmId) {
    dataLayer().push({ event: name, ...parameters })
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
    if (value) result[key] = value
  }
  return result
}

export function referralHref(): string {
  if (typeof window === 'undefined') return site.claruReferralUrl
  try {
    const target = new URL(site.claruReferralUrl)
    for (const [key, value] of Object.entries(currentUtmParameters())) {
      if (!target.searchParams.has(key)) target.searchParams.set(key, value)
    }
    return target.toString()
  } catch {
    return site.claruReferralUrl
  }
}

export function observeTrackedSections(): () => void {
  if (typeof IntersectionObserver === 'undefined') return () => undefined
  const elements = document.querySelectorAll<HTMLElement>('[data-track-visible]')
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting || !trackingAllowed()) continue
      const name = (entry.target as HTMLElement).dataset.trackVisible
      if (name && !entry.target.hasAttribute('data-tracked')) {
        entry.target.setAttribute('data-tracked', 'true')
        trackEvent(name)
        observer.unobserve(entry.target)
      }
    }
  }, { threshold: 0.25 })
  elements.forEach((element) => observer.observe(element))
  return () => observer.disconnect()
}
