// /commercial - commercial & industrial solar.
import { BarChart3, Building2, CalendarClock } from 'lucide-react'
import PageHero from '../PageHero'
import { CtaBand, FaqSection, QuoteSection, StepsSection } from '../sections'
import { H2, Kicker, Meta, Photo, Reveal } from '../shared'

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

const FAQS = [
  ['What size system does my business need?', 'It depends on your daytime consumption and roof area. From your recent bills (ideally interval data) we model the size that maximises self-consumption, which is where commercial payback lives.'],
  ['What incentives apply to businesses?', 'Systems up to 100 kW attract STCs like residential systems; larger systems earn LGCs over time. Batteries from 5–100 kWh can also qualify for the federal battery program. We put the applicable incentives directly in your proposal.'],
  ['Will installation disrupt trading?', 'We plan installs around your operations: staged works, weekends and clear site management. Most sub-100 kW systems are installed within days.'],
  ['Can you work with our landlord or body corporate?', 'Yes. We prepare the documentation owners and property managers ask for, including structural, electrical and insurance paperwork.'],
]

export default function Commercial() {
  return (
    <>
      <Meta
        title="Commercial Solar Systems | SkyRa Energy"
        description="Commercial solar engineered around your load profile and tariff. One accountable team for design, approvals and installation, from 20 kW to warehouse scale."
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
      <FaqSection items={FAQS} title="Commercial questions, answered." />
      <CtaBand />
      <QuoteSection photoBase="commercial-roof" photoWidths={[800, 1400]} photoAlt="Commercial solar installation" />
    </>
  )
}
