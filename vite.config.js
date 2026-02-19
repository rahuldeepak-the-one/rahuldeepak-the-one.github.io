import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // IMPORTANT: Set this to '/repo-name/' if deploying to https://username.github.io/repo-name/
  // If deploying to https://username.github.io (user site), leave it as '/'
  base: '/',
})
