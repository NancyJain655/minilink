import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Example alias for src
    },
  },
  server: {
    hmr: {
      overlay: false, // Disable error overlay if needed
    },
  },
});
