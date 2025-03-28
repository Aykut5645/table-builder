import supabase from './supabase';
import { RowDataType } from '../types/Row';

export const fetchRows = async (tableId: string) => {
  const { data, error } = await supabase
    .from('rows')
    .select('*')
    .eq('tableId', tableId)
    .order('id', { ascending: true });

  if (error) {
    console.error('Error (fetchRows) => ', error);
    throw new Error(error.message);
  }
  return data;
};

export const addRow = async (rowData: RowDataType, tableId: string) => {
  const { error } = await supabase
    .from('rows')
    .insert({ data: rowData, tableId });

  if (error) {
    console.error('Error (addRow) => ', error);
    throw new Error(error.message);
  }
};

export const deleteSelectedRow = async (rowId: number) => {
  const { error } = await supabase.from('rows').delete().eq('id', rowId);

  if (error) {
    console.error('Error (deleteSelectedRow) => ', error);
    throw new Error(error.message);
  }
};

export const updateRow = async (rowData: RowDataType) => {
  const { id, ...data } = rowData;
  const { error } = await supabase.from('rows').update({ data }).eq('id', id);

  if (error) {
    console.error('Error (updateRow) => ', error);
    throw new Error(error.message);
  }
};
