import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowDown, ChevronDown } from 'lucide-react'

// Stagger container for bottom-row text
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const sectionRef = useRef(null)

  // Track scroll position relative to the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // ── Spring-smooth all scroll values for silky deceleration ──────────────
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  })

  // ── Background image: moves up at ~40% of scroll speed (parallax depth) ──
  const bgY = useTransform(smoothProgress, [0, 1], ['0%', '-25%'])
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.08])

  // ── "Go Solar" headline: drifts up + fades ────────────────────────────────
  const headline1Y = useTransform(smoothProgress, [0, 0.8], ['0%', '-18%'])
  const headline1Opacity = useTransform(smoothProgress, [0, 0.55], [1, 0])

  // ── "Save Up to 70%." — slightly faster drift for depth layering ───────────
  const headline2Y = useTransform(smoothProgress, [0, 0.8], ['0%', '-24%'])
  const headline2Opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])

  // ── Bottom row (body copy + CTA): fades out first ─────────────────────────
  const bottomOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0])
  const bottomY = useTransform(smoothProgress, [0, 0.4], ['0px', '-50px'])

  // ── Glass stats card: fades a little later ────────────────────────────────
  const cardOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0])
  const cardY = useTransform(smoothProgress, [0, 0.5], ['0px', '-30px'])

  // ── Scroll cue: hides after first 8% scroll ───────────────────────────────
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-between overflow-hidden pt-24 pb-6 lg:pb-8"
    >
      {/* ── Background Image with Parallax ─────────────────────────────── */}
      <div className="absolute inset-0 z-0 bg-[#0c1a2e] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2670&auto=format&fit=crop"
          alt="Solar panels installed on a residential home"
          loading="eager"
          decoding="async"
          style={{ y: bgY, scale: bgScale }}
          className="w-full h-full object-cover opacity-80 origin-center"
        />
        {/* Layered gradients — deepens contrast around text without
            tinting the sky in the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e] via-[#0c1a2e]/30 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-between max-w-[1600px] mx-auto w-full px-6 lg:px-12">

        {/* Large headlines — each with independent parallax depth */}
        <div className="flex flex-col flex-1 w-full justify-center mt-4 lg:-mt-8">
          <div className="max-w-[1200px] mx-auto w-full">

            {/* Headline 1 — enters from below on load, then parallaxes upward */}
            <motion.h1
              style={{ y: headline1Y, opacity: headline1Opacity }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-[12vw] sm:text-[130px] lg:text-[160px] leading-[0.85] font-bold text-white tracking-tighter self-start drop-shadow-lg will-change-transform"
            >
              Go Solar
            </motion.h1>

            {/* Headline 2 — slightly longer entry, deeper parallax */}
            <motion.h1
              style={{ y: headline2Y, opacity: headline2Opacity }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
              className="text-[12vw] sm:text-[110px] lg:text-[160px] leading-[.85] text-white font-extrabold tracking-tight text-right w-fit ml-auto whitespace-nowrap drop-shadow-xl will-change-transform"
            >
              Save Up to 70%.
            </motion.h1>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-end w-full max-w-[1400px] mx-auto pt-6 lg:pt-8">

          {/* Bottom Left — fades out quickly on scroll */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ opacity: bottomOpacity, y: bottomY }}
            className="lg:col-span-8 flex flex-col items-start will-change-transform"
          >
            <motion.p
              variants={itemVariants}
              className="text-white/95 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed mb-4 font-medium drop-shadow-md"
            >
              SkyRa Energy supplies and installs premium solar panels and smart home batteries
              to homes across Victoria. Cut your power bill by up to 70% and take advantage of
              the Victorian Solar Homes rebate.
            </motion.p>

            <motion.button
              variants={itemVariants}
              onClick={() => scrollTo('#cta')}
              className="flex items-center gap-4 bg-white text-slate-900 rounded-full pl-6 pr-2 py-2 hover:bg-gray-100 transition-colors group shadow-xl shadow-black/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="font-bold text-base lg:text-lg tracking-wide">Get Free Quote</span>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowDown size={18} className="text-white" />
              </div>
            </motion.button>
          </motion.div>

          {/* Bottom Right: Glass Card — fades slightly later */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: cardOpacity, y: cardY }}
            className="lg:col-span-4 lg:ml-auto w-full max-w-[340px] relative bg-white/[0.07] backdrop-blur-xl border border-white/20 rounded-3xl p-5 lg:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] will-change-transform overflow-hidden"
          >
            {/* Top hairline gloss */}
            <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            <div className="relative flex flex-col gap-4">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-1 tracking-tight">70%</h3>
                <p className="text-white/80 text-sm font-medium">Average Bill Reduction</p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-white/5 via-white/25 to-white/5" />
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-1 tracking-tight">25-Yr</h3>
                <p className="text-white/80 text-sm font-medium">Warranty &amp; Expert Installation</p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-white/5 via-white/25 to-white/5" />
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-1 tracking-tight">CEC</h3>
                <p className="text-white/80 text-sm font-medium">Accredited Installers</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll Cue ────────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: scrollCueOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={() => scrollTo('#products')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
      >
        {/* Thin animated line */}
        <motion.div
          className="w-px bg-white/40 rounded-full origin-top"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ height: 28 }}
        />
        {/* Bouncing chevron */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-white/60" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
