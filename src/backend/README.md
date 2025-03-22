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