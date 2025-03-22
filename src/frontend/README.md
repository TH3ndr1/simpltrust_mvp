# SimplTrust Frontend

This is the frontend application for SimplTrust, an AI-driven compliance and cybersecurity platform for SMEs.

## Technology Stack

- Next.js with TypeScript
- Tailwind CSS for styling
- Supabase for authentication and backend services
- SWR for data fetching
- React Hook Form for form handling

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase CLI (for local development with Supabase)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-repo/simpletrust.git
   cd simpletrust
   ```

2. Install dependencies for both frontend and backend
   ```
   # Frontend dependencies
   cd src/frontend
   npm install

   # Backend dependencies
   cd ../backend
   npm install
   ```

3. Set up local Supabase
   ```
   # From the backend directory
   npm run supabase:setup
   ```
   This script will:
   - Install Supabase CLI if not already installed
   - Start the local Supabase instance
   - Apply database migrations
   - Set up environment variables for both frontend and backend

4. If you prefer manual setup, create environment variables
   ```
   # In src/frontend directory
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NEXT_PUBLIC_ENVIRONMENT=development
   ```

### Development

1. Start the Supabase local instance (if not already running)
   ```
   # In src/backend directory
   npm run supabase:start
   ```

2. Run the development server
   ```
   # In src/frontend directory
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Supabase Configuration

The frontend uses Supabase for authentication and database services. The connection is configured in:

- `utils/supabase.ts` - Contains the Supabase client initialization
- `contexts/AuthContext.tsx` - Provides authentication state and methods
- `components/auth/ProtectedRoute.tsx` - Route protection based on auth state

### Authentication Flow

1. **Sign Up**: Users can register with email and password
2. **Sign In**: Users can sign in with email and password
3. **Sign Out**: Users can sign out, which clears their session
4. **Password Reset**: Users can request password reset via email

Authentication state is managed through the `AuthContext`, which provides:
- `user` - The current authenticated user object
- `session` - The Supabase session object
- `isLoading` - Loading state for auth operations
- Auth methods: `signIn`, `signOut`, `signUp`, `resetPassword`, `updatePassword`

### Code Quality

Run linting:
```
npm run lint
```

Format code with Prettier:
```
npm run format
```

Type checking:
```
npm run type-check
```

## Project Structure

```
simpletrust/frontend/
├── components/     # React components
│   ├── auth/       # Authentication components
│   ├── common/     # Common UI components
│   └── ui/         # UI utility components
├── contexts/       # React contexts
├── hooks/          # Custom React hooks
├── pages/          # Next.js pages
├── public/         # Static assets
├── styles/         # CSS and style files
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Troubleshooting

For common issues and their solutions, please refer to the project's [troubleshooting guide](../docs/troubleshooting.md).

Common authentication issues:
- **Sign up/sign in errors**: Make sure Supabase is running locally with `npm run supabase:start` in the backend directory
- **AuthRetryableFetchError**: Check your network connection and verify that Supabase is running
- **Sign out not working**: Check browser console for errors, and ensure the auth context is properly set up

## Contributing

Please follow the project's coding standards and commit message conventions.

## Recent Updates

### Authentication and Organization Management Improvements

We've made several improvements to the authentication and organization management features:

1. **Fixed sign-out functionality**:
   - Implemented a more robust sign-out process that properly handles the auth state
   - Added a short delay before redirect to ensure state is cleared
   - Used hard redirects instead of router navigation to prevent caching issues

2. **Enhanced organization management**:
   - Improved error handling in the `useOrganizations` hook
   - Added comprehensive error states and loading indicators
   - Fixed issues with organization creation and fetching

3. **Supabase integration**:
   - Created a custom migration script to ensure database schemas are properly applied
   - Updated environment variable handling for more reliable configuration
   - Added detailed logging for better debugging

### Getting Started

To set up the project with these improvements:

1. Make sure the backend is set up by running:
   ```bash
   cd ../backend
   npm run supabase:setup
   ```

2. If you encounter any database issues, you can run the custom migration script:
   ```bash
   cd ../backend
   npm run migrate:custom
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. If you encounter any issues, refer to the troubleshooting documentation in `/docs/troubleshooting.md` 