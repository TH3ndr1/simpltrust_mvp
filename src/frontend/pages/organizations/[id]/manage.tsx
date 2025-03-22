import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';
import { createBrowserClient } from '../../../utils/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import Link from 'next/link';

interface Organization {
  id: string;
  name: string;
  industry: string | null;
  size: string | null;
  vat_number: string | null;
  created_at: string;
  updated_at: string;
}

const ManageOrganization: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const supabase = createBrowserClient();
  
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Organization>>({});
  
  // Fetch organization details
  useEffect(() => {
    const fetchOrganization = async () => {
      if (!id || !user) return;
      
      const organizationId = Array.isArray(id) ? id[0] : id;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // First check if the user has admin permission
        const { data: roleData, error: roleError } = await supabase
          .from('organization_users')
          .select('role')
          .eq('organization_id', organizationId)
          .eq('user_id', user.id)
          .single();
          
        if (roleError) {
          throw new Error('You do not have permission to view this organization');
        }
        
        setIsAdmin(roleData.role === 'admin');
        
        // Then fetch organization details
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', organizationId)
          .single();
          
        if (orgError) {
          throw new Error('Failed to fetch organization details');
        }
        
        // Add missing properties that might not be in the database yet
        const completeOrgData: Organization = {
          id: orgData.id,
          name: orgData.name,
          industry: orgData.industry || null,
          size: orgData.size || null,
          vat_number: orgData.vat_number || null,
          created_at: orgData.created_at,
          updated_at: orgData.updated_at
        };
        
        setOrganization(completeOrgData);
        setFormData({
          name: completeOrgData.name,
          industry: completeOrgData.industry || '',
          size: completeOrgData.size || '',
          vat_number: completeOrgData.vat_number || ''
        });
      } catch (error: any) {
        console.error('Error fetching organization:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrganization();
  }, [id, user, supabase]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSave = async () => {
    if (!isAdmin) {
      setError('You must be an admin to update organization details');
      return;
    }

    if (!organization?.id) {
      setError('Invalid organization ID');
      return;
    }

    const organizationId = Array.isArray(id) ? id[0] : id;

    setIsLoading(true);
    setError('');
    setSuccessMessage(null);

    try {
      // Try the RPC function first
      try {
        const { data, error } = await supabase.rpc('update_organization', {
          org_id: organizationId,
          org_name: formData.name,
          admin_user_uuid: user?.id,
          org_industry: formData.industry || null,
          org_size: formData.size || null,
          org_vat_number: formData.vat_number || null
        });

        if (error) {
          // If this specific error occurs, we'll use the fallback approach
          if (error.message.includes('column') && error.message.includes('does not exist')) {
            throw new Error('Missing column, using fallback method');
          }
          throw error;
        }
      } catch (rpcError: any) {
        console.warn('RPC error, using direct update fallback:', rpcError.message);
        
        // Fallback to direct table update for compatibility when schema is outdated
        const { error: updateError } = await supabase
          .from('organizations')
          .update({
            name: formData.name,
            industry: formData.industry || null,
            size: formData.size || null,
            vat_number: formData.vat_number || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', organizationId);

        if (updateError) {
          throw updateError;
        }
      }

      // Refresh organization data
      const { data: refreshedData, error: refreshError } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', organizationId)
        .single();

      if (refreshError) {
        throw refreshError;
      }

      // Update local state
      setOrganization(refreshedData as Organization);
      setFormData(refreshedData as Organization);
      setEditMode(false);
      setSuccessMessage('Organization updated successfully!');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error: any) {
      console.error('Error updating organization:', error);
      setError(error.message || 'Failed to update organization. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!id || !isAdmin || confirmDelete !== organization?.name) return;
    
    const organizationId = Array.isArray(id) ? id[0] : id;
    
    try {
      setIsDeleting(true);
      
      // For enhanced security, use our dedicated RPC function
      const { error } = await supabase.rpc(
        'delete_organization',
        { 
          org_id: organizationId,
          admin_user_uuid: user?.id
        }
      );
      
      if (error) {
        throw new Error(`Failed to delete organization: ${error.message}`);
      }
      
      // Redirect to dashboard after successful deletion
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error deleting organization:', error);
      setError(error.message);
      setIsDeleting(false);
    }
  };
  
  const startQuestionnaire = () => {
    router.push(`/organizations/${id}/questionnaire`);
  };
  
  const browseTemplates = () => {
    router.push(`/organizations/${id}/templates`);
  };
  
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
          <title>{organization?.name || 'Organization'} | SimpleTrust</title>
          <meta name="description" content="Manage your organization" />
        </Head>
        
        <div className="p-8">
          <div className="mb-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
          
          <div className="p-8 bg-white rounded-lg shadow-md">
            {/* Success message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 flex justify-between items-center">
                <p>{successMessage}</p>
                <button 
                  onClick={() => setSuccessMessage(null)}
                  className="text-green-700 hover:text-green-900"
                >
                  ✕
                </button>
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 flex justify-between items-center">
                <p>{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="text-red-700 hover:text-red-900"
                >
                  ✕
                </button>
              </div>
            )}
            
            {/* Header with edit button */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                {editMode ? 'Edit Organization' : 'Organization Details'}
              </h1>
              
              {isAdmin && !editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Edit Details
                </button>
              )}
              
              {editMode && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
            
            {/* Organization details form */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                ) : (
                  <p className="p-2 bg-gray-100 rounded">{organization?.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Industry</label>
                {editMode ? (
                  <select
                    name="industry"
                    value={formData.industry || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">-- Select Industry --</option>
                    <option value="technology">Technology</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="financial">Financial Services</option>
                    <option value="retail">Retail</option>
                    <option value="automotive">Automotive</option>
                    <option value="energy">Energy</option>
                    <option value="aerospace">Aerospace</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="p-2 bg-gray-100 rounded">
                    {organization?.industry || 'Not specified'}
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Size</label>
                {editMode ? (
                  <select
                    name="size"
                    value={formData.size || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">-- Select Size --</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1001+">1001+ employees</option>
                  </select>
                ) : (
                  <p className="p-2 bg-gray-100 rounded">
                    {organization?.size || 'Not specified'}
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">VAT Number</label>
                {editMode ? (
                  <input
                    type="text"
                    name="vat_number"
                    value={formData.vat_number || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                ) : (
                  <p className="p-2 bg-gray-100 rounded">
                    {organization?.vat_number || 'Not specified'}
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Created At</label>
                <p className="p-2 bg-gray-100 rounded">
                  {organization?.created_at 
                    ? new Date(organization.created_at).toLocaleString() 
                    : 'Unknown'}
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Last Updated</label>
                <p className="p-2 bg-gray-100 rounded">
                  {organization?.updated_at 
                    ? new Date(organization.updated_at).toLocaleString() 
                    : 'Unknown'}
                </p>
              </div>
            </div>
            
            {/* Feature sections */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Features</h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Addresses */}
                <div className="p-6 bg-purple-50 rounded-lg shadow">
                  <h3 className="mb-3 text-xl font-bold text-purple-800">Addresses</h3>
                  <p className="mb-4 text-gray-700">
                    Manage company addresses, billing locations, and more for your organization.
                  </p>
                  <Link
                    href={`/organizations/${id}/addresses`}
                    className="inline-block px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
                  >
                    Manage Addresses
                  </Link>
                </div>
                
                {/* Regulatory Questionnaire */}
                <div className="p-6 bg-blue-50 rounded-lg shadow">
                  <h3 className="mb-3 text-xl font-bold text-blue-800">Regulatory Questionnaire</h3>
                  <p className="mb-4 text-gray-700">
                    Answer questions about your organization to determine which regulations apply to your business.
                  </p>
                  <button
                    onClick={startQuestionnaire}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Start Questionnaire
                  </button>
                </div>
                
                {/* Industry Templates */}
                <div className="p-6 bg-green-50 rounded-lg shadow">
                  <h3 className="mb-3 text-xl font-bold text-green-800">Industry Templates</h3>
                  <p className="mb-4 text-gray-700">
                    Browse and apply industry-specific templates for your organization.
                  </p>
                  <button
                    onClick={browseTemplates}
                    className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Browse Templates
                  </button>
                </div>
              </div>
            </div>
            
            {/* Delete organization section (admin only) */}
            {isAdmin && (
              <div className="p-6 mt-12 border border-red-300 rounded-lg bg-red-50">
                <h2 className="mb-4 text-xl font-bold text-red-800">Danger Zone</h2>
                <p className="mb-4 text-gray-700">
                  Deleting an organization will permanently remove all associated data. This action cannot be undone.
                </p>
                
                {!isDeleting ? (
                  <div>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Type <span className="font-bold">{organization?.name}</span> to confirm deletion
                      </label>
                      <input
                        type="text"
                        value={confirmDelete}
                        onChange={(e) => setConfirmDelete(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Organization name"
                      />
                    </div>
                    
                    <button
                      onClick={handleDelete}
                      disabled={confirmDelete !== organization?.name}
                      className={`px-4 py-2 text-white rounded ${
                        confirmDelete === organization?.name
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Delete Organization
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="medium" />
                    <span className="ml-3 text-red-600">Deleting organization...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ManageOrganization; 