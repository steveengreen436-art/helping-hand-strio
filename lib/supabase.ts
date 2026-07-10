import { createClient } from '@supabase/supabase-js';

// Get the variables, but use empty strings as fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Only create the client if we have valid-looking variables
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
