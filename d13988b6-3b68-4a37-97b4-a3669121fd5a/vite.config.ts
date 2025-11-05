import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/d13988b6-3b68-4a37-97b4-a3669121fd5a',
                    emptyOutDir: true,
                },
                })