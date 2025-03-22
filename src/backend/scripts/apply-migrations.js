/**
 * Script to apply database migrations directly using PostgreSQL client
 * Improved version with individual transactions per file for better error handling
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

// Parse command line arguments
const args = process.argv.slice(2);
const isSafe = args.includes('--safe');
const isForce = args.includes('--force');
const isReset = args.includes('--reset');
const isVerbose = args.includes('--verbose');

// Migration directories in order of application
const migrationPaths = [
  '00-init',
  '01-seed',
  '02-functions',
  '03-policies',
  '04-seed',
  '05-fixes',
];

// Acceptable error codes that can be ignored
const ignorableErrors = [
  '42710', // Duplicate object
  '42P07', // Relation already exists
  '42P16', // Trigger already exists
  '42701', // Duplicate column
  '23505'  // Unique violation (for data inserts)
];

async function executeSQL(client, sql, fileName) {
  try {
    console.log(`Executing ${fileName}...`);
    
    // Use individual transactions per file
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    
    console.log(`✅ Successfully applied ${fileName}`);
    return { success: true };
  } catch (error) {
    // Try to rollback the transaction
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error(`Error rolling back transaction: ${rollbackError.message}`);
    }
    
    // Check if this is an ignorable error
    const isIgnorable = ignorableErrors.includes(error.code);
    
    if (isIgnorable) {
      console.log(`⚠️ Ignorable error in ${fileName}: ${error.message} (code: ${error.code})`);
      return { success: true, warning: error.message };
    } else {
      console.error(`❌ Error applying ${fileName}: ${error.message} (code: ${error.code})`);
      if (isVerbose) {
        console.error('Detailed error:', error);
      }
      
      if (!isSafe) {
        return { success: false, error };
      }
      return { success: true, warning: `Continuing despite error: ${error.message}` };
    }
  }
}

async function applyMigrations() {
  const client = await pool.connect();
  let successful = true;
  
  try {
    if (isReset) {
      console.log('🚨 Resetting database (this will delete all data)...');
      
      try {
        // Reset is its own transaction
        await client.query('BEGIN');
        
        // Drop all tables except auth schema
        await client.query(`
          DO $$ 
          DECLARE
            r RECORD;
          BEGIN
            FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
              EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
            END LOOP;
          END $$;
        `);
        
        await client.query('COMMIT');
        console.log('✅ Database reset complete');
      } catch (error) {
        await client.query('ROLLBACK');
        console.error(`❌ Error resetting database: ${error.message}`);
        if (!isSafe) {
          throw error;
        }
      }
    }
    
    // Track stats
    let totalFiles = 0;
    let successfulFiles = 0;
    let warningFiles = 0;
    let failedFiles = 0;
    
    // Apply migrations in order
    for (const dirName of migrationPaths) {
      const dirPath = path.join(__dirname, '../supabase/migrations', dirName);
      
      if (!fs.existsSync(dirPath)) {
        console.log(`⚠️ Migration directory not found: ${dirPath} - skipping`);
        continue;
      }
      
      console.log(`\n📁 Applying migrations from ${dirName}`);
      
      // Get all SQL files in the directory
      const files = fs.readdirSync(dirPath)
        .filter(file => file.endsWith('.sql'))
        .sort(); // Sort to ensure consistent order
      
      totalFiles += files.length;
      
      for (const fileName of files) {
        const filePath = path.join(dirPath, fileName);
        const sql = fs.readFileSync(filePath, 'utf8');
        
        const result = await executeSQL(client, sql, `${dirName}/${fileName}`);
        
        if (result.success) {
          if (result.warning) {
            warningFiles++;
          } else {
            successfulFiles++;
          }
        } else {
          failedFiles++;
          successful = false;
          if (!isSafe) {
            console.error('❌ Migration failed, aborting process');
            break;
          }
        }
      }
      
      if (!successful && !isSafe) {
        break;
      }
    }
    
    // Apply security enhancements if file exists
    const securityEnhancementPath = path.join(__dirname, '../supabase/migrations/99-security-enhancements.sql');
    if (fs.existsSync(securityEnhancementPath)) {
      console.log('\n🔒 Applying security enhancements');
      const sql = fs.readFileSync(securityEnhancementPath, 'utf8');
      const result = await executeSQL(client, sql, '99-security-enhancements.sql');
      
      totalFiles++;
      if (result.success) {
        if (result.warning) {
          warningFiles++;
        } else {
          successfulFiles++;
        }
      } else {
        failedFiles++;
        successful = false;
      }
    }
    
    // Print summary
    console.log('\n📊 Migration Summary:');
    console.log(`Total files: ${totalFiles}`);
    console.log(`✅ Successful: ${successfulFiles}`);
    console.log(`⚠️ Warnings: ${warningFiles}`);
    console.log(`❌ Failed: ${failedFiles}`);
    
    if (successful || isSafe) {
      console.log('\n✅ Migrations completed' + (successful ? ' successfully' : ' with errors (safe mode)'));
    } else {
      console.log('\n❌ Migrations failed');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Unhandled error during migration');
    console.error(error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Execute migrations
console.log('🔄 Starting database migrations...');
console.log(`Mode: ${isSafe ? 'Safe' : isForce ? 'Force' : isReset ? 'Reset' : 'Normal'}`);

applyMigrations().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 