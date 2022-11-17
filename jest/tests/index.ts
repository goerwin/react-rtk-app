import 'whatwg-fetch';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { beforeAll, afterEach, afterAll } from '@jest/globals';
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
