import { configureStore } from '@reduxjs/toolkit';
import rowReducer from './features/row/rowSlice';
import { rowApi } from './features/row/api';

export const store = configureStore({
  reducer: {
    [rowApi.reducerPath]: rowApi.reducer,
    row: rowReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rowApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
