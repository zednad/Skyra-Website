// ─────────────────────────────────────────────────────────────────────────────
//  SkyRa Energy — Homepage (light-mode variant)
//  A single, fully light-mode design — no dark theme anywhere. Compliance-
//  conscious cut: all unverified claims removed (no CEC accreditation, warranty,
//  blanket savings %, "most popular", service SLAs, app features or testimonials)
//  so nothing on the page asserts something not yet certified or enabled. The
//  savings calculator is kept but clearly labelled an indicative estimate.
//  Flow: hero (split, with built-in nav) → trust strip → savings calculator →
//  what we install → packages (residential/commercial toggle) → how it works →
//  quote-form CTA → footer. Headings are upright (no italics) per brand pref.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useId, useRef } from 'react'
import {
  motion, AnimatePresence, animate, useMotionValue, useReducedMotion,
  useScroll, useSpring, useTransform,
} from 'framer-motion'
import {
  ArrowRight, ArrowUp, Phone, Check, Zap, Sun, BatteryCharging, Gauge,
  ClipboardCheck, PencilRuler, Wrench, Power, ChevronDown, Menu, X, MapPin,
  Users, ShieldCheck, Home, Loader2,
} from 'lucide-react'

/* ── Quote form backend (Formspree) ───────────────────────────────────────────
   The quote form posts to Formspree, which works on static hosts like GitHub
   Pages — no server of your own required.

   ONE-TIME SET-UP:
     1. Sign up free at https://formspree.io and click "New Form".
     2. Set the form's notification email to wherever you want leads to land.
     3. Formspree gives you an endpoint like  https://formspree.io/f/abcdwxyz
     4. Paste the ID (the part after /f/) into FORMSPREE_ID below and redeploy.

   Until that's done, submitting shows a friendly "not connected yet" message. */
const FORMSPREE_ID = 'mqeojppk'
const FORMSPREE_ENDPOINT = `https://formspree.io/f/mqeojppk`

// Responsive hero image (solar panels on a residential home). Unsplash resizes
// via the `w` param, so phones download a ~640–1080px image instead of the full.
const HERO_BASE =
  'https://images.unsplash.com/photo-1655300256335-beef51a914fe?q=80&auto=format&fit=crop'
const HERO_SRCSET = [640, 828, 1080, 1440]
  .map((w) => `${HERO_BASE}&w=${w} ${w}w`)
  .join(', ')
const HERO_IMG = `${HERO_BASE}&w=1080`

const EASE = [0.22, 1, 0.36, 1]

/* ── Motion helpers ───────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
const staggerParent = (stagger = 0.12, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

// Scroll-triggered reveal wrapper
function Reveal({ children, className = '', delay = 0, y = 30 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// Decorative glow orb that drifts slowly (static under reduced motion).
function DriftOrb({ className, duration = 14, dx = 18, dy = -22 }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className} />
  return (
    <motion.div
      className={className}
      animate={{ x: [0, dx, 0], y: [0, dy, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// Floating back-to-top button, appears after scrolling past the hero.
function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 ring-1 ring-white/40 transition-transform hover:scale-105"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <ArrowUp size={18} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}

// Count-up number (respects reduced motion). With reduced motion we render the
// value directly (no state sync in the effect); otherwise we animate and update
// via framer's async onUpdate callback.
function AnimatedNumber({ value, formatFn }) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(value)
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    if (reduce) return
    const controls = animate(mv, value, {
      duration: 0.5, ease: EASE, onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [value, reduce, mv])
  const shown = reduce ? value : display
  return <>{formatFn ? formatFn(shown) : Math.round(shown)}</>
}

/* ── Brand logo ───────────────────────────────────────────────────────────────
   "Dawn Disc" — SkyRa = Sky + Ra (the sun). Sun and sky meeting at the
   horizon, reduced to a single coin: a golden upper half over a deep sky
   lower half, split by a hairline of light. Crisp from 16px favicon to
   large lockups. useId keeps gradient ids unique per use. */
function SunMark({ size = 28, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const warm = `sk-warm-${uid}`
  const cool = `sk-cool-${uid}`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 2px 6px rgba(2,132,199,0.28))' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={warm} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FDE047" />
          <stop offset="0.55" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={cool} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#075985" />
        </linearGradient>
      </defs>
      <path d="M4.6 22.4 A19.5 19.5 0 0 1 43.4 22.4 Z" fill={`url(#${warm})`} />
      <path d="M4.6 25.6 A19.5 19.5 0 0 0 43.4 25.6 Z" fill={`url(#${cool})`} />
    </svg>
  )
}

/* ── Nav ───────────────────────────────────────────────────────────────────
   Floating light pill. Translucent white with a hairline border + soft shadow;
   condenses to a more solid, tighter bar on scroll. */
const NAV_LINKS = [
  ['Products', '#products'],
  ['Packages', '#packages'],
  ['Why Solar', '#why-solar'],
  ['How it works', '#how-it-works'],
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  // Scroll-spy: highlight the nav link for whichever section is centred in view.
  useEffect(() => {
    const ids = NAV_LINKS.map(([, href]) => href.slice(1))
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => obs.observe(s))
    // Clear the highlight while in the hero region (above the topmost section).
    const onScroll = () => {
      const top = Math.min(...sections.map((s) => s.offsetTop))
      if (window.scrollY < top - 140) setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5 lg:px-12"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div
        className={
          'relative mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-300 sm:px-3 sm:py-2.5 ' +
          (scrolled
            ? 'border-slate-200/80 bg-white/85 shadow-lg shadow-slate-900/[0.06] backdrop-blur-xl'
            : 'border-white/60 bg-white/55 shadow-md shadow-slate-900/[0.04] backdrop-blur-md')
        }
      >
        <a href="#top" className="flex shrink-0 items-center gap-2 pl-2 sm:gap-2.5">
          <SunMark size={28} />
          <span className="whitespace-nowrap text-[18px] font-extrabold tracking-tight text-slate-900 sm:text-[19px]">
            SkyRa<span className="hidden font-medium text-sky-600 min-[380px]:inline"> Energy</span>
          </span>
        </a>
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[14px] font-semibold text-slate-600 lg:flex">
          {NAV_LINKS.map(([label, href]) => {
            const isActive = active === href.slice(1)
            return (
              <a
                key={href}
                href={href}
                className={
                  'group relative cursor-pointer py-1 transition-colors hover:text-slate-900 ' +
                  (isActive ? 'text-slate-900' : '')
                }
              >
                {label}
                <span
                  className={
                    'absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-transform duration-300 group-hover:scale-x-100 ' +
                    (isActive ? 'scale-x-100' : 'scale-x-0')
                  }
                />
              </a>
            )
          })}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#quote"
            className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-sky-500 to-blue-600 py-1.5 pl-4 pr-1.5 text-[13px] font-bold text-white shadow-md shadow-sky-500/25 transition-all hover:shadow-lg hover:shadow-sky-500/40 sm:py-2 sm:pl-5 sm:pr-2 sm:text-[14px]"
          >
            Get Quote
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform group-hover:rotate-12 sm:h-8 sm:w-8">
              <Phone size={13} />
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="flex flex-col p-2">
              {NAV_LINKS.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-[15px] font-semibold text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────────
   Light split hero: copy on the left, a rounded image card with floating
   glass detail cards on the right. Soft sky/amber glow orbs and a faint dot
   grid sit behind everything. */
function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  // Image drifts up a touch slower than the page (gentle parallax).
  const imgY = useTransform(scrollY, [0, 700], [0, -40])
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/60 to-white"
    >
      {/* faint dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(2,132,199,0.10) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <DriftOrb
        className="pointer-events-none absolute -right-24 -top-10 h-[28rem] w-[34rem] rounded-full bg-sky-200/40 blur-[120px]"
        duration={18}
        dx={-26}
        dy={28}
      />
      <DriftOrb
        className="pointer-events-none absolute -left-24 top-1/3 h-80 w-96 rounded-full bg-amber-200/30 blur-[120px]"
        duration={20}
        dx={22}
        dy={-18}
      />

      <Nav />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-12 lg:pb-28 lg:pt-40">
        {/* ── Copy ── */}
        <motion.div variants={staggerParent(0.13, 0.15)} initial="hidden" animate="show">
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-sky-100 bg-white/80 px-4 py-1.5 shadow-sm shadow-sky-900/[0.04] backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 sm:text-[12px]">
              Solar · Batteries · Inverters
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(40px,6.6vw,76px)] font-extrabold leading-[1.02] tracking-tight text-slate-900"
          >
            Power your home with
            <span className="text-shimmer mt-1 block pb-1 leading-[1.02]">
              clean solar energy.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-slate-600 sm:mt-7 sm:text-[18px]"
          >
            SkyRa supplies and installs solar panels, home batteries and inverters
            for homes and businesses across Australia — designed, sized and fitted
            as one seamless system.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <a
              href="#quote"
              className="btn-sheen group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 py-3 pl-7 pr-2.5 text-[16px] font-bold text-white shadow-xl shadow-sky-500/30 transition-all hover:shadow-2xl hover:shadow-sky-500/40 sm:w-auto sm:py-2.5"
            >
              Get Free Quote
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 sm:h-11 sm:w-11">
                <ArrowRight size={18} />
              </span>
            </a>
            <a
              href="#why-solar"
              className="w-full rounded-full border border-slate-300 bg-white/70 px-7 py-3.5 text-center text-[15px] font-semibold text-slate-700 backdrop-blur-sm transition-colors hover:border-slate-400 hover:bg-white sm:w-auto"
            >
              Estimate my savings
            </a>
          </motion.div>

          {/* trust row — neutral, no unverified claims */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-semibold text-slate-600 sm:mt-10"
          >
            {[
              [Check, 'Free, no-obligation quote'],
              [MapPin, 'Installed Australia-wide'],
              [Sun, 'Tier-1 brands only'],
            ].map(([Icon, label]) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-sky-100 text-sky-600">
                  <Icon size={13} strokeWidth={2.5} />
                </span>
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Visual ── */}
        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        >
          {/* soft colour halo behind the card */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-tr from-sky-200/50 via-transparent to-amber-200/40 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-sky-900/20 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
            <motion.img
              src={HERO_IMG}
              srcSet={HERO_SRCSET}
              sizes="(min-width: 1024px) 46vw, 92vw"
              fetchPriority="high"
              alt="Solar panels on a modern residential home"
              className="aspect-[4/5] h-full w-full object-cover sm:aspect-[5/6]"
              style={{ y: reduce ? 0 : imgY }}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
            />
            {/* subtle top sheen for depth */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/15" />
          </div>

          {/* floating glass card — savings teaser */}
          <motion.div
            className="absolute -bottom-5 -left-3 flex items-center gap-3.5 rounded-2xl border border-white/70 bg-white/85 p-3.5 shadow-xl shadow-sky-900/15 backdrop-blur-md sm:-left-6 sm:gap-4 sm:p-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 sm:h-12 sm:w-12">
              <Gauge size={22} />
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Lower power bills
              </div>
              <div className="text-[17px] font-extrabold leading-tight text-slate-900 sm:text-[18px]">
                Generate your own energy
              </div>
            </div>
          </motion.div>

          {/* floating chip — battery */}
          <motion.div
            className="absolute -right-2 top-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3.5 py-2 shadow-lg shadow-sky-900/10 backdrop-blur-md sm:-right-5"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.95 }}
          >
            <BatteryCharging size={16} className="text-amber-500" />
            <span className="text-[13px] font-bold text-slate-800">Store by day, use by night</span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-slate-400 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{ opacity: { delay: 1.6, duration: 0.8 }, y: { delay: 1.6, duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <ChevronDown size={26} strokeWidth={1.5} />
      </motion.div>
    </section>
  )
}

/* ── Trust strip ──────────────────────────────────────────────────────────── */
function TrustStrip() {
  const brands = ['Jinko', 'Tesla', 'Trina', 'Sungrow', 'Fronius', 'REC', 'LONGi', 'SMA', 'GoodWe', 'Enphase']
  const fade = {
    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
  }
  return (
    <div className="border-y border-slate-200/70 bg-white">
      <motion.div
        className="mx-auto max-w-7xl px-5 py-7 sm:px-6 sm:py-8 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-[13px] font-semibold uppercase tracking-wider text-slate-400">
          Tier-1 brands we install
        </p>
        <div className="mt-4 overflow-hidden" style={fade}>
          <div className="flex w-max animate-marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-x-10 pr-10 sm:gap-x-14 sm:pr-14" aria-hidden={copy === 1}>
                {brands.map((b) => (
                  <span key={b} className="text-[20px] font-extrabold tracking-tight text-slate-300">{b}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Live savings calculator ──────────────────────────────────────────────── */
function Calculator() {
  const [bill, setBill] = useState(650)
  const annual = bill * 4
  const saving = Math.round(annual * 0.7)
  const payback = Math.max(2.4, 7700 / saving)
  const co2 = saving / 1000
  const pct = ((bill - 200) / (1200 - 200)) * 100
  return (
    <section id="why-solar" className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-sky-600">Try it</span>
            <h2 className="mt-3 text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              See your saving in
              <span className="text-sky-600"> seconds.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-slate-500">
              Drag to your average quarterly power bill. We'll estimate what a SkyRa system
              could save you each year — no email required.
            </p>
            <div className="mt-10">
              <div className="flex items-end justify-between">
                <span className="text-[14px] font-semibold text-slate-500">Average quarterly bill</span>
                <span className="text-[24px] font-extrabold text-slate-900">${bill}</span>
              </div>
              <input
                type="range" min="200" max="1200" step="10" value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="mt-4 w-full"
                style={{ background: `linear-gradient(to right, #0284c7 ${pct}%, #bae6fd ${pct}%)` }}
              />
              <div className="mt-2 flex justify-between text-[12px] text-slate-400">
                <span>$200</span><span>$1,200</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[32px] bg-white p-6 shadow-2xl shadow-sky-900/10 ring-1 ring-slate-200/80 sm:p-9 lg:p-10">
              <DriftOrb
                className="pointer-events-none absolute -right-12 -top-16 h-56 w-72 rounded-full bg-sky-200/50 blur-[70px]"
                duration={12}
                dx={-20}
                dy={18}
              />
              <div className="relative">
                <div className="text-[12px] font-semibold uppercase tracking-[0.24em] text-sky-600">Estimated saving</div>
                <div className="mt-2 bg-gradient-to-br from-sky-500 to-blue-700 bg-clip-text text-[clamp(48px,8vw,80px)] font-extrabold leading-none text-transparent">
                  $<AnimatedNumber value={saving} formatFn={(v) => Math.round(v).toLocaleString()} />
                  <span className="text-[22px] font-semibold text-slate-400"> /yr</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                    <Gauge size={20} className="text-sky-600" />
                    <div className="mt-3 whitespace-nowrap text-[22px] font-extrabold leading-none text-slate-900 sm:text-[26px]">
                      <AnimatedNumber value={payback} formatFn={(v) => v.toFixed(1)} /> yr
                    </div>
                    <div className="mt-1 text-[12px] text-slate-500">Estimated payback</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                    <Sun size={20} className="text-amber-500" />
                    <div className="mt-3 whitespace-nowrap text-[22px] font-extrabold leading-none text-slate-900 sm:text-[26px]">
                      <AnimatedNumber value={co2} formatFn={(v) => v.toFixed(1)} />t
                    </div>
                    <div className="mt-1 text-[12px] text-slate-500">CO₂ avoided / yr</div>
                  </div>
                </div>
                <a href="#quote" className="btn-sheen mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 text-[16px] font-bold text-white shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02]">
                  Get my exact quote <ArrowRight size={18} />
                </a>
                <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
                  Indicative estimate only. Actual savings depend on your energy use,
                  tariff, system size and site, and aren't guaranteed — we'll confirm
                  figures in your written quote.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── What we install — cinematic bento showcase ───────────────────────────── */
// `id` is the full Unsplash path segment, e.g. 'photo-…' or 'flagged/photo-…'.
const tileImg = (id, w) =>
  `https://images.unsplash.com/${id}?q=80&auto=format&fit=crop&w=${w}`
const TILE_PANELS = 'photo-1637417494521-78b4d1d33029'        // home roof full of solar panels
const TILE_HOME = 'flagged/photo-1566838803980-56bfa5300e8c'  // craftsman home, whole system
// Battery & inverter use local brand product shots (served from /public/images).
const IMG_BATTERY = '/images/products/foxess-eq4800.jpg'      // Fox ESS battery + inverter on a wall
const IMG_INVERTER = '/images/products/afore-inverter.webp'   // hybrid inverter on a home wall

function BentoTile({ className = '', delay = 0, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={'group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] ' + className}
    >
      {children}
    </motion.div>
  )
}

// Quiet dot-separated brand list — premium restraint instead of pill chips.
function BrandsLine({ brands, className = '' }) {
  return (
    <p className={'text-[13px] font-medium leading-relaxed tracking-wide ' + className}>
      {brands.join('  ·  ')}
    </p>
  )
}

function Install() {
  return (
    <section id="products" className="bg-slate-50 px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-sky-600">What we install</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(34px,5vw,64px)] font-extrabold leading-[1.02] tracking-tight text-slate-900">
            One supplier for the
            <span className="block bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 bg-clip-text text-transparent">
              whole system.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-slate-500 sm:text-[17px]">
            Panels, batteries and inverters from the industry's most trusted
            brands — supplied and installed as one seamless system.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-6">
          {/* Solar panels — feature photo tile */}
          <BentoTile className="ring-1 ring-slate-900/5 lg:col-span-4">
            <img
              src={tileImg(TILE_PANELS, 1200)}
              srcSet={`${tileImg(TILE_PANELS, 800)} 800w, ${tileImg(TILE_PANELS, 1200)} 1200w, ${tileImg(TILE_PANELS, 1600)} 1600w`}
              sizes="(min-width: 1024px) 62vw, 100vw"
              alt="Solar panels covering a residential roof"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04070D] via-[#04070D]/30 to-transparent" />
            <div className="relative flex min-h-[380px] flex-col justify-end p-7 sm:min-h-[480px] sm:p-10">
              <span className="mb-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-md">
                <Sun size={22} className="text-amber-300" />
              </span>
              <h3 className="text-[26px] font-bold tracking-tight text-white sm:text-[32px]">Solar Panels</h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate-200 sm:text-[16px]">
                Premium Tier-1 mono panels from the brands homeowners trust.
              </p>
              <BrandsLine
                brands={['Jinko', 'Trina', 'REC', 'LONGi', 'Canadian Solar', 'Q CELLS']}
                className="mt-5 text-white/60"
              />
            </div>
          </BentoTile>

          {/* Home batteries — photo tile (Fox ESS product shot) */}
          <BentoTile className="ring-1 ring-slate-900/5 lg:col-span-2" delay={0.08}>
            <img
              src={IMG_BATTERY}
              alt="Fox ESS home battery and inverter mounted on a home wall"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[50%_38%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04070D] via-[#04070D]/15 to-transparent" />
            <div className="relative flex h-full min-h-[340px] flex-col justify-end p-7 sm:min-h-[480px] sm:p-9">
              <span className="mb-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-md">
                <BatteryCharging size={22} className="text-amber-300" />
              </span>
              <h3 className="text-[24px] font-bold tracking-tight text-white sm:text-[28px]">Home Batteries</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-200">
                Store the day, power the night with leading hybrid batteries.
              </p>
              <BrandsLine
                brands={['Tesla', 'Sungrow', 'Sigenergy', 'BYD', 'LG', 'Fox ESS']}
                className="mt-5 text-white/55"
              />
            </div>
          </BentoTile>

          {/* Smart inverters — photo tile (Afore hybrid inverter) */}
          <BentoTile className="ring-1 ring-slate-900/5 lg:col-span-2" delay={0.05}>
            <img
              src={IMG_INVERTER}
              alt="Solar hybrid inverter mounted on a home exterior wall"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[60%_45%] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04070D] via-[#04070D]/15 to-transparent" />
            <div className="relative flex h-full min-h-[340px] flex-col justify-end p-7 sm:min-h-[480px] sm:p-9">
              <span className="mb-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-md">
                <Zap size={22} className="text-sky-300" />
              </span>
              <h3 className="text-[24px] font-bold tracking-tight text-white sm:text-[28px]">Smart Inverters</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-200">
                Reliable string and hybrid inverters at the heart of your system.
              </p>
              <BrandsLine
                brands={['Fronius', 'Sungrow', 'SMA', 'GoodWe', 'Enphase', 'SolarEdge']}
                className="mt-5 text-white/55"
              />
            </div>
          </BentoTile>

          {/* Matched system — wide photo tile */}
          <BentoTile className="ring-1 ring-slate-900/5 lg:col-span-4" delay={0.12}>
            <img
              src={tileImg(TILE_HOME, 1200)}
              srcSet={`${tileImg(TILE_HOME, 800)} 800w, ${tileImg(TILE_HOME, 1200)} 1200w, ${tileImg(TILE_HOME, 1600)} 1600w`}
              sizes="(min-width: 1024px) 62vw, 100vw"
              alt="Modern home running on a complete solar system"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04070D]/92 via-[#04070D]/60 to-[#04070D]/15" />
            <div className="relative flex min-h-[340px] flex-col justify-center p-7 sm:p-10">
              <h3 className="max-w-sm text-[24px] font-bold tracking-tight text-white sm:text-[28px]">
                Matched end to end.
              </h3>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-slate-200">
                Every panel, battery and inverter is sized and paired by our team,
                so your system works as one.
              </p>
              <a
                href="#quote"
                className="group/link mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-sky-300 transition-colors hover:text-sky-200"
              >
                Get a free quote
                <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            </div>
          </BentoTile>
        </div>
      </div>
    </section>
  )
}

/* ── Packages with toggle ─────────────────────────────────────────────────── */
function Packages() {
  const [tab, setTab] = useState('residential')
  const data = {
    residential: [
      { size: '6.6', panels: '15 × 440W', tag: 'Small homes', popular: false },
      { size: '10.12', panels: '23 × 440W', tag: 'Medium homes', popular: true },
      { size: '13.2', panels: '30 × 440W', tag: 'Large homes', popular: false },
    ],
    commercial: [
      { size: '20', panels: '46 × 440W', tag: 'Small business', popular: false },
      { size: '30', panels: '69 × 440W', tag: 'Mid-size business', popular: true },
      { size: '50', panels: '114 × 440W', tag: 'Warehouse', popular: false },
    ],
  }
  return (
    <section id="packages" className="bg-slate-50 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl text-center">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-sky-600">Our solutions</p>
          <h2 className="mt-4 text-[clamp(32px,4.6vw,56px)] font-extrabold tracking-tight text-slate-900">
            Premium solar <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">packages</span>
          </h2>
          <div className="mt-8 inline-flex rounded-full border border-slate-200 bg-slate-100 p-1.5">
            {['residential', 'commercial'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative rounded-full px-5 py-2.5 text-[14px] font-bold capitalize transition-colors sm:px-8"
              >
                {tab === t && (
                  <motion.span
                    layoutId="pkgToggle"
                    className="absolute inset-0 rounded-full bg-white shadow-md shadow-slate-900/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={'relative z-10 ' + (tab === t ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800')}>
                  {t}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="mx-auto mt-10 max-w-7xl sm:mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="grid items-stretch gap-6 md:grid-cols-3 lg:gap-8"
            variants={staggerParent(0.1)}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
          >
            {data[tab].map((p) => (
              <motion.div
                key={p.size}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={
                  'relative flex flex-col rounded-[32px] p-7 sm:p-9 ' +
                  (p.popular
                    ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-2xl shadow-sky-500/30 ring-1 ring-white/20 md:-translate-y-4'
                    : 'bg-white text-slate-900 shadow-[0_4px_30px_rgba(2,8,23,0.06)] ring-1 ring-slate-200')
                }
              >
                <span className={'text-[12px] font-semibold uppercase tracking-[0.18em] ' + (p.popular ? 'text-sky-100' : 'text-sky-600')}>{p.tag}</span>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-[clamp(48px,6vw,64px)] font-extrabold leading-none tracking-tight">
                    {p.size}
                  </span>
                  <span className={'text-[22px] font-bold ' + (p.popular ? 'text-sky-100' : 'text-slate-400')}>kW</span>
                </div>
                <div className={'mt-7 space-y-3.5 text-[15px] ' + (p.popular ? 'text-sky-50' : 'text-slate-600')}>
                  {[`${p.panels} Tier-1 panels`, 'Smart hybrid inverter', 'Fully supplied & installed'].map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <span className={'grid h-6 w-6 shrink-0 place-items-center rounded-full ' + (p.popular ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-600')}>
                        <Check size={13} strokeWidth={3} />
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
                <a
                  href="#quote"
                  className={
                    'btn-sheen mt-9 block w-full rounded-2xl py-4 text-center text-[15px] font-bold transition-transform hover:scale-[1.02] ' +
                    (p.popular
                      ? 'bg-white text-blue-700 shadow-lg shadow-blue-900/20'
                      : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25')
                  }
                >
                  Get a free quote
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ── How it works ─────────────────────────────────────────────────────────────
   Scroll-driven timeline. Each step "pops up" individually as it scrolls into
   view (spring scale + lift), tied together by a connector line that fills as
   you move through the section — a glowing node lights up at each step. The
   connector reads vertically on mobile/tablet (single column) and horizontally
   on desktop (four across). Honours prefers-reduced-motion: with it on, steps
   render in place and the line/nodes show fully lit (no scroll-linked motion). */
const HOW_STEPS = [
  { n: '01', t: 'Free survey', s: 'We assess your roof and energy usage.', Icon: ClipboardCheck },
  { n: '02', t: 'System design', s: 'A tailored panel and battery layout for your home.', Icon: PencilRuler },
  { n: '03', t: 'Pro install', s: 'Professional installation by our team.', Icon: Wrench },
  { n: '04', t: 'Switch on', s: 'Start generating clean power from day one.', Icon: Power },
]

// A glowing timeline node that lights up as the scroll progress passes it.
function StepNode({ progress, index, total, reduce, icon }) {
  // Light up just before the matching card centres in the viewport.
  const lit = (index + 0.4) / total
  const glow = useTransform(progress, [lit - 0.12, lit], [0, 1])
  const litStyle = reduce ? { opacity: 1 } : { opacity: glow }
  return (
    <span className="relative grid h-10 w-10 place-items-center">
      {/* base ring */}
      <span className="absolute inset-0 rounded-full bg-white ring-1 ring-slate-200 shadow-sm" />
      {/* lit glow */}
      <motion.span
        className="absolute inset-0 rounded-full bg-sky-50 ring-2 ring-sky-400"
        style={{ ...litStyle, boxShadow: '0 0 18px 2px rgba(56,189,248,0.45)' }}
      />
      <span className="relative z-10 text-sky-600">{icon}</span>
    </span>
  )
}

// One step. Pops up with a spring the first time it enters the viewport.
function StepCard({ step, index, total, progress, reduce }) {
  const { n, t, s, Icon } = step
  return (
    <motion.div
      className="relative"
      initial={reduce ? false : { opacity: 0, y: 56, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -18% 0px' }}
      transition={{ type: 'spring', stiffness: 130, damping: 17, mass: 0.7, delay: index * 0.04 }}
    >
      {/* Node sitting on the connector line — left of the card on mobile/tablet,
          centred above it on desktop. */}
      <div className="absolute left-[3px] top-7 lg:left-1/2 lg:top-auto lg:-translate-x-1/2 lg:-top-[68px] z-10">
        <StepNode
          progress={progress}
          index={index}
          total={total}
          reduce={reduce}
          icon={<Icon size={18} />}
        />
      </div>

      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="group h-full rounded-3xl border border-slate-200 bg-white p-7 pl-20 shadow-[0_4px_30px_rgba(2,8,23,0.05)] transition-shadow hover:shadow-[0_12px_40px_rgba(2,132,199,0.12)] lg:pl-7 lg:pt-7"
      >
        <span className="text-[44px] font-extrabold leading-none text-slate-200 transition-colors duration-300 group-hover:text-sky-300">{n}</span>
        <h3 className="mt-4 text-[19px] font-bold text-slate-900">{t}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{s}</p>
      </motion.div>
    </motion.div>
  )
}

function HowItWorks() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  // Track scroll through the timeline: line starts filling as the block enters
  // the lower viewport and completes a little before it leaves the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 55%'],
  })
  // Always a real MotionValue (transforms must run unconditionally); whether we
  // *apply* the scroll-linked styles is gated on `reduce` at each use site.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const total = HOW_STEPS.length

  return (
    <section id="how-it-works" className="bg-gradient-to-b from-sky-50/60 to-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-sky-600">How it works</p>
          <h2 className="mt-4 max-w-2xl text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
            From first call to switch-on in four steps.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-14 sm:mt-16 lg:mt-28">
          {/* Connector track — vertical on mobile/tablet (single column). */}
          <div className="lg:hidden absolute left-[22px] top-8 bottom-8 w-[2px] rounded-full bg-slate-200">
            <motion.div
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-sky-400 to-blue-600"
              style={reduce ? { scaleY: 1 } : { scaleY: progress }}
            />
          </div>
          {/* Connector track — horizontal on desktop, spanning node centres. */}
          <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] -top-[48px] h-[2px] rounded-full bg-slate-200">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
              style={reduce ? { scaleX: 1 } : { scaleX: progress }}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {HOW_STEPS.map((step, i) => (
              <StepCard
                key={step.n}
                step={step}
                index={i}
                total={total}
                progress={progress}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CTA + quote form ───────────────────────────────────────────────────────
   Real, working quote form. Submits to Formspree via fetch (see FORMSPREE_ID
   config near the top of this file). Handles submitting / success / error
   states and includes a honeypot field for basic spam protection. */
const fieldCls =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100'

function CtaForm() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (FORMSPREE_ID === 'YOUR_FORM_ID') {
      setError('The form isn’t connected yet — add your Formspree form ID in the code to start collecting responses.')
      setStatus('error')
      return
    }
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const json = await res.json().catch(() => null)
        setError(json?.errors?.map((x) => x.message).join(', ') || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setError('Network error — please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <section id="quote" className="relative overflow-hidden bg-gradient-to-b from-white to-sky-50 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <DriftOrb
        className="pointer-events-none absolute -left-20 bottom-0 h-96 w-[32rem] rounded-full bg-sky-200/45 blur-[110px]"
        duration={15}
        dx={24}
        dy={-20}
      />
      <DriftOrb
        className="pointer-events-none absolute -right-12 -top-12 h-80 w-96 rounded-full bg-amber-200/40 blur-[110px]"
        duration={18}
        dx={-18}
        dy={16}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <h2 className="text-[clamp(34px,5vw,60px)] font-extrabold leading-[1.02] tracking-tight text-slate-900">
            Ready to cut your
            <br />
            power bill? <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Let's go.</span>
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-slate-600">
            Get a free, no-obligation quote tailored to your roof and energy usage.
            A SkyRa specialist will be in touch to talk it through.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            {['No-obligation', 'Free assessment', 'Tailored quote'].map((l) => (
              <span key={l} className="inline-flex items-center gap-2 text-[14px] font-semibold text-slate-700">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-sky-100 text-sky-600">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                {l}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-sky-900/10 sm:p-10"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30">
                  <Check size={30} strokeWidth={3} />
                </div>
                <h3 className="mt-5 text-[24px] font-extrabold tracking-tight text-slate-900">Request received!</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
                  Thanks for reaching out. A SkyRa specialist will be in touch shortly
                  to talk through your free, no-obligation quote.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[14px] font-semibold text-sky-600 transition-colors hover:text-sky-700"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-sky-900/10 sm:p-8"
              >
                <div className="text-[18px] font-bold text-slate-900">Get your free quote</div>
                <p className="mt-1 text-[13px] text-slate-400">Tell us a little about your place — it takes 30 seconds.</p>

                {/* honeypot — hidden from people, catches bots */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <input type="hidden" name="_subject" value="New SkyRa quote request" />

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="qf-name" className="sr-only">Full name</label>
                    <input id="qf-name" name="name" type="text" required autoComplete="name" placeholder="Full name" className={fieldCls} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="qf-email" className="sr-only">Email</label>
                    <input id="qf-email" name="email" type="email" required autoComplete="email" placeholder="Email" className={fieldCls} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="qf-phone" className="sr-only">Phone</label>
                    <input id="qf-phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" className={fieldCls} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="qf-postcode" className="sr-only">Postcode</label>
                    <input id="qf-postcode" name="postcode" type="text" required inputMode="numeric" autoComplete="postal-code" placeholder="Postcode" className={fieldCls} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="qf-bill" className="sr-only">Average quarterly bill</label>
                    <select id="qf-bill" name="quarterly_bill" defaultValue="" className={fieldCls + ' appearance-none'}>
                      <option value="" disabled>Quarterly bill</option>
                      <option>Under $300</option>
                      <option>$300 – $600</option>
                      <option>$600 – $900</option>
                      <option>$900+</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="qf-message" className="sr-only">Anything else?</label>
                    <textarea id="qf-message" name="message" rows={3} placeholder="Anything else we should know? (optional)" className={fieldCls + ' resize-none'} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-sheen mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 text-[16px] font-bold text-white shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                >
                  {status === 'submitting' ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending…</>
                  ) : (
                    <>Get my free quote <ArrowRight size={18} /></>
                  )}
                </button>

                {status === 'error' && (
                  <p role="alert" className="mt-3 text-center text-[13px] font-medium text-red-600">{error}</p>
                )}

                <p className="mt-4 text-center text-[12px] text-slate-400">No spam. We never share your details.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Why SkyRa — value props ──────────────────────────────────────────────── */
const WHY_ITEMS = [
  { Icon: Users, t: 'One team, end to end', s: 'We supply, design and install your whole system in-house — no juggling subcontractors.' },
  { Icon: ShieldCheck, t: 'Tier-1 brands only', s: "Panels, batteries and inverters from the industry's most trusted names." },
  { Icon: Home, t: 'Tailored to your roof', s: 'Every system is sized to your roof, energy use and budget — never one-size-fits-all.' },
  { Icon: MapPin, t: 'Installed Australia-wide', s: 'Solar, batteries and inverters for homes and businesses right across the country.' },
]

function WhySkyra() {
  return (
    <section id="why-skyra" className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-sky-600">Why SkyRa</p>
          <h2 className="mt-4 text-[clamp(30px,4.4vw,52px)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
            One partner for your whole
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"> switch to solar.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-slate-500">
            From the first site visit to switch-on, you deal with one team that owns
            the whole job — so nothing falls through the cracks.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_ITEMS.map(({ Icon, t, s }, i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_4px_30px_rgba(2,8,23,0.05)] transition-shadow hover:shadow-[0_12px_40px_rgba(2,132,199,0.12)]">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={26} />
                </span>
                <h3 className="mt-6 text-[19px] font-bold tracking-tight text-slate-900">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-500">{s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FAQ — accordion ──────────────────────────────────────────────────────── */
const FAQS = [
  ['What’s included in a SkyRa system?', 'Solar panels, an inverter, mounting and full installation — plus an optional home battery. We supply and fit the lot as one matched system.'],
  ['How much could I save?', 'It depends on your energy use, tariff, roof and system size. The calculator above gives an indicative estimate; we confirm exact figures in your written quote.'],
  ['Do you install for businesses too?', 'Yes — we design and install both residential and commercial systems for customers across Australia.'],
  ['How long does installation take?', 'Many home installs are completed in a single day once your system is designed and approved. You’ll get a clear timeline with your quote.'],
  ['Is the quote really free?', 'Yes. Quotes and site assessments are completely free and come with no obligation.'],
]

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-sky-600">FAQ</p>
          <h2 className="mt-4 text-[clamp(30px,4.2vw,48px)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
            Questions, answered.
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-slate-500">
            Everything worth knowing before you go solar. Still unsure about something?
            We're happy to talk it through — no pressure.
          </p>
          <a
            href="#quote"
            className="btn-sheen mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-[15px] font-bold text-white shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.03]"
          >
            Ask us anything <ArrowRight size={16} />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-5 shadow-[0_4px_30px_rgba(2,8,23,0.05)] sm:px-7">
            {FAQS.map(([q, a], i) => {
              const isOpen = open === i
              return (
                <div key={q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[16px] font-bold text-slate-900 sm:text-[17px]">{q}</span>
                    <span
                      className={
                        'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ' +
                        (isOpen
                          ? 'rotate-180 border-sky-200 bg-sky-50 text-sky-600'
                          : 'border-slate-200 text-slate-500')
                      }
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-[15px] leading-relaxed text-slate-500">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <SunMark size={26} />
          <span className="text-[17px] font-extrabold tracking-tight text-slate-900">SkyRa<span className="font-medium text-sky-600"> Energy</span></span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-slate-500">
          <a href="#products" className="cursor-pointer transition-colors hover:text-sky-600">Products</a>
          <a href="#packages" className="cursor-pointer transition-colors hover:text-sky-600">Packages</a>
          <a href="#why-skyra" className="cursor-pointer transition-colors hover:text-sky-600">Why SkyRa</a>
          <a href="#faq" className="cursor-pointer transition-colors hover:text-sky-600">FAQ</a>
          <a href="#quote" className="cursor-pointer transition-colors hover:text-sky-600">Contact</a>
        </div>
        <span className="text-[13px] text-slate-400">© 2026 SkyRa Energy</span>
      </div>
    </footer>
  )
}

export default function RecommendedHomepage() {
  return (
    <div className="min-h-screen bg-white">
      <BackToTop />
      <main>
        <Hero />
        <TrustStrip />
        <Calculator />
        <Install />
        <WhySkyra />
        <Packages />
        <HowItWorks />
        <Faq />
        <CtaForm />
      </main>
      <Footer />
    </div>
  )
}
