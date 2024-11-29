import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ColDef } from 'ag-grid-community';

export type Row<T = Record<string, any>> = T;
export type Column<T = Record<string, any>> = ColDef<T>;

type ColumnState = Column[];

export type BaseThemes = 'quartz' | 'balham' | 'alpine';
export type ColorSchemes =
  | 'colorScheme/light'
  | 'colorScheme/lightCold'
  | 'colorScheme/lightWarm'
  | 'colorScheme/dark'
  | 'colorScheme/darkBlue'
  | 'colorScheme/darkWarm';
export type IconSet =
  | 'iconSet/quartzLight'
  | 'iconSet/quartzRegular'
  | 'iconSet/quartzBold'
  | 'iconSet/alpine'
  | 'iconSet/material';

type CurrentTableState = {
  table: {
    baseTheme: BaseThemes;
    colorScheme: ColorSchemes;
    iconSet: IconSet;
    columns: ColumnState;
    rows: Row[];
    params: { [key: string]: any };
    dimensions: { width: number; height: number };
  };
  isEditMode: boolean;
};

const initialState: CurrentTableState = {
  table: {
    baseTheme: 'quartz',
    colorScheme: 'colorScheme/light',
    iconSet: 'iconSet/quartzLight',
    params: {},
    dimensions: { width: 0, height: 0 },
    rows: [],
    columns: [],
  },
  isEditMode: false,
};

const tableSlice = createSlice({
  name: 'currentTable',
  initialState,
  reducers: {
    // Theme-related reducers
    setBaseTheme(state, action: PayloadAction<BaseThemes>) {
      state.table.baseTheme = action.payload;
      state.table.params = {};
    },
    setColorScheme(state, action: PayloadAction<ColorSchemes>) {
      state.table.colorScheme = action.payload;
      state.table.params = {};
    },
    setIconSet(state, action: PayloadAction<IconSet>) {
      state.table.iconSet = action.payload;
    },
    changeThemeParams(state, action: PayloadAction<{ [key: string]: any }>) {
      state.table.params = { ...state.table.params, ...action.payload };
    },
    changeDimensions(
      state,
      action: PayloadAction<{ width?: number; height?: number }>
    ) {
      state.table.dimensions = { ...state.table.dimensions, ...action.payload };
    },

    // Row-related reducers
    updateRow: (state, action: PayloadAction<Row>) => {
      let newRow = action.payload;
      let newRowData = [...state.table.rows];
      let index = newRowData.findIndex((element) => element.id === newRow.id);
      newRowData.splice(index, 1, newRow);
      return {
        ...state,
        rows: newRowData,
      };
    },
    addRows: (state, action: PayloadAction<Omit<Row, 'id'>>) => {
      let newRowData = [...state.table.rows];
      newRowData = state.table.rows.concat({ id: nanoid(), ...action.payload });
      return {
        ...state,
        rows: newRowData,
      };
    },
    removeRows: (state, action: PayloadAction<Row[]>) => {
      let newRowData = [...state.table.rows];
      newRowData = newRowData.filter(
        (row) => JSON.stringify(action.payload[0]) !== JSON.stringify(row)
      );

      return {
        ...state,
        rows: newRowData,
      };
    },

    // Column-related reducers
    addColumn: (state, action: PayloadAction<Column>) => {
      state.table.columns.push(action.payload as PayloadAction<Column>);
    },
    removeColumn: (state) => {
      state.table.columns.pop();
    },
    updateColumns: (state, action: PayloadAction<Column>) => {
      const index = state.table.columns.findIndex(
        (col) => col.field === action.payload.field
      );
      if (index !== -1) {
        state.table.columns[index] = {
          ...action.payload,
        } as (typeof state.table.columns)[number];
      }
    },
    updateColumnHeaderName: (
      state,
      action: PayloadAction<{ field: string; headerName: string }>
    ) => {
      const { field, headerName } = action.payload;

      const column = state.table.columns.find((col) => col.field === field);
      if (column) {
        column.headerName = headerName;
        state.isEditMode = true;
      }
    },
    startEditColumnHeaders: (
      state,
      action: PayloadAction<{ field: string; headerName: string }>
    ) => {
      const { field, headerName } = action.payload;
      const column = state.table.columns.find((col) => col.field === field);

      if (column) {
        column.headerName = headerName;
        state.isEditMode = !state.isEditMode;
      }
    },
    // Misc reducers
    toggleEditMode(state) {
      state.isEditMode = !state.isEditMode;
    },
  },
});

// Exporting actions
export const {
  setBaseTheme,
  setColorScheme,
  setIconSet,
  changeThemeParams,
  addRows,
  updateRow,
  removeRows,
  addColumn,
  updateColumns,
  removeColumn,
  toggleEditMode,
} = tableSlice.actions;

// Exporting selectors
export const selectTheme = (state: CurrentTableState) => ({
  baseTheme: state.table.baseTheme,
  colorScheme: state.table.colorScheme,
  iconSet: state.table.iconSet,
});
export const selectRows = (state: CurrentTableState) => state.table.rows;
export const selectColumns = (state: CurrentTableState) => state.table.columns;
export const selectEditMode = (state: CurrentTableState) => state.isEditMode;

// Exporting reducer
export default tableSlice.reducer;
