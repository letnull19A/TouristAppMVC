import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5001,
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@features': path.resolve(__dirname, './src/features'),
      '@ui': path.resolve(__dirname, './src/shared/ui'),
      '@contexts': path.resolve(__dirname, './src/app/contexts'),
      '@hooks': path.resolve(__dirname, './src/shared/hooks'),
      '@api': path.resolve(__dirname, './src/shared/api')
    },
  },
  plugins: [react()],
})
