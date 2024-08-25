import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

import { defineConfig } from 'vite'

import tsconfigPaths from 'vite-tsconfig-paths'

export default () => {
  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    build: {
      outDir: 'dist',
      cssCodeSplit: false,
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
    base: '/',
  })
}
