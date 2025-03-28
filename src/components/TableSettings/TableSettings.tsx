import { useQuery } from '@tanstack/react-query';
import { Collapse, Flex, Skeleton } from 'antd';

import General from './General';
import BordersSpacing from './BordersSpasing';
import Headers from './Headers';
import Cells from './Cells';
import Icons from './Icons';
import { fetchTableById } from '../../apis';
import { useTableContext } from '../../hooks/useTableContext';
import { createItem } from '../../utils/helpers';
import { TableType } from '../../types/Table';

const TableSettings = () => {
  const { tableId } = useTableContext();
  const { data: table, isLoading } = useQuery<TableType>({
    queryKey: ['tables', tableId],
    queryFn: () => fetchTableById(tableId),
    enabled: !!tableId,
  });

  if (isLoading) {
    return (
      <Flex vertical gap={8}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton.Input
            key={i}
            style={{ width: '100%' }}
            size="large"
            active={true}
          />
        ))}
      </Flex>
    );
  }

  if (!table) return <div>No table found.</div>;

  return (
    <Collapse
      items={[
        createItem('1', 'General', <General table={table} tableId={tableId} />),
        createItem(
          '2',
          'Borders & Spacing',
          <BordersSpacing table={table} tableId={tableId} />
        ),
        createItem('3', 'Headers', <Headers table={table} tableId={tableId} />),
        createItem('4', 'Cells', <Cells table={table} tableId={tableId} />),
        createItem('5', 'Icons', <Icons table={table} tableId={tableId} />),
      ]}
    />
  );
};

export default TableSettings;
