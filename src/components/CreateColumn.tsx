import { Form, Input, Modal, Radio } from 'antd';
import { ColumnType } from '../types/Column';
import { useOptimisticMutation } from '../hooks/useOptimisticMutation';
import { addColumn } from '../apis';
import { queryClient } from '../main';
import { useEffect } from 'react';

type CreateColumnProps = {
  tableId: string;
  isModalOpen: boolean;
  toggleModalOpen: () => void;
};

const CreateColumn = ({
  tableId,
  isModalOpen,
  toggleModalOpen,
}: CreateColumnProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
    }
  }, [isModalOpen, form]);

  const addColumnMutation = useOptimisticMutation({
    mutationFn: async ({
      column,
      tableId,
    }: {
      column: ColumnType;
      tableId: string;
    }) => addColumn(column, tableId),
    queryKey: ['columns', tableId],
    onMutate: async (variables: { column: ColumnType; tableId: string }) => {
      queryClient.setQueryData(['columns', tableId], (old: ColumnType[]) => {
        return [...old, { ...variables.column, tableId }];
      });
    },
  });

  const handleOnFinish = (values: ColumnType) => {
    addColumnMutation.mutate({
      column: { ...values, headerName: values.field },
      tableId,
    });
    toggleModalOpen();
  };

  return (
    <Modal
      title="Creating new column"
      open={isModalOpen}
      onOk={form.submit}
      onCancel={toggleModalOpen}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleOnFinish}
        initialValues={{
          name: '',
          type: 'text',
        }}
      >
        <Form.Item
          label="Name"
          name="field"
          validateTrigger="onBlur"
          rules={[{ required: true, message: 'Please input the column name!' }]}
        >
          <Input placeholder="Enter column name" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Radio.Group>
            <Radio value="text">Text</Radio>
            <Radio value="number">Number</Radio>
            <Radio value="boolean">Checkbox</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateColumn;
