import { useRef } from 'react'
import { Star } from 'lucide-react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { BOTANICAL_BG, TESTIMONIALS } from '../data/content'
import { EditorialReveal, ParallaxOffset } from './MotionPrimitives'
import { EASE_LUXURY } from '../utils/motion'
import { AppLink } from '../utils/router'

export function TestimonialsSection() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.16, 1.06])

  const colA = TESTIMONIALS.filter((_, i) => i % 3 === 0)
  const colB = TESTIMONIALS.filter((_, i) => i % 3 === 1)
  const colC = TESTIMONIALS.filter((_, i) => i % 3 === 2)

  return (
    <section
      ref={sectionRef}
      className="section testi-section"
      aria-labelledby="testi-heading"
    >
      <div className="testi-bg-wrap" aria-hidden="true">
        <motion.img
          src={BOTANICAL_BG}
          alt=""
          className="testi-bg-img"
          referrerPolicy="no-referrer"
          loading="lazy"
          style={prefersReduced ? undefined : { y: bgY, scale: bgScale }}
        />
        <div className="testi-scrim" />
      </div>

      <div className="wrap testi-wrap">
        <EditorialReveal className="testi-header">
          <p className="editorial-kicker">Avaliações no Google</p>
          <h2 id="testi-heading" className="section-heading">
            Carinho dos <em>clientes</em>
          </h2>
          <p className="testi-summary-line tabular-nums">
            5,0 de 5 estrelas · 21 avaliações reais no Google de quem confia na massagem em Porto Seguro com Eliandro
          </p>
          <p className="testi-page-cta">
            <AppLink href="/avaliacoes-porto-seguro" className="btn btn-outline">
              Ver página de avaliações (5,0 estrelas)
            </AppLink>
          </p>
        </EditorialReveal>

        <div className="testi-columns">
          <div className="testi-col">
            {colA.map((item, idx) => (
              <TestimonialCard key={item.name} item={item} delay={idx * 0.08} />
            ))}
          </div>

          <ParallaxOffset range={28} className="testi-col testi-col-middle">
            {colB.map((item, idx) => (
              <TestimonialCard key={item.name} item={item} delay={idx * 0.08} />
            ))}
          </ParallaxOffset>

          <div className="testi-col">
            {colC.map((item, idx) => (
              <TestimonialCard key={item.name} item={item} delay={idx * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ item, delay }) {
  return (
    <motion.article
      className="testi-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.7, delay, ease: EASE_LUXURY }}
    >
      <div className="testi-stars" aria-label="Avaliação 5 de 5 estrelas">
        {[0, 1, 2, 3, 4].map((starIndex) => (
          <Star
            key={starIndex}
            size={14}
            fill="#c9a86a"
            strokeWidth={0}
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="testi-quote">“{item.quote}”</blockquote>
      <p className="testi-author">
        <strong>{item.name}</strong>
        {item.role && (
          <>
            <span aria-hidden="true"> · </span>
            <span className="testi-role">{item.role}</span>
          </>
        )}
      </p>
    </motion.article>
  )
}
