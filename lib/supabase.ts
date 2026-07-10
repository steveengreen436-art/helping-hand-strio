import { createClient } from '@supabase/supabase-js';

// We use placeholders here specifically to satisfy the build process
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "example-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
