import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/d39dfc9d-9d1a-4646-8c71-76a3d8cef0e6',
                    emptyOutDir: true,
                },
                })