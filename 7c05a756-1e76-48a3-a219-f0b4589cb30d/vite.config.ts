import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/7c05a756-1e76-48a3-a219-f0b4589cb30d',
                    emptyOutDir: true,
                },
                })