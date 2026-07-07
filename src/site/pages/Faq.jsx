// /faq - every question from across the site on one crawlable page, grouped
// by topic. Answers live in faqData.js; this page adds a combined FAQPage
// schema so search engines see the full set in one place.
import { useState } from 'react'
import {
  BATTERY_FAQS, COMMERCIAL_FAQS, GENERAL_FAQS, REBATE_FAQS, SOLAR_FAQS,
} from '../faqData'
import { FaqItem } from '../sections'
import { CtaLink, JsonLd, Kicker, Meta, Reveal } from '../shared'

const GROUPS = [
  ['Getting started', GENERAL_FAQS],
  ['Solar panels', SOLAR_FAQS],
  ['Home batteries', BATTERY_FAQS],
  ['Commercial systems', COMMERCIAL_FAQS],
  ['Rebates & incentives', REBATE_FAQS],
]

const ALL_FAQS = GROUPS.flatMap(([, items]) => items)

function Group({ heading, items }) {
  const [open, setOpen] = useState(-1)
  return (
    <Reveal>
      <h2 className="text-[22px] font-extrabold tracking-tight text-slate-900 sm:text-[26px]">
        {heading}
      </h2>
      <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 shadow-card sm:px-7">
        {items.map(([q, a], i) => (
          <FaqItem key={q} q={q} a={a} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </Reveal>
  )
}

export default function Faq() {
  return (
    <>
      <Meta
        title="Solar & Battery FAQs | SkyRa Energy"
        description="Straight answers on solar panels, home batteries, commercial systems and Australian rebates: sizing, eligibility, blackout backup, warranties and installation."
      />
      <JsonLd
        id="ld-faq"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: ALL_FAQS.map(([q, a]) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }}
      />
      <section className="bg-[#faf9f7] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Kicker>FAQ</Kicker>
            <h1 className="mt-3 text-[clamp(30px,4.4vw,50px)] font-extrabold leading-[1.06] tracking-tight text-slate-900">
              Every question, answered straight.
            </h1>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-600">
              Everything we get asked about solar, batteries, commercial systems
              and the rebates, in one place. Can't find your question? Ask us
              directly, no pressure and no obligation.
            </p>
          </Reveal>
          <div className="mt-10 space-y-12">
            {GROUPS.map(([heading, items]) => (
              <Group key={heading} heading={heading} items={items} />
            ))}
          </div>
          <Reveal className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-[#0a1b2e] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-[20px] font-extrabold tracking-tight text-white">Still unsure about something?</h2>
              <p className="mt-1 text-[14.5px] text-slate-300">
                Send it through with your quote request and we'll answer it in writing.
              </p>
            </div>
            <CtaLink to="/contact" className="shrink-0">Ask a question</CtaLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
