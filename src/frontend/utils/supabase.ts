// This file handles Supabase client initialization
// It provides both browser and server clients with proper error handling

import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { Database } from '../types/supabase';

// Types
export type TypedSupabaseClient = ReturnType<typeof createClient<Database>>;

// For client-side usage (CSR) - React components
export const createBrowserClient = () => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(
        'Warning: Missing environment variables for Supabase. Check your .env.local file.'
      );
      
      // In development, we can return a mock client or null
      if (process.env.NODE_ENV === 'development') {
        console.info('Development mode: Using placeholder Supabase client');
        return createClient<Database>(
          'https://example.supabase.co',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
        );
      }
      
      throw new Error(
        'Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set'
      );
    }

    return createClient<Database>(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase browser client:', error);
    throw error;
  }
};

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