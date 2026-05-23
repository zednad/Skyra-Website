import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Products', href: '#equipment' },
  { label: 'Packages', href: '#products' },
  { label: 'Why Solar', href: '#why-solar' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Reviews', href: '#testimonials' },
]

const SECTION_TO_LABEL = {
  'hero': null,
  'equipment': 'Products',
  'products': 'Packages',
  'why-solar': 'Why Solar',
  'how-it-works': 'How It Works',
  'testimonials': 'Reviews',
  'cta': null,
}

const SECTION_IDS = Object.keys(SECTION_TO_LABEL)

// ─── 3D Glowing Sun Orb ──────────────────────────────────────────────────────
function SunOrb({ scrolled }) {
  const ringColor = scrolled ? 'rgba(14,165,233,0.35)' : 'rgba(255,255,255,0.2)'

  return (
    <div className="relative w-7 h-7 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: `0 0 0 3px ${ringColor}` }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: `0 0 0 6px ${ringColor}` }}
        animate={{ scale: [1, 1.7, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      <motion.div
        className="w-7 h-7 rounded-full relative overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 35% 32%, #bae6fd, #0ea5e9 50%, #0369a1)',
          boxShadow: '0 0 14px 3px rgba(14,165,233,0.55), 0 3px 8px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.4)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.55) 0%, transparent 52%)' }}
        />
        <div className="absolute inset-x-0" style={{ top: '42%', height: '2px', background: 'rgba(255,255,255,0.15)' }} />
        <div className="absolute inset-x-0" style={{ top: '58%', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
      </motion.div>
    </div>
  )
}

// ─── Liquid Aurora — drifting glow blobs inside the scrolled island ──────────
// Two blobs animate across different paths and at different speeds,
// creating an organic "liquid" shimmer effect behind the nav content.
function LiquidAurora() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" aria-hidden="true">
      {/* Primary sky-blue orb — drifts left → right → centre */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '38%',
          height: '280%',
          top: '-90%',
          filter: 'blur(42px)',
          background: 'radial-gradient(circle, rgba(14,165,233,0.28) 0%, rgba(56,189,248,0.08) 55%, transparent 100%)',
        }}
        animate={{ left: ['6%', '58%', '22%', '6%'] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Secondary indigo orb — drifts opposite direction, slower */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '22%',
          height: '240%',
          top: '-70%',
          filter: 'blur(32px)',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        }}
        animate={{ left: ['72%', '12%', '62%', '72%'] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [active, setActive] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const updateActiveSection = () => {
      setScrolled(window.scrollY > 40)

      // Walk sections top→bottom; keep updating so the last section whose
      // top edge has crossed 40% of the viewport height wins.
      const threshold = window.innerHeight * 0.4
      let activeSection = null
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i])
        if (el && el.getBoundingClientRect().top <= threshold) {
          activeSection = SECTION_IDS[i]
        }
      }
      setActive(activeSection ? SECTION_TO_LABEL[activeSection] : null)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  const scrollTo = (href, label) => {
    if (label !== undefined) setActive(label)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Scroll progress bar — fixed at the very top of the viewport ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #38bdf8 0%, #0284c7 50%, #0ea5e9 100%)',
          boxShadow: '0 0 8px 1px rgba(56,189,248,0.5)',
        }}
      />

      {/* ── Header shell ─────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-3 lg:py-4'
        }`}
      >
        {/* Outer width constraint — narrows slightly when scrolled to give the
            island some breathing room on both sides */}
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'max-w-[1400px] mx-auto px-4 lg:px-6'
              : 'max-w-[1600px] mx-auto px-6 lg:px-12'
          }`}
        >
          {/* ── Island container ─────────────────────────────────────────── */}
          {/* When scrolled this becomes the floating dark-glass pill.
              All children need relative z-10 so they sit above the aurora. */}
          <div
            className={`relative flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? [
                    'rounded-2xl',
                    'bg-slate-900/80 backdrop-blur-2xl',
                    'border border-white/[0.07]',
                    'shadow-[0_16px_56px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.07)]',
                    'px-5 lg:px-6 py-2.5',
                    'overflow-hidden',
                  ].join(' ')
                : ''
            }`}
          >
            {/* Liquid aurora blobs — only rendered inside the island */}
            {scrolled && <LiquidAurora />}

            {/* Hairline sky-tinted gloss at the very top of the island */}
            {scrolled && (
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent pointer-events-none" />
            )}

            {/* ── Logo ───────────────────────────────────────────────────── */}
            <button
              onClick={() => scrollTo('#hero', null)}
              className="relative z-10 flex items-center gap-2 group transition-colors duration-300 text-white"
            >
              <SunOrb scrolled={scrolled} />
              <span className="text-xl font-semibold tracking-wide">
                SkyRa
                <span
                  className={`font-light transition-colors duration-300 ${
                    scrolled ? 'text-sky-400' : 'opacity-90'
                  }`}
                >
                  Energy
                </span>
              </span>
            </button>

            {/* ── Centre nav ─────────────────────────────────────────────── */}
            {/* Hero state: wrapped in a glass pill.
                Island state: flat links, active item gets a sky-tinted chip
                              with a sliding underline dot via framer layoutId. */}
            <nav
              className={`hidden lg:flex items-center transition-all duration-300 ${
                scrolled
                  ? 'gap-0.5'
                  : 'gap-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-1.5'
              }`}
            >
              {NAV_LINKS.map(link => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href, link.label)}
                  className={`relative z-10 px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    scrolled ? 'rounded-xl' : 'rounded-full'
                  } ${
                    active === link.label
                      ? scrolled
                        ? 'text-sky-300 bg-sky-500/10 border border-sky-400/20'
                        : 'bg-white text-slate-900 shadow-sm'
                      : scrolled
                        ? 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                        : 'text-white hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  {link.label}

                  {/* Sliding underline dot — framer layout animation moves it
                      smoothly between active items in the island state */}
                  {active === link.label && scrolled && (
                    <motion.span
                      layoutId="nav-active-line"
                      className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-4 h-[2.5px] rounded-full bg-sky-400/80"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* ── CTA button ─────────────────────────────────────────────── */}
            {/* Island state: sky-blue gradient with glowing shadow.
                Hero state: white pill as before. */}
            <div className="hidden lg:flex relative z-10">
              <button
                onClick={() => scrollTo('#cta')}
                className={`flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 transition-all duration-300 group shadow-lg ${
                  scrolled
                    ? 'bg-gradient-to-br from-sky-500 to-sky-400 text-white hover:from-sky-400 hover:to-sky-300 shadow-sky-500/30'
                    : 'bg-white text-slate-900 hover:bg-gray-100 shadow-black/10'
                }`}
              >
                <span className="text-sm font-bold">Get Free Quote</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform ${
                    scrolled ? 'bg-white/20' : 'bg-slate-900'
                  }`}
                >
                  <Phone size={14} className="text-white" />
                </div>
              </button>
            </div>

            {/* ── Mobile hamburger ───────────────────────────────────────── */}
            <button
              className={`relative z-10 lg:hidden p-2 rounded-xl transition-all duration-300 ${
                scrolled
                  ? 'text-white bg-white/10 border border-white/10'
                  : 'text-white bg-white/10 backdrop-blur-md border border-white/10'
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Ambient aurora glow in the mobile overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl" />
            </div>

            <nav className="relative flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href, link.label)}
                  className={`text-2xl font-semibold transition-colors ${
                    active === link.label ? 'text-sky-400' : 'text-white hover:text-sky-400'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                onClick={() => scrollTo('#cta')}
                className="mt-4 flex items-center gap-3 bg-gradient-to-br from-sky-500 to-sky-400 text-white rounded-full pl-8 pr-2 py-2 shadow-lg shadow-sky-500/25"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.1 }}
              >
                <span className="text-lg font-bold">Get Free Quote</span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone size={18} className="text-white" />
                </div>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
