import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/2138d55c-a958-4d64-8336-8e9b62ced256',
                    emptyOutDir: true,
                },
                })