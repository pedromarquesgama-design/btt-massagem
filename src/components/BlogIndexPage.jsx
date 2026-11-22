import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { BLOG_POSTS, BLOG_SEO, SERVICE_PAGES } from '../data/seo'
import { AppLink } from '../utils/router'

export function BlogIndexPage() {
  return (
    <article className="seo-page">
      <div className="wrap seo-page-wrap">
        <nav className="seo-breadcrumb" aria-label="Navegação estrutural">
          <AppLink href="/" className="seo-back-link">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Início</span>
          </AppLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Blog</span>
        </nav>

        <header className="seo-page-header">
          <p className="editorial-kicker">Conteúdo &amp; Saúde Corporal</p>
          <h1 className="seo-h1">{BLOG_SEO.h1}</h1>
          <p className="seo-lead">
            Guias escritos por Eliandro Rodrigues sobre massagem em Porto
            Seguro, recuperação muscular para jiu-jitsu, drenagem linfática e
            escolhas seguras para o seu bem-estar na Costa do Descobrimento.
          </p>
        </header>

        <section className="seo-blog-grid" aria-label="Artigos publicados">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="seo-blog-card">
              <p className="seo-related-kicker">
                {post.category} · <Clock size={12} aria-hidden="true" /> {post.readTime}
              </p>
              <h2>
                <AppLink href={post.slug}>{post.h1}</AppLink>
              </h2>
              <p>{post.excerpt}</p>
              <AppLink href={post.slug} className="seo-inline-link">
                Ler artigo completo <ArrowUpRight size={14} aria-hidden="true" />
              </AppLink>
            </article>
          ))}
        </section>

        <section className="seo-related" aria-labelledby="blog-services-heading">
          <div className="seo-related-header">
            <h2 id="blog-services-heading">Terapias em Porto Seguro</h2>
            <AppLink href="/avaliacoes-porto-seguro" className="seo-inline-link">
              Ver avaliações 5 estrelas →
            </AppLink>
          </div>
          <div className="seo-related-grid">
            {SERVICE_PAGES.slice(0, 4).map((svc) => (
              <AppLink key={svc.slug} href={svc.slug} className="seo-related-card">
                <span className="seo-related-kicker">{svc.duration} · {svc.price}</span>
                <strong>{svc.name} em Porto Seguro</strong>
                <span className="seo-related-cta">
                  Ver detalhes <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </AppLink>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
