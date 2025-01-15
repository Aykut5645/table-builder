import { ColumnHeightOutlined, ColumnWidthOutlined } from '@ant-design/icons';

import { queryClient } from '../../main';
import { TableType, ThemeParamsType } from '../../types/Table';
import ColorPicker from '../../ui/ColorPicker';
import InputNumber from '../../ui/InputNumber';
import { updateParams } from '../../apis';
import { useOptimisticMutation } from '../../hooks/useOptimisticMutation';

const Cells = ({ table, tableId }: { table: TableType; tableId: string }) => {
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
      <ColorPicker
        showText
        label="Text Color"
        colorKey="cellTextColor"
        value={table.params.cellTextColor}
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
      <ColorPicker
        showText
        label="Odd row background"
        colorKey="oddRowBackgroundColor"
        value={table.params.oddRowBackgroundColor}
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
      <InputNumber
        min={1}
        isPercent={true}
        label="Adjust vertical padding"
        inputKey="rowVerticalPaddingScale"
        prefix={<ColumnHeightOutlined />}
        defaultValue={100}
        value={
          table.params.rowVerticalPaddingScale
            ? Math.round(table.params.rowVerticalPaddingScale * 100)
            : 100
        }
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
      <InputNumber
        min={1}
        isPercent={true}
        label="Adjust horizontal padding"
        inputKey="cellHorizontalPaddingScale"
        prefix={<ColumnWidthOutlined />}
        defaultValue={100}
        value={
          table.params.cellHorizontalPaddingScale
            ? Math.round(table.params.cellHorizontalPaddingScale * 100)
            : 100
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

export default Cells;
