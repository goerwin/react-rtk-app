import * as react from 'react';
import { expect, it, jest } from '@jest/globals';
import { getLocalFormattedDate } from './date';

// mock react module
jest.mock('react', () => ({
  useState: () => 'I am a mocked useState!',
}));

it('should return correct formatted date (dd MMM YYYY HH:MM)', () => {
  expect(getLocalFormattedDate(new Date('2022/10/30 04:40:20'))).toEqual('30 Oct 2022 04:40');
});

it('should mock useState fn from react', async () => {
  expect(react.useState()).toEqual('I am a mocked useState!');
});
