import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  esbuild: mode === 'production' ? { drop: ['console', 'debugger'] } : {},
  plugins: [react()],
}))
