import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import SvgLoader from 'vite-svg-loader'

export default defineConfig({
  server: {
    proxy: {
      '/audit': {
        target: 'http://127.0.0.1:64068',
      },
      '/socket.io': {
        target: 'ws://127.0.0.1:3001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  plugins: [
    Vue(),
    VitePWA({ registerType: 'autoUpdate' }),
    SvgLoader(),
  ],
})
