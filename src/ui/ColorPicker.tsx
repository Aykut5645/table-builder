import { ColorPicker as AntColorPicker, Flex } from 'antd';
import { Color } from 'antd/es/color-picker';
import { changeThemeParams } from '../store/tableSlice';

type ColorPickerProps = {
  label: string;
  colorKey: string;
  defaultValue?: string;
  saveValue: (value: Color) => void;
};

const ColorPicker = ({
  label,
  colorKey,
  defaultValue,
  saveValue,
}: ColorPickerProps) => {
  // const dispatch = useDispatch();

  const handleChange = (value: Color) => {
    saveValue({ [colorKey]: value.toHexString() });
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
