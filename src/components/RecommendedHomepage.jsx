// ─────────────────────────────────────────────────────────────────────────────
//  SkyRa Energy — Homepage
//  Exact implementation of the "03 Recommended" design exploration, top to bottom:
//  hero (with built-in nav) → trust strip → live savings calculator →
//  what we install → packages (residential/commercial toggle) → how it works →
//  testimonials → quote-form CTA → footer.
//  Headings are upright (no italics) per brand preference.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import {
  ArrowRight, Phone, Check, Zap, Sun, BatteryCharging, Gauge,
  ClipboardCheck, PencilRuler, Wrench, Power, Star, MapPin,
} from 'lucide-react'

const HERO_IMG =
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2670&auto=format&fit=crop'

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
    <div className="absolute inset-x-0 top-0 z-20 px-5 pt-4 sm:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <SunOrb size={22} />
          <span className="text-[16px] font-bold text-white">
            SkyRa<span className="font-light text-[#7DD3FC]"> Energy</span>
          </span>
        </div>
        <div className="hidden items-center gap-6 text-[13px] font-medium text-white/85 md:flex">
          <span>Products</span><span>Packages</span><span>Why Solar</span><span>Reviews</span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-1.5 text-[13px] font-bold text-[#0F1A2E]">
          Get Quote
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0F1A2E] text-white">
            <Phone size={12} />
          </span>
        </span>
      </div>
    </div>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[560px] overflow-hidden bg-[#0C1A2E]">
      <img src={HERO_IMG} alt="Solar panels on an Australian home" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A2E] via-[#0C1A2E]/40 to-black/40" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-96 rounded-full bg-[#0EA5E9]/30 blur-[90px]" />
      <Nav />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col px-5 pb-12 pt-32 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="text-[clamp(44px,7vw,82px)] font-extrabold leading-[0.9] tracking-tight text-white">
              Go Solar.
            </div>
            <div className="text-[clamp(40px,6.4vw,76px)] font-extrabold leading-[0.92] tracking-tight text-[#7DD3FC]">
              Save up to 70%.
            </div>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85">
              SkyRa supplies and installs premium solar panels and home batteries across
              Australia — backed by CEC-accredited installers and a 25-year warranty.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-[15px] font-bold text-[#0F1A2E] shadow-xl transition-transform hover:scale-[1.03]">
                Get Free Quote
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0F1A2E] text-white">
                  <ArrowRight size={16} />
                </span>
              </button>
              <button className="rounded-full border border-white/30 px-5 py-2.5 text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                Book a free assessment
              </button>
            </div>
          </div>
          <div className="w-full max-w-[300px] overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-xl lg:ml-auto">
            {[
              ['70%', 'Average bill reduction'],
              ['25-Yr', 'Warranty & expert install'],
              ['CEC', 'Accredited installers'],
            ].map(([v, l], i) => (
              <div key={l}>
                {i > 0 && <div className="my-3.5 h-px w-full bg-white/15" />}
                <div className="text-[28px] font-extrabold leading-none text-white">{v}</div>
                <div className="mt-1 text-[12.5px] font-medium text-white/75">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Trust strip ──────────────────────────────────────────────────────────── */
function TrustStrip() {
  return (
    <div className="border-y border-slate-100 bg-slate-50/70">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-5 sm:px-8">
        <span className="text-[12px] font-semibold uppercase tracking-wider text-slate-400">Tier-1 brands we install</span>
        {['Jinko', 'Tesla', 'Trina', 'Sungrow', 'Fronius'].map((b) => (
          <span key={b} className="text-[17px] font-extrabold tracking-tight text-slate-400">{b}</span>
        ))}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">
          <Star size={12} className="fill-amber-400 text-amber-400" /> 4.9 · 2,000+ reviews
        </span>
      </div>
    </div>
  )
}

/* ── Live savings calculator ──────────────────────────────────────────────── */
function Calculator() {
  const [bill, setBill] = useState(650)
  const annual = bill * 4
  const saving = Math.round(annual * 0.7)
  const payback = Math.max(2.4, 7700 / saving).toFixed(1)
  const co2 = (saving / 1000).toFixed(1)
  const pct = ((bill - 200) / (1200 - 200)) * 100
  return (
    <section className="bg-white px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-sky-600">Try it</span>
            <h2 className="mt-2 text-[clamp(28px,4vw,40px)] font-extrabold leading-tight tracking-tight text-slate-900">
              See your saving in
              <span className="text-sky-600"> seconds.</span>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
              Drag to your average quarterly power bill. We'll estimate what a SkyRa system
              could save you each year — no email required.
            </p>
            <div className="mt-7">
              <div className="flex items-end justify-between">
                <span className="text-[13px] font-semibold text-slate-500">Average quarterly bill</span>
                <span className="text-[20px] font-extrabold text-slate-900">${bill}</span>
              </div>
              <input
                type="range" min="200" max="1200" step="10" value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="mt-3 w-full"
                style={{ background: `linear-gradient(to right, #0284c7 ${pct}%, #bae6fd ${pct}%)` }}
              />
              <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                <span>$200</span><span>$1,200</span>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-[#0C1A2E] p-7 text-white shadow-2xl">
            <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-56 rounded-full bg-[#0EA5E9]/30 blur-[60px]" />
            <div className="relative">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-sky-300/80">Estimated saving</div>
              <div className="mt-1 text-[clamp(40px,7vw,60px)] font-extrabold leading-none">
                ${saving.toLocaleString()}
                <span className="text-[18px] font-semibold text-slate-400"> /yr</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3.5">
                  <Gauge size={16} className="text-sky-400" />
                  <div className="mt-2 text-[20px] font-extrabold leading-none">{payback} yr</div>
                  <div className="text-[11px] text-slate-400">Estimated payback</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3.5">
                  <Sun size={16} className="text-amber-400" />
                  <div className="mt-2 text-[20px] font-extrabold leading-none">{co2}t</div>
                  <div className="text-[11px] text-slate-400">CO₂ avoided / yr</div>
                </div>
              </div>
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 py-3 text-[15px] font-bold text-white shadow-lg shadow-sky-500/25">
                Get my exact quote <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── What we install ──────────────────────────────────────────────────────── */
function Install() {
  const cards = [
    { Icon: Sun, t: 'Solar Panels', s: 'Tier-1 mono panels from Jinko, Trina & REC — up to 22.3% efficiency.', c: 'from-sky-400 to-blue-600' },
    { Icon: BatteryCharging, t: 'Home Batteries', s: 'Store the day, power the night. Tesla Powerwall & Sungrow hybrid.', c: 'from-amber-400 to-orange-600' },
    { Icon: Zap, t: 'Smart Inverters', s: 'Fronius & Sungrow inverters with app monitoring built in.', c: 'from-cyan-500 to-sky-700' },
  ]
  return (
    <section className="bg-slate-50 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-sky-600">What we install</p>
        <h2 className="mt-2 max-w-xl text-[clamp(26px,3.6vw,38px)] font-extrabold tracking-tight text-slate-900">
          One supplier for the whole system.
        </h2>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.t} className="group rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-xl">
              <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c.c} text-white shadow-lg`}>
                <c.Icon size={24} />
              </span>
              <h3 className="mt-5 text-[20px] font-bold text-slate-900">{c.t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-500">{c.s}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-sky-600">
                Explore <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          ))}
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
      { size: '10.12', panels: '23 × 440W', tag: 'Most popular', popular: true },
      { size: '13.2', panels: '30 × 440W', tag: 'Large homes', popular: false },
    ],
    commercial: [
      { size: '20', panels: '46 × 440W', tag: 'Small business', popular: false },
      { size: '30', panels: '69 × 440W', tag: 'Most popular', popular: true },
      { size: '50', panels: '114 × 440W', tag: 'Warehouse', popular: false },
    ],
  }
  return (
    <section className="bg-white px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-sky-600">Our solutions</p>
        <h2 className="mt-2 text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight text-slate-900">
          Premium solar <span className="text-sky-600">packages</span>
        </h2>
        <div className="mt-6 inline-flex rounded-full bg-slate-100 p-1.5">
          {['residential', 'commercial'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                'rounded-full px-6 py-2.5 text-[13px] font-bold capitalize transition-colors ' +
                (tab === t ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-800')
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
        {data[tab].map((p) => (
          <div
            key={p.size}
            className={
              'relative flex flex-col rounded-3xl p-7 ' +
              (p.popular
                ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl md:-translate-y-3 ring-1 ring-slate-700'
                : 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200')
            }
          >
            {p.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg ring-4 ring-white">
                Most popular
              </span>
            )}
            <span className={'text-[11px] font-bold uppercase tracking-wide ' + (p.popular ? 'text-sky-400' : 'text-sky-600')}>{p.tag}</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[48px] font-extrabold leading-none tracking-tight">{p.size}</span>
              <span className={'text-[18px] font-bold ' + (p.popular ? 'text-slate-400' : 'text-slate-400')}>kW</span>
            </div>
            <div className={'mt-5 space-y-2.5 text-[13px] ' + (p.popular ? 'text-slate-300' : 'text-slate-600')}>
              {[`${p.panels} Tier-1 panels`, 'Smart hybrid inverter', 'Save up to 70% on bills', '25-year warranty'].map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <span className={'grid h-5 w-5 place-items-center rounded-full ' + (p.popular ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-600')}>
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {f}
                </div>
              ))}
            </div>
            <button
              className={
                'mt-7 w-full rounded-xl py-3 text-[14px] font-bold ' +
                (p.popular
                  ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                  : 'bg-slate-900 text-white')
              }
            >
              Get a free quote
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── How it works ─────────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: '01', t: 'Free survey', s: 'We assess your roof, usage and rebate eligibility.', Icon: ClipboardCheck },
    { n: '02', t: 'System design', s: 'A tailored panel + battery layout and savings plan.', Icon: PencilRuler },
    { n: '03', t: 'Pro install', s: 'CEC-accredited installers, usually within 3 weeks.', Icon: Wrench },
    { n: '04', t: 'Switch on', s: 'Start generating, monitor savings from the app.', Icon: Power },
  ]
  return (
    <section className="bg-[#0C1A2E] px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-sky-400">How it works</p>
        <h2 className="mt-2 max-w-lg text-[clamp(26px,3.6vw,38px)] font-extrabold tracking-tight text-white">
          From sunlight to savings in four steps.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-500/15 text-sky-400 ring-1 ring-sky-400/30">
                  <s.Icon size={20} />
                </span>
                <span className="text-[34px] font-extrabold text-white/10">{s.n}</span>
              </div>
              <h3 className="mt-4 text-[16px] font-bold text-white">{s.t}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{s.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ─────────────────────────────────────────────────────────── */
function Testimonials() {
  const t = [
    { q: 'Our quarterly bill went from $620 to under $90. The install team was faultless and on time.', n: 'Priya R.', s: 'Glen Waverley, VIC' },
    { q: 'Surveyed, quoted and switched on in three weeks. The app makes it easy to see the savings roll in.', n: 'Daniel K.', s: 'Newcastle, NSW' },
    { q: 'Genuinely premium service. They handled the rebate paperwork and the battery just works.', n: 'Mei L.', s: 'Sunnybank, QLD' },
  ]
  return (
    <section className="bg-slate-50 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-md text-[clamp(26px,3.6vw,38px)] font-extrabold tracking-tight text-slate-900">
            Loved by homeowners <span className="text-sky-600">Australia-wide.</span>
          </h2>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-500">
            <Star size={15} className="fill-amber-400 text-amber-400" /> 4.9 / 5 average · 2,000+ installs
          </div>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {t.map((x) => (
            <div key={x.n} className="flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200/70">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} className="fill-amber-400" />)}
              </div>
              <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-slate-700">“{x.q}”</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-[14px] font-bold text-white">
                  {x.n[0]}
                </span>
                <div>
                  <div className="text-[14px] font-bold text-slate-900">{x.n}</div>
                  <div className="flex items-center gap-1 text-[12px] text-slate-400">
                    <MapPin size={11} /> {x.s}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA + quote form ─────────────────────────────────────────────────────── */
function CtaForm() {
  return (
    <section className="relative overflow-hidden bg-[#0C1A2E] px-5 py-16 sm:px-8">
      <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-96 rounded-full bg-[#0EA5E9]/20 blur-[90px]" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-80 rounded-full bg-[#F59E0B]/15 blur-[90px]" />
      <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="text-[clamp(30px,4.4vw,48px)] font-extrabold leading-[1.02] tracking-tight text-white">
            Ready to cut your
            <br />
            power bill? <span className="text-[#7DD3FC]">Let's go.</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80">
            Get a free, no-obligation quote tailored to your roof and rebate eligibility.
            A SkyRa specialist will be in touch within one business day.
          </p>
          <div className="mt-6 flex flex-wrap gap-5">
            {['CEC accredited', 'No-obligation', '25-yr warranty'].map((l) => (
              <span key={l} className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/85">
                <Check size={15} className="text-sky-400" /> {l}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
          <div className="text-[16px] font-bold text-white">Get your free quote</div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[['Full name', 'col-span-2'], ['Email', 'col-span-2'], ['Postcode', ''], ['Quarterly bill', '']].map(([ph, cls]) => (
              <div key={ph} className={cls}>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-[13px] text-white/40">{ph}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-[15px] font-bold text-[#0F1A2E] transition-transform hover:scale-[1.01]">
            Get my free quote <ArrowRight size={16} />
          </button>
          <p className="mt-3 text-center text-[11px] text-white/45">No spam. We never share your details.</p>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#08111E] px-5 py-9 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <SunOrb size={20} />
          <span className="text-[15px] font-bold text-white">SkyRa<span className="font-light text-[#7DD3FC]"> Energy</span></span>
        </div>
        <div className="flex gap-6 text-[12.5px] text-slate-400">
          <span>Products</span><span>Packages</span><span>About</span><span>Contact</span>
        </div>
        <span className="text-[12px] text-slate-500">© 2026 SkyRa Energy · CEC Accredited</span>
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
        <Testimonials />
        <CtaForm />
      </main>
      <Footer />
    </div>
  )
}
