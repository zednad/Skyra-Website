// ─────────────────────────────────────────────────────────────────────────────
//  Homepage. Flow: photo hero (promise) → rebate banner (the deal) → what we
//  install (the product) → day-to-night story (how it works) → calculator
//  (your numbers) → packages (pick a starting size) → why SkyRa (trust) →
//  how it works (process) → brands → FAQ (objections) → quote form (action).
//  Each scroll answers the question the previous one raises; the CTA band was
//  dropped because the quote form directly follows the FAQ.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Check, FileCheck2, MapPin, Sun } from 'lucide-react'
import EnergyStory from '../../components/EnergyStory'
import {
  BrandStrip, CalculatorSection, FaqSection, QuoteSection,
  RebateBanner, StepsSection,
} from '../sections'
import { GENERAL_FAQS } from '../faqData'
import { CARD_HOVER, CtaLink, H2, Kicker, Meta, Photo, Reveal, TruthChip } from '../shared'

/* ── Hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a1b2e]">
      <Photo
        base="hero-install"
        widths={[768, 1280, 1920]}
        sizes="100vw"
        alt="SkyRa installers fitting solar panels on an Australian home"
        eager
        className="absolute inset-0 h-full w-full object-cover object-[72%_38%]"
      />
      {/* scrims: left for copy, bottom for mobile legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1b2e]/92 via-[#0a1b2e]/55 to-[#0a1b2e]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b2e]/80 via-transparent to-transparent sm:hidden" />

      <div className="relative mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-amber-300 ring-1 ring-white/15">
            <Sun size={13} /> Solar · Batteries · Inverters
          </p>
          <h1 className="mt-6 text-[clamp(36px,5.6vw,64px)] font-extrabold leading-[1.05] tracking-tight text-white">
            Solar &amp; battery systems, installed by one local team.
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-slate-200 sm:mt-5 sm:text-[18px]">
            Around 30% off home batteries with the federal rebate.
            <span className="hidden sm:inline">
              {' '}We design the system, handle the paperwork and install it as
              one job, for homes and businesses across Australia.
            </span>
            <span className="sm:hidden">
              {' '}One local team designs it, installs it and handles the paperwork.
            </span>
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <CtaLink to="/contact">Get my free quote</CtaLink>
            <CtaLink to="/batteries" variant="ghost">Explore home batteries</CtaLink>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5 sm:mt-9 sm:gap-y-3">
            <TruthChip icon={Check}>Free, no-obligation quote</TruthChip>
            <TruthChip icon={FileCheck2}>Rebate paperwork done for you</TruthChip>
            <TruthChip icon={BadgeCheck}>Tier-1 hardware only</TruthChip>
          </div>
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

function WhySkyra() {
  return (
    <section className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Kicker>Why SkyRa</Kicker>
          <H2>A solar company you can hold to its word.</H2>
        </Reveal>
        {/* Phones get compact photo-beside-text rows; sm+ keeps the tall photo cards. */}
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {WHY.map(({ base, widths, alt, t, s }, i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className={'group flex h-full overflow-hidden rounded-2xl border border-slate-200 bg-white sm:block ' + CARD_HOVER}>
                <div className="relative w-[112px] shrink-0 self-stretch overflow-hidden sm:aspect-[4/3] sm:w-auto sm:self-auto">
                  <Photo
                    base={base}
                    widths={widths || [640, 1100]}
                    sizes="(min-width:1024px) 24vw, (min-width:640px) 46vw, 30vw"
                    alt={alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="min-w-0 p-4 sm:p-5">
                  <h3 className="text-[15.5px] font-bold text-slate-900 sm:text-[16.5px]">{t}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500 sm:text-[14px]">{s}</p>
                </div>
              </div>
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
                  'rounded-lg px-6 py-2.5 text-[14px] font-bold capitalize transition-colors sm:px-8 ' +
                  (tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800')
                }
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid items-stretch gap-5 md:grid-cols-3"
          >
            {PACKAGES[tab].map((p) => (
              <div
                key={p.size}
                className={
                  'relative flex flex-col rounded-2xl p-5 ring-1 transition-shadow hover:shadow-[0_12px_40px_rgba(2,8,23,0.10)] sm:p-8 ' +
                  (p.popular
                    ? 'bg-[#0a1b2e] text-white ring-white/10'
                    : 'bg-white text-slate-900 ring-slate-200')
                }
              >
                {p.popular && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-950 sm:right-6 sm:top-6">
                    Most chosen
                  </span>
                )}
                <span className={'text-[12px] font-bold uppercase tracking-[0.16em] ' + (p.popular ? 'text-amber-300' : 'text-amber-700')}>
                  {p.tag}
                </span>
                <div className="mt-2 flex items-baseline gap-1.5 sm:mt-3">
                  <span className="text-[44px] font-extrabold leading-none tracking-tight sm:text-[52px]">{p.size}</span>
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
                    'mt-5 block w-full rounded-xl py-3.5 text-center text-[14.5px] font-bold transition-colors sm:mt-8 ' +
                    (p.popular
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      : 'bg-slate-900 text-white hover:bg-slate-800')
                  }
                >
                  Get exact pricing
                </Link>
              </div>
            ))}
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
      <WhySkyra />
      <StepsSection />
      <BrandStrip />
      <FaqSection items={GENERAL_FAQS} />
      <QuoteSection />
    </>
  )
}
