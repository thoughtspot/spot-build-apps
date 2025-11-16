import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/d03b2b6e-701a-4e72-8e35-85d80f32bbd6',
                    emptyOutDir: true,
                },
                })