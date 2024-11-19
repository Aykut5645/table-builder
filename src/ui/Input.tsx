import { ChangeEvent, ReactNode } from 'react';
import { Input as AntInput, Flex } from 'antd';
import { useDispatch } from 'react-redux';
import { changeThemeParams } from '../store/tableSlice';

type InputProps = {
  inputKey: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  prefix?: ReactNode;
};

const Input = ({
  inputKey,
  label,
  placeholder,
  defaultValue,
  prefix,
}: InputProps) => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeThemeParams({ [inputKey]: e.target.value }));
  };

  return (
    <Flex vertical gap={4}>
      <label>{label}</label>
      <AntInput
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleChange}
        prefix={prefix}
      />
    </Flex>
  );
};

export default Input;
