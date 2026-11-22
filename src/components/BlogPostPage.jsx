import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { BUSINESS, SERVICE_PAGES } from '../data/seo'
import { AppLink } from '../utils/router'
import { WhatsOutline } from './SocialIcons'

export function BlogPostPage({ post }) {
  const relatedServices = SERVICE_PAGES.filter((svc) =>
    post.relatedServiceSlugs.includes(svc.slug),
  )

  return (
    <article className="seo-page">
      <div className="wrap seo-page-wrap seo-article-wrap">
        <nav className="seo-breadcrumb" aria-label="Navegação estrutural">
          <AppLink href="/" className="seo-back-link">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Início</span>
          </AppLink>
          <span aria-hidden="true">/</span>
          <AppLink href="/blog">Blog</AppLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.category}</span>
        </nav>

        <header className="seo-page-header">
          <p className="editorial-kicker">
            {post.category} · <Clock size={12} aria-hidden="true" /> {post.readTime}
          </p>
          <h1 className="seo-h1">{post.h1}</h1>
          <p className="seo-lead">{post.excerpt}</p>
        </header>

        <div className="seo-prose seo-article-body">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        <section className="seo-cta-banner">
          <div>
            <h2>Agende sua sessão em Porto Seguro</h2>
            <p>
              Atendimento individualizado com Eliandro Rodrigues na R. Adelar
              Maria de Andrade, 135 — nota 5,0 no Google.
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

        <section className="seo-related" aria-labelledby="article-related-heading">
          <div className="seo-related-header">
            <h2 id="article-related-heading">Serviços relacionados em Porto Seguro</h2>
            <AppLink href="/avaliacoes-porto-seguro" className="seo-inline-link">
              Ver 21 avaliações 5 estrelas →
            </AppLink>
          </div>

          <div className="seo-related-grid">
            {relatedServices.map((svc) => (
              <AppLink key={svc.slug} href={svc.slug} className="seo-related-card">
                <span className="seo-related-kicker">{svc.duration} · {svc.price}</span>
                <strong>{svc.name} em Porto Seguro</strong>
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
