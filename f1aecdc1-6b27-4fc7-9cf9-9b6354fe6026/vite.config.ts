import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/f1aecdc1-6b27-4fc7-9cf9-9b6354fe6026',
                    emptyOutDir: true,
                },
                })