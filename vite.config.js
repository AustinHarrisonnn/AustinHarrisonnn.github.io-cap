import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/AustinHarrisonnn.github.io-cap/', 
  build: {
    outDir: 'dist',
  },
});
