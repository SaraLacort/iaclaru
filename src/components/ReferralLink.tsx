import type { MouseEvent, ReactNode } from 'react'
import { site } from '../config/site'
import { currentUtmParameters, referralHref, trackEvent } from '../tracking'

type Props = {
  children: ReactNode
  className?: string
  ariaLabel?: string
}

export function ReferralLink({ children, className, ariaLabel }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.href = referralHref()
    const utms = currentUtmParameters()
    trackEvent('click_claru_signup', { link_domain: 'app.claru.ai', ...utms })
    trackEvent('outbound_claru', { link_domain: 'app.claru.ai', ...utms })
  }

  return (
    <a
      href={site.claruReferralUrl}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer sponsored"
      data-referral-link
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  )
}
