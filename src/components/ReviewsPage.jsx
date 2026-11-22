import { ArrowLeft, ArrowUpRight, Star } from 'lucide-react'
import { TESTIMONIALS } from '../data/content'
import { BUSINESS, REVIEWS_SEO, SERVICE_PAGES } from '../data/seo'
import { AppLink } from '../utils/router'
import { WhatsOutline } from './SocialIcons'

export function ReviewsPage() {
  return (
    <article className="seo-page">
      <div className="wrap seo-page-wrap">
        <nav className="seo-breadcrumb" aria-label="Navegação estrutural">
          <AppLink href="/" className="seo-back-link">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Início</span>
          </AppLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Avaliações</span>
        </nav>

        <header className="seo-page-header">
          <p className="editorial-kicker">Google Business Profile · Nota Máxima</p>
          <h1 className="seo-h1">{REVIEWS_SEO.h1}</h1>
          <p className="seo-lead">
            Eliandro Rodrigues mantém avaliação média de 5,0 estrelas com 21
            avaliações verificadas no Google em Porto Seguro, BA. Leia relatos
            reais de clientes que escolheram nossa massagem em Porto Seguro para
            alívio de dores, recuperação esportiva e bem-estar.
          </p>

          <div className="seo-rating-pill tabular-nums" aria-label="Nota 5,0 de 5 estrelas com 21 avaliações">
            <span className="seo-rating-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={16} fill="#c9a86a" strokeWidth={0} />
              ))}
            </span>
            <strong>5,0 / 5,0</strong>
            <span>· 21 avaliações no Google em Porto Seguro, BA</span>
          </div>
        </header>

        <section className="seo-reviews-grid" aria-label="Depoimentos de clientes">
          {TESTIMONIALS.map((item) => (
            <article key={item.name} className="testi-card">
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
            </article>
          ))}
        </section>

        <section className="seo-cta-banner">
          <div>
            <h2>Quer sentir esse cuidado de perto?</h2>
            <p>
              Agende sua sessão de massagem em Porto Seguro diretamente pelo
              WhatsApp — atendemos no Centro e recebemos clientes de Arraial
              d’Ajuda, Trancoso e Caraíva.
            </p>
          </div>
          <a
            className="btn btn-gold"
            href={BUSINESS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsOutline size={18} />
            <span>Agendar pelo WhatsApp</span>
          </a>
        </section>

        <section className="seo-related" aria-labelledby="reviews-services-heading">
          <h2 id="reviews-services-heading">
            Conheça nossos serviços de massagem em Porto Seguro
          </h2>
          <div className="seo-related-grid">
            {SERVICE_PAGES.map((svc) => (
              <AppLink key={svc.slug} href={svc.slug} className="seo-related-card">
                <span className="seo-related-kicker">{svc.duration} · {svc.price}</span>
                <strong>{svc.name} em Porto Seguro</strong>
                <span className="seo-related-cta">
                  Explorar terapia <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </AppLink>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
