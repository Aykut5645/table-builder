import InputNumber from '../../ui/InputNumber';
import { updateIconSet, updateParams } from '../../apis';
import { queryClient } from '../../main';
import { ICON_SETS } from '../../utils/constants';
import PartSelector from '../PartSelector';
import { IconSetType, TableType, ThemeParamsType } from '../../types/Table';
import { useOptimisticMutation } from '../../hooks/useOptimisticMutation';

const Icons = ({ table, tableId }: { table: TableType; tableId: string }) => {
  const iconSetMutation = useOptimisticMutation({
    mutationFn: async ({
      newIconSet,
      tableId,
    }: {
      newIconSet: IconSetType;
      tableId: string;
    }) => updateIconSet(newIconSet, tableId),
    queryKey: ['tables', tableId],
    onMutate: async ({ newIconSet, tableId }) => {
      queryClient.setQueryData(['tables', tableId], (old: TableType) => ({
        ...old,
        iconSet: newIconSet,
      }));
    },
  });

  const paramsMutation = useOptimisticMutation({
    mutationFn: async ({
      tableData,
      newParams,
    }: {
      tableData: TableType;
      newParams: ThemeParamsType;
    }) => updateParams(tableData, newParams),
    queryKey: ['tables', tableId],
    onMutate: async ({ tableData, newParams }) => {
      queryClient.setQueryData(['tables', tableId], (old: TableType) => ({
        ...old,
        params: {
          ...tableData.params,
          ...newParams,
        },
      }));
    },
  });

  return (
    <>
      <PartSelector
        label="Icon Set"
        value={table.iconSet}
        setValue={(value) =>
          iconSetMutation.mutate({
            newIconSet: value as IconSetType,
            tableId,
          })
        }
        options={Object.values(ICON_SETS)}
      />
      <InputNumber
        label="Size"
        inputKey="iconSize"
        defaultValue={16}
        value={table.params.iconSize}
        formatter={(value) => (value !== undefined ? `${value}px` : '')}
        parser={(value) =>
          value ? parseFloat(value.replace('px', '').trim()) : 0
        }
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
    </>
  );
};

export default Icons;
