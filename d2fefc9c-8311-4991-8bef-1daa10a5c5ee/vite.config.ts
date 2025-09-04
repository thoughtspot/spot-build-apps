import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/d2fefc9c-8311-4991-8bef-1daa10a5c5ee',
                    emptyOutDir: true,
                },
                })