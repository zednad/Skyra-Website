// ─────────────────────────────────────────────────────────────────────────────
//  Shared GSAP setup for the experience homepage.
//  Registers plugins once and exposes a scoped-context hook that is safe under
//  React 19 StrictMode (double-invoked effects) — everything created inside
//  useGsap is reverted on cleanup, including ScrollTriggers and SplitText.
// ─────────────────────────────────────────────────────────────────────────────
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }

/** Signature ease used across the page. */
export const EASE = 'power4.out'

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function isFinePointer() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches
  )
}

/**
 * Run GSAP code inside a gsap.context scoped to the returned ref.
 * Selector strings inside `fn` only match descendants of the scope element,
 * and `fn` receives that element as its argument. `fn` may return a cleanup
 * function, which runs when the context reverts.
 */
export function useGsap(fn, deps = []) {
  const scope = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => fn(scope.current), scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return scope
}
