import { CSSProperties } from 'react';
import { Select as AntSelect, Flex } from 'antd';
import { SelectProps as AntSelectProps } from 'antd/es/select';

import { FontFamilyType } from '../types/Table';

type UtilityData<TValue> = {
  [key: string]: TValue;
};

type BorderValueTypes = {
  wrapperBorder?: boolean;
  rowBorder?: boolean;
  columnBorder?: boolean;
  sidePanelBorder?: boolean;
};

type SelectProps = {
  label: string;
  value: string | number | string[];
  selectKey?: string;
  styles?: CSSProperties;
  utilityData?: UtilityData<string | BorderValueTypes | FontFamilyType> | null;
  saveValue: (value: BorderValueTypes) => void;
} & AntSelectProps;

const Select = ({
  label,
  selectKey,
  utilityData,
  styles,
  saveValue,
  ...props
}: SelectProps) => {
  const handleChange = (value: number | string | string[]) => {
    if (selectKey && typeof value === 'number') {
      saveValue({ [selectKey]: value });
    }
    if (utilityData && selectKey && typeof value === 'string') {
      saveValue({ [selectKey]: utilityData[value] as string });
    }

    if (utilityData && Array.isArray(value)) {
      const merged = value
        .map((x) => utilityData[x] as BorderValueTypes)
        .reduce(
          (acc, curr) => {
            if (typeof curr === 'object' && curr !== null) {
              if ('wrapperBorder' in curr) {
                acc.wrapperBorder = true;
              }
              if ('rowBorder' in curr) {
                acc.rowBorder = true;
              }
              if ('columnBorder' in curr) {
                acc.columnBorder = true;
              }
              if ('sidePanelBorder' in curr) {
                acc.sidePanelBorder = true;
              }
            }
            return acc;
          },
          {
            wrapperBorder: false,
            rowBorder: false,
            columnBorder: false,
            sidePanelBorder: false,
          }
        );
      saveValue(merged);
    }
  };

  return (
    <Flex vertical gap={4}>
      <label>{label}</label>
      <AntSelect {...props} style={{ ...styles }} onChange={handleChange} />
    </Flex>
  );
};

export default Select;
