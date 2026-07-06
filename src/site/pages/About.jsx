// /about - the SkyRa story. Copy stays honest: no invented history, counts
// or credentials (plan §6); photos are atmosphere, not captioned as staff.
import { HeartHandshake, Ruler, ShieldCheck, Truck } from 'lucide-react'
import PageHero from '../PageHero'
import { CtaBand, QuoteSection } from '../sections'
import { H2, Kicker, Meta, Photo, Reveal } from '../shared'

function Story() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Kicker>Our story</Kicker>
          <H2>Started because quotes shouldn't need a translator.</H2>
          <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-slate-600">
            <p>
              SkyRa exists because buying solar in Australia had become
              confusing on purpose: inflated "discounts", mystery hardware,
              and a different subcontractor at every step.
            </p>
            <p>
              We do it differently: one team that assesses your home, designs
              the system, applies every rebate you're entitled to, and installs
              it properly. Plain numbers, named hardware, no pressure tactics.
            </p>
            <p>
              Solar panels, batteries and inverters for homes and businesses,
              supplied and installed across Australia.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="overflow-hidden rounded-2xl">
          <Photo
            base="team-group"
            widths={[800, 1400]}
            sizes="(min-width:1024px) 48vw, 100vw"
            alt="Solar installation crew at golden hour in front of a work van"
            className="h-full w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  )
}

function Values() {
  const items = [
    { Icon: Ruler, t: 'Design before discounts', s: 'The right system beats the cheap system. Everything starts from your roof and your usage data.' },
    { Icon: ShieldCheck, t: 'Hardware we’d put on our own roof', s: 'Tier-1 panels and proven inverters and batteries with real Australian support behind them.' },
    { Icon: Truck, t: 'One accountable team', s: 'Quote, design, paperwork, install, handover: one crew owns the whole job, so nothing is “someone else’s problem”.' },
    { Icon: HeartHandshake, t: 'Straight answers', s: 'If solar or a battery doesn’t stack up for your place yet, we’ll tell you that too.' },
  ]
  return (
    <section className="bg-[#faf9f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <Kicker>How we work</Kicker>
          <H2>The rules we don't break.</H2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, t, s }, i) => (
            <Reveal key={t} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-amber-400">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-[16px] font-bold text-slate-900">{t}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">{s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function PhotoRow() {
  return (
    <section className="bg-white px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
        {[
          ['van-driveway', 'Work van and installer delivering panels to a home', 'sm:col-span-2'],
          ['about-portrait', 'Solar installer at sunrise beside his van', ''],
          ['handover', 'Installer and homeowner at the front door', ''],
          ['bento-panels', 'Finished all-black solar array on a tiled roof', 'sm:col-span-2'],
        ].map(([base, alt, span]) => (
          <div key={base} className={'overflow-hidden rounded-2xl ' + span}>
            <Photo
              base={base}
              widths={base === 'about-portrait' || base === 'handover' ? [640, 1100] : [800, 1400]}
              sizes="(min-width:640px) 33vw, 100vw"
              alt={alt}
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04]"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <Meta
        title="About SkyRa Energy | One Team, Whole System"
        description="SkyRa designs, supplies and installs solar and battery systems as one accountable team: plain numbers, named hardware, and rebate paperwork handled."
      />
      <PageHero
        base="about-portrait"
        alt="Solar installer at sunrise beside his work van"
        kicker="About SkyRa"
        title="One team, from first look to switch-on."
        text="We design, supply and install the whole system ourselves, and we give you numbers you can hold us to."
        position="object-[70%_30%]"
      />
      <Story />
      <Values />
      <PhotoRow />
      <CtaBand />
      <QuoteSection />
    </>
  )
}
