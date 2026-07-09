// /contact - quote form front and centre, phone and office for
// people who would rather talk or drop in.
import { CheckCircle2, MapPin, Phone } from 'lucide-react'
import QuoteForm from '../QuoteForm'
import { ADDRESS_LINES, Kicker, Meta, Photo, PHONE, PHONE_HREF, Reveal } from '../shared'

export default function Contact() {
  return (
    <>
      <Meta
        title="Get a Free Solar & Battery Quote | SkyRa Energy"
        description="Tell us about your place and power bill and SkyRa comes back with a tailored, no-obligation solar and battery quote with every eligible rebate applied."
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
                'Plain numbers and named hardware, no mystery kit',
                'Residential and commercial systems',
              ].map((l) => (
                <li key={l} className="flex items-center gap-3 text-[15px] font-semibold text-slate-700">
                  <CheckCircle2 size={19} className="shrink-0 text-amber-600" />
                  {l}
                </li>
              ))}
            </ul>
            <div className="mt-9 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <p className="text-[13px] font-bold uppercase tracking-wider text-slate-500">
                Prefer to talk or drop in?
              </p>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-8">
                <a
                  href={PHONE_HREF}
                  className="flex shrink-0 items-center gap-3 whitespace-nowrap text-[15.5px] font-bold text-slate-900 transition-colors hover:text-amber-700"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
                    <Phone size={17} strokeWidth={2.5} />
                  </span>
                  {PHONE}
                </a>
                <address className="flex items-start gap-3 text-[14.5px] font-medium not-italic leading-relaxed text-slate-600">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
                    <MapPin size={17} strokeWidth={2.5} />
                  </span>
                  <span>
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </span>
                </address>
              </div>
            </div>
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
