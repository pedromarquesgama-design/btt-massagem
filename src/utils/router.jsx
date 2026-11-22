import { useEffect, useState } from 'react'
import { SITE_URL, normalizePath } from '../data/seo'

const ROUTE_EVENT = 'btt:navigate'

export function navigate(to) {
  if (typeof window === 'undefined') return

  const [rawPath, hash] = to.split('#')
  const targetPath = normalizePath(rawPath || '/')
  const currentPath = normalizePath(window.location.pathname)

  if (targetPath !== currentPath) {
    window.history.pushState({}, '', hash ? `${targetPath}#${hash}` : targetPath)
    window.dispatchEvent(new Event(ROUTE_EVENT))
  } else if (hash) {
    window.history.replaceState({}, '', `${targetPath}#${hash}`)
  }

  if (hash) {
    window.requestAnimationFrame(() => {
      const targetEl = document.getElementById(hash)
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' })
      }
    })
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
}

export function usePathname() {
  const [pathname, setPathname] = useState(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/',
  )

  useEffect(() => {
    const sync = () => setPathname(normalizePath(window.location.pathname))
    window.addEventListener('popstate', sync)
    window.addEventListener(ROUTE_EVENT, sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(ROUTE_EVENT, sync)
    }
  }, [])

  return pathname
}

export function useDocumentMeta({ title, description, canonicalPath }) {
  useEffect(() => {
    if (title) {
      document.title = title
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', title)
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)

      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.setAttribute('content', description)
    }

    if (canonicalPath) {
      const canonicalUrl =
        canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}`
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', canonicalUrl)

      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) ogUrl.setAttribute('content', canonicalUrl)
    }
  }, [title, description, canonicalPath])
}

export function AppLink({ href, onClick, children, ...props }) {
  function handleClick(e) {
    if (onClick) onClick(e)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return
    }
    if (href && href.startsWith('/')) {
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
