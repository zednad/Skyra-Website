// /commercial - commercial & industrial solar.
import { BarChart3, Building2, CalendarClock } from 'lucide-react'
import PageHero from '../PageHero'
import { FaqSection, QuoteSection, StepsSection } from '../sections'
import { COMMERCIAL_FAQS } from '../faqData'
import { H2, JsonLd, Kicker, Meta, Photo, Reveal, SITE_URL } from '../shared'

function Value() {
  const items = [
    { Icon: BarChart3, t: 'Built around your load profile', s: 'Commercial solar pays best when generation matches consumption. We design from your interval data, not a rule of thumb.' },
    { Icon: CalendarClock, t: 'Installed around your operations', s: 'Weekend and staged installs, safe work method statements, and site inductions handled, with minimal disruption to trading.' },
    { Icon: Building2, t: 'From office to warehouse scale', s: 'Systems from ~20 kW to hundreds of kW, engineered for your roof structure, switchboard capacity and network rules.' },
  ]
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="overflow-hidden rounded-2xl">
            <Photo
              base="commercial-roof"
              widths={[800, 1400]}
              sizes="(min-width:1024px) 48vw, 100vw"
              alt="Warehouse roof fully covered with solar panels at golden hour"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Kicker>Commercial solar</Kicker>
            <H2>Turn an idle roof into an operating asset.</H2>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
              Daytime-heavy businesses see the fastest paybacks in solar. We
              handle the engineering, network approvals and installation as one
              accountable contract.
            </p>
            <ul className="mt-8 space-y-6">
              {items.map(({ Icon, t, s }) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-amber-400">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-[16.5px] font-bold text-slate-900">{t}</h3>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-slate-500">{s}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}


export default function Commercial() {
  return (
    <>
      <Meta
        title="Commercial Solar Systems | SkyRa Energy"
        description="Commercial solar engineered around your load profile and tariff. One accountable team for design, approvals and installation, from 20 kW to warehouse scale."
      />
      <JsonLd
        id="ld-service"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Commercial solar installation',
          serviceType: 'Commercial solar system design and installation',
          provider: { '@type': 'Organization', name: 'SkyRa Energy', url: SITE_URL },
          areaServed: { '@type': 'Country', name: 'Australia' },
          description:
            'Commercial solar systems engineered around your load profile, roof and tariff, from design and network approvals through installation.',
        }}
      />
      <PageHero
        base="commercial-roof"
        alt="Commercial warehouse with a full rooftop solar array"
        kicker="Commercial"
        title="Cut operating costs with your own daytime power."
        text="Solar engineered for your load profile, roof and tariff, designed, approved and installed by one accountable team."
        cta="Request a commercial proposal"
      />
      <Value />
      <StepsSection />
      <FaqSection items={COMMERCIAL_FAQS} title="Commercial questions, answered." />
      <QuoteSection photoBase="commercial-roof" photoWidths={[800, 1400]} photoAlt="Commercial solar installation" />
    </>
  )
}
