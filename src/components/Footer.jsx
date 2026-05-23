import { motion } from 'framer-motion'
import { Sun, Twitter, Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react'

const FOOTER_LINKS = {
  Brands: [
    'LONGi Solar',
    'Jinko Solar',
    'Trina Solar',
    'Canadian Solar',
    'REC Group',
  ],
  Batteries: [
    'Tesla Powerwall',
    'Sungrow SBH',
    'BYD Battery-Box',
    'Battery Comparison',
    'Battery FAQ',
  ],
  Company: [
    'About SkyRa',
    'Our Mission',
    'Careers',
    'Press',
    'Blog',
  ],
  Resources: [
    'VIC Solar Homes Rebate',
    'Federal STCs Guide',
    'Savings Calculator',
    'Case Studies',
    'Energy Tips',
  ],
}

const SOCIAL_LINKS = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

const CONTACT_INFO = [
  { icon: Phone, text: '1300 759 724' },
  { icon: Mail, text: 'hello@skyraenergy.com.au' },
  { icon: MapPin, text: 'Level 4, 123 Collins St, Melbourne VIC 3000' },
]

const CERTIFICATIONS = [
  'CEC Accredited Installer',
  'VIC Solar Homes Approved',
  'Clean Energy Council Member',
  'Fair Trading Compliant',
]

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #0c1a2e 0%, #060e1a 100%)',
      }}
    >
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#hero')}
              className="flex items-center gap-2 mb-5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Sun size={22} className="text-white" />
              </div>
              <span className="text-xl font-black text-white">
                SkyRa<span className="text-sky-400"> Energy</span>
              </span>
            </button>

            <p className="text-sky-300/60 text-sm leading-relaxed mb-6">
              Empowering Victorian homeowners with clean, affordable solar energy since 2011.
              Premium brand-name panels, smart batteries, expert CEC-accredited installation.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              {CONTACT_INFO.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={15} className="text-sky-500 flex-shrink-0" />
                  <span className="text-sky-300/70 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-300/60 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sky-300/60 text-sm hover:text-sky-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="text-xs text-sky-400/60 font-semibold px-3 py-1 rounded-full border border-sky-400/15 bg-sky-400/5"
              >
                {cert}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-sky-300/40">
            <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Accessibility</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sky-300/40 text-xs">
            © {new Date().getFullYear()} SkyRa Energy Pty Ltd. All rights reserved. ESV Reg. #REC-48210. ABN 47 123 456 789.
          </p>
          <p className="text-sky-300/30 text-xs">
            Made with ☀️ in Melbourne, VIC
          </p>
        </div>
      </div>
    </footer>
  )
}
