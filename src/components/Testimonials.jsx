import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

// Victorian homeowner reviews — AU pricing and VIC suburb locations
const REVIEWS = [
  {
    name: 'Sarah & Tom Mitchell',
    location: 'Brighton, VIC',
    avatar: 'SM',
    rating: 5,
    date: 'November 2024',
    title: 'Reduced our bill by 74% — mind-blowing!',
    text: "We were skeptical at first, but after 6 months with SkyRa, our electricity bill dropped from A$420/month to under A$110. The installation team was professional, clean, and done by 3pm. The app is incredibly intuitive. Highly recommend to every Victorian homeowner.",
    savings: 'A$3,720/yr',
    product: 'LONGi Solar + Tesla Powerwall 3',
  },
  {
    name: 'James Rivera',
    location: 'Geelong, VIC',
    avatar: 'JR',
    rating: 5,
    date: 'October 2024',
    title: 'Best home upgrade I\'ve ever made',
    text: "Victorian summer power bills were killing us. SkyRa solved that completely. My panels generate more than I use, and I'm actually exporting power back to the grid. The 25-year warranty gave me complete peace of mind. The team walked me through every step.",
    savings: 'A$2,800/yr',
    product: 'Jinko Solar Tiger Neo',
  },
  {
    name: 'Priya & Kevin Patel',
    location: 'St Kilda, VIC',
    avatar: 'PP',
    rating: 5,
    date: 'September 2024',
    title: 'Survived two grid outages without blinking',
    text: "The Sungrow battery was the game-changer for us. We've had two outages this year and our home kept running like nothing happened. Fridge, lights, AC — all on. Our neighbours were in the dark for 14 hours. Worth every cent for the peace of mind alone.",
    savings: 'A$2,400/yr',
    product: 'Trina Vertex S+ + Sungrow SBH',
  },
  {
    name: 'Dana Kowalski',
    location: 'Ballarat, VIC',
    avatar: 'DK',
    rating: 5,
    date: 'December 2024',
    title: 'Seamless from quote to installation',
    text: "I was worried about all the paperwork — permits, VIC rebates, grid connection. SkyRa handled absolutely everything. I literally just had to sign two documents and answer a few questions. Four weeks later, I'm generating my own clean energy. The support team is exceptional.",
    savings: 'A$1,960/yr',
    product: 'Canadian Solar HiHero',
  },
  {
    name: 'Marcus & Linda Thompson',
    location: 'Box Hill, VIC',
    avatar: 'MT',
    rating: 5,
    date: 'January 2025',
    title: 'VIC Solar Homes rebate made it a no-brainer',
    text: "We did the math and with the Victorian Solar Homes rebate plus STCs, our system pays for itself in under 6 years. After that, it's pure savings. SkyRa's financing options made it totally affordable upfront. Now we tell every neighbour about it.",
    savings: 'A$2,200/yr',
    product: 'REC Alpha Pure-R + BYD Battery-Box',
  },
]

// Render star icons
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  )
}

// Avatar circle with initials
function Avatar({ initials }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}
    >
      {initials}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % REVIEWS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % REVIEWS.length)
  }

  const review = REVIEWS[current]

  return (
    <section id="testimonials" ref={ref} className="py-24 bg-sky-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Customer Reviews
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Real Victorian Homeowners. Real Savings.
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Stars />
            <span className="text-gray-600 text-sm font-semibold">4.9 average from 900+ verified reviews</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Main carousel card */}
          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-sky-600/10 border border-sky-100">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={{
                    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="p-8 lg:p-10"
                >
                  {/* Quote icon */}
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-6">
                    <Quote size={22} className="text-sky-600" />
                  </div>

                  {/* Stars + date */}
                  <div className="flex items-center justify-between mb-4">
                    <Stars count={review.rating} />
                    <span className="text-gray-400 text-xs">{review.date}</span>
                  </div>

                  {/* Review title */}
                  <h3 className="text-xl font-black text-gray-900 mb-3">"{review.title}"</h3>

                  {/* Review text */}
                  <p className="text-gray-600 text-base leading-relaxed mb-6">{review.text}</p>

                  {/* Savings badge + product */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1.5 rounded-full">
                      Saves {review.savings}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                      {review.product}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                    <Avatar initials={review.avatar} />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                      <p className="text-gray-400 text-xs">{review.location}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prev / Next buttons */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-sky-50 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-sky-50 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-8 h-2.5 bg-sky-600'
                    : 'w-2.5 h-2.5 bg-sky-200 hover:bg-sky-400'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          {/* Bottom review grid teaser */}
          <div className="grid sm:grid-cols-3 gap-4 mt-12">
            {REVIEWS.filter((_, i) => i !== current).slice(0, 3).map((r) => (
              <div
                key={r.name}
                className="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm"
              >
                <Stars count={r.rating} />
                <p className="text-gray-700 text-sm font-semibold mt-2 mb-1">"{r.title}"</p>
                <p className="text-gray-400 text-xs">— {r.name}, {r.location}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
