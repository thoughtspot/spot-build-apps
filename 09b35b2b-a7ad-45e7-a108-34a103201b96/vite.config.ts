import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/app/dist/09b35b2b-a7ad-45e7-a108-34a103201b96',
                    emptyOutDir: true,
                },
                })