import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/edd89e10-c23b-416d-b0ba-d2ef7ebff9f8',
                    emptyOutDir: true,
                },
                })