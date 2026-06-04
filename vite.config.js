import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from the custom apex domain https://skyraenergy.com.au/ via GitHub
// Pages — i.e. at the site root, so base is '/' (Vite's default). The CNAME
// file in public/ keeps the custom domain attached across Actions deployments.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
