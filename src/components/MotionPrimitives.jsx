import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react'

import { EASE_LUXURY } from '../utils/motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  })
  const prefersReduced = useReducedMotion()

  if (prefersReduced) return null

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}

export function EditorialReveal({
  children,
  delay = 0,
  y = 26,
  className = '',
}) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.85, delay, ease: EASE_LUXURY }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxMedia({
  src,
  alt,
  className = '',
  imgClassName = '',
  offset = 10,
  scaleFrom = 1.12,
  scaleTo = 1.0,
  fallbackTitle = '',
}) {
  const containerRef = useRef(null)
  const [imgFailed, setImgFailed] = useState(false)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`-${offset}%`, `${offset}%`])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleFrom, (scaleFrom + scaleTo) / 2, scaleTo])

  return (
    <div ref={containerRef} className={`parallax-frame ${className}`}>
      {imgFailed ? (
        <div className="media-fallback" role="img" aria-label={alt}>
          <span className="media-fallback-title">{fallbackTitle || alt}</span>
        </div>
      ) : (
        <motion.img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgFailed(true)}
          className={`parallax-img ${imgClassName}`}
          style={prefersReduced ? undefined : { y, scale }}
        />
      )}
    </div>
  )
}

export function ParallaxOffset({
  children,
  range = 36,
  className = '',
}) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  })
  const y = useTransform(smoothProgress, [0, 1], [range, -range])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReduced ? undefined : { y }}
    >
      {children}
    </motion.div>
  )
}

function ScrubbedWord({ word, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.22, 1])
  const y = useTransform(progress, range, [10, 0])

  return (
    <motion.span
      className={`scrub-word ${accent ? 'scrub-word-accent' : ''}`}
      style={{ opacity, y }}
    >
      {word}{' '}
    </motion.span>
  )
}

export function ScrubbedManifesto({ words, kicker }) {
  const containerRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.86', 'end 0.48'],
  })

  return (
    <section
      ref={containerRef}
      className="section manifesto-section"
      aria-label="Filosofia de atendimento"
    >
      <div className="wrap manifesto-wrap">
        <p className="editorial-kicker">{kicker}</p>
        <p className="manifesto-text">
          {prefersReduced
            ? words.map((item, idx) => (
                <span
                  key={idx}
                  className={item.accent ? 'scrub-word-accent' : ''}
                >
                  {item.text}{' '}
                </span>
              ))
            : words.map((item, idx) => {
                const start = idx / words.length
                const end = Math.min(1, start + 1 / words.length + 0.08)
                return (
                  <ScrubbedWord
                    key={idx}
                    word={item.text}
                    accent={item.accent}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                )
              })}
        </p>
        <div className="gold-hairline-rule" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
      </div>
    </section>
  )
}

export function ScrollVelocityRibbon({ items }) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const xPrimary = useTransform(scrollYProgress, [0, 1], ['2%', '-18%'])
  const xSecondary = useTransform(scrollYProgress, [0, 1], ['-16%', '4%'])

  const repeated = [...items, ...items, ...items]

  return (
    <div ref={ref} className="ribbon-band" aria-hidden="true">
      <motion.div
        className="ribbon-track"
        style={prefersReduced ? undefined : { x: xPrimary }}
      >
        {repeated.map((label, i) => (
          <span className="ribbon-item" key={`top-${i}`}>
            {label}
            <i className="ribbon-diamond" />
          </span>
        ))}
      </motion.div>
      <motion.div
        className="ribbon-track ribbon-track-subtle"
        style={prefersReduced ? undefined : { x: xSecondary }}
      >
        {repeated.map((label, i) => (
          <span className="ribbon-item" key={`bot-${i}`}>
            {label}
            <i className="ribbon-diamond" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
