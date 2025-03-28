import { Form, Input, Modal } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { createNewTable } from '../apis';
import { queryClient } from '../main';
import { useTableContext } from '../hooks/useTableContext';

type CreateTableProps = {
  isModalOpen: boolean;
  toggleModalOpen: () => void;
};

const CreateTable = ({ isModalOpen, toggleModalOpen }: CreateTableProps) => {
  const { setTableId } = useTableContext();
  const [form] = Form.useForm();

  const { isPending, mutate } = useMutation({
    mutationFn: (value: { name: string }) => createNewTable(value),
    onSuccess: (data) => {
      setTableId(data.at(0).id);
      toggleModalOpen();
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
  });

  const handleFinish = (value: { name: string }) => {
    mutate(value);
  };

  return (
    <Modal
      title="Creating new table"
      open={isModalOpen}
      onOk={form.submit}
      onCancel={toggleModalOpen}
      confirmLoading={isPending}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          name: '',
          type: 'text',
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Please input the table name!' }]}
        >
          <Input placeholder="Enter table name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTable;
