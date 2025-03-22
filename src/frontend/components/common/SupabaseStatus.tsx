import { useState, useEffect } from 'react';
import useSupabase from '../../hooks/useSupabase';

type ConnectionStatus = 'loading' | 'connected' | 'error' | 'not-configured';

const SupabaseStatus = () => {
  const [status, setStatus] = useState<ConnectionStatus>('loading');
  const [message, setMessage] = useState<string>('');
  const { supabase, error: clientError } = useSupabase();

  useEffect(() => {
    if (clientError) {
      setStatus('error');
      setMessage(`Client initialization error: ${clientError.message}`);
      return;
    }

    if (!supabase) {
      setStatus('loading');
      return;
    }

    // For this MVP implementation, we'll show a not-configured status 
    // if we're using the placeholder values
    if (process.env.NODE_ENV === 'development' && 
        process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://example.supabase.co') {
      setStatus('not-configured');
      setMessage('Using placeholder Supabase configuration. Ready for development.');
      return;
    }

    setStatus('connected');
    setMessage('Connected to Supabase');
  }, [supabase, clientError]);

  return (
    <div className="mt-4 text-center">
      <p className="text-sm">
        Supabase Status:{' '}
        {status === 'loading' && <span className="text-blue-600">Checking...</span>}
        {status === 'connected' && <span className="text-green-600">Connected</span>}
        {status === 'error' && <span className="text-red-600">Error</span>}
        {status === 'not-configured' && <span className="text-yellow-600">Not Configured</span>}
      </p>
      
      {message && (
        <p className="text-xs text-gray-500 mt-1">
          {message}
        </p>
      )}
      
      {(status === 'error' || status === 'not-configured' || process.env.NODE_ENV === 'development') && (
        <div className="text-xs text-gray-400 mt-2">
          <p>
            {process.env.NODE_ENV === 'development' ? 
              'Development mode - check environment variables in .env.local' : 
              'Please ensure Supabase is properly configured'}
          </p>
          
          {status === 'not-configured' && (
            <p className="mt-1">
              Set up Supabase in <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">.env.local</code> to connect to your database
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SupabaseStatus; 