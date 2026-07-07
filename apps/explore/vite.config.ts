import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Inner Cosmos experience, served under whatisabrain.com/explore/ (paths
// prefixed). In dev (npm run dev) we still want '/' so the preview works.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/explore/' : '/',
  plugins: [react(), tailwindcss()],
}))
