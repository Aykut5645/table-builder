import { configureStore } from '@reduxjs/toolkit';

import tableReducer from './tableSlice';
import rowReducer from './rowSlice';
import columnReducer from './columnSlice';

export const store = configureStore({
  reducer: {
    table: tableReducer,
    rows: rowReducer,
    columns: columnReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
