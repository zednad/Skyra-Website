import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import ProductShowcase from './components/ProductShowcase'
import Products from './components/Products'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ProductShowcase />
        <Products />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
