# SimpleTrust

SimpleTrust is an AI-driven compliance and cybersecurity platform designed specifically for SMEs. It simplifies complex regulatory and risk management challenges through guided workflows, automated gap analysis, and continuous monitoring.

## Project Structure

```
simpletrust/
├── src/
│   ├── frontend/     # Next.js frontend application
│   ├── backend/      # Express + Supabase backend services
│   └── shared/       # Shared types and utilities
├── docs/             # Project documentation
└── tests/            # End-to-end and integration tests
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Supabase account (for backend services)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd src/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a local environment file:
   ```bash
   cp .env.example .env.local
   ```
   
4. Update the environment variables in `.env.local` with your Supabase credentials.

5. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd src/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Supabase CLI globally (if not already installed):
   ```bash
   npm install -g supabase
   ```

4. Create a local environment file:
   ```bash
   cp .env.example .env
   ```
   
5. Update the environment variables in `.env` with your Supabase credentials.

6. Start the backend server:
   ```bash
   npm run dev
   ```

## Supabase Setup

1. Create a new project in the [Supabase Dashboard](https://app.supabase.com).

2. Get your project URL and anon key from the API settings page.

3. Initialize Supabase locally (for development):
   ```bash
   cd src/backend
   supabase init
   ```

4. Start the local Supabase instance:
   ```bash
   npm run supabase:start
   ```

5. Apply the database migrations:
   ```bash
   npm run supabase:migrate
   ```

## Technology Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Hosting**: Vercel (frontend), Supabase (backend)

## Development

- Run frontend tests: `cd src/frontend && npm run test`
- Run backend tests: `cd src/backend && npm run test`
- Lint code: `npm run lint` (run from either frontend or backend directory)
- Format code: `npm run format` (run from either frontend or backend directory)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is proprietary software. All rights reserved.

## Acknowledgments

- This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Built with [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/) 