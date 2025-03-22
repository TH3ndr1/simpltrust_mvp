
-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  user_id UUID,
  ip_address TEXT,
  changes JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  session_id TEXT
);

-- Add row-level security to audit logs (only system and admins can view)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Only admins can view audit logs" ON audit_logs;
CREATE POLICY "Only admins can view audit logs" ON audit_logs 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM organization_users 
      WHERE user_id = auth.uid()::uuid 
      AND role = 'admin'
    )
  );

-- Create function to record audit logs
CREATE OR REPLACE FUNCTION public.record_audit_log(
  event_type TEXT,
  table_name TEXT,
  record_id UUID,
  changes JSONB DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  log_id UUID;
  user_id UUID;
  client_ip TEXT;
  session_id TEXT;
BEGIN
  -- Get current user ID
  user_id := auth.uid()::UUID;
  
  -- Get client IP if available (requires setting from client)
  client_ip := current_setting('request.headers', true)::jsonb->>'x-forwarded-for';
  
  -- Get session ID if available
  BEGIN
    session_id := current_setting('request.jwt.claims', true)::jsonb->>'session_id';
  EXCEPTION WHEN OTHERS THEN
    session_id := NULL;
  END;
  
  -- Insert audit log
  INSERT INTO audit_logs (
    event_type, 
    table_name, 
    record_id, 
    user_id, 
    ip_address, 
    changes,
    session_id
  ) 
  VALUES (
    event_type, 
    table_name, 
    record_id, 
    user_id, 
    client_ip, 
    changes,
    session_id
  )
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;

-- Enhanced organization creation function with validation and audit logging
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
  -- Input validation
  IF org_name IS NULL OR trim(org_name) = '' THEN
    RAISE EXCEPTION 'Organization name cannot be empty';
  END IF;
  
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'User ID cannot be null';
  END IF;
  
  -- Check if user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_uuid) THEN
    RAISE EXCEPTION 'User does not exist';
  END IF;
  
  -- Transaction to ensure both operations succeed or fail together
  INSERT INTO organizations (name)
  VALUES (trim(org_name))
  RETURNING id INTO new_org_id;
  
  -- Add the user as an admin
  INSERT INTO organization_users (organization_id, user_id, role)
  VALUES (new_org_id, user_uuid, 'admin');
  
  -- Record audit log
  PERFORM public.record_audit_log(
    'create_organization',
    'organizations',
    new_org_id,
    jsonb_build_object(
      'name', org_name,
      'created_by', user_uuid
    )
  );
  
  RETURN new_org_id;
END;
$$;

-- Function to get organizations with validation and timeouts
CREATE OR REPLACE FUNCTION public.get_user_organizations(user_uuid UUID)
RETURNS TABLE (
  organization_id UUID,
  organization_name TEXT,
  user_role TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
SET statement_timeout = '5s'  -- Prevent long-running queries
AS $$
BEGIN
  -- Input validation
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'User ID cannot be null';
  END IF;
  
  -- Check if user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_uuid) THEN
    RAISE EXCEPTION 'User does not exist';
  END IF;
  
  -- Record that this function was called (for audit purposes)
  PERFORM public.record_audit_log(
    'get_user_organizations',
    'organizations',
    NULL,
    jsonb_build_object('user_id', user_uuid)
  );
  
  -- Disable row security for this query only
  SET LOCAL row_security = off;
  
  RETURN QUERY
  SELECT 
    o.id AS organization_id,
    o.name AS organization_name,
    ou.role AS user_role
  FROM 
    organizations o
    JOIN organization_users ou ON o.id = ou.organization_id
  WHERE 
    ou.user_id = user_uuid;
END;
$$;

-- Function to safely delete an organization (admin only)
CREATE OR REPLACE FUNCTION public.delete_organization(
  org_id UUID,
  admin_user_uuid UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_admin BOOLEAN;
BEGIN
  -- Input validation
  IF org_id IS NULL THEN
    RAISE EXCEPTION 'Organization ID cannot be null';
  END IF;
  
  IF admin_user_uuid IS NULL THEN
    RAISE EXCEPTION 'Admin user ID cannot be null';
  END IF;
  
  -- Check if user is admin of the organization
  SELECT EXISTS (
    SELECT 1 FROM organization_users
    WHERE organization_id = org_id
    AND user_id = admin_user_uuid
    AND role = 'admin'
  ) INTO is_admin;
  
  IF NOT is_admin THEN
    RAISE EXCEPTION 'User is not an admin of this organization';
  END IF;
  
  -- Record action in audit log before deletion
  PERFORM public.record_audit_log(
    'delete_organization',
    'organizations',
    org_id,
    jsonb_build_object(
      'deleted_by', admin_user_uuid
    )
  );
  
  -- Delete organization members first
  DELETE FROM organization_users
  WHERE organization_id = org_id;
  
  -- Delete the organization
  DELETE FROM organizations
  WHERE id = org_id;
  
  RETURN TRUE;
END;
$$;
