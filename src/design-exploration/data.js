// ─────────────────────────────────────────────────────────────────────────────
//  SkyRa Energy — Design Exploration data
//  Synthesised from Mobbin research across 8 core flows of a solar/battery
//  sales website. Reference links point to the exact Mobbin screens reviewed.
// ─────────────────────────────────────────────────────────────────────────────

export const PALETTE = [
  { name: 'Sky',        hex: '#0284C7', role: 'Primary brand / links',    on: '#FFFFFF' },
  { name: 'Sky Light',  hex: '#38BDF8', role: 'Accents / glow',            on: '#06243A' },
  { name: 'Sky Pale',   hex: '#BAE6FD', role: 'Tints / surfaces',         on: '#06243A' },
  { name: 'Deep Navy',  hex: '#0C1A2E', role: 'Hero / dark sections',     on: '#E5F0FB' },
  { name: 'Slate',      hex: '#334155', role: 'Body copy',                on: '#FFFFFF' },
  { name: 'Amber',      hex: '#F59E0B', role: 'Energy / highlights',      on: '#3A2606' },
  { name: 'Cloud',      hex: '#F1F5F9', role: 'Light backgrounds',        on: '#0C1A2E' },
  { name: 'White',      hex: '#FFFFFF', role: 'Cards / base',             on: '#0C1A2E' },
]

export const KEYWORDS = [
  'Trustworthy', 'Premium', 'Sunlit', 'Effortless', 'Australian',
  'Future-ready', 'Transparent', 'Calm', 'Engineered', 'Optimistic',
]

// The 8 core flows of the site, each mapped to real Mobbin references.
export const FLOWS = [
  {
    n: '01',
    title: 'Hero & Landing',
    tag: 'Awareness',
    insight:
      'Big confident headline over a real rooftop photo, a vivid sky-to-blue gradient, and one primary CTA (“Get free quote”) anchored by a glass stat card. Let the savings number be the hook.',
    apps: [
      { name: 'SeatGeek', url: 'https://mobbin.com/screens/4cd74bb4-2d89-44cd-9781-fcefa5457b21' },
      { name: 'Squarespace', url: 'https://mobbin.com/screens/4e4af3e5-b912-47e7-a73b-83e6dddf26f7' },
    ],
  },
  {
    n: '02',
    title: 'Product Detail',
    tag: 'Consideration',
    insight:
      'A sticky “buy box” beside clean technical specs (panel wattage, inverter, warranty) plus an embedded “Get my quote” hook — like Hers’ quiz card — so spec-readers convert without leaving the page.',
    apps: [
      { name: 'Stripe', url: 'https://mobbin.com/screens/da4c93de-5575-4fc0-8fce-2a2cc7c0646e' },
      { name: 'Hers', url: 'https://mobbin.com/screens/56038a68-7a87-4975-86dd-089ad80e8335' },
      { name: 'Shopify', url: 'https://mobbin.com/screens/e672eb7e-b3c6-447b-9794-f5f421016e31' },
      { name: 'The New Yorker', url: 'https://mobbin.com/screens/8b48cc6c-dc84-46a1-bdb0-384296c6ec2a' },
    ],
  },
  {
    n: '03',
    title: 'Catalog & Brands',
    tag: 'Discovery',
    insight:
      'A filterable grid of panel & battery brands with bestseller badges, “save to wishlist”, and quick-compare. Faire’s wholesale gallery is the template for browsing by brand and output.',
    apps: [
      { name: 'Faire', url: 'https://mobbin.com/screens/4d4af6ca-f833-4660-af77-080194eb29de' },
      { name: 'Shopify', url: 'https://mobbin.com/screens/e672eb7e-b3c6-447b-9794-f5f421016e31' },
    ],
  },
  {
    n: '04',
    title: 'Quote & Lead Capture',
    tag: 'Conversion',
    insight:
      'A multi-step flow with a clear progress indicator, one question per step, big tappable choice chips, and a social-proof rail (“Trusted by 500,000+”). Bonsai + Mercury show split layout and sidebar steppers.',
    apps: [
      { name: 'Bonsai', url: 'https://mobbin.com/screens/8f27c716-f3d9-4052-808c-6ba96dac7d58' },
      { name: 'Mercury', url: 'https://mobbin.com/screens/8b12e7b5-4bd6-4eea-9a61-7ebbcfa4f855' },
      { name: 'Hex', url: 'https://mobbin.com/screens/c8126bf1-d8a2-4fff-9c3b-23f9e717a2c4' },
      { name: 'Arcade', url: 'https://mobbin.com/screens/a7045f94-a2a0-4186-82ca-4bef1bbd0d72' },
      { name: 'Melio', url: 'https://mobbin.com/screens/03ef6cc6-505c-4277-bfe2-b0c068a141c1' },
    ],
  },
  {
    n: '05',
    title: 'Pricing & Packages',
    tag: 'Decision',
    insight:
      'Three system tiers with a highlighted “Most popular” card, a residential/commercial toggle, and a feature checklist. HubSpot & Eventbrite nail the recommended-tier emphasis and compare table.',
    apps: [
      { name: 'HubSpot', url: 'https://mobbin.com/screens/103c8885-f058-4d21-8b62-ecf0a5f5000a' },
      { name: 'Eventbrite', url: 'https://mobbin.com/screens/d5473924-d215-4701-9c35-0ade23a4de53' },
      { name: 'OpenTable', url: 'https://mobbin.com/screens/36c5d9d4-6b3c-48be-a862-204b845e47ca' },
      { name: 'ElevenLabs', url: 'https://mobbin.com/screens/2d0a7446-766e-4b69-8947-d1de09836492' },
    ],
  },
  {
    n: '06',
    title: 'How It Works',
    tag: 'Trust',
    insight:
      'Four numbered steps with simple line icons and short copy (Survey → Design → Install → Switch on). HODINKEE’s “How It Works” row is the clean, scannable benchmark.',
    apps: [
      { name: 'HODINKEE', url: 'https://mobbin.com/screens/b9f871a1-f428-4fdd-ba8e-23e4dd4564ff' },
      { name: 'Sana AI', url: 'https://mobbin.com/screens/0e3294a6-e6b9-4d3a-acbd-3d8f3c69119a' },
    ],
  },
  {
    n: '07',
    title: 'Book a Consultation',
    tag: 'Conversion',
    insight:
      'A split calendar with a scrollable time-slot list, visit duration and timezone — so a homeowner can book a free site assessment in seconds. Bonsai & Braintrust show the pattern cleanly.',
    apps: [
      { name: 'Bonsai', url: 'https://mobbin.com/screens/cf7017df-f48d-4014-83d3-9537733997a2' },
      { name: 'Braintrust', url: 'https://mobbin.com/screens/1c22e358-c09d-4b64-8ef5-c4925dd53643' },
      { name: 'Acuity', url: 'https://mobbin.com/screens/9c213f79-6120-4839-982f-97416d003309' },
    ],
  },
  {
    n: '08',
    title: 'Energy Dashboard',
    tag: 'Retention',
    insight:
      'Post-install: KPI tiles (kWh generated, $ saved, CO₂ avoided) with a time-series chart and date filters. Databricks’ dashboards show calm data-viz that keeps owners engaged.',
    apps: [
      { name: 'Databricks', url: 'https://mobbin.com/screens/b511681e-bc44-48ea-9059-5a93a5d5e560' },
    ],
  },
]

export const PRINCIPLES = [
  {
    title: 'Lead with the saving',
    body: 'Money, not megawatts. Every hero, card and CTA frames solar as a bill cut and a rebate — the kWh detail comes second.',
  },
  {
    title: 'Show the tech, simply',
    body: 'Tier-1 panels, inverters and warranties shown as clean spec rows with icons — credible to researchers, calm to everyone else.',
  },
  {
    title: 'Australian & accredited',
    body: 'CEC-accredited badges, local rebates (VIC Solar Homes), real installs and ABN trust signals carried throughout.',
  },
  {
    title: 'One clear next step',
    body: 'A single primary action per screen — “Get free quote” or “Book assessment” — never competing CTAs.',
  },
  {
    title: 'Calm, sunlit, premium',
    body: 'Generous space, soft sky gradients and glassmorphism. Confidence through restraint, not noise.',
  },
]

// Metadata for the 10 UI directions (mockups are rendered as components).
export const DIRECTIONS = [
  { n: '01', title: 'Savings-led Hero',        tag: 'Landing',     note: 'Headline + glass stat + single CTA over a sky gradient.' },
  { n: '02', title: 'Brand Catalog Grid',      tag: 'Discovery',   note: 'Browse panels & batteries by brand with bestseller badges.' },
  { n: '03', title: 'Product Detail + Quote',  tag: 'Consideration', note: 'Specs beside a sticky buy box with an inline quote hook.' },
  { n: '04', title: 'Savings Calculator',      tag: 'Interactive', note: 'Slider-driven bill estimate with live payback.' },
  { n: '05', title: 'Multi-step Lead Capture', tag: 'Conversion',  note: 'Progress stepper, choice chips, social-proof rail.' },
  { n: '06', title: 'Packages & Pricing',      tag: 'Decision',    note: 'Residential/commercial toggle, highlighted popular tier.' },
  { n: '07', title: 'How It Works',            tag: 'Trust',       note: 'Four numbered steps from survey to switch-on.' },
  { n: '08', title: 'Reviews & Trust',         tag: 'Social proof', note: 'Star ratings, customer quotes, accreditation logos.' },
  { n: '09', title: 'Book an Assessment',      tag: 'Conversion',  note: 'Calendar with time-slot list and visit duration.' },
  { n: '10', title: 'Owner Dashboard',         tag: 'Retention',   note: 'Post-install KPIs: generation, savings, CO₂.' },
]
