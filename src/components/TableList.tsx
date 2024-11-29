import { Flex, Select } from 'antd';
import { useFetchTablesQuery } from '../store/tablesApi';
import { useQuery } from '@tanstack/react-query';
import { fetchTables } from '../apis/tablesApi';

const TableList = () => {
  // const { data: tables, isLoading } = useFetchTablesQuery({});

  // if (isLoading) return <span>Loading...</span>;
  const { data: tables } = useQuery({
    queryKey: ['tables'],
    queryFn: fetchTables,
  });

  return (
    <Flex vertical gap={4} style={{ margin: '8px' }}>
      <label>Tables</label>
      <Select
        options={tables?.map((option) => ({
          value: option?.id,
          label: option?.name,
        }))}
      />
    </Flex>
  );
};

export default TableList;
