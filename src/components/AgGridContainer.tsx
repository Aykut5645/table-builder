import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchTableById } from '../apis/tablesApi';

const AgGridContainer = ({ children }: { children: ReactNode }) => {
  const { data: table, isLoading } = useQuery({
    queryKey: ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
    queryFn: () => fetchTableById('0bfc39f3-faea-4222-ae5d-668adfbe9147'),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      id="myGrid"
      style={{
        width: table.dimensions.width || '100%',
        height: table.dimensions.height,
      }}
    >
      {children}
    </div>
  );
};

export default AgGridContainer;
