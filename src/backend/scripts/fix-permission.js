/**
 * Script to fix permissions for viewing organizations
 * This creates a straightforward policy to allow users to view organizations they belong to
 */

const { Pool } = require('pg');
require('dotenv').config();

// Get database connection info from environment or .env file
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/postgres';

// Connect to database
const pool = new Pool({
  connectionString: databaseUrl,
});

async function fixPermissions() {
  const client = await pool.connect();
  
  try {
    console.log('🔒 Fixing organization permissions...');
    
    // First, check if policies exist
    console.log('\nChecking existing organizations table policies...');
    const orgPolicyCheck = await client.query(`
      SELECT policyname FROM pg_policies 
      WHERE tablename = 'organizations' 
      ORDER BY policyname;
    `);
    
    console.log(`Found ${orgPolicyCheck.rowCount} policies on organizations table:`);
    orgPolicyCheck.rows.forEach(row => console.log(`- ${row.policyname}`));
    
    // Check organization_users policies
    console.log('\nChecking existing organization_users table policies...');
    const usersPolicyCheck = await client.query(`
      SELECT policyname FROM pg_policies 
      WHERE tablename = 'organization_users' 
      ORDER BY policyname;
    `);
    
    console.log(`Found ${usersPolicyCheck.rowCount} policies on organization_users table:`);
    usersPolicyCheck.rows.forEach(row => console.log(`- ${row.policyname}`));
    
    // Drop organization view policy to replace
    console.log('\nRemoving and recreating organization view policy...');
    try {
      await client.query(`
        DROP POLICY IF EXISTS "Users can view organizations they belong to" ON organizations;
        DROP POLICY IF EXISTS "Users can view their organizations" ON organizations;
        DROP POLICY IF EXISTS "View all organizations" ON organizations;
        DROP POLICY IF EXISTS "Users can view organizations they are members of" ON organizations;
      `);
      console.log('✅ Removed old organization view policies');
    } catch (err) {
      console.log(`⚠️ Warning when removing policies: ${err.message}`);
    }
    
    // Create a straightforward policy for viewing organizations
    try {
      await client.query(`
        CREATE POLICY "Users can view organizations they are members of" 
          ON organizations
          FOR SELECT
          USING (
            EXISTS (
              SELECT 1 FROM organization_users
              WHERE organization_users.organization_id = organizations.id
              AND organization_users.user_id = auth.uid()
            )
          );
      `);
      console.log('✅ Created new organization view policy');
    } catch (err) {
      console.log(`⚠️ Warning when creating policy: ${err.message}`);
    }
    
    // Create the helper function for organization membership check
    console.log('\nCreating/updating helper function for membership checks...');
    try {
      await client.query(`
        DROP FUNCTION IF EXISTS public.is_org_member(UUID, UUID);
        
        CREATE OR REPLACE FUNCTION public.is_org_member(org_id UUID, uid UUID)
        RETURNS BOOLEAN
        LANGUAGE plpgsql
        SECURITY DEFINER
        SET search_path = public
        AS $$
        DECLARE
          is_member BOOLEAN;
        BEGIN
          -- Input validation
          IF org_id IS NULL OR uid IS NULL THEN
            RETURN FALSE;
          END IF;
          
          -- Direct membership check without RLS interference
          SET LOCAL row_security = off;
          
          SELECT EXISTS (
            SELECT 1 FROM organization_users
            WHERE organization_id = org_id
            AND user_id = uid
          ) INTO is_member;
          
          RETURN is_member;
        END;
        $$;
      `);
      console.log('✅ Created/updated is_org_member function');
    } catch (err) {
      console.log(`⚠️ Warning when creating function: ${err.message}`);
    }
    
    // Update the policies for viewing organization members
    console.log('\nRemoving and recreating organization_users policies...');
    try {
      await client.query(`
        DROP POLICY IF EXISTS "Users can view other members" ON organization_users;
        DROP POLICY IF EXISTS "Users can view their own memberships" ON organization_users;
      `);
      console.log('✅ Removed old organization_users policies');
    } catch (err) {
      console.log(`⚠️ Warning when removing policies: ${err.message}`);
    }
    
    // Add policies separately to handle errors individually
    try {
      await client.query(`
        CREATE POLICY "Users can view other members" 
          ON organization_users
          FOR SELECT
          USING (
            public.is_org_member(organization_id, auth.uid())
          );
      `);
      console.log('✅ Created "Users can view other members" policy');
    } catch (err) {
      console.log(`⚠️ Warning when creating policy: ${err.message}`);
    }
    
    try {
      await client.query(`
        CREATE POLICY "Users can view their own memberships" 
          ON organization_users
          FOR SELECT
          USING (
            user_id = auth.uid()
          );
      `);
      console.log('✅ Created "Users can view their own memberships" policy');
    } catch (err) {
      console.log(`⚠️ Warning when creating policy: ${err.message}`);
    }
    
    // Verify all policies are now correct
    const finalCheck = await client.query(`
      SELECT tablename, policyname, cmd AS operation FROM pg_policies 
      WHERE tablename IN ('organizations', 'organization_users') 
      ORDER BY tablename, policyname;
    `);
    
    console.log('\n✅ Final policies:');
    finalCheck.rows.forEach(row => {
      console.log(`- ${row.tablename}: ${row.policyname} (${row.operation})`);
    });
    
    console.log('\n🔍 Testing membership function...');
    const fnCheck = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_proc 
        WHERE proname = 'is_org_member'
      ) AS function_exists;
    `);
    
    if (fnCheck.rows[0].function_exists) {
      console.log('✅ is_org_member function is properly installed');
    } else {
      console.log('❌ is_org_member function is NOT installed');
    }
    
    console.log('\n✅ Permission fixes applied successfully');
    
  } catch (error) {
    console.error(`❌ Error fixing permissions: ${error.message}`);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Execute the fix
console.log('🔄 Starting permission fix operation...');

fixPermissions().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 