import { useState, RefObject } from 'react';
import { Button, Space, Flex, Modal, Input, Radio, Form } from 'antd';
import { toPng } from 'html-to-image';
import {
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { addRow, deleteSelectedRow, addColumn, createNewTable } from '../apis';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../main';
import { useOptimisticMutation } from '../hooks/useOptimisticMutation';
import { RowDataType, RowType } from '../types/Row';
import { ColumnType } from '../types/Column';
import { AgGridReact } from 'ag-grid-react';
import { useTableContext } from '../hooks/useTableContext';

const TableActions = ({
  gridRef,
}: {
  gridRef: RefObject<AgGridReact<RowType> | null>;
}) => {
  const [form] = Form.useForm();
  const [creatingTableForm] = Form.useForm();

  const { tableId, setTableId, editMode, toggleEditMode } = useTableContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingTableModalOpen, setIsCreatingTableModalOpen] =
    useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: (value: { name: string }) => createNewTable(value),
    onSuccess: (data) => {
      setTableId(data.at(0).id);
      setIsCreatingTableModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
  });

  const addRowMutation = useOptimisticMutation({
    mutationFn: async ({
      rowData,
      tableId,
    }: {
      rowData: RowDataType;
      tableId: string;
    }) => addRow(rowData, tableId),
    queryKey: ['rows', tableId],
    onMutate: async ({
      rowData,
      tableId,
    }: {
      rowData: RowDataType;
      tableId: string;
    }) => {
      queryClient.setQueryData(['rows', tableId], (old: RowType[]) => {
        return [...old, { tableId, data: rowData }];
      });
    },
  });

  const deleteRowMutation = useOptimisticMutation({
    mutationFn: deleteSelectedRow,
    queryKey: ['rows', tableId],
    onMutate: async (rowId: number) => {
      queryClient.setQueryData(['rows', tableId], (old: RowType[]) => {
        return old.filter((x: RowType) => x.id !== rowId);
      });
    },
  });

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

  const handleAddRow = () => {
    const existingColumns = gridRef.current?.api.getColumns();
    const rowData = existingColumns?.reduce((acc, column) => {
      const cellDataType = column.getUserProvidedColDef()?.cellDataType;
      const colId = column.getColId();
      if (cellDataType === 'boolean') acc[colId] = false;
      else if (cellDataType === 'number') acc[colId] = 0;
      else acc[colId] = '';
      return acc;
    }, {} as RowDataType);

    if (rowData) addRowMutation.mutate({ rowData, tableId });
  };

  const handleDeleteRow = () => {
    const selectedRow = gridRef.current?.api
      .getSelectedNodes()
      .map((node) => node)
      .at(0);

    if (selectedRow && selectedRow.data) {
      deleteRowMutation.mutate(selectedRow.data.id);
    }
  };

  const captureTableAsImage = () => {
    const tableElement = document.querySelector('.ag-root') as HTMLDivElement;

    if (tableElement) {
      toPng(tableElement)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'table.png';
          link.click();
        })
        .catch((error) =>
          console.error('Error capturing table as image:', error)
        );
    }
  };

  const handleToggleModal = () => {
    setIsModalOpen((prevValue) => !prevValue);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnFinish = (values: ColumnType) => {
    addColumnMutation.mutate({
      column: { ...values, headerName: values.field },
      tableId,
    });
    handleOk();
  };

  const handleToggleModalCreatingTable = () => {
    setIsCreatingTableModalOpen((prevValue) => !prevValue);
  };

  const handleCancelCreatingTable = () => {
    setIsCreatingTableModalOpen(false);
  };

  const handleOnFinishCreatingTable = (value: { name: string }) => {
    mutate(value);
  };

  return (
    <Flex justify="space-between" wrap="wrap" style={{ marginBottom: 20 }}>
      <Modal
        title="Creating new table"
        open={isCreatingTableModalOpen}
        onOk={creatingTableForm.submit}
        onCancel={handleCancelCreatingTable}
        confirmLoading={isPending}
      >
        <Form
          form={creatingTableForm}
          layout="vertical"
          onFinish={handleOnFinishCreatingTable}
          initialValues={{
            name: '',
            type: 'text',
          }}
        >
          {/* Column Name Field */}
          <Form.Item
            label="Name"
            name="name"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Please input the table name!' },
            ]}
          >
            <Input placeholder="Enter table name" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Creating new column"
        open={isModalOpen}
        onOk={form.submit} // Trigger form submission
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleOnFinish}
          initialValues={{
            name: '',
            type: 'text', // Default selection for the radio group
          }}
        >
          {/* Column Name Field */}
          <Form.Item
            label="Name"
            name="field"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: 'Please input the column name!' },
            ]}
          >
            <Input placeholder="Enter column name" />
          </Form.Item>

          {/* Column Type Field */}
          <Form.Item label="Type" name="type">
            <Radio.Group>
              <Radio value="text">Text</Radio>
              <Radio value="number">Number</Radio>
              <Radio value="boolean">Checkbox</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Space direction="horizontal">
        <Button
          icon={<PlusOutlined />}
          color="primary"
          variant="outlined"
          onClick={handleAddRow}
        >
          Row
        </Button>
        <Button
          onClick={handleToggleModal}
          icon={<PlusOutlined />}
          color="primary"
          variant="outlined"
        >
          Column
        </Button>
        {
          <Button
            icon={<DeleteOutlined />}
            color="danger"
            variant="outlined"
            onClick={handleDeleteRow}
          >
            Row
          </Button>
        }
        <Button onClick={toggleEditMode}>
          {editMode ? 'Stop editing...' : 'Edit Column Headers'}
        </Button>
        <Button onClick={handleToggleModalCreatingTable}>Create table</Button>
      </Space>

      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={captureTableAsImage}
      >
        Image
      </Button>
    </Flex>
  );
};

export default TableActions;
