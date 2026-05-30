// ─────────────────────────────────────────────────────────────────────────────
//  TEN UI DIRECTIONS — ten real mini-mockups, one per core flow/page type.
//  Each renders inside a labelled BrowserFrame (≈560×300 viewport).
// ─────────────────────────────────────────────────────────────────────────────
import {
  Sun, Zap, Check, ArrowRight, Calendar, Leaf, DollarSign,
  ClipboardCheck, PencilRuler, Wrench, Power, ShieldCheck, BatteryCharging, TrendingUp,
} from 'lucide-react'
import { DIRECTIONS } from './data'
import { BrowserFrame, SectionHeading, SunOrb, Stars, Reveal } from './ui'

/* ── tiny shared bits ─────────────────────────────────────────────────────── */
const Pill = ({ children, active }) => (
  <span
    className={
      'rounded-full px-2.5 py-1 text-[10px] font-semibold ' +
      (active ? 'bg-[#0C1A2E] text-white' : 'bg-white text-slate-500 ring-1 ring-slate-200')
    }
  >
    {children}
  </span>
)

/* ── 01 · Savings-led Hero (dark) ─────────────────────────────────────────── */
function MockHero() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0C1A2E]">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-72 rounded-full bg-[#0EA5E9]/40 blur-[70px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C1A2E] via-transparent to-transparent" />
      <div className="relative flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-2">
          <SunOrb size={18} />
          <span className="text-[13px] font-bold text-white">
            SkyRa<span className="font-light text-[#38BDF8]"> Energy</span>
          </span>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold text-white ring-1 ring-white/15">
          Get Quote
        </span>
      </div>
      <div className="relative px-5 pt-7">
        <div className="text-[30px] font-extrabold leading-[0.95] tracking-tight text-white">Go Solar.</div>
        <div className="font-fraunces text-[30px] font-black italic leading-[0.95] text-[#7DD3FC]">
          Save up to 70%.
        </div>
        <p className="mt-3 max-w-[58%] text-[11px] leading-snug text-white/75">
          Premium panels & batteries, installed by CEC-accredited pros across Australia.
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-1.5 text-[12px] font-bold text-[#0F1A2E]">
          Get Free Quote
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0F1A2E] text-white">
            <ArrowRight size={12} />
          </span>
        </span>
      </div>
      <div className="absolute bottom-4 right-4 w-32 rounded-2xl border border-white/15 bg-white/[0.07] p-3 backdrop-blur">
        <div className="text-[22px] font-extrabold leading-none text-white">70%</div>
        <div className="mt-0.5 text-[9px] text-white/70">Avg. bill reduction</div>
      </div>
    </div>
  )
}

/* ── 02 · Brand Catalog Grid (light) ──────────────────────────────────────── */
function MockCatalog() {
  const items = [
    { brand: 'Jinko Tiger Neo', spec: '440W · Mono', price: 'from $189', g: 'from-sky-400 to-blue-600', badge: 'Bestseller' },
    { brand: 'Tesla Powerwall 3', spec: '13.5 kWh', price: 'from $11,900', g: 'from-slate-700 to-slate-900' },
    { brand: 'Trina Vertex S+', spec: '430W · Black', price: 'from $179', g: 'from-cyan-500 to-sky-700' },
    { brand: 'Sungrow Hybrid', spec: '5kW Inverter', price: 'from $1,450', g: 'from-amber-400 to-orange-600' },
  ]
  return (
    <div className="h-full w-full bg-[#F1F5F9] p-4">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-slate-900">Shop by brand</span>
        <div className="flex gap-1.5">
          <Pill active>All</Pill>
          <Pill>Panels</Pill>
          <Pill>Batteries</Pill>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {items.map((it) => (
          <div key={it.brand} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70">
            <div className={`relative h-12 bg-gradient-to-br ${it.g}`}>
              {it.badge && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold text-slate-800">
                  {it.badge}
                </span>
              )}
            </div>
            <div className="px-2.5 py-2">
              <div className="text-[11px] font-bold text-slate-900">{it.brand}</div>
              <div className="text-[9.5px] text-slate-500">{it.spec}</div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-600">{it.price}</span>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-900 text-white">
                  <ArrowRight size={10} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 03 · Product Detail + Quote (light) ──────────────────────────────────── */
function MockProduct() {
  return (
    <div className="grid h-full w-full grid-cols-2 bg-white">
      <div className="relative bg-gradient-to-br from-sky-400 to-blue-700">
        <Sun className="absolute right-3 top-3 text-white/80" size={20} />
        <div className="absolute bottom-3 left-3 rounded-lg bg-black/20 px-2 py-1 text-[9px] font-semibold text-white backdrop-blur">
          440W Mono · Tier-1
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="text-[8px] font-bold uppercase tracking-wider text-sky-600">Jinko Solar</div>
        <div className="text-[15px] font-extrabold leading-tight text-slate-900">Tiger Neo 440W</div>
        <div className="mt-0.5 text-[12px] font-bold text-slate-900">
          from $189 <span className="text-[9px] font-medium text-slate-400">/ panel</span>
        </div>
        <div className="mt-2.5 flex flex-col gap-1.5">
          {[['Efficiency', '22.3%'], ['Warranty', '25 yr'], ['Output', '+30 yr'] ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between border-b border-slate-100 pb-1 text-[10px]">
              <span className="text-slate-500">{k}</span>
              <span className="font-bold text-slate-800">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-xl bg-slate-50 p-2.5 ring-1 ring-slate-200">
          <div className="text-[9px] text-slate-500">Want it priced for your roof?</div>
          <button className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg bg-slate-900 py-1.5 text-[11px] font-bold text-white">
            Get my quote <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── 04 · Savings Calculator (light) ──────────────────────────────────────── */
function MockCalculator() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-sky-50 to-white p-5">
      <div className="text-[12px] font-bold text-slate-900">Estimate your savings</div>
      <div className="mt-1 text-[9.5px] text-slate-500">Average quarterly electricity bill</div>
      <div className="mt-3">
        <div className="relative h-1.5 rounded-full bg-sky-100">
          <div className="absolute inset-y-0 left-0 w-[62%] rounded-full bg-gradient-to-r from-sky-400 to-blue-600" />
          <div className="absolute -top-1.5 left-[62%] h-4.5 w-4.5 -translate-x-1/2 rounded-full bg-sky-600 shadow ring-4 ring-white" style={{ height: 18, width: 18 }} />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] text-slate-400">
          <span>$200</span><span className="font-bold text-slate-700">$650 / qtr</span><span>$1,200</span>
        </div>
      </div>
      <div className="mt-4 flex items-end gap-4 rounded-2xl bg-[#0C1A2E] p-4">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-sky-300/80">Estimated saving</div>
          <div className="text-[26px] font-extrabold leading-none text-white">
            $1,840<span className="text-[12px] font-semibold text-slate-400"> /yr</span>
          </div>
          <div className="mt-1 text-[9.5px] text-slate-400">≈ 4.2-year payback</div>
        </div>
        <div className="ml-auto flex items-end gap-1.5">
          <div className="w-5 rounded-t bg-slate-600" style={{ height: 40 }} />
          <div className="w-5 rounded-t bg-gradient-to-t from-sky-500 to-sky-300" style={{ height: 16 }} />
        </div>
      </div>
    </div>
  )
}

/* ── 05 · Multi-step Lead Capture (split) ─────────────────────────────────── */
function MockLead() {
  return (
    <div className="grid h-full w-full grid-cols-[1.35fr_1fr] bg-white">
      <div className="flex flex-col p-5">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-sky-500" />
          <span className="h-1.5 w-6 rounded-full bg-sky-500" />
          <span className="h-1.5 w-6 rounded-full bg-slate-200" />
          <span className="ml-2 text-[9px] font-semibold text-slate-400">Step 2 of 3</span>
        </div>
        <div className="mt-4 text-[14px] font-extrabold text-slate-900">What's your average bill?</div>
        <div className="mt-3 flex flex-col gap-2">
          {['$300 – $500', '$500 – $800', '$800+'].map((o, i) => (
            <div
              key={o}
              className={
                'flex items-center justify-between rounded-xl px-3 py-2 text-[11px] font-semibold ' +
                (i === 1 ? 'bg-sky-50 text-sky-700 ring-2 ring-sky-400' : 'text-slate-600 ring-1 ring-slate-200')
              }
            >
              {o}
              {i === 1 && <Check size={13} className="text-sky-500" />}
            </div>
          ))}
        </div>
        <div className="mt-auto flex gap-2 pt-3">
          <button className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-slate-400 ring-1 ring-slate-200">Back</button>
          <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-slate-900 py-1.5 text-[11px] font-bold text-white">
            Continue <ArrowRight size={11} />
          </button>
        </div>
      </div>
      <div className="relative flex flex-col justify-center bg-gradient-to-b from-sky-500 to-blue-700 p-4 text-white">
        <div className="text-[20px] font-extrabold leading-tight">2,000+</div>
        <div className="text-[10px] font-medium text-white/85">Aussie homes powered</div>
        <div className="mt-3"><Stars size={11} color="#FFFFFF" /></div>
        <div className="mt-1 text-[9.5px] text-white/80">4.9 / 5 · Google Reviews</div>
        <ShieldCheck className="absolute bottom-3 right-3 text-white/30" size={28} />
      </div>
    </div>
  )
}

/* ── 06 · Packages & Pricing (light) ──────────────────────────────────────── */
function MockPricing() {
  const tiers = [
    { size: '6.6', tag: 'Small homes', dark: false },
    { size: '10.12', tag: 'Most popular', dark: true },
    { size: '13.2', tag: 'Large homes', dark: false },
  ]
  return (
    <div className="h-full w-full bg-[#F1F5F9] p-4">
      <div className="flex justify-center">
        <div className="flex rounded-full bg-white p-1 ring-1 ring-slate-200">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white">Residential</span>
          <span className="px-3 py-1 text-[10px] font-semibold text-slate-500">Commercial</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {tiers.map((t) => (
          <div
            key={t.size}
            className={
              'relative rounded-xl p-3 ' +
              (t.dark ? 'bg-[#0C1A2E] text-white shadow-lg' : 'bg-white text-slate-900 ring-1 ring-slate-200')
            }
          >
            {t.dark && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-2 py-0.5 text-[7.5px] font-bold uppercase tracking-wide text-white">
                Popular
              </span>
            )}
            <div className="text-[8px] font-bold uppercase tracking-wide text-sky-500">{t.tag}</div>
            <div className="mt-1 text-[20px] font-extrabold leading-none">
              {t.size}<span className="text-[10px] font-bold opacity-60">kW</span>
            </div>
            <div className={'mt-2 flex flex-col gap-1 text-[9px] ' + (t.dark ? 'text-slate-300' : 'text-slate-500')}>
              <span className="flex items-center gap-1"><Check size={9} className="text-sky-400" /> Tier-1 panels</span>
              <span className="flex items-center gap-1"><Check size={9} className="text-sky-400" /> 25-yr warranty</span>
            </div>
            <button
              className={
                'mt-2.5 w-full rounded-lg py-1.5 text-[9.5px] font-bold ' +
                (t.dark ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white' : 'bg-slate-900 text-white')
              }
            >
              Free quote
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 07 · How It Works (light) ────────────────────────────────────────────── */
function MockHowItWorks() {
  const steps = [
    { n: '01', t: 'Free survey', Icon: ClipboardCheck },
    { n: '02', t: 'System design', Icon: PencilRuler },
    { n: '03', t: 'Pro install', Icon: Wrench },
    { n: '04', t: 'Switch on', Icon: Power },
  ]
  return (
    <div className="flex h-full w-full flex-col justify-center bg-white px-5">
      <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-sky-600">How it works</div>
      <div className="mt-1 text-[15px] font-extrabold text-slate-900">From sunlight to savings in 4 steps</div>
      <div className="relative mt-5 grid grid-cols-4 gap-2">
        <div className="absolute left-[12%] right-[12%] top-5 h-px bg-slate-200" />
        {steps.map((s) => (
          <div key={s.n} className="relative flex flex-col items-center text-center">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-sky-50 text-sky-600 ring-1 ring-sky-200">
              <s.Icon size={16} />
            </div>
            <div className="mt-2 text-[8px] font-bold text-sky-500">{s.n}</div>
            <div className="text-[10px] font-bold text-slate-800">{s.t}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 08 · Reviews & Trust (light) ─────────────────────────────────────────── */
function MockReviews() {
  return (
    <div className="h-full w-full bg-[#F1F5F9] p-4">
      <div className="text-[12px] font-extrabold text-slate-900">Loved across Australia</div>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        {[
          { q: 'Bill went from $620 to $90 a quarter. Faultless install.', n: 'Priya R.', s: 'Glen Waverley, VIC' },
          { q: 'Booked, surveyed and switched on within three weeks.', n: 'Daniel K.', s: 'Newcastle, NSW' },
        ].map((r) => (
          <div key={r.n} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/70">
            <Stars size={11} />
            <p className="mt-1.5 text-[10px] leading-snug text-slate-600">“{r.q}”</p>
            <div className="mt-2 text-[10px] font-bold text-slate-900">{r.n}</div>
            <div className="text-[8.5px] text-slate-400">{r.s}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200/70">
        {[
          { t: 'CEC', s: 'Accredited' },
          { t: '4.9★', s: 'Google' },
          { t: '2,000+', s: 'Installs' },
          { t: '25yr', s: 'Warranty' },
        ].map((b) => (
          <div key={b.t} className="text-center">
            <div className="text-[11px] font-extrabold text-slate-900">{b.t}</div>
            <div className="text-[8px] text-slate-400">{b.s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 09 · Book an Assessment (split light) ────────────────────────────────── */
function MockBooking() {
  const slots = ['9:00 am', '9:30 am', '10:00 am', '11:30 am', '1:00 pm']
  return (
    <div className="grid h-full w-full grid-cols-2 bg-white">
      <div className="border-r border-slate-100 p-4">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900">
          <Calendar size={12} className="text-sky-500" /> June 2026
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[8px] text-slate-400">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className={
                'grid aspect-square place-items-center rounded-md text-[8px] ' +
                (i === 11 ? 'bg-sky-500 font-bold text-white' : 'text-slate-600 hover:bg-slate-100')
              }
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="text-[10px] font-bold text-slate-900">Thu, 12 June</div>
        <div className="text-[8.5px] text-slate-400">30-min free site assessment</div>
        <div className="mt-2 flex flex-col gap-1.5 overflow-hidden">
          {slots.map((s, i) => (
            <div
              key={s}
              className={
                'rounded-lg py-1.5 text-center text-[10px] font-semibold ' +
                (i === 1 ? 'bg-sky-50 text-sky-700 ring-2 ring-sky-400' : 'text-slate-600 ring-1 ring-slate-200')
              }
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── 10 · Owner Dashboard (dark) ──────────────────────────────────────────── */
function MockDashboard() {
  const kpis = [
    { Icon: Sun, v: '12.4', u: 'kWh today', c: '#FBBF24' },
    { Icon: DollarSign, v: '$1,840', u: 'saved / yr', c: '#38BDF8' },
    { Icon: Leaf, v: '1.2t', u: 'CO₂ avoided', c: '#4ADE80' },
  ]
  return (
    <div className="h-full w-full bg-[#0B1422] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BatteryCharging size={14} className="text-sky-400" />
          <span className="text-[11px] font-bold text-white">Energy dashboard</span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[8px] font-bold text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> LIVE
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {kpis.map((k) => (
          <div key={k.u} className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
            <k.Icon size={13} style={{ color: k.c }} />
            <div className="mt-1.5 text-[15px] font-extrabold leading-none text-white">{k.v}</div>
            <div className="text-[8px] text-slate-400">{k.u}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <div className="flex items-center justify-between text-[8.5px] text-slate-400">
          <span className="flex items-center gap-1"><TrendingUp size={11} className="text-sky-400" /> Generation · 7 days</span>
          <span>kWh</span>
        </div>
        <svg viewBox="0 0 240 56" className="mt-1.5 h-14 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 44 L34 30 L68 36 L102 18 L136 26 L170 10 L204 20 L240 8 L240 56 L0 56 Z" fill="url(#g)" />
          <path d="M0 44 L34 30 L68 36 L102 18 L136 26 L170 10 L204 20 L240 8" fill="none" stroke="#38BDF8" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}

const MOCKS = [
  MockHero, MockCatalog, MockProduct, MockCalculator, MockLead,
  MockPricing, MockHowItWorks, MockReviews, MockBooking, MockDashboard,
]
const ACCENTS = ['#38BDF8', '#0EA5E9', '#38BDF8', '#22D3EE', '#0EA5E9', '#38BDF8', '#0EA5E9', '#FBBF24', '#0EA5E9', '#4ADE80']

export default function TenDirections() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-10 sm:px-8">
      <SectionHeading
        kicker="Exploration"
        title="Ten UI directions"
        sub="Ten real mini-mockups — one for every core flow — each rendered in the SkyRa visual language and grounded in the Mobbin references. Use these to choose a direction per page before full design."
      />
      <div className="mt-10 grid gap-x-6 gap-y-10 lg:grid-cols-2">
        {DIRECTIONS.map((d, i) => {
          const Mock = MOCKS[i]
          return (
            <Reveal key={d.n} delay={(i % 2) * 0.08}>
              <div>
                <BrowserFrame label={d.tag} accent={ACCENTS[i]}>
                  <Mock />
                </BrowserFrame>
                <div className="mt-3.5 px-1">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-fraunces text-[18px] font-black italic text-[#7DD3FC]">{d.n}</span>
                    <h3 className="text-[17px] font-bold text-[#F8FAFC]">{d.title}</h3>
                  </div>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-[#9FB0C9]">{d.note}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
