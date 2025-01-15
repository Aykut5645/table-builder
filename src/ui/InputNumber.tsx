import { CSSProperties } from 'react';
import { Flex, InputNumber as AntInputNumber } from 'antd';
import { InputNumberProps as AntInputNumberProps } from 'antd/es/input-number';

type InputNumberProps = {
  label: string;
  inputKey: string;
  isPercent?: boolean;
  styles?: CSSProperties;
  saveValue: (value: { [key: string]: number | string }) => void;
} & AntInputNumberProps;

const InputNumber = ({
  label,
  inputKey,
  isPercent,
  styles,
  saveValue,
  ...props
}: InputNumberProps) => {
  const handleChange = (value: number | string | null) => {
    if (value) {
      const modifiedValue = isPercent
        ? parseFloat((+value / 100).toFixed(2))
        : value;

      saveValue({
        [inputKey]: modifiedValue,
      });
    }
  };

  return (
    <Flex vertical gap={4}>
      <label>{label}</label>
      <AntInputNumber
        {...props}
        onChange={handleChange}
        style={{ width: '100%', ...styles }}
      />
    </Flex>
  );
};

export default InputNumber;
