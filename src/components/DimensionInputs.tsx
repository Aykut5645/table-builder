import { InputNumber, Space, Flex } from 'antd';

import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchTableById, updateDimensions } from '../apis/tablesApi';
import { queryClient } from '../main';

const DimensionInputs = () => {
  const { data: table, isLoading } = useQuery({
    queryKey: ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
    queryFn: () => fetchTableById('0bfc39f3-faea-4222-ae5d-668adfbe9147'),
  });

  const dimensionsMutiation = useMutation({
    mutationFn: async ({
      tableData,
      dimensions,
    }: {
      tableData: any;
      dimensions: { width?: number; height?: number };
    }) => updateDimensions(tableData, dimensions),
    onMutate: async ({
      tableData,
      dimensions,
    }: {
      tableData: any;
      dimensions: { width?: number; height?: number };
    }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
      });

      // Snapshot the previous value
      const previousTable = queryClient.getQueryData([
        'tables',
        '0bfc39f3-faea-4222-ae5d-668adfbe9147',
      ]);
      console.log('Dimensions => ', dimensions);
      // Optimistically update to the new value
      queryClient.setQueryData(
        ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
        (old: any) => {
          return {
            ...old,
            dimensions: {
              ...tableData.dimensions, // Merge the existing dimensions
              ...dimensions, // Overwrite with the new dimensions
            },
          };
        }
      );

      return { previousTable };
    },
    // If the mutation fails, use the context we returned above
    /*onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ['tables', context.newTodo.id],
        context.previousTodo
      );
    },*/
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Flex justify="center" style={{ marginTop: '20px' }}>
      <Space>
        <label>Width</label>
        <InputNumber
          size="small"
          defaultValue={table.dimensions.width}
          onChange={(value) =>
            dimensionsMutiation.mutate({
              tableData: table,
              dimensions: { width: value },
            })
          }
        />
        <span>x</span>
        <label>Height</label>
        <InputNumber
          size="small"
          defaultValue={table.dimensions.height}
          onChange={(value) =>
            dimensionsMutiation.mutate({
              tableData: table,
              dimensions: { height: value },
            })
          }
        />
      </Space>
    </Flex>
  );
};

export default DimensionInputs;
