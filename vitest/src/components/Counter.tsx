import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { actions } from '../features/counter/counterSlice';
import { useEffect } from 'react';

interface Props {
  onCountTwo?: () => void;
}

export function Counter(props: Props) {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (count === 2) props.onCountTwo?.();
  }, [count, props]);

  return (
    <main>
      <h1>Counter (Synchronous actions)</h1>

      <div>
        <h2
          style={{ fontSize: 30, textAlign: 'center', marginBottom: '1rem' }}
          data-testid="counterValue"
        >
          {count}
        </h2>

        <button onClick={() => dispatch(actions.decrement())}>Decrement</button>
        <button onClick={() => dispatch(actions.increment())}>Increment</button>
        <button onClick={() => dispatch(actions.incrementByAmount(3))}>Increment by 3</button>
      </div>
    </main>
  );
}
