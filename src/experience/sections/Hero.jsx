// Hero: the Three.js dawn scene behind a masked-line SplitText headline.
// Content parallaxes up and fades as you scroll into the page; the scene's
// sun rises in step (driven inside HeroScene from window scroll).
// Falls back to a static dawn gradient when WebGL is unavailable or the
// visitor prefers reduced motion.
import { useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { gsap, SplitText, prefersReducedMotion, useGsap } from '../gsap'
import HeroScene from '../HeroScene'
import { supportsWebGL } from '../webgl'
import Magnetic from '../Magnetic'

export default function Hero({ ready }) {
  const [withScene] = useState(() => supportsWebGL() && !prefersReducedMotion())

  const scope = useGsap((root) => {
    if (prefersReducedMotion()) return

    // Scroll choreography is independent of the entrance: content drifts up
    // and fades while the scene wrapper lags behind for depth.
    gsap.to('.hero-content', {
      yPercent: -16,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: '75% top', scrub: true },
    })
    gsap.to('.hero-scene', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
    })

    if (!ready) {
      // Hide entrance targets while the preloader curtain is still up.
      gsap.set(['.hero-badge', '.hero-sub', '.hero-ctas', '.hero-cue'], { autoAlpha: 0 })
      gsap.set('.hero-h1', { autoAlpha: 0 })
      return
    }

    // Entrance — masked line reveal on the headline, then the rest cascades.
    const splitH1 = new SplitText('.hero-h1', {
      type: 'lines',
      mask: 'lines',
      linesClass: 'hero-line',
    })
    gsap.set('.hero-h1', { autoAlpha: 1 })
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from(splitH1.lines, { yPercent: 115, duration: 1.15, stagger: 0.1 }, 0.05)
      .fromTo('.hero-badge', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.15)
      .fromTo('.hero-sub', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.55)
      .fromTo('.hero-ctas', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.7)
      .fromTo('.hero-cue', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 1.2)

    gsap.to('.hero-cue-icon', {
      y: 7,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // Unsplit on revert so StrictMode remounts never split twice.
    return () => splitH1.revert()
  }, [ready])

  return (
    <section
      ref={scope}
      id="top"
      className="hero-root relative flex min-h-[100svh] flex-col overflow-hidden bg-[#04070D]"
    >
      {/* Scene / fallback */}
      <div className="hero-scene absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_110%,#143a5e_0%,#0a1626_45%,#04070D_100%)]" />
        {!withScene && (
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(60%_55%_at_50%_100%,rgba(251,191,36,0.28)_0%,rgba(251,191,36,0)_70%)]" />
        )}
        {withScene && <HeroScene />}
        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04070D] via-transparent to-[#04070D]/60" />
      </div>

      <div className="hero-content relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="hero-badge mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 sm:text-[12px]">
            Solar · Batteries · Inverters
          </span>
        </div>

        <h1 className="hero-h1 max-w-5xl font-grotesk text-[clamp(46px,9.5vw,124px)] font-bold leading-[0.96] tracking-tight text-white">
          Own your <span className="text-gradient-dawn">sunrise.</span>
          <br />
          Power your home.
        </h1>

        <p className="hero-sub mt-7 max-w-xl text-[16px] leading-relaxed text-white/80 sm:text-[18px]">
          SkyRa supplies and installs solar panels, home batteries and inverters
          for homes and businesses across Australia — designed as one seamless
          system.
        </p>

        <div className="hero-ctas mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Magnetic className="w-full sm:w-auto">
            <a
              href="#quote"
              className="btn-sheen inline-flex w-full items-center justify-center gap-3 rounded-full bg-white py-3 pl-7 pr-2.5 text-[16px] font-bold text-[#0F1A2E] shadow-xl transition-transform hover:scale-[1.03] sm:w-auto sm:py-2.5"
            >
              Get Free Quote
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0F1A2E] text-white sm:h-11 sm:w-11">
                <ArrowRight size={18} />
              </span>
            </a>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto" strength={0.25}>
            <a
              href="#why-solar"
              className="block w-full rounded-full border border-white/30 px-7 py-3.5 text-center text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto"
            >
              Estimate my savings
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="hero-cue absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/50">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
          <span className="hero-cue-icon">
            <ChevronDown size={22} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </section>
  )
}
