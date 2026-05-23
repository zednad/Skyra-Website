import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Home, Leaf, Star, Clock } from 'lucide-react'

const STATS = [
  {
    icon: Home,
    value: 3200,
    suffix: '+',
    label: 'Homes Powered',
    description: 'Across Victoria',
  },
  {
    icon: Leaf,
    value: 12800,
    suffix: 'tons',
    label: 'CO₂ Saved',
    description: 'Equal to planting 210k trees',
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '/5',
    label: 'Customer Rating',
    description: 'From 900+ verified reviews',
    decimals: 1,
  },
  {
    icon: Clock,
    value: 14,
    suffix: 'years',
    label: 'In Business',
    description: 'Trusted Victorian experts since 2011',
  },
]

// Eased count-up driven by requestAnimationFrame for buttery numbers.
function AnimatedNumber({ target, decimals = 0, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const startTime = performance.now()
    let raf

    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setCount(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  return (
    <span className="tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
    </span>
  )
}

function StatCell({ stat, index, inView, withDivider }) {
  const { icon: Icon, value, suffix, label, description, decimals } = stat

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative px-6 lg:px-10 py-6 lg:py-2 ${
        withDivider ? 'lg:border-l border-slate-200/70' : ''
      }`}
    >
      {/* Eyebrow: tiny monochrome icon + uppercase label */}
      <div className="flex items-center gap-2 mb-4 lg:mb-5">
        <Icon size={13} strokeWidth={2} className="text-slate-400" />
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-slate-500">
          {label}
        </span>
      </div>

      {/* Large display number — sky-tinted suffix */}
      <p className="text-[2.25rem] lg:text-[3rem] font-extrabold text-slate-900 leading-[1] tracking-[-0.03em] mb-3 flex items-baseline gap-1.5 flex-wrap">
        <AnimatedNumber target={value} decimals={decimals} inView={inView} />
        <span className="text-sky-500 text-lg lg:text-xl font-bold tracking-tight">
          {suffix}
        </span>
      </p>

      {/* Description */}
      <p className="text-slate-500 text-[13px] leading-snug max-w-[16ch]">
        {description}
      </p>
    </motion.div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative bg-white border-b border-slate-100 overflow-hidden"
    >
      {/* Subtle ambient wash to soften the join from the dark hero above */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCell
              key={stat.label}
              stat={stat}
              index={i}
              inView={inView}
              withDivider={i > 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
