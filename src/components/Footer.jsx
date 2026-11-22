import { NAV_LINKS } from '../data/content'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <a className="foot-brand" href="#top">
          <img
            src="/logo-snipe.png"
            alt="Emblema Eliandro Rodrigues"
            referrerPolicy="no-referrer"
          />
          <span>
            <strong>ELIANDRO RODRIGUES</strong>
            <small>Massoterapeuta · Porto Seguro, BA</small>
          </span>
        </a>

        <nav className="foot-nav" aria-label="Links do rodapé">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <hr />
      <p className="foot-copy">
        © 2025–2026 Eliandro Rodrigues — Todos os direitos reservados.
      </p>
    </footer>
  )
}
