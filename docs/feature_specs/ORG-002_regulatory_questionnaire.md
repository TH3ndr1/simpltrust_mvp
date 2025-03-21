# Feature Specification: ORG-002 - Regulatory Questionnaire

## Overview
The Regulatory Questionnaire feature provides a simplified, guided questionnaire that helps organizations identify which regulations and standards apply to their business. Using plain language questions and smart logic based on organizational context, this feature eliminates the need for deep compliance expertise to determine applicable regulatory frameworks. The questionnaire serves as a critical first step in establishing the compliance scope and drives the subsequent unified control framework.

## Affected Components
- **Backend:**
  - Questionnaire engine service
  - Regulatory database service
  - Response analysis service
  - Results calculation service
  - API endpoints for questionnaire management
- **Frontend:**
  - Questionnaire UI
  - Question presentation components
  - Progress tracker
  - Results visualization
  - Guided help elements

## Technical Dependencies
- PostgreSQL database for questionnaire data storage
- Next.js for frontend rendering
- React Hook Form for questionnaire form management
- Zod for validation
- Tailwind CSS for styling
- Decision tree algorithm for questionnaire logic

## User Stories
- As a Compliance Officer, I want to complete a simplified questionnaire so that I can quickly identify which regulations apply to my organization without needing specialized knowledge.
- As an IT Administrator, I want the system to use our organization profile to pre-populate or filter questions so that I only see relevant inquiries.
- As a Risk Manager, I want to understand why certain regulations were identified as applicable so that I can validate the system's recommendations.
- As an Operations Manager, I want to save and resume the questionnaire so that I can gather information from colleagues if needed.
- As a CISO, I want to receive a clear summary of applicable regulations after completing the questionnaire so that I can understand our compliance requirements.

## Acceptance Criteria
- Questionnaire dynamically adapts based on organizational profile (industry, size, region)
- Questions use plain language without requiring regulatory expertise
- Questionnaire can be completed in under 15 minutes for most organizations
- Progress is automatically saved and users can resume where they left off
- Results clearly show which regulations apply and why
- Users can modify their answers and see updated results
- Questionnaire includes explanatory help text for complex concepts
- The system generates a downloadable report of applicable regulations
- Questions cover key regulatory domains (privacy, security, industry-specific)
- System identifies at least the following regulations when applicable: GDPR, NIS2, ISO 27001, NIST CSF, IEC 62443

## Integration Points
- Integrates with Organizational Profile (ORG-001) to pre-populate context
- Results feed into Regulatory Mapping (UCF-002) to build the unified framework
- Connects with Industry Templates (ORG-004) for industry-specific questions
- Provides foundation for Business Capability Mapping (ORG-003)
- Results are used across the platform to contextualize compliance activities

## Testing Strategy
- **Unit Tests:**
  - Test question logic and branching algorithms
  - Validate regulatory determination rules
  - Verify response storage and retrieval
  - Test results calculation accuracy
- **Integration Tests:**
  - Test flow from organizational profile to questionnaire
  - Verify data transfer to unified control framework
  - Test save and resume functionality
- **User Testing:**
  - Measure completion time across different organization types
  - Assess question clarity with non-expert users
  - Verify accuracy of regulation identification against expert opinion

## Implementation Phases
1. **Initial Implementation (Sprint 1)**
   - Develop core questionnaire engine
   - Implement basic question library covering key regulations
   - Create simple questionnaire UI with progress tracking
   - Implement results calculation logic
   - Develop basic results visualization

2. **Enhancements (Later Sprints - out of MVP scope)**
   - Add advanced branching logic
   - Implement comprehensive regulatory coverage
   - Create detailed explanation system for results
   - Add confidence scoring for regulatory applicability
   - Implement periodic re-assessment reminders

## UI/UX Design
- **Questionnaire Interface**
  - Clean, focused design showing one question at a time
  - Progress bar indicating completion percentage
  - Clear navigation (previous/next) buttons
  - Help tooltips for complex terminology
  - Save and exit option with resume capability
  
- **Question Components**
  - Mix of question types (multiple-choice, yes/no, checkboxes)
  - Visual indicators for required vs. optional questions
  - Input validation with helpful error messages
  - Conditional display logic based on previous answers

- **Results Dashboard**
  - Summary view of applicable regulations
  - Categorization by domain (privacy, security, etc.)
  - Explanation of why each regulation was deemed applicable
  - Export options for results report
  - Action button to proceed to control framework setup

## Data Model

```
Questionnaires:
  id: uuid (primary key)
  title: string
  description: text
  version: string
  active: boolean
  created_at: timestamp
  updated_at: timestamp

Questions:
  id: uuid (primary key)
  questionnaire_id: uuid (foreign key)
  text: string
  help_text: text
  question_type: enum [multiple_choice, yes_no, checkbox, text]
  required: boolean
  order: integer
  conditional_logic: jsonb
  created_at: timestamp
  updated_at: timestamp

QuestionOptions:
  id: uuid (primary key)
  question_id: uuid (foreign key)
  text: string
  value: string
  order: integer
  created_at: timestamp

UserResponses:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  user_id: uuid (foreign key)
  questionnaire_id: uuid (foreign key)
  completion_status: enum [not_started, in_progress, completed]
  percentage_complete: integer
  started_at: timestamp
  completed_at: timestamp
  created_at: timestamp
  updated_at: timestamp

ResponseAnswers:
  id: uuid (primary key)
  user_response_id: uuid (foreign key)
  question_id: uuid (foreign key)
  answer_value: text
  created_at: timestamp
  updated_at: timestamp

Regulations:
  id: uuid (primary key)
  code: string
  name: string
  description: text
  domain: string
  region: string
  created_at: timestamp
  updated_at: timestamp

ApplicableRegulations:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  regulation_id: uuid (foreign key)
  user_response_id: uuid (foreign key)
  applicability_score: float
  reasoning: text
  created_at: timestamp
  updated_at: timestamp
```

## API Endpoints

- `GET /api/v1/questionnaires/regulatory` - Get current regulatory questionnaire
- `GET /api/v1/questionnaires/:id/questions` - Get questions for questionnaire
- `POST /api/v1/questionnaires/responses` - Start or create a questionnaire response
- `GET /api/v1/questionnaires/responses/:id` - Get saved questionnaire response
- `PUT /api/v1/questionnaires/responses/:id` - Save answers to questionnaire
- `POST /api/v1/questionnaires/responses/:id/submit` - Submit completed questionnaire
- `GET /api/v1/questionnaires/responses/:id/result` - Get questionnaire results
- `GET /api/v1/questionnaires/responses/:id/applicable-regulations` - Get applicable regulations
- `GET /api/v1/questionnaires/responses/:id/export` - Export questionnaire results

## Success Metrics
- 95% of users complete the questionnaire in under 15 minutes
- Regulatory identification matches expert assessment with 90% accuracy
- Less than 10% of users need to make significant adjustments to identified regulations
- 90% of users report the questionnaire was easy to understand
- Average help tooltip usage < 5 per questionnaire

## Dependencies
- Organization profile system must be in place
- Regulatory database must be populated with key regulations
- Basic dashboard must exist to display questionnaire results

## Documentation Requirements
- **User Documentation:**
  - Guide to completing the regulatory questionnaire
  - Explanation of how regulations are determined
  - Tips for providing accurate information
  - FAQ addressing common questions about regulatory applicability

- **Developer Documentation:**
  - API reference for questionnaire endpoints
  - Data model documentation
  - Guide to extending the questionnaire with new regulations
  - Documentation of decision tree logic

## Resources and References
- [GDPR Requirements](https://gdpr.eu/requirements)
- [NIS2 Directive](https://digital-strategy.ec.europa.eu/en/policies/nis2-directive)
- [ISO 27001:2022](https://www.iso.org/standard/27001)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [IEC 62443 Standard](https://www.iec.org/standards/iec-62443) 