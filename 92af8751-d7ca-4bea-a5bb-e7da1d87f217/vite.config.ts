import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/92af8751-d7ca-4bea-a5bb-e7da1d87f217',
                    emptyOutDir: true,
                },
                })