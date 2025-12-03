import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: '/mnt/nfs/dist/12815c9b-1b1f-475a-8117-9dd3c0de3230',
    emptyOutDir: true,
  },
})