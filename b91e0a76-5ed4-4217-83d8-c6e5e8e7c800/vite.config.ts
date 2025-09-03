import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/b91e0a76-5ed4-4217-83d8-c6e5e8e7c800',
                    emptyOutDir: true,
                },
                })