import { createContext, useState, useMemo, ReactNode } from 'react';

interface TableContextProps {
  tableId: string;
  editMode: boolean;
  selectedFeatures: GridOptionsType;
  setTableId: (id: string) => void;
  clearTableId: () => void;
  setSelectedFeatures: (data: GridOptionsType) => void;
  toggleEditMode: () => void;
}

export const TableContext = createContext<TableContextProps | undefined>(
  undefined
);

export type GridOptionsType = {
  floatingFilters: boolean;
  enableRtl: boolean;
  rowSelection: boolean;
  rowDrag: boolean;
  columnHoverHighlight: boolean;
  columnResizing: boolean;
};

const TableProvider = ({ children }: { children: ReactNode }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<GridOptionsType>({
    columnHoverHighlight: false,
    columnResizing: false,
    floatingFilters: false,
    enableRtl: false,
    rowSelection: true,
    rowDrag: false,
  });

  const [tableId, setTableId] = useState<string>(() => {
    try {
      const item = localStorage.getItem('tableId');
      return item ? JSON.parse(item) : '';
    } catch (error) {
      console.error('Error reading localStorage key tableId:', error);
      return '';
    }
  });

  const handleTableId = (value: string) => {
    try {
      setTableId(value);
      localStorage.setItem('tableId', JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage key tableId:', error);
    }
  };

  const clearTableId = () => {
    try {
      setTableId('');
      localStorage.removeItem('tableId');
    } catch (error) {
      console.error('Error clearing localStorage key tableId:', error);
    }
  };

  const toggleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  const adjustSelectedFeatures = (data: GridOptionsType) => {
    setSelectedFeatures(data);
  };

  const value = useMemo(
    () => ({
      tableId,
      editMode,
      selectedFeatures,
      toggleEditMode,
      setSelectedFeatures: adjustSelectedFeatures,
      setTableId: handleTableId,
      clearTableId,
    }),
    [tableId, editMode, selectedFeatures]
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export default TableProvider;
