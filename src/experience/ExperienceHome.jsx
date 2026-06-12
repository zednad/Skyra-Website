// ─────────────────────────────────────────────────────────────────────────────
//  SkyRa Energy — interactive experience homepage.
//  Flow: preloader → Three.js dawn hero → brand marquee → pinned horizontal
//  product showcase → savings calculator → packages → process timeline →
//  quote CTA → footer. Lenis smooth-scroll drives GSAP ScrollTrigger; under
//  prefers-reduced-motion everything renders static with native scrolling.
//  All copy is the compliance-reviewed wording from the previous build — no
//  new claims were introduced.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { ArrowUp } from 'lucide-react'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'
import Preloader from './Preloader'
import Cursor from './Cursor'
import Nav from './Nav'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Products from './sections/Products'
import Calculator from './sections/Calculator'
import Packages from './sections/Packages'
import Process from './sections/Process'
import Cta from './sections/Cta'
import Footer from './sections/Footer'

/* Thin dawn-gradient reading-progress bar along the top edge. */
function ScrollProgressBar() {
  const ref = useRef(null)
  useEffect(() => {
    const tween = gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-sky-400 via-sky-500 to-amber-400"
    />
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={
        'fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-[#0C1A2E]/90 text-white shadow-lg shadow-black/25 ring-1 ring-white/15 backdrop-blur transition-all duration-300 hover:bg-[#13294a] ' +
        (show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0')
      }
    >
      <ArrowUp size={18} />
    </a>
  )
}

export default function ExperienceHome() {
  // Reduced-motion visitors skip the preloader entirely.
  const [loaded, setLoaded] = useState(() => prefersReducedMotion())
  const lenisRef = useRef(null)

  // Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in
  // perfect sync. Skipped under reduced motion (native scrolling instead).
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ autoRaf: false, lerp: 0.1 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Hold the page still while the preloader curtain is up.
  useEffect(() => {
    if (loaded) {
      lenisRef.current?.start()
      return
    }
    lenisRef.current?.stop()
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [loaded])

  // Smooth in-page anchors through Lenis (offset clears the floating nav).
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || !lenisRef.current) return
      const id = a.getAttribute('href')
      if (id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenisRef.current.scrollTo(el, { offset: id === '#top' ? 0 : -84, duration: 1.2 })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Re-measure ScrollTriggers once fonts arrive and the curtain lifts —
  // SplitText line breaks and pin distances depend on final metrics.
  useEffect(() => {
    if (!loaded) return
    document.fonts?.ready?.then(() => ScrollTrigger.refresh())
  }, [loaded])

  return (
    <div className="min-h-screen bg-[#060B16]">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Cursor />
      <ScrollProgressBar />
      <BackToTop />
      <Nav ready={loaded} />
      <main>
        <Hero ready={loaded} />
        <Marquee />
        <Products />
        <Calculator />
        <Packages />
        <Process />
        <Cta />
      </main>
      <Footer />
      {/* Film grain over everything for texture */}
      <div className="grain pointer-events-none fixed inset-0 z-[70]" aria-hidden="true" />
    </div>
  )
}
