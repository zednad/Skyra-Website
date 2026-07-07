// /rebates - government incentives explained. Public program facts current at
// July 2026, always with eligibility disclaimers (plan §6).
import { BadgePercent, Landmark, MapPinned, SunMedium } from 'lucide-react'
import PageHero from '../PageHero'
import { FaqSection, QuoteSection } from '../sections'
import { REBATE_FAQS } from '../faqData'
import { CARD_HOVER, H2, Kicker, Meta, Reveal } from '../shared'

const SCHEMES = [
  {
    Icon: BadgePercent,
    name: 'Cheaper Home Batteries Program',
    who: 'Federal: home & business batteries',
    points: [
      'Roughly 30% off the installed cost of eligible battery systems from 5–100 kWh.',
      'Worth about $252 per usable kWh for typical home batteries installed from 1 May 2026, with the full rate up to 14 kWh usable and tapering above.',
      'No income or means test. Applied upfront on your invoice via STCs, and we do the claiming.',
    ],
  },
  {
    Icon: SunMedium,
    name: 'Small-scale Technology Certificates (STCs)',
    who: 'Federal: solar panel systems',
    points: [
      'Reduces the upfront price of eligible solar systems up to 100 kW.',
      'Value depends on system size, your location zone and the install date.',
      'The scheme phases down each year until it ends in 2030, so earlier installs earn more certificates.',
    ],
  },
  {
    Icon: MapPinned,
    name: 'State & territory incentives',
    who: 'Varies by state',
    points: [
      'Several states run additional schemes, for example energy-savings certificates and interest-free loan programs.',
      'What applies depends on your address and can often stack with the federal programs.',
      'We check what your postcode qualifies for as part of every quote.',
    ],
  },
]

function Schemes() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Kicker>What's available</Kicker>
          <H2>Three layers of incentives, one tidy quote.</H2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            You never claim anything yourself. Every eligible incentive is
            applied to your quote as an upfront price reduction, with the
            paperwork handled by us.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3">
          {SCHEMES.map(({ Icon, name, who, points }, i) => (
            <Reveal key={name} delay={i * 0.06}>
              <div className={'flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 ' + CARD_HOVER}>
                <div className="flex items-center gap-3.5 sm:block">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-amber-400 sm:h-12 sm:w-12">
                    <Icon size={21} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-bold leading-snug text-slate-900 sm:mt-5 sm:text-[18px]">{name}</h3>
                    <p className="mt-0.5 text-[12px] font-bold uppercase tracking-wider text-amber-700 sm:mt-1 sm:text-[12.5px]">{who}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-3">
                  {points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[14px] leading-relaxed text-slate-600">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-[#faf9f7] p-5 text-[13px] leading-relaxed text-slate-500">
            <Landmark size={18} className="mt-0.5 shrink-0 text-slate-400" />
            <p>
              Program settings summarised here are current at July 2026 and change
              over time. Discounts vary with system size, hardware and location,
              and eligibility criteria apply to every scheme. Your written quote
              states the exact incentive amounts for your address. That figure,
              not this page, is the one we stand behind.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


export default function Rebates() {
  return (
    <>
      <Meta
        title="Solar & Battery Rebates Australia (2026 Guide) | SkyRa Energy"
        description="Plain-English guide to the federal battery rebate (~30% off), solar STC incentives and state schemes, and how SkyRa applies them upfront on your quote."
      />
      <PageHero
        base="suburb-aerial"
        widths={[1280, 2048]}
        alt="Australian suburb at golden hour with many solar rooftops"
        kicker="Government rebates"
        title="The rebates are real. The paperwork is ours."
        text="Around 30% off eligible home batteries, STC incentives on solar, and state schemes on top, every one applied upfront on your quote."
        position="object-[50%_70%]"
      />
      <Schemes />
      <FaqSection items={REBATE_FAQS} title="Rebate questions, answered." />
      <QuoteSection />
    </>
  )
}
