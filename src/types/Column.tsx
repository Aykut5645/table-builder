import { CELL_TYPES } from '../utils/constants';

export type ColumnType = {
  id: number;
  field: string;
  headerName: string;
  tableId: string;
  createdAt: string;
  type: ColumnCellType;
};

export type ColumnCellType = keyof typeof CELL_TYPES;
