// ─────────────────────────────────────────────────────────────────────────────
//  Shared primitives for the SkyRa design-exploration surface.
// ─────────────────────────────────────────────────────────────────────────────
import { motion } from 'framer-motion'
import { cx, T } from './tokens'

// Rotating, glowing brand orb (mini version of the site's SunOrb)
export function SunOrb({ size = 26 }) {
  return (
    <span
      className="relative inline-block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 34% 30%, #BAE6FD, #0EA5E9 52%, #0369A1)',
        boxShadow:
          '0 0 14px 2px rgba(14,165,233,0.55), inset 0 1px 1px rgba(255,255,255,0.45)',
      }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle at 30% 26%, rgba(255,255,255,0.55), transparent 55%)' }}
      />
    </span>
  )
}

// Soft atmospheric glow blob
export function Glow({ color = '#0EA5E9', className = '', style = {}, opacity = 0.5 }) {
  return (
    <div
      aria-hidden
      className={cx('pointer-events-none absolute rounded-full blur-[120px]', className)}
      style={{ background: color, opacity, ...style }}
    />
  )
}

// Section eyebrow + heading
export function SectionHeading({ kicker, title, sub, center }) {
  return (
    <div className={cx('flex flex-col gap-2', center && 'items-center text-center')}>
      {kicker && (
        <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#F59E0B]">
          {kicker}
        </span>
      )}
      <h2 className="text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-tight text-[#F8FAFC]">
        {title}
      </h2>
      {sub && <p className="max-w-2xl text-[15px] leading-relaxed text-[#9FB0C9]">{sub}</p>}
    </div>
  )
}

export function Chip({ children, className = '' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border border-[#2C3A57] bg-[#1B2740] px-3.5 py-1.5 text-[13px] font-medium text-[#C9D5E8]',
        className,
      )}
    >
      {children}
    </span>
  )
}

// External reference link chip (used for Mobbin links)
export function LinkChip({ children, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 rounded-full border border-[#2A4A6B] bg-[#0C1A2E] px-3 py-1.5 text-[12.5px] font-semibold text-[#7DD3FC] transition-colors hover:border-[#38BDF8] hover:bg-[#10243A] hover:text-[#BAE6FD]"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
    </a>
  )
}

// Panel/card shell
export function Panel({ children, className = '', style = {} }) {
  return (
    <div
      className={cx('rounded-3xl border border-[#24304A] bg-[#131C2E]', className)}
      style={style}
    >
      {children}
    </div>
  )
}

// A labelled browser-chrome frame that wraps each of the 10 mini-mockups.
export function BrowserFrame({ label, url = 'skyra.com.au', accent = T.sky, children, tall }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#24304A] bg-[#0E1726] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
      {/* chrome */}
      <div className="flex items-center gap-3 border-b border-[#1E2A42] bg-[#0B1422] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F45D48]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F8B73E]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#37C26B]/80" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-[#1E2A42] bg-[#0E1726] px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <span className="truncate text-[11px] font-medium text-[#6B7C99]">{url}</span>
        </div>
        {label && (
          <span
            className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ color: accent, background: `${accent}1f` }}
          >
            {label}
          </span>
        )}
      </div>
      {/* viewport */}
      <div className={cx('relative overflow-hidden', tall ? 'h-[340px]' : 'h-[300px]')}>{children}</div>
    </div>
  )
}

// Small star row
export function Stars({ n = 5, size = 13, color = '#FBBF24' }) {
  return (
    <span className="inline-flex gap-0.5" style={{ color }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 18l-6 3.4 1.4-6.8L2.3 9.1l6.9-.8z" />
        </svg>
      ))}
    </span>
  )
}

// Entrance wrapper (respects reduced-motion via CSS already in index.css)
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
