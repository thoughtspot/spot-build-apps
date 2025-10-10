import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/abbc2f0b-1ae1-46dc-b804-beb524f68c8c',
                    emptyOutDir: true,
                },
                })