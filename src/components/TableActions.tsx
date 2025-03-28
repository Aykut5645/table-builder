import { useState, RefObject } from 'react';
import { Button, Space, Flex } from 'antd';
import { toPng } from 'html-to-image';
import {
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { addRow, deleteSelectedRow } from '../apis';
import { queryClient } from '../main';
import { useOptimisticMutation } from '../hooks/useOptimisticMutation';
import { RowDataType, RowType } from '../types/Row';
import { AgGridReact } from 'ag-grid-react';
import { useTableContext } from '../hooks/useTableContext';
import CreateTable from './CreateTable';
import CreateColumn from './CreateColumn';

type TableActionsProps = {
  gridRef: RefObject<AgGridReact<RowType> | null>;
  columnsCount: number;
};

const TableActions = ({ gridRef, columnsCount }: TableActionsProps) => {
  const { tableId, editMode, toggleEditMode } = useTableContext();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCreatingColumnModalOpen, setIsCreatingColumnModalOpen] =
    useState(false);
  const [isCreatingTableModalOpen, setIsCreatingTableModalOpen] =
    useState(false);

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

  const handleAddRow = async () => {
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
    setIsDownloading(true);
    const tableElement = document.querySelector('#myGrid') as HTMLDivElement;

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
        )
        .finally(() => {
          setIsDownloading(false);
        });
    } else {
      setIsDownloading(false);
    }
  };

  const handleToggleCreatingColumnModal = () => {
    setIsCreatingColumnModalOpen((prevValue) => !prevValue);
  };

  const handleToggleCreatingTableModal = () => {
    setIsCreatingTableModalOpen((prevValue) => !prevValue);
  };

  const hasColumns = Boolean(columnsCount);

  return (
    <Flex justify="space-between" wrap="wrap" style={{ marginBottom: 20 }}>
      <CreateTable
        isModalOpen={isCreatingTableModalOpen}
        toggleModalOpen={handleToggleCreatingTableModal}
      />

      <CreateColumn
        isModalOpen={isCreatingColumnModalOpen}
        toggleModalOpen={handleToggleCreatingColumnModal}
        tableId={tableId}
      />

      <Space direction="horizontal">
        <Button
          onClick={handleToggleCreatingColumnModal}
          icon={<PlusOutlined />}
          color="primary"
          variant="outlined"
        >
          Column
        </Button>

        {hasColumns && (
          <>
            <Button
              icon={<PlusOutlined />}
              color="primary"
              variant="outlined"
              onClick={hasColumns ? handleAddRow : undefined}
            >
              Row
            </Button>
            <Button
              icon={<DeleteOutlined />}
              color="danger"
              variant="outlined"
              onClick={handleDeleteRow}
            >
              Row
            </Button>
            <Button onClick={toggleEditMode}>
              {editMode && hasColumns
                ? 'Stop editing...'
                : 'Edit Column Headers'}
            </Button>
          </>
        )}

        <Button
          onClick={handleToggleCreatingTableModal}
          icon={<PlusOutlined />}
        >
          New table
        </Button>
      </Space>

      <Button
        type="primary"
        icon={<DownloadOutlined />}
        loading={isDownloading}
        onClick={captureTableAsImage}
      >
        Image
      </Button>
    </Flex>
  );
};

export default TableActions;
