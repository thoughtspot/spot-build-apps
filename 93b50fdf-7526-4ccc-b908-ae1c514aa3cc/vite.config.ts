import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/93b50fdf-7526-4ccc-b908-ae1c514aa3cc',
                    emptyOutDir: true,
                },
                })