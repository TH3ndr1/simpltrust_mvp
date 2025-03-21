# SimplTrust

SimplTrust is an intuitive, AI-driven compliance and cybersecurity platform designed specifically for SMEs. It simplifies complex regulatory and risk management challenges by guiding users step-by-step—from identifying their unique compliance landscape to generating actionable tasks and continuous monitoring.

## Key Differentiators

1. **AI-Powered Guidance**: Converting complex compliance requirements into actionable tasks with minimal human expertise
2. **Unified Compliance Framework**: Eliminating redundant work across multiple regulatory frameworks
3. **Business-Centric Approach**: Linking compliance to business capabilities and assets for contextual relevance

## For Who Is This App

- **Small and Medium-Sized Enterprises (SMEs):** Especially those in regulated industries (e.g., manufacturing, automotive, aerospace) with limited IT expertise and resources.
- **Compliance and Risk Managers:** Who need to manage multiple regulatory frameworks (e.g., NIS2, GDPR, ISO 27001) without extensive manual processes.
- **IT Administrators & Operational Managers:** Looking for clear, actionable insights and tracking of cybersecurity measures.
- **Consulting and Implementation Partners:** Seeking a guided, scalable platform to support client compliance and risk management initiatives.

## Project Structure

```
simpletrust/
├── config/             # Configuration files for different environments
├── docs/               # Documentation
│   ├── api/            # API documentation
│   ├── architecture/   # Architecture documentation
│   ├── feature_specs/  # Feature specifications
│   ├── mvp_definition/ # MVP definition documents
│   ├── product context/ # Product context files
│   ├── project_management/ # Project management files
│   ├── requirements/   # Requirements documents
│   └── user_guide/     # User guide and manuals
├── scripts/            # Utility scripts for development, deployment, etc.
├── src/                # Source code
│   ├── backend/        # Backend code
│   │   ├── api/        # API endpoints
│   │   ├── core/       # Core business logic
│   │   ├── database/   # Database models and migrations
│   │   ├── models/     # Domain models
│   │   ├── services/   # Services and integrations
│   │   └── utils/      # Utility functions
│   ├── frontend/       # Frontend code
│   │   ├── components/ # React components
│   │   ├── contexts/   # React contexts
│   │   ├── hooks/      # Custom React hooks
│   │   ├── pages/      # Next.js pages
│   │   ├── public/     # Public assets
│   │   ├── styles/     # CSS and style files
│   │   └── utils/      # Utility functions
│   └── shared/         # Shared code between frontend and backend
│       ├── constants/  # Shared constants
│       ├── types/      # TypeScript type definitions
│       └── utils/      # Shared utility functions
└── tests/              # Test files
    ├── backend/        # Backend tests
    ├── frontend/       # Frontend tests
    └── integration/    # Integration tests
```

## Technology Stack

### MVP Technical Stack

- **Frontend**: Next.js with React, TypeScript, and Tailwind CSS
- **Backend & Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with JWT
- **Storage**: Supabase Storage for file uploads
- **AI Integration**: OpenAI API for recommendation engine
- **Hosting**: Vercel (frontend) and Supabase (backend)
- **CI/CD**: GitHub Actions

## Development Approach

We follow a value-driven development approach with these core principles:

1. **Value-Driven Development**: Prioritizing features that deliver early user value
2. **Hypothesis Validation**: Testing key assumptions through rapid iterations
3. **Incremental Delivery**: Building the platform in small, functional increments
4. **Continuous Feedback**: Incorporating user feedback throughout development

## Current Sprint: Sprint 1 - Platform Foundation & Simplified Organizational Scoping

The current development focus is on:

- Setting up Supabase backend infrastructure
- Implementing user authentication system
- Configuring Vercel deployment
- Implementing simplified regulatory questionnaire
- Creating industry-specific templates
- Designing organizational scoping module UI
- Creating basic design system for consistent UI
- Setting up AI service integration foundation

## Getting Started

### Prerequisites

- Node.js (v16+)
- Supabase CLI
- Git

### Installation

1. Clone the repository
   ```
   git clone https://github.com/TH3ndr1/simpltrust_mvp.git
   cd simpltrust_mvp
   ```

2. Install dependencies
   ```
   cd src/frontend
   npm install
   ```

3. Configure environment variables
   ```
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

## Development

```
# Run the development server
cd src/frontend
npm run dev
```

## Contributing

Please refer to the project's contribution guidelines.

## License

SimplTrust is proprietary software. All rights reserved. 