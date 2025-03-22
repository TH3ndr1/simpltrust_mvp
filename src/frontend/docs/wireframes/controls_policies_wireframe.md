# Controls & Policies Wireframe

```
+-----------------------------------------------------------------------------------------------------------------+
|                                                                                                                 |
|  +-------------------------------------------+  +-SimpleT-Logo-+  +------+  +--------+  +--------+  +--------+  |
|  | SIMPLETRUST                               |  |              |  | Home |  | Tasks  |  | Risks   |  | Help   |  |
|  +-------------------------------------------+  +--------------+  +------+  +--------+  +--------+  +--------+  |
|                                                                                                      +--------+ |
|                                                                                                      | Profile | |
|                                                                                                      +--------+ |
+-----------------------------------------------------------------------------------------------------------------+
|                                                                                                                 |
| +------------------------------------------------------------------------------------------------------+       |
| | CONTROLS & POLICIES                                                                                  |       |
| +------------------------------------------------------------------------------------------------------+       |
|                                                                                                                 |
| +-------------------+  +-------------------+  +-------------------+  +-------------------+                      |
| | [CONTROLS]        |  | [POLICIES]        |  | [PROCEDURES]      |  | [DOCUMENTATION]   |                      |
| +-------------------+  +-------------------+  +-------------------+  +-------------------+                      |
|                                                                                                                 |
| +---------------------------------------------------+  +---------------------------------------------+         |
| | CONTROLS LIBRARY                                  |  | [ADD CONTROL]     [IMPORT CONTROLS]       |         |
| +---------------------------------------------------+  +---------------------------------------------+         |
|                                                                                                                 |
| +------------------------+  +-----------------------------------------------+                                  |
| | FILTERS                |  | +-------+ +--------------------+ +------------+ +--------+ +-------------+       |
| |                        |  | |       | |                    | |            | |        | |             |       |
| | FRAMEWORK              |  | | ID    | | NAME               | | DOMAIN     | | STATUS | | MATURITY    |       |
| | ☑ ISO 27001           |  | +-------+ +--------------------+ +------------+ +--------+ +-------------+       |
| | ☐ SOC 2               |  | | C-001  | | Password Policy    | | Access Ctrl | | Active | | Established |       |
| | ☐ GDPR                |  | +-------+ +--------------------+ +------------+ +--------+ +-------------+       |
| | ☐ HIPAA               |  | | C-002  | | Access Reviews     | | Access Ctrl | | Active | | Managed     |       |
| | ☐ PCI DSS             |  | +-------+ +--------------------+ +------------+ +--------+ +-------------+       |
| |                        |  | | C-003  | | Encryption         | | Crypto     | | Active | | Defined     |       |
| | CONTROL DOMAIN         |  | +-------+ +--------------------+ +------------+ +--------+ +-------------+       |
| | ☑ Access Control      |  | | C-004  | | Incident Response  | | Operations  | | Draft  | | Initial     |       |
| | ☑ Cryptography        |  | +-------+ +--------------------+ +------------+ +--------+ +-------------+       |
| | ☐ Operations          |  | | C-005  | | Backup Process     | | Operations  | | Active | | Managed     |       |
| | ☐ Physical Security   |  | +-------+ +--------------------+ +------------+ +--------+ +-------------+       |
| | ☐ Communications      |  | | C-006  | | Awareness Training | | Human Res.  | | Active | | Optimized   |       |
| |                        |  | +-------+ +--------------------+ +------------+ +--------+ +-------------+       |
| | STATUS                 |  |                                                                                  |
| | ☑ Active              |  |                                                                                  |
| | ☐ Draft               |  |                                                                                  |
| | ☐ Archived            |  | +------------------------------------------------------------------+            |
| |                        |  | | Showing 6 of 32 controls                     [1] [2] [3] [4] [»] |            |
| | MATURITY LEVEL         |  | +------------------------------------------------------------------+            |
| | ☑ Initial             |  |                                                                                  |
| | ☑ Defined             |  |                                                                                  |
| | ☑ Established         |  |                                                                                  |
| | ☑ Managed             |  |                                                                                  |
| | ☑ Optimized           |  |                                                                                  |
| |                        |  |                                                                                  |
| | [APPLY FILTERS]        |  |                                                                                  |
| | [CLEAR ALL]            |  |                                                                                  |
| +------------------------+  +---------------------------------------------------------------------+            |
|                                                                                                                 |
| +------------------------------------------------------------------------------------------------------+       |
| | SELECTED CONTROL DETAILS                                                                             |       |
| +------------------------------------------------------------------------------------------------------+       |
|                                                                                                                 |
| +------------------------------------------------------------------------------------------------------+       |
| |                                                                                                      |       |
| | ID: C-003                                    OWNER: Security Team                                    |       |
| | NAME: Encryption Requirements                STATUS: Active            MATURITY: Defined             |       |
| |                                                                                                      |       |
| | DESCRIPTION:                                                                                         |       |
| | Defines encryption standards for data at rest and in transit, including approved algorithms,         |       |
| | key management procedures, and implementation requirements.                                          |       |
| |                                                                                                      |       |
| | FRAMEWORK MAPPINGS:                                                                                  |       |
| | • ISO 27001: A.10.1.1 - Policy on the use of cryptographic controls                                  |       |
| | • SOC 2: CC6.1 - Secure data in transit and at rest                                                  |       |
| | • GDPR: Article 32 - Security of processing                                                          |       |
| |                                                                                                      |       |
| | IMPLEMENTATION EVIDENCE:                                                                             |       |
| | • E104 - Encryption Algorithm Documentation                                                          |       |
| | • E112 - Key Management Procedures                                                                   |       |
| |                                                                                                      |       |
| | ASSESSMENT HISTORY:                                                                                  |       |
| | • 2023-04-15: Internal audit - Passed with recommendations                                           |       |
| | • 2023-01-20: External assessment - Conditionally passed                                             |       |
| |                                                                                                      |       |
| | RISK LINKAGE:                                                                                        |       |
| | • R-007: Data breach due to unencrypted sensitive information                                        |       |
| | • R-015: Unauthorized access to encrypted data through weak key management                           |       |
| |                                                                                                      |       |
| | +----------------------+  +----------------------+  +----------------------+  +-------------------+   |       |
| | | [EDIT CONTROL]       |  | [ASSESS CONTROL]     |  | [LINK EVIDENCE]      |  | [ARCHIVE]         |   |       |
| | +----------------------+  +----------------------+  +----------------------+  +-------------------+   |       |
| |                                                                                                      |       |
| +------------------------------------------------------------------------------------------------------+       |
|                                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------+
```

## Elements Description

### Navigation
- Consistent top navigation bar matching other screens
- Current section (Controls & Policies) highlighted

### Tab Navigation
- Tabbed interface for different categories:
  - Controls (active tab): Technical and operational security measures
  - Policies: High-level governance documents
  - Procedures: Detailed step-by-step instructions
  - Documentation: Supporting reference materials

### Controls Library
- Main table displaying controls with sortable columns:
  - ID: Unique identifier for each control
  - Name: Descriptive title of the control
  - Domain: Functional area the control belongs to
  - Status: Current state (Active, Draft, Archived)
  - Maturity: Implementation maturity level
- Action buttons for adding new controls or importing from frameworks
- Pagination controls for navigating through controls

### Filters Panel
- Framework selection with checkboxes for multiple selections
- Control domain filtering options
- Status filters for viewing different lifecycle states
- Maturity level filters for implementation status
- Apply and Clear buttons for filter management

### Control Details Panel
- Comprehensive view of selected control
- Metadata section showing:
  - ID, name, owner information
  - Status and maturity level
- Detailed description of the control
- Framework mappings showing which compliance requirements this control satisfies
- Implementation evidence linking to supporting documentation
- Assessment history showing past evaluations
- Risk linkage showing which risks this control mitigates
- Action buttons:
  - Edit Control: Modify control details
  - Assess Control: Perform an assessment/audit
  - Link Evidence: Connect supporting documentation
  - Archive: Move to archived state

## Responsive Behavior
- Tab navigation becomes dropdown menu on mobile
- Filters panel collapses to dropdown/accordion on smaller screens
- Control table becomes scrollable horizontally on smaller screens
- Details panel stacks below the table on narrow viewports
- Action buttons adapt to available width or become menu items

## Interactions
- Clicking a row in the controls table selects it and displays details
- Tabbed navigation changes the content shown
- Sorting by clicking column headers
- Filtering updates the table in real-time
- Framework mappings link to framework requirements
- Evidence items link to the evidence management screen
- Risk items link to the risk management screen
- Hovering over maturity levels shows tooltips with maturity definitions
- Assessment actions open assessment workflow 