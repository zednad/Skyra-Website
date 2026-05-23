import { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
  TrendingDown,
  BatteryCharging,
  Home,
  Leaf,
  Award,
  Sun,
  PiggyBank
} from 'lucide-react'

const BENEFITS = [
  {
    icon: TrendingDown,
    title: 'Slash Energy Bills',
    description: 'Cut electricity costs by up to 70% instantly. The system pays for itself in just 3-5 years.',
    theme: {
      iconBg: 'bg-emerald-500',
      iconText: 'text-emerald-500',
      lightBg: 'bg-emerald-50/50',
      borderHover: 'hover:border-emerald-300',
      shadowHover: 'hover:shadow-emerald-500/10',
      sphereFrom: '#d1fae5',
      sphereMid: '#10b981',
      sphereTo: '#059669',
      glowColor: 'rgba(16,185,129,0.35)',
    },
    stats: [
      { label: 'Savings', value: 'Up to 70%' },
    ]
  },
  {
    icon: BatteryCharging,
    title: 'Energy Independence',
    description: 'Store excess solar energy during the day to power your home through the night or during blackouts.',
    theme: {
      iconBg: 'bg-sky-500',
      iconText: 'text-sky-500',
      lightBg: 'bg-sky-50/50',
      borderHover: 'hover:border-sky-300',
      shadowHover: 'hover:shadow-sky-500/10',
      sphereFrom: '#e0f2fe',
      sphereMid: '#0ea5e9',
      sphereTo: '#0284c7',
      glowColor: 'rgba(14,165,233,0.35)',
    },
    stats: [
      { label: 'Protection', value: '24/7' },
    ]
  },
  {
    icon: Home,
    title: 'Increase Property Value',
    description: 'Homes equipped with modern solar and battery systems sell faster and at a premium.',
    theme: {
      iconBg: 'bg-indigo-500',
      iconText: 'text-indigo-500',
      lightBg: 'bg-indigo-50/50',
      borderHover: 'hover:border-indigo-300',
      shadowHover: 'hover:shadow-indigo-500/10',
      sphereFrom: '#e0e7ff',
      sphereMid: '#6366f1',
      sphereTo: '#4338ca',
      glowColor: 'rgba(99,102,241,0.35)',
    },
    stats: [
      { label: 'Value Bump', value: '~4%' },
    ]
  },
  {
    icon: Leaf,
    title: 'Shrink Carbon Footprint',
    description: 'A typical residential system offsets tonnes of CO2 emissions, equal to planting ~100 trees yearly.',
    theme: {
      iconBg: 'bg-teal-500',
      iconText: 'text-teal-500',
      lightBg: 'bg-teal-50/50',
      borderHover: 'hover:border-teal-300',
      shadowHover: 'hover:shadow-teal-500/10',
      sphereFrom: '#ccfbf1',
      sphereMid: '#14b8a6',
      sphereTo: '#0d9488',
      glowColor: 'rgba(20,184,166,0.35)',
    },
    stats: [
      { label: 'CO2 Offset', value: '4-6T/yr' },
    ]
  },
]

// Individual benefit card with 3D tilt + 3D sphere icon
function BenefitCard({ benefit, index, inView }) {
  const cardRef = useRef(null)
  const Icon = benefit.icon

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6])

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - (rect.left + rect.width / 2)) / rect.width)
    mouseY.set((e.clientY - (rect.top + rect.height / 2)) / rect.height)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '900px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`group relative flex items-center gap-4 bg-white rounded-2xl p-4 lg:p-5 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-shadow duration-300 cursor-default ${benefit.theme.borderHover} ${benefit.theme.shadowHover} hover:shadow-xl`}
      >
        {/* Icon Column — flat background, animations preserved */}
        <div className="shrink-0 w-14 h-14 lg:w-16 lg:h-16 relative" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div
            className={`w-full h-full rounded-xl flex items-center justify-center ${benefit.theme.iconBg} shadow-md`}
            whileHover={{ scale: 1.12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Icon size={24} className="text-white" strokeWidth={2} />
          </motion.div>
        </div>

        {/* Text Column */}
        <div className="flex-1 min-w-0 relative z-10">
          <h3 className="text-lg lg:text-xl font-bold tracking-tight text-slate-900 mb-1 leading-tight truncate">
            {benefit.title}
          </h3>
          <p className="text-slate-500 text-xs lg:text-sm leading-snug font-medium line-clamp-2">
            {benefit.description}
          </p>
        </div>

        {/* Vertical Separator */}
        <div className="hidden sm:block w-px self-stretch bg-slate-100 mx-2" />

        {/* Stats Column */}
        <div className="hidden sm:flex flex-col gap-2 shrink-0 relative z-10">
          {benefit.stats.map((stat, i) => (
            <div key={i} className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 group-hover:bg-white transition-colors text-center min-w-[90px]">
              <div className="text-[9px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">{stat.label}</div>
              <div className={`text-sm lg:text-base font-black ${benefit.theme.iconText} leading-none`}>{stat.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      id="why-solar"
      ref={ref}
      className="min-h-screen relative overflow-hidden bg-slate-50 flex flex-col justify-center py-12 md:py-16"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col justify-center h-full">

        {/* Section header */}
        <motion.div
          className="mb-8 md:mb-10 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tight leading-[1.1]">
            Stop Renting Your Power. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Own It.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Take control of your energy future and protect yourself from rising electricity prices.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-12 max-w-6xl mx-auto w-full">
          {BENEFITS.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} inView={inView} />
          ))}
        </div>

        {/* Rebates Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2rem] p-6 lg:p-8 overflow-hidden shadow-2xl shadow-blue-900/15 border border-slate-700 max-w-6xl mx-auto w-full"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/15 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 flex border-2 flex-col md:flex-row items-center justify-between gap-6 md:gap-10 border-transparent">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 border border-blue-500/30">
                <Award size={12} />
                <span>Government Incentives</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight leading-tight">
                Unlock Savings with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Victorian Rebates</span>
              </h3>
              <p className="text-slate-300 text-sm lg:text-base font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
                Switch to renewables affordably. We handle the paperwork to ensure you receive your maximum eligible incentives upfront.
              </p>
            </div>

            <div className="flex flex-row gap-4 shrink-0 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <div className="flex-1 md:flex-none flex items-center gap-4 bg-slate-800/80 backdrop-blur-md rounded-xl p-4 border border-slate-700 hover:border-sky-500/50 transition-colors group min-w-[200px]">
                <div className="p-2.5 rounded-lg bg-blue-500/20 text-sky-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Sun size={24} />
                </div>
                <div>
                  <div className="text-white font-black text-xl leading-tight mb-0.5">Up to $1,400</div>
                  <div className="text-slate-400 text-[11px] font-medium leading-tight">Solar Panel Rebate</div>
                </div>
              </div>

              <div className="flex-1 md:flex-none flex items-center gap-4 bg-slate-800/80 backdrop-blur-md rounded-xl p-4 border border-slate-700 hover:border-sky-500/50 transition-colors group min-w-[200px]">
                <div className="p-2.5 rounded-lg bg-blue-500/20 text-sky-400 shrink-0 group-hover:scale-110 transition-transform">
                  <BatteryCharging size={24} />
                </div>
                <div>
                  <div className="text-white font-black text-xl leading-tight mb-0.5">Up to 30% Off</div>
                  <div className="text-slate-400 text-[11px] font-medium leading-tight">Battery Discounts</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
