import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { clearBrowserClient } from '../../utils/supabase';
import LoadingSpinner from '../ui/LoadingSpinner';

interface SignOutButtonProps {
  className?: string;
}

const SignOutButton = ({ className = '' }: SignOutButtonProps) => {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleForcedSignOut = async () => {
    try {
      setIsSigningOut(true);
      setError(null);
      
      // Clear local storage manually
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }

      // Clear the Supabase client singleton
      clearBrowserClient();
      
      // Navigate to sign-in page
      window.location.href = '/signin';
    } catch (err) {
      console.error('Error in forced sign out:', err);
      setError('Error during sign out');
      setIsSigningOut(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      setError(null);
      
      // Use the auth context's sign-out method
      await signOut();

      // If we're still here, use the forced method
      handleForcedSignOut();
    } catch (err) {
      console.error('Error in sign out:', err);
      setError('Error during sign out');
      
      // Try the forced approach as fallback
      handleForcedSignOut();
    }
  };

  return (
    <div>
      <button
        onClick={handleSignOut}
        disabled={isSigningOut}
        className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      >
        {isSigningOut ? (
          <>
            <LoadingSpinner size="small" color="gray" />
            <span className="ml-2">Signing Out...</span>
          </>
        ) : (
          'Sign Out'
        )}
      </button>
      
      {error && (
        <div className="mt-2">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={handleForcedSignOut}
            className="mt-1 text-sm text-blue-600 hover:text-blue-800"
          >
            Force Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default SignOutButton; 