import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Isolated design-exploration surface at /?view=design — the live site at / is
// untouched. Lazy-loaded so its framer-motion bundle never ships to visitors.
const DesignExploration = lazy(() => import('./design-exploration/DesignExploration.jsx'))
const isDesign = new URLSearchParams(window.location.search).get('view') === 'design'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isDesign ? (
      <Suspense fallback={null}>
        <DesignExploration />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
