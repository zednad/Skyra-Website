import { Route, Routes } from 'react-router-dom'
import Layout from './site/Layout'
import Home from './site/pages/Home'
import Solar from './site/pages/Solar'
import Batteries from './site/pages/Batteries'
import Commercial from './site/pages/Commercial'
import Rebates from './site/pages/Rebates'
import About from './site/pages/About'
import Contact from './site/pages/Contact'
import NotFound from './site/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="solar" element={<Solar />} />
        <Route path="batteries" element={<Batteries />} />
        <Route path="commercial" element={<Commercial />} />
        <Route path="rebates" element={<Rebates />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
