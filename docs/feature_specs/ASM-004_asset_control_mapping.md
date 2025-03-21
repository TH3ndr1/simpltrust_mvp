# Feature Specification: ASM-004 - Asset-Control Mapping

## Overview
The Asset-Control Mapping feature enables organizations to create explicit connections between their technology assets and the security controls that protect them. This feature bridges the gap between abstract compliance requirements and the practical implementation of controls within the organization's specific technology landscape. By mapping controls to assets, the system can provide contextually relevant compliance guidance, help track control implementation status across the asset inventory, and ensure that appropriate security measures are in place for assets based on their criticality and regulatory requirements.

## Affected Components
- **Backend:**
  - Control-asset mapping service
  - Control implementation status service
  - Control applicability engine
  - Control inheritance service
  - API endpoints for mapping management
- **Frontend:**
  - Control-asset mapping interface
  - Implementation status dashboard
  - Control coverage visualization
  - Mapping recommendation UI
  - Control implementation detail views

## Technical Dependencies
- Asset Inventory (ASM-001)
- Asset Categorization (ASM-002)
- Asset Criticality (ASM-003)
- Control Framework Model (UCF-001)
- PostgreSQL database for mapping data storage
- Next.js for frontend rendering
- React for UI components
- Chart.js or similar for visualization
- Recommendation algorithm libraries
- Tailwind CSS for styling

## User Stories
- As a Compliance Officer, I want to map controls to specific assets so that I can track which systems are implementing which security measures.
- As an IT Administrator, I want to record the implementation status of controls for each asset so that I can track our progress towards compliance.
- As a Risk Manager, I want the system to recommend relevant controls for assets based on their categorization and criticality so that I don't overlook important security measures.
- As a Security Analyst, I want to view control coverage across our asset inventory so that I can identify protection gaps.
- As a CISO, I want to generate reports showing control implementation status by asset criticality so that I can ensure our most important systems are adequately protected.

## Acceptance Criteria
- Users can map controls from the unified framework to specific assets
- System recommends relevant controls based on asset characteristics
- Control implementation status can be tracked and updated for each asset
- Implementation details and evidence can be documented for each control-asset mapping
- Users can view control coverage analytics across the asset inventory
- System identifies gaps in control coverage based on asset criticality
- Control inheritance is supported for hierarchical asset relationships
- Mapping changes are tracked in history
- Users can bulk assign controls to multiple assets
- Mapping interface shows bidirectional relationships (controls to assets and assets to controls)

## Integration Points
- Builds upon Asset Inventory (ASM-001), Categorization (ASM-002), and Criticality (ASM-003)
- Uses Control Framework Model (UCF-001) as the source of controls
- Connects with Regulatory Mapping (UCF-002) to determine regulatory relevance
- Feeds Gap Identification (GAP-001) by showing control implementation status
- Supports Risk Assessment (RSK-001) by identifying protection gaps
- Provides input for AI Recommendation Engine (ARP-001)

## Testing Strategy
- **Unit Tests:**
  - Test control-asset mapping operations
  - Validate control recommendation algorithms
  - Test implementation status tracking
  - Verify control inheritance logic
- **Integration Tests:**
  - Test integration with asset inventory and control framework
  - Verify data flow to gap analysis and risk assessment
  - Test control coverage calculations
- **Performance Tests:**
  - Measure mapping operation performance with large asset sets
  - Test recommendation generation efficiency
  - Verify visualization performance with complex mapping relationships

## Implementation Phases
1. **Initial Implementation (Sprint 3)**
   - Design and implement mapping data model
   - Create basic control-asset mapping interface
   - Implement simple control recommendation logic
   - Develop implementation status tracking
   - Create basic control coverage visualization
   - Implement bulk mapping functionality

2. **Enhancements (Later Sprints - out of MVP scope)**
   - Add advanced control recommendation algorithms
   - Implement control inheritance logic
   - Create detailed mapping analytics
   - Develop implementation verification workflows
   - Implement evidence linking

## UI/UX Design
- **Control-Asset Mapping Interface**
  - Split-pane view with assets and applicable controls
  - Drag-and-drop mapping functionality
  - Filter controls by domain, family, or regulation
  - Recommendation highlighting
  - Implementation status indicators
  
- **Implementation Status Dashboard**
  - Heat map showing control coverage across assets
  - Status indicators (implemented, partial, planned, not applicable)
  - Filtering by asset type, criticality, or control family
  - Implementation progress metrics
  - Gap highlighting for critical assets

- **Control Implementation Details**
  - Implementation description form
  - Responsible party assignment
  - Implementation date tracking
  - Evidence attachment capability
  - Notes and documentation section

## Data Model

```
AssetControlMappings:
  id: uuid (primary key)
  asset_id: uuid (foreign key to Assets)
  control_id: uuid (foreign key to Controls)
  is_applicable: boolean
  applicability_justification: text (optional)
  is_recommended: boolean
  recommendation_source: enum [category, criticality, regulation, manual]
  created_by: uuid (foreign key to Users)
  created_at: timestamp
  updated_at: timestamp

ControlImplementations:
  id: uuid (primary key)
  mapping_id: uuid (foreign key to AssetControlMappings)
  implementation_status: enum [not_implemented, partially_implemented, implemented, not_applicable]
  implementation_description: text
  implementation_date: date (optional)
  verification_method: text (optional)
  responsible_party_id: uuid (foreign key to Users, nullable)
  notes: text (optional)
  created_at: timestamp
  updated_at: timestamp

ImplementationStatusHistory:
  id: uuid (primary key)
  implementation_id: uuid (foreign key to ControlImplementations)
  previous_status: enum [not_implemented, partially_implemented, implemented, not_applicable]
  new_status: enum [not_implemented, partially_implemented, implemented, not_applicable]
  changed_by: uuid (foreign key to Users)
  change_reason: text
  created_at: timestamp

ControlInheritanceRules:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  asset_relationship_type: enum [contains, depends_on, processes, etc.]
  inheritance_direction: enum [upward, downward, bidirectional]
  control_family_id: uuid (foreign key to ControlFamilies, nullable)
  control_id: uuid (foreign key to Controls, nullable)
  conditions: jsonb (optional)
  created_at: timestamp
  updated_at: timestamp

ControlRecommendationRules:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  control_id: uuid (foreign key to Controls)
  asset_category_id: uuid (foreign key to AssetCategories, nullable)
  criticality_level_id: uuid (foreign key to CriticalityLevels, nullable)
  regulation_id: uuid (foreign key to Regulations, nullable)
  recommendation_strength: float
  rule_description: text
  created_at: timestamp
  updated_at: timestamp

ImplementationEvidence:
  id: uuid (primary key)
  implementation_id: uuid (foreign key to ControlImplementations)
  evidence_type: enum [document, screenshot, log, report, attestation]
  title: string
  description: text
  file_url: string (nullable)
  content: text (nullable)
  uploaded_by: uuid (foreign key to Users)
  upload_date: timestamp
  created_at: timestamp
  updated_at: timestamp
```

## API Endpoints

- `GET /api/v1/assets/:id/controls` - Get controls mapped to an asset
- `POST /api/v1/assets/:id/controls` - Map control to asset
- `DELETE /api/v1/assets/:id/controls/:controlId` - Remove control mapping
- `GET /api/v1/controls/:id/assets` - Get assets mapped to a control
- `POST /api/v1/mappings/bulk` - Bulk create control-asset mappings

- `GET /api/v1/mappings/:id/implementation` - Get implementation status
- `POST /api/v1/mappings/:id/implementation` - Create/update implementation status
- `GET /api/v1/mappings/:id/implementation/history` - Get implementation history
- `POST /api/v1/mappings/:id/implementation/evidence` - Add implementation evidence
- `GET /api/v1/mappings/:id/implementation/evidence` - Get implementation evidence

- `GET /api/v1/assets/:id/control-recommendations` - Get control recommendations for asset
- `POST /api/v1/recommendation-rules` - Create recommendation rule
- `PUT /api/v1/recommendation-rules/:id` - Update recommendation rule
- `DELETE /api/v1/recommendation-rules/:id` - Delete recommendation rule

- `GET /api/v1/inheritance-rules` - List control inheritance rules
- `POST /api/v1/inheritance-rules` - Create inheritance rule
- `PUT /api/v1/inheritance-rules/:id` - Update inheritance rule
- `DELETE /api/v1/inheritance-rules/:id` - Delete inheritance rule

- `GET /api/v1/control-coverage` - Get control coverage analytics
- `GET /api/v1/control-coverage/gaps` - Identify control coverage gaps

## Success Metrics
- 90% of critical assets have mapped controls
- Control recommendation accuracy reaches 85% acceptance rate
- Implementation status tracking is maintained for 95% of mapped controls
- Control coverage analytics reduce time to identify gaps by 60%
- 85% of users report the mapping feature improves their understanding of security posture

## Dependencies
- Asset Inventory (ASM-001) must be implemented
- Asset Categorization (ASM-002) should be implemented for optimal recommendations
- Asset Criticality (ASM-003) should be implemented for risk-based prioritization
- Control Framework Model (UCF-001) must be implemented
- User authentication and permission system must be working
- Basic UI components must be available

## Documentation Requirements
- **User Documentation:**
  - Guide to mapping controls to assets
  - Best practices for tracking implementation status
  - Instructions for bulk mapping operations
  - Tutorial on using control coverage analytics

- **Developer Documentation:**
  - API reference for mapping endpoints
  - Documentation of recommendation algorithms
  - Guide for extending the mapping model
  - Integration points with other system components

## Resources and References
- [NIST SP 800-53 Rev 5: Security and Privacy Controls](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- [ISO 27001:2022 Implementation Guidance](https://www.iso.org/standard/27001)
- [NIST Cybersecurity Framework Implementation Tiers](https://www.nist.gov/cyberframework)
- [CIS Controls Implementation Groups](https://www.cisecurity.org/controls/implementation-groups)
- [NIST SP 800-171 Assessment Methodology](https://csrc.nist.gov/publications/detail/sp/800-171a/final)
- [CMMC Assessment Guides](https://www.acq.osd.mil/cmmc/documentation.html) 