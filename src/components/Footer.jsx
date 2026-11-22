import { NAV_LINKS } from '../data/content'
import { NAP_TEXT, SERVICE_PAGES } from '../data/seo'
import { AppLink } from '../utils/router'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <AppLink className="foot-brand" href="/">
          <img
            src="/logo-snipe.png"
            alt="Emblema Eliandro Rodrigues — Massoterapeuta em Porto Seguro"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <span>
            <strong>ELIANDRO RODRIGUES</strong>
            <small>Massoterapeuta · Porto Seguro, BA</small>
          </span>
        </AppLink>

        <nav className="foot-nav" aria-label="Links do rodapé">
          {NAV_LINKS.map((link) => (
            <AppLink key={link.href} href={link.href}>
              {link.label}
            </AppLink>
          ))}
        </nav>
      </div>

      <div className="wrap foot-seo-links">
        <nav className="foot-services-nav" aria-label="Serviços de massagem em Porto Seguro">
          {SERVICE_PAGES.map((service) => (
            <AppLink key={service.slug} href={service.slug}>
              {service.name} em Porto Seguro
            </AppLink>
          ))}
        </nav>

        <address className="foot-nap">
          {NAP_TEXT}
        </address>
      </div>

      <hr />
      <p className="foot-copy">
        © 2025–2026 Eliandro Rodrigues — Massagem em Porto Seguro, BA (Centro,
        Arraial d’Ajuda, Trancoso e Caraíva). Todos os direitos reservados.
      </p>
    </footer>
  )
}
