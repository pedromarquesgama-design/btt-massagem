import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { WELLNESS_PILLARS } from '../data/content'
import { EditorialReveal, ParallaxMedia } from './MotionPrimitives'
import { EASE_LUXURY } from '../utils/motion'

export function WellnessSection() {
  const [activeId, setActiveId] = useState(WELLNESS_PILLARS[0].id)
  const activePillar =
    WELLNESS_PILLARS.find((p) => p.id === activeId) || WELLNESS_PILLARS[0]

  return (
    <section className="section wellness-section" aria-labelledby="wellness-heading">
      <div className="wrap wellness-grid">
        <div className="wellness-media-col">
          <ParallaxMedia
            src="/bem-estar-1.jpg"
            alt="Sessão de massagem relaxante e terapêutica à luz de velas"
            className="wellness-photo-frame"
            offset={12}
            scaleFrom={1.14}
            scaleTo={1.0}
            fallbackTitle="Bem-estar e restauração"
          />
        </div>

        <div className="wellness-content-col">
          <EditorialReveal>
            <p className="editorial-kicker">Método Integrado</p>
            <h2 id="wellness-heading" className="section-heading">
              Devolveremos o seu <em>bem-estar</em>
            </h2>
            <p className="section-lead">
              Dores musculares, estresse e a rotina acelerada afetam diretamente
              a sua qualidade de vida. Através de técnicas especializadas de
              massoterapia — como Shiatsu, Ventosaterapia e Liberação Miofascial
              —, atuamos na causa do seu desconforto para aliviar tensões,
              melhorar a circulação e recuperar a sua vitalidade.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.14}>
            <div className="pillars-selector" role="tablist" aria-label="Pilares terapêuticos">
              {WELLNESS_PILLARS.map((pillar) => {
                const isActive = pillar.id === activePillar.id
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`pillar-row ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveId(pillar.id)}
                  >
                    <span className="pillar-index tabular-nums">{pillar.index}</span>
                    <span className="pillar-meta">
                      <strong className="pillar-title">{pillar.title}</strong>
                      <span className="pillar-sub">{pillar.subtitle}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="pillar-detail-box" role="tabpanel" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activePillar.id}
                  className="pillar-detail-text"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE_LUXURY }}
                >
                  {activePillar.detail}
                </motion.p>
              </AnimatePresence>
            </div>
          </EditorialReveal>
        </div>
      </div>
    </section>
  )
}
