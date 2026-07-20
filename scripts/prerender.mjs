// ─────────────────────────────────────────────────────────────────────────────
//  Post-build prerender: renders every route of the built SPA in headless
//  Chrome and writes the resulting HTML to dist as flat files (dist/solar.html
//  is served at /solar by GitHub Pages), so crawlers get a 200 status and the
//  full per-page <head> (title, description, canonical, JSON-LD) plus body
//  content without executing JavaScript. Also generates dist/sitemap.xml and
//  a real noindex dist/404.html.
//
//  Runs via `npm run build`. In CI, PUPPETEER_EXECUTABLE_PATH points at the
//  runner's system Chrome (see .github/workflows/deploy.yml).
// ─────────────────────────────────────────────────────────────────────────────
import { preview } from 'vite'
import puppeteer from 'puppeteer'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE_URL = 'https://skyraenergy.com.au'

// Route table: keep in sync with src/App.jsx.
const ROUTES = ['/', '/solar', '/batteries', '/commercial', '/rebates', '/faq', '/about', '/contact']

// Sentinel path rendered to capture the NotFound page (noindex) as 404.html.
const NOT_FOUND_PATH = '/__not-found__'

const outFile = (route) =>
  route === '/' ? 'index.html' : route === NOT_FOUND_PATH ? '404.html' : `${route.slice(1)}.html`

const server = await preview({ preview: { port: 4173, strictPort: true, open: false } })
const origin = server.resolvedUrls.local[0].replace(/\/$/, '')

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] })
const page = await browser.newPage()
await page.setViewport({ width: 1366, height: 900 })

const captured = new Map()

for (const route of [...ROUTES, NOT_FOUND_PATH]) {
  await page.goto(origin + route, { waitUntil: 'networkidle2', timeout: 60_000 })
  // The app sets title/canonical/JSON-LD in effects after mount; wait for the
  // route's own title (every page title contains the brand or "not found").
  await page.waitForSelector('h1', { timeout: 15_000 })
  await page.waitForFunction(() => /SkyRa|not found/i.test(document.title), { timeout: 15_000 })

  // Let entrance animations finish (longest stagger chain is ~1.2s), then
  // freeze the snapshot fully visible. Two cases both leave opacity:0 in the
  // serialized inline styles: below-fold whileInView reveals that never
  // triggered, and WAAPI-driven opacity tweens (framer runs those off the
  // inline style, committing the final value only when they finish). Crawlers
  // should see plain visible content; React re-renders on load so the live
  // site still animates as designed.
  await new Promise((r) => setTimeout(r, 1600))
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('[style*="opacity"]')) {
      if (el.style.opacity === '0' || getComputedStyle(el).opacity === '0') {
        el.style.opacity = '1'
        el.style.transform = 'none'
      }
    }
  })

  captured.set(route, await page.content())
}

await browser.close()

// Write only after every capture: overwriting dist/index.html mid-run would
// change the SPA fallback shell that later routes boot from, leaking the Home
// page's head tags into their snapshots.
for (const [route, html] of captured) {
  writeFileSync(resolve('dist', outFile(route)), html)
  console.log(`prerendered ${route} -> dist/${outFile(route)}`)
}
await new Promise((done) => server.httpServer.close(done))

// Sitemap generated from the same route table so it can never go stale.
const today = new Date().toISOString().slice(0, 10)
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  ROUTES.map(
    (r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`,
  ).join('\n') +
  '\n</urlset>\n'
writeFileSync(resolve('dist', 'sitemap.xml'), sitemap)
console.log(`generated dist/sitemap.xml (${ROUTES.length} urls, lastmod ${today})`)
