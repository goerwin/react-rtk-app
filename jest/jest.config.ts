import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/index.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },

  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/mocks/**/*',
    '!src/**/*.test.{ts,tsx}',
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 0,
      functions: 0,
      branches: 0,
      lines: 90,
    },
  },
};

export default config;
