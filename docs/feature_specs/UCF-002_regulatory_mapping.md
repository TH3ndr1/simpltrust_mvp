# Feature Specification: UCF-002 - Regulatory Mapping

## Overview
The Regulatory Mapping feature enables the mapping of specific regulatory requirements to the unified control framework, allowing organizations to maintain compliance with multiple regulations while managing a single set of controls. This feature is a core component of the platform's ability to reduce redundancy and provide a consolidated view of compliance requirements across various regulatory frameworks. By establishing clear relationships between regulations and controls, the system can show how a single control implementation can satisfy multiple regulatory requirements.

## Affected Components
- **Backend:**
  - Regulatory database service
  - Mapping relationship service
  - Control mapping validation service
  - Regulation versioning service
  - API endpoints for regulatory mapping
- **Frontend:**
  - Regulatory mapping interface
  - Regulatory requirement browser
  - Mapping visualization tool
  - Mapping management UI
  - Coverage analysis dashboard

## Technical Dependencies
- PostgreSQL database for relationship storage
- Control Framework Model (UCF-001)
- Next.js for frontend rendering
- React for UI components
- D3.js or similar for visualization
- Zod for validation
- Tailwind CSS for styling

## User Stories
- As a Compliance Officer, I want to see which regulations map to each control so that I can understand the compliance coverage of our control framework.
- As a Risk Manager, I want to understand which regulatory requirements are relevant to our business so that I can focus on implementing the most critical controls.
- As an IT Administrator, I want to see how a single control maps to multiple regulations so that I can reduce duplicative efforts in implementation.
- As a CISO, I want to visualize our compliance coverage across different regulations so that I can identify and address any gaps.
- As a Consultant, I want to create and manage regulatory mappings so that I can customize the framework for my client's specific needs.

## Acceptance Criteria
- Users can map regulatory requirements to controls in the unified framework
- System supports mapping for key regulations (GDPR, NIS2, ISO 27001, NIST CSF, IEC 62443)
- Mapping interface shows bidirectional relationships (regulations to controls and controls to regulations)
- Users can visualize regulatory coverage across the control framework
- Regulatory mapping accounts for different control levels (domain, family, individual control)
- System supports versioning of regulations and maintains mapping history
- Users can import standard mappings from common frameworks
- Coverage metrics show percentage of compliance with each regulation
- System validates mapping consistency and identifies potential conflicts
- Mapping changes are tracked with audit history

## Integration Points
- Integrates with Control Framework Model (UCF-001) as the foundation for mapping
- Takes input from Regulatory Questionnaire (ORG-002) to determine applicable regulations
- Feeds Control Consolidation (UCF-003) to identify overlapping controls
- Provides data for Framework Visualization (UCF-004)
- Supports Assessment Templates (ASP-001) by providing regulatory context
- Used by AI Recommendation Engine (ARP-001) to generate contextual recommendations

## Testing Strategy
- **Unit Tests:**
  - Test mapping creation, updating, and deletion
  - Validate regulatory version management
  - Test coverage calculation logic
  - Verify mapping consistency validation
- **Integration Tests:**
  - Test integration with control framework
  - Verify data flow to control consolidation
  - Test bulk import/export functionality
- **Performance Tests:**
  - Measure mapping visualization performance with large frameworks
  - Test coverage calculation performance
  - Verify framework navigation with complex mappings

## Implementation Phases
1. **Initial Implementation (Sprint 2)**
   - Design and implement regulatory database schema
   - Create mapping relationship data model
   - Implement basic mapping CRUD operations
   - Develop simple mapping visualization
   - Support mapping for two key regulations (ISO 27001, NIS2)

2. **Enhancements (Later Sprints - out of MVP scope)**
   - Add support for additional regulations
   - Implement advanced visualization features
   - Create regulatory change management system
   - Add gap analysis capabilities
   - Implement mapping recommendation engine

## UI/UX Design
- **Regulatory Mapping Interface**
  - Split-pane view showing controls and regulations
  - Drag-and-drop functionality for creating mappings
  - Filtering by domain, family, or regulation
  - Color-coding for mapping status and coverage
  - Search capabilities for both controls and requirements
  
- **Coverage Dashboard**
  - Visual representation of regulatory coverage
  - Heat map showing coverage density across framework
  - Metrics showing compliance percentage by regulation
  - Gap indicators for areas with low coverage
  - Drill-down capability for detailed analysis

- **Mapping Management**
  - Tabular view of all mappings
  - Bulk edit and delete functionality
  - Version history and audit trail
  - Import/export controls
  - Validation messages for inconsistencies

## Data Model

```
Regulations:
  id: uuid (primary key)
  code: string
  name: string
  description: text
  version: string
  publisher: string
  publication_date: date
  status: enum [draft, active, deprecated, superseded]
  created_at: timestamp
  updated_at: timestamp

RegulatoryRequirements:
  id: uuid (primary key)
  regulation_id: uuid (foreign key)
  requirement_id: string
  title: string
  description: text
  category: string
  parent_id: uuid (self-reference, nullable)
  order: integer
  created_at: timestamp
  updated_at: timestamp

ControlRegulatoryMappings:
  id: uuid (primary key)
  control_id: uuid (foreign key to Controls)
  requirement_id: uuid (foreign key to RegulatoryRequirements)
  mapping_type: enum [direct, partial, interpretive]
  notes: text
  created_by: uuid (foreign key to Users)
  created_at: timestamp
  updated_at: timestamp

RegulatoryMappingVersions:
  id: uuid (primary key)
  regulation_id: uuid (foreign key)
  version_number: string
  effective_date: date
  mapping_data: jsonb
  created_at: timestamp
  updated_at: timestamp

RegulatoryApplicability:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  regulation_id: uuid (foreign key)
  is_applicable: boolean
  applicability_notes: text
  determined_by: uuid (foreign key to Users)
  created_at: timestamp
  updated_at: timestamp
```

## API Endpoints

- `GET /api/v1/regulations` - List all regulations
- `GET /api/v1/regulations/:id` - Get regulation details
- `GET /api/v1/regulations/:id/requirements` - Get regulatory requirements
- `GET /api/v1/requirements/:id` - Get requirement details
- `GET /api/v1/requirements/:id/controls` - Get controls mapped to requirement
- `GET /api/v1/controls/:id/requirements` - Get requirements mapped to control
- `POST /api/v1/mappings` - Create new control-regulation mapping
- `PUT /api/v1/mappings/:id` - Update mapping
- `DELETE /api/v1/mappings/:id` - Delete mapping
- `GET /api/v1/mappings/coverage` - Get regulatory coverage metrics
- `POST /api/v1/mappings/import` - Import mappings from file
- `GET /api/v1/mappings/export` - Export mappings to file
- `GET /api/v1/mappings/validation` - Validate mapping consistency

## Success Metrics
- 90% of controls in the framework have at least one regulatory mapping
- Average time to set up regulatory mappings reduced by 50% compared to manual methods
- 95% mapping accuracy when compared to expert-created mappings
- 80% of users report the consolidated view improves their understanding of compliance requirements
- Visualization and navigation rated as "easy to use" by 85% of users

## Dependencies
- Control Framework Model (UCF-001) must be implemented
- Regulatory database must be populated with key regulations
- User authentication and permission system must be working
- Basic UI components must be available

## Documentation Requirements
- **User Documentation:**
  - Guide to understanding regulatory mappings
  - Instructions for creating and managing mappings
  - Best practices for maintaining mapping consistency
  - Tutorial on using the visualization tools

- **Developer Documentation:**
  - API reference for mapping endpoints
  - Data model documentation with relationships
  - Guide for extending the regulation database
  - Documentation of coverage calculation algorithms

## Resources and References
- [NIST Cybersecurity Framework Mapping](https://www.nist.gov/cyberframework/framework-documents)
- [ISO 27001 to NIST CSF Mapping](https://www.iso.org/standard/27001)
- [GDPR to ISO 27001 Mapping](https://gdpr.eu/compliance-frameworks/)
- [COBIT Mapping to Industry Standards](https://www.isaca.org/resources/cobit)
- [Unified Compliance Framework (UCF)](https://www.unifiedcompliance.com/)
- [Common Controls Hub](https://commoncontrolshub.com/) 