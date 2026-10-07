import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    pool: 'threads',
    maxWorkers: 1,
    testTimeout: 30000,
    setupFiles: './src/setupTests.ts',
  },
});
