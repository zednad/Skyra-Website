// Closing call-to-action with the quote panel. The headline reveals line by
// line; two dawn orbs drift behind. The form fields remain visual
// placeholders (as on the previous build) — no backend is wired up, so we
// don't pretend to submit anything.
import { ArrowRight, Check } from 'lucide-react'
import { gsap, SplitText, prefersReducedMotion, useGsap } from '../gsap'
import Magnetic from '../Magnetic'

export default function Cta() {
  const scope = useGsap(() => {
    if (prefersReducedMotion()) return

    const split = new SplitText('.cta-h2', { type: 'lines', mask: 'lines' })
    gsap.from(split.lines, {
      yPercent: 115,
      duration: 1.0,
      stagger: 0.09,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.cta-h2', start: 'top 82%', once: true },
    })
    gsap.from(['.cta-copy', '.cta-points'], {
      y: 30,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.cta-copy', start: 'top 88%', once: true },
    })
    gsap.from('.cta-card', {
      y: 56,
      autoAlpha: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.cta-card', start: 'top 88%', once: true },
    })
    gsap.to('.cta-orb-a', { x: 26, y: -22, duration: 15, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.cta-orb-b', { x: -20, y: 18, duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    return () => split.revert()
  })

  return (
    <section ref={scope} id="quote" className="relative overflow-hidden bg-[#060B16] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="cta-orb-a pointer-events-none absolute -left-20 bottom-0 h-96 w-[32rem] rounded-full bg-[#0EA5E9]/20 blur-[110px]" />
      <div className="cta-orb-b pointer-events-none absolute -right-12 -top-12 h-80 w-96 rounded-full bg-[#F59E0B]/15 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <h2 className="cta-h2 font-grotesk text-[clamp(34px,5vw,60px)] font-bold leading-[1.02] tracking-tight text-white">
            Ready to cut your
            <br />
            power bill? <span className="text-[#7DD3FC]">Let's go.</span>
          </h2>
          <p className="cta-copy mt-6 max-w-lg text-[17px] leading-relaxed text-white/80">
            Get a free, no-obligation quote tailored to your roof and energy usage.
            A SkyRa specialist will be in touch to talk it through.
          </p>
          <div className="cta-points mt-8 flex flex-wrap gap-6">
            {['No-obligation', 'Free assessment', 'Tailored quote'].map((l) => (
              <span key={l} className="inline-flex items-center gap-2 text-[14px] font-semibold text-white/85">
                <Check size={16} className="text-sky-400" /> {l}
              </span>
            ))}
          </div>
        </div>

        <div className="cta-card rounded-[32px] bg-white/[0.05] p-6 ring-1 ring-white/10 backdrop-blur-xl sm:p-8">
          <div className="font-grotesk text-[18px] font-bold text-white">Get your free quote</div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {[['Full name', 'col-span-2'], ['Email', 'col-span-2'], ['Postcode', ''], ['Quarterly bill', '']].map(
              ([ph, cls]) => (
                <div key={ph} className={cls}>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[14px] text-white/40 transition-colors hover:border-white/20">
                    {ph}
                  </div>
                </div>
              ),
            )}
          </div>
          <Magnetic className="mt-5 block" strength={0.15}>
            <button className="btn-sheen flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-[16px] font-bold text-[#0F1A2E] transition-transform hover:scale-[1.02]">
              Get my free quote <ArrowRight size={18} />
            </button>
          </Magnetic>
          <p className="mt-4 text-center text-[12px] text-white/45">No spam. We never share your details.</p>
        </div>
      </div>
    </section>
  )
}
