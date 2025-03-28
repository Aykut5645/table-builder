import { ReactNode } from 'react';

import { CELL_TYPES } from './constants';
import { ColumnType } from '../types/Column';

const types = [CELL_TYPES.text, CELL_TYPES.number, CELL_TYPES.boolean];

export const createItem = (
  key: string,
  label: string,
  children: ReactNode
) => ({
  key,
  label,
  children,
});

export const formatColumnData = (columnData: ColumnType) => {
  if (types.includes(columnData.type)) {
    // field
    columnData.field = columnData.field.toLowerCase();
    // headerName
    columnData.headerName =
      columnData.headerName.charAt(0).toUpperCase() +
      columnData.headerName.slice(1).toLowerCase();
  }
  return columnData;
};
