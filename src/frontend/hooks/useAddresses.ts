import { useState, useEffect } from 'react';
import useSupabase from './useSupabase';
import { useAuth } from '../contexts/AuthContext';
import { Address } from '@/types/supabase';

interface UseAddressesProps {
  organizationId?: string;
}

export const useAddresses = ({ organizationId }: UseAddressesProps = {}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { supabase, isInitialized } = useSupabase();
  const { user } = useAuth();

  // Fetch addresses for an organization
  const fetchAddresses = async () => {
    if (!organizationId) {
      setAddresses([]);
      return;
    }

    if (!isInitialized) {
      setError('Supabase client is initializing, please wait...');
      return;
    }

    if (!supabase) {
      setError('Supabase client not initialized');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      setAddresses(data || []);
    } catch (error: any) {
      console.error('Error fetching addresses:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new address
  const createAddress = async (addressData: Omit<Address, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user || !organizationId) {
      setError('User not authenticated or organization ID missing');
      return null;
    }

    if (!isInitialized) {
      setError('Supabase client is initializing, please wait...');
      return null;
    }

    if (!supabase) {
      setError('Supabase client not initialized');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Handle the case where the RPC function may fail with the action column error
      try {
        // Try using the RPC function first
        const { data, error } = await supabase.rpc('create_organization_address', {
          org_id: organizationId,
          street1: addressData.street_line1,
          street2: addressData.street_line2 || null,
          postal: addressData.postal_code,
          city_name: addressData.city,
          province_name: addressData.province || null,
          country_code: addressData.country,
          address_type_name: addressData.address_type || 'company',
          admin_user_uuid: user.id
        });

        if (error) {
          // If this specific error occurs, we'll use the fallback approach
          if (error.message.includes('column "action" of relation "audit_logs" does not exist')) {
            throw new Error('Missing audit log column, using fallback method');
          }
          throw error;
        }

        // RPC worked, refresh and return
        await fetchAddresses();
        return data;
      } catch (rpcError: any) {
        console.warn('RPC error, using direct insert fallback:', rpcError.message);
        
        // Fallback to direct table access for compatibility when audit_logs schema is outdated
        // First insert the address
        const { data: insertedAddress, error: addressError } = await supabase
          .from('addresses')
          .insert({
            organization_id: organizationId,
            street_line1: addressData.street_line1,
            street_line2: addressData.street_line2 || null,
            postal_code: addressData.postal_code,
            city: addressData.city,
            province: addressData.province || null,
            country: addressData.country,
            address_type: addressData.address_type || 'company'
          })
          .select('id')
          .single();

        if (addressError) {
          throw addressError;
        }

        // Refresh the addresses list
        await fetchAddresses();
        return insertedAddress.id;
      }
    } catch (error: any) {
      console.error('Error creating address:', error);
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing address
  const updateAddress = async (addressId: string, addressData: Omit<Address, 'id' | 'created_at' | 'updated_at' | 'organization_id'>) => {
    if (!user || !organizationId) {
      setError('User not authenticated or organization ID missing');
      return false;
    }

    if (!isInitialized) {
      setError('Supabase client is initializing, please wait...');
      return false;
    }

    if (!supabase) {
      setError('Supabase client not initialized');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Update the address directly (no RPC function required as we check org ID match)
      const { error } = await supabase
        .from('addresses')
        .update({
          street_line1: addressData.street_line1,
          street_line2: addressData.street_line2 || null,
          postal_code: addressData.postal_code,
          city: addressData.city,
          province: addressData.province || null,
          country: addressData.country,
          address_type: addressData.address_type || 'company',
          updated_at: new Date().toISOString()
        })
        .eq('id', addressId)
        .eq('organization_id', organizationId); // Ensures user can only update addresses for their organization

      if (error) {
        throw new Error(error.message);
      }

      // Refresh addresses list
      await fetchAddresses();
      return true;
    } catch (error: any) {
      console.error('Error updating address:', error);
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an address
  const deleteAddress = async (addressId: string) => {
    if (!user || !organizationId) {
      setError('User not authenticated or organization ID missing');
      return false;
    }

    if (!isInitialized) {
      setError('Supabase client is initializing, please wait...');
      return false;
    }

    if (!supabase) {
      setError('Supabase client not initialized');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId)
        .eq('organization_id', organizationId);

      if (error) {
        throw new Error(error.message);
      }

      // Update the addresses list
      setAddresses(prevAddresses => 
        prevAddresses.filter(address => address.id !== addressId)
      );
      
      return true;
    } catch (error: any) {
      console.error('Error deleting address:', error);
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch on mount and when organizationId changes, but only after Supabase is initialized
  useEffect(() => {
    if (isInitialized && organizationId) {
      fetchAddresses();
    }
  }, [organizationId, isInitialized]);

  return {
    addresses,
    isLoading,
    error,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress
  };
}; 