import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Flex, Select } from 'antd';

import { fetchTables } from '../apis';
import { useTableContext } from '../hooks/useTableContext';

const TableList = () => {
  const { tableId, setTableId } = useTableContext();
  const { data: tables = [], isLoading } = useQuery({
    queryKey: ['tables'],
    queryFn: fetchTables,
  });
  const firstTableId = tables.at(0)?.id;

  useEffect(() => {
    if (!tableId && tables.length > 0) {
      setTableId(firstTableId);
    }
  }, [firstTableId, tableId, tables]);

  const handleSelectTable = (value: string) => {
    setTableId(value);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Flex
      gap={12}
      style={{
        minWidth: 240,
        marginLeft: 12,
      }}
      align="center"
    >
      <label>Tables</label>
      <Select
        style={{ minWidth: 240 }}
        onChange={handleSelectTable}
        value={tableId || firstTableId}
        defaultValue={tableId || firstTableId}
        options={tables.map((option) => ({
          value: option?.id,
          label: option?.name,
        }))}
      />
    </Flex>
  );
};

export default TableList;
