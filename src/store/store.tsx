import { configureStore } from '@reduxjs/toolkit';

import tableReducer from './tableSlice';
import rowReducer from './rowSlice';
import columnReducer from './columnSlice';
// import currentTableReducer from './currentTableSlice';
import { tablesApi } from './tablesApi';

export const store = configureStore({
  reducer: {
    table: tableReducer,
    rows: rowReducer,
    columns: columnReducer,
    // currentTable: currentTableReducer,
    [tablesApi.reducerPath]: tablesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tablesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
