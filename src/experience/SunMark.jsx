import { useId } from 'react'

/* "Dawn Disc" brand mark — SkyRa = Sky + Ra (the sun). A golden upper half
   over a deep sky lower half, split by a hairline of light. useId keeps
   gradient ids unique per use. */
export default function SunMark({ size = 28, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const warm = `sk-warm-${uid}`
  const cool = `sk-cool-${uid}`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      style={{ filter: 'drop-shadow(0 1px 5px rgba(14,165,233,0.45))' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={warm} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FDE047" />
          <stop offset="0.55" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={cool} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#075985" />
        </linearGradient>
      </defs>
      <path d="M4.6 22.4 A19.5 19.5 0 0 1 43.4 22.4 Z" fill={`url(#${warm})`} />
      <path d="M4.6 25.6 A19.5 19.5 0 0 0 43.4 25.6 Z" fill={`url(#${cool})`} />
    </svg>
  )
}
