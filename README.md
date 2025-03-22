# SimpleTrust

A secure and user-friendly trust management platform built with Next.js, Supabase, and TypeScript.

## Recent Updates

We've made several important improvements to the platform:

- **Fixed authentication issues**: Improved sign-out functionality and error handling for invalid credentials
- **Resolved organization creation problems**: Fixed infinite recursion error in RLS policies using SECURITY DEFINER functions
- **Added dedicated RLS fix script**: Simplified troubleshooting with targeted fix script for RLS policy issues
- **Enhanced security**: Implemented secure database functions with proper privilege management
- **Improved error handling**: Better user feedback across the application
- **Updated documentation**: Added comprehensive troubleshooting guide and security documentation

### Organization Management Enhancements
- Fixed critical RLS policy infinite recursion issue affecting organization creation
- Added organization management page with detailed view and editing capabilities
- Implemented organization deletion functionality for administrators
- Added placeholder pages for upcoming regulatory questionnaires and industry templates
- Fixed organization timestamps to ensure proper creation dates

### Security Enhancements
- Added audit logging for sensitive database operations
- Implemented input validation for SECURITY DEFINER functions
- Enhanced database function security with proper parameter checks

### Bug Fixes
- Resolved infinite recursion in RLS policies via SECURITY DEFINER approach
- Fixed organization creation date issues in database functions
- Resolved navigation issues for organization management

## Features

- Secure authentication using Supabase Auth
- Organization management with role-based permissions
- Modern, responsive UI built with Next.js and TailwindCSS
- PostgreSQL database with Row Level Security (RLS)
- TypeScript for type safety throughout the codebase

## Project Structure

```
simpletrust/
├── docs/                  # Documentation
├── src/
│   ├── backend/           # Backend code and Supabase configuration
│   │   ├── supabase/      # Supabase migrations and seed data
│   │   ├── package.json   # Backend dependencies
│   │   └── ...
│   └── frontend/          # Next.js frontend application
│       ├── components/    # React components
│       ├── contexts/      # React contexts for state management
│       ├── hooks/         # Custom React hooks
│       ├── pages/         # Next.js pages
│       ├── styles/        # CSS and styling
│       ├── utils/         # Utility functions
│       ├── package.json   # Frontend dependencies
│       └── ...
└── ...
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Docker (for running Supabase locally)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/simpletrust.git
   cd simpletrust
   ```

2. Install frontend dependencies:
   ```bash
   cd src/frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Start the local Supabase instance:
   ```bash
   npm run supabase:start
   ```

5. Apply migrations and seed data:
   ```bash
   npm run migrate:safe
   ```

6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

7. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Frontend Development

- The frontend is built with Next.js and TypeScript
- We use TailwindCSS for styling
- State management is handled through React Context API and custom hooks

### Backend Development

- Supabase provides the backend functionality
- Migrations are managed through SQL files in `src/backend/supabase/migrations`
- Database schema changes should be added as new migrations

## Troubleshooting

If you encounter any issues, please check the [Troubleshooting Guide](docs/troubleshooting.md) for common solutions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 