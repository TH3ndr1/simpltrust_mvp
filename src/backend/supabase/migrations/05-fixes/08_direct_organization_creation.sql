-- Create a simple, direct function for organization creation that skips all the complex logic
-- This is to ensure we can properly create organizations

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.simple_create_organization(TEXT, TEXT, TEXT, TEXT, UUID);

-- Create a new simplified function
CREATE OR REPLACE FUNCTION public.simple_create_organization(
  org_name TEXT,
  org_industry TEXT,
  org_size TEXT, 
  org_vat_number TEXT,
  user_id UUID
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_org_id UUID;
BEGIN
  -- Basic validation
  IF org_name IS NULL OR user_id IS NULL THEN
    RAISE EXCEPTION 'Organization name and user ID are required';
  END IF;

  -- Insert organization
  INSERT INTO organizations (
    name,
    industry,
    size,
    vat_number,
    created_at,
    updated_at
  )
  VALUES (
    org_name,
    org_industry,
    org_size,
    org_vat_number,
    NOW(),
    NOW()
  )
  RETURNING id INTO new_org_id;

  -- Add user as admin
  INSERT INTO organization_users (
    organization_id,
    user_id,
    role,
    created_at,
    updated_at
  )
  VALUES (
    new_org_id,
    user_id,
    'admin',
    NOW(),
    NOW()
  );

  RETURN new_org_id;
END;
$$; 