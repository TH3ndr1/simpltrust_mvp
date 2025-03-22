import { createBrowserClient } from '../utils/supabase';
import { useEffect, useState, useRef } from 'react';
import type { TypedSupabaseClient } from '../utils/supabase';

export default function useSupabase() {
  const [supabase, setSupabase] = useState<TypedSupabaseClient | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const clientRef = useRef<TypedSupabaseClient | null>(null);

  useEffect(() => {
    // Initialize if not already done
    if (!clientRef.current) {
      try {
        console.log('Initializing Supabase client');
        const client = createBrowserClient();
        clientRef.current = client;
        setSupabase(client);
        setIsInitialized(true);
      } catch (e) {
        console.error('Error initializing Supabase client:', e);
        setError(e instanceof Error ? e : new Error('Failed to initialize Supabase client'));
        setIsInitialized(true); // Still mark as initialized even if there's an error
      }
    } else {
      setSupabase(clientRef.current);
      setIsInitialized(true);
    }
    
    return () => {
      // Don't clean up the ref, we want to reuse it
    };
  }, []);

  return { supabase, error, isInitialized };
} 