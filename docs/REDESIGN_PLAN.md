# SkyRa Energy — Website Redesign Plan

> Goal: make skyraenergy.com.au read like an established Australian solar retailer
> (Solahart / Solargain / PSC Energy / 1KOMMA5° class), not a template demo.
> Based on an audit of the current site and structural research of leading AU solar
> websites (July 2026).

---

## 1. Research: what leading Australian solar websites actually do

Sites analysed: **Solahart** (solahart.com.au, 70 yrs, Canstar Blue winner),
**Solargain** (solargain.com.au, 21 yrs, 94k installs), **PSC Energy / Penrith Solar
Centre** (pscenergy.com.au, SunWiz #1 rated), **1KOMMA5° Australia** (1komma5.com/au,
"Australia's #1 battery installer"), plus market context from SolarQuotes, Canstar,
and DCCEEW rebate documentation.

### Patterns shared by every one of them

| Pattern | Solahart | Solargain | PSC Energy | 1KOMMA5° |
|---|---|---|---|---|
| Multi-page site with real nav (not one long page) | ✅ mega menu | ✅ | ✅ | ✅ |
| Phone number in sticky header (click-to-call) | ✅ 1300 | ✅ 1300 | ✅ 02 | ✅ 1300 |
| Hard numbers up top (installs / years / reviews) | 1M+ panels, 70 yrs | 94,916 installs, 21 yrs, 4,600 reviews | "#1 rated" | 50,000+ homes |
| Third-party review integration | Trustpilot | testimonials + count | SolarQuotes badge | 4.6 rating badge |
| Award / accreditation badge wall | Canstar, Tesla certified | Canstar Blue ×4 | Enphase Installer of Year, NETCC, Tesla, Sigenergy | — |
| Government rebate messaging in hero/banner | ✅ "30% off batteries" | ✅ hero carousel is the federal battery rebate | ✅ "Rebates are still here" | ✅ |
| Real photography (installers, roofs, vans, families) | ✅ | ✅ | ✅ | ✅ |
| Brand logo grid (Tesla, Fronius, Trina, Sungrow…) as images | ✅ | ✅ | ✅ (brand pages!) | own products |
| 4-step "how it works" | ✅ | ✅ | ✅ | ✅ |
| Case studies / testimonials with names + suburbs | ✅ | ✅ | ✅ | ✅ |
| Learning centre / blog | ✅ | ✅ 6 posts on homepage | ✅ | ✅ |
| Lead form asking address + bill + system type | ✅ | ✅ | ✅ | ✅ |
| Fat footer: address, ABN, licences, locations by state | ✅ | ✅ | ✅ | ✅ |

### The single biggest content theme right now (2026)

The **federal Cheaper Home Batteries Program**: ~30% off installed battery cost,
expanded in Dec 2025 from $2.3B to **$7.2B**. From 1 May 2026 the discount is worth
roughly **$252 per usable kWh** (full rate up to 14 kWh, tapering above). No means
test. Every competitor leads with this. Solar panels themselves still get the STC
discount. Any serious AU solar site in 2026 has a rebate section and often a whole
rebate page — with "eligibility criteria apply" disclaimers.

### What their photography looks like (the thing that makes them feel "real")

- Installers in **hi-vis + harnesses actually on roofs**, mid-install
- **Branded vans/utes** in suburban driveways
- **Aerial/drone shots** of Australian roofs (Colorbond steel, terracotta tile) fully arrayed
- **Team group shots** in front of the warehouse/van fleet
- **Families / homeowners** at home, at the kitchen bench with the energy app
- **Product-on-wall shots**: battery + inverter neatly mounted in a garage
- Consultation shots: designer + homeowner over a tablet showing the roof layout
- Bright, harsh-ish Australian daylight; blue sky; suburban context (gum trees, timber fences)

---

## 2. Gap analysis: current SkyRa site vs the market

Current: single-page Vite/React app, light glassmorphism aesthetic, framer-motion
everywhere (shimmer headline, drifting blur orbs, magnetic buttons, 3D tilt hero,
cursor-spotlight cards), 3 stock-style photos, text-only "brand marquee", packages
with no prices, no phone number, no address, no reviews, no rebate content.

| Dimension | Market standard | SkyRa today | Severity |
|---|---|---|---|
| Trust signals | Numbers, awards, reviews, licences | Generic chips ("Tier-1 brands only") | 🔴 Critical |
| Rebates | Front and centre, dedicated content | Not mentioned at all | 🔴 Critical |
| Phone / address | Sticky click-to-call, footer NAP | None anywhere | 🔴 Critical |
| Photography | Real installers/vans/homes everywhere | 3 generic roof photos + 2 product shots | 🔴 Critical |
| Site depth | 10–30 pages, SEO-targeted | 1 page | 🟠 High |
| Reviews | Trustpilot/Google embeds, names+suburbs | None (deliberately removed) | 🟠 High |
| Pricing | Indicative "from $X after rebates" packages | kW sizes, no $ | 🟠 High |
| Brand logos | Actual logo images | Plain text marquee | 🟡 Medium |
| Aesthetic | Grounded, photo-led, solid colours | Gradient/glass "AI template" look | 🟡 Medium |

The code itself is healthy (responsive WebP pipeline, reduced-motion support,
working Formspree form, accessibility touches). This is a **content, trust and art
direction** problem more than an engineering one.

---

## 3. Strategy

**Positioning:** "A real local solar company you can call." Every design decision
should push specificity: real numbers, real photos, real suburbs, a real phone
number. Where a fact doesn't exist yet, we leave it out — we never fake it.

**Design direction — "de-vibe-code":**

Remove | Replace with
---|---
Shimmer gradient headline text | Solid ink headline, one accent word in brand blue
Drifting blur orbs / dot grids | Full-bleed photography with simple scrims
Magnetic buttons, 3D tilt, cursor spotlight | One consistent hover style (slight lift + shadow)
Gradient pill buttons everywhere | Solid buttons: amber/orange primary CTA, navy secondary
Glass floating chips over hero | A single stat bar with verified numbers
Text-only brand marquee | Static grid of real brand logo images (greyscale, colour on hover)
2rem+ radii on everything | 12–16px radii; cards feel built, not inflated

**Palette (proposal):** deep navy `#0A1B2E` (headers/footer), brand sky blue
`#0284C7` kept for links/accents, **amber `#F59E0B` → orange `#EA580C` range for
primary CTAs** (solar = warmth; every AU competitor uses a warm CTA), warm
off-white `#FAFAF7` section backgrounds. Typography: keep Manrope (it's good and
already loaded) but drop the extrabold-everywhere habit — extrabold for H1/H2 only,
semibold elsewhere, tighter sizes.

**Motion budget:** keep subtle scroll reveals, the count-up stats, and the
day-to-night EnergyStory scene (it's genuinely differentiating and on-message for
batteries). Everything else goes.

---

## 4. New information architecture

```
skyraenergy.com.au
├── /                     Home
├── /solar                Residential solar panels
├── /batteries            Home batteries  ← rebate landing page, biggest SEO+ads target
├── /commercial           Commercial solar
├── /rebates              Government rebates explained (federal battery, STC, state)
├── /about                About SkyRa (team, story, values, areas served)
├── /contact              Contact + quote form (address, bill, type)
└── (later) /learn        Articles; /reviews; /areas/<suburb> pages
```

**Header (sticky):** logo · Solar · Batteries · Commercial · Rebates · About ·
[phone number with icon] · **Get Free Quote** (amber button).
**Mobile:** hamburger + persistent bottom bar: [Call] [Get Quote].

**Footer (fat, navy):** 4 columns —
1. Logo, one-liner, accreditation badges *(only ones actually held)*
2. Company: About, Contact, Rebates, Reviews
3. Products: Solar, Batteries, Commercial (+ brand names)
4. Contact: phone, email, address, ABN, electrical licence #, hours
Bottom row: © / Privacy / service area line ("Serving …").

---

## 5. Homepage blueprint (section by section)

1. **Hero** — full-bleed photo (P1 below) with dark navy scrim left→transparent.
   H1: *"Solar & battery systems, installed by one local team."*
   Sub: *"Up to 30% off home batteries with the federal rebate — we size the system,
   handle the paperwork and install it ourselves."*
   CTAs: **Get my free quote** (amber) + **Call 1300 XXX XXX** (ghost).
   Under CTAs: 3 verified chips only (e.g. ★ Google rating once it exists, "Free
   on-site assessment", "We handle the rebate paperwork").
2. **Stat bar** — 4 counters on navy: installs completed, kW installed, ★ rating,
   years/postcodes served. `[NEEDS INPUT — real numbers; ship without any we can't prove]`
3. **Rebate banner** — amber tint: "Federal Cheaper Home Batteries Program: ~30% off
   installed battery cost." + "Check your eligibility" → /rebates. Small-print
   disclaimer line.
4. **What we install** — keep the current bento (it's good) but retone: photos P6,
   P2, P8; solid overlay, smaller radii; brand names become logo rows.
5. **Savings calculator** — keep, restyle to match; keep the honesty disclaimer.
6. **Packages** — keep resi/commercial toggle; add indicative pricing
   ("from $X,XXX installed, after rebates") `[NEEDS INPUT — pricing or drop prices]`.
7. **Why SkyRa** — 4 cards, each with a photo (P3, P4, P10, P11), not icons:
   in-house installers (no subcontracting) / tier-1 hardware / rebate paperwork done
   for you / local support after switch-on. Only claims that are true.
8. **EnergyStory day→night** — keep as the battery explainer; swap photo to P17.
9. **How it works** — keep 4 steps, add small photo thumbnails per step.
10. **Testimonials** — real Google/ProductReview quotes with first name + suburb.
    `[NEEDS INPUT — links to real review profiles; do NOT fabricate]`
11. **Brands grid** — logo images: Jinko, Trina, LONGi, Sungrow, Fronius, GoodWe,
    FoxESS, Sigenergy, Tesla (only brands actually supplied).
12. **Service areas** — simple map graphic + suburb/state list. `[NEEDS INPUT]`
13. **FAQ** — expand to 8–10 incl. "How does the battery rebate work?", "Do you use
    subcontractors?", "What warranties apply?" `[NEEDS INPUT — warranty terms]`
14. **Final CTA + quote form** — upgrade to 2-step: step 1 postcode + quarterly bill
    + system type (solar / battery / both), step 2 name + phone + email. Keeps
    Formspree; multi-step lifts completion.
15. **Footer** as §4.

Subpage blueprints (solar/batteries/commercial/rebates/about/contact) follow the
same grammar: photo hero + proof + explainer + FAQ + form. `/batteries` gets the
deepest treatment: rebate maths ($252/usable kWh from 1 May 2026, tapering over
14 kWh), battery brand cards (reuse existing product images), blackout backup
explainer, day/night story.

---

## 6. Trust & compliance rules (unchanged discipline, now with targets)

- Never display an accreditation badge we don't hold. Aspire to and add when real:
  **SAA-accredited installers** (Solar Accreditation Australia — CEC's successor),
  **NETCC Approved Seller**, manufacturer certifications (Tesla / Sigenergy / FoxESS
  installer programs). These are the exact badges competitors show.
- Rebate copy always carries "eligibility criteria apply; discount varies by
  battery size and location" small print. Avoid the word "free".
- No fabricated reviews, install counts or award badges — ACCC actively pursues
  fake testimonials. Sections that need real data ship hidden until data exists.
- AI-generated imagery is used for **atmosphere and illustration** (homes, roofs,
  lifestyle, generic installers). We do **not** present AI people as "our team" or
  AI shots as "our recent install in Parramatta". When real job-site photos become
  available (even phone shots), they progressively replace AI images in
  testimonial/case-study contexts — real beats perfect for trust.

---

## 7. Photography plan — AI generation prompt pack

### Art direction constants (prepend to EVERY prompt)

> **STYLE BLOCK:** Photorealistic commercial photograph for an Australian solar
> company website. Bright natural Australian sunlight, clear blue sky, crisp
> shadows, true-to-life colour, shot on a full-frame DSLR, sharp focus, high
> dynamic range but natural grading (not HDR-look). Australian suburban context.
> No text, no logos, no watermarks, no illustration, no CGI look.

> **NEGATIVE / AVOID (append or put in negative prompt):** cartoon, render,
> illustration, oversaturated, plastic skin, extra fingers, warped panels, text,
> watermark, American-style homes, snow, right-hand-drive-incorrect vehicles.

**Consistency kit** (repeat these exact phrases so shots look like one company):
- Uniform: *"navy blue polo shirt and yellow hi-vis safety vest"*
- Vehicle: *"clean white Toyota HiAce work van"* (logo space left blank — composite
  the SkyRa logo on later in Canva/Figma; AI can't render the wordmark reliably)
- Roof-work realism: *"wearing fall-protection harness"* (signals professionalism)
- Homes: *"contemporary single-storey Australian brick home with Colorbond steel
  roof"* or *"terracotta tiled roof"* — alternate between these two.

Tool notes: prompts below work pasted as-is into **Nano Banana (Gemini)**, **GPT-4o
images**, **Flux**, or **Ideogram**. For **Midjourney** append `--ar <ratio> --style raw`.
Generate 2–4 variants each, pick the least "AI-looking" (check hands, panel grid
lines, roof geometry). Upscale to ≥2000px wide before export.

### Shot list

| # | Slot | AR | Target file |
|---|---|---|---|
| P1 | Homepage hero | 16:9 | `public/images/photos/hero-install.webp` |
| P2 | Bento: solar panels tile | 4:3 | `bento-panels.webp` |
| P3 | Why: in-house installers | 4:5 | `why-team.webp` |
| P4 | Why: quality hardware | 4:5 | `why-hardware.webp` |
| P5 | Branded van in driveway | 16:9 | `van-driveway.webp` |
| P6 | Battery on garage wall | 4:5 | `battery-garage.webp` |
| P7 | Family + energy app | 16:9 | `family-app.webp` |
| P8 | Commercial tile/hero | 16:9 | `commercial-roof.webp` |
| P9 | Team group shot | 16:9 | `team-group.webp` |
| P10 | Consultation at kitchen table | 4:3 | `consult-table.webp` |
| P11 | Hands installing clamp (detail) | 16:9 | `install-detail.webp` |
| P12 | Suburb aerial, many solar roofs | 21:9 | `suburb-aerial.webp` |
| P13 | Night home, lights on (EnergyStory) | 16:9 | `home-night.webp` |
| P14 | Panel macro texture (divider) | 21:9 | `panel-macro.webp` |
| P15 | Happy handover at front door | 4:3 | `handover.webp` |
| P16 | About hero: installer portrait | 3:2 | `about-portrait.webp` |

### The prompts

**P1 — Homepage hero.**
*STYLE BLOCK +* "Wide shot from an elevated angle: two solar installers in navy
blue polo shirts and yellow hi-vis safety vests, wearing fall-protection harnesses,
installing black monocrystalline solar panels on the Colorbond steel roof of a
contemporary single-storey Australian brick home. One kneels aligning a panel, the
other carries a panel toward him. Late-morning summer sun, deep blue sky with one
small white cloud, eucalyptus trees and neighbouring rooftops in the soft-focus
background. Composition leaves the left third of the frame as calm sky/roof space
for headline text." — AR 16:9

**P2 — Solar panels bento tile.**
*STYLE BLOCK +* "Three-quarter drone view of a completed rooftop solar array: 20
sleek all-black solar panels in a neat grid on a terracotta tiled roof of an
Australian family home, clean cabling, midday sun glinting softly off the glass,
green backyard with a timber fence and a jacaranda tree below." — AR 4:3

**P3 — 'Our own installers' card.**
*STYLE BLOCK +* "Portrait of a friendly Australian solar installer in his 30s on a
rooftop, navy polo and yellow hi-vis vest, fall-protection harness, holding a
cordless drill, genuine relaxed smile at camera, solar panels and blue sky behind
him, shallow depth of field." — AR 4:5

**P4 — 'Quality hardware' card.**
*STYLE BLOCK +* "Close-up of an installer's gloved hands connecting the MC4 cable
beneath a black solar panel mounted on aluminium rails, crisp detail of the panel
edge and clamp, roof and sky softly blurred behind." — AR 4:5

**P5 — Van in driveway.**
*STYLE BLOCK +* "A clean white Toyota HiAce work van with blank side panels parked
in the concrete driveway of a modern Australian brick home with a Colorbond roof
covered in solar panels, ladder racks on the van, installer carrying a solar panel
from the van toward the house, morning light, quiet suburban street with gum trees."
— AR 16:9 *(composite SkyRa logo onto the van side afterwards)*

**P6 — Battery on garage wall.**
*STYLE BLOCK +* "A sleek white minimalist home battery unit and matching inverter
neatly wall-mounted in a tidy modern Australian garage, clean conduit runs, soft
daylight from the open roller door, a hint of a family car nose in frame edge.
Generic unbranded appliance design, premium matte finish." — AR 4:5

**P7 — Family + energy app.**
*STYLE BLOCK +* "Warm candid scene: an Australian couple in their late 30s at a
stone kitchen bench in a bright modern home, looking together at a smartphone
showing a colourful home-energy monitoring app with a battery charge graph, morning
sun streaming in, coffee cups, relaxed genuine smiles." — AR 16:9

**P8 — Commercial.**
*STYLE BLOCK +* "Drone photograph of a large commercial warehouse in an Australian
industrial estate, its flat metal roof covered edge-to-edge with hundreds of solar
panels in long neat rows, car park and loading dock below, late afternoon light
raking across the array." — AR 16:9

**P9 — Team group shot.**
*STYLE BLOCK +* "Group photo of a small Australian solar installation team — five
people, mixed ages and genders, in matching navy polo shirts and yellow hi-vis
vests — standing relaxed and smiling in front of a white work van and stacked solar
panels outside a warehouse roller door, golden hour light." — AR 16:9
*(Use as atmosphere only; never captioned as the literal SkyRa staff list.)*

**P10 — Consultation.**
*STYLE BLOCK +* "A solar consultant in a navy polo sits at a kitchen table with an
Australian homeowner couple, pointing at a tablet displaying a rooftop solar layout
design, paperwork and a coffee on the table, bright friendly daylight interior."
— AR 4:3

**P11 — Install detail.**
*STYLE BLOCK +* "Macro-ish detail shot: torque wrench tightening a mid-clamp
between two black solar panels on silver mounting rails, textured Colorbond roof
surface, strong directional sunlight creating crisp highlights." — AR 16:9

**P12 — Suburb aerial (CTA background).**
*STYLE BLOCK +* "High drone view over an Australian suburb at golden hour: dozens
of rooftops, many fitted with solar arrays catching low warm light, tree-lined
streets, long soft shadows, slight haze on the horizon." — AR 21:9

**P13 — Night home (EnergyStory).**
*STYLE BLOCK, but night +* "The same style of contemporary Australian home with
rooftop solar photographed at dusk turning to night: warm interior lights glowing
through the windows, deep blue sky with first stars, a soft porch light, panels
faintly reflecting the last light — cosy, secure feeling." — AR 16:9

**P14 — Panel macro (divider strip).**
*STYLE BLOCK +* "Extreme close-up of a monocrystalline solar cell surface: dark
blue-black silicon with fine silver busbar lines, sun flare kissing the top edge,
abstract and premium." — AR 21:9

**P15 — Handover.**
*STYLE BLOCK +* "At the front door of an Australian brick home, an installer in
navy polo and hi-vis hands a folder of documents to a smiling homeowner in her 40s,
solar panels visible on the roofline above, bright cheerful daylight." — AR 4:3

**P16 — About page hero.**
*STYLE BLOCK +* "Environmental portrait: a solar installer standing beside his
white work van at sunrise, arms crossed, warm confident expression, ladder and
panels visible, soft golden light, Australian suburban street." — AR 3:2

**OG / social share image:** crop P1 to 1200×630 and overlay logo + "Solar &
batteries, installed by one local team" in the composite step (replaces
`public/og-image.jpg`).

### Post-processing pipeline (once you paste the outputs back to me)

1. I'll crop/resize each to its slots and generate responsive renditions
   (640/960/1280/1600/1920 as appropriate), convert to WebP (existing site
   pattern), and wire the `srcset`s.
2. Logo composites (van, OG image) need the logo PNG/SVG — supply or I'll use
   `src/assets/skyra-logo.webp`.

---

## 8. Technical plan

- **Routing:** add `react-router-dom`; GitHub Pages SPA fallback via `404.html`
  copy of `index.html` + redirect script; scroll-to-top on route change; tiny
  `<Meta>` helper for per-page title/description/OG.
- **SEO:** `sitemap.xml`, `robots.txt`, `LocalBusiness` + `Service` JSON-LD
  (needs NAP data), descriptive alts, per-page H1s targeting "solar installer
  <area>", "home battery rebate <state>".
- **Cleanup:** remove `three`, `@react-three/fiber`, `@react-three/drei` if the
  design-exploration files are the only consumers (they're not routed) — smaller
  installs and builds. Archive `src/design-exploration/` and the old unused
  components (`Hero.jsx`, `Products.jsx`, etc. superseded by `RecommendedHomepage`).
- **Forms:** keep Formspree; 2-step quote form component; add `tel:` links with
  click tracking.
- **Analytics:** add Plausible or GA4 `[NEEDS INPUT — preference]`; track quote
  submits + phone clicks as conversions.
- **Perf:** keep preload/LCP pattern for the new hero; lazy-load everything below
  the fold; logos as single sprite or optimised SVGs.
- Local note: **Node.js isn't installed on this machine** — install Node 20+ (e.g.
  `brew install node`) to run `npm run dev` locally; CI deploys regardless.

## 9. Build order

| Phase | Scope | Depends on |
|---|---|---|
| **0. Inputs** | You: generate P1–P16, answer the input list below | — |
| **1. Reskin homepage** | New palette/typography, kill vibe-code effects, hero + stat bar + rebate banner + retoned sections, new photos, logo grid, 2-step form, footer with NAP | Photos, phone no. |
| **2. Pages** | Router + /batteries, /solar, /commercial, /rebates, /about, /contact + SEO plumbing | Phase 1 |
| **3. Proof layer** | Real reviews embed, testimonials, case studies, service-area pages, learning articles | Real data as it accumulates |

## 10. What I need from you (`[NEEDS INPUT]` roll-up)

1. **Phone number** to publish (1300/mobile) — the single highest-impact item.
2. Business facts: ABN, registered address/base suburb, electrical licence #,
   service areas (states/regions), operating hours.
3. Real numbers you can prove: installs completed, years operating, review profile
   links (Google Business / ProductReview) — or confirm we ship without them for now.
4. Accreditations actually held (SAA installers? NETCC? brand certifications?) — I'll
   only badge what's real.
5. Package pricing: publish "from $X after rebates" figures, or keep sizes-only?
6. Exact brand list you supply (panels / batteries / inverters) so the logo grid is honest.
7. The 16 generated photos (paste outputs back in any batch order).
8. Analytics preference (GA4 vs Plausible vs none).
