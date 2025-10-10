import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/ee111cb7-0be2-41cc-b8f0-03a2caa04aad',
                    emptyOutDir: true,
                },
                })