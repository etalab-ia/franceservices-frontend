import react from '@vitejs/plugin-react'
import path from 'node:path'
import url from 'rollup-plugin-url'
import tailwindcss from 'tailwindcss'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default ({ mode }) => {
  const isProduction = mode === 'production'

  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
      url({
        limit: 10 * 1024, // 10kb
        include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
        emitFiles: true,
      }),
      tsconfigPaths(),
      createHtmlPlugin({
        minify: isProduction,
      }),
    ],
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
