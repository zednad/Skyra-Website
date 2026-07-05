// ─────────────────────────────────────────────────────────────────────────────
//  /batteries - the rebate landing page. Program figures below are the public
//  Cheaper Home Batteries Program settings current at July 2026; they carry
//  an eligibility disclaimer and are confirmed per-quote (plan §6).
// ─────────────────────────────────────────────────────────────────────────────
import { BatteryCharging, Home, PlugZap, ShieldCheck } from 'lucide-react'
import PageHero from '../PageHero'
import EnergyStory from '../../components/EnergyStory'
import { CtaBand, FaqSection, QuoteSection, StepsSection } from '../sections'
import { H2, Kicker, Meta, Photo, Reveal } from '../shared'

const BATTERY_PRODUCTS = [
  { img: '/images/batteries/sigenergy.webp', name: 'Sigenergy SigenStor', blurb: 'Modular stackable capacity with built-in hybrid inverter and EV-ready options.' },
  { img: '/images/batteries/foxess_eq4800.jpg', name: 'Fox ESS EQ series', blurb: 'Compact stackable storage that grows with your household.' },
  { img: '/images/batteries/lg_resu_16h.png', name: 'LG RESU Prime', blurb: 'Proven high-capacity storage from one of the biggest names in batteries.' },
]

function RebateMath() {
  return (
    <section className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Kicker>The federal rebate</Kicker>
          <H2>Around 30% off, applied upfront on your quote.</H2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            The Cheaper Home Batteries Program discounts eligible battery systems
            from 5 to 100 kWh. The discount works through small-scale technology
            certificates (STCs). We claim them for you and take the value
            straight off the installed price. There's no income or means test.
          </p>
          <ul className="mt-7 space-y-4">
            {[
              ['Worth roughly $252 per usable kWh', 'For typical home batteries installed from 1 May 2026, around 30% of installed cost.'],
              ['Full rate up to 14 kWh usable', 'Then a reduced rate from 14–28 kWh and a small contribution up to 50 kWh. Most homes fit inside the full-rate band.'],
              ['Accredited install required', 'Systems must use approved products and an accredited installer to qualify, which is how we install anyway.'],
            ].map(([head, rest]) => (
              <li key={head} className="flex gap-3.5">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-700">
                  <BatteryCharging size={15} />
                </span>
                <p className="text-[15px] leading-relaxed text-slate-600">
                  <strong className="font-bold text-slate-900">{head}</strong>. {rest}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12.5px] leading-relaxed text-slate-400">
            Program settings current at July 2026 and subject to change; discount
            varies with battery model, size and location. Eligibility criteria
            apply, and your written quote shows the exact figure for your system.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="relative overflow-hidden rounded-2xl">
          <Photo
            base="home-night"
            widths={[800, 1400]}
            sizes="(min-width:1024px) 48vw, 100vw"
            alt="Australian home at dusk with lights on, powered by a battery"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1b2e]/85 to-transparent p-7">
            <p className="text-[18px] font-bold leading-snug text-white">
              Store cheap daytime solar. Run your evenings on it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function WhyBattery() {
  const items = [
    { Icon: PlugZap, t: 'Slash the evening peak', s: 'Evening power is the most expensive power. A battery shifts your cheap solar into the hours you actually use it.' },
    { Icon: ShieldCheck, t: 'Backup when it counts', s: 'Backup-capable designs keep essential circuits running through blackouts: fridge, lights, Wi-Fi.' },
    { Icon: Home, t: 'Sized to your home', s: 'We model your usage to size the battery properly: big enough to matter, not bigger than you need.' },
  ]
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Kicker>Why add a battery</Kicker>
          <H2>Make your solar work after sunset.</H2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map(({ Icon, t, s }, i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-[0_10px_36px_rgba(2,8,23,0.08)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-900 text-amber-400">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-[17.5px] font-bold text-slate-900">{t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-500">{s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BatteryProducts() {
  return (
    <section className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Kicker>Batteries we install</Kicker>
          <H2>Proven storage from serious brands.</H2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            We install leading battery systems and match them properly to your
            inverter and switchboard. These are some of the platforms we work with.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {BATTERY_PRODUCTS.map(({ img, name, blurb }, i) => (
            <Reveal key={name} delay={i * 0.06}>
              <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_10px_36px_rgba(2,8,23,0.08)]">
                <div className="grid aspect-[4/3] place-items-center bg-white p-8">
                  <img src={img} alt={name} loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="border-t border-slate-100 p-5">
                  <h3 className="text-[16px] font-bold text-slate-900">{name}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">{blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  ['Am I eligible for the battery rebate?', 'Most owner-occupied homes with a suitable switchboard are. The battery must be an approved product between 5 and 100 kWh installed by an accredited installer. We confirm eligibility as part of your free assessment.'],
  ['Can I add a battery to my existing solar?', 'Usually yes. Depending on your current inverter we’ll quote either an AC-coupled battery that works alongside it, or a hybrid upgrade. Send us your inverter model and we’ll tell you your options.'],
  ['How big a battery do I need?', 'A typical home uses 8–16 kWh overnight. We model your actual usage pattern and size the battery so it fills and empties most days. That’s where the payback is best.'],
  ['Does the battery work during a blackout?', 'Only backup-configured systems do. If blackout protection matters to you, say so, and we’ll design the switchboard side for essential-circuit backup from day one.'],
  ['Can I claim the rebate myself?', 'You never need to. The discount is applied upfront on your invoice and we handle the certificate process behind it.'],
]

export default function Batteries() {
  return (
    <>
      <Meta
        title="Home Batteries with a ~30% Federal Rebate | SkyRa Energy"
        description="Home battery storage installed by one local team. Around 30% off with the federal Cheaper Home Batteries Program. We size the system and handle all rebate paperwork."
      />
      <PageHero
        base="home-night"
        alt="Australian home at dusk running on battery power"
        kicker="Home batteries"
        title="Power your evenings with the sun you banked at noon."
        text="Around 30% off the installed cost of eligible batteries under the federal rebate, designed, installed and configured by one team."
        secondCta="How the rebate works"
        secondTo="/rebates"
        position="object-[50%_60%]"
      />
      <RebateMath />
      <WhyBattery />
      <EnergyStory />
      <BatteryProducts />
      <StepsSection />
      <FaqSection items={FAQS} title="Battery questions, answered." />
      <CtaBand />
      <QuoteSection photoBase="battery-garage" photoAlt="Home battery installed neatly in an Australian garage" />
    </>
  )
}
