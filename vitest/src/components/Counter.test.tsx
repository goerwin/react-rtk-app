import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { expect, it, vi } from 'vitest';
import { createStore } from '../redux/store';
import { Counter } from './Counter';

it('should render the counter with value 0', () => {
  const screen = render(
    <Provider store={createStore()}>
      <Counter />
    </Provider>
  );

  expect(screen.getByTestId('counterValue').textContent).toEqual('0');
});

it('should increment the counter when clicking increment button multiple times', async () => {
  const screen = render(
    <Provider store={createStore()}>
      <Counter />
    </Provider>
  );

  await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
  await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
  await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
  expect(screen.getByTestId('counterValue').textContent).toEqual('3');
});

it('should decrement the counter when clicking decrement button', async () => {
  const screen = render(
    <Provider store={createStore()}>
      <Counter />
    </Provider>
  );

  await userEvent.click(screen.getByRole('button', { name: 'Decrement' }));
  expect(screen.getByTestId('counterValue').textContent).toEqual('-1');
});

it('should increment by 3 when clicking that button', async () => {
  const screen = render(
    <Provider store={createStore()}>
      <Counter />
    </Provider>
  );

  const incrementByBtn = screen.getByRole('button', { name: 'Increment by 3' });
  await userEvent.click(incrementByBtn);

  expect(screen.getByTestId('counterValue').textContent).toEqual('3');

  await userEvent.click(incrementByBtn);
  expect(screen.getByTestId('counterValue').textContent).toEqual('6');
});

it('should call callback fn when counter is 2', async () => {
  const obj = {
    cb: () => {},
  };

  const cbSpy = vi.spyOn(obj, 'cb');

  const screen = render(
    <Provider store={createStore()}>
      <Counter onCountTwo={obj.cb} />
    </Provider>
  );

  expect(cbSpy).not.toHaveBeenCalled();

  // after 1 click still callback fn should not be called
  await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
  expect(cbSpy).not.toHaveBeenCalled();

  // after 2 click, value is 2 and callback fn should be called
  await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
  expect(cbSpy).toHaveBeenCalledTimes(1);
});
