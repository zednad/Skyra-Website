// Shared sub-page hero: full-bleed photo, navy scrim, headline + CTA.
import { motion } from 'framer-motion'
import { CtaLink, EASE, Photo } from './shared'

export default function PageHero({
  base, alt, kicker, title, text, cta = 'Get a free quote', ctaTo = '/contact',
  secondCta, secondTo, position = 'object-center', widths = [800, 1400],
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a1b2e]">
      <Photo
        base={base}
        widths={widths}
        sizes="100vw"
        alt={alt}
        eager
        className={'absolute inset-0 h-full w-full object-cover ' + position}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1b2e]/92 via-[#0a1b2e]/60 to-[#0a1b2e]/15" />
      <div className="relative mx-auto flex min-h-[52svh] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-amber-300">{kicker}</p>
          <h1 className="mt-4 text-[clamp(32px,4.6vw,54px)] font-extrabold leading-[1.06] tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-slate-200">{text}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaLink to={ctaTo}>{cta}</CtaLink>
            {secondCta && <CtaLink to={secondTo} variant="ghost">{secondCta}</CtaLink>}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
