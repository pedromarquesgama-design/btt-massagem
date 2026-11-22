import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { NAV_LINKS, WHATS_URL } from '../data/content'
import { ScrollProgressBar } from './MotionPrimitives'
import { EASE_LUXURY } from '../utils/motion'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''))

    const onScroll = () => {
      setScrolled(window.scrollY > 48)
      const triggerY = Math.min(260, window.innerHeight * 0.32)
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= triggerY && rect.bottom > 100) {
          current = `#${id}`
        }
      }
      setActiveSection(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''}`}
      id="header"
    >
      <div className="header-inner">
        <a className="brand-lockup" href="#top" aria-label="Eliandro Rodrigues — Início">
          <img
            className="nav-logo"
            src="/logo-snipe.png"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
          />
          <span className="brand-wordmark">Eliandro Rodrigues</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a
                className={`nav-link ${isActive ? 'is-active' : ''}`}
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="header-actions">
          <a
            className="btn btn-gold btn-header"
            href={WHATS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar
          </a>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <ScrollProgressBar />

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-drawer"
            aria-label="Menu móvel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: EASE_LUXURY }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="btn btn-gold mobile-nav-cta"
              href={WHATS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              Agendar pelo WhatsApp
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
