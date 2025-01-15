import { Flex } from 'antd';
import ColorPicker from '../../ui/ColorPicker';
import InputNumber from '../../ui/InputNumber';
import Select from '../../ui/Select';
import { ColumnHeightOutlined, RadiusUpleftOutlined } from '@ant-design/icons';
import {
  BORDER_TYPES,
  BORDERS_OPTIONS,
  BORDERS_UTILITY_DATA,
} from '../../utils/constants';
import { updateParams } from '../../apis';
import { queryClient } from '../../main';
import { TableType, ThemeParamsType } from '../../types/Table';
import { useOptimisticMutation } from '../../hooks/useOptimisticMutation';

const BordersSpacing = ({
  table,
  tableId,
}: {
  table: TableType;
  tableId: string;
}) => {
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
        label="Border Color"
        colorKey="borderColor"
        defaultValue="#181d1f"
        value={table.params.borderColor}
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
      <Select
        label="Borders"
        placeholder="None"
        mode="multiple"
        maxTagCount={1}
        options={BORDERS_OPTIONS}
        utilityData={BORDERS_UTILITY_DATA}
        value={
          [
            table.params.wrapperBorder && BORDER_TYPES.AROUND_GRID,
            table.params.rowBorder && BORDER_TYPES.BETWEEN_ROWS,
            table.params.columnBorder && BORDER_TYPES.BETWEEN_COLUMNS,
            table.params.sidePanelBorder && BORDER_TYPES.AROUND_SIDE_PANEL,
          ].filter(Boolean) as string[]
        }
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
      <InputNumber
        label="Spacing"
        inputKey="spacing"
        defaultValue={8}
        prefix={<ColumnHeightOutlined />}
        value={table.params.spacing}
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
      <Flex gap={12}>
        <InputNumber
          label="Wrapper radius"
          inputKey="wrapperBorderRadius"
          defaultValue={8}
          prefix={<RadiusUpleftOutlined />}
          value={table.params.wrapperBorderRadius}
          saveValue={(value) => {
            paramsMutation.mutate({
              tableData: table,
              newParams: value,
            });
          }}
        />
        <InputNumber
          label="Widget radius"
          inputKey="borderRadius"
          defaultValue={4}
          prefix={<RadiusUpleftOutlined />}
          value={table.params.borderRadius}
          saveValue={(value) => {
            paramsMutation.mutate({
              tableData: table,
              newParams: value,
            });
          }}
        />
      </Flex>
    </>
  );
};

export default BordersSpacing;
