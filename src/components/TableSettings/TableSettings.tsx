import { useQuery } from '@tanstack/react-query';
import { Collapse } from 'antd';

import General from './General';
import BordersSpacing from './BordersSpasing';
import Headers from './Headers';
import Cells from './Cells';
import Icons from './Icons';
import { fetchTableById } from '../../apis';
import { createItem } from '../../utils/helpers';
import { TableType } from '../../types/Table';
import { useTableContext } from '../../hooks/useTableContext';

const TableSettings = () => {
  const { tableId } = useTableContext();
  const { data: table, isLoading } = useQuery<TableType>({
    queryKey: ['tables', tableId],
    queryFn: () => fetchTableById(tableId),
  });

  if (isLoading) return <div>Loading...</div>;
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
