import { CSSProperties } from 'react';

import { Select as AntSelect, Flex } from 'antd';
import { changeThemeParams } from '../store/tableSlice';
import { useDispatch } from 'react-redux';

type UtilityValue = string | Record<string, any>;
type UtilityData = Record<string, UtilityValue>;

type SelectProps = {
  label: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  selectKey?: string;
  placeholder?: string;
  styles?: CSSProperties;
  mode?: 'multiple' | 'tags';
  utilityData?: UtilityData | null;
  defaultValue: string;
};

const Select = ({
  label,
  selectKey,
  placeholder,
  options,
  mode,
  utilityData,
  styles,
  defaultValue,
}: SelectProps) => {
  const dispatch = useDispatch();

  // const suffix = <span>{theme[selectKey].length} / 4</span>;

  const handleChange = (value: string | string[]) => {
    if (utilityData && typeof value === 'string') {
      return dispatch(changeThemeParams({ [selectKey!]: utilityData[value] }));
    }
    if (utilityData && Array.isArray(value)) {
      const mergedResult = value
        .map((x) => utilityData[x])
        .reduce((acc: any, curr: any) => {
          return { ...acc, ...curr };
        }, {});

      return dispatch(changeThemeParams(mergedResult));
    }
    if (!isNaN(Number(value))) {
      return dispatch(changeThemeParams({ [selectKey!]: +value }));
    }
  };

  return (
    <Flex vertical gap={4}>
      <label>{label}</label>
      <AntSelect
        mode={mode}
        maxTagCount={1}
        style={{ ...styles }}
        onChange={handleChange}
        // suffixIcon={suffix}
        placeholder={placeholder}
        options={options}
        defaultValue={defaultValue}
      />
    </Flex>
  );
};

export default Select;
