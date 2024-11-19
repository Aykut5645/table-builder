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
} from '@ag-grid-community/theming';

export const AG_GRID_THEMES = {
  quartz: themeQuartz,
  balham: themeBalham,
  alpine: themeAlpine,
};

export const AG_GRID_COLOR_SCHEMES = {
  'colorScheme/light': colorSchemeLight,
  'colorScheme/lightCold': colorSchemeLightCold,
  'colorScheme/lightWarm': colorSchemeLightWarm,
  'colorScheme/dark': colorSchemeDark,
  'colorScheme/darkBlue': colorSchemeDarkWarm,
  'colorScheme/darkWarm': colorSchemeDarkBlue,
};

export const AG_GRID_ICON_SET = {
  'iconSet/quartzLight': iconSetQuartzLight,
  'iconSet/quartzRegular': iconSetQuartzRegular,
  'iconSet/quartzBold': iconSetQuartzBold,
  'iconSet/alpine': iconSetAlpine,
  'iconSet/material': iconSetMaterial,
};

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
  { value: '100', label: 'Thin (100)' },
  { value: '200', label: 'Extra Light (200)' },
  { value: '300', label: 'Light (300)' },
  { value: '400', label: 'Normal (400)' },
  { value: '500', label: 'Medium (500)' },
  { value: '600', label: 'Extra Medium (600)' },
  { value: '700', label: 'Bold (700)' },
  { value: '800', label: 'Extra Bold (800)' },
  { value: '900', label: 'Black (900)' },
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
  'Around grid': { wrapperBorder: true },
  'Between rows': { rowBorder: true },
  'Between columns': { columnBorder: true },
  'Around side panel': { sidePanelBorder: true },
};
