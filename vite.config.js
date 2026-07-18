import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub repo name so asset paths resolve on GitHub Pages
// (project site served from https://<user>.github.io/BacheloretteLookbook/).
export default defineConfig({
  base: '/BacheloretteLookbook/',
  plugins: [react()],
})
