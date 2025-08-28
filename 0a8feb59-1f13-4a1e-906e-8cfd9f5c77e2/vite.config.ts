import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/0a8feb59-1f13-4a1e-906e-8cfd9f5c77e2',
                    emptyOutDir: true,
                },
                })