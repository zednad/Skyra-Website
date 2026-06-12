// Solar packages with a residential/commercial toggle. The toggle pill
// slides via CSS transform; card swaps re-stagger in with GSAP. Copy and
// figures are unchanged from the compliance-reviewed build.
import { useState } from 'react'
import { Check } from 'lucide-react'
import { gsap, prefersReducedMotion, useGsap } from '../gsap'

const DATA = {
  residential: [
    { size: '6.6', panels: '15 × 440W', tag: 'Small homes', popular: false },
    { size: '10.12', panels: '23 × 440W', tag: 'Medium homes', popular: true },
    { size: '13.2', panels: '30 × 440W', tag: 'Large homes', popular: false },
  ],
  commercial: [
    { size: '20', panels: '46 × 440W', tag: 'Small business', popular: false },
    { size: '30', panels: '69 × 440W', tag: 'Mid-size business', popular: true },
    { size: '50', panels: '114 × 440W', tag: 'Warehouse', popular: false },
  ],
}
const TABS = ['residential', 'commercial']

export default function Packages() {
  const [tab, setTab] = useState('residential')

  const scope = useGsap(() => {
    if (prefersReducedMotion()) return
    gsap.from('.pkg-head', {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.pkg-head', start: 'top 86%', once: true },
    })
  })

  // Re-stagger the cards whenever the tab changes (and on first reveal).
  useGsap(() => {
    if (prefersReducedMotion()) return
    gsap.from('.pkg-card', {
      y: 44,
      autoAlpha: 0,
      scale: 0.97,
      duration: 0.7,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.pkg-grid', start: 'top 90%', once: true },
    })
  }, [tab])

  return (
    <section ref={scope} id="packages" className="bg-slate-50 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="pkg-head mx-auto max-w-7xl text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-sky-600">Our solutions</p>
        <h2 className="mt-4 font-grotesk text-[clamp(32px,4.6vw,56px)] font-bold tracking-tight text-slate-900">
          Premium solar{' '}
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">packages</span>
        </h2>
        <div className="relative mt-8 inline-grid grid-cols-2 rounded-full bg-slate-200/70 p-1.5">
          <span
            aria-hidden="true"
            className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-white shadow transition-transform duration-300 ease-out"
            style={{ transform: tab === 'commercial' ? 'translateX(calc(100% + 6px))' : 'translateX(0)' }}
          />
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={
                'relative z-10 rounded-full px-6 py-3 text-[14px] font-bold capitalize transition-colors sm:px-9 ' +
                (tab === t ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800')
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl sm:mt-14">
        <div key={tab} className="pkg-grid grid items-stretch gap-6 md:grid-cols-3 lg:gap-8">
          {DATA[tab].map((p) => (
            <div
              key={p.size}
              className={
                'pkg-card group relative flex flex-col rounded-[32px] p-7 transition-transform duration-300 hover:-translate-y-2 sm:p-9 ' +
                (p.popular
                  ? 'bg-gradient-to-b from-[#0D1828] to-[#060B16] text-white shadow-2xl shadow-slate-900/25 ring-1 ring-white/10 md:-translate-y-4 md:hover:-translate-y-6'
                  : 'bg-white text-slate-900 shadow-[0_4px_30px_rgba(2,8,23,0.05)] ring-1 ring-slate-200/80')
              }
            >
              <span
                className={
                  'text-[12px] font-semibold uppercase tracking-[0.18em] ' +
                  (p.popular ? 'text-sky-400' : 'text-sky-600')
                }
              >
                {p.tag}
              </span>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span
                  className={
                    'font-grotesk text-[clamp(48px,6vw,64px)] font-bold leading-none tracking-tight ' +
                    (p.popular ? 'bg-gradient-to-br from-white via-white to-sky-300 bg-clip-text text-transparent' : '')
                  }
                >
                  {p.size}
                </span>
                <span className="text-[22px] font-bold text-slate-400">kW</span>
              </div>
              <div className={'mt-7 space-y-3.5 text-[15px] ' + (p.popular ? 'text-slate-300' : 'text-slate-600')}>
                {[`${p.panels} Tier-1 panels`, 'Smart hybrid inverter', 'Fully supplied & installed'].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <span
                      className={
                        'grid h-6 w-6 shrink-0 place-items-center rounded-full ' +
                        (p.popular ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-600')
                      }
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {f}
                  </div>
                ))}
              </div>
              <a
                href="#quote"
                className={
                  'btn-sheen mt-9 block w-full rounded-2xl py-4 text-center text-[15px] font-bold transition-transform hover:scale-[1.02] ' +
                  (p.popular
                    ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                    : 'bg-slate-900 text-white')
                }
              >
                Get a free quote
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
