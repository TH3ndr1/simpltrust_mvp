import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';
import { createBrowserClient } from '../../../utils/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

const RegulatoryQuestionnaire: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const supabase = createBrowserClient();
  
  const [organizationName, setOrganizationName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch organization name for display
  useEffect(() => {
    const fetchOrganizationName = async () => {
      if (!id || !user) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('organizations')
          .select('name')
          .eq('id', id)
          .single();
          
        if (error) {
          throw new Error('Failed to fetch organization details');
        }
        
        setOrganizationName(data.name);
      } catch (error: any) {
        console.error('Error fetching organization:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrganizationName();
  }, [id, user, supabase]);
  
  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="large" />
        </div>
      </ProtectedRoute>
    );
  }
  
  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen p-8 bg-gray-50">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="mt-4 text-gray-700">{error}</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Regulatory Questionnaire | SimpleTrust</title>
          <meta name="description" content="Regulatory questionnaire for your organization" />
        </Head>
        
        <div className="p-8">
          <div className="mb-6">
            <button
              onClick={() => router.push(`/organizations/${id}/manage`)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Organization
            </button>
          </div>
          
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">Regulatory Questionnaire</h1>
            <p className="mb-6 text-gray-600">For {organizationName}</p>
            
            <div className="p-8 text-center bg-blue-50 rounded-lg">
              <svg className="w-24 h-24 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="mb-4 text-2xl font-bold text-blue-800">Coming Soon</h2>
              <p className="mb-6 text-gray-700">
                The regulatory questionnaire feature is currently in development.
                <br />
                This will allow you to identify which regulations apply to your business.
              </p>
              <p className="text-sm text-gray-500">
                Feature ID: <span className="font-mono">ORG-001-001</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default RegulatoryQuestionnaire; 