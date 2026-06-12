// Short cinematic preloader: counts to 100 while a hairline of dawn light
// fills, then the whole curtain wipes upward to reveal the hero. Kept under
// ~1.6s so it feels like a beat, not a wait. Never mounted under
// prefers-reduced-motion (ExperienceHome skips straight to loaded).
import { useEffect, useRef } from 'react'
import { gsap, useGsap } from './gsap'
import SunMark from './SunMark'

export default function Preloader({ onDone }) {
  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  const scope = useGsap(() => {
    const counter = { v: 0 }
    const num = document.querySelector('.pre-num')
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => onDoneRef.current?.(),
    })
    tl.to(counter, {
      v: 100,
      duration: 1.05,
      onUpdate: () => {
        if (num) num.textContent = String(Math.round(counter.v)).padStart(3, '0')
      },
    })
      .to('.pre-bar', { scaleX: 1, duration: 1.05 }, 0)
      .to('.pre-inner', { yPercent: -40, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 1.1)
      .to('.pre-curtain', { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 1.3)
  })

  return (
    <div ref={scope} className="fixed inset-0 z-[90]" aria-hidden="true">
      <div className="pre-curtain absolute inset-0 flex flex-col items-center justify-center bg-[#04070D]">
        <div className="pre-inner flex flex-col items-center">
          <SunMark size={44} />
          <div className="mt-5 text-[15px] font-bold tracking-[0.3em] text-white/90">
            SKYRA <span className="font-light text-[#7DD3FC]">ENERGY</span>
          </div>
          <div className="pre-num mt-8 font-grotesk text-[13px] font-medium tabular-nums tracking-[0.4em] text-white/40">
            000
          </div>
          <div className="mt-3 h-px w-40 overflow-hidden bg-white/10">
            <div className="pre-bar h-full w-full origin-left scale-x-0 bg-gradient-to-r from-sky-400 to-amber-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
