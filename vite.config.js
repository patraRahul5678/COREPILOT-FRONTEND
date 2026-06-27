import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('react-google-recaptcha')) {
              return 'recaptcha';
            }
            return 'vendor';
          }
        }
      }
    },
    minify: 'esbuild',
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    assetsInlineLimit: 4096,
    reportCompressedSize: true
  }
})
