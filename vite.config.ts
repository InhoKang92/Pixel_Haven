import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@' : fileURLToPath(new URL('./src', import.meta.url)),
      '@assets' : fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components' : fileURLToPath(new URL('./src/components', import.meta.url)),
      '@jotai' : fileURLToPath(new URL('./src/jotai', import.meta.url)),
      '@pages' : fileURLToPath(new URL('./src/pages', import.meta.url)),
    }
  },
  //CSS 전역사용
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@assets/styles/main";',
      }
    }
  }
})
