import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColDef } from 'ag-grid-community';

import { RootState } from './store';
import { Row } from './rowSlice';

export type Column = ColDef<Row>;

type ColumnState = {
  isEditMode: boolean;
  columns: Column[];
};

const initialState: ColumnState = {
  isEditMode: false,
  columns: [
    { field: 'make', headerName: 'Make' },
    { field: 'model', headerName: 'Model' },
    { field: 'price', headerName: 'Price' },
    { field: 'electric', headerName: 'Electric' },
  ],
};

export const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload as PayloadAction<Column>);
    },
    removeColumn: (state) => {
      state.columns.pop();
    },
    updateColumns: (state, action: PayloadAction<Column>) => {
      const index = state.columns.findIndex(
        (col) => col.field === action.payload.field
      );
      if (index !== -1) {
        state.columns[index] = {
          ...action.payload,
        } as (typeof state.columns)[number];
      }
    },
    updateColumnHeaderName: (
      state,
      action: PayloadAction<{ field: string; headerName: string }>
    ) => {
      const { field, headerName } = action.payload;

      const column = state.columns.find((col) => col.field === field);
      if (column) {
        column.headerName = headerName;
        columnSlice.caseReducers.startColumnsEditMode(state);
      }
    },
    startEditColumnHeaders: (
      state,
      action: PayloadAction<{ field: string; headerName: string }>
    ) => {
      const { field, headerName } = action.payload;
      const column = state.columns.find((col) => col.field === field);
      
      if (column) {
        column.headerName = headerName;
        // columnSlice.caseReducers.startColumnsEditMode(state);
        state.isEditMode = !state.isEditMode;
      }
    },
    startColumnsEditMode: (state) => {
      state.isEditMode = !state.isEditMode;
    },
  },
});

// Actions
export const {
  addColumn,
  removeColumn,
  updateColumns,
  updateColumnHeaderName,
  startColumnsEditMode
} = columnSlice.actions;

// Selectors
export const selectColumns = (state: RootState) => state.columns.columns;
export const selectIsColumnsEditMode = (state: RootState) => state.columns.isEditMode;

export default columnSlice.reducer;
