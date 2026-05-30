// ─────────────────────────────────────────────────────────────────────────────
//  SkyRa Energy — Design Exploration surface
//  Three deliverables in one place: Mood Board · Ten UI Directions · Recommended.
//  Mounted at /?view=design (see main.jsx) so the live site at / is untouched.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { SunOrb } from './ui'
import MoodBoard from './MoodBoard'
import TenDirections from './TenDirections'
import RecommendedHome from './RecommendedHome'

const TABS = [
  { id: 'mood', label: 'Mood Board', n: '01' },
  { id: 'directions', label: 'Ten Directions', n: '02' },
  { id: 'recommended', label: 'Recommended', n: '03' },
]

export default function DesignExploration() {
  const [tab, setTab] = useState(() => window.location.hash.replace('#', '') || 'mood')

  useEffect(() => {
    window.location.hash = tab
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [tab])

  return (
    <div className="relative min-h-screen bg-[#0B1220] text-[#F8FAFC] antialiased">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-[#0EA5E9]/10 blur-[140px]" />
        <div className="absolute right-[-12%] top-[28%] h-[420px] w-[420px] rounded-full bg-[#6366F1]/10 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 75%)',
          }}
        />
      </div>

      {/* Sticky top bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0B1220]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-2.5">
            <SunOrb size={22} />
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-wide">
                SkyRa<span className="font-light text-[#38BDF8]"> Energy</span>
              </span>
              <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5E708C] sm:block">
                Design Exploration
              </span>
            </div>
          </div>

          {/* Segmented tabs */}
          <nav className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors sm:px-4"
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#2563EB] shadow-[0_4px_14px_-2px_rgba(14,165,233,0.6)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={'relative z-10 ' + (tab === t.id ? 'text-white' : 'text-[#8595AE] hover:text-white')}>
                  <span className="hidden font-fraunces italic sm:inline">{t.n} </span>
                  {t.label}
                </span>
              </button>
            ))}
          </nav>

          <a
            href="/"
            className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-[12.5px] font-semibold text-[#9FB0C9] transition-colors hover:border-white/25 hover:text-white md:inline-flex"
          >
            <ArrowLeft size={14} /> Live site
          </a>
        </div>
      </header>

      {/* Active view */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === 'mood' && <MoodBoard />}
            {tab === 'directions' && <TenDirections />}
            {tab === 'recommended' && <RecommendedHome />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] px-5 py-8 text-center sm:px-8">
        <p className="text-[12.5px] text-[#5E708C]">
          SkyRa Energy · Design exploration synthesised from Mobbin research ·{' '}
          <a href="/" className="font-semibold text-[#7DD3FC] hover:underline">
            return to live site
          </a>
        </p>
      </footer>
    </div>
  )
}
