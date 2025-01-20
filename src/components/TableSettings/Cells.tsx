import { ColumnHeightOutlined, ColumnWidthOutlined } from '@ant-design/icons';

import { queryClient } from '../../main';
import { TableType, ThemeParamsType } from '../../types/Table';
import ColorPicker from '../../ui/ColorPicker';
import InputNumber from '../../ui/InputNumber';
import { updateParams } from '../../apis';
import { useOptimisticMutation } from '../../hooks/useOptimisticMutation';
import { useState } from 'react';

const Cells = ({ table, tableId }: { table: TableType; tableId: string }) => {
  const [localCellTextColor, setLocalCellTextColor] = useState(
    table.params.cellTextColor
  );
  const [localRowBackgroundColor, setLocalRowBackgroundColor] = useState(
    table.params.oddRowBackgroundColor
  );

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
      queryClient.setQueryData(['tables', tableId], (old: TableType) => {
        if ('cellTextColor' in newParams) {
          setLocalCellTextColor(newParams.cellTextColor as string);
        }
        if ('oddRowBackgroundColor' in newParams) {
          setLocalRowBackgroundColor(newParams.oddRowBackgroundColor as string);
        }
        return {
          ...old,
          params: {
            ...tableData.params,
            ...newParams,
          },
        };
      });
    },
  });

  return (
    <>
      <ColorPicker
        showText
        allowClear
        label="Text Color"
        colorKey="cellTextColor"
        defaultValue="#181d1f"
        value={localCellTextColor}
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
      <ColorPicker
        showText
        allowClear
        label="Odd row background"
        defaultValue="#fff"
        value={localRowBackgroundColor}
        colorKey="oddRowBackgroundColor"
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
        formatter={(value) => (value !== undefined ? `${value}%` : '')}
        parser={(value) =>
          value ? parseFloat(value.replace('%', '').trim()) : 0
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
        formatter={(value) => (value !== undefined ? `${value}%` : '')}
        parser={(value) =>
          value ? parseFloat(value.replace('%', '').trim()) : 0
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
