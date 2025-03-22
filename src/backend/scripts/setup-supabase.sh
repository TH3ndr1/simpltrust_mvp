#!/bin/bash
set -e

# Make sure we're in the right directory
if [[ "$(basename "$(pwd)")" != "backend" ]]; then
  echo "Error: This script must be run from the src/backend directory."
  echo "Please cd to the src/backend directory and try again."
  exit 1
fi

echo "Setting up Supabase backend infrastructure..."

# Check if Supabase CLI is installed
if ! command -v npx supabase &> /dev/null; then
  echo "Supabase CLI not found, installing..."
  npm install -g supabase
fi

echo "Starting Supabase services..."
npx supabase start

echo "Installing required packages for migrations..."
npm install pg fs-extra @types/pg @types/fs-extra --save-dev

echo "Applying database migrations using custom script..."
node scripts/apply-migrations.js

echo "Generating TypeScript types from database schema..."
npx supabase gen types typescript --local > ../frontend/types/supabase.ts

# Setup backend .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Setting up backend .env file..."
  
  # Get Supabase URL and anon key
  SUPABASE_URL=$(npx supabase status | grep 'API URL' | awk '{print $3}')
  SERVICE_ROLE_KEY=$(npx supabase status | grep 'service_role key' | awk '{print $3}')
  
  echo "SUPABASE_URL=${SUPABASE_URL}" > .env
  echo "SUPABASE_SERVICE_ROLE_KEY=${SERVICE_ROLE_KEY}" >> .env
  echo "NODE_ENV=development" >> .env
  echo "Backend .env file created with Supabase URL and service role key"
fi

# Setup frontend .env.local file if it doesn't exist
if [ ! -f ../frontend/.env.local ]; then
  echo "Setting up frontend .env.local file..."
  
  # Get Supabase URL and anon key
  SUPABASE_URL=$(npx supabase status | grep 'API URL' | awk '{print $3}')
  ANON_KEY=$(npx supabase status | grep 'anon key' | awk '{print $3}')
  
  echo "NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}" > ../frontend/.env.local
  echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=${ANON_KEY}" >> ../frontend/.env.local
  echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api" >> ../frontend/.env.local
  echo "NEXT_PUBLIC_ENVIRONMENT=development" >> ../frontend/.env.local
  echo "Frontend .env.local file created with Supabase URL and anon key"
fi

echo "Supabase setup complete!"
echo "You can access the Supabase Studio at: http://localhost:54323"
echo "To start the backend: npm run dev"
echo "To start the frontend: cd ../frontend && npm run dev" 