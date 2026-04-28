import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  },
  optimizeDeps: {
    include: ['vanta/dist/vanta.globe.min'],
  },
})
