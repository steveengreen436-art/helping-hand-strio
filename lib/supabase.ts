import { createClient } from '@supabase/supabase-js';

// Use a placeholder if process.env is undefined during build, 
// but ensure it's a valid URL format to satisfy the validator.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
