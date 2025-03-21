# Feature Specification: UCF-001 Control Framework Model

## Overview

The Control Framework Model serves as the foundation of the SimpleTrust platform, providing a structured representation of security and compliance controls across multiple frameworks and regulations. This feature enables organizations to build, manage, and customize a central repository of controls that can be mapped to various regulatory requirements, internal policies, and industry best practices.

Rather than managing separate control sets for each framework (NIST, ISO, PCI, etc.), the Control Framework Model allows organizations to create a unified control catalog where each control can satisfy multiple regulatory requirements. This model supports hierarchical relationships between controls, enabling the representation of control families, objectives, and specific implementation requirements. The model also facilitates the definition of control attributes such as criticality, type, implementation responsibility, and testing procedures.

By providing this unified view of controls, the feature significantly reduces duplication of effort in compliance management, enables cross-framework gap analysis, and provides a single source of truth for control implementation across the organization. It serves as the cornerstone for other features like Regulatory Mapping (UCF-002), Control Consolidation (UCF-003), and Asset-Control Mapping (ASM-004).

## Affected Components

### Backend Components
- Control Repository Service
- Control Metadata Service
- Control Relationship Manager
- Control API Layer
- Control Import/Export Engine
- Control Version Management
- Control Tagging Service
- Control Search Engine

### Frontend Components
- Control Explorer Interface
- Control Editor
- Framework Browser
- Control Hierarchy Viewer
- Control Detail View
- Control Import/Export Interface
- Control Search Interface
- Control Filtering Panel

## Technical Dependencies

- **PostgreSQL**: For storing the control framework data model
- **Elasticsearch**: For advanced control search capabilities
- **Next.js**: For frontend framework
- **React**: For UI components
- **Tailwind CSS**: For styling
- **Node.js**: For backend services
- **Express**: For API endpoints
- **TypeScript**: For type-safe development

## User Stories

1. **As a Compliance Manager**, I want to create a unified control framework that incorporates requirements from multiple regulations, so that I can manage compliance more efficiently without duplicating controls.

2. **As a Security Officer**, I want to define hierarchical relationships between controls, so that I can organize them into a logical structure that reflects control families and sub-requirements.

3. **As a Compliance Analyst**, I want to add detailed metadata to controls (such as implementation guidance, test procedures, and evidence requirements), so that implementers and auditors have clear guidance on how to implement and verify each control.

4. **As an IT Manager**, I want to assign responsibility attributes to controls, so that it's clear which teams or roles are responsible for implementing each control.

5. **As an Auditor**, I want to search and filter controls based on various attributes, so that I can quickly find relevant controls during assessment activities.

6. **As a Governance Officer**, I want to import standard control frameworks (such as NIST 800-53, ISO 27001, or CIS), so that I can use them as a starting point for my unified framework.

7. **As a Risk Manager**, I want to associate risk information with controls, so that I can prioritize control implementation based on risk reduction potential.

8. **As a Compliance Director**, I want to version control my framework, so that I can track changes over time and maintain audit history of control definitions.

## Acceptance Criteria

1. The system supports creation, reading, updating, and deletion of control definitions
2. Controls can be organized in a hierarchical structure with parent-child relationships
3. The control model supports various metadata fields including description, purpose, implementation guidance, and testing procedures
4. Controls can be tagged with multiple attributes for categorization and filtering
5. The system provides search capabilities across all control attributes
6. Standard frameworks can be imported from CSV, Excel, or JSON formats
7. The system maintains version history for control changes with audit trails
8. Controls can be exported in various formats for reporting and sharing
9. The system supports linking controls to other entities like risks, assets, and requirements
10. Controls can be duplicated and customized while maintaining relationships
11. The system provides a visual representation of the control hierarchy
12. Control metadata can include attachments and references to external documentation

## Integration Points

- **Regulatory Mapping (UCF-002)**: The control framework serves as the foundation for mapping regulations to controls
- **Control Consolidation (UCF-003)**: Enables the identification of redundant controls that can be consolidated
- **Framework Visualization (UCF-004)**: Provides the data for visualizing framework relationships
- **Asset-Control Mapping (ASM-004)**: Controls from the framework are mapped to assets
- **Risk Assessment (RSK-001)**: Controls are associated with risks they mitigate
- **Assessment Templates (ASP-001)**: Controls form the basis of assessment questionnaires
- **Gap Identification (GAP-001)**: Control framework is the baseline for identifying compliance gaps

## Testing Strategy

### Unit Tests
- Control creation, updating, and deletion
- Control relationship management
- Control metadata validation
- Control search and filtering
- Control import/export functions

### Integration Tests
- End-to-end control framework management
- Framework integration with regulatory mapping
- Control relationship hierarchy functionality
- Version control and history tracking

### Performance Tests
- Large control framework loading and navigation
- Search performance with large control sets
- Concurrent control editing by multiple users
- Import performance for large frameworks

### User Tests
- Control editor usability
- Framework navigation and exploration
- Search and filtering effectiveness
- Framework visualization comprehension

## Implementation Phases

### Initial Implementation (Sprint 1)
1. Design control framework data model
2. Implement core control CRUD operations
3. Create basic control hierarchy management
4. Develop control metadata management
5. Implement control search and filtering
6. Create control explorer interface
7. Develop control detail view

### Enhanced Implementation (Sprint 2)
1. Implement framework import/export functionality
2. Create version control and audit history
3. Develop advanced control relationships
4. Implement control tagging system
5. Create control hierarchy visualization
6. Develop bulk operations for controls
7. Implement control templates and cloning

## UI/UX Design

### Control Explorer
- Tree view of control hierarchy
- List/grid toggle for different viewing options
- Quick filters for common attributes
- Search bar with advanced options
- Bulk action tools
- Framework selector
- View customization options

### Control Editor
- Form-based control definition
- Rich text editing for descriptions and guidance
- Relationship mapping interface
- Metadata management with templates
- Version history view
- Preview mode
- Validation feedback

### Framework Browser
- Framework comparison view
- Framework metadata and overview
- Import/export tools
- Framework statistics dashboard
- Framework history timeline
- Framework filter and search

### Control Detail View
- Comprehensive control information display
- Related controls section
- Implementation status (if available)
- Documentation and evidence requirements
- Responsibility assignment
- Testing procedures
- Version history

## Data Model

### Entity: ControlFramework
- `id` (UUID, PK)
- `name` (String): Framework name
- `description` (Text): Framework description
- `version` (String): Framework version identifier
- `source` (String): Origin of the framework (e.g., NIST, ISO, Custom)
- `publication_date` (Date): When the framework was published
- `is_active` (Boolean): Whether the framework is active
- `is_custom` (Boolean): Whether this is a custom or standard framework
- `metadata` (JSON): Additional framework properties
- `created_at` (DateTime): Creation timestamp
- `updated_at` (DateTime): Last update timestamp
- `created_by` (UUID, FK): User who created the framework

### Entity: Control
- `id` (UUID, PK)
- `framework_id` (UUID, FK): Framework this control belongs to
- `control_id` (String): Original identifier in the framework
- `title` (String): Control title
- `description` (Text): Control description
- `objective` (Text): What the control aims to achieve
- `parent_id` (UUID, FK, nullable): Parent control in hierarchy
- `level` (Integer): Hierarchical level in the framework
- `type` (Enum): Type of control (Preventive, Detective, Corrective, etc.)
- `category` (String): General category or family
- `implementation_guidance` (Text): How to implement the control
- `testing_procedures` (Text): How to test/verify the control
- `evidence_requirements` (Text): Required evidence for compliance
- `is_active` (Boolean): Whether the control is active
- `criticality` (Enum): Importance level (High, Medium, Low)
- `version` (Integer): Version number of the control
- `created_at` (DateTime): Creation timestamp
- `updated_at` (DateTime): Last update timestamp
- `created_by` (UUID, FK): User who created the control
- `last_modified_by` (UUID, FK): User who last modified the control

### Entity: ControlTag
- `id` (UUID, PK)
- `name` (String): Tag name
- `description` (String): Tag description
- `category` (String): Category the tag belongs to
- `color` (String): Visual color for the tag
- `created_at` (DateTime): Creation timestamp
- `created_by` (UUID, FK): User who created the tag

### Entity: ControlTagAssignment
- `id` (UUID, PK)
- `control_id` (UUID, FK): Control being tagged
- `tag_id` (UUID, FK): Tag being assigned
- `created_at` (DateTime): Assignment timestamp
- `created_by` (UUID, FK): User who created the assignment

### Entity: ControlRelationship
- `id` (UUID, PK)
- `source_control_id` (UUID, FK): Source control
- `target_control_id` (UUID, FK): Target control
- `relationship_type` (Enum): Type of relationship (Parent-Child, Related, Depends-On, etc.)
- `description` (Text): Description of the relationship
- `created_at` (DateTime): Creation timestamp
- `created_by` (UUID, FK): User who created the relationship

### Entity: ControlVersion
- `id` (UUID, PK)
- `control_id` (UUID, FK): Control this version belongs to
- `version_number` (Integer): Sequential version number
- `changes` (Text): Description of changes in this version
- `control_data` (JSON): Complete control data at this version
- `created_at` (DateTime): Version creation timestamp
- `created_by` (UUID, FK): User who created this version

### Entity: ControlResponsibility
- `id` (UUID, PK)
- `control_id` (UUID, FK): Control being assigned
- `entity_type` (Enum): Type of entity responsible (Role, Team, Department, Individual)
- `entity_id` (String): Identifier of the responsible entity
- `responsibility_type` (Enum): Type of responsibility (Accountable, Responsible, Consulted, Informed)
- `notes` (Text): Additional notes about the responsibility
- `created_at` (DateTime): Assignment timestamp
- `created_by` (UUID, FK): User who created the assignment

### Entity: ControlAttachment
- `id` (UUID, PK)
- `control_id` (UUID, FK): Control this attachment belongs to
- `file_name` (String): Original filename
- `file_path` (String): Storage path for the file
- `file_type` (String): MIME type of the file
- `file_size` (Integer): Size in bytes
- `description` (Text): Description of the attachment
- `uploaded_at` (DateTime): Upload timestamp
- `uploaded_by` (UUID, FK): User who uploaded the attachment

## API Endpoints

### Control Framework Management
- `GET /api/control-frameworks`: List control frameworks
- `POST /api/control-frameworks`: Create a new control framework
- `GET /api/control-frameworks/{id}`: Get framework details
- `PUT /api/control-frameworks/{id}`: Update a framework
- `DELETE /api/control-frameworks/{id}`: Delete a framework
- `POST /api/control-frameworks/import`: Import a framework
- `GET /api/control-frameworks/{id}/export`: Export a framework
- `GET /api/control-frameworks/{id}/controls`: Get all controls in a framework

### Control Management
- `GET /api/controls`: List controls (with filtering)
- `POST /api/controls`: Create a new control
- `GET /api/controls/{id}`: Get control details
- `PUT /api/controls/{id}`: Update a control
- `DELETE /api/controls/{id}`: Delete a control
- `POST /api/controls/{id}/clone`: Clone a control
- `GET /api/controls/{id}/versions`: Get control version history
- `GET /api/controls/{id}/versions/{versionId}`: Get specific control version
- `POST /api/controls/bulk-create`: Create multiple controls
- `PUT /api/controls/bulk-update`: Update multiple controls

### Control Relationships
- `GET /api/controls/{id}/relationships`: Get control relationships
- `POST /api/controls/{id}/relationships`: Create a relationship
- `DELETE /api/control-relationships/{id}`: Delete a relationship
- `GET /api/controls/{id}/children`: Get child controls
- `GET /api/controls/{id}/parents`: Get parent controls

### Control Tags
- `GET /api/control-tags`: List control tags
- `POST /api/control-tags`: Create a new tag
- `PUT /api/control-tags/{id}`: Update a tag
- `DELETE /api/control-tags/{id}`: Delete a tag
- `POST /api/controls/{id}/tags/{tagId}`: Assign tag to control
- `DELETE /api/controls/{id}/tags/{tagId}`: Remove tag from control

### Control Search and Navigation
- `POST /api/controls/search`: Search controls with advanced criteria
- `GET /api/controls/{id}/path`: Get hierarchical path to control
- `GET /api/control-frameworks/{id}/hierarchy`: Get full framework hierarchy

## Success Metrics

1. **Framework Coverage**: Percentage of regulatory requirements covered by the unified control framework
2. **Control Reuse**: Average number of regulatory requirements satisfied by each control
3. **Framework Adoption**: Number of standard frameworks imported and utilized
4. **Search Efficiency**: Average time to locate specific controls
5. **User Satisfaction**: Feedback ratings on control management workflows
6. **Documentation Completeness**: Percentage of controls with complete metadata and documentation
7. **Hierarchy Depth**: Average depth of control hierarchy indicating framework structure
8. **Control Versioning**: Frequency and coverage of control updates and versioning
9. **Framework Growth**: Rate of growth in control framework size and complexity

## Dependencies

For optimal implementation, this feature requires:
- User authentication and role-based access control
- Database with strong JSON support for flexible metadata
- Search indexing capabilities for control discovery
- Version control system for tracking changes
- File storage for control attachments

## Documentation Requirements

### User Documentation
- Control Framework Management Guide
- Control Authoring Best Practices
- Framework Import/Export Instructions
- Control Hierarchy Management
- Control Tagging and Categorization Guide
- Control Search and Discovery Tips

### Developer Documentation
- Control Framework API Reference
- Control Data Model Documentation
- Control Relationship Implementation
- Control Version History Implementation
- Search Integration Guide
- Framework Import/Export Format Specifications

## Resources and References

- NIST SP 800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations
- ISO/IEC 27001:2013 Annex A Control Framework
- CIS Critical Security Controls
- PCI DSS Requirements and Security Assessment Procedures
- HIPAA Security Rule Control Framework
- COBIT Framework for IT Governance and Control
- NIST Cybersecurity Framework Core
- UCF (Unified Compliance Framework) Reference Architecture 