// Shared sub-page hero: full-bleed photo, navy scrim, headline + CTA.
// Copy staggers in like the homepage hero; no Ken Burns here so sub-pages
// feel a beat faster than the front door.
import { motion } from 'framer-motion'
import { CtaLink, EASE, Photo } from './shared'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export default function PageHero({
  base, alt, kicker, title, text, cta = 'Get a free quote', ctaTo = '/contact',
  secondCta, secondTo, position = 'object-center', widths = [800, 1400],
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-[#0a1b2e]">
      <Photo
        base={base}
        widths={widths}
        sizes="100vw"
        alt={alt}
        eager
        className={'absolute inset-0 h-full w-full object-cover ' + position}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1b2e]/92 via-[#0a1b2e]/60 to-[#0a1b2e]/15" />
      <div className="relative z-10 mx-auto flex min-h-[52svh] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
          <motion.p variants={item} className="text-[12px] font-bold uppercase tracking-[0.22em] text-amber-300">
            {kicker}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-3 text-[clamp(30px,4.6vw,54px)] font-extrabold leading-[1.06] tracking-tight text-white sm:mt-4"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-3 max-w-xl text-pretty text-[15.5px] leading-relaxed text-slate-200 sm:mt-4 sm:text-[16.5px]"
          >
            {text}
          </motion.p>
          <motion.div variants={item} className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <CtaLink to={ctaTo}>{cta}</CtaLink>
            {secondCta && <CtaLink to={secondTo} variant="ghost">{secondCta}</CtaLink>}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
