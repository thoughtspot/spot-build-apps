import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/9d780c58-41eb-47e8-81ec-f54c6cd53e7e',
                    emptyOutDir: true,
                },
                })