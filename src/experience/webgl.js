// Small helpers for the Three.js hero scene, kept out of component files so
// fast-refresh stays happy and render functions stay pure.

export function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Deterministic PRNG (mulberry32). The particle layouts only need
 * decorrelated noise, and a seeded generator keeps renders pure /
 * reproducible across StrictMode double-renders.
 */
export function seededRandom(seed = 1) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
