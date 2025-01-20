import ColorPicker from '../../ui/ColorPicker';
import InputNumber from '../../ui/InputNumber';
import { ColumnHeightOutlined } from '@ant-design/icons';
import { updateParams } from '../../apis';
import { queryClient } from '../../main';
import {
  FONT_WEIGHT_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_UTILITY_DATA,
} from '../../utils/constants';
import { Flex } from 'antd';
import Select from '../../ui/Select';
import { useOptimisticMutation } from '../../hooks/useOptimisticMutation';
import { FontFamilyType, TableType, ThemeParamsType } from '../../types/Table';
import { useState } from 'react';

export const getFontFamilyValue = (fontFamily?: FontFamilyType): string => {
  if (!fontFamily) return FONT_FAMILY_OPTIONS.at(0)!.value;
  if (typeof fontFamily === 'string') return fontFamily;
  if (
    typeof fontFamily === 'object' &&
    !Array.isArray(fontFamily) &&
    'googleFont' in fontFamily
  ) {
    return fontFamily.googleFont;
  }
  return FONT_FAMILY_OPTIONS.at(0)!.value;
};

const Headers = ({ table, tableId }: { table: TableType; tableId: string }) => {
  const [localHeaderTextColor, setLocalHeaderTextColor] = useState(
    table.params.headerTextColor
  );
  const [localHeaderBackgroundColor, setLocalHeaderBackgroundColor] = useState(
    table.params.headerBackgroundColor
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
        if ('headerTextColor' in newParams) {
          setLocalHeaderTextColor(newParams.headerTextColor as string);
        }
        if ('headerBackgroundColor' in newParams) {
          setLocalHeaderBackgroundColor(
            newParams.headerBackgroundColor as string
          );
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
        allowClear
        showText
        label="Background Color"
        colorKey="headerBackgroundColor"
        defaultValue="#fbfbfb"
        value={localHeaderBackgroundColor}
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
        label="Text Color"
        colorKey="headerTextColor"
        defaultValue="#181d1f"
        value={localHeaderTextColor}
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
      <Flex gap={12} justify="space-between">
        <Select
          label="Font Family"
          selectKey="headerFontFamily"
          styles={{ width: 180 }}
          options={FONT_FAMILY_OPTIONS}
          utilityData={FONT_UTILITY_DATA}
          defaultValue={FONT_FAMILY_OPTIONS.at(0)!.value}
          value={getFontFamilyValue(table.params.headerFontFamily)}
          saveValue={(value) => {
            paramsMutation.mutate({
              tableData: table,
              newParams: value,
            });
          }}
        />
        <InputNumber
          min={1}
          value={table.params.headerFontSize}
          label="Font Size"
          inputKey="headerFontSize"
          defaultValue={14}
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
      </Flex>
      <Select
        label="Font weight"
        value={
          table.params.headerFontWeight || FONT_WEIGHT_OPTIONS.at(4)!.value
        }
        defaultValue={FONT_WEIGHT_OPTIONS.at(4)!.value}
        selectKey="headerFontWeight"
        options={FONT_WEIGHT_OPTIONS}
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
        inputKey="headerVerticalPaddingScale"
        prefix={<ColumnHeightOutlined />}
        value={
          table.params.headerVerticalPaddingScale
            ? Math.round(table.params.headerVerticalPaddingScale * 100)
            : 100
        }
        defaultValue={100}
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

export default Headers;
