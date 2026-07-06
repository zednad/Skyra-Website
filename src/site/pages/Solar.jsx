// /solar - residential solar panels.
import { Layers, SunMedium, Wrench } from 'lucide-react'
import PageHero from '../PageHero'
import { CalculatorSection, FaqSection, QuoteSection, StepsSection } from '../sections'
import { SOLAR_FAQS } from '../faqData'
import { H2, JsonLd, Kicker, Meta, Photo, Reveal, SITE_URL } from '../shared'

function Approach() {
  const items = [
    { Icon: SunMedium, t: 'Tier-1 panels only', s: 'All-black mono panels from established Tier-1 manufacturers with strong Australian warranty support and no obscure imports.' },
    { Icon: Layers, t: 'Designed for your roof', s: 'Orientation, shading and your actual usage pattern drive the layout, not whatever fits the cheapest kit.' },
    { Icon: Wrench, t: 'Installed properly', s: 'Quality rails and clamps, tidy cable runs, correct switchboard protection, and a clean finish you can look at with pride.' },
  ]
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Kicker>Our approach</Kicker>
            <H2>Panels chosen for decades, not for the brochure.</H2>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
              A solar system lives on your roof for 25 years. We only fit
              hardware we're confident will still be supported then, and we
              install it like it has to survive an inspection, because it does.
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
          <Reveal delay={0.08} className="grid gap-4">
            <div className="overflow-hidden rounded-2xl">
              <Photo
                base="install-detail"
                widths={[800, 1400]}
                sizes="(min-width:1024px) 48vw, 100vw"
                alt="Close-up of solar mounting hardware being torqued"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Supporting pair adds little on phones; one strong photo is enough. */}
            <div className="hidden grid-cols-2 gap-4 sm:grid">
              <div className="overflow-hidden rounded-2xl">
                <Photo
                  base="why-hardware"
                  widths={[640, 1100]}
                  sizes="24vw"
                  alt="Installer connecting cabling beneath a solar panel"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <Photo
                  base="why-team"
                  widths={[640, 1100]}
                  sizes="24vw"
                  alt="SkyRa installer smiling on a rooftop"
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}


export default function Solar() {
  return (
    <>
      <Meta
        title="Residential Solar Panels, Installed by One Team | SkyRa Energy"
        description="Tier-1 solar panels designed for your roof and usage, installed cleanly by one local team. Free assessments, STC rebates handled, battery-ready designs."
      />
      <JsonLd
        id="ld-service"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Residential solar panel installation',
          serviceType: 'Solar panel installation',
          provider: { '@type': 'Organization', name: 'SkyRa Energy', url: SITE_URL },
          areaServed: { '@type': 'Country', name: 'Australia' },
          description:
            'Tier-1 solar panels designed for your roof and usage, installed by one local team, with STC incentives applied upfront on the quote.',
        }}
      />
      <PageHero
        base="bento-panels"
        alt="All-black solar array installed on a terracotta roof"
        kicker="Residential solar"
        title="A roof that pays its own way."
        text="Tier-1 panels, sized to your usage, installed cleanly by the same team that designed them, with every eligible incentive applied to your quote."
        secondCta="Estimate my savings"
        secondTo="/solar#calculator"
      />
      <Approach />
      <CalculatorSection />
      <StepsSection />
      <FaqSection items={SOLAR_FAQS} title="Solar questions, answered." />
      <QuoteSection photoBase="van-driveway" photoWidths={[800, 1400]} photoAlt="SkyRa van and installer delivering panels to a home" />
    </>
  )
}
