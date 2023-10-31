import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';

export default ({ mode }) => {
  const isProduction = mode === 'production';
  const base = isProduction ? '' : '/albert';

  return defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
      outDir: 'dist',
      cssCodeSplit: false,
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 4173,
    },
    base: base
  });
};