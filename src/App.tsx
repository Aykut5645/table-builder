import { useMemo, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';

import AppLayout from './ui/AppLayout/AppLayout';
import DimensionInputs from './components/DimensionInputs';
import CustomHeader from './components/CustomHeader';
import TableActions from './components/TableActions';
import { useDimensions } from './hooks/useDimensions';
import {
  AG_GRID_THEMES,
  AG_GRID_COLOR_SCHEMES,
  AG_GRID_ICON_SET,
} from './utils/constants';
import {
  BaseThemes,
  ColorSchemes,
  IconSet,
  selectBaseTheme,
  selectColorScheme,
  selectIconSet,
  selectParams,
} from './store/tableSlice';
import { selectColumns } from './store/columnSlice';
import { selectRows, updateRow } from './store/rowSlice';
import { Row } from './store/rowSlice';

import { store } from './store/store';
import { fetchTables } from './apis/tablesApi';

const App = () => {
  const gridRef = useRef<AgGridReact<Row>>(null);
  const { width, height, handleWidthChange, handleHeightChange } =
    useDimensions();
  const dispatch = useDispatch();

  const rows = useSelector(selectRows);
  const columns = useSelector(selectColumns);

  const baseTheme = useSelector(selectBaseTheme);
  const colorScheme = useSelector(selectColorScheme);
  const iconSet = useSelector(selectIconSet);
  const params = useSelector(selectParams);

  useEffect(() => {
    fetchTables().then(console.log);
  }, []);

  const theme = useMemo(() => {
    let theme = AG_GRID_THEMES[baseTheme as BaseThemes];

    if (colorScheme)
      theme = theme.withPart(
        AG_GRID_COLOR_SCHEMES[colorScheme as ColorSchemes]
      );
    if (iconSet) theme = theme.withPart(AG_GRID_ICON_SET[iconSet as IconSet]);
    if (params) theme = theme.withParams({ ...params });

    return theme;
  }, [baseTheme, colorScheme, iconSet, params]);

  const saveNewValue = (params: any) => {
    let field = params.column.colId;
    let newRow = { ...params.data };
    newRow[field] = params.newValue;
    dispatch(updateRow(newRow));
    return false;
  };

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      editable: true,
      sortable: false,
      valueSetter: saveNewValue,
      headerComponent: CustomHeader,
      headerComponentParams: { gridRef, columns },
    }),
    []
  );

  console.log(store.getState());

  return (
    <AppLayout>
      <TableActions gridRef={gridRef} />
      <DimensionInputs
        width={width}
        height={height}
        onWidthChange={handleWidthChange}
        onHeightChange={handleHeightChange}
      />
      <div id="myGrid" style={{ width, height }}>
        <AgGridReact
          ref={gridRef}
          theme={theme}
          rowData={rows}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          domLayout={height ? undefined : 'autoHeight'}
          rowSelection={{ mode: 'singleRow' }}
          loadThemeGoogleFonts
        />
      </div>
    </AppLayout>
  );
};

export default App;

// import { useState, useRef, useMemo } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import { ColDef } from 'ag-grid-community';
// import { Button, ConfigProvider, Flex, Space, theme as antdTheme } from 'antd';
// import AppLayout from './ui/AppLayout/AppLayout';
// import {
//   themeQuartz,
//   themeAlpine,
//   themeBalham,
//   colorSchemeDark,
//   colorSchemeDarkBlue,
//   colorSchemeDarkWarm,
//   colorSchemeLight,
//   colorSchemeLightCold,
//   colorSchemeLightWarm,
//   iconSetAlpine,
//   iconSetMaterial,
//   iconSetQuartzBold,
//   iconSetQuartzLight,
//   iconSetQuartzRegular,
// } from '@ag-grid-community/theming';
// import { useTheme } from './ThemeContext';
// import PartSelector from './components/PartSelector';

// interface IRow {
//   make: string;
//   model: string;
//   price: number;
//   electric: boolean;
// }

// const defaultColDef: ColDef = {
//   flex: 1,
//   editable: true,
//   filter: true,
// };

// const themes = [themeQuartz, themeBalham, themeAlpine];

// const colorSchemes = [
//   null,
//   colorSchemeLight,
//   colorSchemeLightCold,
//   colorSchemeLightWarm,
//   colorSchemeDark,
//   colorSchemeDarkWarm,
//   colorSchemeDarkBlue,
// ];

// const iconSets = [
//   null,
//   iconSetQuartzLight,
//   iconSetQuartzRegular,
//   iconSetQuartzBold,
//   iconSetAlpine,
//   iconSetMaterial,
// ];

// const App = () => {
//   // const [baseTheme, setBaseTheme] = useState(themes[0]);
//   // const [colorScheme, setColorScheme] = useState(colorSchemes[0]);
//   // const [iconSet, setIconSet] = useState(iconSets[0]);

//   const { defaultAlgorithm, darkAlgorithm } = antdTheme;
//   const [rowData, setRowData] = useState<IRow[]>([
//     { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
//     { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
//     { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
//     { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
//     { make: 'Fiat', model: '500', price: 15774, electric: false },
//     { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
//   ]);

//   // const theme = useMemo(() => {
//   //   let theme = baseTheme;
//   //   if (colorScheme) {
//   //     theme = theme.withPart(colorScheme);
//   //   }
//   //   if (iconSet) {
//   //     theme = theme.withPart(iconSet);
//   //   }
//   //   return theme;
//   // }, [baseTheme, colorScheme, iconSet]);

//   const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
//     { field: 'make', headerName: 'Make' },
//     { field: 'model', headerName: 'Model' },
//     { field: 'price', headerName: 'Price' },
//     { field: 'electric', headerName: 'Electric' },
//   ]);

//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const handleClick = () => {
//     setIsDarkMode((previousValue) => !previousValue);
//   };

//   const { theme } = useTheme();

//   // Handler for changing column header
//   const handleHeaderNameChange = (index: number, newHeaderName: string) => {
//     const updatedColDefs = [...colDefs];
//     updatedColDefs[index] = {
//       ...updatedColDefs[index],
//       headerName: newHeaderName,
//     };
//     setColDefs(updatedColDefs);
//   };

//   // Adding a new row
//   const addRow = () => {
//     const newRow = { make: '', model: '', price: 0, electric: false };
//     setRowData((prev) => [...prev, newRow]);
//   };
//   const gridRef = useRef<any>(null);
//   // Deleting the selected row
//   const deleteRow = () => {
//     const selectedNodes = gridRef.current.api.getSelectedNodes();
//     const selectedData = selectedNodes.map((node: any) => node.data);
//     const newRowData = rowData.filter((row) => !selectedData.includes(row));
//     setRowData(newRowData);
//   };

//   // Adding a new column
//   const addColumn = () => {
//     const newField = `customField${colDefs.length + 1}`;
//     const newCol = {
//       field: newField,
//       headerName: `Custom Field ${colDefs.length + 1}`,
//     };
//     setColDefs((prev) => [...prev, newCol]);
//   };

//   // Delete column
//   const deleteColumn = () => {
//     if (colDefs.length > 0) {
//       setColDefs((prev) => prev.slice(0, -1));
//     }
//   };

//   const exportTableAsIframe = () => {
//     // AG Grid theme link for styling
//     const agGridCssLink = `
//       <link
//               rel="stylesheet"
//               href="https://cdn.jsdelivr.net/npm/ag-grid-community@32.3.0/styles/ag-grid.css" />

//       <link
//               rel="stylesheet"
//               href="https://cdn.jsdelivr.net/npm/ag-grid-community@32.3.0/styles/ag-theme-quartz.css" />
//     `;

//     // Create iframe content
//     const iframeHtml = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         ${agGridCssLink}
//         <script src="https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js"></script>
//         <title>AG Grid Table</title>
//       </head>
//       <body>
//         <div id="myGrid" style="height: 100%; width: 100%;"  class="ag-theme-quartz">
//           ${document.querySelector('.ag-root-wrapper')?.innerHTML}
//         </div>
//       </body>
//       </html>
//     `;

//     const blob = new Blob([iframeHtml], { type: 'text/html' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'ag-grid-table-iframe.html';
//     link.click();
//   };

//   return (
//     <ConfigProvider
//       theme={{
//         algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
//       }}
//     >
//       <AppLayout>
//         <Flex justify="space-between">
//           <Space direction="horizontal">
//             <Button onClick={addRow} color="primary" variant="solid">
//               Add Row
//             </Button>
//             <Button onClick={addColumn} color="primary" variant="solid">
//               Add Column
//             </Button>
//             <Button onClick={deleteRow} color="danger" variant="solid">
//               Delete Selected Row
//             </Button>
//             <Button onClick={deleteColumn} color="danger" variant="solid">
//               Delete Last Column
//             </Button>
//             <Button onClick={handleClick} color="primary" variant="outlined">
//               Change Theme to {isDarkMode ? 'Light' : 'Dark'}
//             </Button>
//             <Button onClick={exportTableAsIframe}>
//               Export Table as iFrame
//             </Button>
//           </Space>

//           {/* <div style={{ flex: 0 }}>
//             Theme:{' '}
//             <PartSelector
//               options={themes}
//               value={baseTheme}
//               setValue={setBaseTheme}
//             />
//             Icons:{' '}
//             <PartSelector
//               options={iconSets}
//               value={iconSet}
//               setValue={setIconSet}
//             />
//             Color scheme:{' '}
//             <PartSelector
//               options={colorSchemes}
//               value={colorScheme}
//               setValue={setColorScheme}
//             />
//           </div> */}
//         </Flex>

//         <Space style={{ marginTop: '20px' }}>
//           {colDefs.map((colDef, index) => (
//             <Flex key={colDef.field} vertical>
//               <label>{`Column ${index}`}</label>
//               <input
//                 type="text"
//                 value={colDef.headerName}
//                 onChange={(e) => handleHeaderNameChange(index, e.target.value)}
//                 placeholder={`Edit header for ${colDef.field}`}
//               />
//             </Flex>
//           ))}
//         </Space>

//         <div style={{ marginTop: 20 }}>
//           <AgGridReact
//             ref={gridRef}
//             rowData={rowData}
//             columnDefs={colDefs}
//             loadThemeGoogleFonts
//             rowSelection="single"
//             defaultColDef={defaultColDef}
//             domLayout="autoHeight"
//             theme={theme}
//           />
//         </div>
//       </AppLayout>
//     </ConfigProvider>
//   );
// };

// export default App;
