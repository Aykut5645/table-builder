import { Flex } from 'antd';

import Select from './ui/Select';
import InputNumber from './ui/InputNumber';
import {
  FONT_FAMILY_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  FONT_UTILITY_DATA,
} from './utils/constants';

type FontSettingsProps = {
  fontKey:
    | 'fontFamily/fontSize'
    | 'fontFamily/fontFamily'
    | 'headerFontFamily/headerFontSize';
};

const FontSettings = ({ fontKey }: FontSettingsProps) => {
  return (
    <>
      <Flex gap={12} justify="space-between">
        <Select
          label="Font Family"
          selectKey={fontKey.split('/')[1]}
          styles={{ width: 180 }}
          options={FONT_FAMILY_OPTIONS}
          utilityData={FONT_UTILITY_DATA}
          defaultValue={FONT_FAMILY_OPTIONS[0].value}
        />
        <InputNumber
          min={1}
          label="Font Size"
          inputKey={fontKey.split('/')[1]}
          defaultValue={14}
        />
      </Flex>

      {fontKey.startsWith('header') && (
        <Select
          label="Font weight"
          selectKey="headerFontWeight"
          options={FONT_WEIGHT_OPTIONS}
        />
      )}
    </>
  );
};

export default FontSettings;
