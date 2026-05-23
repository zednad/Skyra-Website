import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, CheckCircle, User, Mail, Phone, MapPin, Zap } from 'lucide-react'

// Form fields configuration — Australian format
const FIELDS = [
  { id: 'name', label: 'Full Name', placeholder: 'Jane Smith', icon: User, type: 'text' },
  { id: 'email', label: 'Email Address', placeholder: 'jane@example.com.au', icon: Mail, type: 'email' },
  { id: 'phone', label: 'Phone Number', placeholder: '(03) 9000 0000', icon: Phone, type: 'tel' },
  { id: 'postcode', label: 'Postcode', placeholder: '3000', icon: MapPin, type: 'text' },
]

const BILL_OPTIONS = ['Under A$100', 'A$100–A$200', 'A$200–A$350', 'A$350–A$500', 'A$500+']

const INITIAL_FORM = { name: '', email: '', phone: '', postcode: '', bill: '' }

// ─── 3D Perspective Grid ────────────────────────────────────────────────────
// Renders an SVG grid with CSS perspective, animating lines moving toward viewer

function PerspectiveGrid() {
  const cols = 12
  const rows = 10
  const width = 1200
  const height = 600
  const vp = { x: width / 2, y: 0 } // vanishing point at top-center

  // Vertical lines spreading from vanishing point
  const verticals = []
  for (let i = 0; i <= cols; i++) {
    const xEnd = (i / cols) * width
    verticals.push(
      <line
        key={`v${i}`}
        x1={vp.x}
        y1={vp.y}
        x2={xEnd}
        y2={height}
        stroke="rgba(56,189,248,0.18)"
        strokeWidth="0.8"
      />
    )
  }

  // Horizontal lines (parallel to horizon, evenly spaced on screen)
  const horizontals = []
  for (let j = 1; j <= rows; j++) {
    const t = j / rows
    // Perspective spacing: closer lines at bottom are more spaced
    const y = height * Math.pow(t, 1.5)
    // x extents taper toward vanishing point
    const xLeft = vp.x + (0 - vp.x) * (1 - t)
    const xRight = vp.x + (width - vp.x) * (1 - t)
    horizontals.push(
      <line
        key={`h${j}`}
        x1={xLeft}
        y1={y}
        x2={xRight}
        y2={y}
        stroke="rgba(56,189,248,0.12)"
        strokeWidth="0.6"
      />
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animate the grid moving "forward" by translating Y upward on repeat */}
      <motion.div
        className="absolute inset-0"
        animate={{ y: ['0%', '10%'] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformOrigin: 'top center' }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {verticals}
          {horizontals}
        </svg>
      </motion.div>

      {/* Fade-out mask at top — horizon fades to nothing */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(12,26,46,1) 0%, rgba(12,26,46,0.3) 30%, transparent 60%)',
        }}
      />
    </div>
  )
}

// ─── CTA Section ────────────────────────────────────────────────────────────

export default function CTASection() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="cta"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(165deg, #0c1a2e 0%, #0f2744 50%, #0c1a2e 100%)' }}
    >
      {/* 3D Perspective energy grid — floats in background */}
      <PerspectiveGrid />

      {/* Premium ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }}
      />

      {/* Floating energy dots — scattered accent particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full z-[1] pointer-events-none"
          style={{
            background: 'rgba(56,189,248,0.7)',
            boxShadow: '0 0 6px 2px rgba(56,189,248,0.5)',
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm text-sky-200 text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-8 border border-white/10">
              Get Started Today
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6 leading-[1.15] tracking-tight">
              Your Free Solar Quote in 24 Hours
            </h2>
            <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg">
              Fill in your details and a SkyRa energy advisor will contact you with a custom system
              design, exact pricing, and your estimated savings — completely free and no obligation.
            </p>

            {/* Value props */}
            <div className="space-y-5">
              {[
                'Personalised system design for your Victorian home',
                'Exact pricing with VIC Solar Homes rebate applied',
                'No pushy sales — just honest advice',
                'Response guaranteed within 24 hours',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                >
                  <div className="w-5 h-5 rounded-full bg-sky-500/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={14} className="text-sky-300" strokeWidth={2.5} />
                  </div>
                  <span className="text-slate-200 text-base font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-white rounded-[1.75rem] shadow-2xl shadow-black/20 border border-slate-100 p-8 lg:p-10">

              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mb-6"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <CheckCircle size={40} className="text-white" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">You're All Set</h3>
                  <p className="text-slate-500 text-base leading-relaxed max-w-sm">
                    A SkyRa energy advisor will contact you within 24 hours with your personalised quote.
                  </p>
                  <div className="mt-6 bg-slate-50 rounded-xl px-5 py-4 text-sm text-slate-600 font-medium border border-slate-100">
                    Check your email for confirmation from <strong className="text-slate-900">hello@skyraenergy.com.au</strong>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap size={18} className="text-slate-900" />
                      <h3 className="text-xl font-semibold text-slate-900 tracking-tight">Free Quote Request</h3>
                    </div>
                    <p className="text-slate-500 text-sm">Takes less than 2 minutes. No spam, ever.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {FIELDS.map(({ id, label, placeholder, icon: Icon, type }) => (
                      <div key={id}>
                        <label htmlFor={id} className="block text-[11px] font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
                          {label}
                        </label>
                        <div className="relative">
                          <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            id={id}
                            name={id}
                            type={type}
                            required
                            placeholder={placeholder}
                            value={form[id]}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-2 uppercase tracking-wider">
                      Monthly Electricity Bill (AUD)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BILL_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, bill: opt }))}
                          className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                            form.bill === opt
                              ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl text-sm tracking-wide shadow-xl shadow-slate-900/25 transition-all mt-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Send size={16} strokeWidth={2} />
                    Get My Free Quote
                  </motion.button>

                  <p className="text-center text-slate-400 text-[11px] leading-relaxed">
                    By submitting, you agree to our{' '}
                    <span className="underline cursor-pointer hover:text-slate-700 transition-colors">Privacy Policy</span>.
                    No spam, unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
