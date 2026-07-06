// ─────────────────────────────────────────────────────────────────────────────
//  Shared primitives for the SkyRa site: page meta, scroll handling, photo
//  srcset helper, reveal animation, buttons and section headings.
//  Design rules: navy surfaces, amber CTAs, 12–16px radii, photography-led,
//  motion kept to short one-shot reveals (see docs/REDESIGN_PLAN.md).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqeojppk'

export const SITE_URL = 'https://skyraenergy.com.au'

export const ABN = '48 667 329 044'

export const EASE = [0.22, 1, 0.36, 1]

function upsertMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (content == null) {
    tag?.remove()
    return
  }
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/* Per-page head: title, description, canonical URL, matching Open Graph /
   Twitter tags, and optional noindex (404). Canonical follows the route. */
export function Meta({ title, description, noindex = false }) {
  const { pathname } = useLocation()
  useEffect(() => {
    const url = SITE_URL + (pathname === '/' ? '/' : pathname)
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : null)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, pathname, noindex])
  return null
}

/* Injects a JSON-LD structured-data script; removed again on unmount. */
export function JsonLd({ id, data }) {
  const json = JSON.stringify(data)
  useEffect(() => {
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = id
      document.head.appendChild(el)
    }
    el.textContent = json
    return () => el.remove()
  }, [id, json])
  return null
}

/* Scrolls to top on route change (respects in-page #anchors). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

/* Responsive photo from /public/images/photos renditions. */
export function Photo({ base, widths, sizes = '100vw', alt, className = '', eager = false, style }) {
  const srcSet = widths.map((w) => `/images/photos/${base}-${w}.webp ${w}w`).join(', ')
  const mid = widths[Math.min(1, widths.length - 1)]
  return (
    <img
      src={`/images/photos/${base}-${mid}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding={eager ? undefined : 'async'}
      className={className}
      style={style}
    />
  )
}

/* One-shot fade-up reveal, subtle by design. */
export function Reveal({ children, className = '', delay = 0, y = 24 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function Kicker({ children, className = '' }) {
  return (
    <p className={'text-[12px] font-bold uppercase tracking-[0.22em] text-amber-700 ' + className}>
      {children}
    </p>
  )
}

export function H2({ children, className = '' }) {
  return (
    <h2 className={'mt-3 text-[clamp(28px,3.8vw,44px)] font-extrabold leading-[1.08] tracking-tight text-slate-900 ' + className}>
      {children}
    </h2>
  )
}

/* Primary amber CTA (link). */
export function CtaLink({ to, children, className = '', variant = 'primary' }) {
  const styles = {
    primary:
      'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm font-bold',
    navy:
      'bg-slate-900 text-white hover:bg-slate-800 font-bold',
    ghost:
      'ring-1 ring-white/40 text-white hover:bg-white/10 font-semibold',
    outline:
      'ring-1 ring-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-50 font-semibold',
  }
  return (
    <Link
      to={to}
      className={
        'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] transition-colors ' +
        styles[variant] + ' ' + className
      }
    >
      {children}
      <ArrowRight size={17} strokeWidth={2.5} />
    </Link>
  )
}

/* Small tick chip used under heros. */
export function TruthChip({ icon: Icon, children, tone = 'light' }) {
  return (
    <span
      className={
        'inline-flex items-center gap-2 text-[13.5px] font-semibold ' +
        (tone === 'light' ? 'text-white/85' : 'text-slate-700')
      }
    >
      <span
        className={
          'grid h-6 w-6 shrink-0 place-items-center rounded-full ' +
          (tone === 'light' ? 'bg-white/15 text-amber-300' : 'bg-amber-100 text-amber-700')
        }
      >
        <Icon size={13} strokeWidth={2.5} />
      </span>
      {children}
    </span>
  )
}
