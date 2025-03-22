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

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-repo/simpletrust.git
   cd simpletrust/src/frontend
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your Supabase credentials.

### Development

Run the development server:
```
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Code Quality

Run linting:
```
npm run lint
# or
yarn lint
```

Format code with Prettier:
```
npm run format
# or
yarn format
```

Type checking:
```
npm run type-check
# or
yarn type-check
```

## Project Structure

```
simpletrust/frontend/
├── components/     # React components
├── contexts/       # React contexts
├── hooks/          # Custom React hooks
├── pages/          # Next.js pages
├── public/         # Static assets
├── styles/         # CSS and style files
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Contributing

Please follow the project's coding standards and commit message conventions. 