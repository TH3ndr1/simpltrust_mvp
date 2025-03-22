-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create organization_users linking table
CREATE TABLE IF NOT EXISTS organization_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for organizations table
CREATE POLICY "Users can view their own organizations" ON organizations
  FOR SELECT USING (
    id IN (
      SELECT organization_id FROM organization_users
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert into their own organizations" ON organizations
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can update their own organizations" ON organizations
  FOR UPDATE USING (
    id IN (
      SELECT organization_id FROM organization_users
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create RLS policies for organization_users table
CREATE POLICY "Users can view their own organization memberships" ON organization_users
  FOR SELECT USING (
    user_id = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM organization_users
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can insert new members into their organizations" ON organization_users
  FOR INSERT WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM organization_users
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update their own organization memberships" ON organization_users
  FOR UPDATE USING (
    organization_id IN (
      SELECT organization_id FROM organization_users
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create trigger function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for the updated_at columns
CREATE TRIGGER update_organizations_timestamp
BEFORE UPDATE ON organizations
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_organization_users_timestamp
BEFORE UPDATE ON organization_users
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp(); 