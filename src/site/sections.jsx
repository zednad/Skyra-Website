// ─────────────────────────────────────────────────────────────────────────────
//  Reusable page sections: rebate banner, savings calculator, process steps,
//  FAQ accordion, brand strip, and the quote-form section.
//  All claims here follow the compliance rules in docs/REDESIGN_PLAN.md §6 -
//  rebate copy states the public program facts and carries a disclaimer.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, animate, useMotionValue, useReducedMotion } from 'framer-motion'
import {
  ArrowRight, BadgePercent, ChevronDown, ClipboardCheck, Gauge, PencilRuler,
  Power, Sun, Wrench,
} from 'lucide-react'
import { BTN, CARD_HOVER, CtaLink, EASE, H2, JsonLd, Kicker, Photo, Reveal } from './shared'
import QuoteForm from './QuoteForm'

/* ── Rebate banner ────────────────────────────────────────────────────── */
export function RebateBanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-8">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500 text-slate-950 sm:h-12 sm:w-12">
              <BadgePercent size={22} />
            </span>
            <div>
              <h2 className="text-[17px] font-extrabold leading-snug tracking-tight text-slate-900 sm:text-[21px]">
                Around 30% off home batteries with the federal rebate
              </h2>
              {/* Full program detail on larger screens; phones keep the claim
                  qualified and link out for the rest. */}
              <p className="mt-1 hidden max-w-2xl text-[14.5px] leading-relaxed text-slate-600 sm:block">
                The Cheaper Home Batteries Program discounts the installed cost of
                eligible battery systems, and solar panels still attract STC
                incentives. We size the system and handle the paperwork.
                <span className="text-slate-400"> Eligibility criteria apply.</span>
              </p>
              <p className="mt-1 text-[13px] text-slate-500 sm:hidden">
                We handle the paperwork. Eligibility criteria apply.
              </p>
            </div>
          </div>
          <Link
            to="/rebates"
            className={'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] ' + BTN.navy}
          >
            How the rebates work <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

/* ── Savings calculator ───────────────────────────────────────────────── */
function AnimatedNumber({ value, formatFn }) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(value)
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    if (reduce) return
    const controls = animate(mv, value, { duration: 0.45, ease: EASE, onUpdate: (v) => setDisplay(v) })
    return () => controls.stop()
  }, [value, reduce, mv])
  const shown = reduce ? value : display
  return <>{formatFn ? formatFn(shown) : Math.round(shown)}</>
}

export function CalculatorSection() {
  const [bill, setBill] = useState(650)
  const annual = bill * 4
  const saving = Math.round(annual * 0.7)
  const payback = Math.max(2.4, 7700 / saving)
  const co2 = saving / 1000
  const pct = ((bill - 200) / (1200 - 200)) * 100

  return (
    <section id="calculator" className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Kicker>Savings estimate</Kicker>
          <H2>What could solar save you?</H2>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-slate-600">
            Drag to your average quarterly power bill and see an indicative
            annual saving. No email address required.
          </p>
          <div className="mt-10">
            <div className="flex items-end justify-between">
              <span className="text-[14px] font-semibold text-slate-500">Average quarterly bill</span>
              <span className="text-[24px] font-extrabold text-slate-900">${bill}</span>
            </div>
            <input
              type="range" min="200" max="1200" step="10" value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              aria-label="Average quarterly power bill in dollars"
              className="mt-4 w-full"
              style={{ background: `linear-gradient(to right, #f59e0b ${pct}%, #fde68a ${pct}%)` }}
            />
            <div className="mt-2 flex justify-between text-[12px] text-slate-400">
              <span>$200</span><span>$1,200</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-amber-700">Estimated saving</div>
            <div className="mt-2 text-[clamp(44px,6vw,64px)] font-extrabold leading-none tracking-tight text-slate-900">
              $<AnimatedNumber value={saving} formatFn={(v) => Math.round(v).toLocaleString()} />
              <span className="text-[20px] font-semibold text-slate-400"> /yr</span>
            </div>

            <div className="mt-7 space-y-3.5">
              <div>
                <div className="flex items-baseline justify-between text-[12.5px] font-semibold">
                  <span className="text-slate-500">Bill without solar</span>
                  <span className="text-slate-700">
                    $<AnimatedNumber value={annual} formatFn={(v) => Math.round(v).toLocaleString()} />/yr
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full bg-slate-400"
                    animate={{ width: `${(annual / 4800) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 170, damping: 26 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between text-[12.5px] font-semibold">
                  <span className="text-amber-700">With a SkyRa system (est.)</span>
                  <span className="text-amber-700">
                    $<AnimatedNumber value={annual - saving} formatFn={(v) => Math.round(v).toLocaleString()} />/yr
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full bg-amber-500"
                    animate={{ width: `${((annual - saving) / 4800) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 170, damping: 26 }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Gauge size={19} className="text-amber-600" />
                <div className="mt-2.5 text-[22px] font-extrabold leading-none text-slate-900">
                  <AnimatedNumber value={payback} formatFn={(v) => v.toFixed(1)} /> yr
                </div>
                <div className="mt-1 text-[12px] text-slate-500">Estimated payback</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Sun size={19} className="text-amber-600" />
                <div className="mt-2.5 text-[22px] font-extrabold leading-none text-slate-900">
                  <AnimatedNumber value={co2} formatFn={(v) => v.toFixed(1)} />t
                </div>
                {/* CO2 as markup: U+2082 sits outside the latin font subset */}
                <div className="mt-1 text-[12px] text-slate-500">CO<sub>2</sub> avoided / yr</div>
              </div>
            </div>

            <CtaLink to="/contact" className="mt-6 w-full">Get my exact numbers</CtaLink>
            <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
              Indicative estimate only. Actual savings depend on your energy use,
              tariff, system size and site, and aren't guaranteed. We confirm
              figures in your written quote.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── How it works ─────────────────────────────────────────────────────── */
const STEPS = [
  { n: '01', Icon: ClipboardCheck, t: 'Free assessment', s: 'We look at your roof, switchboard and energy usage, on site or from your bill and photos.' },
  { n: '02', Icon: PencilRuler, t: 'Tailored design', s: 'A system sized to your home and budget, with the rebate paperwork prepared for you.' },
  { n: '03', Icon: Wrench, t: 'Installation', s: 'Panels, battery and inverter fitted cleanly and safely, with the switchboard work done properly.' },
  { n: '04', Icon: Power, t: 'Switch on', s: 'We commission the system, connect your monitoring app and walk you through it all.' },
]

export function StepsSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Kicker>How it works</Kicker>
          <H2>From first look to switch-on, one team.</H2>
        </Reveal>

        {/* Phones: compact connected timeline, one glance per step. */}
        <Reveal className="mt-8 sm:hidden">
          <ol>
            {STEPS.map(({ n, Icon, t, s }, i) => (
              <li key={n} className="relative flex gap-4 pb-7 last:pb-0">
                {i < STEPS.length - 1 && (
                  <span aria-hidden="true" className="absolute bottom-0 left-[21px] top-12 w-px bg-slate-200" />
                )}
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-amber-400">
                  <Icon size={20} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700">Step {n}</div>
                  <h3 className="mt-0.5 text-[16.5px] font-bold text-slate-900">{t}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-slate-500">{s}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Larger screens: the card grid. */}
        <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ n, Icon, t, s }, i) => (
            <Reveal key={n} delay={i * 0.06}>
              <div className={'group relative h-full rounded-2xl border border-slate-200 bg-white p-6 ' + CARD_HOVER}>
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-amber-400">
                    <Icon size={21} />
                  </span>
                  <span className="text-[32px] font-extrabold leading-none text-slate-100 transition-colors group-hover:text-amber-200">{n}</span>
                </div>
                <h3 className="mt-5 text-[17.5px] font-bold text-slate-900">{t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-500">{s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FAQ accordion ────────────────────────────────────────────────────── */
export function FaqSection({ items, title = 'Questions, answered.' }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <JsonLd
        id="ld-faq"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map(([q, a]) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Kicker>FAQ</Kicker>
          <H2>{title}</H2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-slate-600">
            Straight answers before you commit to anything. Still unsure?
            Ask us. No pressure, no obligation.
          </p>
          <CtaLink to="/contact" className="mt-7">Ask a question</CtaLink>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 shadow-card sm:px-7">
            {items.map(([q, a], i) => {
              const isOpen = open === i
              return (
                <div key={q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[15.5px] font-bold text-slate-900 sm:text-[16.5px]">{q}</span>
                    <span
                      className={
                        'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ' +
                        (isOpen ? 'rotate-180 border-amber-300 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500')
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
                        transition={{ duration: 0.28, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-[14.5px] leading-relaxed text-slate-500">{a}</p>
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

/* ── Hardware brands strip (quiet, honest) ────────────────────────────── */
const BRANDS = ['Jinko', 'Trina', 'LONGi', 'Canadian Solar', 'Sungrow', 'Fronius', 'GoodWe', 'SMA', 'Fox ESS', 'Sigenergy', 'Tesla']

export function BrandStrip() {
  return (
    <section className="border-y border-slate-200 bg-[#faf9f7] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-slate-400">
          Tier-1 hardware we work with
        </p>
        <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {BRANDS.map((b) => (
            <span key={b} className="text-[16px] font-extrabold tracking-tight text-slate-400/90">
              {b}
            </span>
          ))}
        </div>
        <p className="mt-5 text-[12.5px] text-slate-400">
          The exact hardware in your quote depends on your system design and availability.
        </p>
      </div>
    </section>
  )
}

/* ── Quote form section (photo + form side by side) ───────────────────── */
export function QuoteSection({
  photoBase = 'handover',
  photoAlt = 'SkyRa installer with a happy customer at the front door',
  photoWidths = [640, 1100],
}) {
  return (
    <section id="quote" className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal className="relative hidden overflow-hidden rounded-2xl lg:block">
          <Photo
            base={photoBase}
            widths={photoWidths}
            sizes="(min-width:1024px) 48vw, 100vw"
            alt={photoAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b2e]/60 via-transparent to-transparent" />
          <div className="relative flex h-full min-h-[460px] flex-col justify-end p-8">
            <p className="max-w-sm text-[22px] font-bold leading-snug text-white">
              Tell us about your place. We'll do the numbers, the design and
              the rebate paperwork.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  )
}
