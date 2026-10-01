import { useState } from 'react'
import type { ReactNode } from 'react'
import { site, type RoutePath } from '../config/site'
import { ReferralLink } from './ReferralLink'

const navItems: Array<{ href: RoutePath; label: string }> = [
  { href: '/como-funciona', label: 'Como funciona' },
  { href: '/sobre', label: 'Sobre o guia' },
  { href: '/faq', label: 'Perguntas frequentes' },
  { href: '/indicacao', label: 'Indicação' },
]

type Props = {
  children: ReactNode
  pathname: RoutePath
  onOpenConsent: () => void
}

export function SiteShell({ children, pathname, onOpenConsent }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <div className="independent-notice">
        <span className="notice-dot" aria-hidden="true" />
        Guia independente: não é o site oficial da Claru. Alguns links de cadastro são de indicação.
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="TreinandoIA — página inicial">
            <svg className="brand-mark" viewBox="0 0 40 40" width="39" height="39" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 3.5 36.5 13v14L20 36.5 3.5 27V13L20 3.5Z" />
              <path d="M12 23.5 18.1 17l4.5 4.1L29 13.5" />
              <circle cx="12" cy="23.5" r="2" />
              <circle cx="18.1" cy="17" r="2" />
              <circle cx="22.6" cy="21.1" r="2" />
              <circle cx="29" cy="13.5" r="2" />
            </svg>
            <span><strong>TreinandoIA</strong><small>GUIA INDEPENDENTE</small></span>
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-lines" aria-hidden="true"><i /><i /></span>
            <span>{menuOpen ? 'Fechar' : 'Menu'}</span>
          </button>

          <nav
            id="primary-navigation"
            className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
            aria-label="Navegação principal"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`${item.href}/`}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <ReferralLink className="button button-small button-primary">Criar perfil</ReferralLink>
          </nav>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-about">
            <a className="brand brand-footer" href="/">
              <svg className="brand-mark" viewBox="0 0 40 40" width="39" height="39" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 3.5 36.5 13v14L20 36.5 3.5 27V13L20 3.5Z" />
                <path d="M12 23.5 18.1 17l4.5 4.1L29 13.5" />
                <circle cx="12" cy="23.5" r="2" />
                <circle cx="18.1" cy="17" r="2" />
                <circle cx="22.6" cy="21.1" r="2" />
                <circle cx="29" cy="13.5" r="2" />
              </svg>
              <span><strong>{site.siteName}</strong><small>INFORMAÇÃO, COM CONTEXTO</small></span>
            </a>
            <p>
              Conteúdo independente para entender como a Claru apresenta projetos de coleta de dados
              para IA. Disponibilidade e condições devem ser confirmadas na plataforma.
            </p>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <a href="/como-funciona/">Como funciona</a>
            <a href="/faq/">Perguntas frequentes</a>
            <a href="/sobre/">Sobre este guia</a>
            <a href="/indicacao/">Aviso de indicação</a>
          </div>
          <div className="footer-column">
            <h2>Informações</h2>
            <a href="/privacidade/">Privacidade</a>
            <a href="/termos/">Termos de uso</a>
            <a href="/contato/">Contato</a>
            {site.contactEmail ? (
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            ) : (
              <span className="footer-pending">E-mail a configurar antes do lançamento</span>
            )}
            {site.gtmId || site.ga4Id || site.googleAdsId ? (
              <button type="button" className="footer-preferences" onClick={onOpenConsent}>
                Preferências de cookies
              </button>
            ) : null}
          </div>
        </div>
        <div className="container footer-bottom">
          <p>Responsável pelo site: {site.operatorName || 'nome a configurar antes do lançamento'}</p>
          <p>
            Este é um site informativo independente. Claru é uma marca de seus respectivos titulares.
            Alguns links de cadastro podem ser links de indicação.
          </p>
          <p>Fontes oficiais consultadas em 30/09/2026. Condições podem mudar.</p>
          <span>© {new Date().getFullYear()} {site.siteName}</span>
        </div>
      </footer>
    </>
  )
}
