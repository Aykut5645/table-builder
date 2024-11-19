import { Select, Flex } from 'antd';

type PartSelectorProps<T extends { id: string } | null> = {
  options: T[];
  value: string;
  setValue: (value: string) => void;
  label: string;
};

const PartSelector = <T extends { id: string; variant?: string } | null>({
  options,
  value,
  label,
  setValue,
}: PartSelectorProps<T>) => {
  const handleChange = (value: string) => {
    setValue(value);
  };
  
  return (
    <Flex vertical gap={4}>
      <label>{label}</label>
      <Select
        value={value}
        onChange={handleChange}
        options={options.map((option) => ({
          value: option?.id,
          label: option?.variant,
        }))}
      />
    </Flex>
  );
};

export default PartSelector;
