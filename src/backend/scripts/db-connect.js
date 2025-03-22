#!/usr/bin/env node

/**
 * Interactive database console script
 * Provides a PostgreSQL REPL for directly interacting with the database
 */

const { spawn } = require('child_process');
const { Pool } = require('pg');
require('dotenv').config();

// Default connection params (local Supabase container)
const defaultParams = {
  host: 'localhost',
  port: 54322,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres'
};

// Get connection info from DATABASE_URL or use defaults
let connectionParams = { ...defaultParams };

const databaseUrl = process.env.DATABASE_URL;
if (databaseUrl) {
  try {
    const url = new URL(databaseUrl);
    connectionParams = {
      host: url.hostname,
      port: url.port || 5432,
      database: url.pathname.substring(1), // Remove leading slash
      user: url.username,
      password: url.password
    };
  } catch (e) {
    console.warn('Warning: Invalid DATABASE_URL format, using default connection parameters');
  }
}

// First check if PostgreSQL CLI is available
async function checkPsql() {
  return new Promise(resolve => {
    const psql = spawn('which', ['psql']);
    
    psql.on('close', code => {
      resolve(code === 0);
    });
  });
}

// Try connecting via psql (preferred)
async function connectPsql() {
  const { host, port, database, user, password } = connectionParams;
  
  console.log(`Connecting to PostgreSQL at ${host}:${port}/${database} as ${user}...`);
  console.log('Type \\q to quit');
  console.log('--------------------------------------------------');
  
  // Set PGPASSWORD environment variable
  process.env.PGPASSWORD = password;
  
  const psql = spawn('psql', [
    '-h', host,
    '-p', port.toString(),
    '-d', database,
    '-U', user
  ], { stdio: 'inherit' });
  
  psql.on('close', code => {
    console.log(`psql exited with code ${code}`);
    process.exit(code);
  });
}

// Fallback to node-pg interactive mode
async function connectNodePg() {
  console.log('psql not found, falling back to basic node-pg interactive mode');
  console.log(`Connecting to PostgreSQL at ${connectionParams.host}:${connectionParams.port}/${connectionParams.database} as ${connectionParams.user}...`);
  
  const pool = new Pool(connectionParams);
  const client = await pool.connect();
  
  console.log('Connected! Enter SQL commands (type "exit" to quit):');
  console.log('--------------------------------------------------');
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'sql> '
  });
  
  readline.prompt();
  
  readline.on('line', async (line) => {
    const query = line.trim();
    
    if (query.toLowerCase() === 'exit') {
      console.log('Closing connection...');
      await client.release();
      await pool.end();
      process.exit(0);
    }
    
    if (query) {
      try {
        const start = Date.now();
        const result = await client.query(query);
        const duration = Date.now() - start;
        
        if (result.rows && result.rows.length > 0) {
          console.table(result.rows);
        }
        
        console.log(`Query executed in ${duration}ms. ${result.rowCount || 0} rows affected.`);
      } catch (err) {
        console.error('Error executing query:', err.message);
      }
    }
    
    readline.prompt();
  });
  
  readline.on('close', async () => {
    console.log('Closing connection...');
    await client.release();
    await pool.end();
    process.exit(0);
  });
}

// Main function
async function main() {
  const hasPsql = await checkPsql();
  
  if (hasPsql) {
    await connectPsql();
  } else {
    await connectNodePg();
  }
}

// Execute the script
main().catch(err => {
  console.error('Error connecting to database:', err);
  process.exit(1);
}); 