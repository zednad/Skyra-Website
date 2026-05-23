import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ClipboardList, Hammer, BarChart3, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Free Home Assessment',
    description:
      'Our energy advisor visits your Victorian home (or reviews your details remotely) to analyse your roof, energy usage, and goals. We recommend the right brands and system size for your property.',
    detail: 'Takes 45–60 minutes',
    iconBg: 'bg-sky-600',
  },
  {
    number: '02',
    icon: Hammer,
    title: 'Expert Installation',
    description:
      'Our CEC-accredited crew handles everything — permits, panel mounting, wiring, and grid connection. VIC Solar Homes rebate paperwork is lodged on your behalf. The product will get installed within 1-2 weeks.',
    detail: 'Within 1-2 weeks',
    iconBg: 'bg-emerald-600',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Start Saving Instantly',
    description:
      'The moment your system goes live, you start generating clean energy and cutting your bill. Monitor everything in real time and watch your savings grow — government rebates automatically applied.',
    detail: 'Live from day one',
    iconBg: 'bg-amber-500',
  },
]

// Animated dots that travel along the connector line
function ConnectorDots({ inView }) {
  const dots = [0, 1, 2, 3]
  return (
    <>
      {dots.map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-400"
          style={{ boxShadow: '0 0 6px 2px rgba(56,189,248,0.7)' }}
          initial={{ left: '0%', opacity: 0 }}
          animate={
            inView
              ? {
                  left: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            duration: 2.4,
            delay: i * 0.55 + 1.2,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const scrollToCTA = () => {
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="how-it-works" ref={ref} className="min-h-screen flex flex-col justify-center py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">

        {/* Section header */}
        <motion.div
          className="text-center mb-6 md:mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-sky-50 text-sky-700 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 md:mb-3">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-gray-900 mb-2 md:mb-3">
            Go Solar in 3 Simple Steps
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            From your first call to your first bill savings — we make switching to solar effortless
            for Victorian homeowners.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop only) with animated dots */}
          <div className="hidden lg:block absolute top-10 left-[calc(16.66%+40px)] right-[calc(16.66%+40px)] h-px z-0 overflow-visible">
            <motion.div
              className="h-full"
              style={{
                background: 'linear-gradient(90deg, #0284c7, #38bdf8, #0284c7)',
                backgroundSize: '200% 100%',
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
            />
            {/* Travelling energy dots */}
            <div className="absolute inset-0 overflow-visible">
              <ConnectorDots inView={inView} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-6">
            {STEPS.map(({ number, icon: Icon, title, description, detail, iconBg }, i) => (
              <motion.div
                key={number}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.18, ease: 'easeOut' }}
              >
                {/* Step icon — flat background, animations preserved */}
                <div className="relative mb-3 md:mb-4 lg:mb-5">
                  <motion.div
                    className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-full flex flex-col items-center justify-center z-10 shadow-md ${iconBg}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1, y: [0, -6, 0] } : {}}
                    transition={
                      inView
                        ? {
                            scale: { duration: 0.5, delay: 0.3 + i * 0.18, type: 'spring', stiffness: 200 },
                            opacity: { duration: 0.5, delay: 0.3 + i * 0.18 },
                            y: {
                              duration: 3.2,
                              delay: i * 0.6,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                          }
                        : {}
                    }
                  >
                    <Icon size={20} className="text-white mb-0.5 shrink-0" />
                    <span className="text-white/80 text-[10px] sm:text-xs font-bold">{number}</span>
                  </motion.div>
                </div>

                {/* Arrow between steps (mobile) */}
                {i < STEPS.length - 1 && (
                  <div className="lg:hidden flex justify-center w-full my-1">
                    <ArrowRight size={16} className="text-sky-300 rotate-90" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs text-sky-600 font-bold uppercase tracking-wider mb-0.5">
                    Step {number}
                  </p>
                  <h3 className="text-base sm:text-lg md:text-xl font-black text-gray-900 mb-1.5 md:mb-2">{title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-snug mb-2 md:mb-3 line-clamp-3 sm:line-clamp-none">{description}</p>

                  {/* Detail badge */}
                  <span className="inline-block bg-sky-50 text-sky-700 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border border-sky-100">
                    ⏱ {detail}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-6 md:mt-8 lg:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <p className="text-gray-500 text-sm sm:text-base mb-3 md:mb-4">
            Ready to get started? It only takes 2 minutes to request your free Victorian home assessment.
          </p>
          <motion.button
            onClick={scrollToCTA}
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm sm:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-xl shadow-sky-600/25 transition-colors"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Book My Free Assessment
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
