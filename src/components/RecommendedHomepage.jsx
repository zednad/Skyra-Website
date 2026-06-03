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
import { useState, useEffect } from 'react'
import {
  motion, AnimatePresence, animate, useMotionValue, useReducedMotion,
} from 'framer-motion'
import {
  ArrowRight, Phone, Check, Zap, Sun, BatteryCharging, Gauge,
  ClipboardCheck, PencilRuler, Wrench, Power, ChevronDown,
} from 'lucide-react'

const HERO_IMG =
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2670&auto=format&fit=crop'

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

/* Glowing brand orb */
function SunOrb({ size = 26 }) {
  return (
    <span
      className="relative inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 34% 30%, #BAE6FD, #0EA5E9 52%, #0369A1)',
        boxShadow: '0 0 14px 2px rgba(14,165,233,0.55), inset 0 1px 1px rgba(255,255,255,0.45)',
      }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle at 30% 26%, rgba(255,255,255,0.55), transparent 55%)' }}
      />
    </span>
  )
}

/* ── Nav ──────────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <motion.div
      className="absolute inset-x-0 top-0 z-20 px-6 pt-6 lg:px-12"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <SunOrb size={26} />
          <span className="text-[19px] font-bold text-white">
            SkyRa<span className="font-light text-[#7DD3FC]"> Energy</span>
          </span>
        </div>
        <div className="hidden items-center gap-8 text-[14px] font-medium text-white/85 md:flex">
          <a href="#products" className="cursor-pointer transition-colors hover:text-white">Products</a>
          <a href="#packages" className="cursor-pointer transition-colors hover:text-white">Packages</a>
          <a href="#why-solar" className="cursor-pointer transition-colors hover:text-white">Why Solar</a>
        </div>
        <a href="#quote" className="inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-5 pr-2 text-[14px] font-bold text-[#0F1A2E] transition-transform hover:scale-[1.03]">
          Get Quote
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0F1A2E] text-white">
            <Phone size={14} />
          </span>
        </a>
      </div>
    </motion.div>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#0C1A2E]">
      <motion.img
        src={HERO_IMG}
        alt="Solar panels on an Australian home"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A2E] via-[#0C1A2E]/40 to-black/40" />
      <div className="pointer-events-none absolute -right-24 top-16 h-96 w-[36rem] rounded-full bg-[#0EA5E9]/30 blur-[110px]" />
      <Nav />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-20 pt-36 lg:px-12">
        <div className="max-w-3xl">
          <motion.div variants={staggerParent(0.14, 0.25)} initial="hidden" animate="show">
            <motion.div
              variants={fadeUp}
              className="text-[clamp(52px,8.5vw,108px)] font-extrabold leading-[0.9] tracking-tight text-white"
            >
              Go Solar.
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="text-[clamp(46px,7.6vw,98px)] font-extrabold leading-[0.92] tracking-tight text-[#7DD3FC]"
            >
              Clean energy for your home.
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/85 sm:text-[18px]"
            >
              SkyRa supplies and installs solar panels, home batteries and inverters
              for homes and businesses across Australia.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#quote" className="inline-flex items-center gap-3 rounded-full bg-white py-2.5 pl-7 pr-2.5 text-[16px] font-bold text-[#0F1A2E] shadow-xl transition-transform hover:scale-[1.04]">
                Get Free Quote
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#0F1A2E] text-white">
                  <ArrowRight size={18} />
                </span>
              </a>
              <a href="#quote" className="rounded-full border border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10">
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
  return (
    <div className="border-y border-slate-100 bg-slate-50/70">
      <motion.div
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-8 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[13px] font-semibold uppercase tracking-wider text-slate-400">Tier-1 brands we install</span>
        {['Jinko', 'Tesla', 'Trina', 'Sungrow', 'Fronius'].map((b) => (
          <span key={b} className="text-[20px] font-extrabold tracking-tight text-slate-400">{b}</span>
        ))}
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
    <section id="why-solar" className="bg-white px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
            <div className="relative overflow-hidden rounded-[28px] bg-[#0C1A2E] p-9 text-white shadow-2xl lg:p-10">
              <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-72 rounded-full bg-[#0EA5E9]/30 blur-[70px]" />
              <div className="relative">
                <div className="text-[13px] font-semibold uppercase tracking-wider text-sky-300/80">Estimated saving</div>
                <div className="mt-2 text-[clamp(48px,8vw,80px)] font-extrabold leading-none">
                  $<AnimatedNumber value={saving} formatFn={(v) => Math.round(v).toLocaleString()} />
                  <span className="text-[22px] font-semibold text-slate-400"> /yr</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                    <Gauge size={20} className="text-sky-400" />
                    <div className="mt-3 text-[26px] font-extrabold leading-none">
                      <AnimatedNumber value={payback} formatFn={(v) => v.toFixed(1)} /> yr
                    </div>
                    <div className="mt-1 text-[12px] text-slate-400">Estimated payback</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                    <Sun size={20} className="text-amber-400" />
                    <div className="mt-3 text-[26px] font-extrabold leading-none">
                      <AnimatedNumber value={co2} formatFn={(v) => v.toFixed(1)} />t
                    </div>
                    <div className="mt-1 text-[12px] text-slate-400">CO₂ avoided / yr</div>
                  </div>
                </div>
                <a href="#quote" className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 py-4 text-[16px] font-bold text-white shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02]">
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
    <section id="products" className="bg-slate-50 px-6 py-24 lg:px-8 lg:py-32">
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
          className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8"
          variants={staggerParent()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {cards.map((c) => (
            <motion.div
              key={c.t}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group flex flex-col rounded-3xl bg-white p-9 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-xl"
            >
              <span className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${c.c} text-white shadow-lg`}>
                <c.Icon size={28} />
              </span>
              <h3 className="mt-6 text-[22px] font-bold text-slate-900">{c.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-500">{c.s}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.brands.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-[13px] font-semibold text-slate-600 ring-1 ring-slate-200/70"
                  >
                    {b}
                  </span>
                ))}
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
    <section id="packages" className="bg-white px-6 py-24 lg:px-8 lg:py-32">
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
                className="relative rounded-full px-8 py-3 text-[14px] font-bold capitalize transition-colors"
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
      <div className="mx-auto mt-14 max-w-7xl">
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
                  'relative flex flex-col rounded-[28px] p-9 ' +
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
                    'mt-9 block w-full rounded-2xl py-4 text-center text-[15px] font-bold transition-transform hover:scale-[1.02] ' +
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
    <section id="how-it-works" className="bg-[#0C1A2E] px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-sky-400">How it works</p>
          <h2 className="mt-3 max-w-2xl text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.05] tracking-tight text-white">
            From first call to switch-on in four steps.
          </h2>
        </Reveal>
        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
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
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition-colors hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-500/15 text-sky-400 ring-1 ring-sky-400/30">
                  <s.Icon size={24} />
                </span>
                <span className="text-[44px] font-extrabold text-white/10">{s.n}</span>
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
    <section id="quote" className="relative overflow-hidden bg-[#0C1A2E] px-6 py-24 lg:px-8 lg:py-32">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-96 w-[32rem] rounded-full bg-[#0EA5E9]/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-80 w-96 rounded-full bg-[#F59E0B]/15 blur-[110px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
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
          <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl">
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
    <footer className="bg-[#08111E] px-6 py-14 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <SunOrb size={24} />
          <span className="text-[17px] font-bold text-white">SkyRa<span className="font-light text-[#7DD3FC]"> Energy</span></span>
        </div>
        <div className="flex gap-8 text-[14px] text-slate-400">
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
