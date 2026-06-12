// Floating pill navigation. Slides in after the preloader, gains an opaque
// backdrop once the page is scrolled, and opens a stagger-animated sheet on
// mobile.
import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { gsap, prefersReducedMotion, useGsap } from './gsap'
import SunMark from './SunMark'

const NAV_LINKS = [
  ['Products', '#products'],
  ['Packages', '#packages'],
  ['Why Solar', '#why-solar'],
  ['Process', '#how-it-works'],
]

export default function Nav({ ready }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scope = useGsap(() => {
    if (!ready || prefersReducedMotion()) return
    gsap.from('.nav-pill', { y: -28, autoAlpha: 0, duration: 0.9, ease: 'power4.out', delay: 0.15 })
  }, [ready])

  useGsap(() => {
    if (!open || prefersReducedMotion()) return
    gsap.from('.nav-sheet a', { y: 18, autoAlpha: 0, stagger: 0.05, duration: 0.4, ease: 'power3.out' })
  }, [open])

  return (
    <div ref={scope} className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5 lg:px-10">
      <div
        className={
          'nav-pill mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-2.5 backdrop-blur-md transition-all duration-300 sm:px-5 sm:py-3 ' +
          (ready ? '' : 'invisible ') +
          (scrolled
            ? 'border-white/10 bg-[#060B16]/90 shadow-lg shadow-black/30'
            : 'border-white/10 bg-white/[0.06]')
        }
      >
        <a href="#top" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <SunMark size={28} />
          <span className="whitespace-nowrap text-[18px] font-bold text-white sm:text-[19px]">
            SkyRa<span className="hidden font-light text-[#7DD3FC] min-[380px]:inline"> Energy</span>
          </span>
        </a>
        <div className="hidden items-center gap-8 text-[14px] font-medium text-white/85 md:flex">
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} className="nav-link relative cursor-pointer transition-colors hover:text-white">
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#quote"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white py-1.5 pl-4 pr-1.5 text-[13px] font-bold text-[#0F1A2E] transition-transform hover:scale-[1.03] sm:gap-2.5 sm:py-2 sm:pl-5 sm:pr-2 sm:text-[14px]"
          >
            Get Quote
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0F1A2E] text-white sm:h-8 sm:w-8">
              <Phone size={13} />
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="nav-sheet mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#060B16]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col p-2">
            {NAV_LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-[15px] font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {label}
              </a>
            ))}
            <a
              href="#quote"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-[15px] font-semibold text-sky-300 transition-colors hover:bg-white/10"
            >
              Get a free quote
            </a>
          </div>
        </nav>
      )}
    </div>
  )
}
