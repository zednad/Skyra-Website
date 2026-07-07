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

/* Average colour of each photo (10x10 canvas sample), shown as the img
   background while pixels decode so lazy images surface as a tonally
   correct block instead of a white gap. Colour only - no opacity fade,
   which would fight the hover-zoom transitions at several call sites. */
const PHOTO_TONE = {
  'hero-install': '#8b8f94',
  'bento-panels': '#6f5f53',
  'battery-garage': '#91867b',
  'commercial-roof': '#6c5744',
  'why-team': '#7e7f82',
  'install-detail': '#534d49',
  'consult-table': '#878279',
  'handover': '#89705e',
  'family-app': '#756a62',
  'home-night': '#3a332f',
  'van-driveway': '#827c73',
  'team-group': '#938676',
  'suburb-aerial': '#635848',
  'about-portrait': '#838175',
  'panel-macro': '#65646a',
  'why-hardware': '#766b61',
}

/* Responsive photo from /public/images/photos renditions. */
export function Photo({ base, widths, sizes = '100vw', alt, className = '', eager = false, style }) {
  const srcSet = widths.map((w) => `/images/photos/${base}-${w}.webp ${w}w`).join(', ')
  const mid = widths[Math.min(1, widths.length - 1)]
  const tone = PHOTO_TONE[base]
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
      style={tone ? { backgroundColor: tone, ...style } : style}
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

/* Button recipes shared by CtaLink and plain <Link>/<button> call sites.
   Combine with the caller's own size/layout classes. Solid variants lift
   on hover and press down on click; ghost/outline stay flat (they sit on
   photos or inside dense UI). */
const BTN_FX =
  // v4 translate/scale utilities animate via the `translate`/`scale` props
  'transition-[translate,scale,box-shadow,background-color,color] duration-200 ease-brand ' +
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985]'
export const BTN = {
  primary: 'bg-amber-500 text-slate-950 font-bold shadow-cta hover:bg-amber-400 hover:shadow-cta-hover ' + BTN_FX,
  navy: 'bg-slate-900 text-white font-bold hover:bg-slate-800 hover:shadow-card-hover ' + BTN_FX,
  ghost: 'ring-1 ring-white/40 text-white font-semibold transition-[background-color,box-shadow] duration-200 ease-brand hover:bg-white/10 hover:ring-white/60',
  outline: 'ring-1 ring-slate-300 text-slate-800 font-semibold transition-[background-color,box-shadow] duration-200 ease-brand hover:bg-slate-50 hover:ring-slate-400',
}

/* Consistent card elevation: quiet at rest, lifts on hover. */
export const CARD_HOVER =
  'shadow-card transition-[translate,box-shadow,border-color] duration-300 ease-brand ' +
  'hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card-hover'

/* Primary amber CTA (link). */
export function CtaLink({ to, children, className = '', variant = 'primary' }) {
  return (
    <Link
      to={to}
      className={
        'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] ' +
        BTN[variant] + ' ' + className
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
