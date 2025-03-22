/**
 * Script to apply security enhancements directly to the database
 */

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

// Get database connection info from environment or .env file
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/postgres';

// Connect to database
const pool = new Pool({
  connectionString: databaseUrl,
});

async function applySecurityEnhancements() {
  const client = await pool.connect();
  
  try {
    console.log('🔒 Applying security enhancements...');
    
    // Start a transaction
    await client.query('BEGIN');
    
    // Path to security enhancements SQL file
    const enhancementsPath = path.join(__dirname, '../supabase/migrations/99-security-enhancements.sql');
    
    // Check if the file exists
    if (!fs.existsSync(enhancementsPath)) {
      console.log('Creating security enhancements SQL file...');
      
      // Create the SQL content - we'll define both the audit_logs table and delete_organization function
      const sqlContent = `
-- Security enhancements for SimpleTrust
-- Creates audit logging and input validation for critical operations

-- Create audit_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  user_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policy so only admins can view audit logs
CREATE POLICY "Admins can view audit logs" 
  ON public.audit_logs
  FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM organization_users
    WHERE role = 'admin'
  ));

-- Function to record audit logs
CREATE OR REPLACE FUNCTION public.record_audit_log(
  action TEXT,
  table_name TEXT,
  record_id UUID,
  details JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO audit_logs (action, table_name, record_id, user_id, details)
  VALUES (
    action,
    table_name,
    record_id,
    auth.uid(),
    details
  );
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
  INSERT INTO audit_logs (action, table_name, record_id, user_id, details)
  VALUES (
    'delete_organization',
    'organizations',
    org_id,
    admin_user_uuid,
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
      `;
      
      // Write the SQL file
      fs.writeFileSync(enhancementsPath, sqlContent);
      console.log('✅ Security enhancements SQL file created');
    }
    
    // Read the SQL file
    const sql = fs.readFileSync(enhancementsPath, 'utf8');
    
    // Apply the SQL
    await client.query(sql);
    
    // Commit the transaction
    await client.query('COMMIT');
    
    console.log('✅ Security enhancements applied successfully');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`❌ Error applying security enhancements: ${error.message}`);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Execute the script
console.log('🔄 Starting security enhancement application...');

applySecurityEnhancements().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 