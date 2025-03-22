-- First create the trigger_set_timestamp function if it doesn't exist
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create addresses table for organization addresses
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  street_line1 TEXT NOT NULL,
  street_line2 TEXT,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT, -- province / region / state
  country TEXT NOT NULL, -- Should be ISO 3166-1 alpha-2 compliant
  address_type TEXT DEFAULT 'company', -- 'company' by default, 'billing' if different from company
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add trigger for updated_at
CREATE OR REPLACE TRIGGER update_addresses_updated_at
BEFORE UPDATE ON public.addresses
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Add RLS policies for addresses
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Policy for viewing addresses - users can view addresses for organizations they belong to
CREATE POLICY "Users can view organization addresses" 
  ON public.addresses
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = addresses.organization_id
      AND organization_users.user_id = auth.uid()
    )
  );

-- Policy for inserting addresses - only admins can create addresses
CREATE POLICY "Admins can add addresses" 
  ON public.addresses
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = addresses.organization_id
      AND organization_users.user_id = auth.uid()
      AND organization_users.role = 'admin'
    )
  );

-- Policy for updating addresses - only admins can update addresses
CREATE POLICY "Admins can update addresses" 
  ON public.addresses
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = addresses.organization_id
      AND organization_users.user_id = auth.uid()
      AND organization_users.role = 'admin'
    )
  );

-- Policy for deleting addresses - only admins can delete addresses
CREATE POLICY "Admins can delete addresses" 
  ON public.addresses
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = addresses.organization_id
      AND organization_users.user_id = auth.uid()
      AND organization_users.role = 'admin'
    )
  );

-- Create helper functions for address management
CREATE OR REPLACE FUNCTION public.create_organization_address(
  org_id UUID,
  admin_user_uuid UUID,
  street1 TEXT,
  postal TEXT,
  city_name TEXT,
  country_code TEXT,
  street2 TEXT DEFAULT NULL,
  province_name TEXT DEFAULT NULL,
  address_type_name TEXT DEFAULT 'company'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_admin BOOLEAN;
  new_address_id UUID;
BEGIN
  -- Input validation
  IF org_id IS NULL OR street1 IS NULL OR postal IS NULL OR city_name IS NULL OR country_code IS NULL OR admin_user_uuid IS NULL THEN
    RAISE EXCEPTION 'Missing required parameters';
  END IF;

  -- Validate country code (simple check for now)
  IF LENGTH(country_code) != 2 THEN
    RAISE EXCEPTION 'Country code must be ISO 3166-1 alpha-2 compliant (2 letters)';
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

  -- Create the address
  INSERT INTO addresses (
    organization_id,
    street_line1,
    street_line2,
    postal_code,
    city,
    province,
    country,
    address_type
  )
  VALUES (
    org_id,
    street1,
    street2,
    postal,
    city_name,
    province_name,
    UPPER(country_code),
    address_type_name
  )
  RETURNING id INTO new_address_id;

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
    'addresses',
    new_address_id,
    admin_user_uuid,
    jsonb_build_object(
      'organization_id', org_id,
      'address_type', address_type_name,
      'country', country_code
    )
  );

  RETURN new_address_id;
END;
$$; 