import { useCallback, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import CustomHeader from './components/CustomHeader';
import AgGridContainer from './components/AgGridContainer';
import { ColDef, ValueSetterFunc } from 'ag-grid-community';
import {
  COLOR_SCHEMES,
  BASE_THEMES,
  ICON_SETS,
  CELL_TYPES,
} from './utils/constants';

import {
  deleteColumn,
  fetchColumns,
  fetchRows,
  fetchTableById,
  updateRow,
} from './apis';
import TableActions from './components/TableActions';
import { useOptimisticMutation } from './hooks/useOptimisticMutation';
import { queryClient } from './main';
import { TableType } from './types/Table';
import DimensionInputs from './components/DimensionInputs';
import { ColumnCellType, ColumnType } from './types/Column';
import { RowType, RowDataType } from './types/Row';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { useTableContext } from './hooks/useTableContext';
import EmptyTables from './components/EmptyTables';
import { Flex, Spin } from 'antd';

ModuleRegistry.registerModules([AllCommunityModule]);

const AgGrid = () => {
  const gridRef = useRef<AgGridReact<RowType>>(null);
  const { tableId } = useTableContext();

  const { data: table, isLoading: isLoadingTable } = useQuery<TableType>({
    queryKey: ['tables', tableId],
    queryFn: () => fetchTableById(tableId),
    enabled: !!tableId,
  });
  const { data: columns = [], isLoading: isLoadingColumns } = useQuery<
    ColumnType[]
  >({
    queryKey: ['columns', tableId],
    queryFn: () => fetchColumns(tableId),
    enabled: !!tableId,
  });
  const { data: rows = [], isLoading: isLoadingRows } = useQuery<RowType[]>({
    queryKey: ['rows', tableId],
    queryFn: () => fetchRows(tableId),
    enabled: !!tableId,
  });

  const theme = useMemo(() => {
    if (!table) return undefined;
    const { baseTheme, colorScheme, iconSet, params } = table;
    let currentTheme = BASE_THEMES.find((t) => t.id === baseTheme)?.value;

    if (currentTheme && colorScheme) {
      const currentColorScheme = COLOR_SCHEMES.find(
        (x) => x.id === colorScheme
      )?.value;
      currentTheme = currentTheme.withPart(currentColorScheme!);
    }
    if (currentTheme && iconSet) {
      const currentIconSet = ICON_SETS.find((i) => i.id === iconSet)?.value;
      currentTheme = currentTheme.withPart(currentIconSet!);
    }
    if (currentTheme && params) {
      currentTheme = currentTheme.withParams(params);
    }

    return currentTheme;
  }, [table]);

  const columnDefs: ColDef[] = useMemo(() => {
    if (!columns) return [];

    return columns.map((col) => ({
      field: col.field,
      headerName: col.headerName,
      cellDataType: CELL_TYPES[col.type as ColumnCellType],
      headerComponentParams: {
        id: col.id,
      },
    }));
  }, [columns]);

  const components = useMemo(() => {
    return { agColumnHeader: CustomHeader };
  }, []);

  const rowEditMutation = useOptimisticMutation({
    mutationFn: async (newDataRow: RowDataType) => updateRow(newDataRow),
    queryKey: ['rows', tableId],
    onMutate: async (newDataRow: RowDataType) => {
      queryClient.setQueryData(['rows', tableId], (old: RowType[]) => {
        return old.map((row) =>
          row.id === newDataRow.id ? { ...row, data: newDataRow } : row
        );
      });
    },
  });

  const deleteColumnMutation = useOptimisticMutation({
    mutationFn: deleteColumn,
    queryKey: ['columns', tableId],
    onMutate: async (columnId: number) => {
      queryClient.setQueryData(['columns', tableId], (old: ColumnType[]) => {
        return old.filter((x: ColumnType) => x.id !== columnId);
      });
    },
  });

  // AG Grid valueSetter
  const handleValueSetter: ValueSetterFunc<RowDataType> = useCallback(
    (params) => {
      const {
        data: rowData,
        colDef: { field: headerName },
        newValue,
      } = params;
      if (rowData && headerName) {
        rowData[headerName] = newValue;
        rowEditMutation.mutate({ ...rowData, [headerName]: newValue });
        return true;
      }
      return false;
    },
    [rowEditMutation]
  );

  const defaultColDef: ColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      editable: true,
      sortable: false,
      valueSetter: handleValueSetter,
    }),
    [handleValueSetter]
  );

  if (isLoadingTable || isLoadingColumns || isLoadingRows) {
    return (
      <Flex
        align="center"
        gap="middle"
        justify="center"
        style={{
          paddingTop: 120,
        }}
      >
        <Spin size="large" />
      </Flex>
    );
  }

  if (!table) return <EmptyTables />;

  return (
    <>
      <TableActions gridRef={gridRef} columnsCount={columns.length} />
      <DimensionInputs
        tHeight={table.dimensions.height || 0}
        tWidth={table.dimensions.width || 0}
      />
      <AgGridContainer
        tHeight={table.dimensions.height || 0}
        tWidth={table.dimensions.width || 0}
      >
        <AgGridReact
          ref={gridRef}
          theme={theme}
          components={components}
          rowData={rows?.map((x) => ({ id: x.id, ...x.data }))}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          domLayout={table.dimensions.height ? undefined : 'autoHeight'}
          loadThemeGoogleFonts
          rowSelection="single"
          onDragStopped={(event) => {
            if (event.target?.classList.contains('ag-header-cell-moving')) {
              const columnId = (
                event.target.lastElementChild?.firstChild as HTMLSpanElement
              )?.id;
              deleteColumnMutation.mutate(+columnId);
            }
          }}
        />
      </AgGridContainer>
    </>
  );
};

export default AgGrid;
