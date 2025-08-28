import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/fcb9301d-5980-4a6e-968e-0c9c6c9dd0b6',
                    emptyOutDir: true,
                },
                })