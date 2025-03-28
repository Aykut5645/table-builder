import supabase from './supabase';
import {
  BaseThemesType,
  ColorSchemesType,
  DimensionsType,
  IconSetType,
  TableType,
  ThemeParamsType,
} from '../types/Table';

export const fetchTables = async () => {
  const { data, error } = await supabase
    .from('tables')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Error (fetchTables) => ', error);
    throw new Error(error.message);
  }
  return data;
};

export const fetchTableById = async (tableId: string) => {
  const { data, error } = await supabase
    .from('tables')
    .select('*')
    .eq('id', tableId);

  if (error) {
    console.error('Error (fetchTableById) => ', error);
    throw new Error(error.message);
  }
  if (!data || data.length === 0) {
    throw new Error(`Table with ID: ${tableId} not found.`);
  }

  return data[0];
};

export const updateBaseTheme = async (
  newBaseTheme: BaseThemesType,
  tableId: string
) => {
  const { error } = await supabase
    .from('tables')
    .update({ baseTheme: newBaseTheme })
    .eq('id', tableId);

  if (error) {
    console.error('Error (updateBaseTheme) => ', error);
    throw new Error(error.message);
  }
};

export const updateColorScheme = async (
  newColorScheme: ColorSchemesType,
  tableId: string
) => {
  const { error } = await supabase
    .from('tables')
    .update({ colorScheme: newColorScheme })
    .eq('id', tableId);

  if (error) {
    console.error('Error (updateColorScheme) => ', error);
    throw new Error(error.message);
  }
};

export const updateIconSet = async (
  newIconSet: IconSetType,
  tableId: string
) => {
  const { error } = await supabase
    .from('tables')
    .update({ iconSet: newIconSet })
    .eq('id', tableId);

  if (error) {
    console.error('Error (updateIconSet) => ', error);
    throw new Error(error.message);
  }
};

export const updateParams = async (
  currentTable: TableType,
  newParam: ThemeParamsType
) => {
  const { error } = await supabase
    .from('tables')
    .update({ params: { ...currentTable.params, ...newParam } })
    .eq('id', currentTable.id);

  if (error) {
    console.error('Error (updateParams) => ', error);
    throw new Error(error.message);
  }
};

export const updateDimensions = async (
  currentDimensions: DimensionsType,
  dimension: DimensionsType,
  tableId: string
) => {
  const { error } = await supabase
    .from('tables')
    .update({ dimensions: { ...currentDimensions, ...dimension } })
    .eq('id', tableId);

  if (error) {
    console.error('Error (updateDimensions) => ', error);
    throw new Error(error.message);
  }
};

export const createNewTable = async (value: { name: string }) => {
  const { data, error } = await supabase.from('tables').insert(value).select();

  if (error) {
    console.error('Error (createNewTable) => ', error);
    throw new Error(error.message);
  }
  return data;
};
