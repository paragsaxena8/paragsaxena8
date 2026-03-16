import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import { siteConfig } from './src/data/site-config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  base: process.env.GITHUB_PAGES === 'true' ? '/paragsaxena8/' : '/',
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api/blog': {
        target: 'https://api.rss2json.com',
        changeOrigin: true,
        rewrite: () =>
          '/v1/api.json?rss_url=' +
          encodeURIComponent(`https://medium.com/feed/${siteConfig.mediumUsername}`),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
