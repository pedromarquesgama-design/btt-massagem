import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Expand,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Snowflake,
  Volume2,
  VolumeX,
  Wind,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { STUDIO_MEDIA, WHATS_URL } from '../data/content'
import { EASE_LUXURY } from '../utils/motion'
import { EditorialReveal } from './MotionPrimitives'
import { WhatsOutline } from './SocialIcons'

const STUDIO_PILLARS = [
  {
    icon: Snowflake,
    title: 'Ambiente Climatizado',
    text: 'Conforto térmico constante para relaxar do início ao fim no calor de Porto Seguro.',
  },
  {
    icon: Sparkles,
    title: 'Iluminação Sensorial',
    text: 'Luz quente suave e projeção relaxante pensadas para desacelerar a mente.',
  },
  {
    icon: Wind,
    title: 'Maca Ergonômica',
    text: 'Enxoval macio, apoio facial confortável e preparação impecável a cada horário.',
  },
  {
    icon: ShieldCheck,
    title: 'Arsenal Higienizado',
    text: 'Ventosas, pedras quentes, bambus e instrumentos miofasciais prontos para cada protocolo.',
  },
]

export function StudioSection() {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [activePhoto, setActivePhoto] = useState(null)

  useEffect(() => {
    if (!activePhoto) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActivePhoto(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activePhoto])

  function handleToggleMute() {
    const el = videoRef.current
    if (!el) return
    const nextMuted = !isMuted
    el.muted = nextMuted
    setIsMuted(nextMuted)
  }

  function handleTogglePlay() {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play().catch(() => {})
      setIsPaused(false)
    } else {
      el.pause()
      setIsPaused(true)
    }
  }

  return (
    <section
      className="section studio-section"
      id="espaco"
      aria-labelledby="studio-heading"
    >
      <div className="wrap">
        <div className="studio-header">
          <EditorialReveal>
            <p className="editorial-kicker">
              Novo Espaço Climatizado · Porto Seguro, BA
            </p>
            <h2 id="studio-heading" className="section-heading">
              Conheça o nosso <em>estúdio climatizado</em>
            </h2>
            <p className="section-lead studio-lead">
              Um espaço privativo, climatizado e preparado nos detalhes —
              iluminação acolhedora, maca ergonômica e instrumentos higienizados
              para transformar sua sessão de massagem em Porto Seguro em um
              verdadeiro refúgio.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.1} className="studio-header-actions">
            <a
              className="btn btn-gold"
              href={`${WHATS_URL}?text=${encodeURIComponent(
                'Olá, Eliandro! Vi as fotos do novo espaço climatizado em Porto Seguro e gostaria de agendar uma sessão.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsOutline size={18} />
              <span>Agendar no espaço climatizado</span>
            </a>
            <a className="btn btn-outline" href="#contact">
              Ver localização
            </a>
          </EditorialReveal>
        </div>

        <div className="studio-showcase">
          <EditorialReveal className="studio-reel-col">
            <figure className="studio-reel-card">
              <video
                ref={videoRef}
                className="studio-reel-video"
                src={STUDIO_MEDIA.videoSrc}
                poster={STUDIO_MEDIA.videoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Tour em vídeo pelo novo estúdio climatizado de massoterapia em Porto Seguro"
              />
              <div className="studio-reel-scrim" aria-hidden="true" />

              <div className="studio-reel-top">
                <span className="studio-badge">Tour pelo estúdio</span>
                <div className="studio-reel-controls">
                  <button
                    type="button"
                    className="studio-ctrl-btn"
                    onClick={handleTogglePlay}
                    aria-label={isPaused ? 'Reproduzir vídeo do espaço' : 'Pausar vídeo do espaço'}
                  >
                    {isPaused ? <Play size={15} /> : <Pause size={15} />}
                  </button>
                  <button
                    type="button"
                    className="studio-ctrl-btn"
                    onClick={handleToggleMute}
                    aria-label={isMuted ? 'Ativar som do vídeo' : 'Silenciar vídeo'}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                </div>
              </div>

              <figcaption className="studio-reel-caption">
                <strong>Relaxe · Respire · Equilíbrio · Saúde</strong>
                <span>Sala privativa e climatizada em Porto Seguro, BA</span>
              </figcaption>
            </figure>
          </EditorialReveal>

          <div className="studio-gallery-col">
            <div className="studio-photos-grid">
              {STUDIO_MEDIA.photos.map((photo, index) => (
                <EditorialReveal
                  key={photo.id}
                  delay={0.08 * (index + 1)}
                  className="studio-photo-item"
                >
                  <button
                    type="button"
                    className="studio-photo-card"
                    onClick={() => setActivePhoto(photo)}
                    aria-label={`Ampliar foto: ${photo.title}`}
                  >
                    <div className="studio-photo-media">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                      <span className="studio-zoom-hint" aria-hidden="true">
                        <Expand size={14} />
                      </span>
                    </div>
                    <div className="studio-photo-meta">
                      <span className="studio-photo-kicker">{photo.kicker}</span>
                      <strong className="studio-photo-title">{photo.title}</strong>
                      <p className="studio-photo-desc">{photo.caption}</p>
                    </div>
                  </button>
                </EditorialReveal>
              ))}
            </div>

            <div className="studio-pillars-grid">
              {STUDIO_PILLARS.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="studio-pillar-card">
                    <span className="studio-pillar-icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className="studio-pillar-title">{item.title}</h3>
                      <p className="studio-pillar-text">{item.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activePhoto && (
              <motion.div
                className="modal-backdrop studio-lightbox-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setActivePhoto(null)
                }}
              >
                <motion.figure
                  role="dialog"
                  aria-modal="true"
                  aria-label={activePhoto.title}
                  className="studio-lightbox"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.25, ease: EASE_LUXURY }}
                >
                  <button
                    type="button"
                    className="modal-close-btn"
                    aria-label="Fechar foto ampliada"
                    onClick={() => setActivePhoto(null)}
                  >
                    <X size={20} />
                  </button>
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    referrerPolicy="no-referrer"
                  />
                  <figcaption className="studio-lightbox-caption">
                    <span>{activePhoto.kicker}</span>
                    <strong>{activePhoto.title}</strong>
                    <p>{activePhoto.caption}</p>
                  </figcaption>
                </motion.figure>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  )
}
