import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type Row = {
  id: string;
  make: string;
  model: string;
  price: number;
  electric: boolean;
};

type RowState = {
  rows: Row[];
};

const initialState: RowState = {
  rows: [
    {
      id: nanoid(),
      make: 'Tesla',
      model: 'Model Y',
      price: 64950,
      electric: true,
    },
    {
      id: nanoid(),
      make: 'Ford',
      model: 'F-Series',
      price: 33850,
      electric: false,
    },
    {
      id: nanoid(),
      make: 'Toyota',
      model: 'Corolla',
      price: 29600,
      electric: false,
    },
    {
      id: nanoid(),
      make: 'Mercedes',
      model: 'EQA',
      price: 48890,
      electric: true,
    },
    {
      id: nanoid(),
      make: 'Fiat',
      model: '500',
      price: 15774,
      electric: false,
    },
  ],
};

export const rowSlice = createSlice({
  name: 'rows',
  initialState: initialState,
  reducers: {
    updateRow: (state, action: PayloadAction<Row>) => {
      let newRow = action.payload;
      let newRowData = [...state.rows];
      let index = newRowData.findIndex((element) => element.id === newRow.id);
      newRowData.splice(index, 1, newRow);
      return {
        ...state,
        rows: newRowData,
      };
    },
    addRows: (state, action: PayloadAction<Omit<Row, 'id'>>) => {
      let newRowData = [...state.rows];
      newRowData = state.rows.concat({ id: nanoid(), ...action.payload });
      return {
        ...state,
        rows: newRowData,
      };
    },
    removeRows: (state, action: PayloadAction<Row[]>) => {
      let newRowData = [...state.rows];
      newRowData = newRowData.filter(
        (row) => JSON.stringify(action.payload[0]) !== JSON.stringify(row)
      );

      return {
        ...state,
        rows: newRowData,
      };
    },
  },
});

export const { addRows, removeRows, updateRow } = rowSlice.actions;
export const selectRows = (state: RootState) => state.rows.rows;

export default rowSlice.reducer;
