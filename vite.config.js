import react from '@vitejs/plugin-react'
import path from 'node:path'
import url from 'rollup-plugin-url'

import { defineConfig } from 'vite'

import tailwindcss from 'tailwindcss'
import tsconfigPaths from 'vite-tsconfig-paths'

export default () => {
  return defineConfig({
    plugins: [react(), tailwindcss(), url(), tsconfigPaths()],
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
