// Interactive savings estimator. The slider drives GSAP number tweens (no
// React re-render per frame — figures are written straight to the DOM), and
// the result card tilts subtly toward the pointer on desktop. All compliance
// wording from the previous build is kept verbatim: this is an indicative
// estimate, clearly labelled.
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Gauge, Sun } from 'lucide-react'
import { gsap, isFinePointer, prefersReducedMotion, useGsap } from '../gsap'

function figures(bill) {
  const annual = bill * 4
  const saving = Math.round(annual * 0.7)
  return {
    saving,
    payback: Math.max(2.4, 7700 / saving),
    co2: saving / 1000,
  }
}

export default function Calculator() {
  const [bill, setBill] = useState(650)
  const savingRef = useRef(null)
  const paybackRef = useRef(null)
  const co2Ref = useRef(null)
  const cardRef = useRef(null)
  const shown = useRef(figures(650))

  // Tween the displayed figures toward the new targets on every slider move.
  useEffect(() => {
    const target = figures(bill)
    const render = () => {
      const s = shown.current
      if (savingRef.current) savingRef.current.textContent = Math.round(s.saving).toLocaleString()
      if (paybackRef.current) paybackRef.current.textContent = s.payback.toFixed(1)
      if (co2Ref.current) co2Ref.current.textContent = s.co2.toFixed(1)
    }
    if (prefersReducedMotion()) {
      shown.current = target
      render()
      return
    }
    const tween = gsap.to(shown.current, {
      ...target,
      duration: 0.55,
      ease: 'power3.out',
      onUpdate: render,
    })
    return () => tween.kill()
  }, [bill])

  // Desktop-only pointer tilt on the result card.
  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return
    const card = cardRef.current
    if (!card) return
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' })
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' })
    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      ry(((e.clientX - r.left) / r.width - 0.5) * 7)
      rx(-((e.clientY - r.top) / r.height - 0.5) * 7)
    }
    const onLeave = () => {
      rx(0)
      ry(0)
    }
    gsap.set(card, { transformPerspective: 1100 })
    card.addEventListener('pointermove', onMove, { passive: true })
    card.addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const scope = useGsap((root) => {
    if (prefersReducedMotion()) return
    gsap.utils.toArray('.calc-reveal', root).forEach((el, i) => {
      gsap.from(el, {
        y: 44,
        autoAlpha: 0,
        duration: 0.9,
        delay: i * 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      })
    })
  })

  const pct = ((bill - 200) / (1200 - 200)) * 100

  return (
    <section ref={scope} id="why-solar" className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="calc-reveal">
            <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-sky-600">Try it</span>
            <h2 className="mt-3 font-grotesk text-[clamp(32px,4.4vw,52px)] font-bold leading-[1.05] tracking-tight text-slate-900">
              See your saving in
              <span className="text-sky-600"> seconds.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-slate-500">
              Drag to your average quarterly power bill. We'll estimate what a SkyRa system
              could save you each year — no email required.
            </p>
            <div className="mt-10">
              <div className="flex items-end justify-between">
                <span className="text-[14px] font-semibold text-slate-500">Average quarterly bill</span>
                <span className="font-grotesk text-[24px] font-bold tabular-nums text-slate-900">${bill}</span>
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="10"
                value={bill}
                aria-label="Average quarterly power bill in dollars"
                onChange={(e) => setBill(Number(e.target.value))}
                className="mt-4 w-full"
                style={{ background: `linear-gradient(to right, #0284c7 ${pct}%, #bae6fd ${pct}%)` }}
              />
              <div className="mt-2 flex justify-between text-[12px] text-slate-400">
                <span>$200</span>
                <span>$1,200</span>
              </div>
            </div>
          </div>

          <div className="calc-reveal">
            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[#0D1828] to-[#060B16] p-6 text-white shadow-2xl shadow-slate-900/20 ring-1 ring-white/10 will-change-transform sm:p-9 lg:p-10"
            >
              <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-72 rounded-full bg-[#0EA5E9]/30 blur-[70px]" />
              <div className="relative">
                <div className="text-[12px] font-semibold uppercase tracking-[0.24em] text-sky-300/80">
                  Estimated saving
                </div>
                <div className="mt-2 bg-gradient-to-br from-white via-white to-sky-300 bg-clip-text font-grotesk text-[clamp(48px,8vw,80px)] font-bold leading-none text-transparent">
                  $<span ref={savingRef}>1,820</span>
                  <span className="text-[22px] font-semibold text-slate-400"> /yr</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
                    <Gauge size={20} className="text-sky-400" />
                    <div className="mt-3 whitespace-nowrap font-grotesk text-[22px] font-bold leading-none sm:text-[26px]">
                      <span ref={paybackRef}>4.2</span> yr
                    </div>
                    <div className="mt-1 text-[12px] text-slate-400">Estimated payback</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
                    <Sun size={20} className="text-amber-400" />
                    <div className="mt-3 whitespace-nowrap font-grotesk text-[22px] font-bold leading-none sm:text-[26px]">
                      <span ref={co2Ref}>1.8</span>t
                    </div>
                    <div className="mt-1 text-[12px] text-slate-400">CO₂ avoided / yr</div>
                  </div>
                </div>
                <a
                  href="#quote"
                  className="btn-sheen mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 py-4 text-[16px] font-bold text-white shadow-lg shadow-sky-500/25 transition-transform hover:scale-[1.02]"
                >
                  Get my exact quote <ArrowRight size={18} />
                </a>
                <p className="mt-4 text-[12px] leading-relaxed text-slate-400">
                  Indicative estimate only. Actual savings depend on your energy use,
                  tariff, system size and site, and aren't guaranteed — we'll confirm
                  figures in your written quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
