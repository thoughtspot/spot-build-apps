import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/1929b970-7109-4bcd-ab5e-8ad9da3fbe5d',
                    emptyOutDir: true,
                },
                })