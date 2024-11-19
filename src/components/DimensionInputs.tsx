import { InputNumber, Space, Flex } from 'antd';

interface DimensionInputsProps {
  width: string;
  height: string;
  onWidthChange: (value: number | string | null) => void;
  onHeightChange: (value: number | string | null) => void;
}

const DimensionInputs = ({
  onWidthChange,
  onHeightChange,
}: DimensionInputsProps) => {
  return (
    <Flex justify="center" style={{ marginTop: '20px' }}>
      <Space>
        <label>Width</label>
        <InputNumber size="small" onChange={onWidthChange} />
        <span>x</span>
        <label>Height</label>
        <InputNumber size="small" onChange={onHeightChange} />
      </Space>
    </Flex>
  );
};

export default DimensionInputs;
