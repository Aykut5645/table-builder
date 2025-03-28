import { Button, Dropdown, Checkbox, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { useTableContext } from '../hooks/useTableContext';
import { GridOptionsType } from '../context/TableContext';
import { GRID_OPTION_TYPES } from '../utils/constants';

const GridFeatures = () => {
  const { setSelectedFeatures } = useTableContext();

  const handleCheckboxChange = (checkedValues: string[]) => {
    const updatedFeatures = Object.keys(GRID_OPTION_TYPES).reduce(
      (acc, key) => ({
        ...acc,
        [key]: checkedValues.includes(
          GRID_OPTION_TYPES[key as keyof typeof GRID_OPTION_TYPES]
        ),
      }),
      {} as GridOptionsType
    );

    setSelectedFeatures(updatedFeatures);
  };

  return (
    <Dropdown
      trigger={['click']}
      dropdownRender={() => (
        <div
          style={{
            padding: '10px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Checkbox.Group onChange={handleCheckboxChange}>
            <Space direction="vertical">
              {Object.values(GRID_OPTION_TYPES).map((x) => (
                <Checkbox key={x} value={x}>
                  {x}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </div>
      )}
    >
      <Button size="large">
        Grid Features <SettingOutlined />
      </Button>
    </Dropdown>
  );
};

export default GridFeatures;
