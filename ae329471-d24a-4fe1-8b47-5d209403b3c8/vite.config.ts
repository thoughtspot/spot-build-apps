import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/ae329471-d24a-4fe1-8b47-5d209403b3c8',
                    emptyOutDir: true,
                },
                })