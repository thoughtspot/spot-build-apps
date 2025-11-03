import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/64b6ff32-3e63-4aee-9530-93a244d015df',
                    emptyOutDir: true,
                },
                })