import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/3bddb6cd-ae83-47e0-92a3-edf8b0eada48',
                    emptyOutDir: true,
                },
                })