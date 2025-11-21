import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: '/mnt/nfs/dist/67d4a1dc-41f4-4996-8942-b121333c24d9',
    emptyOutDir: true,
  },
})