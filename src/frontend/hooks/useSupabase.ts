import { createBrowserClient } from '../utils/supabase';
import { useEffect, useState } from 'react';
import type { TypedSupabaseClient } from '../utils/supabase';

export default function useSupabase() {
  const [supabase, setSupabase] = useState<TypedSupabaseClient | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const client = createBrowserClient();
      setSupabase(client);
    } catch (e) {
      console.error('Error initializing Supabase client:', e);
      setError(e instanceof Error ? e : new Error('Failed to initialize Supabase client'));
    }
  }, []);

  return { supabase, error };
} 