import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/565b1fad-9d1d-4451-8b81-35a2226ebb84',
                    emptyOutDir: true,
                },
                })