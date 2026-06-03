import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// On GitHub Pages this project site is served from
// https://zednad.github.io/Skyra-Website/, so production asset URLs must be
// prefixed with that repo sub-path. Local dev (`serve`) stays at root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Skyra-Website/' : '/',
  plugins: [react(), tailwindcss()],
}))
