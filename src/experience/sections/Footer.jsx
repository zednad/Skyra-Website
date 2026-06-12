// Footer with a giant outlined wordmark that rises into view — the page's
// final beat — plus the standard link row.
import { gsap, prefersReducedMotion, useGsap } from '../gsap'
import SunMark from '../SunMark'

export default function Footer() {
  const scope = useGsap(() => {
    if (prefersReducedMotion()) return
    gsap.from('.foot-mark', {
      yPercent: 42,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.foot-mark', start: 'top 96%', once: true },
    })
  })

  return (
    <footer ref={scope} className="overflow-hidden bg-[#04070D] px-5 pb-10 pt-16 sm:px-6 sm:pb-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="foot-mark select-none text-center font-grotesk text-[clamp(56px,13vw,200px)] font-bold leading-[0.9] tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(125,211,252,0.18)]" aria-hidden="true">
          SKYRA
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/5 pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <SunMark size={26} />
            <span className="text-[17px] font-bold text-white">
              SkyRa<span className="font-light text-[#7DD3FC]"> Energy</span>
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-slate-400">
            <a href="#products" className="cursor-pointer transition-colors hover:text-white">Products</a>
            <a href="#packages" className="cursor-pointer transition-colors hover:text-white">Packages</a>
            <a href="#how-it-works" className="cursor-pointer transition-colors hover:text-white">About</a>
            <a href="#quote" className="cursor-pointer transition-colors hover:text-white">Contact</a>
          </div>
          <span className="text-[13px] text-slate-500">© 2026 SkyRa Energy</span>
        </div>
      </div>
    </footer>
  )
}
