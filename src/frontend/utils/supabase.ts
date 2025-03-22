// This file handles Supabase client initialization
// It provides both browser and server clients with proper error handling

import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { Database } from '../types/supabase';

// Types
export type TypedSupabaseClient = ReturnType<typeof createClient<Database>> & {
  rpc: <T = any>(
    fn: string,
    params?: object,
    options?: { count?: 'exact' | 'planned' | 'estimated' }
  ) => Promise<{ data: T; error: Error | null }>;
};

// For client-side usage (CSR) - React components
let browserClient: TypedSupabaseClient | null = null;

// Create and reuse the browser client to avoid multiple instances
export const createBrowserClient = (): TypedSupabaseClient => {
  // Ensure environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Supabase URL or Anon Key not found in environment variables');
    throw new Error('Missing environment variables for Supabase configuration');
  }

  // Reuse existing client if available
  if (browserClient) return browserClient;

  try {
    browserClient = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) as TypedSupabaseClient;
    
    console.log('Browser client created successfully');
    return browserClient;
  } catch (error) {
    console.error('Error creating Supabase browser client:', error);
    throw new Error('Failed to initialize database connection');
  }
};

// For manually clearing the client (useful for testing and debugging)
export const clearBrowserClient = () => {
  browserClient = null;
}

// For server-side usage (SSR) - Next.js API routes and server components
export const createServerSupabaseClient = (context: { cookies: () => { get: (name: string) => string | undefined } }) => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(
        'Warning: Missing environment variables for Supabase. Check your .env.local file.'
      );
      
      // In development, we can return a mock client
      if (process.env.NODE_ENV === 'development') {
        console.info('Development mode: Using placeholder Supabase server client');
        return createClient<Database>(
          'https://example.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
        );
      }
      
      throw new Error(
        'Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set'
      );
    }

    return createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get: (name: string) => context.cookies().get(name)?.value,
          set: () => {},
          remove: () => {},
        },
      }
    );
  } catch (error) {
    console.error('Failed to initialize Supabase server client:', error);
    throw error;
  }
};

// Helper functions for common Supabase operations can be added here
// Note: Always check if supabase is not null before using 