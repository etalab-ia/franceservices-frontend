import path from 'node:path'
import react from '@vitejs/plugin-react'
import url from 'rollup-plugin-url'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
export default ({ mode }) => {
  const isProduction = mode === 'production'

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
      port: 4174,
    },
    base: '',
  })
}
