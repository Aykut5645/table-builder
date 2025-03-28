import { ChangeEvent } from 'react';
import { Input as AntInput, Flex } from 'antd';
import { InputProps as AntInputProps } from 'antd/es/input';

type InputProps = {
  inputKey: string;
  label: string;
  saveValue: (value: { [key: string]: number | string }) => void;
} & AntInputProps;

const Input = ({ inputKey, label, saveValue, ...props }: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    saveValue({ [inputKey]: e.target.value });
  };

  return (
    <Flex vertical gap={4}>
      <label>{label}</label>
      <AntInput {...props} onChange={handleChange} />
    </Flex>
  );
};

export default Input;
