import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/68345f71-ad7a-4e4f-9124-3892a7c51880',
                    emptyOutDir: true,
                },
                })