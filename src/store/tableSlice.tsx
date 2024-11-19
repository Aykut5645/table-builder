import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

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

type ThemeState = {
  baseTheme: BaseThemes;
  colorScheme: ColorSchemes;
  iconSet: IconSet;
  params: { [key: string]: any };
};

const initialState: ThemeState = {
  baseTheme: 'quartz',
  colorScheme: 'colorScheme/light',
  iconSet: 'iconSet/quartzLight',
  params: {},
};

const tableSlice = createSlice({
  name: 'table',
  initialState: initialState,
  reducers: {
    setBaseTheme(state, action: PayloadAction<BaseThemes>) {
      state.baseTheme = action.payload;
      state.params = {};
    },
    setColorScheme(state, action: PayloadAction<ColorSchemes>) {
      state.colorScheme = action.payload;
      state.params = {};
    },
    setIconSet(state, action: PayloadAction<IconSet>) {
      state.iconSet = action.payload;
    },
    changeThemeParams(state, action: PayloadAction<{ [key: string]: any }>) {
      state.params = { ...state.params, ...action.payload };
    },
  },
});

// Actions
export const { setBaseTheme, setColorScheme, setIconSet, changeThemeParams } =
  tableSlice.actions;

// Selectors
export const selectBaseTheme = (state: RootState) => state.table.baseTheme;
export const selectColorScheme = (state: RootState) => state.table.colorScheme;
export const selectIconSet = (state: RootState) => state.table.iconSet;
export const selectParams = (state: RootState) => state.table.params;

export default tableSlice.reducer;
