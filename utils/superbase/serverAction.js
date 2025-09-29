import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Create a Supabase client for server actions that doesn't rely on cookies
 * This is useful for server actions that need to access Supabase data
 */
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPERBASE_URL,
    process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY
  );
}

export default createClient;