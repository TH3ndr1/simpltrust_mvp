# SimpleTrust Supabase Backend

This directory contains the Supabase configuration, migrations, and seed data for the SimpleTrust platform.

## Directory Structure

- **config.toml**: Supabase configuration file
- **migrations/**: Database migration scripts
  - **00-init/**: Initial schema setup
  - **01-schema/**: Additional schema modifications
  - **02-roles/**: Database roles and permissions
  - **03-policies/**: Row-level security policies
- **seed/**: Seed data for development and testing

## Database Schema

The initial database schema consists of:

- **organizations**: Stores organization information
  - `id` (UUID, Primary Key)
  - `name` (Text)
  - `created_at` (Timestamp)
  - `updated_at` (Timestamp)

- **organization_users**: Links users to organizations
  - `id` (UUID, Primary Key)
  - `organization_id` (UUID, Foreign Key to organizations)
  - `user_id` (UUID, Foreign Key to auth.users)
  - `role` (Text) - e.g., 'admin', 'user'
  - `created_at` (Timestamp)
  - `updated_at` (Timestamp)

## Row-Level Security Policies

The following RLS policies are implemented:

### Organizations Table
- Users can only view organizations they belong to
- Only organization admins can update or delete organizations
- Insertion is controlled by application logic

### Organization Users Table
- Users can view all members of organizations they belong to
- Organization admins can manage members (add, update, remove)
- Users can always view their own memberships

## Setup Instructions

1. Install the Supabase CLI if not already installed
   ```
   npm install -g supabase
   ```

2. Start the local Supabase instance
   ```
   cd /Users/tom/dev/simpletrust/src/backend
   npm run supabase:start
   ```

3. Apply migrations
   ```
   npm run supabase:migrate
   ```

4. Seed the database (optional, for development)
   ```
   supabase db reset
   ```

## Managing Supabase

- The Supabase Studio is available at http://localhost:54323 when running locally
- Create and manage users through the Authentication section
- Use the Table Editor to view and modify data
- SQL Editor allows running custom queries

## Extending the Schema

When extending the database schema:
1. Create new migration files in the appropriate directory
2. Add RLS policies for new tables
3. Update the Database type definition in the frontend (`/src/frontend/types/supabase.ts`) 