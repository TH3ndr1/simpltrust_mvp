-- Helper functions for common operations

-- Function to create an organization and add the creator as admin in one operation
-- This uses SECURITY DEFINER to bypass RLS policies during the operation
CREATE OR REPLACE FUNCTION public.create_organization_with_admin(
  org_name TEXT,
  user_uuid UUID
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_org_id UUID;
BEGIN
  -- Transaction to ensure both operations succeed or fail together
  BEGIN
    -- Create the organization with explicit timestamps
    INSERT INTO organizations (name, created_at, updated_at)
    VALUES (org_name, NOW(), NOW())
    RETURNING id INTO new_org_id;
    
    -- Add the user as an admin
    INSERT INTO organization_users (organization_id, user_id, role)
    VALUES (new_org_id, user_uuid, 'admin');
    
    RETURN new_org_id;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE EXCEPTION 'Failed to create organization: %', SQLERRM;
  END;
END;
$$;

-- Function to fetch all organizations a user belongs to
-- This bypasses RLS policies to ensure consistent behavior
CREATE OR REPLACE FUNCTION public.get_user_organizations(user_uuid UUID)
RETURNS TABLE (
  organization_id UUID,
  organization_name TEXT,
  user_role TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Disable row level security for this function
  PERFORM set_config('row_security', 'off', true);
  
  RETURN QUERY
  SELECT 
    o.id AS organization_id,
    o.name AS organization_name,
    ou.role AS user_role,
    o.created_at,
    o.updated_at
  FROM 
    organizations o
    JOIN organization_users ou ON o.id = ou.organization_id
  WHERE 
    ou.user_id = user_uuid;
    
  -- Log for debugging
  RAISE NOTICE 'Fetched organizations for user %', user_uuid;
END;
$$; 