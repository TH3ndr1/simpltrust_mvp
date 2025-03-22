-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can view their own organizations" ON organizations;
DROP POLICY IF EXISTS "Users can create new organizations" ON organizations;
DROP POLICY IF EXISTS "Users can update their own organizations" ON organizations;
DROP POLICY IF EXISTS "Users can delete their own organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view organization members" ON organization_users;
DROP POLICY IF EXISTS "Organization admins can manage members" ON organization_users;
DROP POLICY IF EXISTS "Users can view their own organization memberships" ON organization_users;
DROP POLICY IF EXISTS "Users can insert their own organization memberships" ON organization_users;
DROP POLICY IF EXISTS "Users can create initial memberships" ON organization_users;
DROP POLICY IF EXISTS "Users can view their own memberships" ON organization_users;
DROP POLICY IF EXISTS "Users can view memberships in their organizations" ON organization_users;
DROP POLICY IF EXISTS "Admins can manage organization memberships" ON organization_users;
DROP POLICY IF EXISTS "Anyone can create organizations" ON organizations;
DROP POLICY IF EXISTS "View organizations you belong to" ON organizations;
DROP POLICY IF EXISTS "Admins can update organizations" ON organizations;
DROP POLICY IF EXISTS "Admins can delete organizations" ON organizations;
DROP POLICY IF EXISTS "Users can add themselves to organizations" ON organization_users;
DROP POLICY IF EXISTS "Users can view members of their organizations" ON organization_users;
DROP POLICY IF EXISTS "Admins can add members" ON organization_users;
DROP POLICY IF EXISTS "Admins can update members" ON organization_users;
DROP POLICY IF EXISTS "Admins can delete members" ON organization_users;
DROP POLICY IF EXISTS "Users can remove themselves" ON organization_users;

-- Add function to bypass RLS for membership check
CREATE OR REPLACE FUNCTION public.is_org_member(org_id uuid, uid uuid)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER STABLE AS $$
BEGIN
  -- Disable row level security for this function call
  PERFORM set_config('row_security', 'off', true);
  RETURN EXISTS (
    SELECT 1 FROM organization_users WHERE organization_id = org_id AND user_id = uid
  );
END;
$$;

-- =============== ORGANIZATIONS POLICIES ===============

-- Allow any authenticated user to create organizations
CREATE POLICY "Anyone can create organizations" ON organizations
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can view organizations directly (self-referential)
-- This avoids the recursive dependency on organization_users
CREATE POLICY "View all organizations" ON organizations
  FOR SELECT 
  USING (true);

-- Only admins can update organizations
-- Use a direct join to organization_users to avoid recursion
CREATE POLICY "Admins can update organizations" ON organizations
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = organizations.id
      AND organization_users.user_id = auth.uid()::uuid
      AND organization_users.role = 'admin'
    )
  );

-- Only admins can delete organizations
-- Use a direct join to organization_users to avoid recursion
CREATE POLICY "Admins can delete organizations" ON organizations
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM organization_users
      WHERE organization_users.organization_id = organizations.id
      AND organization_users.user_id = auth.uid()::uuid
      AND organization_users.role = 'admin'
    )
  );

-- =============== ORGANIZATION_USERS POLICIES ===============

-- Allow insertion of first-time organization creator as admin
CREATE POLICY "Organization creators can add themselves" ON organization_users
  FOR INSERT 
  WITH CHECK (user_id = auth.uid()::uuid);

-- Users can see their own memberships directly
CREATE POLICY "Users can view their own memberships" ON organization_users
  FOR SELECT 
  USING (user_id = auth.uid()::uuid);

-- Users can see members of organizations they belong to
-- Updated to use is_org_member() to bypass recursive RLS
CREATE POLICY "Users can view other members" ON organization_users
  FOR SELECT 
  USING ( public.is_org_member(organization_users.organization_id, auth.uid()::uuid) );

-- Allow admins to insert other members
CREATE POLICY "Admins can add members" ON organization_users
  FOR INSERT 
  WITH CHECK (
    -- Make sure the user is an admin of the organization
    EXISTS (
      SELECT 1 FROM organization_users AS admin_check
      WHERE admin_check.organization_id = organization_id
      AND admin_check.user_id = auth.uid()::uuid
      AND admin_check.role = 'admin'
    ) AND
    -- Don't allow this policy to apply when users add themselves (use the other policy)
    user_id <> auth.uid()::uuid
  );

-- Allow admins to update organization members
CREATE POLICY "Admins can update members" ON organization_users
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM organization_users AS admin_check
      WHERE admin_check.organization_id = organization_users.organization_id
      AND admin_check.user_id = auth.uid()::uuid
      AND admin_check.role = 'admin'
    )
  );

-- Allow admins to delete organization members
CREATE POLICY "Admins can delete members" ON organization_users
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM organization_users AS admin_check
      WHERE admin_check.organization_id = organization_users.organization_id
      AND admin_check.user_id = auth.uid()::uuid
      AND admin_check.role = 'admin'
    )
  );

-- Allow users to delete their own membership
CREATE POLICY "Users can remove themselves" ON organization_users
  FOR DELETE 
  USING (user_id = auth.uid()::uuid); 