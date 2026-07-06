import { CtaLink, Meta } from '../shared'

export default function NotFound() {
  return (
    <>
      <Meta title="Page not found | SkyRa Energy" description="That page doesn't exist." noindex />
      <section className="grid min-h-[55svh] place-items-center bg-[#faf9f7] px-4 py-24 text-center">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-amber-700">404</p>
          <h1 className="mt-3 text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight text-slate-900">
            That page has gone off-grid.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15.5px] text-slate-600">
            The link may be old or mistyped. Head back home or grab a free quote instead.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <CtaLink to="/">Back to home</CtaLink>
          </div>
        </div>
      </section>
    </>
  )
}
