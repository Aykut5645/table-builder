import { createContext, useState, useMemo, ReactNode } from 'react';

interface TableContextProps {
  tableId: string;
  editMode: boolean;
  setTableId: (id: string) => void;
  clearTableId: () => void;
  toggleEditMode: () => void;
}

export const TableContext = createContext<TableContextProps | undefined>(
  undefined
);

const TableProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTableId = () => {
    try {
      const item = localStorage.getItem('tableId');
      return item ? JSON.parse(item) : '';
    } catch (error) {
      console.error('Error reading localStorage key tableId:', error);
      return '';
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [tableId, setTableId] = useState<string>(getInitialTableId);

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

  const value = useMemo(
    () => ({
      tableId,
      editMode,
      toggleEditMode,
      setTableId: handleTableId,
      clearTableId,
    }),
    [tableId, editMode]
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export default TableProvider;
