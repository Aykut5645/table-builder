import { useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';

import AppLayout from './ui/AppLayout/AppLayout';
import DimensionInputs from './components/DimensionInputs';
import CustomHeader from './components/CustomHeader';
import TableActions from './components/TableActions';
import AgGridContainer from './components/AgGridContainer';

import {
  AG_GRID_THEMES,
  AG_GRID_COLOR_SCHEMES,
  AG_GRID_ICON_SET,
} from './utils/constants';
import { BaseThemes, ColorSchemes, IconSet } from './store/tableSlice';
import { Row } from './store/rowSlice';

import { fetchTableById } from './apis/tablesApi';

const App = () => {
  const gridRef = useRef<AgGridReact<Row>>(null);
  const { data: table, isLoading } = useQuery({
    queryKey: ['tables', '0bfc39f3-faea-4222-ae5d-668adfbe9147'],
    queryFn: () => fetchTableById('0bfc39f3-faea-4222-ae5d-668adfbe9147'),
  });

  const theme = useMemo(() => {
    if (!table) return null;
    const { baseTheme, colorScheme, iconSet, params } = table;
    let computedTheme = AG_GRID_THEMES[baseTheme as BaseThemes];

    if (colorScheme)
      computedTheme = computedTheme.withPart(
        AG_GRID_COLOR_SCHEMES[colorScheme as ColorSchemes]
      );

    if (iconSet)
      computedTheme = computedTheme.withPart(
        AG_GRID_ICON_SET[iconSet as IconSet]
      );

    if (params) computedTheme = computedTheme.withParams(params);

    return computedTheme;
  }, [table]);

  /*const saveNewValue = (params: any): boolean => {
    const field = params.column.colId;
    const rowData = { ...params.data };
    const newValue = params.newValue;
    const index = params.node.id;
    // newRow[field] = params.newValue;
    console.log('Params => ', params);

    if (field && rowData && newValue) {
      updateRowName(field, newValue, index)
        .then(() => {
          console.log('Row updated successfully');
        })
        .catch((error) => {
          console.error('Error updating row:', error);
        });
      return true;
    }
    return false;
    /*if (field && newRow) {
      updateRowName(tableId, rowId, newValue)
        .then(() => {
          console.log('Row updated successfully');
        })
        .catch((error) => {
          console.error('Error updating row:', error);
        });
      return true;
    }
  };*/

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      editable: true,
      sortable: false,
      // valueSetter: saveNewValue,
      headerComponent: CustomHeader,
      headerComponentParams: {
        gridRef,
        columns: table?.columns,
      },
    }),
    []
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <AppLayout>
      <TableActions gridRef={gridRef} />
      <DimensionInputs />
      <AgGridContainer>
        <AgGridReact
          ref={gridRef}
          theme={theme!}
          rowData={table.rows}
          columnDefs={table.columns}
          defaultColDef={defaultColDef}
          domLayout={table.dimensions.height ? undefined : 'autoHeight'}
          rowSelection={{ mode: 'singleRow' }}
          loadThemeGoogleFonts
        />
      </AgGridContainer>
    </AppLayout>
  );
};

export default App;
