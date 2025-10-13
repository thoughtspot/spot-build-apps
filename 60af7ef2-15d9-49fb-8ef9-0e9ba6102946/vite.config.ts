import { defineConfig } from 'vite'
                import react from '@vitejs/plugin-react'

                // https://vite.dev/config/
                export default defineConfig({
                base: './',
                plugins: [react()],
                build: {
                    // absolute path directly as string
                    outDir: '/home/admin/easytsey/dist/60af7ef2-15d9-49fb-8ef9-0e9ba6102946',
                    emptyOutDir: true,
                },
                })