// Plain helpers + design tokens for the design-exploration surface.
// Kept separate from ui.jsx so that file only exports components (Fast Refresh).

export const cx = (...c) => c.filter(Boolean).join(' ')

export const T = {
  canvas: '#0B1220',
  panel: '#131C2E',
  panelSoft: '#0F1828',
  border: '#24304A',
  borderSoft: '#1E2A42',
  ink: '#F8FAFC',
  sub: '#9FB0C9',
  mute: '#7F8EA8',
  sky: '#38BDF8',
  skyDeep: '#0EA5E9',
  skyPale: '#BAE6FD',
  amber: '#F59E0B',
}
