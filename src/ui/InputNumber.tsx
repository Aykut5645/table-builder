import { CSSProperties, ReactNode } from 'react';
import { Flex, InputNumber as AntInputNumber } from 'antd';

import { useDispatch } from 'react-redux';
import { changeThemeParams } from '../store/tableSlice';

type InputNumberProps = {
  label: string;
  inputKey: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  isPercent?: boolean;
  styles?: CSSProperties;
  prefix?: ReactNode;
  size?: 	'large' | 'middle' | 'small';
};

const InputNumber = ({
  min,
  max,
  label,
  inputKey,
  defaultValue,
  isPercent,
  styles,
  prefix,
}: InputNumberProps) => {
  const dispatch = useDispatch();

  const handleChange = (value: number | null) => {
    dispatch(
      changeThemeParams({
        [inputKey]: isPercent && value !== null ? value / 100 : value,
      })
    );
  };

  return (
    <Flex vertical gap={4}>
      <label>{label}</label>
      <AntInputNumber
        min={min}
        max={max}
        defaultValue={defaultValue}
        onChange={handleChange}
        style={{ width: '100%', ...styles }}
        prefix={prefix}
      />
    </Flex>
  );
};

export default InputNumber;
