import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Gauge, Sun } from 'lucide-react'

// Live, no-email savings estimate. Drives a yearly saving, payback and CO2
// figure from the user's average quarterly electricity bill.
export default function SavingsCalculator() {
  const [bill, setBill] = useState(650)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const annual = bill * 4
  const saving = Math.round(annual * 0.7)
  const payback = Math.max(2.4, 7700 / saving).toFixed(1)
  const co2 = (saving / 1000).toFixed(1)
  const pct = ((bill - 200) / (1200 - 200)) * 100

  const scrollToCTA = () => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="savings"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white to-sky-50/60 py-20 lg:py-28"
    >
      <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-sky-100/50 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — copy + slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">Try it</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight text-slate-900">
              See your saving in <span className="text-sky-600">seconds.</span>
            </h2>
            <p className="mt-4 max-w-md text-base lg:text-lg leading-relaxed text-slate-500">
              Drag to your average quarterly power bill. We'll estimate what a solar system
              could save you each year — no email required.
            </p>

            <div className="mt-9 max-w-md">
              <div className="flex items-end justify-between">
                <span className="text-sm font-semibold text-slate-500">Average quarterly bill</span>
                <span className="text-2xl font-extrabold text-slate-900">${bill}</span>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="10"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                aria-label="Average quarterly electricity bill"
                className="mt-4 w-full"
                style={{ background: `linear-gradient(to right, #0284c7 ${pct}%, #bae6fd ${pct}%)` }}
              />
              <div className="mt-2 flex justify-between text-xs font-medium text-slate-400">
                <span>$200</span>
                <span>$1,200</span>
              </div>
            </div>
          </motion.div>

          {/* Right — result card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-[1.75rem] bg-[#0c1a2e] p-8 lg:p-10 text-white shadow-2xl shadow-sky-900/20"
          >
            <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-64 rounded-full bg-[#0ea5e9]/30 blur-[70px]" />
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
                Estimated saving
              </div>
              <div className="mt-2 text-6xl font-extrabold leading-none tracking-tight">
                ${saving.toLocaleString()}
                <span className="text-2xl font-bold text-slate-400"> /yr</span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <Gauge size={18} className="text-sky-400" />
                  <div className="mt-2.5 text-2xl font-extrabold leading-none">{payback} yr</div>
                  <div className="mt-1 text-xs text-slate-400">Estimated payback</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <Sun size={18} className="text-amber-400" />
                  <div className="mt-2.5 text-2xl font-extrabold leading-none">{co2}t</div>
                  <div className="mt-1 text-xs text-slate-400">CO₂ avoided / yr</div>
                </div>
              </div>

              <motion.button
                onClick={scrollToCTA}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 py-4 text-base font-bold text-white shadow-lg shadow-sky-500/25"
              >
                Get my exact quote <ArrowRight size={18} />
              </motion.button>
              <p className="mt-3 text-center text-[12px] text-slate-400">
                Indicative only · based on a 70% average bill offset
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
