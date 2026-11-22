import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'
import { GUIA_TIPS } from './data/content'
import {
  BLOG_SEO,
  HOME_SEO,
  REVIEWS_SEO,
  getBlogPostBySlug,
  getServiceBySlug,
} from './data/seo'
import { toggleChecklistItem } from './utils/booking'
import { useDocumentMeta, usePathname } from './utils/router'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ScrubbedManifesto } from './components/MotionPrimitives'
import { FounderSection } from './components/FounderSection'
import { StudioSection } from './components/StudioSection'
import { WellnessSection } from './components/WellnessSection'
import { ServicesSection } from './components/ServicesSection'
import { PreSessionSection } from './components/PreSessionSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { ServiceDetailPage } from './components/ServiceDetailPage'
import { ReviewsPage } from './components/ReviewsPage'
import { BlogIndexPage } from './components/BlogIndexPage'
import { BlogPostPage } from './components/BlogPostPage'

const MANIFESTO_WORDS = [
  { text: 'Investigando' },
  { text: 'a' },
  { text: 'dor', accent: true },
  { text: 'na' },
  { text: 'origem,' },
  { text: 'devolvendo' },
  { text: 'movimento,', accent: true },
  { text: 'calma' },
  { text: 'e' },
  { text: 'presença' },
  { text: 'ao' },
  { text: 'seu' },
  { text: 'corpo.', accent: true },
]

function resolveRouteMeta(pathname) {
  const service = getServiceBySlug(pathname)
  if (service) {
    return {
      kind: 'service',
      data: service,
      title: service.metaTitle,
      description: service.metaDescription,
      canonicalPath: service.slug,
    }
  }

  if (pathname === REVIEWS_SEO.slug) {
    return {
      kind: 'reviews',
      title: REVIEWS_SEO.metaTitle,
      description: REVIEWS_SEO.metaDescription,
      canonicalPath: REVIEWS_SEO.slug,
    }
  }

  if (pathname === BLOG_SEO.slug) {
    return {
      kind: 'blog-index',
      title: BLOG_SEO.metaTitle,
      description: BLOG_SEO.metaDescription,
      canonicalPath: BLOG_SEO.slug,
    }
  }

  const blogPost = getBlogPostBySlug(pathname)
  if (blogPost) {
    return {
      kind: 'blog-post',
      data: blogPost,
      title: blogPost.metaTitle,
      description: blogPost.metaDescription,
      canonicalPath: blogPost.slug,
    }
  }

  return {
    kind: 'home',
    title: HOME_SEO.metaTitle,
    description: HOME_SEO.metaDescription,
    canonicalPath: '/',
  }
}

export default function App() {
  const pathname = usePathname()
  const [checkedPrepIds, setCheckedPrepIds] = useState([])
  const route = resolveRouteMeta(pathname)

  useDocumentMeta({
    title: route.title,
    description: route.description,
    canonicalPath: route.canonicalPath,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    let rafId = 0
    function raf(time) {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }
    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  function handleTogglePrepStep(id) {
    setCheckedPrepIds((prev) => toggleChecklistItem(prev, id))
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
        <Header />

        <main>
          {route.kind === 'service' && (
            <ServiceDetailPage service={route.data} />
          )}

          {route.kind === 'reviews' && <ReviewsPage />}

          {route.kind === 'blog-index' && <BlogIndexPage />}

          {route.kind === 'blog-post' && <BlogPostPage post={route.data} />}

          {route.kind === 'home' && (
            <>
              <HeroSection />

              <div className="page-curtain">
                <ScrubbedManifesto
                  kicker="Filosofia de Cuidado"
                  words={MANIFESTO_WORDS}
                />

                <FounderSection />
                <StudioSection />
                <WellnessSection />
                <ServicesSection
                  completedPrepCount={checkedPrepIds.length}
                  totalPrepCount={GUIA_TIPS.length}
                />
                <PreSessionSection
                  checkedIds={checkedPrepIds}
                  onToggleStep={handleTogglePrepStep}
                />
                <TestimonialsSection />
                <ContactSection />
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
