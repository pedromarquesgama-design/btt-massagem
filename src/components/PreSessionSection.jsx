import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import { GUIA_TIPS } from '../data/content'
import {
  buildWhatsAppUrl,
  calculatePrepProgress,
} from '../utils/booking'
import { EditorialReveal, ScrollVelocityRibbon } from './MotionPrimitives'
import { EASE_LUXURY } from '../utils/motion'
import { WhatsOutline } from './SocialIcons'

const RIBBON_ITEMS = [
  'Shiatsu',
  'Ventosaterapia',
  'Liberação Miofascial',
  'Massagem Desportiva',
  'Massagem Terapêutica',
  'Porto Seguro · BA',
]

export function PreSessionSection({ checkedIds, onToggleStep }) {
  const progress = calculatePrepProgress(checkedIds.length, GUIA_TIPS.length)

  return (
    <>
      <ScrollVelocityRibbon items={RIBBON_ITEMS} />

      <section
        className="section guia-section"
        id="guia"
        aria-labelledby="guia-heading"
      >
        <div className="wrap guia-inner">
          <EditorialReveal>
            <p className="editorial-kicker">Ritual de Preparação</p>
            <h2 id="guia-heading" className="section-heading">
              Guia de <em>Pré-Atendimento</em>
            </h2>
            <p className="section-lead guia-lead">
              Prepare-se para aproveitar ao máximo a sua sessão com Eliandro
              Rodrigues. Toque nos passos abaixo para acompanhar o seu preparo:
            </p>
          </EditorialReveal>

          <div className="guia-progress-row" aria-live="polite">
            <span className="guia-progress-label tabular-nums">
              {progress.count} de {progress.total} preparados
              {progress.isComplete ? ' — Tudo pronto para a sua sessão' : ''}
            </span>
            <div className="guia-progress-track" aria-hidden="true">
              <div
                className="guia-progress-fill"
                style={{ transform: `scaleX(${progress.percent / 100})` }}
              />
            </div>
          </div>

          <div className="guia-grid">
            {GUIA_TIPS.map(({ id, step, icon: Icon, title, text }, idx) => {
              const isChecked = checkedIds.includes(id)
              return (
                <motion.button
                  key={id}
                  type="button"
                  className={`guia-card ${isChecked ? 'is-checked' : ''}`}
                  aria-pressed={isChecked}
                  onClick={() => onToggleStep(id)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.06,
                    ease: EASE_LUXURY,
                  }}
                >
                  <div className="guia-card-top">
                    <span className="guia-step tabular-nums">{step}</span>
                    <span className="guia-check-box" aria-hidden="true">
                      {isChecked ? <Check size={14} strokeWidth={2.4} /> : null}
                    </span>
                  </div>
                  <span className="guia-icon" aria-hidden="true">
                    <Icon size={28} strokeWidth={1.4} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.button>
              )
            })}
          </div>

          <EditorialReveal delay={0.12} className="guia-cta-wrap">
            <a
              className="btn btn-gold"
              href={buildWhatsAppUrl({
                completedPrepCount: progress.count,
                totalPrepCount: progress.total,
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsOutline size={18} />
              <span>Agendar pelo WhatsApp</span>
            </a>
          </EditorialReveal>
        </div>
      </section>
    </>
  )
}
