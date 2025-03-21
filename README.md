# SimplTrust

SimplTrust is an AI-driven compliance and cybersecurity platform designed specifically for SMEs. It simplifies complex regulatory and risk management challenges through guided workflows, automated gap analysis, and continuous monitoring.

## Key Differentiators

1. **AI-Powered Guidance**: Converting complex compliance requirements into actionable tasks with minimal human expertise
2. **Unified Compliance Framework**: Eliminating redundant work across multiple regulatory frameworks
3. **Business-Centric Approach**: Linking compliance to business capabilities and assets for contextual relevance

## Project Structure

```
simpletrust/
├── config/             # Configuration files for different environments
├── docs/               # Documentation
│   ├── api/            # API documentation
│   ├── architecture/   # Architecture documentation
│   ├── feature_specs/  # Feature specifications
│   ├── mvp_definition/ # MVP definition documents
│   ├── product_context/ # Product context files
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

- **Frontend**: Next.js with TypeScript, Tailwind CSS
- **Backend**: Python (FastAPI), PostgreSQL
- **AI Integration**: OpenAI API or similar for recommendation engine
- **Authentication**: JWT-based authentication
- **Deployment**: Docker, Kubernetes

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- PostgreSQL (v14+)
- Docker (optional)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/TH3ndr1/simpltrust_mvp.git
   cd simpltrust_mvp
   ```

2. Set up the backend
   ```
   cd src/backend
   python -m venv .venvst
   source .venvst/bin/activate  # On Windows: .venvst\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend
   ```
   cd src/frontend
   npm install
   ```

4. Configure environment variables
   ```
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

## Development

### Running the Backend

```
cd src/backend
source .venvst/bin/activate  # On Windows: .venvst\Scripts\activate
uvicorn main:app --reload
```

### Running the Frontend

```
cd src/frontend
npm run dev
```

## Testing

```
# Run backend tests
cd src/backend
pytest

# Run frontend tests
cd src/frontend
npm test
```

## Contributing

Please refer to the project's contribution guidelines.

## License

SimplTrust is proprietary software. All rights reserved. 