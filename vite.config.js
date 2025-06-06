import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  preview: {
    port: 8080,
    allowedHosts: ['s2sb-quiz-s2edt.ondigitalocean.app','www.scalecheck.co','scalecheck.co']
  }, // FOR DEV
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: ['.ngrok-free.app'],
  },
})
