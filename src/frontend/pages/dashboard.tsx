import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { useOrganizations } from '../hooks/useOrganizations';
import { OrganizationCard } from '../components/organizations/OrganizationCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import SignOutButton from '../components/auth/SignOutButton';

const Dashboard: NextPage = () => {
  const { user } = useAuth();
  const { userOrganizations, isLoading, error, createOrganization, refreshOrganizations } = useOrganizations();
  const [newOrgName, setNewOrgName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setCreateError(null);
    
    if (!newOrgName.trim()) {
      setCreateError('Organization name is required');
      return;
    }
    
    try {
      setIsCreating(true);
      console.log('Starting organization creation process...');
      
      await createOrganization(newOrgName);
      console.log('Organization created successfully');
      
      // Reset form state on success
      setNewOrgName('');
      setShowCreateForm(false);
    } catch (error: any) {
      console.error('Organization creation failed:', error);
      
      // Set a user-friendly error message
      setCreateError(error.message || 'Failed to create organization. Please try again.');
    } finally {
      // Always ensure we clear the loading state
      setIsCreating(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Dashboard | SimpleTrust</title>
          <meta name="description" content="SimpleTrust user dashboard" />
        </Head>

        <header className="bg-white shadow">
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <div className="mt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {showCreateForm ? 'Cancel' : 'Create Organization'}
                </button>

                <SignOutButton />
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 py-6 bg-white shadow sm:p-6 sm:rounded-lg">
              <h2 className="text-lg font-medium text-gray-900">Welcome to SimpleTrust</h2>
              <p className="mt-1 text-sm text-gray-500">
                You are logged in as: {user?.email}
              </p>
              
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium text-gray-900">Your Organizations</h3>
                  {!showCreateForm && (
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      New Organization
                    </button>
                  )}
                </div>
                
                {/* Enhanced error message display */}
                {createError && (
                  <div className="mt-3 p-4 border border-red-300 rounded-md bg-red-50">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Organization Creation Failed</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{createError}</p>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm">
                            <h4 className="font-medium text-red-800">Possible solutions:</h4>
                            <ul className="mt-1 ml-5 list-disc text-red-700">
                              <li>Try using a different organization name</li>
                              <li>Refresh the page and try again</li>
                              {createError.includes('RLS policy') && (
                                <li>
                                  Run database migrations: 
                                  <code className="mx-1 px-2 py-1 bg-red-100 rounded font-mono text-xs">
                                    cd src/backend && npm run migrate:safe
                                  </code>
                                </li>
                              )}
                              {createError.includes('duplicate key') && (
                                <li>This organization name may already be in use</li>
                              )}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-3">
                          <button 
                            onClick={() => setCreateError(null)}
                            className="text-sm font-medium text-red-800 hover:text-red-900"
                          >
                            Dismiss error
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {showCreateForm && (
                  <div className="mt-3 p-4 border border-gray-200 rounded-md">
                    <h4 className="text-sm font-medium text-gray-700">Create New Organization</h4>
                    <form onSubmit={handleCreateOrganization} className="mt-2">
                      <div>
                        <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
                          Organization Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="orgName"
                            value={newOrgName}
                            onChange={(e) => setNewOrgName(e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter organization name"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-3 space-x-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowCreateForm(false);
                            setCreateError(null);
                          }}
                          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isCreating}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          {isCreating ? (
                            <>
                              <LoadingSpinner size="small" color="white" />
                              <span className="ml-2">Creating...</span>
                            </>
                          ) : (
                            'Create'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {isLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <LoadingSpinner size="medium" />
                  </div>
                ) : error ? (
                  <div className="mt-2 p-4 border border-red-200 rounded-md bg-red-50">
                    <p className="text-sm text-red-600">
                      Error loading organizations: {error.message}
                    </p>
                    <button
                      onClick={() => refreshOrganizations()}
                      className="mt-2 px-3 py-1 text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100"
                    >
                      Try again
                    </button>
                  </div>
                ) : userOrganizations.length > 0 ? (
                  <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {userOrganizations.map(({ organization, role }) => (
                      <OrganizationCard
                        key={organization.id}
                        organization={organization}
                        userRole={role}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 p-4 border border-gray-200 rounded-md">
                    <p className="text-sm text-gray-500">
                      No organizations yet. Create or join an organization to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard; 