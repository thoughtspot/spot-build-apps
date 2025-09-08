import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/61edbaee-6616-4614-af2b-8168a67a1f2c',
                    emptyOutDir: true,
                },
                })