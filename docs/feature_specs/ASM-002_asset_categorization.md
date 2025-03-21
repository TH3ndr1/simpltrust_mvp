# Feature Specification: ASM-002 - Asset Categorization

## Overview
The Asset Categorization feature enables organizations to classify and tag their assets according to various dimensions such as type, sensitivity, regulatory applicability, and business function. This categorization creates a structured taxonomy that allows for more effective asset management, targeted compliance activities, and contextual security controls. By properly categorizing assets, organizations can apply the right level of protection to the right assets, understand compliance scope, and prioritize security investments based on asset characteristics.

## Affected Components
- **Backend:**
  - Categorization schema management service
  - Asset taxonomy service
  - Tag management service
  - Category assignment service
  - API endpoints for asset categorization
- **Frontend:**
  - Category management interface
  - Asset tagging UI
  - Category hierarchy visualization
  - Bulk categorization tools
  - Category-based filtering components

## Technical Dependencies
- Asset Inventory (ASM-001)
- PostgreSQL database for category data storage
- Next.js for frontend rendering
- React for UI components
- Tree data structure libraries
- Drag-and-drop libraries for taxonomy management
- Tailwind CSS for styling

## User Stories
- As a Compliance Officer, I want to categorize assets according to data classification so that I can apply appropriate security controls based on sensitivity.
- As an IT Administrator, I want to tag assets with relevant technologies so that I can quickly find assets using particular systems or platforms.
- As a Risk Manager, I want to categorize assets by regulatory scope so that I can clearly identify which assets are subject to which regulations.
- As an Operations Manager, I want to organize assets hierarchically so that I can understand their place in our overall technology landscape.
- As a Security Analyst, I want to apply custom categorization schemes to assets so that I can analyze them according to our organization's specific needs.

## Acceptance Criteria
- Users can create, update, and delete categorization schemas
- System supports hierarchical category structures
- Assets can be assigned to multiple categories simultaneously
- Users can create and manage reusable tags for quick categorization
- System provides predefined category schemas for common use cases (data classification, technology type)
- Users can perform bulk categorization of multiple assets
- Categories influence compliance requirements and control applicability
- Category changes are tracked in the asset history
- Users can search and filter assets by category or tag
- System prevents deletion of categories that are in use
- Categories can have associated metadata such as description and regulatory basis

## Integration Points
- Builds upon Asset Inventory (ASM-001) to categorize the asset catalog
- Informs Asset Criticality (ASM-003) by providing category-based criticality factors
- Supports Asset-Control Mapping (ASM-004) by determining control applicability
- Connects with Regulatory Mapping (UCF-002) to link regulations to asset categories
- Enhances Risk Assessment (RSK-001) with category-based risk factors
- Provides context for AI Recommendation Engine (ARP-001)

## Testing Strategy
- **Unit Tests:**
  - Test category CRUD operations
  - Validate hierarchical category management
  - Test category assignment logic
  - Verify tagging functionality
- **Integration Tests:**
  - Test integration with asset inventory
  - Verify category-based filtering
  - Test bulk categorization operations
- **Performance Tests:**
  - Measure category hierarchy loading times
  - Test performance with large numbers of categorized assets
  - Verify search and filter efficiency by category

## Implementation Phases
1. **Initial Implementation (Sprint 3)**
   - Design and implement category data model
   - Create basic category management functionality
   - Implement asset-category assignment
   - Develop simple tag management
   - Create category-based filtering
   - Implement predefined categorization schemas

2. **Enhancements (Later Sprints - out of MVP scope)**
   - Add advanced hierarchical visualization
   - Implement category inheritance
   - Create automated categorization rules
   - Add category-based compliance mapping
   - Implement category analytics and reporting

## UI/UX Design
- **Category Management Interface**
  - Tree view of category hierarchy
  - Drag-and-drop reordering
  - Add/edit/delete category controls
  - Category property editor
  - Import/export functionality
  
- **Asset Categorization Interface**
  - Category selector with search and browse
  - Multiple selection for batch operations
  - Suggestions based on similar assets
  - Checkbox tree for hierarchical selection
  - Quick-add for commonly used categories

- **Tag Management**
  - Tag cloud visualization
  - Create/edit/merge tag functionality
  - Tag usage statistics
  - Color coding for tag types
  - Tag grouping capabilities

## Data Model

```
CategorySchemas:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  name: string
  description: text
  is_system: boolean
  is_hierarchical: boolean
  created_at: timestamp
  updated_at: timestamp

Categories:
  id: uuid (primary key)
  schema_id: uuid (foreign key to CategorySchemas)
  name: string
  description: text
  parent_id: uuid (self-reference, nullable)
  order: integer
  metadata: jsonb
  created_at: timestamp
  updated_at: timestamp

AssetCategoryAssignments:
  id: uuid (primary key)
  asset_id: uuid (foreign key to Assets)
  category_id: uuid (foreign key to Categories)
  assigned_by: uuid (foreign key to Users)
  assigned_at: timestamp
  notes: text (optional)
  created_at: timestamp
  updated_at: timestamp

Tags:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  name: string
  description: text (optional)
  color: string (optional, hex code)
  tag_group: string (optional)
  created_at: timestamp
  updated_at: timestamp

AssetTagAssignments:
  id: uuid (primary key)
  asset_id: uuid (foreign key to Assets)
  tag_id: uuid (foreign key to Tags)
  assigned_by: uuid (foreign key to Users)
  assigned_at: timestamp
  created_at: timestamp
  updated_at: timestamp

PredefinedCategorySchemas:
  id: uuid (primary key)
  name: string
  description: text
  schema_data: jsonb
  schema_type: enum [data_classification, technology_type, regulatory, business_function]
  created_at: timestamp
  updated_at: timestamp

CategoryInheritanceRules:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  parent_category_id: uuid (foreign key to Categories)
  child_category_id: uuid (foreign key to Categories)
  rule_type: enum [always_inherit, conditional_inherit]
  conditions: jsonb (optional)
  created_at: timestamp
  updated_at: timestamp
```

## API Endpoints

- `GET /api/v1/category-schemas` - List category schemas
- `POST /api/v1/category-schemas` - Create category schema
- `GET /api/v1/category-schemas/:id` - Get schema details
- `PUT /api/v1/category-schemas/:id` - Update schema
- `DELETE /api/v1/category-schemas/:id` - Delete schema
- `GET /api/v1/category-schemas/predefined` - List predefined schemas
- `POST /api/v1/category-schemas/import` - Import schema

- `GET /api/v1/categories` - List categories
- `POST /api/v1/categories` - Create category
- `GET /api/v1/categories/:id` - Get category details
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category
- `GET /api/v1/categories/hierarchy` - Get hierarchical view

- `GET /api/v1/tags` - List tags
- `POST /api/v1/tags` - Create tag
- `PUT /api/v1/tags/:id` - Update tag
- `DELETE /api/v1/tags/:id` - Delete tag
- `POST /api/v1/tags/merge` - Merge tags

- `GET /api/v1/assets/:id/categories` - Get asset categories
- `POST /api/v1/assets/:id/categories` - Assign categories to asset
- `DELETE /api/v1/assets/:id/categories/:categoryId` - Remove category from asset
- `POST /api/v1/assets/bulk/categories` - Bulk assign categories
- `GET /api/v1/assets/:id/tags` - Get asset tags
- `POST /api/v1/assets/:id/tags` - Assign tags to asset
- `DELETE /api/v1/assets/:id/tags/:tagId` - Remove tag from asset
- `POST /api/v1/assets/bulk/tags` - Bulk assign tags

## Success Metrics
- 95% of assets are assigned to at least one category
- 85% of assets have appropriate data classification
- Average time to categorize new assets < 2 minutes
- Category-based filtering reduces time to find relevant assets by 50%
- 80% of users report the categorization system improves asset organization

## Dependencies
- Asset Inventory (ASM-001) must be implemented
- User authentication and permission system must be working
- Basic UI components must be available

## Documentation Requirements
- **User Documentation:**
  - Guide to effective asset categorization
  - Best practices for category schema design
  - Instructions for bulk categorization
  - Tutorial on tag management

- **Developer Documentation:**
  - API reference for categorization endpoints
  - Data model documentation with relationships
  - Guide for extending categorization schemas
  - Integration points with other system components

## Resources and References
- [NIST SP 800-60: Guide for Mapping Types of Information and Information Systems to Security Categories](https://csrc.nist.gov/publications/detail/sp/800-60/vol-1-rev-1/final)
- [ISO 27001:2022 A.5.9: Asset classification](https://www.iso.org/standard/27001)
- [CMDB Classification Best Practices](https://www.servicenow.com/products/it-asset-management.html)
- [Data Classification Standards](https://www.nist.gov/privacy-framework/resource-center)
- [Taxonomy Design Principles](https://www.dataversity.net/fundamentals-taxonomies/)
- [Information Asset Classification Guidelines](https://www.ncsc.gov.uk/collection/risk-management/asset-classification) 