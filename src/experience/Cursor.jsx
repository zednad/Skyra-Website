// Custom cursor: a crisp dot that tracks 1:1 plus a soft ring that trails on
// a spring. The ring blooms over links/buttons/[data-cursor] targets. Only
// active on fine pointers with motion allowed — touch users never see it.
import { useEffect, useRef } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from './gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })
    let shown = false

    const onMove = (e) => {
      if (!shown) {
        shown = true
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 })
      }
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      ringX(e.clientX)
      ringY(e.clientY)
    }
    const isTarget = (el) => el.closest?.('a, button, [data-cursor], input, label')
    const onOver = (e) => {
      if (isTarget(e.target)) gsap.to(ring, { scale: 2.2, opacity: 0.45, duration: 0.3 })
    }
    const onOut = (e) => {
      if (isTarget(e.target)) gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerout', onOut, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300 opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/60 opacity-0"
      />
    </>
  )
}
