import {
  themeQuartz,
  themeAlpine,
  themeBalham,
  colorSchemeLight,
  colorSchemeLightCold,
  colorSchemeLightWarm,
  colorSchemeDark,
  colorSchemeDarkWarm,
  colorSchemeDarkBlue,
  iconSetAlpine,
  iconSetMaterial,
  iconSetQuartzBold,
  iconSetQuartzLight,
  iconSetQuartzRegular,
  // colorSchemeVariable,
} from 'ag-grid-community';

export const BASE_THEMES = [
  { id: 'quartz', value: themeQuartz },
  { id: 'balham', value: themeBalham },
  { id: 'alpine', value: themeAlpine },
];

export const COLOR_SCHEMES = [
  { id: 'light', value: colorSchemeLight },
  { id: 'lightCold', value: colorSchemeLightCold },
  { id: 'lightWarm', value: colorSchemeLightWarm },
  { id: 'dark', value: colorSchemeDark },
  { id: 'darkWarm', value: colorSchemeDarkWarm },
  { id: 'darkBlue', value: colorSchemeDarkBlue },
  // TODO: { id: "colorSchemeVariable", value: colorSchemeVariable },
];

export const ICON_SETS = [
  { id: 'quartzLight', value: iconSetQuartzLight },
  { id: 'quartzRegular', value: iconSetQuartzRegular },
  { id: 'quartzBold', value: iconSetQuartzBold },
  { id: 'alpine', value: iconSetAlpine },
  { id: 'material', value: iconSetMaterial },
];

export const FONT_FAMILY_OPTIONS = [
  { value: 'IBM Plex Sans', label: 'IBM Plex Sans' },
  { value: 'inherit', label: 'system' },
  { value: 'Inter', label: 'Inter' },
  { value: 'IBM Plex Mono', label: 'IBM Plex Mono' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Merriweather', label: 'Merriweather' },
  { value: 'UnifrakturCook', label: 'UnifrakturCook' },
  { value: 'Pixelify Sans', label: 'Pixelify Sans' },
  { value: 'Times New Roman', label: 'Times New Roman' },
];

export const FONT_WEIGHT_OPTIONS = [
  { value: 100, label: 'Thin (100)' },
  { value: 200, label: 'Extra Light (200)' },
  { value: 300, label: 'Light (300)' },
  { value: 400, label: 'Normal (400)' },
  { value: 500, label: 'Medium (500)' },
  { value: 600, label: 'Extra Medium (600)' },
  { value: 700, label: 'Bold (700)' },
  { value: 800, label: 'Extra Bold (800)' },
  { value: 900, label: 'Black (900)' },
];

export const FONT_UTILITY_DATA = {
  inherit: 'inherit',
  Inter: { googleFont: 'Inter' },
  'IBM Plex Sans': { googleFont: 'IBM Plex Sans' },
  'IBM Plex Mono': { googleFont: 'IBM Plex Mono' },
  'Inclusive Sans': { googleFont: 'Inclusive Sans' },
  'Open Sans': { googleFont: 'Open Sans' },
  Lato: { googleFont: 'Lato' },
  Merriweather: { googleFont: 'Merriweather' },
  UnifrakturCook: { googleFont: 'UnifrakturCook' },
  'Pixelify Sans': { googleFont: 'Pixelify Sans' },
  'Times New Roman': 'Times New Roman',
};

export const BORDERS_OPTIONS = [
  { value: 'Around grid', label: 'Around grid' },
  { value: 'Between rows', label: 'Between rows' },
  { value: 'Between columns', label: 'Between columns' },
  { value: 'Around side panel', label: 'Around side panel' },
];

export const BORDERS_UTILITY_DATA = {
  'Around grid': { wrapperBorder: false },
  'Between rows': { rowBorder: false },
  'Between columns': { columnBorder: false },
  'Around side panel': { sidePanelBorder: false },
};

export const BORDER_TYPES = {
  AROUND_GRID: 'Around grid',
  BETWEEN_ROWS: 'Between rows',
  BETWEEN_COLUMNS: 'Between columns',
  AROUND_SIDE_PANEL: 'Around side panel',
};

export const CELL_TYPES = {
  text: 'text',
  number: 'number',
  boolean: 'boolean',
};

