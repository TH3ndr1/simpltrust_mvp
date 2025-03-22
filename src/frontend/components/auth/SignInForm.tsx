import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import { AuthError } from '@supabase/supabase-js';

// Helper type guard for auth errors
function isAuthError(error: any): error is AuthError {
  return (
    error &&
    typeof error === 'object' &&
    'name' in error && 
    (error.name === 'AuthApiError' || error.name === 'AuthError') &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await signIn(email, password);
      
      // Get the redirect URL from query parameters or default to dashboard
      const redirectTo = typeof router.query.redirect === 'string' 
        ? router.query.redirect 
        : '/dashboard';
      
      router.push(redirectTo);
    } catch (err: any) {
      console.error('Sign-in error:', err);
      
      // Handle Supabase AuthError
      if (isAuthError(err)) {
        if (err.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.');
        } else if (err.message.includes('Email not confirmed')) {
          setError('Please confirm your email before signing in.');
        } else if (err.message.includes('Rate limit')) {
          setError('Too many attempts. Please try again later.');
        } else {
          setError(`Authentication error: ${err.message}`);
        }
      } else if (err instanceof Error) {
        // Handle other Error types
        if (err.message.includes('AuthRetryableFetchError') || err.message.includes('fetch')) {
          setError('Unable to connect to authentication service. Please check your internet connection and try again.');
        } else {
          setError(`Sign-in failed: ${err.message}`);
        }
      } else {
        // Fallback for unknown error types
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-8 py-6 overflow-hidden bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Sign in to your account</h2>
      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link 
              href="/reset-password" 
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="small" color="white" /> : 'Sign In'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-sm text-center">
        <span className="text-gray-600">Don't have an account?</span>{' '}
        <Link 
          href="/signup" 
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInForm; 