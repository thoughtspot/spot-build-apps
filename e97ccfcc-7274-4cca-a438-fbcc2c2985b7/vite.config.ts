import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/e97ccfcc-7274-4cca-a438-fbcc2c2985b7',
                    emptyOutDir: true,
                },
                })