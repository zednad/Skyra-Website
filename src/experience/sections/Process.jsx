// How it works — a four-step journey along a scroll-drawn timeline. The
// spine fills as you scroll (scrubbed), each step lights up as the line
// reaches it. Single column on mobile, alternating sides on desktop.
import { ClipboardCheck, PencilRuler, Power, Wrench } from 'lucide-react'
import { gsap, prefersReducedMotion, useGsap } from '../gsap'

const STEPS = [
  { n: '01', t: 'Free survey', s: 'We assess your roof and energy usage.', Icon: ClipboardCheck },
  { n: '02', t: 'System design', s: 'A tailored panel and battery layout for your home.', Icon: PencilRuler },
  { n: '03', t: 'Pro install', s: 'Professional installation by our team.', Icon: Wrench },
  { n: '04', t: 'Switch on', s: 'Start generating clean power from day one.', Icon: Power },
]

export default function Process() {
  const scope = useGsap((root) => {
    if (prefersReducedMotion()) return
    gsap.from('.proc-head', {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.proc-head', start: 'top 86%', once: true },
    })
    gsap.fromTo(
      '.proc-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.proc-steps',
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      },
    )
    gsap.utils.toArray('.proc-step', root).forEach((el, i) => {
      gsap.from(el, {
        y: 44,
        autoAlpha: 0,
        x: i % 2 === 0 ? -24 : 24,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      })
    })
  })

  return (
    <section ref={scope} id="how-it-works" className="bg-[#060B16] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="proc-head">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-sky-400">How it works</p>
          <h2 className="mt-4 max-w-2xl font-grotesk text-[clamp(30px,4vw,48px)] font-bold leading-[1.05] tracking-tight text-white">
            From first call to switch-on in four steps.
          </h2>
        </div>

        <div className="proc-steps relative mt-12 sm:mt-16">
          {/* Scroll-drawn spine */}
          <div className="absolute bottom-4 left-[27px] top-4 w-px bg-white/10 lg:left-1/2" aria-hidden="true">
            <div className="proc-line h-full w-full origin-top bg-gradient-to-b from-sky-400 via-sky-500 to-amber-400" />
          </div>

          <div className="space-y-10 lg:space-y-16">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={
                  'proc-step relative flex items-start gap-6 pl-0 lg:w-1/2 lg:gap-8 ' +
                  (i % 2 === 0
                    ? 'lg:mr-auto lg:flex-row-reverse lg:pr-14 lg:text-right'
                    : 'lg:ml-auto lg:pl-14')
                }
              >
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#0B1424] text-sky-400 ring-1 ring-sky-400/30">
                  <s.Icon size={24} />
                </span>
                <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.07] sm:p-8">
                  <div className={'flex items-baseline gap-4 ' + (i % 2 === 0 ? 'lg:flex-row-reverse' : '')}>
                    <span className="font-grotesk text-[15px] font-bold text-sky-400/70">{s.n}</span>
                    <h3 className="font-grotesk text-[20px] font-bold text-white">{s.t}</h3>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{s.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
