// ─────────────────────────────────────────────────────────────────────────────
//  Two-step quote form. Step 1 is zero-friction (postcode, bill band, system
//  type), step 2 collects contact details; everything posts to Formspree in a
//  single submission at the end. Honeypot retained for basic spam protection.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { EASE, FORMSPREE_ENDPOINT } from './shared'

const fieldCls =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14.5px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100'

const INTERESTS = ['Solar panels', 'Home battery', 'Solar + battery', 'Commercial']
const BILLS = ['Under $300', '$300 – $600', '$600 – $900', '$900+']

export default function QuoteForm({ compact = false }) {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')
  const [lead, setLead] = useState({ postcode: '', bill: '', interest: '' })

  function updateLead(key, value) {
    setLead((l) => ({ ...l, [key]: value }))
  }

  const step1Valid = /^\d{4}$/.test(lead.postcode) && lead.interest !== ''

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('submitting')
    setError('')
    try {
      const data = new FormData(form)
      data.set('postcode', lead.postcode)
      data.set('quarterly_bill', lead.bill || 'Not provided')
      data.set('interested_in', lead.interest)
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const json = await res.json().catch(() => null)
        setError(json?.errors?.map((x) => x.message).join(', ') || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setError('Network error — please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10"
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-500 text-slate-950">
          <Check size={26} strokeWidth={3} />
        </div>
        <h3 className="mt-5 text-[22px] font-extrabold tracking-tight text-slate-900">Request received</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
          Thanks — a SkyRa specialist will be in touch shortly to arrange your
          free, no-obligation quote.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setStep(1)
            setLead({ postcode: '', bill: '', interest: '' })
          }}
          className="mt-6 text-[14px] font-semibold text-amber-700 transition-colors hover:text-amber-800"
        >
          Submit another request
        </button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={'rounded-2xl border border-slate-200 bg-white shadow-sm ' + (compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8')}
    >
      {/* progress */}
      <div className="flex items-center justify-between">
        <div className="text-[17px] font-bold text-slate-900">Get your free quote</div>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[1, 2].map((s) => (
            <span
              key={s}
              className={
                'h-1.5 rounded-full transition-all ' +
                (s <= step ? 'w-6 bg-amber-500' : 'w-3 bg-slate-200')
              }
            />
          ))}
        </div>
      </div>
      <p className="mt-1 text-[13px] text-slate-400">
        {step === 1 ? 'Step 1 of 2 — about your place' : 'Step 2 of 2 — where to send it'}
      </p>

      {/* honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="_subject" value="New SkyRa quote request" />

      {step === 1 ? (
          <motion.div
            key="s1"
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="mt-5 space-y-4"
          >
            <div>
              <label htmlFor="qf-interest" className="mb-2 block text-[13px] font-semibold text-slate-600">
                I'm interested in
              </label>
              <div id="qf-interest" role="radiogroup" className="grid grid-cols-2 gap-2">
                {INTERESTS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    role="radio"
                    aria-checked={lead.interest === label}
                    onClick={() => updateLead('interest', label)}
                    className={
                      'rounded-xl px-3 py-3 text-[13.5px] font-semibold transition-colors ' +
                      (lead.interest === label
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300')
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="qf-postcode" className="mb-2 block text-[13px] font-semibold text-slate-600">
                  Postcode
                </label>
                <input
                  id="qf-postcode"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="e.g. 2150"
                  value={lead.postcode}
                  onChange={(e) => updateLead('postcode', e.target.value.replace(/\D/g, ''))}
                  className={fieldCls}
                />
              </div>
              <div>
                <label htmlFor="qf-bill" className="mb-2 block text-[13px] font-semibold text-slate-600">
                  Quarterly bill <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <select
                  id="qf-bill"
                  value={lead.bill}
                  onChange={(e) => updateLead('bill', e.target.value)}
                  className={fieldCls + ' appearance-none ' + (lead.bill === '' ? 'text-slate-400' : '')}
                >
                  <option value="">Select…</option>
                  {BILLS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              disabled={!step1Valid}
              onClick={() => setStep(2)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-[15px] font-bold text-slate-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight size={17} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="mt-5 space-y-4"
          >
            <div>
              <label htmlFor="qf-name" className="sr-only">Full name</label>
              <input id="qf-name" name="name" type="text" required autoComplete="name" placeholder="Full name" className={fieldCls} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="qf-email" className="sr-only">Email</label>
                <input id="qf-email" name="email" type="email" required autoComplete="email" placeholder="Email" className={fieldCls} />
              </div>
              <div>
                <label htmlFor="qf-phone" className="sr-only">Phone</label>
                <input id="qf-phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" className={fieldCls} />
              </div>
            </div>
            <div>
              <label htmlFor="qf-message" className="sr-only">Anything else?</label>
              <textarea id="qf-message" name="message" rows={compact ? 2 : 3} placeholder="Anything else we should know? (optional)" className={fieldCls + ' resize-none'} />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-3.5 text-[14px] font-semibold text-slate-600 transition-colors hover:bg-slate-50"
              >
                <ArrowLeft size={15} /> Back
              </button>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-[15px] font-bold text-slate-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting'
                  ? (<><Loader2 size={17} className="animate-spin" /> Sending…</>)
                  : (<>Request my quote <ArrowRight size={17} /></>)}
              </button>
            </div>
            {status === 'error' && (
              <p role="alert" className="text-center text-[13px] font-medium text-red-600">{error}</p>
            )}
          </motion.div>
        )}

      <p className="mt-4 text-center text-[12px] text-slate-400">
        Free and no-obligation. We never share your details.
      </p>
    </form>
  )
}
