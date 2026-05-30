import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DesignExploration from './design-exploration/DesignExploration.jsx'

// Isolated design-exploration surface at /?view=design — the live site at / is untouched.
const isDesign = new URLSearchParams(window.location.search).get('view') === 'design'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isDesign ? <DesignExploration /> : <App />}
  </StrictMode>,
)
