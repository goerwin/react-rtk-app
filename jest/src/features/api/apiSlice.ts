import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Todo = { id: string; title: string; completed: boolean };
type Todos = Todo[];

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',

  // All of our requests will have URLs starting with this
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),

  tagTypes: ['todos'],

  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getTodos: builder.query<Todos, void>({
      providesTags: ['todos'],
      query: () => ({
        url: '/todos',
        method: 'GET',
      }),
    }),

    addNewTodo: builder.mutation<void, string>({
      invalidatesTags: ['todos'],
      query: (title) => ({
        url: '/todos',
        method: 'POST',
        body: title,
      }),
    }),

    editTodo: builder.mutation<void, { id: string; todo: Partial<Todo> }>({
      invalidatesTags: ['todos'],
      query: (attrs) => ({
        url: `/todos/${attrs.id}`,
        method: 'PATCH',
        body: attrs.todo,
      }),
    }),

    removeTodo: builder.mutation<void, string>({
      invalidatesTags: ['todos'],
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export the auto-generated endpoint hooks
export const {
  useGetTodosQuery,
  useAddNewTodoMutation,
  useEditTodoMutation,
  useRemoveTodoMutation,
} = apiSlice;
