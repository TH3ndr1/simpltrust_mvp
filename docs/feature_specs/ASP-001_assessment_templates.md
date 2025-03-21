# Feature Specification: ASP-001 - Assessment Templates

## Overview
The Assessment Templates feature enables organizations to create standardized assessment frameworks for evaluating their compliance posture against various requirements. This feature allows for the creation, management, and customization of assessment templates that can be tailored to specific regulatory frameworks, industry standards, or internal policies. By standardizing the assessment process, organizations can ensure consistent evaluation methodologies, repeatable processes, and comparable results across different assessments and time periods. This foundation is essential for systematic compliance management and continuous improvement.

## Affected Components
- **Backend:**
  - Template management service
  - Question bank service
  - Scoring mechanism service
  - Template versioning service
  - Template import/export service
  - API endpoints for template management
- **Frontend:**
  - Template builder interface
  - Question management interface
  - Section and dependency management
  - Template preview functionality
  - Template catalog
  - Template import/export UI

## Technical Dependencies
- Control Framework Model (UCF-001)
- Regulatory Mapping (UCF-002)
- Asset Inventory (ASM-001) for asset-specific assessments
- PostgreSQL for data storage
- Next.js for frontend rendering
- React for UI components
- JSON Schema for template validation
- Tailwind CSS for styling
- React Query for data fetching
- Formik or React Hook Form for form management

## User Stories
- As a Compliance Officer, I want to create assessment templates mapped to specific regulatory frameworks so that I can systematically evaluate compliance with those frameworks.
- As an Auditor, I want to use standardized assessment templates so that I can consistently evaluate compliance across different departments or periods.
- As a Security Analyst, I want to customize existing assessment templates so that they reflect our organization's specific security requirements and context.
- As a Compliance Manager, I want to import industry-standard templates so that I don't have to build assessments from scratch.
- As a Risk Manager, I want to include risk-based questions in assessment templates so that risk and compliance assessments are aligned.
- As a Department Head, I want to preview assessment templates so that I can understand what will be evaluated before an assessment begins.

## Acceptance Criteria
- System allows creation of hierarchical templates (sections, subsections, questions)
- Users can define different question types (multiple choice, yes/no, scale, text, evidence upload)
- Templates support conditional logic (questions that appear based on previous answers)
- Users can assign scoring methodologies to templates and questions
- System supports template versioning with audit history
- Templates can be linked to specific control frameworks and regulations
- Users can clone and customize existing templates
- System allows import/export of templates in standard formats
- Users can preview templates as they would appear during assessment
- Templates support tagging and categorization for easy discovery
- System supports multi-language templates

## Integration Points
- Leverages control definitions from Control Framework Model (UCF-001)
- Uses regulatory requirements from Regulatory Mapping (UCF-002)
- Provides templates for Assessment Execution (ASP-002)
- Informs Assessment Scheduling (ASP-003)
- May incorporate asset data from Asset Inventory (ASM-001) for asset-specific assessments
- Templates may reference control-asset mappings from Asset-Control Mapping (ASM-004)

## Testing Strategy
- **Unit Tests:**
  - Test template creation and validation
  - Verify scoring calculations
  - Test conditional logic handling
  - Validate template versioning
- **Integration Tests:**
  - Test template integration with control frameworks
  - Verify template usage in assessment execution
  - Test import/export functionality
  - Validate multilingual support
- **Performance Tests:**
  - Test template rendering with complex conditional logic
  - Measure template loading performance with large templates
  - Verify import performance with large template sets

## Implementation Phases
1. **Initial Implementation (Sprint 6)**
   - Create template data model
   - Implement basic template management
   - Develop standard question types
   - Create template builder interface
   - Implement template preview
   - Develop template catalog

2. **Enhancements (Later Sprints - partially in MVP scope)**
   - Implement advanced conditional logic
   - Develop template versioning
   - Add import/export functionality
   - Implement scoring mechanisms
   - Add template tagging and categorization
   - Develop template sharing and collaboration features

## UI/UX Design
- **Template Builder Interface**
  - Drag-and-drop section and question management
  - Question type selector with configuration options
  - Conditional logic builder with visual flow representation
  - Scoring configuration panel
  - Template metadata editor
  - Version control interface
  
- **Question Bank Management**
  - Question library with filtering and search
  - Question categorization and tagging
  - Question preview
  - Bulk question import/edit
  - Question usage tracking (which templates use which questions)

- **Template Catalog**
  - Template grid with filtering and search
  - Template cards with metadata and preview
  - Version history view
  - Usage statistics
  - Clone and customize options
  - Import/export controls

## Data Model

```
AssessmentTemplates:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  name: string
  description: text
  version: string
  status: enum [draft, published, archived]
  framework_ids: uuid[] (foreign keys to ControlFrameworks)
  regulatory_requirement_ids: uuid[] (foreign keys to RegulatoryRequirements, nullable)
  is_standard: boolean
  scoring_type: enum [binary, weighted, percentage, custom]
  passing_threshold: float (nullable)
  default_language: string
  created_by: uuid (foreign key to Users)
  created_at: timestamp
  updated_at: timestamp
  published_at: timestamp (nullable)

TemplateSections:
  id: uuid (primary key)
  template_id: uuid (foreign key to AssessmentTemplates)
  parent_section_id: uuid (foreign key to TemplateSections, nullable)
  name: string
  description: text
  order_index: integer
  weight: float (for weighted scoring)
  conditional_display: jsonb (nullable)
  created_at: timestamp
  updated_at: timestamp

TemplateQuestions:
  id: uuid (primary key)
  section_id: uuid (foreign key to TemplateSections)
  question_bank_id: uuid (foreign key to QuestionBank, nullable)
  question_text: text
  question_type: enum [yes_no, multiple_choice, scale, text, number, date, file, evidence]
  help_text: text (nullable)
  is_required: boolean
  order_index: integer
  weight: float (for weighted scoring)
  configuration: jsonb
  conditional_display: jsonb (nullable)
  control_ids: uuid[] (foreign keys to Controls, nullable)
  regulatory_requirement_ids: uuid[] (foreign keys to RegulatoryRequirements, nullable)
  risk_related: boolean
  created_at: timestamp
  updated_at: timestamp

QuestionOptions:
  id: uuid (primary key)
  question_id: uuid (foreign key to TemplateQuestions)
  option_text: text
  score_value: float (nullable)
  is_compliant: boolean (nullable)
  order_index: integer
  requires_evidence: boolean
  requires_justification: boolean
  action_trigger: jsonb (nullable)
  created_at: timestamp
  updated_at: timestamp

QuestionBank:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  question_text: text
  question_type: enum [yes_no, multiple_choice, scale, text, number, date, file, evidence]
  help_text: text (nullable)
  category: string
  tags: string[]
  framework_ids: uuid[] (foreign keys to ControlFrameworks, nullable)
  control_ids: uuid[] (foreign keys to Controls, nullable)
  regulatory_requirement_ids: uuid[] (foreign keys to RegulatoryRequirements, nullable)
  is_standard: boolean
  created_by: uuid (foreign key to Users)
  created_at: timestamp
  updated_at: timestamp

TemplateVersions:
  id: uuid (primary key)
  template_id: uuid (foreign key to AssessmentTemplates)
  version: string
  change_summary: text
  template_snapshot: jsonb
  created_by: uuid (foreign key to Users)
  created_at: timestamp

TemplateTranslations:
  id: uuid (primary key)
  template_id: uuid (foreign key to AssessmentTemplates)
  language_code: string
  translated_name: string
  translated_description: text
  created_at: timestamp
  updated_at: timestamp

QuestionTranslations:
  id: uuid (primary key)
  question_id: uuid (foreign key to TemplateQuestions or QuestionBank)
  language_code: string
  translated_text: text
  translated_help_text: text (nullable)
  created_at: timestamp
  updated_at: timestamp

OptionTranslations:
  id: uuid (primary key)
  option_id: uuid (foreign key to QuestionOptions)
  language_code: string
  translated_text: text
  created_at: timestamp
  updated_at: timestamp
```

## API Endpoints

- `GET /api/v1/assessment/templates` - List assessment templates
- `POST /api/v1/assessment/templates` - Create assessment template
- `GET /api/v1/assessment/templates/:id` - Get template details
- `PUT /api/v1/assessment/templates/:id` - Update template
- `DELETE /api/v1/assessment/templates/:id` - Delete template
- `POST /api/v1/assessment/templates/:id/publish` - Publish template
- `POST /api/v1/assessment/templates/:id/archive` - Archive template
- `POST /api/v1/assessment/templates/:id/clone` - Clone template

- `GET /api/v1/assessment/templates/:id/sections` - List template sections
- `POST /api/v1/assessment/templates/:id/sections` - Create template section
- `PUT /api/v1/assessment/templates/:id/sections/:sectionId` - Update section
- `DELETE /api/v1/assessment/templates/:id/sections/:sectionId` - Delete section
- `PUT /api/v1/assessment/templates/:id/sections/reorder` - Reorder sections

- `GET /api/v1/assessment/sections/:id/questions` - List section questions
- `POST /api/v1/assessment/sections/:id/questions` - Add question to section
- `PUT /api/v1/assessment/sections/:id/questions/:questionId` - Update question
- `DELETE /api/v1/assessment/sections/:id/questions/:questionId` - Remove question
- `PUT /api/v1/assessment/sections/:id/questions/reorder` - Reorder questions

- `GET /api/v1/assessment/questions/:id/options` - List question options
- `POST /api/v1/assessment/questions/:id/options` - Add option to question
- `PUT /api/v1/assessment/questions/:id/options/:optionId` - Update option
- `DELETE /api/v1/assessment/questions/:id/options/:optionId` - Remove option
- `PUT /api/v1/assessment/questions/:id/options/reorder` - Reorder options

- `GET /api/v1/assessment/question-bank` - List question bank items
- `POST /api/v1/assessment/question-bank` - Add question to bank
- `PUT /api/v1/assessment/question-bank/:id` - Update bank question
- `DELETE /api/v1/assessment/question-bank/:id` - Remove bank question
- `GET /api/v1/assessment/question-bank/categories` - Get question categories

- `GET /api/v1/assessment/templates/:id/versions` - List template versions
- `GET /api/v1/assessment/templates/:id/versions/:versionId` - Get specific version
- `POST /api/v1/assessment/templates/:id/versions` - Create new version

- `POST /api/v1/assessment/templates/import` - Import template
- `GET /api/v1/assessment/templates/:id/export` - Export template
- `GET /api/v1/assessment/templates/:id/preview` - Preview template

## Success Metrics
- 80% of compliance assessments use standardized templates
- Time to create new assessments reduced by 50% with templates
- Template reuse rate of at least 70% (vs. creating new templates)
- User satisfaction with template builder is 4.0/5 or higher
- Average time to complete assessments reduced by 30% with optimized templates
- 90% of templates include evidence requirements for key controls

## Dependencies
- Control Framework Model (UCF-001) should be implemented for linking templates to controls
- User authentication and permission system must be working
- Basic UI components must be available
- File storage system for template imports/exports

## Documentation Requirements
- **User Documentation:**
  - Guide to creating effective assessment templates
  - Template builder tutorial
  - Best practices for question design
  - Instructions for template versioning
  - Guide to importing and exporting templates

- **Developer Documentation:**
  - API reference for template management
  - Documentation of template data structures
  - Guide for extending question types
  - Integration points with other system components

## Resources and References
- [NIST Assessment Methodologies](https://csrc.nist.gov/projects/assessing-security-and-privacy-controls)
- [ISO 19011: Guidelines for Auditing Management Systems](https://www.iso.org/standard/70017.html)
- [ISACA Control Assessment Guidance](https://www.isaca.org/resources/compliance)
- [Common Assessment Framework (CAF)](https://www.gsa.gov/technology/it-security/common-assessment-framework)
- [Question and Answer Format Best Practices](https://www.nngroup.com/articles/form-design-best-practices/)
- [The CIS Controls Assessment Specification](https://www.cisecurity.org/insights/white-papers/cis-controls-v8-assessment-specification) 