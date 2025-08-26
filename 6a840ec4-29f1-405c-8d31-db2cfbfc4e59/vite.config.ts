import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/6a840ec4-29f1-405c-8d31-db2cfbfc4e59',
                    emptyOutDir: true,
                },
                })