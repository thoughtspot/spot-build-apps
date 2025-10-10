import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/d6b54e4c-bb6f-4ee1-b91c-db3a35066558',
                    emptyOutDir: true,
                },
                })