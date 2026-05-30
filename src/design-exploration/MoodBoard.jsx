// ─────────────────────────────────────────────────────────────────────────────
//  MOOD BOARD — the visual direction distilled from Mobbin research.
// ─────────────────────────────────────────────────────────────────────────────
import { Zap, Check, ArrowRight, ShieldCheck } from 'lucide-react'
import { PALETTE, KEYWORDS, FLOWS, PRINCIPLES } from './data'
import { SunOrb, Glow, SectionHeading, Chip, LinkChip, Reveal } from './ui'

function Divider() {
  return <div className="my-14 h-px w-full bg-[#1E2A42]" />
}

function Header() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#1E2A42] bg-[#0E1726] px-8 py-12 sm:px-12 sm:py-14">
      <Glow color="#0EA5E9" className="-right-24 -top-32 h-[460px] w-[680px]" opacity={0.4} />
      <Glow color="#F59E0B" className="-bottom-28 -left-24 h-[360px] w-[460px]" opacity={0.22} />
      <div className="relative">
        <div className="flex items-center gap-3">
          <SunOrb />
          <span className="text-[22px] font-bold tracking-wide text-[#F8FAFC]">
            SkyRa<span className="font-light text-[#38BDF8]"> Energy</span>
          </span>
        </div>
        <p className="mt-7 text-[12px] font-bold uppercase tracking-[0.28em] text-[#38BDF8]">
          Mood Board · Visual Direction
        </p>
        <h1 className="mt-3 text-[clamp(40px,6vw,68px)] font-extrabold leading-[0.98] tracking-tight text-[#F8FAFC]">
          The look &amp; feel of
          <br />
          <span className="font-fraunces font-black italic text-[#7DD3FC]">SkyRa Energy.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[#9FB0C9]">
          A visual language for selling premium solar panels and home batteries to
          Australian homes and businesses — distilled from leading commerce, fintech and
          product experiences researched on Mobbin.
        </p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {['8 core flows', '28 curated references', 'Researched on Mobbin', 'Manrope + Fraunces', 'Sky · Navy · Amber'].map(
            (m) => (
              <Chip key={m}>{m}</Chip>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

function Keywords() {
  return (
    <div className="flex flex-col gap-5">
      <SectionHeading kicker="Brand essence" title="Ten words that should feel true" />
      <div className="flex flex-wrap gap-2.5">
        {KEYWORDS.map((k, i) => (
          <span
            key={k}
            className="rounded-full border px-4 py-2 text-[14px] font-semibold"
            style={{
              color: i % 2 ? '#FBBF24' : '#7DD3FC',
              borderColor: i % 2 ? 'rgba(245,158,11,0.4)' : 'rgba(56,189,248,0.4)',
              background: i % 2 ? 'rgba(245,158,11,0.10)' : 'rgba(56,189,248,0.08)',
            }}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  )
}

function Colors() {
  return (
    <div className="flex flex-col gap-7">
      <SectionHeading kicker="The system" title="Colour palette" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {PALETTE.map((c) => (
          <div key={c.name} className="flex flex-col gap-3">
            <div
              className="flex h-28 items-end rounded-2xl p-3"
              style={{
                background: c.hex,
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              <span className="text-[11px] font-bold tracking-wide" style={{ color: c.on }}>
                {c.hex}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-bold text-[#F8FAFC]">{c.name}</span>
              <span className="text-[12.5px] text-[#8595AE]">{c.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Typography() {
  return (
    <div className="flex flex-col gap-7">
      <SectionHeading kicker="Type system" title="Typography" />
      {/* specimen */}
      <div className="relative overflow-hidden rounded-3xl border border-[#22304C] bg-[#0C1A2E] px-8 py-10">
        <Glow color="#0EA5E9" className="-right-10 -top-16 h-[300px] w-[420px]" opacity={0.32} />
        <p className="relative text-[12px] font-bold uppercase tracking-[0.2em] text-[#7DD3FC]">
          Display · Manrope ExtraBold + Fraunces Black Italic
        </p>
        <div className="relative mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-[clamp(36px,6vw,62px)] font-extrabold tracking-tight text-[#F8FAFC]">
            Go Solar.
          </span>
          <span className="font-fraunces text-[clamp(36px,6vw,62px)] font-black italic text-[#7DD3FC]">
            Save up to 70%.
          </span>
        </div>
      </div>
      {/* three cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-[#24304A] bg-[#131C2E] p-7">
          <div className="text-[64px] font-extrabold leading-none text-[#F8FAFC]">Aa</div>
          <div className="mt-4 text-[20px] font-bold text-[#F8FAFC]">Manrope</div>
          <div className="mt-1 text-[13px] text-[#94A3B8]">Light · Regular · Medium · SemiBold · Bold · ExtraBold</div>
          <p className="mt-3 text-[13px] leading-relaxed text-[#7F8EA8]">
            Workhorse for UI, navigation, body copy and confident headlines.
          </p>
        </div>
        <div className="rounded-3xl border border-[#24304A] bg-[#131C2E] p-7">
          <div className="font-fraunces text-[64px] font-black italic leading-none text-[#F59E0B]">Aa</div>
          <div className="mt-4 font-fraunces text-[20px] italic text-[#F8FAFC]">Fraunces Italic</div>
          <div className="mt-1 text-[13px] text-[#94A3B8]">Light Italic · Italic · Black Italic</div>
          <p className="mt-3 text-[13px] leading-relaxed text-[#7F8EA8]">
            Emotional serif accent — savings figures, hero punchlines, pull quotes.
          </p>
        </div>
        <div className="rounded-3xl border border-[#24304A] bg-[#131C2E] p-7">
          <div className="text-[16px] font-bold text-[#F8FAFC]">Type scale</div>
          <div className="mt-3 flex flex-col gap-2">
            {[
              ['Display', '58 / 800'],
              ['H1', '40 / 800'],
              ['H2', '30 / 800'],
              ['H3', '22 / 700'],
              ['Body', '17 / 400'],
              ['Small', '14 / 500'],
              ['Caption', '12 / 700 · +tracking'],
            ].map(([a, b]) => (
              <div key={a} className="flex items-center justify-between">
                <span className="text-[14px] text-[#C9D5E8]">{a}</span>
                <span className="text-[12.5px] text-[#7F8EA8]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Vocabulary() {
  return (
    <div className="flex flex-col gap-7">
      <SectionHeading kicker="Components & motifs" title="UI vocabulary" />
      <div className="grid gap-4 md:grid-cols-3">
        {/* glass stat */}
        <div className="relative overflow-hidden rounded-3xl border border-[#2A3A58] bg-[#0C1A2E] p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7DD3FC]">Glassmorphism</p>
          <div className="mt-3 rounded-2xl border border-white/15 bg-white/[0.06] p-5">
            <div className="text-[40px] font-extrabold leading-none text-[#F8FAFC]">70%</div>
            <div className="mt-1 text-[13px] font-medium text-[#B6C2D6]">Average bill reduction</div>
          </div>
        </div>
        {/* buttons + badges */}
        <div className="rounded-3xl border border-[#24304A] bg-[#131C2E] p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7DD3FC]">Buttons &amp; badges</p>
          <div className="mt-4 flex flex-col gap-3.5">
            <span className="inline-flex w-fit items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-[15px] font-bold text-[#0F1A2E]">
              Get Free Quote
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0F1A2E] text-white">
                <ArrowRight size={15} />
              </span>
            </span>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#2563EB] py-3 text-[15px] font-bold text-white shadow-[0_8px_20px_-4px_rgba(14,165,233,0.5)]">
              Get a free quote <ArrowRight size={16} />
            </button>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gradient-to-r from-[#38BDF8] to-[#2563EB] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white">
                Most popular
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F59E0B]/50 bg-[#F59E0B]/15 px-3 py-1.5 text-[12px] font-bold text-[#FBBF24]">
                <ShieldCheck size={13} /> CEC Accredited
              </span>
            </div>
          </div>
        </div>
        {/* spec rows */}
        <div className="rounded-3xl border border-[#24304A] bg-[#131C2E] p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7DD3FC]">Cards &amp; surfaces</p>
          <div className="mt-4 flex flex-col gap-3">
            {[
              { icon: <Zap size={18} />, t: '5kW Inverter', s: 'Tier-1 components', c: '#7DD3FC', bg: 'rgba(14,165,233,0.18)' },
              { icon: <Check size={18} />, t: '25-Year Warranty', s: 'Panels & install', c: '#4ADE80', bg: 'rgba(34,197,94,0.18)' },
            ].map((r) => (
              <div key={r.t} className="flex items-center gap-3 rounded-2xl border border-[#22304C] bg-[#0C1A2E] p-3.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ color: r.c, background: r.bg }}>
                  {r.icon}
                </span>
                <div>
                  <div className="text-[14px] font-bold text-[#F8FAFC]">{r.t}</div>
                  <div className="text-[12px] text-[#8595AE]">{r.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function References() {
  return (
    <div className="flex flex-col gap-7">
      <SectionHeading
        kicker="Flows & patterns"
        title="Reference library — researched on Mobbin"
        sub="Each of the eight core flows of the site, mapped to the real screens that inform it. Click any chip to open the exact Mobbin reference."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {FLOWS.map((f) => (
          <Reveal key={f.n}>
            <div className="h-full rounded-3xl border border-[#24304A] bg-[#131C2E] p-6">
              <div className="flex items-center gap-3.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#0EA5E9]/40 bg-[#0EA5E9]/15 text-[16px] font-extrabold text-[#7DD3FC]">
                  {f.n}
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-[19px] font-bold tracking-tight text-[#F8FAFC]">{f.title}</span>
                </div>
                <span className="rounded-full bg-[#1B2740] px-3 py-1 text-[11px] font-semibold tracking-wide text-[#9FB0C9]">
                  {f.tag}
                </span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-[#9FB0C9]">{f.insight}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {f.apps.map((a) => (
                  <LinkChip key={a.name} href={a.url}>
                    {a.name}
                  </LinkChip>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function Principles() {
  return (
    <div className="flex flex-col gap-7">
      <SectionHeading kicker="Design principles" title="Five rules to design by" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <div key={p.title} className="relative overflow-hidden rounded-3xl border border-[#24304A] bg-[#131C2E] p-7">
            <span className="font-fraunces text-[40px] font-black italic leading-none text-[#1E3A5F]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-[18px] font-bold text-[#F8FAFC]">{p.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#9FB0C9]">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MoodBoard() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-10 sm:px-8">
      <Header />
      <Divider />
      <Keywords />
      <Divider />
      <Colors />
      <Divider />
      <Typography />
      <Divider />
      <Vocabulary />
      <Divider />
      <References />
      <Divider />
      <Principles />
    </div>
  )
}
