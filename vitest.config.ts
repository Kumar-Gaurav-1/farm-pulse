import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.tsx'],
    include: ['**/*.test.tsx', '**/*.test.ts'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
});
