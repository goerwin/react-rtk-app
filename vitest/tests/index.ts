import 'whatwg-fetch';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { mockServer } from './mockServer';

beforeAll(() => {
  // Enable the mocking in tests.
  mockServer.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  mockServer.resetHandlers();

  // Cleans up testing-library after each test
  cleanup();
});

afterAll(() => {
  // Clean up once the tests are done.
  mockServer.close();
});
