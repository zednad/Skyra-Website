// /contact — quote form front and centre.
import { CheckCircle2 } from 'lucide-react'
import QuoteForm from '../QuoteForm'
import { Kicker, Meta, Photo, Reveal } from '../shared'

export default function Contact() {
  return (
    <>
      <Meta
        title="Get a Free Solar & Battery Quote | SkyRa Energy"
        description="Tell us about your place and power bill — SkyRa comes back with a tailored, no-obligation solar and battery quote with every eligible rebate applied."
      />
      <section className="bg-[#faf9f7] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <Kicker>Get started</Kicker>
            <h1 className="mt-3 text-[clamp(30px,4.4vw,50px)] font-extrabold leading-[1.06] tracking-tight text-slate-900">
              Two minutes now, a clear answer soon after.
            </h1>
            <p className="mt-4 max-w-lg text-[16.5px] leading-relaxed text-slate-600">
              Tell us a little about your place. A SkyRa specialist will come
              back to arrange your free assessment and a written quote with
              every eligible rebate already applied.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Free and genuinely no-obligation',
                'Every eligible rebate applied upfront',
                'Plain numbers and named hardware — no mystery kit',
                'Residential and commercial systems',
              ].map((l) => (
                <li key={l} className="flex items-center gap-3 text-[15px] font-semibold text-slate-700">
                  <CheckCircle2 size={19} className="shrink-0 text-amber-600" />
                  {l}
                </li>
              ))}
            </ul>
            <div className="mt-9 hidden overflow-hidden rounded-2xl lg:block">
              <Photo
                base="consult-table"
                widths={[640, 1100]}
                sizes="(min-width:1024px) 44vw, 100vw"
                alt="SkyRa consultant walking a couple through a system design"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
