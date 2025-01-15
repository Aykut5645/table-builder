import supabase from './supabase';
import { ColumnType } from '../types/Column';
import { formatColumnData } from '../utils/helpers';

export const fetchColumns = async (tableId: string) => {
  const { data, error } = await supabase
    .from('columns')
    .select('*')
    .eq('tableId', tableId)
    .order('createdAt', { ascending: true });

  if (error) {
    console.error('Error (fetchColumns) => ', error);
    throw new Error(error.message);
  }
  return data;
};

export const addColumn = async (column: ColumnType, tableId: string) => {
  const { error } = await supabase
    .from('columns')
    .insert({ ...formatColumnData(column), tableId });

  if (error) {
    console.error('Error (addColumn) => ', error);
    throw new Error(error.message);
  }
};

export const deleteColumn = async (columnId: number) => {
  const { error } = await supabase.from('columns').delete().eq('id', columnId);

  if (error) {
    console.error('Error (deleteColumn) => ', error);
    throw new Error(error.message);
  }
};

export const updateHeaderName = async (
  columnId: number,
  headerName: string
) => {
  const { error } = await supabase
    .from('columns')
    .update({ headerName })
    .eq('id', columnId);

  if (error) {
    console.error('Error (updateHeaderName) => ', error);
    throw new Error(error.message);
  }
};
