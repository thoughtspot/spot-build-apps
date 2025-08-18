import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/99ea4fd2-92ef-4111-9a0c-f838f8fd5f0e',
                    emptyOutDir: true,
                },
                })