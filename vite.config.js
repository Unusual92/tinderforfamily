import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://af10-95-189-188-175.ngrok-free.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
