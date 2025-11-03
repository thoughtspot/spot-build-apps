import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/bec3fdf8-1c22-4f4d-839e-e423f7df9cd0',
                    emptyOutDir: true,
                },
                })