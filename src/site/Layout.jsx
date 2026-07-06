// ─────────────────────────────────────────────────────────────────────────────
//  Site chrome: announcement bar (rebate hook), sticky header with real nav,
//  fat navy footer, and a mobile bottom quote bar. No phone number is shown
//  anywhere until the business publishes one (compliance rule - see plan §6).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import skyraLogo from '../assets/skyra-logo.webp'
import { EASE, ScrollToTop } from './shared'

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
      className="block bg-[#0a1b2e] px-4 py-2.5 text-center text-[12.5px] font-semibold text-sky-100 transition-colors hover:text-white sm:text-[13px]"
    >
      <span className="mr-2 rounded-md bg-amber-400/15 px-2 py-0.5 font-bold text-amber-300">
        Rebates
      </span>
      <span className="sm:hidden">Around 30% off home batteries with the federal rebate</span>
      <span className="hidden sm:inline">
        Around 30% off home batteries under the federal Cheaper Home Batteries Program
      </span>
      <span className="ml-2 inline-flex items-center gap-1 text-amber-300">
        How it works <ArrowRight size={13} />
      </span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={
        'sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow ' +
        (scrolled ? 'border-slate-200 shadow-[0_1px_12px_rgba(2,8,23,0.06)]' : 'border-transparent')
      }
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center" aria-label="SkyRa Energy home">
          <img src={skyraLogo} alt="SkyRa Energy" className="h-10 w-auto sm:h-11" width="480" height="284" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                'relative py-1 text-[14.5px] font-semibold transition-colors ' +
                (isActive
                  ? 'text-slate-900 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-amber-500'
                  : 'text-slate-600 hover:text-slate-900')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            to="/contact"
            className="hidden rounded-xl bg-amber-500 px-5 py-2.5 text-[14px] font-bold text-slate-950 shadow-sm transition-colors hover:bg-amber-400 sm:inline-flex"
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
                className="mt-2 rounded-xl bg-amber-500 px-4 py-3 text-center text-[15px] font-bold text-slate-950"
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
  return (
    <footer className="bg-[#0a1b2e] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
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
            <li><Link to="/solar" className="transition-colors hover:text-white">Solar panels</Link></li>
            <li><Link to="/batteries" className="transition-colors hover:text-white">Home batteries</Link></li>
            <li><Link to="/commercial" className="transition-colors hover:text-white">Commercial solar</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-500">Company</h3>
          <ul className="mt-4 space-y-2.5 text-[14.5px] font-medium">
            <li><Link to="/about" className="transition-colors hover:text-white">About SkyRa</Link></li>
            <li><Link to="/rebates" className="transition-colors hover:text-white">Government rebates</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-white">Contact us</Link></li>
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
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-[14px] font-bold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Get a free quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-[12.5px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} SkyRa Energy. All rights reserved.</span>
          <span className="max-w-xl leading-relaxed">
            Savings and rebate figures are indicative only, depend on eligibility
            and your site, and are confirmed in your written quote.
          </span>
        </div>
      </div>
    </footer>
  )
}

/* Mobile-only sticky quote bar (hidden on /contact where the form lives). */
function MobileQuoteBar() {
  const { pathname } = useLocation()
  if (pathname === '/contact') return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
      <Link
        to="/contact"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-[15px] font-bold text-slate-950"
      >
        Get a free quote <ArrowRight size={16} />
      </Link>
    </div>
  )
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main className="pb-20 sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileQuoteBar />
    </div>
  )
}
