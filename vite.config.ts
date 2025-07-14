import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        exportType: 'named',
        ref: true,
        svgo: true,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Anker',
        short_name: 'Anker',
        theme_color: '#FBCF60',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  build: {
    minify: 'terser',
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('toastify')) {
            return '@vendor-react-toastify';
          }
          
          if (id.includes('react-router') || id.includes('react-router')) {
            return '@vendor-react-router';
          }

          if (id.includes('react') || id.includes('react-dom')) {
            return '@vendor-react-vendor';
          }
          if (id.includes('auth0')) {
            return '@vendor-auth0';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
