import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { apiSlice } from '../features/api/apiSlice';

export function createStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },

    // rtk-query needs to be added as last middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });
}

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
