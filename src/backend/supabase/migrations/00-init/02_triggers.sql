-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for organizations table
CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON organizations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create triggers for organization_users table
CREATE TRIGGER update_organization_users_updated_at
BEFORE UPDATE ON organization_users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 