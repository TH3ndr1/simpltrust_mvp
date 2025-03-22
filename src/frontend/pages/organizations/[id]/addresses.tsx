import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useAddresses } from '@/hooks/useAddresses';
import { Address } from '@/types/supabase';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AddressFormData extends Omit<Address, 'id' | 'created_at' | 'updated_at' | 'organization_id'> {}

const initialFormData: AddressFormData = {
  street_line1: '',
  street_line2: '',
  postal_code: '',
  city: '',
  province: '',
  country: '',
  address_type: 'company'
};

const AddressManagementPage = () => {
  const router = useRouter();
  const { id: organizationId } = router.query;
  const { user, isLoading: authLoading } = useAuth();
  const { addresses, isLoading, error, createAddress, updateAddress, deleteAddress } = useAddresses({ 
    organizationId: organizationId as string 
  });
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [formError, setFormError] = useState<string | null>(null);

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Start editing an address
  const handleEditAddress = (address: Address) => {
    setEditingAddressId(address.id);
    setFormData({
      street_line1: address.street_line1,
      street_line2: address.street_line2 || '',
      postal_code: address.postal_code,
      city: address.city,
      province: address.province || '',
      country: address.country,
      address_type: address.address_type
    });
    setIsAddingAddress(true);
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate country code is 2 characters
    if (formData.country.length !== 2) {
      setFormError('Country code must be 2 characters (ISO 3166-1 alpha-2)');
      return;
    }

    try {
      if (editingAddressId) {
        // Update existing address
        await updateAddress(editingAddressId, formData);
      } else {
        // Create new address
        await createAddress({
          ...formData,
          organization_id: organizationId as string
        });
      }
      
      // Reset form and close add form
      setFormData(initialFormData);
      setIsAddingAddress(false);
      setEditingAddressId(null);
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  // Cancel form
  const handleCancel = () => {
    setIsAddingAddress(false);
    setEditingAddressId(null);
    setFormData(initialFormData);
    setFormError(null);
  };

  // Format date string for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Date unavailable';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Date unavailable';
    }
    
    return date.toLocaleDateString();
  };

  // Handle address deletion
  const handleDeleteAddress = async (addressId: string) => {
    if (confirm('Are you sure you want to delete this address? This action cannot be undone.')) {
      await deleteAddress(addressId);
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !organizationId) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head>
        <title>Manage Addresses | SimpleTrust</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Organization Addresses</h1>
            <p className="text-gray-600">
              Manage addresses for your organization
            </p>
          </div>
          <div>
            <Link
              href={`/organizations/${organizationId}/manage`}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to Organization
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {!isAddingAddress ? (
          <button
            onClick={() => setIsAddingAddress(true)}
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add New Address
          </button>
        ) : (
          <div className="mb-6 p-4 bg-gray-100 rounded-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingAddressId ? 'Edit Address' : 'Add New Address'}
            </h2>
            
            {formError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {formError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="street_line1" className="block text-sm font-medium text-gray-700">
                  Street Line 1*
                </label>
                <input
                  type="text"
                  id="street_line1"
                  name="street_line1"
                  value={formData.street_line1}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div>
                <label htmlFor="street_line2" className="block text-sm font-medium text-gray-700">
                  Street Line 2
                </label>
                <input
                  type="text"
                  id="street_line2"
                  name="street_line2"
                  value={formData.street_line2 || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                    Province/State
                  </label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    value={formData.province || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                    Postal Code*
                  </label>
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country Code (ISO 2-letter)*
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    maxLength={2}
                    placeholder="e.g. US, GB, DE"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="address_type" className="block text-sm font-medium text-gray-700">
                  Address Type
                </label>
                <select
                  id="address_type"
                  name="address_type"
                  value={formData.address_type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="company">Company</option>
                  <option value="billing">Billing</option>
                  <option value="shipping">Shipping</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  {editingAddressId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : addresses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No addresses found for this organization.</p>
            <p className="text-gray-500">Click the "Add New Address" button to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addresses.map(address => (
              <div key={address.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full">
                    {address.address_type}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAddress(address)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit Address"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Address"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p>{address.street_line1}</p>
                  {address.street_line2 && <p>{address.street_line2}</p>}
                  <p>
                    {address.city}
                    {address.province && `, ${address.province}`}
                    {` ${address.postal_code}`}
                  </p>
                  <p>{address.country}</p>
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  <p>Created: {formatDate(address.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AddressManagementPage; 