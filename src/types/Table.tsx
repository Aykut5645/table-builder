export type TableType = {
  id: string;
  name: string;
  createdAt: string;
  baseTheme: BaseThemesType;
  colorScheme: ColorSchemesType;
  iconSet: IconSetType;
  params: ThemeParamsType;
  dimensions: DimensionsType;
};

export type BaseThemesType = 'quartz' | 'balham' | 'alpine';

export type ColorSchemesType =
  | 'light'
  | 'lightCold'
  | 'lightWarm'
  | 'dark'
  | 'darkBlue'
  | 'darkWarm';

export type IconSetType =
  | 'quartzLight'
  | 'quartzRegular'
  | 'quartzBold'
  | 'alpine'
  | 'material';

export type DimensionsType = { width?: number; height?: number };

export type ThemeParamsType = Partial<{
  // General
  fontFamily: FontFamilyType;
  fontSize: number;
  backgroundColor: string;
  foregroundColor: string;
  accentColor: string;

  // Borders & Spacing
  borderColor: string;
  wrapperBorder: boolean;
  rowBorder: boolean;
  columnBorder: boolean;
  sidePanelBorder: boolean;
  spacing: number;
  wrapperBorderRadius: number;
  borderRadius: number;

  // Header
  headerBackgroundColor: string;
  headerTextColor: string;
  headerFontFamily: FontFamilyType;
  headerFontSize: number;
  headerFontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  headerVerticalPaddingScale: number;

  // Cells
  cellTextColor: string;
  oddRowBackgroundColor: string;
  rowVerticalPaddingScale: number;
  cellHorizontalPaddingScale: number;

  // Icons
  iconSize: number;
}>;

export type FontFamilyType = string | string[] | { googleFont: string };
