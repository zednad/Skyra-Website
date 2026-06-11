// ─────────────────────────────────────────────────────────────────────────────
//  SkyRa Energy — Homepage (regulator-review variant)
//  Compliance-conscious cut of the "03 Recommended" homepage: all unverified
//  claims removed (no CEC accreditation, warranty, blanket savings %, "most
//  popular", service SLAs, app features or testimonials) so nothing on the page
//  asserts something not yet certified or enabled. The savings calculator is
//  kept but clearly labelled an indicative estimate.
//  Flow: hero (with built-in nav) → trust strip → savings calculator →
//  what we install → packages (residential/commercial toggle) → how it works →
//  quote-form CTA → footer. Headings are upright (no italics) per brand pref.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useId } from 'react'
import {
  motion, AnimatePresence, animate, useMotionValue, useReducedMotion,
  useScroll, useSpring, useTransform,
} from 'framer-motion'
import {
  ArrowRight, ArrowUp, Phone, Check, Zap, Sun, BatteryCharging, Gauge,
  ClipboardCheck, PencilRuler, Wrench, Power, ChevronDown, Menu, X,
} from 'lucide-react'

// Responsive hero. Unsplash resizes via the `w` param, so phones download a
// ~640–1080px image instead of the full 2670px. `sizes="100vw"` (full-bleed).
const HERO_BASE =
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&auto=format&fit=crop'
const HERO_SRCSET = [640, 828, 1080, 1440, 1920, 2670]
  .map((w) => `${HERO_BASE}&w=${w} ${w}w`)
  .join(', ')
const HERO_IMG = `${HERO_BASE}&w=1280`

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

// Thin gradient bar along the top edge showing reading progress.
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-sky-400 via-sky-500 to-amber-400"
      style={{ scaleX }}
      aria-hidden="true"
    />
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
          className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-[#0C1A2E]/90 text-white shadow-lg shadow-black/25 ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-[#13294a]"
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
   SkyRa = Sky + Ra (the sun). A crafted sun mark: a sky-gradient disc with a
   warm amber ray-burst and a soft glow. Crisp SVG so it stays sharp from the
   24px footer mark up to large sizes. useId keeps gradient ids unique per use. */
function SunMark({ size = 28, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const core = `sk-core-${uid}`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 1px 5px rgba(14,165,233,0.5))' }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={core} cx="36%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#EAF7FF" />
          <stop offset="44%" stopColor="#5CC4F5" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
      </defs>
      <g stroke="#FBBF24" strokeWidth="2.4" strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="20" y1="3.6" x2="20" y2="9.6" transform={`rotate(${i * 45} 20 20)`} />
        ))}
      </g>
      <circle cx="20" cy="20" r="8.2" fill={`url(#${core})`} />
      <circle cx="16.8" cy="16.8" r="2.5" fill="#FFFFFF" opacity="0.55" />
    </svg>
  )
}

/* ── Nav ──────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  ['Products', '#products'],
  ['Packages', '#packages'],
  ['Why Solar', '#why-solar'],
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-6 lg:px-12"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div
        className={
          'mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-2.5 backdrop-blur-md transition-all duration-300 sm:px-5 sm:py-3 ' +
          (scrolled
            ? 'border-white/10 bg-[#0C1A2E]/90 shadow-lg shadow-black/25'
            : 'border-white/10 bg-white/10')
        }
      >
        <a href="#top" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <SunMark size={28} />
          <span className="whitespace-nowrap text-[18px] font-bold text-white sm:text-[19px]">
            SkyRa<span className="hidden font-light text-[#7DD3FC] min-[380px]:inline"> Energy</span>
          </span>
        </a>
        <div className="hidden items-center gap-8 text-[14px] font-medium text-white/85 md:flex">
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} className="cursor-pointer transition-colors hover:text-white">{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#quote" className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white py-1.5 pl-4 pr-1.5 text-[13px] font-bold text-[#0F1A2E] transition-transform hover:scale-[1.03] sm:gap-2.5 sm:py-2 sm:pl-5 sm:pr-2 sm:text-[14px]">
            Get Quote
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0F1A2E] text-white sm:h-8 sm:w-8">
              <Phone size={13} />
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#0C1A2E]/95 backdrop-blur-xl md:hidden"
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
                  className="rounded-xl px-4 py-3 text-[15px] font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white"
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

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  // Background drifts down slower than the page scrolls (gentle parallax).
  const parallaxY = useTransform(scrollY, [0, 700], [0, 110])
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-[#0C1A2E]">
      <motion.img
        src={HERO_IMG}
        srcSet={HERO_SRCSET}
        sizes="100vw"
        fetchPriority="high"
        alt="Solar panels on an Australian home"
        className="absolute inset-x-0 top-0 h-[115%] w-full object-cover opacity-70"
        style={{ y: reduce ? 0 : parallaxY }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A2E] via-[#0C1A2E]/40 to-black/40" />
      <DriftOrb
        className="pointer-events-none absolute -right-24 top-16 h-96 w-[36rem] rounded-full bg-[#0EA5E9]/30 blur-[110px]"
        duration={16}
        dx={-26}
        dy={28}
      />
      <Nav />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="max-w-3xl">
          <motion.div variants={staggerParent(0.14, 0.25)} initial="hidden" animate="show">
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(44px,8.5vw,108px)] font-extrabold leading-[0.95] tracking-tight text-white"
            >
              Go Solar.
              <span className="text-shimmer mt-1 block pb-1 text-[clamp(32px,7.6vw,98px)] leading-[0.95]">
                Clean energy for your home.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/85 sm:mt-7 sm:text-[18px]"
            >
              SkyRa supplies and installs solar panels, home batteries and inverters
              for homes and businesses across Australia.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a href="#quote" className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white py-3 pl-7 pr-2.5 text-[16px] font-bold text-[#0F1A2E] shadow-xl transition-transform hover:scale-[1.04] sm:w-auto sm:py-2.5">
                Get Free Quote
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0F1A2E] text-white sm:h-11 sm:w-11">
                  <ArrowRight size={18} />
                </span>
              </a>
              <a href="#quote" className="w-full rounded-full border border-white/30 px-7 py-3.5 text-center text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto">
                Book a free assessment
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/50"
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
  // Brands drawn from the "What we install" card lists below.
  const brands = ['Jinko', 'Tesla', 'Trina', 'Sungrow', 'Fronius', 'REC', 'LONGi', 'SMA', 'GoodWe', 'Enphase']
  const fade = {
    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
  }
  return (
    <div className="border-y border-slate-100 bg-slate-50/70">
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
                  <span key={b} className="text-[20px] font-extrabold tracking-tight text-slate-400">{b}</span>
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
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-sky-600">Try it</span>
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
            <div className="relative overflow-hidden rounded-[28px] bg-[#0C1A2E] p-6 text-white shadow-2xl sm:p-9 lg:p-10">
              <DriftOrb
                className="pointer-events-none absolute -right-12 -top-16 h-56 w-72 rounded-full bg-[#0EA5E9]/30 blur-[70px]"
                duration={12}
                dx={-20}
                dy={18}
              />
              <div className="relative">
                <div className="text-[13px] font-semibold uppercase tracking-wider text-sky-300/80">Estimated saving</div>
                <div className="mt-2 text-[clamp(48px,8vw,80px)] font-extrabold leading-none">
                  $<AnimatedNumber value={saving} formatFn={(v) => Math.round(v).toLocaleString()} />
                  <span className="text-[22px] font-semibold text-slate-400"> /yr</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
                    <Gauge size={20} className="text-sky-400" />
                    <div className="mt-3 whitespace-nowrap text-[22px] font-extrabold leading-none sm:text-[26px]">
                      <AnimatedNumber value={payback} formatFn={(v) => v.toFixed(1)} /> yr
                    </div>
                    <div className="mt-1 text-[12px] text-slate-400">Estimated payback</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
                    <Sun size={20} className="text-amber-400" />
                    <div className="mt-3 whitespace-nowrap text-[22px] font-extrabold leading-none sm:text-[26px]">
                      <AnimatedNumber value={co2} formatFn={(v) => v.toFixed(1)} />t
                    </div>
                    <div className="mt-1 text-[12px] text-slate-400">CO₂ avoided / yr</div>
                  </div>
                </div>
                <a href="#quote" className="btn-sheen mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 py-4 text-[16px] font-bold text-white shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02]">
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

/* ── What we install — panels, batteries & inverters ──────────────────────── */
function Install() {
  const cards = [
    {
      Icon: Sun,
      t: 'Solar Panels',
      s: 'Premium Tier-1 mono panels from the brands homeowners trust.',
      c: 'from-sky-400 to-blue-600',
      brands: ['Jinko', 'Trina', 'REC', 'LONGi', 'Canadian Solar', 'Q CELLS'],
    },
    {
      Icon: BatteryCharging,
      t: 'Home Batteries',
      s: 'Store the day, power the night with leading hybrid batteries.',
      c: 'from-amber-400 to-orange-600',
      brands: ['Tesla', 'Sungrow', 'Sigenergy', 'BYD', 'LG', 'Fox ESS'],
    },
    {
      Icon: Zap,
      t: 'Smart Inverters',
      s: 'Reliable string and hybrid inverters.',
      c: 'from-cyan-500 to-sky-700',
      brands: ['Fronius', 'Sungrow', 'SMA', 'GoodWe', 'Enphase', 'SolarEdge'],
    },
  ]
  return (
    <section id="products" className="bg-slate-50 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-sky-600">What we install</p>
          <h2 className="mt-3 max-w-2xl text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
            One supplier for the whole system.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-500">
            Panels, batteries and inverters from the industry's most trusted brands —
            all supplied and installed by SkyRa.
          </p>
        </Reveal>
        <motion.div
          className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3 lg:gap-8"
          variants={staggerParent()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {cards.map((c) => (
            <motion.div
              key={c.t}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200/70 transition-shadow duration-300 hover:shadow-xl sm:p-8"
            >
              <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c.c} text-white shadow-lg shadow-slate-900/5 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}>
                <c.Icon size={25} strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-[20px] font-bold tracking-tight text-slate-900">{c.t}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-500">{c.s}</p>
              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Brands we install
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.brands.map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[12.5px] font-semibold text-slate-600 transition-colors group-hover:border-slate-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
    <section id="packages" className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl text-center">
        <Reveal>
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-sky-600">Our solutions</p>
          <h2 className="mt-3 text-[clamp(32px,4.6vw,56px)] font-extrabold tracking-tight text-slate-900">
            Premium solar <span className="text-sky-600">packages</span>
          </h2>
          <div className="mt-8 inline-flex rounded-full bg-slate-100 p-2">
            {['residential', 'commercial'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative rounded-full px-5 py-3 text-[14px] font-bold capitalize transition-colors sm:px-8"
              >
                {tab === t && (
                  <motion.span
                    layoutId="pkgToggle"
                    className="absolute inset-0 rounded-full bg-white shadow"
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
                  'relative flex flex-col rounded-[28px] p-7 sm:p-9 ' +
                  (p.popular
                    ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl md:-translate-y-4 ring-1 ring-slate-700'
                    : 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200')
                }
              >
                <span className={'text-[12px] font-bold uppercase tracking-wide ' + (p.popular ? 'text-sky-400' : 'text-sky-600')}>{p.tag}</span>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-[clamp(48px,6vw,64px)] font-extrabold leading-none tracking-tight">{p.size}</span>
                  <span className="text-[22px] font-bold text-slate-400">kW</span>
                </div>
                <div className={'mt-7 space-y-3.5 text-[15px] ' + (p.popular ? 'text-slate-300' : 'text-slate-600')}>
                  {[`${p.panels} Tier-1 panels`, 'Smart hybrid inverter', 'Fully supplied & installed'].map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <span className={'grid h-6 w-6 shrink-0 place-items-center rounded-full ' + (p.popular ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-600')}>
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
                      ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                      : 'bg-slate-900 text-white')
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

/* ── How it works ─────────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: '01', t: 'Free survey', s: 'We assess your roof and energy usage.', Icon: ClipboardCheck },
    { n: '02', t: 'System design', s: 'A tailored panel and battery layout for your home.', Icon: PencilRuler },
    { n: '03', t: 'Pro install', s: 'Professional installation by our team.', Icon: Wrench },
    { n: '04', t: 'Switch on', s: 'Start generating clean power from day one.', Icon: Power },
  ]
  return (
    <section id="how-it-works" className="bg-[#0C1A2E] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-sky-400">How it works</p>
          <h2 className="mt-3 max-w-2xl text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.05] tracking-tight text-white">
            From first call to switch-on in four steps.
          </h2>
        </Reveal>
        <motion.div
          className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {steps.map((s) => (
            <motion.div
              key={s.n}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition-colors hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-500/15 text-sky-400 ring-1 ring-sky-400/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-500/25">
                  <s.Icon size={24} />
                </span>
                <span className="text-[44px] font-extrabold text-white/10 transition-colors duration-300 group-hover:text-sky-400/25">{s.n}</span>
              </div>
              <h3 className="mt-6 text-[19px] font-bold text-white">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{s.s}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── CTA + quote form ─────────────────────────────────────────────────────── */
function CtaForm() {
  return (
    <section id="quote" className="relative overflow-hidden bg-[#0C1A2E] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <DriftOrb
        className="pointer-events-none absolute -left-20 bottom-0 h-96 w-[32rem] rounded-full bg-[#0EA5E9]/20 blur-[110px]"
        duration={15}
        dx={24}
        dy={-20}
      />
      <DriftOrb
        className="pointer-events-none absolute -right-12 -top-12 h-80 w-96 rounded-full bg-[#F59E0B]/15 blur-[110px]"
        duration={18}
        dx={-18}
        dy={16}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <h2 className="text-[clamp(34px,5vw,60px)] font-extrabold leading-[1.02] tracking-tight text-white">
            Ready to cut your
            <br />
            power bill? <span className="text-[#7DD3FC]">Let's go.</span>
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/80">
            Get a free, no-obligation quote tailored to your roof and energy usage.
            A SkyRa specialist will be in touch to talk it through.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            {['No-obligation', 'Free assessment', 'Tailored quote'].map((l) => (
              <span key={l} className="inline-flex items-center gap-2 text-[14px] font-semibold text-white/85">
                <Check size={16} className="text-sky-400" /> {l}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8">
            <div className="text-[18px] font-bold text-white">Get your free quote</div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[['Full name', 'col-span-2'], ['Email', 'col-span-2'], ['Postcode', ''], ['Quarterly bill', '']].map(([ph, cls]) => (
                <div key={ph} className={cls}>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[14px] text-white/40">{ph}</div>
                </div>
              ))}
            </div>
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-[16px] font-bold text-[#0F1A2E] transition-transform hover:scale-[1.02]">
              Get my free quote <ArrowRight size={18} />
            </button>
            <p className="mt-4 text-center text-[12px] text-white/45">No spam. We never share your details.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#08111E] px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <SunMark size={26} />
          <span className="text-[17px] font-bold text-white">SkyRa<span className="font-light text-[#7DD3FC]"> Energy</span></span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-slate-400">
          <a href="#products" className="cursor-pointer transition-colors hover:text-white">Products</a>
          <a href="#packages" className="cursor-pointer transition-colors hover:text-white">Packages</a>
          <a href="#how-it-works" className="cursor-pointer transition-colors hover:text-white">About</a>
          <a href="#quote" className="cursor-pointer transition-colors hover:text-white">Contact</a>
        </div>
        <span className="text-[13px] text-slate-500">© 2026 SkyRa Energy</span>
      </div>
    </footer>
  )
}

export default function RecommendedHomepage() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <BackToTop />
      <main>
        <Hero />
        <TrustStrip />
        <Calculator />
        <Install />
        <Packages />
        <HowItWorks />
        <CtaForm />
      </main>
      <Footer />
    </div>
  )
}
