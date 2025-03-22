import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';
import { createBrowserClient } from '../../../utils/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

const IndustryTemplates: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const supabase = createBrowserClient();
  
  const [organizationName, setOrganizationName] = useState<string>('');
  const [industry, setIndustry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch organization details for display
  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      if (!id || !user) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('organizations')
          .select('name, industry')
          .eq('id', id)
          .single();
          
        if (error) {
          throw new Error('Failed to fetch organization details');
        }
        
        setOrganizationName(data.name);
        setIndustry(data.industry);
      } catch (error: any) {
        console.error('Error fetching organization:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrganizationDetails();
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
          <title>Industry Templates | SimpleTrust</title>
          <meta name="description" content="Industry templates for your organization" />
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
            <h1 className="mb-2 text-3xl font-bold text-gray-800">Industry Templates</h1>
            <p className="mb-6 text-gray-600">For {organizationName}</p>
            
            <div className="p-8 text-center bg-green-50 rounded-lg">
              <svg className="w-24 h-24 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              
              <h2 className="mb-4 text-2xl font-bold text-green-800">Coming Soon</h2>
              
              <div className="mb-6">
                <p className="mb-4 text-gray-700">
                  The industry templates feature is currently in development.
                  <br />
                  This will provide pre-configured templates for your industry.
                </p>
                
                {industry ? (
                  <div className="p-4 mb-4 bg-white rounded-lg">
                    <p className="text-gray-700">
                      Based on your industry: <span className="font-bold">{industry}</span>
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      Manufacturing-specific templates will be available in the next update.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 mb-4 bg-white rounded-lg">
                    <p className="text-yellow-600">
                      No industry selected for your organization.
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      Update your organization details to get industry-specific recommendations.
                    </p>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-500">
                Feature ID: <span className="font-mono">ORG-001-002</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default IndustryTemplates; 