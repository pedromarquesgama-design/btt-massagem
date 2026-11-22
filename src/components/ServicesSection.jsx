import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { SERVICE_CATEGORIES, SERVICES } from '../data/content'
import { buildWhatsAppUrl, filterServices } from '../utils/booking'
import { EASE_LUXURY } from '../utils/motion'
import { AppLink } from '../utils/router'
import { EditorialReveal, ParallaxMedia } from './MotionPrimitives'
import { WhatsOutline } from './SocialIcons'

const PERIODS = ['Manhã', 'Tarde', 'Noite']

export function ServicesSection({ completedPrepCount, totalPrepCount }) {
  const [activeCategory, setActiveCategory] = useState('todas')
  const [selectedService, setSelectedService] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState('')

  const visibleServices = filterServices(SERVICES, activeCategory)

  useEffect(() => {
    if (!selectedService) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedService(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedService])

  function openService(service) {
    setSelectedService(service)
    setSelectedPeriod('')
  }

  return (
    <section
      className="section services-section"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="wrap">
        <div className="services-header">
          <EditorialReveal>
            <p className="editorial-kicker">Menu de Terapias</p>
            <h2 id="services-heading" className="section-heading">
              Serviços &amp; <em>Especialidades</em>
            </h2>
            <p className="section-lead services-lead">
              Cada atendimento é adaptado à sua necessidade corporal — escolha
              uma terapia para explorar os detalhes e reservar diretamente pelo
              WhatsApp.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.1}>
            <div
              className="services-filter-bar"
              role="group"
              aria-label="Filtrar terapias por categoria"
            >
              {SERVICE_CATEGORIES.map((category) => {
                const isActive = activeCategory === category.id
                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`filter-tab ${isActive ? 'is-active' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                  </button>
                )
              })}
            </div>
          </EditorialReveal>
        </div>

        <motion.div
          layout
          className="services-grid"
          data-testid="services-grid"
        >
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service, index) => (
              <motion.article
                key={service.id}
                layout
                className="service-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.35,
                    delay: index * 0.04,
                    ease: EASE_LUXURY,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                  transition: { duration: 0.15, ease: EASE_LUXURY },
                }}
              >
                <div className="service-media-wrap">
                  <ParallaxMedia
                    src={service.image}
                    alt={service.imageAlt}
                    className="service-photo-frame"
                    offset={8}
                    scaleFrom={1.1}
                    scaleTo={1.0}
                    fallbackTitle={service.name}
                  />
                </div>

                <div className="service-body">
                  <div className="service-meta-line">
                    <span className="tabular-nums">{service.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{service.duration}</span>
                  </div>

                  <h3 className="service-title">
                    <AppLink href={service.slug} className="service-title-link">
                      {service.name}
                    </AppLink>
                  </h3>
                  <p className="service-summary">{service.summary}</p>

                  <div className="service-footer">
                    <span className="service-price tabular-nums">
                      {service.price}
                    </span>
                    <div className="service-footer-actions">
                      <AppLink
                        href={service.slug}
                        className="service-page-link"
                        aria-label={`Saiba mais sobre ${service.name} em Porto Seguro`}
                      >
                        Saiba mais
                      </AppLink>
                      <button
                        type="button"
                        className="service-action-btn"
                        onClick={() => openService(service)}
                        aria-label={`Ver detalhes e agendar ${service.name}`}
                      >
                        <span>Agendar</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedService && (
              <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) setSelectedService(null)
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="service-modal-title"
                  className="service-modal"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: EASE_LUXURY }}
                >
                  <button
                    type="button"
                    className="modal-close-btn"
                    aria-label="Fechar detalhes da terapia"
                    onClick={() => setSelectedService(null)}
                  >
                    <X size={20} />
                  </button>

                  <div className="modal-media">
                    <img
                      src={selectedService.image}
                      alt={selectedService.imageAlt}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="modal-content">
                    <p className="service-meta-line">
                      <span className="tabular-nums">{selectedService.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{selectedService.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{selectedService.duration}</span>
                    </p>

                    <h3 id="service-modal-title" className="modal-title">
                      {selectedService.name}
                    </h3>
                    <p className="modal-price tabular-nums">{selectedService.price}</p>
                    <p className="modal-summary">{selectedService.summary}</p>

                    <div className="modal-benefits">
                      <h4 className="modal-subhead">Principais benefícios</h4>
                      <ul>
                        {selectedService.benefits.map((benefit) => (
                          <li key={benefit}>
                            <Check size={15} aria-hidden="true" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="modal-indication">{selectedService.indication}</p>

                    <div className="modal-period-group">
                      <span className="modal-subhead">
                        Período de preferência (opcional)
                      </span>
                      <div className="period-buttons" role="group" aria-label="Período de preferência">
                        {PERIODS.map((period) => {
                          const active = selectedPeriod === period
                          return (
                            <button
                              key={period}
                              type="button"
                              className={`period-btn ${active ? 'is-active' : ''}`}
                              aria-pressed={active}
                              onClick={() =>
                                setSelectedPeriod(active ? '' : period)
                              }
                            >
                              {period}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <a
                      className="btn btn-gold modal-whatsapp-cta"
                      href={buildWhatsAppUrl({
                        serviceName: selectedService.name,
                        period: selectedPeriod,
                        completedPrepCount,
                        totalPrepCount,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsOutline size={18} />
                      <span>Agendar {selectedService.name} no WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  )
}
