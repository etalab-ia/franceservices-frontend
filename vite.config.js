import path from 'path'
import react from '@vitejs/plugin-react'
import url from 'rollup-plugin-url'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'

export default ({ mode }) => {
  const isProduction = mode === 'production'

  return defineConfig({
    plugins: [react(), tailwindcss(), url()],
    build: {
      outDir: 'dist',
      cssCodeSplit: false,
      assetsInclude: ['artwork/**'],
    },
    resolve: {
      alias: {
        '@artwork': path.resolve(__dirname, './artwork'),
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 4173,
    },
    base: '',
  })
}
