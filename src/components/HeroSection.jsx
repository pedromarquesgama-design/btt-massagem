import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { WHATS_URL } from '../data/content'
import { EASE_LUXURY } from '../utils/motion'

export function HeroSection() {
  const wrapperRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.16])
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const lockupY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const lockupOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0])
  const scrimOpacity = useTransform(scrollYProgress, [0, 1], [0.44, 0.86])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0])

  return (
    <div ref={wrapperRef} className="hero-stage" id="top">
      <section className="hero-cinema" aria-label="Apresentação">
        <motion.div
          className="hero-videos"
          aria-hidden="true"
          style={prefersReduced ? undefined : { scale: videoScale, y: videoY }}
        >
          <video
            src="/video1.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/bem-estar-1.jpg"
          />
          <video
            src="/video2.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/bem-estar-2.jpg"
          />
        </motion.div>

        <div className="hero-video-seam" aria-hidden="true" />
        <div className="hero-spotlight" aria-hidden="true" />
        <motion.div
          className="hero-scrim"
          aria-hidden="true"
          style={prefersReduced ? undefined : { opacity: scrimOpacity }}
        />

        <motion.div
          className="hero-content"
          style={prefersReduced ? undefined : { y: lockupY, opacity: lockupOpacity }}
        >
          <motion.p
            className="hero-location"
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE_LUXURY }}
          >
            Porto Seguro, Bahia · Terapia Corporal &amp; Bem-Estar
          </motion.p>

          <motion.div
            className="hero-logo-wrap"
            initial={prefersReduced ? false : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.16, ease: EASE_LUXURY }}
          >
            <img
              className="logo-full"
              src="/logo-full.png"
              alt="Eliandro Rodrigues — Massoterapeuta"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            className="hero-divider"
            aria-hidden="true"
            initial={prefersReduced ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.36, ease: EASE_LUXURY }}
          >
            <span />
            <i />
            <span />
          </motion.div>

          <motion.h1
            className="hero-tagline"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.44, ease: EASE_LUXURY }}
          >
            Massagem em Porto Seguro: <em>investigando a dor, devolvendo o seu bem-estar.</em>
          </motion.h1>

          <motion.div
            className="hero-actions"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.56, ease: EASE_LUXURY }}
          >
            <a
              className="btn btn-gold"
              href={WHATS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar sessão
            </a>
            <a className="btn btn-outline" href="#services">
              Explorar serviços
            </a>
            <a className="btn btn-ghost" href="#guia">
              Guia de pré-atendimento
            </a>
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          className="scroll-cue"
          aria-label="Rolar para conhecer Eliandro Rodrigues"
          style={prefersReduced ? undefined : { opacity: cueOpacity }}
        >
          <span>Role para explorar</span>
          <ChevronDown size={16} aria-hidden="true" />
        </motion.a>
      </section>
    </div>
  )
}
