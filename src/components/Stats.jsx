import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Home, Leaf, Star, Clock } from 'lucide-react'

const STATS = [
  {
    icon: Home,
    value: 3200,
    suffix: '+',
    label: 'Homes Powered',
    description: 'Across Victoria',
    sphereFrom: '#e0f2fe',
    sphereMid: '#0ea5e9',
    sphereTo: '#0369a1',
    glowColor: 'rgba(14,165,233,0.4)',
  },
  {
    icon: Leaf,
    value: 12800,
    suffix: ' tons',
    label: 'CO₂ Saved',
    description: 'Equivalent to planting 210k trees',
    sphereFrom: '#ccfbf1',
    sphereMid: '#14b8a6',
    sphereTo: '#0d9488',
    glowColor: 'rgba(20,184,166,0.4)',
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '/5',
    label: 'Customer Rating',
    description: 'From 900+ verified reviews',
    decimals: 1,
    sphereFrom: '#fef9c3',
    sphereMid: '#eab308',
    sphereTo: '#ca8a04',
    glowColor: 'rgba(234,179,8,0.4)',
  },
  {
    icon: Clock,
    value: 14,
    suffix: ' years',
    label: 'In Business',
    description: 'Trusted Victorian solar experts since 2011',
    sphereFrom: '#ede9fe',
    sphereMid: '#8b5cf6',
    sphereTo: '#6d28d9',
    glowColor: 'rgba(139,92,246,0.4)',
  },
]

function AnimatedNumber({ target, suffix, decimals = 0, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  )
}

function StatCard({ stat, index, inView }) {
  const cardRef = useRef(null)
  const { icon: Icon, value, suffix, label, description, decimals } = stat

  // 3D tilt on hover
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

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
      style={{ perspective: '800px' }}
    >
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* 3D Sphere Icon */}
        <div className="relative mb-5" style={{ transformStyle: 'preserve-3d' }}>
          {/* Ground glow shadow */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-4 rounded-full blur-lg opacity-60"
            style={{ background: stat.glowColor }}
          />

          {/* Floating bob animation */}
          <motion.div
            className="w-16 h-16 rounded-2xl relative overflow-hidden"
            style={{
              background: `radial-gradient(circle at 35% 32%, ${stat.sphereFrom}, ${stat.sphereMid} 50%, ${stat.sphereTo})`,
              boxShadow: `0 12px 28px ${stat.glowColor}, 0 4px 8px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.35)`,
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: index * 0.5,
              ease: 'easeInOut',
            }}
          >
            {/* Specular highlight */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.5) 0%, transparent 55%)',
              }}
            />
            {/* Rim light */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(circle at 75% 80%, rgba(255,255,255,0.12) 0%, transparent 40%)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon size={26} className="text-white relative z-10" />
            </div>
          </motion.div>
        </div>

        {/* Number — slot-machine 3D reveal */}
        <div style={{ perspective: '400px' }}>
          <motion.p
            className="text-4xl lg:text-5xl font-black text-gray-900 leading-none mb-1"
            initial={{ rotateX: 75, opacity: 0 }}
            animate={inView ? { rotateX: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: index * 0.1 + 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: 'block', transformStyle: 'preserve-3d' }}
          >
            <AnimatedNumber
              target={value}
              suffix={suffix}
              decimals={decimals}
              inView={inView}
            />
          </motion.p>
        </div>

        <motion.p
          className="text-sky-700 font-semibold text-sm mb-1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
        >
          {label}
        </motion.p>
        <motion.p
          className="text-gray-400 text-xs leading-snug"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
