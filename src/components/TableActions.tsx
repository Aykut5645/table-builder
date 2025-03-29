import {
  useState,
  RefObject,
  useImperativeHandle,
  forwardRef,
  Ref,
} from 'react';
import { Button, Space, Flex } from 'antd';
import { toPng } from 'html-to-image';
import {
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { RowDataType, RowType } from '../types/Row';
import { AgGridReact } from 'ag-grid-react';
import { useTableContext } from '../hooks/useTableContext';
import CreateTable from './CreateTable';
import CreateColumn from './CreateColumn';
import { useAddRow } from '../hooks/useAddRow.tsx';
import { ColDef } from 'ag-grid-community';
import { useDeleteRow } from '../hooks/useDeleteRow.tsx';

type TableActionsProps = {
  gridRef: RefObject<AgGridReact<RowType> | null>;
  columnsCount: number;
};

const TableActions = (
  { gridRef, columnsCount }: TableActionsProps,
  ref: Ref<{ onRowSelected: () => void }>
) => {
  const { tableId, editMode, toggleEditMode } = useTableContext();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCreatingColumnModalOpen, setIsCreatingColumnModalOpen] =
    useState(false);
  const [isCreatingTableModalOpen, setIsCreatingTableModalOpen] =
    useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleRowAdded = () => {
    if (gridRef && gridRef.current) {
      const renderedNodes = gridRef.current.api.getRenderedNodes();
      const firstColumn = gridRef.current.api.getColumnDefs()?.at(0) as ColDef;
      const lastRowNode = renderedNodes[renderedNodes.length - 1];
      gridRef.current.api.ensureNodeVisible(lastRowNode);

      setTimeout(() => {
        gridRef!.current!.api.startEditingCell({
          rowIndex:
            lastRowNode !== undefined
              ? (lastRowNode.rowIndex as number) + 1
              : 0,
          colKey: firstColumn!.colId as string,
        });
      }, 300);
    }
  };

  const { isAddingRow, addRow } = useAddRow(handleRowAdded);
  const { isDeletingRow, deleteRow } = useDeleteRow();

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

    if (rowData) {
      addRow({ rowData, tableId });
    }
  };

  const handleDeleteRow = () => {
    if (selectedRowId) {
      deleteRow(selectedRowId);
      setSelectedRowId(null);
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

  const onRowSelected = () => {
    const selectedRow = gridRef.current?.api
      .getSelectedNodes()
      .map((node) => node)
      .at(0);

    if (selectedRow && selectedRow.data) {
      setSelectedRowId(selectedRow.data.id);
    } else {
      setSelectedRowId(null);
    }
  };

  useImperativeHandle(ref, () => ({
    onRowSelected,
  }));

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
              loading={isAddingRow}
            >
              Row
            </Button>
            {selectedRowId && (
              <Button
                icon={<DeleteOutlined />}
                color="danger"
                variant="outlined"
                onClick={handleDeleteRow}
                loading={isDeletingRow}
              >
                Row
              </Button>
            )}
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

export default forwardRef(TableActions);
