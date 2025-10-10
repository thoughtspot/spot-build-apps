import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/c15ed624-342c-4f4e-a2ff-4a7b5dd2d480',
                    emptyOutDir: true,
                },
                })