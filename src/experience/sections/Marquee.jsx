// Tier-1 brand marquee. GSAP drives an endless loop whose speed and skew
// react to scroll velocity — scroll fast and the strip rushes and leans.
// Under reduced motion the strip is a static, wrapping row.
import { gsap, ScrollTrigger, prefersReducedMotion, useGsap } from '../gsap'

const BRANDS = ['Jinko', 'Tesla', 'Trina', 'Sungrow', 'Fronius', 'REC', 'LONGi', 'SMA', 'GoodWe', 'Enphase']

export default function Marquee() {
  const scope = useGsap((root) => {
    if (prefersReducedMotion()) return
    const loop = gsap.to('.mq-track', {
      xPercent: -100 / 3,
      duration: 26,
      ease: 'none',
      repeat: -1,
    })
    const speed = { v: 1 }
    ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const vel = self.getVelocity() / 250
        speed.v = gsap.utils.clamp(-4, 6, 1 + vel)
        gsap.to(loop, { timeScale: speed.v, duration: 0.4, overwrite: true })
        gsap.to('.mq-track', {
          skewX: gsap.utils.clamp(-6, 6, -vel * 1.2),
          duration: 0.5,
          overwrite: 'auto',
        })
      },
    })
    // Ease back to cruising speed whenever scrolling settles.
    const onScrollEnd = () => {
      gsap.to(loop, { timeScale: 1, duration: 0.9 })
      gsap.to('.mq-track', { skewX: 0, duration: 0.7 })
    }
    ScrollTrigger.addEventListener('scrollEnd', onScrollEnd)
    return () => ScrollTrigger.removeEventListener('scrollEnd', onScrollEnd)
  })

  const fade = {
    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
  }

  return (
    <section ref={scope} className="mq-root border-y border-white/5 bg-[#04070D] py-8 sm:py-10">
      <p className="text-center text-[12px] font-semibold uppercase tracking-[0.3em] text-white/35">
        Tier-1 brands we install
      </p>
      <div className="mt-5 overflow-hidden motion-reduce:px-5" style={fade}>
        <div className="mq-track flex w-max items-center motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-2">
          {[0, 1, 2].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy > 0}
              className={
                'flex items-center gap-x-10 pr-10 sm:gap-x-14 sm:pr-14' +
                (copy > 0 ? ' motion-reduce:hidden' : '')
              }
            >
              {BRANDS.map((b) => (
                <span
                  key={b}
                  className="font-grotesk text-[22px] font-bold tracking-tight text-white/30 transition-colors hover:text-white/70 sm:text-[26px]"
                >
                  {b}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
