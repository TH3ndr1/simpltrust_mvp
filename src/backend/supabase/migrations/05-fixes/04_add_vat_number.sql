-- Add VAT number column to organizations table
ALTER TABLE public.organizations 
ADD COLUMN IF NOT EXISTS vat_number TEXT;

-- Update the update_organization function to include vat_number
CREATE OR REPLACE FUNCTION public.update_organization(
  org_id UUID,
  org_name TEXT,
  org_industry TEXT,
  org_size TEXT,
  org_region TEXT,
  org_vat_number TEXT,
  admin_user_uuid UUID
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

-- Update the create_organization_with_admin function to include vat_number
CREATE OR REPLACE FUNCTION public.create_organization_with_admin(
  org_name TEXT,
  org_industry TEXT,
  org_size TEXT,
  org_region TEXT,
  org_vat_number TEXT,
  admin_user_uuid UUID
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_org_id UUID;
BEGIN
  -- Input validation
  IF org_name IS NULL OR admin_user_uuid IS NULL THEN
    RAISE EXCEPTION 'Organization name and admin user UUID are required';
  END IF;

  -- Create the organization
  INSERT INTO organizations (
    name,
    industry,
    size,
    region,
    vat_number,
    created_at,
    updated_at
  )
  VALUES (
    org_name,
    org_industry,
    org_size,
    org_region,
    org_vat_number,
    NOW(),
    NOW()
  )
  RETURNING id INTO new_org_id;

  -- Add the admin user to the organization
  INSERT INTO organization_users (
    organization_id,
    user_id,
    role,
    created_at,
    updated_at
  )
  VALUES (
    new_org_id,
    admin_user_uuid,
    'admin',
    NOW(),
    NOW()
  );

  -- Log the create operation
  INSERT INTO audit_logs (
    action,
    table_name,
    record_id,
    user_id,
    new_data
  )
  VALUES (
    'INSERT',
    'organizations',
    new_org_id,
    admin_user_uuid,
    jsonb_build_object(
      'name', org_name,
      'industry', org_industry,
      'size', org_size,
      'region', org_region,
      'vat_number', org_vat_number
    )
  );

  RETURN new_org_id;
END;
$$; 