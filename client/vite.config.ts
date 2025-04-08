import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/register': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/game': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/user': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/customquestions': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
