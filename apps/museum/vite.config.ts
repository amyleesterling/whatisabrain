import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Museum experience, served under whatisabrain.com/museum/ (paths prefixed).
// In dev (npm run dev) we still want '/' so the preview works.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/museum/' : '/',
  plugins: [react(), tailwindcss()],
}))
