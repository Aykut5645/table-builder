import { ColorPicker as AntColorPicker, Flex } from 'antd';
import { Color } from 'antd/es/color-picker';
import { changeThemeParams } from '../store/tableSlice';
import { useDispatch } from 'react-redux';

type ColorPickerProps = {
  label: string;
  colorKey: string;
  defaultValue?: string;
};

const ColorPicker = ({ label, colorKey, defaultValue }: ColorPickerProps) => {
  const dispatch = useDispatch();

  const handleChange = (value: Color) => {
    dispatch(changeThemeParams({ [colorKey]: value.toHexString() }));
  };

  return (
    <Flex vertical gap={4}>
      <label>{label}</label>
      <AntColorPicker
        showText
        defaultValue={defaultValue}
        onChangeComplete={handleChange}
      />
    </Flex>
  );
};

export default ColorPicker;
