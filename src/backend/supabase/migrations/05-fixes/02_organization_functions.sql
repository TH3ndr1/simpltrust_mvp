-- Add new secure RPC functions for organization management
-- This ensures proper permission checking bypassing RLS with SECURITY DEFINER functions

-- Function to update an organization with admin check
CREATE OR REPLACE FUNCTION public.update_organization(
  org_id UUID,
  org_name TEXT,
  admin_user_uuid UUID,
  org_industry TEXT DEFAULT NULL,
  org_size TEXT DEFAULT NULL,
  org_region TEXT DEFAULT NULL,
  org_vat_number TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  org_exists BOOLEAN;
  is_admin BOOLEAN;
BEGIN
  -- Input validation
  IF org_id IS NULL OR org_name IS NULL OR admin_user_uuid IS NULL THEN
    RAISE EXCEPTION 'Missing required parameters';
  END IF;

  -- Check if organization exists
  SELECT EXISTS (
    SELECT 1 FROM organizations WHERE id = org_id
  ) INTO org_exists;

  IF NOT org_exists THEN
    RAISE EXCEPTION 'Organization does not exist';
  END IF;

  -- Check if user is an admin of this organization
  SELECT EXISTS (
    SELECT 1 FROM organization_users
    WHERE organization_id = org_id
    AND user_id = admin_user_uuid
    AND role = 'admin'
  ) INTO is_admin;

  IF NOT is_admin THEN
    RAISE EXCEPTION 'User is not an admin of this organization';
  END IF;

  -- Update the organization
  UPDATE organizations
  SET 
    name = org_name,
    industry = org_industry,
    size = org_size,
    region = org_region,
    vat_number = org_vat_number,
    updated_at = NOW()
  WHERE id = org_id;

  -- Log the update operation
  INSERT INTO audit_logs (
    action,
    table_name,
    record_id,
    user_id,
    new_data
  )
  VALUES (
    'UPDATE',
    'organizations',
    org_id,
    admin_user_uuid,
    jsonb_build_object(
      'name', org_name,
      'industry', org_industry,
      'size', org_size,
      'region', org_region,
      'vat_number', org_vat_number
    )
  );

  RETURN org_id;
END;
$$; 