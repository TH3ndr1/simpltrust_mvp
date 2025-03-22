import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { User, Session, AuthChangeEvent, AuthResponse } from '@supabase/supabase-js';
import { createBrowserClient } from '../utils/supabase';
import type { Database } from '../types/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createBrowserClient();

  useEffect(() => {
    const setAuthData = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error getting auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    setAuthData();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'PASSWORD_RECOVERY') {
          router.push('/reset-password?type=recovery');
        }
        
        if (event === 'SIGNED_OUT') {
          router.push('/signin');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting to sign in user:', email);
      
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      const { data, error } = response;

      if (error) {
        console.error('Supabase auth sign-in error:', error);
        throw error;
      }

      if (!data.user) {
        console.error('No user data returned after sign-in');
        throw new Error('Sign-in failed: No user data returned');
      }

      console.log('User signed in successfully:', data.user.id);
      setUser(data.user);
      
      // Update the session
      if (data.session) {
        console.log('Session established');
        setSession(data.session);
      } else {
        console.warn('No session data returned after sign-in');
      }
    } catch (error) {
      console.error('Error in signIn method:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Sign out initiated');
      
      // Prevent race conditions during sign out
      setIsLoading(true);
      
      // Clear auth state first to ensure UI reflects signed-out state immediately
      setUser(null);
      setSession(null);
      
      // Clear any local storage auth tokens manually to ensure they're gone
      if (typeof window !== 'undefined') {
        // Find and clear Supabase auth tokens from localStorage
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('sb-') && key.includes('auth')) {
            localStorage.removeItem(key);
          }
        });
      }
      
      // Now perform actual Supabase signOut operation
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase signOut error:', error);
        // Continue with redirect even if there's an error with Supabase signOut
      }
      
      console.log('Sign out completed');
      
      // Use a direct approach to navigate to sign-in page
      window.location.href = '/signin';
    } catch (error) {
      console.error('Error in signOut function:', error);
      
      // Force redirect even if there's an error
      window.location.href = '/signin';
    } finally {
      // Reset loading state though it likely won't matter as we're navigating away
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password?type=recovery`,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 