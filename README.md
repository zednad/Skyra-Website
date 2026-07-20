# SkyRa Energy — website

Source for [skyraenergy.com.au](https://skyraenergy.com.au/), the website of SkyRa Energy: solar panels, home batteries and inverters, supplied and installed for homes and businesses across Australia.

- Live site: **[https://skyraenergy.com.au](https://skyraenergy.com.au/)**
- Pages: [Solar](https://skyraenergy.com.au/solar) · [Batteries](https://skyraenergy.com.au/batteries) · [Commercial](https://skyraenergy.com.au/commercial) · [Rebates](https://skyraenergy.com.au/rebates) · [FAQ](https://skyraenergy.com.au/faq) · [About](https://skyraenergy.com.au/about) · [Contact](https://skyraenergy.com.au/contact)

## Stack

React 19 + Vite 7 + Tailwind CSS 4, deployed to GitHub Pages via Actions.

Every route is prerendered to static HTML after the Vite build (`scripts/prerender.mjs`): headless Chrome renders the built SPA and the resulting markup — including each page's title, meta description, canonical URL and JSON-LD — is written to `dist` as flat `.html` files that GitHub Pages serves at the clean URLs. The script also generates `sitemap.xml` and a noindex `404.html`.

## Develop

```sh
npm install
npm run dev     # local dev server
npm run build   # production build + prerender into dist/
npm run preview # serve the built site
```
