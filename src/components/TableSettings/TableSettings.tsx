import { Collapse, Flex } from 'antd';
import {
  ColumnHeightOutlined,
  RadiusUpleftOutlined,
  ColumnWidthOutlined,
} from '@ant-design/icons';

import Select from '../../ui/Select';
import ColorPicker from '../../ui/ColorPicker';
import InputNumber from '../../ui/InputNumber';
import FontSettings from '../../FontSettings';
import PartSelector from '../PartSelector';
import { BORDERS_OPTIONS, BORDERS_UTILITY_DATA } from '../../utils/constants';
import {
  setIconSet,
  setBaseTheme,
  setColorScheme,
  selectBaseTheme,
  selectColorScheme,
  selectIconSet,
  BaseThemes,
  ColorSchemes,
  IconSet,
} from '../../store/tableSlice';
import {
  AG_GRID_THEMES,
  AG_GRID_COLOR_SCHEMES,
  AG_GRID_ICON_SET,
} from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchTableById,
  updateBaseTheme,
  updateColorScheme,
  updateIconSet,
  updateParams,
} from '../../apis/tablesApi';
import { queryClient } from '../../main';

const TableSettings = () => {
  const { data: table } = useQuery({
    queryKey: ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
    queryFn: () => fetchTableById('0bfc39f3-faea-4222-ae5d-668adfbe9147'),
  });

  const themeMutation = useMutation({
    mutationFn: updateBaseTheme,
    // When mutate is called:
    onMutate: async (newBaseTheme: string) => {
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

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
        (old: any) => ({
          ...old,
          baseTheme: newBaseTheme,
        })
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

  const colorSchemeMutation = useMutation({
    mutationFn: updateColorScheme,
    // When mutate is called:
    onMutate: async (newColorScheme: string) => {
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

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
        (old: any) => ({
          ...old,
          colorScheme: newColorScheme,
        })
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

  const iconSetMutation = useMutation({
    mutationFn: updateIconSet,
    // When mutate is called:
    onMutate: async (newIconSet: string) => {
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

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
        (old: any) => ({
          ...old,
          iconSet: newIconSet,
        })
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

  const paramsMutation = useMutation({
    mutationFn: async ({
      tableData,
      newParams,
    }: {
      tableData: any;
      newParams: any;
    }) => updateParams(tableData, newParams),
    // When mutate is called:
    onMutate: async ({ tableData, newParams }) => {
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

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
        (old: any) => ({
          ...old,
          params: {
            ...tableData.params, // Use the current table params
            ...newParams, // Merge with the new parameters
          },
        })
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

  // const theme = useSelector(selectBaseTheme);
  const colorScheme = useSelector(selectColorScheme);
  const iconSet = useSelector(selectIconSet);

  return (
    <Collapse>
      {/* General Section */}
      <Collapse.Panel header="General" key="1">
        <PartSelector
          label="Theme"
          value={table?.baseTheme}
          setValue={(value) => themeMutation.mutate(value as BaseThemes)}
          options={Object.values(AG_GRID_THEMES)}
        />
        <PartSelector
          label="Color Scheme"
          value={colorScheme}
          setValue={(value) =>
            colorSchemeMutation.mutate(value as ColorSchemes)
          }
          options={Object.values(AG_GRID_COLOR_SCHEMES)}
        />
        <FontSettings fontKey="fontFamily/fontFamily" />
        <ColorPicker
          label="Background Color"
          colorKey="backgroundColor"
          defaultValue="#FFF"
          saveValue={(value) => {
            paramsMutation.mutate({
              tableData: table, // Pass the current table data
              newParams: value, // Pass the new parameter value
            });
          }}
        />
        <ColorPicker
          label="Foreground Color"
          colorKey="foregroundColor"
          defaultValue="#181d1f"
        />
        <ColorPicker
          label="Accent Color"
          colorKey="accentColor"
          defaultValue="#2196f3"
        />
      </Collapse.Panel>

      {/* Borders & Spacing Section */}
      <Collapse.Panel header="Borders & Spacing" key="2">
        <ColorPicker
          label="Border Color"
          colorKey="borderColor"
          defaultValue="#181d1f"
        />
        <Select
          label="Borders"
          placeholder="None"
          mode="multiple"
          options={BORDERS_OPTIONS}
          utilityData={BORDERS_UTILITY_DATA}
        />
        <InputNumber
          label="Spacing"
          inputKey="spacing"
          defaultValue={8}
          prefix={<ColumnHeightOutlined />}
        />
        <Flex gap={12}>
          <InputNumber
            label="Wrapper radius"
            inputKey="wrapperBorderRadius"
            defaultValue={8}
            prefix={<RadiusUpleftOutlined />}
          />
          <InputNumber
            label="Widget radius"
            inputKey="borderRadius"
            defaultValue={4}
            prefix={<RadiusUpleftOutlined />}
          />
        </Flex>
      </Collapse.Panel>

      {/* Headers Section */}
      <Collapse.Panel header="Headers" key="3">
        <ColorPicker
          label="Text Color"
          colorKey="headerTextColor"
          defaultValue="#181d1f"
        />
        <ColorPicker
          label="Background Color"
          colorKey="headerBackgroundColor"
          defaultValue="#181d1f"
        />
        <FontSettings
          fontKey="headerFontFamily/headerFontSize"
          // defaultValue={500}
        />
        <InputNumber
          label="Adjust vertical padding"
          inputKey="headerVerticalPaddingScale"
          prefix={<ColumnHeightOutlined />}
          defaultValue={100}
          isPercent={true}
        />
      </Collapse.Panel>

      {/* Cells Section */}
      <Collapse.Panel header="Cells" key="4">
        <ColorPicker
          label="Text Color"
          colorKey="cellTextColor"
          defaultValue="#181d1f"
        />
        <ColorPicker
          label="Odd row background"
          colorKey="oddRowBackgroundColor"
          defaultValue="#FFF"
        />
        <InputNumber
          label="Adjust vertical padding"
          inputKey="rowVerticalPaddingScale"
          prefix={<ColumnHeightOutlined />}
          defaultValue={100}
        />
        <InputNumber
          label="Adjust horizontal padding"
          inputKey="cellHorizontalPaddingScale"
          prefix={<ColumnWidthOutlined />}
          defaultValue={100}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Icons" key="5">
        <PartSelector
          label="Icon Set"
          value={iconSet}
          setValue={(value) => iconSetMutation.mutate(value as IconSet)}
          options={Object.values(AG_GRID_ICON_SET)}
        />
        <InputNumber label="Size" inputKey="iconSize" defaultValue={16} />
      </Collapse.Panel>
    </Collapse>
  );
};

export default TableSettings;
