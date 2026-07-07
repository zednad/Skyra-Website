// ─────────────────────────────────────────────────────────────────────────────
//  Homepage. Flow: photo hero (promise) → rebate banner (the deal) → what we
//  install (the product) → day-to-night story (how it works) → calculator
//  (your numbers) → packages (pick a starting size) → why SkyRa (trust) →
//  how it works (process) → brands → FAQ (objections) → quote form (action).
//  Each scroll answers the question the previous one raises; the CTA band was
//  dropped because the quote form directly follows the FAQ.
// ─────────────────────────────────────────────────────────────────────────────
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BadgeCheck, Check, FileCheck2, MapPin, Sun } from 'lucide-react'
import EnergyStory from '../../components/EnergyStory'
import {
  BrandStrip, CalculatorSection, EditorialBreak, FaqSection, QuoteSection,
  RebateBanner, SnapCarousel, StepsSection,
} from '../sections'
import { GENERAL_FAQS } from '../faqData'
import { BTN, CARD_HOVER, CtaLink, EASE, H2, Kicker, Meta, Photo, Reveal, TruthChip } from '../shared'

/* ── Hero ─────────────────────────────────────────────────────────────── */
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} className="grain relative isolate overflow-hidden bg-[#0a1b2e]">
      {/* Ken Burns settle + scroll parallax on a wrapper: the img itself is
          the LCP element, so only transforms, never opacity. The vertical
          overdraw stops the parallax exposing the photo's edges. */}
      <motion.div
        style={reduce ? undefined : { y: parallaxY }}
        initial={reduce ? false : { scale: 1.07 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6.5, ease: 'easeOut' }}
        className="absolute inset-x-0 -inset-y-[6%]"
      >
        <Photo
          base="hero-install"
          widths={[768, 1280, 1920]}
          sizes="100vw"
          alt="SkyRa installers fitting solar panels on an Australian home"
          eager
          className="h-full w-full object-cover object-[72%_38%]"
        />
      </motion.div>
      {/* scrims: left for copy, bottom vignette, stronger bottom on mobile */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1b2e]/92 via-[#0a1b2e]/55 to-[#0a1b2e]/10" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-[#0a1b2e]/35 via-transparent to-transparent sm:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b2e]/80 via-transparent to-transparent sm:hidden" />

      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div variants={heroStagger} initial="hidden" animate="show" className="max-w-2xl">
          <motion.p
            variants={heroItem}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-amber-300 ring-1 ring-white/15"
          >
            <Sun size={13} /> Solar · Batteries · Inverters
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-6 text-[clamp(36px,5.6vw,64px)] font-extrabold leading-[1.05] tracking-tight text-white"
          >
            Solar &amp; battery systems, installed by one local team.
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-4 max-w-xl text-pretty text-[15.5px] leading-relaxed text-slate-200 sm:mt-5 sm:text-[18px]"
          >
            Around 30% off home batteries with the federal rebate.
            <span className="hidden sm:inline">
              {' '}We design the system, handle the paperwork and install it as
              one job, for homes and businesses across Australia.
            </span>
            <span className="sm:hidden">
              {' '}One local team designs it, installs it and handles the paperwork.
            </span>
          </motion.p>
          <motion.div variants={heroItem} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <CtaLink to="/contact">Get my free quote</CtaLink>
            <CtaLink to="/batteries" variant="ghost">Explore home batteries</CtaLink>
          </motion.div>
          <motion.div variants={heroItem} className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5 sm:mt-9 sm:gap-y-3">
            <TruthChip icon={Check}>Free, no-obligation quote</TruthChip>
            <TruthChip icon={FileCheck2}>Rebate paperwork done for you</TruthChip>
            <TruthChip icon={BadgeCheck}>Tier-1 hardware only</TruthChip>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── What we install - photo bento ────────────────────────────────────── */
function BentoTile({ to, title, text, base, widths, img, alt, className = '', delay = 0, sizes }) {
  return (
    <Reveal delay={delay} className={className}>
      <Link
        to={to}
        className="group relative block h-full min-h-[240px] overflow-hidden rounded-2xl ring-1 ring-slate-900/10 sm:min-h-[380px]"
      >
        {img ? (
          <img
            src={img}
            alt={alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <Photo
            base={base}
            widths={widths}
            sizes={sizes}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b2e] via-[#0a1b2e]/45 to-[#0a1b2e]/5" />
        <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
          <h3 className="text-[22px] font-bold tracking-tight text-white sm:text-[26px]">{title}</h3>
          <p className="mt-1.5 max-w-md text-[14.5px] leading-relaxed text-slate-200">{text}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-amber-300">
            Learn more
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

function WhatWeInstall() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Kicker>What we install</Kicker>
          <H2>One supplier for the whole system.</H2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            Panels, batteries and inverters, sized and paired by the same team
            that installs them, so everything works as one.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-6">
          <BentoTile
            className="lg:col-span-4"
            to="/solar"
            title="Solar panels"
            text="Premium Tier-1 panels, laid out for your roof and your usage, not a one-size-fits-all kit."
            base="bento-panels"
            widths={[800, 1400]}
            sizes="(min-width:1024px) 62vw, 100vw"
            alt="Completed all-black solar array on a terracotta roof"
          />
          <BentoTile
            className="lg:col-span-2"
            delay={0.06}
            to="/batteries"
            title="Home batteries"
            text="Store the day, power the night, with backup for the moments the grid drops out."
            base="battery-garage"
            widths={[640, 1100]}
            sizes="(min-width:1024px) 32vw, 100vw"
            alt="Home battery neatly installed in a garage"
          />
          <BentoTile
            className="lg:col-span-2"
            delay={0.04}
            to="/solar"
            title="Smart inverters"
            text="The quiet workhorse of the system: hybrid-ready and monitored from your phone."
            img="/images/products/afore-inverter.webp"
            alt="Hybrid solar inverter mounted on a home wall"
          />
          <BentoTile
            className="lg:col-span-4"
            delay={0.08}
            to="/commercial"
            title="Commercial solar"
            text="Cut operating costs with a system engineered for your roof, tariff and daytime load."
            base="commercial-roof"
            widths={[800, 1400]}
            sizes="(min-width:1024px) 62vw, 100vw"
            alt="Commercial warehouse roof covered in solar panels"
          />
        </div>
      </div>
    </section>
  )
}

/* ── Why SkyRa - photo cards ──────────────────────────────────────────── */
const WHY = [
  {
    base: 'why-team',
    alt: 'SkyRa installer on a rooftop',
    t: 'Installed by our team',
    s: 'The people who quote your job are the people who put it on your roof: one team, accountable end to end.',
  },
  {
    base: 'install-detail',
    widths: [800, 1400],
    alt: 'Torque tool tightening a solar panel clamp',
    t: 'Built to be checked',
    s: 'Tier-1 panels, quality rails and clean switchboard work. We install like the next person to see it is an inspector.',
  },
  {
    base: 'consult-table',
    alt: 'SkyRa consultant explaining a design at a kitchen table',
    t: 'Paperwork handled',
    s: 'Rebate applications, grid approvals and metering: we run the process so you don’t have to chase anyone.',
  },
  {
    base: 'handover',
    alt: 'Installer handing documents to a smiling homeowner',
    t: 'Here after switch-on',
    s: 'A proper handover, monitoring set up on your phone, and a local team you can actually reach afterwards.',
  },
]

function WhyCard({ base, widths, alt, t, s }) {
  return (
    <div className={'group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white ' + CARD_HOVER}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo
          base={base}
          widths={widths || [640, 1100]}
          sizes="(min-width:1024px) 24vw, (min-width:640px) 46vw, 80vw"
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="min-w-0 p-4 sm:p-5">
        <h3 className="text-[15.5px] font-bold text-slate-900 sm:text-[16.5px]">{t}</h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500 sm:text-[14px]">{s}</p>
      </div>
    </div>
  )
}

function WhySkyra() {
  return (
    <section className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Kicker>Why SkyRa</Kicker>
          <H2>A solar company you can hold to its word.</H2>
        </Reveal>
        {/* Phones: swipeable snap cards with edge peek. */}
        <Reveal className="mt-8 sm:hidden">
          <SnapCarousel ariaLabel="Why choose SkyRa">
            {WHY.map((w) => <WhyCard key={w.t} {...w} />)}
          </SnapCarousel>
        </Reveal>
        {/* Larger screens: the card grid. */}
        <div className="mt-10 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.06}>
              <WhyCard {...w} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Packages ─────────────────────────────────────────────────────────── */
const PACKAGES = {
  residential: [
    { size: '6.6', panels: '15 × 440 W panels', tag: 'Smaller homes', popular: false },
    { size: '10.1', panels: '23 × 440 W panels', tag: 'Family homes', popular: true },
    { size: '13.2', panels: '30 × 440 W panels', tag: 'Large homes & pools', popular: false },
  ],
  commercial: [
    { size: '20', panels: '46 × 440 W panels', tag: 'Small business', popular: false },
    { size: '30', panels: '69 × 440 W panels', tag: 'Mid-size business', popular: true },
    { size: '50', panels: '114 × 440 W panels', tag: 'Warehouse & industrial', popular: false },
  ],
}

function PackageCard({ p }) {
  return (
    <div
      className={
        'relative flex h-full flex-col rounded-2xl p-5 ring-1 sm:p-8 ' +
        (p.popular
          ? 'bg-[#0a1b2e] text-white ring-white/10 shadow-navy-card'
          : 'bg-white text-slate-900 ring-slate-200 shadow-card transition-[translate,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-slate-300')
      }
    >
      {p.popular && (
        <span className="absolute right-5 top-5 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-950 shadow-cta ring-2 ring-amber-300/30 sm:right-6 sm:top-6">
          Most chosen
        </span>
      )}
      <span className={'text-[12px] font-bold uppercase tracking-[0.16em] ' + (p.popular ? 'text-amber-300' : 'text-amber-700')}>
        {p.tag}
      </span>
      <div className="mt-2 flex items-baseline gap-1.5 sm:mt-3">
        <span className="text-[44px] font-extrabold leading-none tracking-tight tabular-nums sm:text-[52px]">{p.size}</span>
        <span className="text-[20px] font-bold text-slate-400">kW</span>
      </div>
      {/* Phones list only what differs per size; the shared inclusions
          sit once under the grid. */}
      <ul className={'mt-4 space-y-3 text-[14.5px] sm:mt-6 ' + (p.popular ? 'text-slate-200' : 'text-slate-600')}>
        {[p.panels, 'Smart hybrid-ready inverter', 'Battery-ready design', 'Fully supplied & installed'].map((f, fi) => (
          <li key={f} className={'items-center gap-2.5 ' + (fi === 0 ? 'flex' : 'hidden sm:flex')}>
            <span className={'grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full ' + (p.popular ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-100 text-amber-700')}>
              <Check size={12} strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className={
          'mt-5 block w-full rounded-xl py-3.5 text-center text-[14.5px] sm:mt-8 ' +
          (p.popular ? BTN.primary : BTN.navy)
        }
      >
        Get exact pricing
      </Link>
    </div>
  )
}

function Packages() {
  const [tab, setTab] = useState('residential')
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <Kicker>Popular system sizes</Kicker>
          <H2>Start from a proven size, tuned to your home.</H2>
          <div className="mt-8 inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1.5">
            {['residential', 'commercial'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  'relative min-h-11 rounded-lg px-6 py-2.5 text-[14px] font-bold capitalize transition-colors sm:px-8 ' +
                  (tab === t ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800')
                }
              >
                {tab === t && (
                  <motion.span
                    layoutId="pkg-tab"
                    className="absolute inset-0 rounded-lg bg-white shadow-sm"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            {/* Phones: swipeable, pre-centred on the most-chosen size. */}
            <div className="md:hidden">
              <SnapCarousel
                itemClassName="w-[84%]"
                initialIndex={Math.max(0, PACKAGES[tab].findIndex((p) => p.popular))}
                ariaLabel={tab + ' package sizes'}
              >
                {PACKAGES[tab].map((p) => <PackageCard key={p.size} p={p} />)}
              </SnapCarousel>
            </div>
            <div className="hidden items-stretch gap-5 md:grid md:grid-cols-3">
              {PACKAGES[tab].map((p) => <PackageCard key={p.size} p={p} />)}
            </div>
          </motion.div>
        <p className="mt-5 text-center text-[13px] text-slate-500 sm:hidden">
          Every size includes a smart hybrid-ready inverter, battery-ready
          design, and full supply and installation.
        </p>
        <p className="mt-6 text-center text-[13px] text-slate-400">
          Every quote is designed for your specific roof, usage and switchboard,
          so these sizes are a starting point, not a limit.
        </p>
      </div>
    </section>
  )
}


/* ── Our install standard ─────────────────────────────────────────────────
   Claims-safe craft signal: process commitments only, no numbers, no
   accreditations. Copy needs owner sign-off before deploy (plan §6):
   every line must describe genuine standard practice on SkyRa jobs.    */
const STANDARDS = [
  ['Torque-checked mounting', 'Every clamp and roof fixing is torqued to spec and checked again before we leave the roof.'],
  ['Labelled, tested circuits', 'Isolators, breakers and switchboard circuits are labelled clearly and tested before switch-on.'],
  ['Tidy, clipped cable runs', 'Cabling is clipped, sleeved and run out of sight wherever the roof allows.'],
  ['Photographed for your records', 'The finished array, rails and switchboard work are photographed for your handover pack.'],
  ['Monitoring before we leave', 'Your monitoring app is connected, tested and explained before the crew drives away.'],
]

function InstallStandard() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative hidden overflow-hidden rounded-2xl lg:block">
          <Photo
            base="why-hardware"
            widths={[640, 1100]}
            sizes="(min-width:1024px) 42vw, 100vw"
            alt="Installer connecting cabling beneath a solar panel"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b2e]/55 via-transparent to-transparent" />
          <div className="relative flex h-full min-h-[540px] items-end p-7">
            <p className="max-w-sm text-[15px] font-semibold leading-snug text-white/90">
              What we check on every install, before we call it done.
            </p>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <Kicker>Our install standard</Kicker>
            <H2>Finished means checked, not just switched on.</H2>
          </Reveal>
          <div className="mt-8">
            {STANDARDS.map(([t, s], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="flex gap-5 border-t border-slate-200 py-5 sm:gap-7 sm:py-6">
                  <span className="w-10 shrink-0 text-[26px] font-extrabold leading-tight tracking-tight text-slate-300 tabular-nums sm:text-[30px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900 sm:text-[17px]">{t}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-slate-500 sm:text-[14.5px]">{s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Meta
        title="SkyRa Energy | Solar Panels & Home Batteries, Installed Australia-wide"
        description="Solar panels, home batteries and inverters designed, supplied and installed by one team. Around 30% off batteries with the federal rebate. Free, no-obligation quotes."
      />
      <Hero />
      <div className="py-10 sm:py-16">
        <RebateBanner />
      </div>
      <WhatWeInstall />
      <EnergyStory />
      <CalculatorSection />
      <Packages />
      <EditorialBreak
        base="panel-macro"
        alt="Close-up of a monocrystalline solar cell surface"
        caption="Tier-1 hardware, up close"
      />
      <WhySkyra />
      <InstallStandard />
      <StepsSection />
      <EditorialBreak
        base="suburb-aerial"
        alt="Australian suburb at golden hour with solar panels on many rooftops"
        caption="Built for Australian rooftops"
      />
      <BrandStrip />
      <FaqSection items={GENERAL_FAQS} />
      <QuoteSection />
    </>
  )
}
