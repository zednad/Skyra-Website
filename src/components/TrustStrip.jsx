import { motion } from 'framer-motion'

// Tier-1 brands SkyRa supplies & installs — shown as a clean credibility strip.
// No aggregate star-rating / review-count claims here by request.
const BRANDS = ['LONGi', 'Jinko Solar', 'Trina Solar', 'Tesla', 'Sungrow', 'Fronius', 'REC']

export default function TrustStrip() {
  return (
    <section className="relative border-y border-slate-100 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-7">
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-between lg:gap-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 whitespace-nowrap">
            Tier-1 brands we supply &amp; install
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-10">
            {BRANDS.map((brand, i) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-[17px] lg:text-[19px] font-extrabold tracking-tight text-slate-400 transition-colors hover:text-slate-700"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
