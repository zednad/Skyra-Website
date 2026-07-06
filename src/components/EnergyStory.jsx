// ─────────────────────────────────────────────────────────────────────────────
//  EnergyStory - pinned, scroll-driven "store by day, use by night" scene.
//  Two 2-second looping renders of the same solar home (one daytime, one
//  night) are stacked; the night layer crossfades in through a brief golden
//  dusk wash as the visitor scrolls, so the scene appears to pass from day
//  into night. A row of glass status chips (Panels → Battery → Home) shows
//  the energy flow with animated pulse connectors - amber by day (panels
//  charging the battery), sky-blue at night (battery powering the home).
//  Built with Framer Motion only; no new dependencies.
//  Phones and reduced motion get a static, unpinned section instead: the two
//  renders shown side by side (no video, which crops badly at portrait sizes)
//  with the three story beats as simple rows.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react'
import {
  motion, useMotionValue, useMotionValueEvent, useScroll, useSpring,
  useTransform, useReducedMotion,
} from 'framer-motion'
import { Sun, BatteryCharging, Home } from 'lucide-react'

const DAY_VIDEO = '/videos/energy-day.mp4'
const NIGHT_VIDEO = '/videos/energy-night.mp4'
const DAY_POSTER = '/videos/energy-day-poster.jpg'
const NIGHT_POSTER = '/videos/energy-night-poster.jpg'

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
    body: 'When the sun sets, your battery takes over with clean power after dark.',
    range: [0.64, 0.74, 0.98, 1],
  },
]

const PHONE_QUERY = '(max-width: 639px)'

export default function EnergyStory() {
  const reduce = useReducedMotion()
  const [isPhone, setIsPhone] = useState(() => window.matchMedia(PHONE_QUERY).matches)
  const staticMode = reduce || isPhone
  const ref = useRef(null)
  const dayVideoRef = useRef(null)
  const nightVideoRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia(PHONE_QUERY)
    const onChange = (e) => setIsPhone(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const staticP = useMotionValue(0.3) // frozen daytime state for reduced motion
  const p = reduce ? staticP : spring

  // ── Day → night video crossfade ───────────────────────────────────────────
  const nightOpacity = useTransform(p, [0.55, 0.8], [0, 1])
  const duskWash = useTransform(p, [0.45, 0.62, 0.78], [0, 0.45, 0])

  // Only run the loops while the scene is on screen.
  useEffect(() => {
    if (staticMode || !ref.current) return undefined
    const io = new IntersectionObserver(([entry]) => {
      [dayVideoRef.current, nightVideoRef.current].forEach((v) => {
        if (!v) return
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      })
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [staticMode])

  // ── Glass surfaces + text flip to dark mode at night ──────────────────────
  const panelBg = useTransform(p, [0.6, 0.78], ['rgba(255,255,255,0.78)', 'rgba(15,23,42,0.68)'])
  const panelBorder = useTransform(p, [0.6, 0.78], ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.14)'])
  const headingColor = useTransform(p, [0.64, 0.76], ['#0f172a', '#ffffff'])
  const kickerColor = useTransform(p, [0.64, 0.76], ['#0284c7', '#7dd3fc'])
  const bodyColor = useTransform(p, [0.64, 0.76], ['#475569', '#cbd5e1'])
  const chipBg = useTransform(p, [0.6, 0.78], ['rgba(255,255,255,0.88)', 'rgba(15,23,42,0.8)'])
  const chipText = useTransform(p, [0.64, 0.76], ['#0f172a', '#f1f5f9'])
  const chipSub = useTransform(p, [0.64, 0.76], ['#64748b', '#94a3b8'])

  // ── Energy state ──────────────────────────────────────────────────────────
  const dayFlow = useTransform(p, [0.04, 0.12, 0.52, 0.64], [0, 1, 1, 0])
  const nightFlow = useTransform(p, [0.66, 0.76, 0.98, 1], [0, 1, 1, 1])
  const dayLabel = useTransform(p, [0.66, 0.76], [1, 0]) // day text visible until night
  const batteryLevel = useTransform(p, [0.04, 0.56, 0.7, 1], [0.12, 1, 1, 0.62])
  const batteryFill = useTransform(p, [0.6, 0.78], ['#f59e0b', '#38bdf8'])
  const [batteryPct, setBatteryPct] = useState(`${Math.round(batteryLevel.get() * 100)}%`)
  useMotionValueEvent(batteryLevel, 'change', (v) => setBatteryPct(`${Math.round(v * 100)}%`))
  const scrollHint = useTransform(p, [0, 0.08], [1, 0])
  const hintColor = useTransform(p, [0.64, 0.76], ['#334155', '#e2e8f0'])

  const chipColors = { bg: chipBg, text: chipText, sub: chipSub, border: panelBorder }

  // Phones + reduced motion: no video and no pinned scroll. The two renders
  // sit side by side and the story reads as plain rows.
  if (staticMode) {
    const icons = [Sun, BatteryCharging, Home]
    return (
      <section id="energy-story" className="bg-[#0a1b2e] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-sky-300">Day &amp; night</p>
          <h2 className="mt-3 text-[clamp(26px,3.6vw,42px)] font-extrabold leading-[1.08] tracking-tight text-white">
            One system that never clocks off.
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <img
              src={DAY_POSTER}
              alt="Illustration of a solar home generating power during the day"
              loading="lazy"
              className="aspect-video w-full rounded-xl object-cover ring-1 ring-white/10"
            />
            <img
              src={NIGHT_POSTER}
              alt="Illustration of the same home running on its battery at night"
              loading="lazy"
              className="aspect-video w-full rounded-xl object-cover ring-1 ring-white/10"
            />
          </div>
          <div className="mt-8 space-y-6">
            {CAPTIONS.map((c, i) => {
              const Icon = icons[i]
              return (
                <div key={c.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-amber-300">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-300">{c.kicker}</p>
                    <h3 className="mt-0.5 text-[17px] font-extrabold tracking-tight text-white">{c.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-slate-300">{c.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="energy-story" ref={ref} className={reduce ? '' : 'relative h-[220vh] sm:h-[300vh]'}>
      <div
        className={
          'overflow-hidden bg-slate-900 ' +
          (reduce ? 'relative' : 'sticky top-0 h-screen')
        }
      >
        {/* ── Video backdrop: same scene rendered by day and by night ── */}
        <video
          ref={dayVideoRef}
          src={DAY_VIDEO}
          poster={DAY_POSTER}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <motion.video
          ref={nightVideoRef}
          src={NIGHT_VIDEO}
          poster={NIGHT_POSTER}
          style={{ opacity: nightOpacity }}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        {/* constant gentle scrim so glass UI reads over the bright scene */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/25 via-transparent to-slate-900/35" />
        {/* golden-hour wash bridging the day → night crossfade */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-amber-500/70 via-rose-400/35 to-transparent"
          style={{ opacity: reduce ? 0 : duskWash }}
        />

        {/* ── Content ── */}
        <div
          className={
            'relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between px-5 sm:px-6 lg:px-12 ' +
            (reduce ? 'gap-10 py-20' : 'h-full pb-16 pt-24 sm:pb-20 sm:pt-28')
          }
        >
          {/* glass text panel */}
          <motion.div
            style={{ backgroundColor: panelBg, borderColor: panelBorder }}
            className="max-w-xl rounded-3xl border p-6 shadow-xl shadow-slate-900/15 backdrop-blur-md sm:p-8"
          >
            <motion.p style={{ color: kickerColor }} className="text-[12px] font-semibold uppercase tracking-[0.3em]">
              Day &amp; night
            </motion.p>
            <motion.h2
              style={{ color: headingColor }}
              className="mt-3 text-[clamp(26px,3.6vw,42px)] font-extrabold leading-[1.05] tracking-tight"
            >
              One system that never clocks off.
            </motion.h2>

            <div className={reduce ? 'mt-5 grid gap-5' : 'relative mt-5 h-28'}>
              {CAPTIONS.map((c) => {
                const inner = (
                  <>
                    <motion.p style={reduce ? {} : { color: kickerColor }} className={'text-[11px] font-bold uppercase tracking-[0.2em] ' + (reduce ? 'text-sky-600' : '')}>
                      {c.kicker}
                    </motion.p>
                    <motion.h3 style={reduce ? {} : { color: headingColor }} className={'mt-1 text-[20px] font-extrabold tracking-tight sm:text-[22px] ' + (reduce ? 'text-slate-900' : '')}>
                      {c.title}
                    </motion.h3>
                    <motion.p style={reduce ? {} : { color: bodyColor }} className={'mt-1 text-[14px] leading-relaxed sm:text-[15px] ' + (reduce ? 'text-slate-600' : '')}>
                      {c.body}
                    </motion.p>
                  </>
                )
                if (reduce) return <div key={c.title}>{inner}</div>
                return <Caption key={c.title} progress={p} range={c.range}>{inner}</Caption>
              })}
            </div>
          </motion.div>

          {/* energy-flow chips */}
          <div className="w-full max-w-4xl lg:mx-auto">
            <div className="flex flex-col items-stretch sm:flex-row sm:items-center">
              <StatusChip
                colors={chipColors}
                icon={<Sun size={19} />}
                title="Solar panels"
                day="Generating"
                night="Idle"
                dayLabel={dayLabel}
                nightFlow={nightFlow}
                reduce={reduce}
              />
              <Connector dayFlow={dayFlow} nightFlow={nightFlow} reduce={reduce} />
              <StatusChip
                colors={chipColors}
                icon={<BatteryCharging size={19} />}
                title="Home battery"
                day="Charging"
                night="Discharging"
                dayLabel={dayLabel}
                nightFlow={nightFlow}
                reduce={reduce}
              >
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-400/40">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: reduce ? '#f59e0b' : batteryFill,
                        scaleX: batteryLevel,
                        originX: 0,
                      }}
                    />
                  </div>
                  <motion.span style={reduce ? {} : { color: chipText }} className={'text-[12px] font-bold ' + (reduce ? 'text-slate-900' : '')}>
                    {batteryPct}
                  </motion.span>
                </div>
              </StatusChip>
              <Connector dayFlow={dayFlow} nightFlow={nightFlow} reduce={reduce} />
              <StatusChip
                colors={chipColors}
                icon={<Home size={19} />}
                title="Your home"
                day="On solar"
                night="On battery"
                dayLabel={dayLabel}
                nightFlow={nightFlow}
                reduce={reduce}
              />
            </div>
          </div>
        </div>

        {/* scroll hint */}
        {!reduce && (
          <motion.div
            style={{ opacity: scrollHint, color: hintColor }}
            className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.24em]"
          >
            Keep scrolling
          </motion.div>
        )}
      </div>
    </section>
  )
}

// One glass status chip; day/night status lines crossfade in place.
function StatusChip({ colors, icon, title, day, night, dayLabel, nightFlow, reduce, children }) {
  return (
    <motion.div
      style={reduce ? {} : { backgroundColor: colors.bg, borderColor: colors.border }}
      className={
        'flex min-w-0 flex-1 items-center gap-3 rounded-2xl border p-3.5 shadow-lg shadow-slate-900/15 backdrop-blur-md sm:p-4 ' +
        (reduce ? 'border-white/60 bg-white/90' : '')
      }
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30">
        {icon}
      </span>
      <div className="min-w-0">
        <motion.div style={reduce ? {} : { color: colors.sub }} className={'text-[11px] font-semibold uppercase tracking-wider ' + (reduce ? 'text-slate-500' : '')}>
          {title}
        </motion.div>
        <div className="relative h-5 text-[14px] font-bold leading-5">
          {reduce ? (
            <span className="whitespace-nowrap text-slate-900">{day}</span>
          ) : (
            <>
              {/* invisible sizer so the longer label sets the chip width */}
              <span className="invisible whitespace-nowrap">
                {night.length > day.length ? night : day}
              </span>
              <motion.span style={{ opacity: dayLabel, color: colors.text }} className="absolute inset-0 whitespace-nowrap">
                {day}
              </motion.span>
              <motion.span style={{ opacity: nightFlow, color: colors.text }} className="absolute inset-0 whitespace-nowrap">
                {night}
              </motion.span>
            </>
          )}
        </div>
        {children}
      </div>
    </motion.div>
  )
}

// Pulse connector between chips: horizontal on desktop, vertical on mobile.
// Amber while the sun charges the system; sky-blue when the battery takes over.
function Connector({ dayFlow, nightFlow, reduce }) {
  return (
    <div className="shrink-0 self-center" aria-hidden="true">
      {/* desktop: horizontal */}
      <svg className="hidden h-4 w-20 sm:block" viewBox="0 0 56 16" preserveAspectRatio="none">
        <line x1="2" y1="8" x2="54" y2="8" stroke="rgba(148,163,184,0.5)" strokeWidth="2" />
        <motion.line
          x1="2" y1="8" x2="54" y2="8"
          stroke="#f59e0b" strokeWidth="4" className="energy-pulse"
          style={{ opacity: reduce ? 1 : dayFlow }}
        />
        {!reduce && (
          <motion.line
            x1="2" y1="8" x2="54" y2="8"
            stroke="#38bdf8" strokeWidth="4" className="energy-pulse"
            style={{ opacity: nightFlow }}
          />
        )}
      </svg>
      {/* mobile: vertical */}
      <svg className="h-8 w-4 sm:hidden" viewBox="0 0 16 32">
        <line x1="8" y1="2" x2="8" y2="30" stroke="rgba(148,163,184,0.5)" strokeWidth="2" />
        <motion.line
          x1="8" y1="2" x2="8" y2="30"
          stroke="#f59e0b" strokeWidth="4" className="energy-pulse"
          style={{ opacity: reduce ? 1 : dayFlow }}
        />
        {!reduce && (
          <motion.line
            x1="8" y1="2" x2="8" y2="30"
            stroke="#38bdf8" strokeWidth="4" className="energy-pulse"
            style={{ opacity: nightFlow }}
          />
        )}
      </svg>
    </div>
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
