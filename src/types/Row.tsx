export type RowType = {
  id: number;
  createdAt?: number;
  tableId: string;
  data: RowDataType;
};

export type RowDataType = { [key: string]: number | string | boolean };
