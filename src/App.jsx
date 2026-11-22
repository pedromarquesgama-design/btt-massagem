import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'
import { GUIA_TIPS } from './data/content'
import { toggleChecklistItem } from './utils/booking'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ScrubbedManifesto } from './components/MotionPrimitives'
import { FounderSection } from './components/FounderSection'
import { WellnessSection } from './components/WellnessSection'
import { ServicesSection } from './components/ServicesSection'
import { PreSessionSection } from './components/PreSessionSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

const MANIFESTO_WORDS = [
  { text: 'Investigando' },
  { text: 'a' },
  { text: 'dor', accent: true },
  { text: 'na' },
  { text: 'origem,' },
  { text: 'devolvendo' },
  { text: 'movimento,', accent: true },
  { text: 'calma' },
  { text: 'e' },
  { text: 'presença' },
  { text: 'ao' },
  { text: 'seu' },
  { text: 'corpo.', accent: true },
]

export default function App() {
  const [checkedPrepIds, setCheckedPrepIds] = useState([])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    let rafId = 0
    function raf(time) {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }
    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  function handleTogglePrepStep(id) {
    setCheckedPrepIds((prev) => toggleChecklistItem(prev, id))
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
        <Header />

        <main>
          <HeroSection />

          <div className="page-curtain">
            <ScrubbedManifesto
              kicker="Filosofia de Cuidado"
              words={MANIFESTO_WORDS}
            />

            <FounderSection />
            <WellnessSection />
            <ServicesSection
              completedPrepCount={checkedPrepIds.length}
              totalPrepCount={GUIA_TIPS.length}
            />
            <PreSessionSection
              checkedIds={checkedPrepIds}
              onToggleStep={handleTogglePrepStep}
            />
            <TestimonialsSection />
            <ContactSection />
          </div>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
