import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/1b8d0e18-0577-42fb-9164-1ff9a53b2ac4',
                    emptyOutDir: true,
                },
                })