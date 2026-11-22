import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  BLOG_POSTS,
  BLOG_SEO,
  BUSINESS,
  NAP_TEXT,
  REVIEWS_SEO,
  SERVICE_PAGES,
  SITE_URL,
  buildLocalBusinessSchema,
} from '../src/data/seo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function renderShell({ mainHtml }) {
  const serviceLinks = SERVICE_PAGES.map(
    (s) => `<li><a href="${s.slug}">${escapeHtml(s.name)} em Porto Seguro</a></li>`,
  ).join('')

  return `
      <div class="site-shell">
        <header class="site-header is-scrolled">
          <div class="header-inner">
            <a class="brand-lockup" href="/">
              <span class="brand-wordmark">Eliandro Rodrigues</span>
            </a>
            <nav class="desktop-nav" aria-label="Navegação principal">
              <a class="nav-link" href="/#about">Sobre</a>
              <a class="nav-link" href="/#services">Serviços</a>
              <a class="nav-link" href="/avaliacoes-porto-seguro">Avaliações</a>
              <a class="nav-link" href="/blog">Blog</a>
              <a class="nav-link" href="/#contact">Contato</a>
            </nav>
          </div>
        </header>
        <main class="seo-page">
          <div class="wrap seo-page-wrap">
            ${mainHtml}
          </div>
        </main>
        <footer class="site-footer">
          <div class="wrap foot-seo-links">
            <nav class="foot-services-nav" aria-label="Serviços de massagem em Porto Seguro">
              <ul>${serviceLinks}</ul>
            </nav>
            <address class="foot-nap">${escapeHtml(NAP_TEXT)}</address>
          </div>
        </footer>
      </div>`
}

function buildPageHtml({
  slug,
  title,
  description,
  mainHtml,
  extraSchemas = [],
}) {
  if (title.length >= 60) {
    throw new Error(`Meta title exceeds 60 chars (${title.length}): "${title}" on ${slug}`)
  }

  const canonicalUrl = slug === '/' ? `${SITE_URL}/` : `${SITE_URL}${slug}`
  const schemas = [buildLocalBusinessSchema(slug), ...extraSchemas]
  const jsonLdScripts = schemas
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    )
    .join('\n    ')

  let html = templateHtml
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  )
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  )
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  )
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  )
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  )
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    jsonLdScripts,
  )
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>\s*<script type="module"/,
    `<div id="root">${renderShell({ mainHtml })}\n    </div>\n    <script type="module"`,
  )

  return html
}

function writeRoute(slug, html) {
  const outDir = path.join(distDir, slug.replace(/^\//, ''))
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8')
}

// 1. Dedicated service pages
for (const service of SERVICE_PAGES) {
  const mainHtml = `
    <article>
      <h1 class="seo-h1">${escapeHtml(service.h1)}</h1>
      <p class="seo-lead">${escapeHtml(service.lead)}</p>
      <p><a class="btn btn-gold" href="${BUSINESS.whatsappUrl}">Agendar em Porto Seguro pelo WhatsApp</a></p>
      <p><a href="/avaliacoes-porto-seguro">Ver avaliações 5,0 estrelas (21 avaliações no Google)</a></p>
      <h2>Como funciona a ${escapeHtml(service.name)} em Porto Seguro</h2>
      ${service.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n      ')}
      <h2>Principais benefícios</h2>
      <ul>
        ${service.benefits.map((b) => `<li>${escapeHtml(b)}</li>`).join('\n        ')}
      </ul>
      <h2>Indicação</h2>
      <p>${escapeHtml(service.indication)}</p>
    </article>`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} em Porto Seguro`,
    description: service.metaDescription,
    provider: { '@id': `${SITE_URL}/#localbusiness` },
    areaServed: 'Porto Seguro, BA',
    url: `${SITE_URL}${service.slug}`,
  }

  writeRoute(
    service.slug,
    buildPageHtml({
      slug: service.slug,
      title: service.metaTitle,
      description: service.metaDescription,
      mainHtml,
      extraSchemas: [serviceSchema],
    }),
  )
}

// 2. Reviews page
writeRoute(
  REVIEWS_SEO.slug,
  buildPageHtml({
    slug: REVIEWS_SEO.slug,
    title: REVIEWS_SEO.metaTitle,
    description: REVIEWS_SEO.metaDescription,
    mainHtml: `
      <article>
        <h1 class="seo-h1">${escapeHtml(REVIEWS_SEO.h1)}</h1>
        <p class="seo-lead">Eliandro Rodrigues mantém avaliação 5,0 de 5 estrelas com 21 avaliações reais no Google Business Profile em Porto Seguro, BA. Atendimento no Centro de Porto Seguro para moradores e visitantes de Arraial d'Ajuda, Trancoso e Caraíva.</p>
        <p><a class="btn btn-gold" href="${BUSINESS.whatsappUrl}">Agendar massagem em Porto Seguro pelo WhatsApp</a></p>
      </article>`,
  }),
)

// 3. Blog index
writeRoute(
  BLOG_SEO.slug,
  buildPageHtml({
    slug: BLOG_SEO.slug,
    title: BLOG_SEO.metaTitle,
    description: BLOG_SEO.metaDescription,
    mainHtml: `
      <article>
        <h1 class="seo-h1">${escapeHtml(BLOG_SEO.h1)}</h1>
        <p class="seo-lead">Conteúdo especializado sobre massagem em Porto Seguro, recuperação esportiva e bem-estar por Eliandro Rodrigues.</p>
        <ul>
          ${BLOG_POSTS.map((p) => `<li><a href="${p.slug}">${escapeHtml(p.h1)}</a> — ${escapeHtml(p.excerpt)}</li>`).join('\n          ')}
        </ul>
      </article>`,
  }),
)

// 4. Blog articles
for (const post of BLOG_POSTS) {
  const mainHtml = `
    <article>
      <h1 class="seo-h1">${escapeHtml(post.h1)}</h1>
      <p class="seo-lead">${escapeHtml(post.excerpt)}</p>
      ${post.sections
        .map(
          (sec) =>
            `<h2>${escapeHtml(sec.heading)}</h2>\n      ${sec.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n      ')}`,
        )
        .join('\n      ')}
      <p><a class="btn btn-gold" href="${BUSINESS.whatsappUrl}">Agendar em Porto Seguro pelo WhatsApp</a></p>
      <p><a href="/avaliacoes-porto-seguro">Ver nossas 21 avaliações 5 estrelas em Porto Seguro</a></p>
    </article>`

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.h1,
    description: post.metaDescription,
    datePublished: post.datePublished,
    author: { '@type': 'Person', name: BUSINESS.shortName },
    publisher: { '@id': `${SITE_URL}/#localbusiness` },
    mainEntityOfPage: `${SITE_URL}${post.slug}`,
  }

  writeRoute(
    post.slug,
    buildPageHtml({
      slug: post.slug,
      title: post.metaTitle,
      description: post.metaDescription,
      mainHtml,
      extraSchemas: [blogSchema],
    }),
  )
}

console.log(
  `Prerendered ${SERVICE_PAGES.length + BLOG_POSTS.length + 2} static SEO routes into dist/.`,
)

// Gate verification across all 12 routes + robots.txt + sitemap.xml
const allRoutes = [
  '/',
  ...SERVICE_PAGES.map((s) => s.slug),
  REVIEWS_SEO.slug,
  BLOG_SEO.slug,
  ...BLOG_POSTS.map((p) => p.slug),
]

for (const route of allRoutes) {
  const filePath =
    route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.replace(/^\//, ''), 'index.html')
  const html = fs.readFileSync(filePath, 'utf8')
  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1] || ''
  const h1 = (html.match(/<h1[^>]*>(.*?)<\/h1>/) || [])[1] || ''
  const hasNap =
    html.includes('R. Adelar Maria de Andrade, 135') &&
    html.includes('+55 73 99991-7430')
  const ldScripts = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ]
  const parsed = ldScripts.map((m) => JSON.parse(m[1]))
  const hasLocalBusiness = parsed.some(
    (s) =>
      s['@type'] === 'LocalBusiness' &&
      s.geo?.latitude === -16.443184 &&
      s.geo?.longitude === -39.075852,
  )

  if (
    !title ||
    title.length >= 60 ||
    !h1.includes('Porto Seguro') ||
    !hasNap ||
    !hasLocalBusiness
  ) {
    throw new Error(
      `SEO gate failed on ${route}: ${JSON.stringify({ titleLen: title.length, h1, hasNap, hasLocalBusiness })}`,
    )
  }
}

for (const staticFile of ['robots.txt', 'sitemap.xml']) {
  if (!fs.existsSync(path.join(distDir, staticFile))) {
    throw new Error(`Missing required file in dist/: ${staticFile}`)
  }
}

console.log(
  `Verified all ${allRoutes.length} routes + robots.txt + sitemap.xml against SEO gates.`,
)
