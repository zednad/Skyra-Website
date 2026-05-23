import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sun } from 'lucide-react'

const BATTERY_PRODUCTS = [
  {
    id: '01',
    name: 'Sigenergy',
    model: 'SigenStor 5-in-1',
    description:
      'Built-in EV charging and AI-driven energy management from a team of ex-Huawei solar engineers.',
    image: '/images/batteries/sigenergy.webp',
    badge: '#1 in Australia',
    specs: [
      { label: 'Capacity', value: '5–48 kWh' },
      { label: 'Chemistry', value: 'LFP' },
      { label: 'Efficiency', value: '97.6%' },
    ],
  },
  {
    id: '02',
    name: 'Fox ESS',
    model: 'EQ4800',
    description:
      'Modular LFP system that stacks from 4.66 kWh up to 42 kWh, with full Victorian rebate eligibility.',
    image: '/images/batteries/foxess_eq4800.jpg',
    badge: 'VIC Rebate',
    specs: [
      { label: 'Capacity', value: '4.66–42 kWh' },
      { label: 'Chemistry', value: 'LFP' },
      { label: 'Efficiency', value: '≥95%' },
    ],
  },
  {
    id: '03',
    name: 'LG Energy Solution',
    model: 'RESU 16H Prime',
    description:
      'Single 16 kWh DC-coupled unit from one of the largest lithium-ion manufacturers in the world.',
    image: '/images/batteries/lg_resu_16h.png',
    badge: 'Tier One',
    specs: [
      { label: 'Capacity', value: '16 kWh' },
      { label: 'Chemistry', value: 'NMC' },
      { label: 'Efficiency', value: '97.5%' },
    ],
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

function BatteryCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-150 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:border-slate-200 hover:shadow-[0_12px_36px_-12px_rgba(15,23,42,0.16)] transition-all duration-300 overflow-hidden"
    >
      {/* Dark image panel */}
      <div className="relative bg-slate-900 aspect-[5/4] flex items-center justify-center overflow-hidden">
        {/* Top-left: id */}
        <span className="absolute top-4 left-4 z-10 text-white/50 text-[11px] font-medium tracking-widest tabular-nums">
          {product.id}
        </span>

        {/* Top-right: minimal badge */}
        <span className="absolute top-4 right-4 z-10 text-[10px] font-medium uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-white/[0.08] text-white/80 border border-white/15 backdrop-blur-sm">
          {product.badge}
        </span>

        <img
          src={product.image}
          alt={`${product.name} ${product.model} home battery`}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.target.src = '/sig-energy.png' }}
          className="w-[68%] h-[68%] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 lg:p-7">
        {/* Title + model caption */}
        <div className="mb-5">
          <h3 className="text-[1.2rem] font-bold text-slate-900 tracking-tight leading-tight">
            {product.name}
          </h3>
          <p className="text-[13px] text-slate-400 mt-0.5">{product.model}</p>
        </div>

        {/* Spec strip — 3 label/value pairs, thin dividers between */}
        <dl className="grid grid-cols-3 gap-px bg-slate-100 rounded-lg overflow-hidden mb-5">
          {product.specs.map((spec) => (
            <div key={spec.label} className="bg-white px-3 py-2.5">
              <dt className="text-[9px] font-semibold tracking-[0.14em] uppercase text-slate-400 mb-0.5">
                {spec.label}
              </dt>
              <dd className="text-[13px] font-semibold text-slate-900 tabular-nums leading-tight">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Short description */}
        <p className="text-[13.5px] text-slate-500 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Footer: warranty note + arrow */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100">
          <span className="text-[11px] font-medium text-slate-400 tracking-wide">
            10-yr warranty
          </span>
          <button
            type="button"
            aria-label={`Learn more about ${product.name}`}
            className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors"
          >
            <ArrowRight size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function SolarCard({ product, index }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-150 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:border-slate-200 hover:shadow-[0_12px_36px_-12px_rgba(15,23,42,0.16)] transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[5/4] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
        <span className="absolute top-4 left-4 z-10 text-slate-400 text-[11px] font-medium tracking-widest tabular-nums">
          {product.id}
        </span>

        {imgFailed ? (
          /* Graceful fallback — soft sun icon over the gradient panel */
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-20 h-20 rounded-full bg-white/60 border border-slate-200 flex items-center justify-center shadow-[0_4px_18px_rgba(15,23,42,0.04)] group-hover:scale-105 transition-transform duration-500">
              <Sun
                size={32}
                strokeWidth={1.5}
                className="text-amber-400"
                aria-hidden="true"
              />
            </div>
          </div>
        ) : (
          <img
            src={product.image}
            alt={`${product.name} solar panel`}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
      </div>

      <div className="flex items-center justify-between p-6 lg:p-7">
        <div>
          <h3 className="text-[1.2rem] font-bold text-slate-900 tracking-tight leading-tight">
            {product.name}
          </h3>
          <p className="text-[13px] text-slate-500 mt-0.5">{product.description}</p>
        </div>
        <button
          type="button"
          aria-label={`Learn more about ${product.name}`}
          className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors flex-shrink-0"
        >
          <ArrowRight size={15} strokeWidth={2} />
        </button>
      </div>
    </motion.div>
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

        {/* Cards Grid — single keyed wrapper so tab swap is clean */}
        <div className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
