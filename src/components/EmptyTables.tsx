import { useState } from 'react';
import { Button, Typography } from 'antd';

import Empty from '../ui/Empty';
import CreateTable from './CreateTable';

const { Text: AntText } = Typography;

const EmptyTables = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleCreatingColumnModal = () => {
    setIsModalOpen((prevValue) => !prevValue);
  };

  return (
    <>
      <CreateTable
        isModalOpen={isModalOpen}
        toggleModalOpen={handleToggleCreatingColumnModal}
      />
      <Empty
        style={{
          paddingTop: 120,
          background: 'white',
          height: '100%',
        }}
        description={
          <AntText>
            There is no created table yet. Click the button below and create
            one.
          </AntText>
        }
      >
        <Button type="primary" onClick={handleToggleCreatingColumnModal}>
          Create Now
        </Button>
      </Empty>
    </>
  );
};

export default EmptyTables;
