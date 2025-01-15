import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wxbmcebkxowhakxrajdi.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Ym1jZWJreG93aGFreHJhamRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NzExMDUsImV4cCI6MjA0NzI0NzEwNX0.XiJ1ZSqoSf-YCl3NotLTGuRrIxxQNNewTzH2acfJEew';
// const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY!);

export default supabase;
