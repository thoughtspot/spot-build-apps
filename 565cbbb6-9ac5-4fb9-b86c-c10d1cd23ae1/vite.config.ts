import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/565cbbb6-9ac5-4fb9-b86c-c10d1cd23ae1',
                    emptyOutDir: true,
                },
                })