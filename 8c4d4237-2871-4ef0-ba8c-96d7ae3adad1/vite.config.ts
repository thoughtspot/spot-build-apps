import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/8c4d4237-2871-4ef0-ba8c-96d7ae3adad1',
                    emptyOutDir: true,
                },
                })