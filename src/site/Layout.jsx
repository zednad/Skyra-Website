// ─────────────────────────────────────────────────────────────────────────────
//  Site chrome: announcement bar (rebate hook), sticky header with real nav,
//  fat navy footer, and a mobile bottom quote bar. No phone number is shown
//  anywhere until the business publishes one (compliance rule - see plan §6).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, ArrowUp, Menu, X } from 'lucide-react'
import skyraLogo from '../assets/skyra-logo.webp'
import { ABN, BTN, EASE, ScrollToTop } from './shared'

const NAV = [
  ['Solar', '/solar'],
  ['Batteries', '/batteries'],
  ['Commercial', '/commercial'],
  ['Rebates', '/rebates'],
  ['About', '/about'],
]

function AnnouncementBar() {
  return (
    <Link
      to="/rebates"
      className="flex items-center justify-center gap-2 bg-[#0a1b2e] px-4 py-2 text-[12.5px] font-semibold text-sky-100 transition-colors hover:text-white sm:py-2.5 sm:text-[13px]"
    >
      <span className="rounded-md bg-amber-400/15 px-2 py-0.5 font-bold text-amber-300">
        Rebates
      </span>
      <span className="truncate sm:hidden">Around 30% off home batteries</span>
      <span className="hidden sm:inline">
        Around 30% off home batteries under the federal Cheaper Home Batteries Program
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 text-amber-300">
        <span className="hidden sm:inline">How it works</span> <ArrowRight size={13} />
      </span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Phones/tablets: tuck the header away while scrolling down, bring it back
     on the first upward scroll. Never near the top or with the menu open. */
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    if (open || y < 160) {
      setHidden(false)
      return
    }
    const delta = y - prev
    if (delta > 6) setHidden(true)
    else if (delta < -4) setHidden(false)
  })

  useEffect(() => setHidden(false), [pathname])

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={
        'sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-[translate,box-shadow,border-color] duration-300 ease-brand ' +
        (scrolled ? 'border-slate-200 shadow-header ' : 'border-transparent ') +
        (hidden ? 'max-lg:-translate-y-full' : '')
      }
    >
      <div
        className={
          'mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-300 ease-brand sm:px-6 lg:px-8 ' +
          (scrolled ? 'h-[60px]' : 'h-[72px]')
        }
      >
        <Link to="/" className="flex shrink-0 items-center" aria-label="SkyRa Energy home">
          <img
            src={skyraLogo}
            alt="SkyRa Energy"
            className={'w-auto transition-[height] duration-300 ease-brand ' + (scrolled ? 'h-8 sm:h-9' : 'h-10 sm:h-11')}
            width="480"
            height="284"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                'relative py-1 text-[14.5px] font-semibold transition-colors ' +
                (isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900')
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {/* Shared layoutId makes the underline glide between items.
                      Known edge: returning from a non-nav route animates in
                      from the last position; cosmetic, accepted. */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-amber-500"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            to="/contact"
            className={'hidden rounded-xl px-5 py-2.5 text-[14px] sm:inline-flex ' + BTN.primary}
          >
            Get a free quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <div className="flex flex-col p-3">
              {NAV.map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={close}
                  className={({ isActive }) =>
                    'rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors ' +
                    (isActive ? 'bg-amber-50 text-amber-900' : 'text-slate-700 hover:bg-slate-50')
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={close}
                className={'mt-2 justify-center rounded-xl px-4 py-3 text-center text-[15px] ' + BTN.primary}
              >
                Get a free quote
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  const backToTop = () =>
    window.scrollTo({
      top: 0,
      // JS smooth scrolling bypasses the CSS reduced-motion override
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })

  return (
    <footer className="grain relative overflow-hidden bg-[#0a1b2e] text-slate-300">
      {/* Oversized wordmark watermark, clipped at the footer's bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-[0.24em] select-none text-center text-[19vw] font-extrabold leading-none tracking-tight text-white/[0.03]"
      >
        SKYRA
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="inline-flex rounded-xl bg-white p-2.5">
            <img src={skyraLogo} alt="SkyRa Energy" className="h-9 w-auto" width="480" height="284" />
          </div>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-slate-400">
            Solar panels, home batteries and inverters, designed, supplied and
            installed as one system for homes and businesses across Australia.
          </p>
        </div>

        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500">What we install</h3>
          <ul className="mt-4 space-y-2.5 text-[14.5px] font-medium">
            <li><Link to="/solar" className="link-underline inline-block py-1 transition-colors hover:text-white">Solar panels</Link></li>
            <li><Link to="/batteries" className="link-underline inline-block py-1 transition-colors hover:text-white">Home batteries</Link></li>
            <li><Link to="/commercial" className="link-underline inline-block py-1 transition-colors hover:text-white">Commercial solar</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500">Company</h3>
          <ul className="mt-4 space-y-2.5 text-[14.5px] font-medium">
            <li><Link to="/about" className="link-underline inline-block py-1 transition-colors hover:text-white">About SkyRa</Link></li>
            <li><Link to="/rebates" className="link-underline inline-block py-1 transition-colors hover:text-white">Government rebates</Link></li>
            <li><Link to="/faq" className="link-underline inline-block py-1 transition-colors hover:text-white">FAQ</Link></li>
            <li><Link to="/contact" className="link-underline inline-block py-1 transition-colors hover:text-white">Contact us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500">Get started</h3>
          <p className="mt-4 text-[14px] leading-relaxed text-slate-400">
            Tell us about your place and power bill and we'll come back with a
            tailored, no-obligation quote.
          </p>
          <Link
            to="/contact"
            className={'mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] ' + BTN.primary}
          >
            Get a free quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-[12.5px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} SkyRa Energy · ABN {ABN}. All rights reserved.</span>
          <div className="flex items-center gap-5 sm:gap-6">
            <span className="max-w-xl leading-relaxed">
              Savings and rebate figures are indicative only, depend on eligibility
              and your site, and are confirmed in your written quote.
            </span>
            <button
              type="button"
              onClick={backToTop}
              aria-label="Back to top"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ArrowUp size={17} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* Mobile-only sticky quote bar (hidden on /contact where the form lives).
   Appears only after the visitor scrolls past the hero, so it never doubles
   up with the hero's own CTA on the first screen. */
function MobileQuoteBar() {
  const { pathname } = useLocation()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 560)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname === '/contact') return null
  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ y: 84 }}
          animate={{ y: 0 }}
          exit={{ y: 84 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur sm:hidden"
        >
          <Link
            to="/contact"
            className={'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] ' + BTN.primary}
          >
            Get a free quote <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main className="pb-20 sm:pb-0">
        {/* Enter-only page fade on route change. Deliberately no
            AnimatePresence: exit animations stall UI in this app. */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <MobileQuoteBar />
    </div>
  )
}
