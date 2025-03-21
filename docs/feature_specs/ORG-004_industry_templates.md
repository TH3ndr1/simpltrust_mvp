# Feature Specification: ORG-004 - Industry Templates

## Overview
The Industry Templates feature provides pre-configured templates for industry-specific regulatory requirements, business capabilities, and control frameworks. These templates accelerate the setup process for organizations by offering relevant starting points based on their industry classification. Instead of starting from scratch, users can leverage these templates to quickly establish a foundation tailored to their sector, significantly reducing the expertise and time required to begin their compliance journey.

## Affected Components
- **Backend:**
  - Template management service
  - Industry classification service
  - Template versioning service
  - Template customization engine
  - API endpoints for template management
- **Frontend:**
  - Template browser UI
  - Template selection interface
  - Template customization UI
  - Template preview components
  - Template application wizard

## Technical Dependencies
- PostgreSQL database for template storage
- Next.js for frontend rendering
- JSON schema for template validation
- Diff algorithm for template customization
- Tailwind CSS for styling
- Version control mechanism for templates

## User Stories
- As a Compliance Officer, I want to apply an industry-specific template so that I can quickly establish a relevant regulatory framework without extensive research.
- As an IT Administrator, I want to preview an industry template before applying it so that I can understand what will be created in our system.
- As a Risk Manager, I want to customize an industry template to our specific needs so that it reflects our unique regulatory landscape.
- As a Consultant, I want to create and save custom templates so that I can reuse them across multiple client organizations.
- As an Operations Manager, I want to understand which template best fits our organization so that we start with the most relevant baseline.

## Acceptance Criteria
- System provides templates for key industries (manufacturing, automotive, aerospace)
- Templates include relevant regulations, business capabilities, and control frameworks
- Users can preview templates before applying them
- Templates can be customized and saved as organization-specific versions
- Template application is non-destructive (doesn't overwrite existing data)
- Templates are versioned and include creation/update dates
- Users can compare multiple templates
- Templates include explanatory metadata about their purpose and applicability
- Templates can be exported and imported
- System provides guidance on selecting the appropriate template

## Integration Points
- Integrates with Organizational Profile (ORG-001) for industry classification
- Templates feed into Regulatory Questionnaire (ORG-002) for pre-configured questions
- Templates provide baseline for Business Capability Mapping (ORG-003)
- Templates include pre-configured control mappings for Unified Control Framework (UCF-002)
- Templates contain asset categories for Asset Inventory (ASM-001)
- Templates include assessment templates for Assessment Templates (ASP-001)

## Testing Strategy
- **Unit Tests:**
  - Test template CRUD operations
  - Validate template schema and content
  - Verify template versioning system
  - Test template application logic
- **Integration Tests:**
  - Test template application across multiple system components
  - Verify data flow from templates to dependent features
  - Test template customization and saving
- **User Testing:**
  - Evaluate template relevance for specific industries
  - Assess clarity of template descriptions and selection process
  - Test template customization workflow

## Implementation Phases
1. **Initial Implementation (Sprint 1-3)**
   - Create template data model and storage
   - Implement template browser and selection UI
   - Develop manufacturing industry template (Sprint 1)
   - Implement template application and customization
   - Add automotive industry template (Sprint 2)
   - Add aerospace industry template (Sprint 3)

2. **Enhancements (Later Sprints - out of MVP scope)**
   - Add additional industry templates
   - Implement template marketplace
   - Create template rating and feedback system
   - Add template sharing capabilities
   - Implement advanced template customization

## UI/UX Design
- **Template Browser**
  - Card-based grid of available templates
  - Filter by industry, regulation, and other attributes
  - Search functionality
  - Preview button on each template card
  - Clear indication of template version and last update
  
- **Template Preview**
  - Overview of template contents
  - Tabs for different sections (regulations, capabilities, controls)
  - Clear indication of what will be created/modified
  - Apply button with confirmation dialog
  - Customize option

- **Template Customization**
  - Form-based editor for template components
  - Ability to add/remove regulations or capabilities
  - Option to save customizations
  - Comparison view showing differences from base template

## Data Model

```
IndustryTemplates:
  id: uuid (primary key)
  name: string
  description: text
  industry: string
  sub_industry: string (nullable)
  version: string
  author: string
  is_system_template: boolean
  created_at: timestamp
  updated_at: timestamp

TemplateContents:
  id: uuid (primary key)
  template_id: uuid (foreign key)
  content_type: enum [regulations, capabilities, controls, assets, assessments]
  content: jsonb
  created_at: timestamp
  updated_at: timestamp

TemplateAppliedLog:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  template_id: uuid (foreign key)
  applied_by: uuid (foreign key to Users)
  customizations: jsonb
  created_at: timestamp

TemplateCustomizations:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  base_template_id: uuid (foreign key)
  name: string
  description: text
  customizations: jsonb
  created_by: uuid (foreign key to Users)
  created_at: timestamp
  updated_at: timestamp

TemplateVersions:
  id: uuid (primary key)
  template_id: uuid (foreign key)
  version_number: string
  changes: text
  published_at: timestamp
  created_at: timestamp
```

## API Endpoints

- `GET /api/v1/templates/industries` - List available industry templates
- `GET /api/v1/templates/:id` - Get template details
- `GET /api/v1/templates/:id/preview` - Preview template contents
- `POST /api/v1/templates/:id/apply` - Apply template to organization
- `POST /api/v1/templates/:id/customize` - Save customized template
- `GET /api/v1/templates/custom` - List custom templates
- `POST /api/v1/templates/custom` - Create custom template
- `PUT /api/v1/templates/custom/:id` - Update custom template
- `DELETE /api/v1/templates/custom/:id` - Delete custom template
- `GET /api/v1/templates/history` - Get template application history
- `GET /api/v1/templates/recommendations` - Get template recommendations

## Success Metrics
- 80% of users apply an industry template during initial setup
- Average setup time reduced by 60% when using templates
- 90% of template-driven setups require less than 20% customization
- Templates cover regulatory requirements with 85% accuracy for their industry
- 85% of users report templates saved them significant research time

## Dependencies
- Organization profile system must be in place
- Database of regulations must be populated
- Business capability model framework must exist
- Control framework model must exist
- User authentication and permission system must be working

## Documentation Requirements
- **User Documentation:**
  - Guide to selecting the appropriate industry template
  - Instructions for applying and customizing templates
  - Overview of template contents
  - FAQ about template usage and limitations

- **Developer Documentation:**
  - API reference for template endpoints
  - Data model documentation
  - Template schema documentation
  - Guidelines for creating new industry templates

## Resources and References
- [Industry Classification Standards](https://www.census.gov/naics/)
- [Manufacturing Industry Regulations](https://www.manufacturingtomorrow.com/article/2021/01/regulations-all-manufacturers-should-know/16544)
- [Automotive Industry Compliance Standards](https://www.iso.org/standard/68383.html)
- [Aerospace Industry Regulatory Framework](https://www.faa.gov/regulations_policies/)
- [Healthcare Industry Compliance Guidelines](https://www.hhs.gov/hipaa/index.html)
- [Financial Services Regulatory Requirements](https://www.ffiec.gov/cybersecurity.htm) 