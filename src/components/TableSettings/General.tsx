import ColorPicker from '../../ui/ColorPicker';
import {
  BASE_THEMES,
  COLOR_SCHEMES,
  FONT_FAMILY_OPTIONS,
  FONT_UTILITY_DATA,
} from '../../utils/constants';
import PartSelector from '../PartSelector';
import { updateBaseTheme, updateColorScheme, updateParams } from '../../apis';
import { queryClient } from '../../main';
import Select from '../../ui/Select';
import { Flex } from 'antd';
import InputNumber from '../../ui/InputNumber';
import { useOptimisticMutation } from '../../hooks/useOptimisticMutation';
import {
  BaseThemesType,
  ThemeParamsType,
  TableType,
  FontFamilyType,
  ColorSchemesType,
} from '../../types/Table';

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

const General = ({ table, tableId }: { table: TableType; tableId: string }) => {
  const baseThemeMutation = useOptimisticMutation({
    mutationFn: async ({
      newBaseTheme,
      tableId,
    }: {
      newBaseTheme: BaseThemesType;
      tableId: string;
    }) => updateBaseTheme(newBaseTheme, tableId),
    queryKey: ['tables', tableId],
    onMutate: async ({ newBaseTheme, tableId }) => {
      queryClient.setQueryData(['tables', tableId], (old: TableType) => ({
        ...old,
        baseTheme: newBaseTheme,
      }));
    },
  });

  const colorSchemeMutation = useOptimisticMutation({
    mutationFn: async ({
      newColorScheme,
      tableId,
    }: {
      newColorScheme: ColorSchemesType;
      tableId: string;
    }) => updateColorScheme(newColorScheme, tableId),
    queryKey: ['tables', tableId],
    onMutate: async ({ newColorScheme, tableId }) => {
      queryClient.setQueryData(['tables', tableId], (old: TableType) => ({
        ...old,
        colorScheme: newColorScheme,
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
        label="Theme"
        value={table.baseTheme}
        setValue={(value) =>
          baseThemeMutation.mutate({
            newBaseTheme: value as BaseThemesType,
            tableId,
          })
        }
        options={Object.values(BASE_THEMES)}
      />
      <PartSelector
        label="Color Scheme"
        value={table.colorScheme}
        setValue={(value) =>
          colorSchemeMutation.mutate({
            newColorScheme: value as ColorSchemesType,
            tableId,
          })
        }
        options={Object.values(COLOR_SCHEMES)}
      />
      <Flex gap={12} justify="space-between">
        <Select
          label="Font Family"
          selectKey="fontFamily"
          styles={{ width: 180 }}
          options={FONT_FAMILY_OPTIONS}
          utilityData={FONT_UTILITY_DATA}
          defaultValue={FONT_FAMILY_OPTIONS.at(0)!.value}
          value={getFontFamilyValue(table.params.fontFamily)}
          saveValue={(value) => {
            paramsMutation.mutate({
              tableData: table,
              newParams: value,
            });
          }}
        />
        <InputNumber
          min={1}
          value={table.params.fontSize}
          label="Font Size"
          inputKey="fontSize"
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
      <ColorPicker
        showText
        label="Background Color"
        colorKey="backgroundColor"
        value={table.params.backgroundColor}
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
      <ColorPicker
        showText
        label="Foreground Color"
        colorKey="foregroundColor"
        defaultValue="#181d1f"
        value={table.params.foregroundColor}
        saveValue={(value) => {
          paramsMutation.mutate({
            tableData: table,
            newParams: value,
          });
        }}
      />
      <ColorPicker
        showText
        label="Accent Color"
        colorKey="accentColor"
        defaultValue="#2196f3"
        value={table.params.accentColor}
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

export default General;
