import { createClient } from '@supabase/supabase-js';

// Replace these strings with your ACTUAL keys from the Supabase API page
const supabaseUrl = "sb_publishable_u0djiaYiyJTeMmIWVjzd2w_XHTPuGyo";
const supabaseAnonKey = "b_secret_0oT8f4nFoLNG6ktzMvMelw_qq-7cBHx";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
