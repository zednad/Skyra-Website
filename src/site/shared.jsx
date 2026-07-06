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

export const EASE = [0.22, 1, 0.36, 1]

/* Sets document title + meta description per page. */
export function Meta({ title, description }) {
  useEffect(() => {
    document.title = title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description])
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
