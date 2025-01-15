import { InputNumber, Space, Flex, Button } from 'antd';

import { updateDimensions } from '../apis';
import { queryClient } from '../main';
import { useTableContext } from '../hooks/useTableContext';
import { DimensionsType, TableType } from '../types/Table';
import { useOptimisticMutation } from '../hooks/useOptimisticMutation';

type DimensionInputsProps = {
  tWidth: number;
  tHeight: number;
};

const DimensionInputs = ({ tWidth, tHeight }: DimensionInputsProps) => {
  const { tableId } = useTableContext();

  const paramsMutation = useOptimisticMutation({
    mutationFn: async ({
      currentDimensions,
      dimension,
      tableId,
    }: {
      currentDimensions: DimensionsType;
      dimension: DimensionsType;
      tableId: string;
    }) => updateDimensions(currentDimensions, dimension, tableId),
    queryKey: ['tables', tableId],
    onMutate: async ({ currentDimensions, dimension, tableId }) => {
      queryClient.setQueryData(['tables', tableId], (old: TableType) => ({
        ...old,
        dimensions: {
          ...currentDimensions,
          ...dimension,
        },
      }));
    },
  });

  return (
    <Flex justify="center" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Space>
        <label>Width</label>
        <InputNumber
          size="small"
          value={tWidth}
          defaultValue={0}
          min={0}
          onChange={(value) =>
            paramsMutation.mutate({
              currentDimensions: { width: tWidth, height: tHeight },
              dimension: { width: value ?? tWidth },
              tableId,
            })
          }
        />
        <span>x</span>
        <label>Height</label>
        <InputNumber
          size="small"
          value={tHeight}
          defaultValue={0}
          min={0}
          onChange={(value) =>
            paramsMutation.mutate({
              currentDimensions: { width: tWidth, height: tHeight },
              dimension: { height: value ?? tWidth },
              tableId,
            })
          }
        />

        <Button
          size="small"
          onClick={() =>
            paramsMutation.mutate({
              currentDimensions: { width: 0, height: 0 },
              dimension: {},
              tableId,
            })
          }
        >
          Reset
        </Button>
      </Space>
    </Flex>
  );
};

export default DimensionInputs;
