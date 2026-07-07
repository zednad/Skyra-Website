// ─────────────────────────────────────────────────────────────────────────────
//  Two-step quote form. Step 1 is zero-friction (postcode, bill band, system
//  type), step 2 collects contact details; everything posts to Formspree in a
//  single submission at the end. Honeypot retained for basic spam protection.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { BTN, EASE, FORMSPREE_ENDPOINT } from './shared'

const fieldCls =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14.5px] text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:border-amber-400 focus:bg-white focus:ring-[3px] focus:ring-amber-400/20'

const INTERESTS = ['Solar panels', 'Home battery', 'Solar + battery', 'Commercial']
const BILLS = ['Under $300', '$300 – $600', '$600 – $900', '$900+']

/* Success tick: circle pops, then the check draws itself on. */
function SuccessMark() {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-500 text-slate-950">
        <Check size={26} strokeWidth={3} />
      </div>
    )
  }
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-500 shadow-cta"
    >
      <svg viewBox="0 0 52 52" className="h-7 w-7" fill="none" aria-hidden="true">
        <motion.path
          d="M14 27.5l8 8L38 19"
          stroke="#0a1b2e"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.15, duration: 0.4, ease: EASE }}
        />
      </svg>
    </motion.div>
  )
}

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
      setError('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card sm:p-10"
      >
        <SuccessMark />
        <h3 className="mt-5 text-[22px] font-extrabold tracking-tight text-slate-900">Request received</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
          Thanks. A SkyRa specialist will be in touch shortly to arrange your
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
      className={'rounded-2xl border border-slate-200 bg-white shadow-card ' + (compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8')}
    >
      {/* progress */}
      <div className="flex items-center justify-between">
        <div className="text-[17px] font-bold text-slate-900">Get your free quote</div>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[1, 2].map((s) => (
            <motion.span
              key={s}
              animate={{ width: s <= step ? 24 : 12, backgroundColor: s <= step ? '#f59e0b' : '#e2e8f0' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>
      </div>
      {/* enter-only label swap keyed by step (no AnimatePresence by design) */}
      <motion.p
        key={step}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="mt-1 text-[13px] text-slate-400"
      >
        {step === 1 ? 'Step 1 of 2: about your place' : 'Step 2 of 2: where to send it'}
      </motion.p>

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
                      'min-h-11 rounded-xl px-3 py-3 text-[13.5px] font-semibold transition-all duration-200 ' +
                      (lead.interest === label
                        ? 'bg-slate-900 text-white shadow-card ring-2 ring-slate-900/15'
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
                <label htmlFor="qf-bill" className="mb-2 block whitespace-nowrap text-[13px] font-semibold text-slate-600">
                  Quarterly bill <span className="hidden font-normal text-slate-400 sm:inline">(optional)</span>
                </label>
                <select
                  id="qf-bill"
                  value={lead.bill}
                  onChange={(e) => updateLead('bill', e.target.value)}
                  className={fieldCls + ' appearance-none ' + (lead.bill === '' ? 'text-slate-400' : '')}
                >
                  <option value="">Optional…</option>
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
              className={'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] disabled:pointer-events-none disabled:opacity-40 ' + BTN.primary}
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
                className={'inline-flex items-center gap-1.5 rounded-xl px-4 py-3.5 text-[14px] text-slate-600 ' + BTN.outline}
              >
                <ArrowLeft size={15} /> Back
              </button>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={'flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] disabled:pointer-events-none disabled:opacity-60 ' + BTN.primary}
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
