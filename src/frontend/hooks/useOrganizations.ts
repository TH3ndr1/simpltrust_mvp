import { useState, useEffect } from 'react';
import { createBrowserClient } from '../utils/supabase';
import { Database } from '../types/supabase';
import { useAuth } from '../contexts/AuthContext';

type Organization = Database['public']['Tables']['organizations']['Row'];
type OrganizationUser = Database['public']['Tables']['organization_users']['Row'];

interface UseOrganizationsReturn {
  organizations: Organization[];
  userOrganizations: {
    organization: Organization;
    role: string;
  }[];
  isLoading: boolean;
  error: Error | null;
  createOrganization: (data: CreateOrganizationData) => Promise<Organization | null>;
  refreshOrganizations: () => Promise<void>;
}

type CreateOrganizationData = {
  name: string;
  industry?: string;
  size?: string;
  vat_number?: string;
};

export const useOrganizations = (): UseOrganizationsReturn => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [userOrganizations, setUserOrganizations] = useState<{
    organization: Organization;
    role: string;
  }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const supabase = createBrowserClient();

  const fetchOrganizations = async (retryCount = 0) => {
    if (!user) {
      setIsLoading(false);
      setOrganizations([]);
      setUserOrganizations([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      console.log(`[FetchOrgs] Attempt ${retryCount + 1}: Fetching organizations for user:`, user.id);
      
      // Use our helper function that bypasses RLS to get user organizations directly
      const { data: userOrgs, error: fetchError } = await supabase.rpc(
        'get_user_organizations',
        { user_uuid: user.id }
      );
      
      if (fetchError) {
        console.error(`[FetchOrgs] Error fetching user organizations:`, fetchError);
        console.error(`[FetchOrgs] Error details:`, JSON.stringify(fetchError, null, 2));
        throw fetchError;
      }
      
      console.log(`[FetchOrgs] User organizations data:`, userOrgs);
      
      if (!userOrgs || userOrgs.length === 0) {
        console.log(`[FetchOrgs] No organizations found for this user`);
        setOrganizations([]);
        setUserOrganizations([]);
        setIsLoading(false);
        return;
      }
      
      // Transform the data to match our expected format
      const orgList: Organization[] = userOrgs.map(org => ({
        id: org.organization_id,
        name: org.organization_name,
        created_at: org.created_at,
        updated_at: org.updated_at
      }));
      
      console.log(`[FetchOrgs] Transformed organizations:`, orgList);
      
      setOrganizations(orgList);
      
      // Create the user organizations list with roles
      const userOrgsList = userOrgs.map(org => ({
        organization: {
          id: org.organization_id,
          name: org.organization_name,
          created_at: org.created_at,
          updated_at: org.updated_at
        },
        role: org.user_role
      }));
      
      console.log(`[FetchOrgs] User organizations with roles:`, userOrgsList);
      
      setUserOrganizations(userOrgsList);
    } catch (err) {
      console.error(`[FetchOrgs] Error in fetchOrganizations:`, err);
      setError(err instanceof Error ? err : new Error('Failed to fetch organizations'));
      
      // Add retry mechanism for transient errors
      if (retryCount < 3) {
        console.log(`[FetchOrgs] Retrying after error (attempt ${retryCount + 1}/3)...`);
        setTimeout(() => {
          fetchOrganizations(retryCount + 1);
        }, 500 * Math.pow(2, retryCount)); // Exponential backoff: 500ms, 1s, 2s
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createOrganization = async (data: CreateOrganizationData): Promise<Organization | null> => {
    // Log authentication state for debugging
    console.log('CREATING ORGANIZATION - Auth state:', { 
      userExists: !!user, 
      userId: user?.id,
      dataReceived: data,
      nameValue: data?.name
    });
    
    // Strict name validation
    if (!data || !data.name || data.name.trim() === '') {
      console.error('Missing or empty organization name:', data);
      setError(new Error('Organization name is required'));
      return null;
    }
    
    // Check authentication - handle gracefully if user context isn't ready yet
    if (!user || !user.id) {
      console.error('No authenticated user found:', user);
      setError(new Error('You must be logged in to create an organization'));
      return null;
    }
    
    try {
      console.log('Creating organization:', data, 'for user:', user.id);
      
      // Check if supabase is initialized
      if (!supabase) {
        console.error('Supabase client is not initialized');
        setError(new Error('Database connection not initialized. Please try again later.'));
        return null;
      }
      
      setIsLoading(true);
      setError(null);
      
      // Log database connection state
      console.log('Supabase client initialized:', !!supabase);
      
      // Create the organization in the database
      console.log('Creating new organization with data:', {
        name: data.name,
        industry: data.industry || null,
        size: data.size || null,
        vat_number: data.vat_number || null
      });
      
      // Create the organization first
      const { data: newOrg, error: insertError } = await supabase
        .from('organizations')
        .insert({
          name: data.name,
          industry: data.industry || null,
          size: data.size || null,
          vat_number: data.vat_number || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('*')
        .single();
        
      if (insertError) {
        console.error('Insert Error:', insertError);
        setError(new Error('Failed to create organization: ' + insertError.message));
        setIsLoading(false);
        return null;
      }
      
      if (!newOrg) {
        setError(new Error('Failed to create organization: No data returned'));
        setIsLoading(false);
        return null;
      }
      
      console.log('Organization created successfully:', newOrg);
      console.log('Linking admin role...');
      
      // Create the user_organization link with admin role
      const { error: linkError } = await supabase
        .from('organization_users')
        .insert({
          user_id: user.id,
          organization_id: newOrg.id,
          role: 'admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (linkError) {
        console.error('Link Error:', linkError);
        setError(new Error('Organization created but failed to link admin role: ' + linkError.message));
        // Still return the organization even if linking fails
        setIsLoading(false);
        return newOrg;
      }
      
      console.log('Admin role linked successfully! Organization creation complete.');
      
      // Refresh the organizations list
      fetchOrganizations();
      setIsLoading(false);
      return newOrg;
    } catch (error: any) {
      console.error('Unexpected error in createOrganization:', error);
      setError(new Error('An unexpected error occurred. Please try again.'));
      setIsLoading(false);
      return null;
    }
  };

  // Initial fetch with better error handling
  useEffect(() => {
    if (user) {
      fetchOrganizations().catch(err => {
        console.error('Error during initial organization fetch:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch organizations'));
        setIsLoading(false);
      });
    } else {
      setOrganizations([]);
      setUserOrganizations([]);
      setIsLoading(false);
    }
  }, [user?.id]); // Only re-run when user ID changes

  return {
    organizations,
    userOrganizations,
    isLoading,
    error,
    createOrganization,
    refreshOrganizations: fetchOrganizations
  };
}; 