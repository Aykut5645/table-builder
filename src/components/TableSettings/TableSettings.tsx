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

const TableSettings = () => {
  const dispatch = useDispatch();

  const theme = useSelector(selectBaseTheme);
  const colorScheme = useSelector(selectColorScheme);
  const iconSet = useSelector(selectIconSet);

  return (
    <Collapse>
      {/* General Section */}
      <Collapse.Panel header="General" key="1">
        <PartSelector
          label="Theme"
          value={theme}
          setValue={(value) => dispatch(setBaseTheme(value as BaseThemes))}
          options={Object.values(AG_GRID_THEMES)}
        />
        <PartSelector
          label="Color Scheme"
          value={colorScheme}
          setValue={(value) => dispatch(setColorScheme(value as ColorSchemes))}
          options={Object.values(AG_GRID_COLOR_SCHEMES)}
        />
        <FontSettings fontKey="fontFamily/fontFamily" />
        <ColorPicker
          label="Background Color"
          colorKey="backgroundColor"
          defaultValue="#FFF"
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
          setValue={(value) => dispatch(setIconSet(value as IconSet))}
          options={Object.values(AG_GRID_ICON_SET)}
        />
        <InputNumber label="Size" inputKey="iconSize" defaultValue={16} />
      </Collapse.Panel>
    </Collapse>
  );
};

export default TableSettings;
