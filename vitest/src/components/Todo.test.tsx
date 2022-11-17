import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { Provider } from 'react-redux';
import { expect, it } from 'vitest';
import { mockServer } from '../../tests/mockServer';
import { createStore } from '../redux/store';
import Todo from './Todo';

it('should show a loading state', () => {
  const screen = render(
    <Provider store={createStore()}>
      <Todo />
    </Provider>
  );

  expect(screen.asFragment()).toMatchSnapshot();
});

it('should load 3 todo items after loading is done', async () => {
  const screen = render(
    <Provider store={createStore()}>
      <Todo />
    </Provider>
  );

  // wait for loading to go away
  await waitFor(() => expect(screen.queryByTestId('global-loading')).toBeNull());

  // get all listitem (li) elements in the page
  const list = screen.getByRole('list');
  const items = within(list).getAllByRole('listitem');

  expect(items.length).toEqual(3);
});

it('should show error message on API error', async () => {
  const screen = render(
    <Provider store={createStore()}>
      <Todo />
    </Provider>
  );

  // mock get /todos with a 500 error
  mockServer.use(
    rest.get('https://jsonplaceholder.typicode.com/todos', async (req, res, ctx) => {
      return res(ctx.status(500), ctx.text('Error loading todos'));
    })
  );

  // wait for loading to go away
  await waitFor(() => expect(screen.queryByTestId('global-loading')).toBeNull());

  // verify error message is displayed
  expect(screen.getByTestId('error-message').textContent).toEqual('Error loading todos');
});

// Test skipped to show coverage
it.skip('should remove the second item after clicking remove', async () => {
  const screen = render(
    <Provider store={createStore()}>
      <Todo />
    </Provider>
  );

  // wait for loading to go away
  await waitFor(() => expect(screen.queryByTestId('global-loading')).toBeNull());

  // get all listitem (li) elements in the page
  const list = screen.getByRole('list');
  const items = within(list).getAllByRole('listitem');

  // verify we still have 3 todo items
  expect(items.length).toEqual(3);

  // get remove button of 2nd item and click it
  const removeBtn = within(items[1]).getByRole('button', { name: 'Remove' });
  await userEvent.click(removeBtn);

  // wait for loading to go away
  await waitFor(() => expect(screen.queryByTestId('global-loading')).toBeNull());

  // verify there are now 2 items
  const newItems = within(list).getAllByRole('listitem');
  expect(newItems.length).toEqual(2);
});
