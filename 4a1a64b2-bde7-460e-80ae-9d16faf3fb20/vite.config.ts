import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/4a1a64b2-bde7-460e-80ae-9d16faf3fb20',
                    emptyOutDir: true,
                },
                })