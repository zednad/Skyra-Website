import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, LayoutGrid, Zap } from 'lucide-react'

const RESIDENTIAL_PACKAGES = [
  {
    size: '6.6kW',
    panels: '15 x 440W',
    inverter: '1 x 5kW',
    features: [
      'Ideal for small to medium homes',
      'Save up to 70% on your electricity bills',
      'Government rebates & incentives available',
    ],
    popular: false,
  },
  {
    size: '10.12kW',
    panels: '23 x 440W',
    inverter: '1 x 8kW',
    features: [
      'Perfect for medium to large homes',
      'Save up to 70% on your electricity bills',
      'Future-ready system for battery upgrades',
    ],
    popular: true,
  },
  {
    size: '13.2kW',
    panels: '30 x 440W',
    inverter: '1 x 10kW',
    features: [
      'Best suited for large homes or high-energy users',
      'Save up to 70% on your electricity bills',
      'Future-ready system for battery upgrades',
    ],
    popular: false,
  },
]

const COMMERCIAL_PACKAGES = [
  {
    size: '20kW',
    panels: '46 x 440W',
    inverter: '1 x 15kW',
    features: [
      'Ideal for small businesses',
      'Significant reduction in overhead costs',
      'Fast ROI and tax benefits',
    ],
    popular: false,
  },
  {
    size: '30kW',
    panels: '69 x 440W',
    inverter: '1 x 25kW',
    features: [
      'Perfect for medium-sized operations',
      'Maximum energy offset during business hours',
      'Future-ready for commercial batteries',
    ],
    popular: true,
  },
  {
    size: '50kW',
    panels: '114 x 440W',
    inverter: '1 x 40kW',
    features: [
      'Best for factories or large retail',
      'Huge savings on commercial tariffs',
      'Comprehensive energy monitoring',
    ],
    popular: false,
  },
]

export default function Products() {
  const [activeTab, setActiveTab] = useState('residential')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const packages = activeTab === 'residential' ? RESIDENTIAL_PACKAGES : COMMERCIAL_PACKAGES

  const scrollToCTA = () => {
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="products" ref={ref} className="min-h-screen py-20 bg-gradient-to-b from-slate-50 to-white flex flex-col justify-center relative overflow-hidden">
      {/* Decorative background blur objects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center relative z-10 w-full">

        {/* Section header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sky-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">
            Our Solutions
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tight">
            Premium Solar <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Packages</span>
          </h2>

          {/* Glowing Glass Tab Switcher */}
          <div className="inline-flex bg-white/60 backdrop-blur-xl p-1.5 rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white/80">
            <button
              onClick={() => setActiveTab('residential')}
              className={`relative px-8 py-3 text-sm font-bold rounded-full transition-all duration-300 ${activeTab === 'residential' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              {activeTab === 'residential' && (
                <motion.div layoutId="productTab" className="absolute inset-0 bg-white rounded-full shadow-md border border-slate-100/50" />
              )}
              <span className="relative z-10">Residential Solar</span>
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`relative px-8 py-3 text-sm font-bold rounded-full transition-all duration-300 ${activeTab === 'commercial' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              {activeTab === 'commercial' && (
                <motion.div layoutId="productTab" className="absolute inset-0 bg-white rounded-full shadow-md border border-slate-100/50" />
              )}
              <span className="relative z-10">Commercial Solar</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8 max-w-[1200px] mx-auto w-full">
          <AnimatePresence mode="wait">
            {packages.map((pkg, i) => (
              <motion.div
                key={`${activeTab}-${pkg.size}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
                className={`flex-1 relative rounded-[2rem] p-8 lg:p-10 transition-all duration-500 flex flex-col group ${pkg.popular
                    ? 'bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl shadow-blue-900/20 md:-translate-y-4 z-10 border border-slate-700/50'
                    : 'bg-white/80 backdrop-blur-md text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2'
                  }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center z-20">
                    <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white text-[11px] font-black tracking-[0.2em] uppercase px-5 py-2.5 rounded-full shadow-lg shadow-sky-500/30 ring-4 ring-white/10 dark:ring-slate-900">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-8 mt-2">
                  <p className={`text-xs font-bold tracking-widest uppercase mb-2 ${pkg.popular ? 'text-sky-400' : 'text-sky-500'}`}>
                    System Size
                  </p>
                  <h3 className="text-5xl lg:text-6xl font-black tracking-tighter flex items-baseline gap-1">
                    {pkg.size.replace('kW', '')}
                    <span className={`text-2xl font-bold ${pkg.popular ? 'text-slate-400' : 'text-slate-500'}`}>kW</span>
                  </h3>
                </div>

                {/* Equipment Specs */}
                <div className="space-y-3 mb-8">
                  <div className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${pkg.popular ? 'bg-slate-800/80 border border-slate-700/50 group-hover:bg-slate-800' : 'bg-slate-50/50 border border-slate-100 group-hover:bg-slate-50'}`}>
                    <div className={`p-2.5 rounded-xl flex-shrink-0 ${pkg.popular ? 'bg-blue-500/20 text-sky-400' : 'bg-white shadow-sm text-sky-500'}`}>
                      <LayoutGrid size={20} className="stroke-[2.5px]" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight">{pkg.panels}</p>
                      <p className={`text-xs mt-0.5 font-medium ${pkg.popular ? 'text-slate-400' : 'text-slate-500'}`}>Tier 1 Solar Panels</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${pkg.popular ? 'bg-slate-800/80 border border-slate-700/50 group-hover:bg-slate-800' : 'bg-slate-50/50 border border-slate-100 group-hover:bg-slate-50'}`}>
                    <div className={`p-2.5 rounded-xl flex-shrink-0 ${pkg.popular ? 'bg-blue-500/20 text-sky-400' : 'bg-white shadow-sm text-sky-500'}`}>
                      <Zap size={20} className="stroke-[2.5px]" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight">{pkg.inverter}</p>
                      <p className={`text-xs mt-0.5 font-medium ${pkg.popular ? 'text-slate-400' : 'text-slate-500'}`}>Power Inverter</p>
                    </div>
                  </div>
                </div>

                {/* Separator */}
                <div className={`w-full h-px mb-8 ${pkg.popular ? 'bg-gradient-to-r from-transparent via-slate-700 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'}`} />

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map(f => (
                    <li key={f} className="flex items-start gap-4">
                      <div className={`rounded-full p-1 mt-0.5 flex-shrink-0 ${pkg.popular ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-500'}`}>
                        <Check size={14} className="stroke-[3px]" />
                      </div>
                      <span className={`leading-snug text-sm font-semibold ${pkg.popular ? 'text-slate-300' : 'text-slate-600'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  onClick={scrollToCTA}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 mt-auto rounded-2xl font-black text-base transition-all group/btn flex items-center justify-center gap-2 ${pkg.popular
                      ? 'bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:via-sky-400 hover:to-blue-500 text-white shadow-xl shadow-sky-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10'
                    }`}
                >
                  Get a FREE quote
                  <svg className={`w-4 h-4 transition-transform ${pkg.popular ? 'group-hover/btn:translate-x-1' : 'group-hover/btn:translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
