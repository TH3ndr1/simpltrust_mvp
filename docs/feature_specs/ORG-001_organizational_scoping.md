# Feature Specification: ORG-001 - Organizational Scoping

## Overview
The Organizational Scoping feature provides a guided, step-by-step approach for SMEs to define their regulatory landscape and map business capabilities to compliance requirements. This feature serves as the foundation of the compliance journey, helping users quickly understand which regulations apply to their business and how these regulations impact their operations.

This feature captures essential details about an organization's industry, size, location, and structure to contextualize regulatory requirements and establish the foundation for compliance scoping. It maintains a comprehensive profile of the organization that will be used across all compliance activities in SimpleTrust.

## Affected Components
- **Backend:**
  - User data service
  - Organization service
  - Regulatory mapping service
  - Business capability mapping service
  - Template management service
  - Industry classification service
  - API endpoints for profile management
- **Frontend:**
  - Onboarding wizard
  - Organization profile form
  - Questionnaire component
  - Template selection screens
  - Business capability mapping visualization
  - Navigation and progress tracking
  - Profile management UI

## Technical Dependencies
- Supabase Auth for user authentication
- PostgreSQL database for data storage
- Next.js for frontend rendering
- Tailwind CSS for styling
- React Hook Form for form management
- Zod for validation

## User Stories
- As a Compliance Officer, I want to complete a guided scoping questionnaire so that I can quickly identify the relevant regulations and map them to our business functions.
- As an IT Administrator, I want to select an industry-specific template so that I can tailor the compliance framework to our specific sector.
- As an Operations Manager, I want to map my business capabilities to compliance domains so that I can understand how regulations impact our core operations.
- As a Risk Manager, I want to visualize our regulatory landscape so that I can communicate compliance requirements to leadership.
- As a new user, I want the system to guide me through the initial setup process so that I can start using the platform quickly without extensive training.

## Acceptance Criteria
- Users can complete the guided questionnaire in under 30 minutes
- The system correctly identifies applicable regulations based on questionnaire responses
- Industry-specific templates are available for at least 3 key sectors (manufacturing, automotive, aerospace)
- Business capabilities are properly mapped to compliance domains based on user input
- Users can review and modify their regulatory scope after the initial setup
- Progress is automatically saved, allowing users to continue later if needed
- The interface is intuitive and provides helpful context throughout the process
- Generated regulatory landscape can be exported as a PDF or CSV file

## Integration Points
- Integrates with User Management for authentication and profile information
- Connects with the Unified Control Framework to map identified regulations to controls
- Links to Asset Management to associate business capabilities with assets
- Provides data to Assessment Planning to determine scope of assessments
- Feeds information to Gap Analysis and Reporting for compliance status visualization

## Testing Strategy
- **Unit Tests:**
  - Test questionnaire logic and branching
  - Validate regulatory identification algorithms
  - Verify template loading and customization
  - Test business capability mapping functions
- **Integration Tests:**
  - Verify end-to-end flow from questionnaire to regulatory mapping
  - Test data persistence and retrieval
  - Validate integration with downstream components
- **Performance Tests:**
  - Measure questionnaire completion time
  - Verify system responsiveness with large templates
  - Test concurrent user access scenarios

## Implementation Phases
1. **Initial Setup (Sprint 1)**
   - Implement user authentication and profile creation
   - Develop basic questionnaire flow with regulatory identification
   - Create industry template structure
   - Implement business capability mapping UI
   - Develop progress tracking and save functionality

2. **Template Expansion (Sprint 1-2)**
   - Complete industry-specific templates for manufacturing
   - Create templates for automotive industry
   - Develop templates for aerospace sector
   - Implement template customization features

3. **Visualization and Export (Sprint 2)**
   - Implement regulatory landscape visualization
   - Develop business capability mapping visualization
   - Create export functionality for reports
   - Add review and modification capabilities

## UI/UX Design
- **Onboarding Wizard**
  - Multi-step wizard with progress indicators
  - Clear navigation between sections
  - Context-sensitive help and tooltips
  - Mobile-responsive design for accessibility

- **Questionnaire Design**
  - Clear, concise questions with examples
  - Conditional logic to show relevant questions only
  - Input validation with helpful error messages
  - Progress saving and resume functionality

- **Template Selection**
  - Visual card-based template selection
  - Preview capability for templates
  - Customization options clearly presented
  - Template comparison functionality

- **Business Capability Mapping**
  - Drag-and-drop interface for mapping
  - Visual representation of connections
  - Filtering and search capabilities
  - Interactive visualization with zoom functionality

## Data Model

```
Organizations:
  id: uuid (primary key)
  name: string
  industry: string
  size: string
  region: string
  created_at: timestamp
  updated_at: timestamp

BusinessCapabilities:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  name: string
  description: text
  criticality: enum (low, medium, high)
  parent_id: uuid (self-reference, nullable)
  created_at: timestamp
  updated_at: timestamp

RegulatoryScope:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  regulation_id: uuid (foreign key)
  applicable: boolean
  relevance_score: float
  created_at: timestamp
  updated_at: timestamp

Regulations:
  id: uuid (primary key)
  code: string
  name: string
  description: text
  region: string
  industry: string[]
  created_at: timestamp
  updated_at: timestamp

CapabilityRegulationMapping:
  id: uuid (primary key)
  capability_id: uuid (foreign key)
  regulation_id: uuid (foreign key)
  impact_level: enum (low, medium, high)
  created_at: timestamp
  updated_at: timestamp

IndustryTemplates:
  id: uuid (primary key)
  name: string
  industry: string
  description: text
  capabilities: jsonb
  regulations: jsonb
  created_at: timestamp
  updated_at: timestamp
```

## API Endpoints

### Organization Management
- `POST /api/v1/organizations` - Create new organization
- `GET /api/v1/organizations/:id` - Get organization details
- `PUT /api/v1/organizations/:id` - Update organization details

### Questionnaire
- `GET /api/v1/questionnaire/sections` - Get questionnaire sections and questions
- `POST /api/v1/questionnaire/responses` - Save questionnaire responses
- `GET /api/v1/questionnaire/responses/:organizationId` - Get saved responses

### Business Capabilities
- `GET /api/v1/capabilities` - List business capabilities
- `POST /api/v1/capabilities` - Create business capability
- `PUT /api/v1/capabilities/:id` - Update business capability
- `DELETE /api/v1/capabilities/:id` - Delete business capability
- `GET /api/v1/capabilities/mapping/:organizationId` - Get capability mapping

### Regulatory Scope
- `GET /api/v1/regulations` - List available regulations
- `GET /api/v1/regulations/scope/:organizationId` - Get regulatory scope
- `POST /api/v1/regulations/scope` - Save regulatory scope
- `GET /api/v1/regulations/templates` - List industry templates
- `GET /api/v1/regulations/templates/:id` - Get template details

## Documentation Requirements
- **User Documentation:**
  - Step-by-step guide to completing organizational scoping
  - Template selection and customization guide
  - Business capability mapping tutorial
  - FAQs for common questions and issues

- **Developer Documentation:**
  - API reference for all endpoints
  - Data model documentation
  - Integration guidelines for connecting with other modules
  - Testing procedures and requirements

## Resources and References
- [ISO 27001 Control Framework](https://www.iso.org/standard/27001)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [NIS2 Directive](https://digital-strategy.ec.europa.eu/en/policies/nis2-directive)
- [GDPR Requirements](https://gdpr.eu/requirements)
- [IEC 62443 Standard](https://www.iec.org/standards/iec-62443) 