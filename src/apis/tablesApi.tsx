import supabase from './supabase';

export const fetchTables = async () => {
  const { data, error } = await supabase.from('tables').select('*');
  console.log('here');
  if (error) {
    console.error('Error (fetchTables) => ', error);
    throw new Error('Tables could not to be loaded.');
  }

  return data;
};
