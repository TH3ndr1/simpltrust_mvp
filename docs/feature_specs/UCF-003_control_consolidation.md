# Feature Specification: UCF-003 - Control Consolidation

## Overview
The Control Consolidation feature enables the identification and consolidation of overlapping controls across multiple regulatory frameworks, allowing organizations to implement a single control that satisfies requirements from multiple regulations. This feature is central to SimplTrust's value proposition of reducing redundancy in compliance efforts. Through intelligent analysis of control similarities and automated consolidation suggestions, organizations can significantly reduce the number of controls they need to implement and manage, while maintaining compliance with all applicable regulations.

## Affected Components
- **Backend:**
  - Control similarity analysis service
  - Control consolidation engine
  - Consolidated control management service
  - Consolidation recommendation service
  - API endpoints for control consolidation
- **Frontend:**
  - Consolidation dashboard
  - Similarity visualization
  - Consolidation recommendation UI
  - Consolidated control browser
  - Control equivalency management

## Technical Dependencies
- PostgreSQL database for consolidated control storage
- Control Framework Model (UCF-001)
- Regulatory Mapping (UCF-002)
- Next.js for frontend rendering
- React for UI components
- Natural language processing libraries for similarity analysis
- Machine learning models for recommendation generation
- Data visualization libraries
- Tailwind CSS for styling

## User Stories
- As a Compliance Officer, I want to identify overlapping controls across multiple regulations so that I can reduce redundancy in our control framework.
- As a Risk Manager, I want to consolidate similar controls into a single implementation so that we can streamline our compliance efforts.
- As an IT Administrator, I want to see how a consolidated control maps back to original regulatory requirements so that I can verify all requirements are met.
- As a CISO, I want to quantify the reduction in control count achieved through consolidation so that I can demonstrate efficiency gains to leadership.
- As a Consultant, I want to review and approve consolidation recommendations so that I can ensure they accurately address regulatory requirements.

## Acceptance Criteria
- System identifies controls with semantic similarity across different regulations
- Users can view detailed comparison of similar controls
- System generates consolidation recommendations with confidence scores
- Users can accept, modify, or reject consolidation recommendations
- Consolidated controls maintain backward references to original controls
- System calculates and displays compliance coverage of consolidated controls
- Users can customize consolidation thresholds and sensitivity
- Consolidated controls can be exported and reported on
- System maintains history of consolidation decisions
- Regulatory updates trigger re-evaluation of affected consolidated controls

## Integration Points
- Integrates with Control Framework Model (UCF-001) for control data
- Uses Regulatory Mapping (UCF-002) to understand control-regulation relationships
- Provides input to Framework Visualization (UCF-004) for displaying consolidated view
- Supports AI Recommendation Engine (ARP-001) with consolidated control information
- Affects Assessment Templates (ASP-001) by simplifying assessment scope
- Informs Gap Identification (GAP-001) by showing compliance coverage

## Testing Strategy
- **Unit Tests:**
  - Test similarity analysis algorithms
  - Validate consolidation logic
  - Test recommendation generation
  - Verify mapping preservation during consolidation
- **Integration Tests:**
  - Test integration with control framework
  - Verify data flow from regulatory mapping
  - Test effect on compliance coverage calculations
- **Performance Tests:**
  - Measure similarity analysis performance with large control sets
  - Test consolidation algorithm efficiency
  - Verify visualization performance with complex relationships

## Implementation Phases
1. **Initial Implementation (Sprint 2)**
   - Implement basic similarity analysis algorithm
   - Create consolidation data model
   - Develop simple consolidation recommendation UI
   - Implement consolidation management functionality
   - Build backward reference mapping system

2. **Enhancements (Later Sprints - out of MVP scope)**
   - Improve similarity analysis with advanced NLP
   - Add machine learning for improved recommendations
   - Implement regulatory change impact analysis
   - Create detailed consolidation audit trail
   - Add advanced consolidation analytics

## UI/UX Design
- **Consolidation Dashboard**
  - Overview of consolidation opportunities
  - Metrics showing potential and achieved reduction
  - Filtering by similarity threshold and regulation
  - Sorting by confidence score and impact
  - Action buttons for bulk processing
  
- **Similarity Visualization**
  - Side-by-side comparison of similar controls
  - Highlighted similar and different text
  - Venn diagram showing overlap percentage
  - Relationship graph showing control connections
  - Drill-down capability for detailed analysis

- **Consolidation Management**
  - List of consolidated controls
  - Editable consolidation properties
  - Mapping visualization to original controls
  - Version history and change tracking
  - Search and filter functionality

## Data Model

```
ControlSimilarityAnalysis:
  id: uuid (primary key)
  source_control_id: uuid (foreign key to Controls)
  target_control_id: uuid (foreign key to Controls)
  similarity_score: float
  comparison_data: jsonb
  algorithm_version: string
  analyzed_at: timestamp
  created_at: timestamp
  updated_at: timestamp

ConsolidationRecommendations:
  id: uuid (primary key)
  controls: jsonb (array of control IDs)
  confidence_score: float
  rationale: text
  status: enum [pending, accepted, modified, rejected]
  processed_by: uuid (foreign key to Users, nullable)
  processed_at: timestamp (nullable)
  created_at: timestamp
  updated_at: timestamp

ConsolidatedControls:
  id: uuid (primary key)
  name: string
  description: text
  implementation_guidance: text
  verification_method: text
  owner_id: uuid (foreign key to Users, nullable)
  status: enum [draft, active, deprecated, retired]
  created_by: uuid (foreign key to Users)
  created_at: timestamp
  updated_at: timestamp

ControlEquivalencies:
  id: uuid (primary key)
  consolidated_control_id: uuid (foreign key to ConsolidatedControls)
  original_control_id: uuid (foreign key to Controls)
  equivalency_type: enum [full, partial, superset]
  notes: text
  created_at: timestamp
  updated_at: timestamp

ConsolidationHistory:
  id: uuid (primary key)
  consolidated_control_id: uuid (foreign key to ConsolidatedControls)
  action: enum [created, updated, remapped, deprecated]
  details: jsonb
  performed_by: uuid (foreign key to Users)
  created_at: timestamp
```

## API Endpoints

- `GET /api/v1/control-similarity` - Get similarity analysis results
- `POST /api/v1/control-similarity/analyze` - Run similarity analysis
- `GET /api/v1/consolidation/recommendations` - Get consolidation recommendations
- `POST /api/v1/consolidation/recommendations/:id/process` - Process recommendation
- `GET /api/v1/consolidated-controls` - List consolidated controls
- `POST /api/v1/consolidated-controls` - Create consolidated control
- `GET /api/v1/consolidated-controls/:id` - Get consolidated control details
- `PUT /api/v1/consolidated-controls/:id` - Update consolidated control
- `DELETE /api/v1/consolidated-controls/:id` - Delete consolidated control
- `GET /api/v1/consolidated-controls/:id/equivalencies` - Get control equivalencies
- `POST /api/v1/consolidated-controls/:id/equivalencies` - Add control equivalency
- `DELETE /api/v1/consolidated-controls/:id/equivalencies/:equivId` - Remove equivalency
- `GET /api/v1/consolidation/metrics` - Get consolidation metrics
- `GET /api/v1/consolidation/history` - Get consolidation history

## Success Metrics
- Reduction in total control count by at least 30% through consolidation
- 90% of consolidation recommendations are accepted or require only minor modifications
- 85% of users report the consolidated framework is easier to understand and implement
- Time spent on managing controls reduced by 40% compared to managing separate frameworks
- 95% of consolidated controls accurately preserve compliance with original requirements

## Dependencies
- Control Framework Model (UCF-001) must be implemented
- Regulatory Mapping (UCF-002) must be implemented
- Natural language processing capability must be available
- User authentication and permission system must be working
- Basic UI components must be available

## Documentation Requirements
- **User Documentation:**
  - Guide to understanding control consolidation
  - Instructions for reviewing and processing recommendations
  - Best practices for consolidation decisions
  - Tutorial on maintaining consolidated controls

- **Developer Documentation:**
  - API reference for consolidation endpoints
  - Documentation of similarity algorithms
  - Guide for extending consolidation capabilities
  - Integration points with other system components

## Resources and References
- [NIST SP 800-53 Control Catalog](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- [ISO 27001 Control Set](https://www.iso.org/standard/27001)
- [Unified Compliance Framework (UCF) Methodology](https://www.unifiedcompliance.com/)
- [Natural Language Processing for Text Similarity](https://www.nltk.org/)
- [Harmonizing Multiple Compliance Frameworks](https://www.isaca.org/resources/isaca-journal/issues/2018/volume-3/harmonizing-multiple-security-frameworks)
- [Control Mapping and Consolidation Best Practices](https://www.sans.org/reading-room/whitepapers/compliance/) 