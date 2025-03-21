# Feature Specification: ASM-003 - Asset Criticality

## Overview
The Asset Criticality feature enables organizations to assess and assign criticality ratings to their assets based on business impact, regulatory requirements, and security considerations. This feature helps organizations prioritize their security and compliance efforts by identifying which assets are most critical to business operations or would cause the greatest harm if compromised. By understanding asset criticality, organizations can make informed decisions about security investments, control implementation, and risk mitigation strategies, focusing resources on protecting their most important assets first.

## Affected Components
- **Backend:**
  - Criticality assessment service
  - Criticality calculation engine
  - Criticality factor management service
  - Criticality inheritance service
  - API endpoints for criticality management
- **Frontend:**
  - Criticality assessment interface
  - Criticality matrix visualization
  - Criticality factor management UI
  - Criticality reports and dashboards
  - Bulk criticality assignment tools

## Technical Dependencies
- Asset Inventory (ASM-001)
- Asset Categorization (ASM-002)
- PostgreSQL database for criticality data storage
- Next.js for frontend rendering
- React for UI components
- Chart.js or similar for visualization
- Algorithm libraries for criticality calculations
- Tailwind CSS for styling

## User Stories
- As a Risk Manager, I want to assign criticality ratings to assets so that I can prioritize security controls for our most important systems.
- As a Compliance Officer, I want to factor regulatory requirements into asset criticality so that compliance-critical assets receive appropriate attention.
- As a Business Analyst, I want to define business impact factors for criticality assessment so that the ratings reflect our organization's priorities.
- As an IT Administrator, I want asset criticality to be partially derived from asset relationships so that dependencies are factored into prioritization.
- As a CISO, I want to generate reports of our most critical assets so that I can ensure executive awareness of key systems requiring protection.

## Acceptance Criteria
- Users can define criticality assessment factors with customizable weights
- System calculates criticality scores based on multiple factors
- Assets can be assigned criticality levels (e.g., critical, high, medium, low)
- Criticality assessments consider business impact, regulatory requirements, and technical factors
- Users can override calculated criticality with manual assignments when needed
- System provides justification for criticality ratings
- Criticality changes are tracked in asset history
- Users can visualize assets by criticality level
- Criticality ratings can be used for filtering and prioritization
- Bulk assessment tools allow efficient criticality assignment
- Related assets can inherit criticality based on configurable rules

## Integration Points
- Builds upon Asset Inventory (ASM-001) and Asset Categorization (ASM-002)
- Informs Asset-Control Mapping (ASM-004) by influencing control selection
- Feeds Risk Assessment (RSK-001) by providing impact factors
- Supports Gap Prioritization (GAP-002) for focusing remediation efforts
- Provides key input for Task Prioritization (ARP-003)
- Enhances Contextual Recommendations (ARP-004) with criticality context

## Testing Strategy
- **Unit Tests:**
  - Test criticality calculation algorithms
  - Validate factor weighting logic
  - Test manual override functionality
  - Verify criticality inheritance
- **Integration Tests:**
  - Test integration with asset inventory and categorization
  - Verify criticality data flow to risk assessment
  - Test influence on recommendation prioritization
- **Performance Tests:**
  - Measure criticality calculation performance for large asset sets
  - Test visualization performance with many assets
  - Verify bulk operation efficiency

## Implementation Phases
1. **Initial Implementation (Sprint 3)**
   - Design and implement criticality data model
   - Create basic criticality factor management
   - Implement simple scoring algorithm
   - Develop criticality assignment interface
   - Create criticality visualization
   - Implement criticality filtering

2. **Enhancements (Later Sprints - out of MVP scope)**
   - Add advanced criticality calculation algorithms
   - Implement criticality inheritance rules
   - Create criticality trend analysis
   - Develop advanced reporting
   - Implement industry-specific criticality templates

## UI/UX Design
- **Criticality Assessment Interface**
  - Factor-based assessment form
  - Criticality scoring visualization
  - Override controls with justification
  - History of criticality changes
  - Assessment guidance and examples
  
- **Criticality Management**
  - Define and weight assessment factors
  - Create organization-specific criticality levels
  - Set threshold values for each level
  - Configure inheritance rules
  - Import/export criticality configurations

- **Criticality Dashboard**
  - Heat map of assets by criticality
  - Distribution charts showing criticality levels
  - Filtering by business unit, category, or type
  - Drill-down for detailed assessment
  - Export and reporting options

## Data Model

```
CriticalityLevels:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  name: string
  description: text
  numeric_value: integer
  color: string (hex code)
  created_at: timestamp
  updated_at: timestamp

CriticalityFactors:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  name: string
  description: text
  factor_type: enum [business_impact, regulatory, technical, security]
  weight: float
  assessment_guidance: text (optional)
  created_at: timestamp
  updated_at: timestamp

CriticalityFactorOptions:
  id: uuid (primary key)
  factor_id: uuid (foreign key to CriticalityFactors)
  option_text: string
  option_value: integer
  description: text (optional)
  created_at: timestamp
  updated_at: timestamp

AssetCriticalityAssessments:
  id: uuid (primary key)
  asset_id: uuid (foreign key to Assets)
  criticality_level_id: uuid (foreign key to CriticalityLevels)
  calculated_score: float
  is_overridden: boolean
  override_justification: text (optional if overridden)
  assessed_by: uuid (foreign key to Users)
  assessed_at: timestamp
  next_assessment_date: date (optional)
  created_at: timestamp
  updated_at: timestamp

AssetCriticalityFactorScores:
  id: uuid (primary key)
  assessment_id: uuid (foreign key to AssetCriticalityAssessments)
  factor_id: uuid (foreign key to CriticalityFactors)
  factor_option_id: uuid (foreign key to CriticalityFactorOptions, nullable)
  score: integer
  notes: text (optional)
  created_at: timestamp
  updated_at: timestamp

CriticalityInheritanceRules:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  relationship_type: enum [depends_on, contains, processes, etc.]
  inheritance_direction: enum [upward, downward, bidirectional]
  inheritance_factor: float
  conditions: jsonb (optional)
  created_at: timestamp
  updated_at: timestamp

CriticalityAssessmentHistory:
  id: uuid (primary key)
  asset_id: uuid (foreign key to Assets)
  previous_level_id: uuid (foreign key to CriticalityLevels)
  new_level_id: uuid (foreign key to CriticalityLevels)
  previous_score: float
  new_score: float
  changed_by: uuid (foreign key to Users)
  change_reason: text
  created_at: timestamp
```

## API Endpoints

- `GET /api/v1/criticality/levels` - List criticality levels
- `POST /api/v1/criticality/levels` - Create criticality level
- `PUT /api/v1/criticality/levels/:id` - Update criticality level
- `DELETE /api/v1/criticality/levels/:id` - Delete criticality level

- `GET /api/v1/criticality/factors` - List criticality factors
- `POST /api/v1/criticality/factors` - Create criticality factor
- `PUT /api/v1/criticality/factors/:id` - Update criticality factor
- `DELETE /api/v1/criticality/factors/:id` - Delete criticality factor
- `GET /api/v1/criticality/factors/:id/options` - Get factor options
- `POST /api/v1/criticality/factors/:id/options` - Create factor option

- `GET /api/v1/assets/:id/criticality` - Get asset criticality assessment
- `POST /api/v1/assets/:id/criticality` - Create/update asset criticality
- `GET /api/v1/assets/:id/criticality/history` - Get criticality history
- `POST /api/v1/assets/:id/criticality/factors` - Save factor scores
- `POST /api/v1/assets/bulk/criticality` - Bulk assign criticality

- `GET /api/v1/criticality/inheritance-rules` - List inheritance rules
- `POST /api/v1/criticality/inheritance-rules` - Create inheritance rule
- `PUT /api/v1/criticality/inheritance-rules/:id` - Update inheritance rule
- `DELETE /api/v1/criticality/inheritance-rules/:id` - Delete inheritance rule

- `GET /api/v1/criticality/dashboard` - Get criticality dashboard data
- `GET /api/v1/criticality/reports` - Generate criticality reports

## Success Metrics
- 95% of assets have criticality ratings assigned
- Critical assets are 25% more likely to have complete control implementations
- Risk assessment accuracy improves by 30% when using criticality ratings
- Security investments align with asset criticality in 80% of cases
- 85% of users report criticality ratings help them prioritize security efforts

## Dependencies
- Asset Inventory (ASM-001) must be implemented
- Asset Categorization (ASM-002) should be implemented for optimal use
- User authentication and permission system must be working
- Basic UI components must be available

## Documentation Requirements
- **User Documentation:**
  - Guide to effective criticality assessment
  - Best practices for defining criticality factors
  - Instructions for bulk criticality assignment
  - Tutorial on using criticality for prioritization

- **Developer Documentation:**
  - API reference for criticality endpoints
  - Documentation of criticality calculation algorithms
  - Guide for extending the criticality model
  - Integration points with other system components

## Resources and References
- [NIST SP 800-30: Risk Assessment](https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final)
- [ISO 27001:2022 A.8.1: Risk Assessment](https://www.iso.org/standard/27001)
- [FFIEC Business Impact Analysis](https://ithandbook.ffiec.gov/it-booklets/business-continuity-management/business-impact-analysis.aspx)
- [NIST SP 800-34 Rev 1: Contingency Planning Guide](https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final)
- [FAIR Risk Assessment Framework](https://www.fairinstitute.org/)
- [Critical Asset Identification Methodologies](https://www.cisa.gov/sites/default/files/publications/cisa-insights_risk-considerations-for-mdi_508.pdf) 