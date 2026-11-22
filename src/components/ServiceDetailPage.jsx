import { ArrowLeft, ArrowUpRight, Check, MapPin, Star } from 'lucide-react'
import { BUSINESS, SERVICE_PAGES } from '../data/seo'
import { buildWhatsAppUrl } from '../utils/booking'
import { AppLink } from '../utils/router'
import { WhatsOutline } from './SocialIcons'

export function ServiceDetailPage({ service }) {
  const relatedServices = SERVICE_PAGES.filter((item) =>
    service.relatedSlugs.includes(item.slug),
  )

  return (
    <article className="seo-page">
      <div className="wrap seo-page-wrap">
        <nav className="seo-breadcrumb" aria-label="Navegação estrutural">
          <AppLink href="/" className="seo-back-link">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Início</span>
          </AppLink>
          <span aria-hidden="true">/</span>
          <AppLink href="/#services">Serviços</AppLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{service.name}</span>
        </nav>

        <header className="seo-hero-grid">
          <div className="seo-hero-copy">
            <p className="editorial-kicker">
              Massagem em Porto Seguro · {service.duration} · {service.price}
            </p>
            <h1 className="seo-h1">{service.h1}</h1>
            <p className="seo-lead">{service.lead}</p>

            <div className="seo-cta-row">
              <a
                className="btn btn-gold"
                href={buildWhatsAppUrl({
                  serviceName: `${service.name} em Porto Seguro`,
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsOutline size={18} />
                <span>Agendar em Porto Seguro pelo WhatsApp</span>
              </a>
              <AppLink href="/avaliacoes-porto-seguro" className="btn btn-outline">
                <Star size={15} fill="#c9a86a" strokeWidth={0} aria-hidden="true" />
                <span>Ver avaliações 5,0 estrelas</span>
              </AppLink>
            </div>
          </div>

          <div className="seo-hero-media">
            <img
              src={service.image}
              alt={service.imageAlt}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        <section className="seo-body-grid" aria-label={`Sobre ${service.name}`}>
          <div className="seo-prose">
            <h2>Como funciona a {service.name} em Porto Seguro</h2>
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <h2>Para quem é indicada</h2>
            <p>{service.indication}</p>
          </div>

          <aside className="seo-side-card">
            <h3>Principais benefícios</h3>
            <ul className="seo-benefits-list">
              {service.benefits.map((benefit) => (
                <li key={benefit}>
                  <Check size={16} aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="seo-local-box">
              <p className="seo-local-title">
                <MapPin size={15} aria-hidden="true" />
                <span>Estúdio em Porto Seguro, BA</span>
              </p>
              <p className="seo-local-text">{BUSINESS.formattedAddress}</p>
              <p className="seo-local-text">
                WhatsApp: <strong className="tabular-nums">{BUSINESS.telephone}</strong>
              </p>
              <p className="seo-local-areas">
                Atendimento para Centro, Arraial d’Ajuda, Trancoso e Caraíva.
              </p>
            </div>
          </aside>
        </section>

        <section className="seo-related" aria-labelledby="related-heading">
          <div className="seo-related-header">
            <h2 id="related-heading">Outras opções de massagem em Porto Seguro</h2>
            <AppLink href="/avaliacoes-porto-seguro" className="seo-inline-link">
              Confira nossas 21 avaliações 5 estrelas →
            </AppLink>
          </div>

          <div className="seo-related-grid">
            {relatedServices.map((item) => (
              <AppLink key={item.slug} href={item.slug} className="seo-related-card">
                <span className="seo-related-kicker">{item.duration} · {item.price}</span>
                <strong>{item.name} em Porto Seguro</strong>
                <span className="seo-related-cta">
                  Ver página <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </AppLink>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
