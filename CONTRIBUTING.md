# Contributing to SimpleTrust

Thank you for your interest in contributing to SimpleTrust! This document provides guidelines and instructions for contributing to this project.

## Development Workflow

1. **Task Management**: All development work should be associated with a specific task ID (e.g., INFRA-001-000).

2. **Branching Strategy**:
   - `main` - Production-ready code
   - `develop` - Integration branch for features
   - `feature/TASK-ID-description` - Feature branches

3. **Commit Messages**:
   - Format: `[TASK-ID] Brief description of changes`
   - Example: `[INFRA-001-000] Initialize Next.js project structure`

4. **Pull Requests**:
   - Create a PR from your feature branch to `develop`
   - Reference the task ID in the PR title
   - Provide a summary of changes
   - Ensure all tests pass

## Coding Standards

### Frontend (TypeScript/Next.js)

- Follow [TypeScript ESLint](https://typescript-eslint.io/) rules
- Use functional components with hooks
- Maintain type safety throughout the codebase
- Structure components in atomic design pattern

### Backend (Python)

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use type hints
- Write comprehensive docstrings
- Structure code using Clean Architecture principles

## Testing Requirements

- Write unit tests for all new functionality
- Ensure test coverage remains above 80%
- Include integration tests for critical paths

## Documentation

- Update README.md for significant changes
- Document new features in appropriate locations
- Keep API documentation current

## Environment Setup

See the README.md file for instructions on setting up your development environment.

## Review Process

1. Code review by at least one other developer
2. Automated checks must pass
3. Manual testing of key functionality

## Questions?

If you have any questions or need clarification, please reach out to the project maintainers. 