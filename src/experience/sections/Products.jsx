// "What we install" — the showpiece. On desktop (fine pointers, motion
// allowed) the section pins and the product slides travel horizontally as
// you scroll, with per-slide image parallax and a live 01–04 counter. On
// mobile or under reduced motion the same slides stack vertically with
// simple reveals, so nothing is lost — only the choreography changes.
// Layout classes mirror the JS conditions via Tailwind's motion-safe:lg:
// variants so CSS and GSAP always agree on which mode is active.
import { ArrowRight, BatteryCharging, Sun, Zap } from 'lucide-react'
import { gsap, prefersReducedMotion, useGsap } from '../gsap'
import Magnetic from '../Magnetic'

const img = (id, w) => `https://images.unsplash.com/photo-${id}?q=80&auto=format&fit=crop&w=${w}`
const ROOF = '1613665813446-82a78c468a1d' // rooftop array at golden hour
const FIELD = '1509391366360-2e959784a276' // panel rows under an open sky

const SLIDE_SHELL =
  'prod-slide relative w-full shrink-0 overflow-hidden rounded-[2rem] ring-1 ring-white/10 sm:rounded-[2.5rem] motion-safe:lg:h-[70vh] motion-safe:lg:w-[56vw]'

function PhotoSlide({ photo, alt, icon, kicker, title, copy, brands }) {
  const Icon = icon
  return (
    <div className={SLIDE_SHELL + ' min-h-[420px] sm:min-h-[500px]'}>
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={img(photo, 1200)}
          srcSet={`${img(photo, 800)} 800w, ${img(photo, 1200)} 1200w, ${img(photo, 1600)} 1600w`}
          sizes="(min-width: 1024px) 56vw, 100vw"
          alt={alt}
          loading="lazy"
          className="prod-img absolute inset-0 h-full w-full scale-[1.15] object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#04070D] via-[#04070D]/25 to-transparent" />
      <div className="relative flex h-full min-h-[420px] flex-col justify-end p-7 sm:min-h-[500px] sm:p-10">
        <span className="mb-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.08] ring-1 ring-white/15 backdrop-blur">
          <Icon size={22} className="text-amber-300" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300">{kicker}</span>
        <h3 className="mt-2 font-grotesk text-[28px] font-bold tracking-tight text-white sm:text-[36px]">{title}</h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate-300 sm:text-[16px]">{copy}</p>
        <p className="mt-5 text-[13px] font-medium leading-relaxed tracking-wide text-white/50">
          {brands.join('  ·  ')}
        </p>
      </div>
    </div>
  )
}

export default function Products() {
  const scope = useGsap((root) => {
    const reduce = prefersReducedMotion()
    const mm = gsap.matchMedia(root)

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const track = root.querySelector('.prod-track')
      const count = root.querySelector('.prod-count')
      const slides = gsap.utils.toArray('.prod-slide', root)
      const dist = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => '+=' + dist(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set('.prod-bar', { scaleX: self.progress })
            if (count) {
              const n = Math.min(slides.length, Math.round(self.progress * (slides.length - 1)) + 1)
              count.textContent = `0${n}`
            }
          },
        },
      })

      // Each photo drifts horizontally inside its frame as it crosses the screen.
      gsap.utils.toArray('.prod-img', root).forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: 'none',
            scrollTrigger: {
              containerAnimation: tween,
              trigger: el.closest('.prod-slide'),
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })
    })

    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      if (reduce) return
      gsap.utils.toArray('.prod-slide, .prod-intro', root).forEach((el) => {
        gsap.from(el, {
          y: 48,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    })

    return () => mm.revert()
  })

  return (
    <section ref={scope} id="products" className="prod-root relative overflow-hidden bg-[#060B16]">
      <div className="prod-track mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-20 sm:px-6 sm:py-24 motion-safe:lg:h-svh motion-safe:lg:w-max motion-safe:lg:max-w-none motion-safe:lg:flex-row motion-safe:lg:items-center motion-safe:lg:gap-10 motion-safe:lg:px-[7vw] motion-safe:lg:py-0">
        {/* Intro panel */}
        <div className="prod-intro max-w-2xl motion-safe:lg:w-[36vw] motion-safe:lg:shrink-0 motion-safe:lg:pr-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-sky-400">What we install</p>
          <h2 className="mt-4 font-grotesk text-[clamp(34px,5vw,60px)] font-bold leading-[1.02] tracking-tight text-white">
            One supplier for the
            <span className="text-gradient-sky block">whole system.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-slate-400 sm:text-[17px]">
            Panels, batteries and inverters from the industry's most trusted
            brands — supplied and installed as one seamless system.
          </p>
          <p className="mt-8 hidden items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/40 motion-safe:lg:flex">
            Keep scrolling <ArrowRight size={15} />
          </p>
        </div>

        <PhotoSlide
          photo={ROOF}
          alt="Rooftop solar array at golden hour"
          icon={Sun}
          kicker="01 — Generate"
          title="Solar Panels"
          copy="Premium Tier-1 mono panels from the brands homeowners trust."
          brands={['Jinko', 'Trina', 'REC', 'LONGi', 'Canadian Solar', 'Q CELLS']}
        />

        {/* Home batteries — product plinth slide */}
        <div className={SLIDE_SHELL + ' min-h-[560px] bg-gradient-to-b from-[#101A2C] to-[#070D19]'}>
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-amber-400/15 blur-[80px]" />
          <div className="relative flex h-full min-h-[560px] flex-col p-7 sm:p-10 motion-safe:lg:flex-row motion-safe:lg:items-center motion-safe:lg:gap-10">
            <div className="motion-safe:lg:w-1/2">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur">
                <BatteryCharging size={22} className="text-amber-400" />
              </span>
              <span className="mt-8 block text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
                02 — Store
              </span>
              <h3 className="mt-2 font-grotesk text-[28px] font-bold tracking-tight text-white sm:text-[36px]">
                Home Batteries
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-slate-400 sm:text-[16px]">
                Store the day, power the night with leading hybrid batteries.
              </p>
              <p className="mt-5 text-[13px] font-medium leading-relaxed tracking-wide text-white/45">
                {['Tesla', 'Sungrow', 'Sigenergy', 'BYD', 'LG', 'Fox ESS'].join('  ·  ')}
              </p>
            </div>
            <div className="mt-8 flex flex-1 items-end justify-center motion-safe:lg:mt-0 motion-safe:lg:items-center">
              <div className="rounded-[1.75rem] bg-gradient-to-b from-white to-slate-200 p-6 shadow-2xl shadow-black/40 ring-1 ring-white/20 sm:p-8">
                <img
                  src="/images/batteries/sigenergy.webp"
                  alt="Sigenergy modular home battery"
                  loading="lazy"
                  className="h-52 w-auto object-contain sm:h-64 motion-safe:lg:h-72"
                />
              </div>
            </div>
          </div>
        </div>

        <PhotoSlide
          photo={FIELD}
          alt="Rows of solar panels under an open sky"
          icon={Zap}
          kicker="03 — Convert"
          title="Smart Inverters"
          copy="Reliable string and hybrid inverters at the heart of your system."
          brands={['Fronius', 'Sungrow', 'SMA', 'GoodWe', 'Enphase', 'SolarEdge']}
        />

        {/* CTA slide */}
        <div className={SLIDE_SHELL + ' min-h-[380px] bg-gradient-to-br from-[#0C1B33] via-[#0A1424] to-[#070D19]'}>
          <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-sky-500/15 blur-[90px]" />
          <div className="relative flex h-full min-h-[380px] flex-col items-start justify-center p-7 sm:p-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300">04 — Together</span>
            <h3 className="mt-3 max-w-lg font-grotesk text-[clamp(28px,3.4vw,44px)] font-bold leading-[1.05] tracking-tight text-white">
              Matched end to end, so your system works as one.
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-400 sm:text-[16px]">
              Every panel, battery and inverter is sized and paired by our team.
            </p>
            <Magnetic className="mt-8">
              <a
                href="#quote"
                className="btn-sheen inline-flex items-center gap-3 rounded-full bg-white py-3 pl-7 pr-2.5 text-[15px] font-bold text-[#0F1A2E] transition-transform hover:scale-[1.03]"
              >
                Get a free quote
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0F1A2E] text-white">
                  <ArrowRight size={16} />
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Desktop progress — counter + hairline bar */}
      <div className="pointer-events-none absolute bottom-8 left-[7vw] right-[7vw] hidden items-center gap-5 motion-safe:lg:flex">
        <span className="prod-count font-grotesk text-[14px] font-bold tabular-nums text-white/80">01</span>
        <div className="h-px flex-1 bg-white/10">
          <div className="prod-bar h-full w-full origin-left scale-x-0 bg-gradient-to-r from-sky-400 to-amber-400" />
        </div>
        <span className="font-grotesk text-[14px] font-bold tabular-nums text-white/30">04</span>
      </div>
    </section>
  )
}
