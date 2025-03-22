/**
 * Script to fix organization dates issue - improved version with individual statements
 */

const { Pool } = require('pg');
require('dotenv').config();

// Get database connection info from environment or .env file
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/postgres';

// Connect to database
const pool = new Pool({
  connectionString: databaseUrl,
});

async function fixDates() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Checking current organization dates...');
    
    // Check how many organizations have invalid dates
    const checkResult = await client.query(`
      SELECT COUNT(*) as invalid_count 
      FROM organizations 
      WHERE created_at IS NULL 
         OR created_at < '2000-01-01'::timestamp 
         OR created_at > NOW()
         OR updated_at IS NULL;
    `);
    
    const invalidCount = parseInt(checkResult.rows[0].invalid_count, 10);
    console.log(`Found ${invalidCount} organizations with potentially invalid dates`);
    
    if (invalidCount > 0) {
      console.log('🔄 Fixing organization dates...');
      
      // Fix null created_at dates
      const nullCreatedResult = await client.query(`
        UPDATE organizations
        SET created_at = NOW()
        WHERE created_at IS NULL
        RETURNING id;
      `);
      console.log(`✅ Fixed ${nullCreatedResult.rowCount} organizations with NULL created_at dates`);
      
      // Fix invalid created_at dates (too old or in future)
      const invalidCreatedResult = await client.query(`
        UPDATE organizations
        SET created_at = NOW()
        WHERE created_at < '2000-01-01'::timestamp OR created_at > NOW()
        RETURNING id;
      `);
      console.log(`✅ Fixed ${invalidCreatedResult.rowCount} organizations with invalid created_at dates`);
      
      // Fix null updated_at dates
      const nullUpdatedResult = await client.query(`
        UPDATE organizations
        SET updated_at = created_at
        WHERE updated_at IS NULL
        RETURNING id;
      `);
      console.log(`✅ Fixed ${nullUpdatedResult.rowCount} organizations with NULL updated_at dates`);
      
      // Verify all organizations now have valid dates
      const verifyResult = await client.query(`
        SELECT COUNT(*) as fixed_count 
        FROM organizations 
        WHERE created_at IS NOT NULL 
          AND created_at >= '2000-01-01'::timestamp
          AND created_at <= NOW()
          AND updated_at IS NOT NULL;
      `);
      
      const fixedCount = parseInt(verifyResult.rows[0].fixed_count, 10);
      
      // Get total count for verification
      const totalResult = await client.query(`
        SELECT COUNT(*) as total_count FROM organizations;
      `);
      
      const totalCount = parseInt(totalResult.rows[0].total_count, 10);
      
      if (fixedCount === totalCount) {
        console.log(`✅ Success! All ${fixedCount} organizations now have valid dates.`);
      } else {
        console.log(`⚠️ Warning: ${totalCount - fixedCount} organizations still have invalid dates.`);
      }
    } else {
      console.log('✅ All organization dates are already valid. No fixes needed.');
    }
    
  } catch (error) {
    console.error(`❌ Error fixing organization dates: ${error.message}`);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Execute the fix
console.log('🔄 Starting date fix operation...');

fixDates().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 