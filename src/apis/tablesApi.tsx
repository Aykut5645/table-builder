import supabase from './supabase';

export const fetchTables = async () => {
  const { data, error } = await supabase.from('tables').select('*');

  if (error) {
    console.error('Error (fetchTables) => ', error);
    throw new Error('Tables could not to be loaded.');
  }
  return data;
};

export const fetchTableById = async (tableId: string) => {
  const { data, error } = await supabase
    .from('tables')
    .select('*')
    .eq('id', tableId)
    .single();

  if (error) {
    console.error('Error (fetchTableById) => ', error);
    throw new Error('Table could not to be loaded by provided ID.');
  }
  return data;
};

export const updateBaseTheme = async (newBaseTheme: string) => {
  await supabase
    .from('tables')
    .update({ baseTheme: newBaseTheme })
    .eq('id', '0bfc39f3-faea-4222-ae5d-668adfbe9147');
};

export const updateColorScheme = async (newColorScheme: string) => {
  await supabase
    .from('tables')
    .update({ colorScheme: newColorScheme })
    .eq('id', '0bfc39f3-faea-4222-ae5d-668adfbe9147');
};

export const updateIconSet = async (newIconSet: string) => {
  await supabase
    .from('tables')
    .update({ iconSet: newIconSet })
    .eq('id', '0bfc39f3-faea-4222-ae5d-668adfbe9147');
};

export const updateParams = async (currentTable: any, newParam: any) => {
  await supabase
    .from('tables')
    .update({ params: { ...currentTable.params, ...newParam } })
    .eq('id', '0bfc39f3-faea-4222-ae5d-668adfbe9147');
};

export const updateDimensions = async (
  currentTable: any,
  dimensions: {
    width?: number;
    height?: number;
  }
) => {
  await supabase
    .from('tables')
    .update({ dimensions: { ...currentTable.dimensions, ...dimensions } })
    .eq('id', '0bfc39f3-faea-4222-ae5d-668adfbe9147');
};

export const addRow = async (newRow: any) => {
  // Fetch the current rows
  const { data, error } = await supabase
    .from('tables')
    .select('rows')
    .eq('id', '0bfc39f3-faea-4222-ae5d-668adfbe9147')
    .single();

  if (error) {
    console.error('Error fetching rows:', error);
    return;
  }

  if (!data || !data.rows) {
    console.error('No rows found or invalid structure');
    return;
  }

  // Append the new row to the existing rows
  const updatedRows = [...data.rows, newRow];

  // Update the table with the new rows array
  const { error: updateError } = await supabase
    .from('tables')
    .update({ rows: updatedRows })
    .eq('id', '0bfc39f3-faea-4222-ae5d-668adfbe9147');

  if (updateError) {
    console.error('Error updating rows:', updateError);
    return;
  }

  console.log('Row added successfully');
};

export const updateRowName = async (
  field: string,
  newValue: string,
  index: number
) => {
  // console.log('here => ', tableId, rowId, newName);
  // Step 1: Fetch the current `rows` JSON data
  const { data: tables, error: fetchError } = await supabase
    .from('tables')
    .select('rows')
    .eq('id', '0bfc39f3-faea-4222-ae5d-668adfbe9147')
    .single();

  if (fetchError) {
    console.error('Error fetching current rows:', fetchError);
    return null;
  }

  tables.rows[index][field] = newValue;

  console.log('Result => ', tables);

  console.log('Result => ', tables.rows[index]);
  console.log('Field => ', field);

  const { data: updatedTable, error: updateError } = await supabase
    .from('tables')
    .update({ rows: tables }) // Update the rows column
    .select(); // Ensure you're updating the correct table

  return updatedTable;
  /*
  if (fetchError) {
    console.error('Error fetching current rows:', fetchError);
    return null;
  }
  
  console.log('Current table => ', currentTable);

  // Step 2: Modify the `rows` JSON
  const updatedRows = currentTable.rows.map((row: any) =>
    row.id === rowId ? { ...row, name: newName } : row
  );

  // Step 3: Update the `rows` column with the modified JSON
  const { data: updatedTable, error: updateError } = await supabase
    .from('tables')
    .update({ rows: updatedRows }) // Update the rows column
    .eq('id', tableId) // Ensure you're updating the correct table
    .select(); // Optionally return the updated table

  if (updateError) {
    console.error('Error updating rows:', updateError);
    return null;
  }

  return updatedTable;*/
};
