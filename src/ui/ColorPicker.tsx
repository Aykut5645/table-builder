import {
  Flex,
  ColorPicker as AntColorPicker,
  ColorPickerProps as AntColorPickerProps,
} from 'antd';
import { Color } from 'antd/es/color-picker';

type ColorPickerProps = {
  label: string;
  colorKey: string;
  saveValue: (value: { [key: string]: string }) => void;
} & AntColorPickerProps;

const ColorPicker = ({
  label,
  colorKey,
  saveValue,
  ...props
}: ColorPickerProps) => {
  const handleChange = (color: Color) => {
    saveValue({ [colorKey]: color.toHexString() });
  };

  return (
    <Flex vertical gap={4}>
      <label>{label}</label>
      <AntColorPicker {...props} onChangeComplete={handleChange} />
    </Flex>
  );
};

export default ColorPicker;
