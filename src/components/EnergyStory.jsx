// ─────────────────────────────────────────────────────────────────────────────
//  EnergyStory — pinned, scroll-driven "store by day, use by night" scene.
//  As the visitor scrolls through 300vh, one full day passes: the sun arcs
//  across the sky charging the panels and battery (amber pulses), then the sky
//  falls to night and the battery powers the glowing home (sky-blue pulses).
//  Built entirely with Framer Motion + hand-drawn SVG — no new dependencies.
//  Reduced motion: the scene renders unpinned at a fixed daytime state with all
//  captions listed, and the global CSS kill-switch stops the pulse animation.
// ─────────────────────────────────────────────────────────────────────────────
import { useRef, useState } from 'react'
import {
  // eslint-disable-next-line no-unused-vars -- `motion` is used in JSX; this config has no jsx-uses-vars rule
  motion, useMotionValue, useMotionValueEvent, useScroll, useSpring,
  useTransform, useReducedMotion,
} from 'framer-motion'

const STARS = [
  [70, 60, 1.6], [180, 120, 1.1], [300, 50, 1.4], [420, 95, 1.0], [520, 40, 1.5],
  [640, 90, 1.1], [760, 45, 1.5], [880, 100, 1.2], [950, 55, 1.6], [240, 190, 1.0],
  [560, 160, 1.0], [820, 170, 1.2], [120, 230, 1.0], [700, 140, 1.0],
]

// Panels drawn as three tilted cells along the left roof slope.
const PANELS = [
  { x: 596, y: 289 }, { x: 634, y: 260 }, { x: 672, y: 231 },
]

const CAPTIONS = [
  {
    kicker: '01 · Daytime',
    title: 'Generate by day',
    body: 'Your panels soak up the sun, powering your home directly while it shines.',
    range: [0.02, 0.1, 0.26, 0.34],
  },
  {
    kicker: '02 · Afternoon',
    title: 'Store the extra',
    body: 'Energy you don’t use flows through the inverter into your battery.',
    range: [0.3, 0.38, 0.52, 0.6],
  },
  {
    kicker: '03 · Night',
    title: 'Power your night',
    body: 'When the sun sets, your battery takes over — clean power after dark.',
    range: [0.64, 0.74, 0.98, 1],
  },
]

export default function EnergyStory() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const staticP = useMotionValue(0.3) // frozen daytime state for reduced motion
  const p = reduce ? staticP : spring

  // ── Phase drivers ─────────────────────────────────────────────────────────
  // nightT: 0 in full day → 1 in full night (drives every colour crossfade).
  const nightT = useTransform(p, [0.5, 0.78], [0, 1])
  const sky = useTransform(
    p,
    [0, 0.45, 0.6, 0.72, 0.85],
    ['#e3f3fe', '#d3ecfd', '#fbd9a6', '#20304f', '#0c1a2e'],
  )
  const ground = useTransform(
    p,
    [0, 0.45, 0.6, 0.72, 0.85],
    ['#dbeafe', '#cde5fb', '#ecc9a1', '#1b2740', '#0a1526'],
  )
  // Text stays dark through the warm dusk (dark-on-sand reads well) and only
  // flips to light once the sky is actually dark.
  const headingColor = useTransform(p, [0.64, 0.76], ['#0f172a', '#ffffff'])
  const kickerColor = useTransform(p, [0.64, 0.76], ['#0284c7', '#7dd3fc'])
  const bodyColor = useTransform(p, [0.64, 0.76], ['#475569', '#94a3b8'])

  // ── Sun travels a full arc, dipping below the horizon at dusk ─────────────
  const sunX = useTransform(p, [0, 0.68], [60, 880], { clamp: true })
  const sunY = useTransform(p, (v) => {
    const t = Math.min(v / 0.68, 1)
    return 470 - Math.sin(t * Math.PI) * 360
  })
  const moonOpacity = useTransform(p, [0.72, 0.85], [0, 1])
  const starsOpacity = useTransform(p, [0.68, 0.85], [0, 1])

  // ── House / windows / battery state ──────────────────────────────────────
  const houseFill = useTransform(nightT, [0, 1], ['#ffffff', '#16233c'])
  const roofFill = useTransform(nightT, [0, 1], ['#475569', '#1e293b'])
  const lineFill = useTransform(nightT, [0, 1], ['#94a3b8', '#334155'])
  const windowFill = useTransform(p, [0.6, 0.78], ['#bfdbfe', '#fde047'])
  const windowGlow = useTransform(p, [0.62, 0.8], [0, 0.55])
  const batteryLevel = useTransform(p, [0.04, 0.56, 0.7, 1], [0.12, 1, 1, 0.62])
  const batteryFill = useTransform(nightT, [0, 1], ['#f59e0b', '#38bdf8'])
  // Subscribe the % readout to the motion value (SVG <text> needs real children).
  const [batteryPct, setBatteryPct] = useState(`${Math.round(batteryLevel.get() * 100)}%`)
  useMotionValueEvent(batteryLevel, 'change', (v) => setBatteryPct(`${Math.round(v * 100)}%`))

  // ── Energy pulse visibility (amber by day, sky-blue by night) ─────────────
  const dayFlow = useTransform(p, [0.04, 0.12, 0.52, 0.64], [0, 1, 1, 0])
  const nightFlow = useTransform(p, [0.66, 0.76, 0.98, 1], [0, 1, 1, 1])
  const scrollHint = useTransform(p, [0, 0.08], [1, 0])

  return (
    <section id="energy-story" ref={ref} className={reduce ? '' : 'relative h-[220vh] sm:h-[300vh]'}>
      <motion.div
        style={{ backgroundColor: sky }}
        className={
          'overflow-hidden ' +
          (reduce ? 'relative py-20' : 'sticky top-0 flex h-screen flex-col')
        }
      >
        {/* Heading */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-6 sm:pt-28 lg:px-12">
          <motion.p style={{ color: kickerColor }} className="text-[12px] font-semibold uppercase tracking-[0.3em]">
            Day &amp; night
          </motion.p>
          <motion.h2
            style={{ color: headingColor }}
            className="mt-3 max-w-xl text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.05] tracking-tight"
          >
            One system that never clocks off.
          </motion.h2>

          {/* Captions — stacked in place, crossfading as the day passes */}
          <div className={reduce ? 'mt-6 grid gap-6 sm:grid-cols-3' : 'relative mt-6 h-32 max-w-md'}>
            {CAPTIONS.map((c) => {
              const inner = (
                <>
                  <motion.p style={reduce ? {} : { color: kickerColor }} className={'text-[12px] font-bold uppercase tracking-[0.2em] ' + (reduce ? 'text-sky-600' : '')}>
                    {c.kicker}
                  </motion.p>
                  <motion.h3 style={reduce ? {} : { color: headingColor }} className={'mt-1.5 text-[22px] font-extrabold tracking-tight sm:text-[24px] ' + (reduce ? 'text-slate-900' : '')}>
                    {c.title}
                  </motion.h3>
                  <motion.p style={reduce ? {} : { color: bodyColor }} className={'mt-1.5 text-[14px] leading-relaxed sm:text-[15px] ' + (reduce ? 'text-slate-600' : '')}>
                    {c.body}
                  </motion.p>
                </>
              )
              if (reduce) return <div key={c.title}>{inner}</div>
              return <Caption key={c.title} progress={p} range={c.range}>{inner}</Caption>
            })}
          </div>
        </div>

        {/* Scene */}
        <div
          className={
            'pointer-events-none relative mx-auto w-full max-w-6xl ' +
            (reduce ? 'mt-10 h-[340px] sm:h-[440px]' : 'flex-1')
          }
        >
          <svg
            viewBox="0 0 1000 560"
            preserveAspectRatio="xMidYMax meet"
            className="absolute bottom-0 right-0 h-full w-[560px] max-w-none sm:left-1/2 sm:right-auto sm:w-full sm:max-w-[1000px] sm:-translate-x-1/2"
            role="img"
            aria-label="Animated diagram: solar panels charge a home battery by day; the battery powers the house at night"
          >
            <defs>
              <filter id="es-soft" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
              <filter id="es-glow" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="16" />
              </filter>
            </defs>

            {/* stars + moon */}
            <motion.g style={{ opacity: starsOpacity }} fill="#e2e8f0">
              {STARS.map(([x, y, r]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />)}
            </motion.g>
            <motion.g style={{ opacity: moonOpacity }}>
              <circle cx="430" cy="115" r="26" fill="#f1f5f9" />
              <circle cx="440" cy="107" r="24" fill="#94a3b8" opacity="0.25" />
            </motion.g>

            {/* sun */}
            <motion.g style={{ x: sunX, y: sunY }}>
              <circle r="46" fill="#fbbf24" opacity="0.35" filter="url(#es-glow)" />
              <circle r="24" fill="#fbbf24" />
              <circle r="24" fill="#fde68a" opacity="0.6" filter="url(#es-soft)" />
            </motion.g>

            {/* ground */}
            <motion.rect x="0" y="470" width="1000" height="90" style={{ fill: ground }} />
            <motion.rect x="0" y="468" width="1000" height="2" style={{ fill: lineFill }} opacity="0.5" />

            {/* ── house ── */}
            {/* body */}
            <motion.rect x="600" y="310" width="260" height="160" rx="3" style={{ fill: houseFill }} />
            {/* roof */}
            <motion.polygon points="580,310 730,196 880,310" style={{ fill: roofFill }} />
            {/* solar panels on the left roof slope */}
            {PANELS.map(({ x, y }) => (
              <g key={x} transform={`rotate(-37 ${x} ${y})`}>
                <rect x={x - 18} y={y - 12} width="36" height="24" rx="2" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="1.2" />
                <line x1={x} y1={y - 12} x2={x} y2={y + 12} stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
                <line x1={x - 18} y1={y} x2={x + 18} y2={y} stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
              </g>
            ))}
            {/* windows (glow ramps up at night) */}
            {[[634, 352], [774, 352]].map(([wx, wy]) => (
              <g key={wx}>
                <motion.rect
                  x={wx - 12} y={wy - 12} width="72" height="72" rx="10"
                  fill="#fbbf24" filter="url(#es-soft)" style={{ opacity: windowGlow }}
                />
                <motion.rect x={wx} y={wy} width="48" height="48" rx="4" style={{ fill: windowFill }} />
                <motion.rect x={wx + 22} y={wy} width="4" height="48" style={{ fill: lineFill }} />
                <motion.rect x={wx} y={wy + 22} width="48" height="4" style={{ fill: lineFill }} />
              </g>
            ))}
            {/* door */}
            <motion.rect x="706" y="404" width="48" height="66" rx="3" style={{ fill: lineFill }} />

            {/* ── inverter + battery on the right wall ── */}
            <motion.rect x="902" y="336" width="40" height="30" rx="4" style={{ fill: lineFill }} />
            <circle cx="922" cy="351" r="6" fill="#0ea5e9" />
            <motion.rect x="898" y="378" width="48" height="92" rx="6" style={{ fill: houseFill }} stroke="#64748b" strokeWidth="1.5" />
            {/* charge level — scaleY from the bottom of the cavity */}
            <motion.rect
              x="904" y="386" width="36" height="76" rx="3"
              style={{ fill: batteryFill, scaleY: batteryLevel, transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            />
            <text
              x="922" y="430" textAnchor="middle"
              className="select-none"
              fill="#0f172a"
              fontSize="15" fontWeight="800" fontFamily="Manrope, system-ui, sans-serif"
            >
              {batteryPct}
            </text>

            {/* ── energy pulses ── */}
            {/* day: sun → panels */}
            <motion.path
              d="M 380 150 C 470 160 560 190 636 240"
              fill="none" stroke="#f59e0b" strokeWidth="5" className="energy-pulse"
              style={{ opacity: dayFlow }}
            />
            {/* day: panels → inverter → battery */}
            <motion.path
              d="M 668 262 C 740 300 830 322 902 350 M 922 366 L 922 378"
              fill="none" stroke="#f59e0b" strokeWidth="5" className="energy-pulse"
              style={{ opacity: dayFlow }}
            />
            {/* night: battery → home (windows) */}
            <motion.path
              d="M 898 440 C 850 470 790 452 726 420 M 726 420 C 700 406 672 396 658 394"
              fill="none" stroke="#38bdf8" strokeWidth="5" className="energy-pulse"
              style={{ opacity: nightFlow }}
            />
          </svg>
        </div>

        {/* scroll hint */}
        {!reduce && (
          <motion.div
            style={{ opacity: scrollHint, color: headingColor }}
            className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[12px] font-semibold uppercase tracking-[0.24em]"
          >
            Keep scrolling
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

// One caption block: fades/rises in and out over its progress range.
function Caption({ progress, range, children }) {
  const [a, b, c, d] = range
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, d >= 1 ? 1 : 0])
  const y = useTransform(progress, [a, b], [18, 0])
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0">
      {children}
    </motion.div>
  )
}
