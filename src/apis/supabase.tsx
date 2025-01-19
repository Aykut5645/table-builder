import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wxbmcebkxowhakxrajdi.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

export default supabase;
