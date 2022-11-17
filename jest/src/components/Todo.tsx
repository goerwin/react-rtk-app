import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import {
  useAddNewTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
  useRemoveTodoMutation,
} from '../features/api/apiSlice';
import LoadingSpinner from './LoadingSpinner';
import styles from './Todo.module.scss';

export default function Todo() {
  const inputElRef = useRef<HTMLInputElement>(null);
  const [inputElValue, setInputElValue] = useState('');
  const { isFetching: isTodosLoading, data: todos, isError, error } = useGetTodosQuery();
  const [addNewTodo, { isLoading: isAddNewTodoLoading }] = useAddNewTodoMutation();
  const [removeTodo, { isLoading: isRemoveTodoLoading }] = useRemoveTodoMutation();
  const [editTodo, { isLoading: isEditTodoLoading }] = useEditTodoMutation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputElValue(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = inputElRef.current?.value;
    if (!value || isAddNewTodoLoading) return;

    await addNewTodo(value);
    setInputElValue('');
  };

  const handleEditTodo = async (todo: { id: string; completed: boolean }) => {
    await editTodo({ id: todo.id, todo: { ...todo, completed: !todo.completed } });
  };

  const handleRemoveTodo = async (id: string) => {
    await removeTodo(id);
  };

  if (isError) {
    return (
      <main className={styles.container}>
        <p data-testid="error-message">{(error as any).data || 'Error Loading Todos'}</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <LoadingSpinner
        show={isTodosLoading || isAddNewTodoLoading || isRemoveTodoLoading || isEditTodoLoading}
      />

      <div className={styles.formContainer}>
        <h1>Todo (Asynchronous actions)</h1>

        <form onSubmit={handleFormSubmit}>
          <input
            ref={inputElRef}
            value={inputElValue}
            onChange={handleInputChange}
            placeholder="Add Todo"
          />
          <button>Add</button>
        </form>
      </div>

      <ul className={styles.todosContainer}>
        {todos?.map((el) => (
          <li key={el.id}>
            <p className={`${el.completed ? styles.isCompleted : ''}`}>{el.title}</p>

            <button
              onClick={() => handleEditTodo(el)}
              className={`${el.completed ? styles.isSecondary : ''}`}
            >
              {el.completed ? 'Not Done' : 'Done'}
            </button>

            <button onClick={() => handleRemoveTodo(el.id)} className={styles.isDanger}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
