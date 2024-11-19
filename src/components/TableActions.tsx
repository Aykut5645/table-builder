import { useDispatch, useSelector } from 'react-redux';
import { Button, Space, Flex } from 'antd';
import { toPng } from 'html-to-image';
import {
  DownloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { addRows, removeRows } from '../store/rowSlice';
import {
  addColumn,
  removeColumn,
  selectIsColumnsEditMode,
  startColumnsEditMode,
} from '../store/columnSlice';

const TableActions = ({ gridRef }: { gridRef: React.RefObject<any> }) => {
  const dispatch = useDispatch();
  const startEditColumnHeaders = useSelector(selectIsColumnsEditMode);

  const handleAddRow = () => {
    dispatch(addRows({ make: '', model: '', price: 0, electric: false }));
  };

  const handleDeleteRow = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node: any) => node.data);
    dispatch(removeRows(selectedData));
  };

  const handleAddColumn = () => {
    dispatch(
      addColumn({
        field: 'New custom field',
        headerName: `New custom field`,
      })
    );
  };

  const handleEditColumnHeader = () => {
    dispatch(startColumnsEditMode());
  };

  const handleDeleteColumn = () => {
    dispatch(removeColumn());
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
        .catch((error) => {
          console.error('Error capturing table as image:', error);
        });
    }
  };

  return (
    <Flex justify="space-between" wrap="wrap">
      <Space direction="horizontal">
        <Button
          icon={<PlusOutlined />}
          color="primary"
          variant="outlined"
          onClick={handleAddRow}
        >
          Add Row
        </Button>
        <Button
          onClick={handleAddColumn}
          icon={<PlusOutlined />}
          color="primary"
          variant="outlined"
        >
          Add Column
        </Button>
        <Button
          icon={<DeleteOutlined />}
          color="danger"
          variant="outlined"
          onClick={handleDeleteRow}
        >
          Delete Selected Row
        </Button>
        <Button
          icon={<DeleteOutlined />}
          color="danger"
          variant="outlined"
          onClick={handleDeleteColumn}
        >
          Delete Last Column
        </Button>
        <Button onClick={handleEditColumnHeader}>
          {startEditColumnHeaders ? 'Stop Column Headers' : 'Change Column Headers'}
        </Button>
      </Space>

      <Button
        type="primary"
        // size="large"
        icon={<DownloadOutlined />}
        onClick={captureTableAsImage}
      >
        Image
      </Button>
    </Flex>
  );
};

export default TableActions;

// import { Button, Space } from 'antd';
// import { toPng } from 'html-to-image';

// const TableActions = () => {
//   const captureTableAsImage = () => {
//     const tableElement = gridRef.current?.root?.eRootWrapperBody;

//     if (tableElement) {
//       toPng(tableElement)
//         .then((dataUrl) => {
//           const link = document.createElement('a');
//           link.href = dataUrl;
//           link.download = 'table.png';
//           link.click();
//         })
//         .catch((error) => {
//           console.error('Error capturing table as image:', error);
//         });
//     }
//   };

//   return (
//     <Space direction="horizontal">
//       <Button onClick={addRow} color="primary" variant="solid">
//         Add Row
//       </Button>
//       <Button onClick={addColumn} color="primary" variant="solid">
//         Add Column
//       </Button>
//       <Button onClick={deleteRow} color="danger" variant="solid">
//         Delete Selected Row
//       </Button>
//       <Button onClick={deleteColumn} color="danger" variant="solid">
//         Delete Last Column
//       </Button>
//       <Button type="primary" onClick={captureTableAsImage}>
//         Export Table as Image
//       </Button>
//       {/* Uncomment if needed */}
//       {/* <Button onClick={handleClick} color="primary" variant="outlined">
//         Change Theme to {isDarkMode ? 'Light' : 'Dark'}
//       </Button>
//       <Button onClick={exportTableAsIframe}>Export Table as iFrame</Button> */}
//     </Space>
//   );
// };

// export default TableActions;
