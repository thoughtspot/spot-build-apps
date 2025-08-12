import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/cf81a1e9-fd10-40f5-9ef9-7c08a6c34422',
                    emptyOutDir: true,
                },
                })