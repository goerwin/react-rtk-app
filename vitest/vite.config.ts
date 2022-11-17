/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['tests/index.ts'],
    coverage: {
      provider: 'c8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/mocks/**/*', 'src/**/*.test.{ts,tsx}', '**/*.d.ts'],

      // include all files, including the untested ones into report.
      all: true,

      // minimum threshold to meet
      statements: 0,
      functions: 0,
      branches: 0,
      lines: 90,
    },
  },
});
