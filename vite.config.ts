import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.d.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})
