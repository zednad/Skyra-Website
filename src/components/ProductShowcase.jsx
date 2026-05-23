import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const BATTERY_PRODUCTS = [
  {
    id: '01',
    name: 'Sigenergy',
    model: 'SigenStor 5-in-1',
    tagline: "Australia's #1 Battery Brand",
    description:
      "Ranked #1 in Australia by blended capacity (SunWiz, March 2025). A true 5-in-1 system with built-in EV charging and AI-powered energy management — built by Huawei solar engineering veterans.",
    image: '/images/batteries/sigenergy.webp',
    badge: '#1 in Australia',
    badgeStyle: 'gold',
    specs: [
      { label: 'Capacity', value: '5–48 kWh' },
      { label: 'Chemistry', value: 'LFP' },
      { label: 'Efficiency', value: '97.6%' },
      { label: 'Protection', value: 'IP65' },
    ],
    idealFor:
      'Tech-forward households looking for a fully integrated energy ecosystem — especially those who own or plan to buy an EV.',
  },
  {
    id: '02',
    name: 'Fox ESS',
    model: 'EQ4800',
    tagline: 'Scalable, Safe & Australian-Backed',
    description:
      "Modular LFP battery with 100% depth of discharge. Stack from 4.66 kWh up to 42 kWh across 9 units. Victorian rebate eligible with a local Melbourne office and Ian Thorpe as brand ambassador.",
    image: '/images/batteries/foxess_eq4800.jpg',
    badge: 'VIC Rebate Eligible',
    badgeStyle: 'sky',
    specs: [
      { label: 'Capacity', value: '4.66–42 kWh' },
      { label: 'Chemistry', value: 'LFP' },
      { label: 'Efficiency', value: '≥95%' },
      { label: 'Protection', value: 'IP65' },
    ],
    idealFor:
      'Households wanting a flexible, expandable system that grows with their solar usage. Ideal for VPP programs such as Origin Energy.',
  },
  {
    id: '03',
    name: 'LG Energy Solution',
    model: 'RESU 16H Prime',
    tagline: 'Six Decades of Electronics Excellence',
    description:
      "Premium single-unit 16 kWh battery from one of the world's largest lithium-ion manufacturers. DC-coupled design delivers up to 97.5% round-trip efficiency with no stacking required.",
    image: '/images/batteries/lg_resu_16h.png',
    badge: 'Global Tier-One',
    badgeStyle: 'sky',
    specs: [
      { label: 'Capacity', value: '16 kWh' },
      { label: 'Chemistry', value: 'NMC' },
      { label: 'Efficiency', value: '97.5%' },
      { label: 'Protection', value: 'IP55' },
    ],
    idealFor:
      'Homeowners who want a single, high-capacity unit from a globally recognised brand with large evening energy loads.',
  },
]

const SOLAR_PRODUCTS = [
  {
    id: '01',
    name: 'Jinko Solar',
    description: 'Ultra-high efficiency Tiger Neo panels',
    image:
      'https://images.unsplash.com/photo-1509391366360-1e97f52cefd3?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '02',
    name: 'Trina Solar',
    description: 'Premium Vertex S+ with advanced glass',
    image:
      'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '03',
    name: 'REC Alpha',
    description: 'Award-winning heterojunction technology',
    image:
      'https://images.unsplash.com/photo-1548611716-e0df40141f17?q=80&w=1000&auto=format&fit=crop',
  },
]

const badgeColors = {
  gold: 'bg-amber-50 text-amber-600 border border-amber-200',
  sky: 'bg-sky-50 text-sky-600 border border-sky-100',
}

function BatteryCard({ product, index }) {
  const cardRef = useRef(null)

  // Raw mouse position values (normalised -0.5 to 0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring smoothing for buttery tilt
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 })

  // Map to rotation degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12])

  // Specular glare position (percentage across the card)
  const glareX = useTransform(springX, [-0.5, 0.5], [20, 80])
  const glareY = useTransform(springY, [-0.5, 0.5], [20, 80])
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.13) 0%, transparent 55%)`

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - (rect.left + rect.width / 2)) / rect.width)
    mouseY.set((e.clientY - (rect.top + rect.height / 2)) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    /* Perspective wrapper — stays flat in the DOM */
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
      className="cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.12 + 0.2, duration: 0.55, ease: 'easeOut' }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative flex flex-col bg-white rounded-[2rem] shadow-[0_8px_32px_rgb(0,0,0,0.05)] border border-slate-100/80 hover:shadow-[0_24px_60px_rgb(0,0,0,0.14)] transition-shadow duration-300 overflow-hidden"
      >
        {/* Specular glare overlay — moves with tilt for realism */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] pointer-events-none z-30"
          style={{ background: glareBackground }}
        />

        {/* Dark premium image panel */}
        <div
          className="bg-gradient-to-br from-slate-800 to-slate-950 aspect-[4/3] flex items-center justify-center relative overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Number badge — top left */}
          <span className="absolute top-4 left-4 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-bold border border-white/20">
            {product.id}
          </span>

          {/* Ambient glow on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="w-60 h-60 bg-sky-400/10 rounded-full blur-[60px]" />
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />

          {/* Battery image — lifted in Z so it floats above the card surface */}
          <img
            src={product.image}
            alt={`${product.name} ${product.model} home battery`}
            loading="lazy"
            decoding="async"
            onError={(e) => { e.target.src = '/sig-energy.png' }}
            style={{ transform: 'translateZ(30px)' }}
            className="w-4/5 h-4/5 object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)] scale-100 group-hover:scale-[1.06] transition-transform duration-700 ease-out relative z-10"
          />
        </div>

        {/* Card content */}
        <div className="flex flex-col flex-1 p-5 gap-3.5">

          {/* Header row: model label + badge on one line */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-sky-500">
              {product.model}
            </p>
            <span className={`text-[0.6rem] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${badgeColors[product.badgeStyle]}`}>
              {product.badge}
            </span>
          </div>

          {/* Brand name + tagline */}
          <div className="-mt-1">
            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h3>
            <p className="text-slate-400 text-xs italic mt-0.5">{product.tagline}</p>
          </div>

          {/* Horizontal spec chips */}
          <div className="flex flex-wrap gap-1.5">
            {product.specs.map((spec) => (
              <span
                key={spec.label}
                className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-3 py-1.5"
              >
                <span className="text-[0.55rem] font-bold tracking-widest uppercase text-slate-400 leading-none">
                  {spec.label}
                </span>
                <span className="w-px h-2.5 bg-slate-200 rounded-full" />
                <span className="text-xs font-bold text-slate-700 leading-none">{spec.value}</span>
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed">{product.description}</p>

          {/* Ideal For — inline with check icon */}
          <div className="flex items-start gap-2 mt-auto pt-1">
            <div className="w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={9} strokeWidth={3.5} className="text-sky-500" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-600">Best for: </span>
              {product.idealFor}
            </p>
          </div>

          {/* Footer CTA row */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-[0.65rem] font-semibold text-slate-400 tracking-wide">
              10-yr warranty · VIC eligible
            </span>
            <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 border border-slate-100 group-hover:border-transparent flex-shrink-0 group-hover:shadow-[0_4px_14px_rgba(14,165,233,0.4)]">
              <ArrowRight size={16} strokeWidth={2.5} />
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

function SolarCard({ product, index }) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const glareX = useTransform(springX, [-0.5, 0.5], [20, 80])
  const glareY = useTransform(springY, [-0.5, 0.5], [20, 80])
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 55%)`

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - (rect.left + rect.width / 2)) / rect.width)
    mouseY.set((e.clientY - (rect.top + rect.height / 2)) / rect.height)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: '1200px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex flex-col bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_16px_40px_rgb(0,0,0,0.1)] transition-shadow duration-300 cursor-pointer"
      >
        {/* Specular glare */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] pointer-events-none z-20"
          style={{ background: glareBackground }}
        />

        <div className="bg-slate-50/80 rounded-[1.5rem] aspect-[4/3] p-6 flex flex-col items-center justify-center relative overflow-hidden mb-5 transition-colors duration-300 group-hover:bg-slate-100/80">
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-slate-900 text-xs font-bold shadow-sm border border-slate-100">
              {product.id}
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-48 h-48 bg-sky-200/40 rounded-full blur-[40px]" />
          </div>
          <img
            src={product.image}
            alt={`${product.name} solar panel`}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1509391366360-1e97f52cefd3?q=80&w=1000&auto=format&fit=crop'
            }}
            style={{ transform: 'translateZ(20px)' }}
            className="w-full h-full object-contain mix-blend-multiply opacity-90 scale-100 transition-transform duration-700 ease-out group-hover:scale-110 relative z-10 drop-shadow-xl"
          />
        </div>
        <div className="px-4 pb-4 flex items-end justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
              {product.name}
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              {product.description}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 flex-shrink-0 border border-slate-100 group-hover:border-transparent">
            <ArrowRight size={18} strokeWidth={2.5} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState('batteries')

  const products = activeTab === 'batteries' ? BATTERY_PRODUCTS : SOLAR_PRODUCTS

  return (
    <section id="equipment" className="min-h-screen flex flex-col justify-center py-24 bg-slate-50 relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/4 left-0 w-[40rem] h-[40rem] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] bg-sky-100/40 rounded-full blur-[120px] pointer-events-none translate-x-1/2" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold tracking-[0.2em] text-sky-500 uppercase mb-4">
              Premium Equipment
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight mb-6">
              Industry-leading{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                Solar Panels
              </span>{' '}
              and <br className="hidden md:block" /> Smart{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                Batteries
              </span>
              .
            </h2>
          </motion.div>

          {/* Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="inline-flex bg-white shadow-sm border border-slate-200 p-1.5 rounded-full">
              <button
                onClick={() => setActiveTab('solar')}
                className={`relative px-8 py-3.5 text-sm font-bold rounded-full transition-colors duration-300 ${
                  activeTab === 'solar'
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {activeTab === 'solar' && (
                  <motion.div
                    layoutId="showcaseTab"
                    className="absolute inset-0 bg-slate-900 rounded-full shadow-md"
                  />
                )}
                <span className="relative z-10">Solar Panels</span>
              </button>
              <button
                onClick={() => setActiveTab('batteries')}
                className={`relative px-8 py-3.5 text-sm font-bold rounded-full transition-colors duration-300 ${
                  activeTab === 'batteries'
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {activeTab === 'batteries' && (
                  <motion.div
                    layoutId="showcaseTab"
                    className="absolute inset-0 bg-slate-900 rounded-full shadow-md"
                  />
                )}
                <span className="relative z-10">Smart Batteries</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch"
            >
              {activeTab === 'batteries'
                ? products.map((product, i) => (
                    <BatteryCard key={product.id} product={product} index={i} />
                  ))
                : products.map((product, i) => (
                    <SolarCard key={product.id} product={product} index={i} />
                  ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
