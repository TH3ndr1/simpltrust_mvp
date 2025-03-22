import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useOrganizations } from '@/hooks/useOrganizations';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface FormData {
  name: string;
  industry: string;
  size: string;
  vat_number: string;
}

const NewOrganizationPage: NextPage = () => {
  const router = useRouter();
  const { createOrganization } = useOrganizations();
  const { user, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    industry: '',
    size: '',
    vat_number: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  // Log debug info when user context changes
  useEffect(() => {
    setDebugInfo(`Auth state: ${authLoading ? 'Loading...' : (user ? `Authenticated as ${user.id}` : 'Not authenticated')}`);
    console.log("[Organization Create] Auth state:", { user, authLoading });
  }, [user, authLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    // Ensure name is properly trimmed and validated
    const trimmedName = formData.name.trim();
    
    if (!trimmedName) {
      setError('Organization name is required');
      return;
    }

    if (!user) {
      setError('You must be logged in to create an organization');
      setDebugInfo(`Submit attempted without authentication. Auth loading: ${authLoading}`);
      return;
    }

    try {
      setIsLoading(true);
      
      // Create a clean data object with explicit values
      const organizationData = {
        name: trimmedName,
        industry: formData.industry || undefined,
        size: formData.size || undefined,
        vat_number: formData.vat_number || undefined
      };
      
      // Log the exact data being sent
      console.log('Submitting organization data:', JSON.stringify(organizationData));
      setDebugInfo(`Creating organization "${trimmedName}" with user ID: ${user.id}`);
      
      const result = await createOrganization(organizationData);

      if (result) {
        setSuccessMessage(`Organization "${result.name}" created successfully! Redirecting to dashboard...`);
        setDebugInfo(`Success! Created organization with ID: ${result.id}`);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setError('Failed to create organization. Please check console for details.');
        setDebugInfo('Creation returned null - check browser console for errors');
      }
    } catch (err: any) {
      console.error('Error creating organization:', err);
      setError(err.message || 'An error occurred while creating the organization');
      setDebugInfo(`Exception during creation: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Create Organization | SimpleTrust</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Organization</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}

          {/* Authentication debug info - only show in development */}
          {process.env.NODE_ENV !== 'production' && debugInfo && (
            <div className="mb-6 p-4 bg-gray-100 border border-gray-400 text-gray-700 rounded-md text-xs">
              <strong>Debug:</strong> {debugInfo}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="e.g., Acme Corporation"
              />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                id="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="e.g., Technology, Healthcare, Finance"
              />
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                Company Size
              </label>
              <select
                name="size"
                id="size"
                value={formData.size}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Select size...</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1001+">1001+ employees</option>
              </select>
            </div>

            <div>
              <label htmlFor="vat_number" className="block text-sm font-medium text-gray-700 mb-1">
                VAT Number
              </label>
              <input
                type="text"
                name="vat_number"
                id="vat_number"
                value={formData.vat_number}
                onChange={handleInputChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="e.g., GB123456789"
              />
            </div>

            <div className="flex justify-between pt-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading || authLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" /> Creating...
                  </>
                ) : (
                  'Create Organization'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NewOrganizationPage; 