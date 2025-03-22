# SimpleTrust Backend

This directory contains the backend services for the SimpleTrust application, focusing on API services and Supabase integration.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Supabase CLI globally (if not already installed):
   ```bash
   npm install -g supabase
   ```

3. Initialize Supabase:
   ```bash
   supabase init
   ```

4. Start local Supabase:
   ```bash
   npm run supabase:start
   ```

5. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Update the values with your local Supabase credentials.

6. Run the backend in development mode:
   ```bash
   npm run dev
   ```

## Environment Variables

- `PORT`: The port number for the Express server
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (with admin privileges)
- `NODE_ENV`: Environment (development, test, production)

## Database Schema

The initial database schema includes:

- **organizations**: Main table for storing organization information
- **organization_users**: Linking table between organizations and users

Row-level security policies ensure that users can only access data they have permission to see.

## API Endpoints

- `GET /health`: Basic health check endpoint
- `GET /health/supabase`: Checks connection to Supabase

## Development

- Run the server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`
- Lint code: `npm run lint`

## Supabase Management

- Start Supabase: `npm run supabase:start`
- Stop Supabase: `npm run supabase:stop`
- Apply migrations: `npm run supabase:migrate`

## Connection to Frontend

The frontend application connects to this backend API and directly to Supabase for authentication and realtime features.

## Database Tools

The following scripts are available to help manage the database:

- `npm run db`: Access an interactive PostgreSQL console
- `npm run migrate:safe`: Apply migrations in safe mode (continue on errors)
- `npm run migrate:force`: Apply migrations with strict error checking
- `npm run reset:dev`: Reset the database (warning: deletes all data)

### Utility Scripts

- `npm run fix-dates`: Fix invalid dates in organization records
- `npm run fix-permissions`: Repair RLS policies for organization access
- `npm run apply-security`: Apply security enhancements (audit logging, etc.)

### Local Database Connection

By default, the local Supabase instance exposes PostgreSQL on port 54322:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
```

Add this URL to your `.env` file to enable the database scripts.

## Troubleshooting

### Migration Issues

If you encounter issues with migrations:

1. Try running with the safe flag: `npm run migrate:safe`
2. For permission errors, run: `npm run fix-permissions`
3. For issues with organization dates, run: `npm run fix-dates`

### Database Connection Issues

If you can't connect to the database:

1. Ensure Supabase is running: `npm run supabase:start`
2. Verify your `.env` file has the correct database URL
3. Check that port 54322 is not blocked by a firewall

For detailed troubleshooting, see the [Troubleshooting Guide](/docs/troubleshooting.md). 