import { createClient } from '@supabase/supabase-js';

// We assign these to variables. During the Vercel build, 
// they might be empty, and that is okay because of the check below.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// This ensures the client is ONLY created in the browser, 
// completely skipping the build-time error.
export const supabase = typeof window !== 'undefined' 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : createClient('https://placeholder.supabase.co', 'placeholder-key');
