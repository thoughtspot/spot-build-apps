import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/43a4a9d5-66e6-44c5-9f89-046b3a1c65b3',
                    emptyOutDir: true,
                },
                })