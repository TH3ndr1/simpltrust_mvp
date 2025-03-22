# Evidence Management Wireframe

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
| | EVIDENCE MANAGEMENT                                                                                  |       |
| +------------------------------------------------------------------------------------------------------+       |
|                                                                                                                 |
| +---------------------------------------------------+  +---------------------------------------------+         |
| | EVIDENCE REPOSITORY                               |  | [UPLOAD EVIDENCE]     [BULK UPLOAD]        |         |
| +---------------------------------------------------+  +---------------------------------------------+         |
|                                                                                                                 |
| +------------------------+  +-----------------------------------------------+                                  |
| | FILTERS                |  | +-----+ +------------------------------+ +------------+ +------+ +------------+  |
| |                        |  | |     | |                              | |            | |      | |            |  |
| | FRAMEWORK              |  | | ID  | | NAME                         | | FRAMEWORK  | | DATE | | STATUS     |  |
| | ☑ ISO 27001           |  | +-----+ +------------------------------+ +------------+ +------+ +------------+  |
| | ☐ SOC 2               |  | | E101 | | Password Policy Document    | | ISO 27001   | | 5/10 | | ✓ Approved |  |
| | ☐ GDPR                |  | +-----+ +------------------------------+ +------------+ +------+ +------------+  |
| | ☐ HIPAA               |  | | E102 | | User Access Review Records  | | ISO 27001   | | 5/12 | | ✓ Approved |  |
| | ☐ PCI DSS             |  | +-----+ +------------------------------+ +------------+ +------+ +------------+  |
| |                        |  | | E103 | | Incident Response Plan      | | ISO 27001   | | 5/15 | | ⚠ Pending  |  |
| | CONTROL DOMAIN         |  | +-----+ +------------------------------+ +------------+ +------+ +------------+  |
| | ☑ Access Control      |  | | E104 | | Vulnerability Scan Results   | | SOC 2       | | 5/18 | | ✓ Approved |  |
| | ☐ Cryptography        |  | +-----+ +------------------------------+ +------------+ +------+ +------------+  |
| | ☑ Security Policy     |  | | E105 | | Training Completion Records  | | GDPR        | | 5/20 | | ⚠ Pending  |  |
| | ☐ Physical Security   |  | +-----+ +------------------------------+ +------------+ +------+ +------------+  |
| | ☐ Communications      |  | | E106 | | Data Flow Diagram            | | ISO 27001   | | 5/22 | | ✗ Rejected |  |
| |                        |  | +-----+ +------------------------------+ +------------+ +------+ +------------+  |
| | DATE RANGE             |  |                                                                                  |
| | From: [04/01/2023]     |  |                                                                                  |
| | To:   [05/30/2023]     |  |                                                                                  |
| |                        |  | +------------------------------------------------------------------+            |
| | STATUS                 |  | | Showing 6 of 24 items                         [1] [2] [3] [4] [»] |            |
| | ☑ Approved            |  | +------------------------------------------------------------------+            |
| | ☑ Pending             |  |                                                                                  |
| | ☑ Rejected            |  |                                                                                  |
| |                        |  |                                                                                  |
| | [APPLY FILTERS]        |  |                                                                                  |
| | [CLEAR ALL]            |  |                                                                                  |
| +------------------------+  +---------------------------------------------------------------------+            |
|                                                                                                                 |
| +------------------------------------------------------------------------------------------------------+       |
| | SELECTED EVIDENCE DETAILS                                                                            |       |
| +------------------------------------------------------------------------------------------------------+       |
|                                                                                                                 |
| +------------------------------------------------------------------------------------------------------+       |
| |                                                                                                      |       |
| | ID: E103                            UPLOADED BY: Alex Johnson                 DATE: May 15, 2023     |       |
| | NAME: Incident Response Plan        FRAMEWORK: ISO 27001                     STATUS: ⚠ Pending      |       |
| |                                                                                                      |       |
| | DESCRIPTION:                                                                                         |       |
| | Company's incident response plan detailing procedures for security incident handling,                |       |
| | including roles, responsibilities, and escalation paths.                                             |       |
| |                                                                                                      |       |
| | CONTROLS SATISFIED:                                                                                  |       |
| | • A.16.1.1 - Responsibilities and procedures                                                         |       |
| | • A.16.1.2 - Reporting information security events                                                   |       |
| | • A.16.1.5 - Response to information security incidents                                              |       |
| |                                                                                                      |       |
| | REVIEW COMMENTS:                                                                                     |       |
| | Pending review from Security Officer. Initial review suggests plan needs more detail                 |       |
| | on containment strategies.                                                                           |       |
| |                                                                                                      |       |
| | +------------------------+  +------------------------+  +------------------------+                    |       |
| | | [DOWNLOAD]             |  | [UPDATE EVIDENCE]      |  | [APPROVE/REJECT]       |                    |       |
| | +------------------------+  +------------------------+  +------------------------+                    |       |
| |                                                                                                      |       |
| +------------------------------------------------------------------------------------------------------+       |
|                                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------+
```

## Elements Description

### Navigation
- Consistent top navigation bar matching other screens
- Current section (Evidence Management) highlighted

### Evidence Repository Section
- Main table displaying evidence records with sortable columns:
  - ID: Unique identifier for each evidence item
  - Name: Descriptive title of the evidence
  - Framework: Associated compliance framework
  - Date: When the evidence was uploaded/last updated
  - Status: Current approval status (Approved, Pending, Rejected)
- Upload buttons for adding new evidence (single or bulk upload)
- Pagination controls for navigating through evidence items

### Filters Panel
- Framework selection with checkboxes for multiple selections
- Control domain filtering options
- Date range selector with calendar picker
- Status filters for viewing specific approval states
- Apply and Clear buttons for filter management
- Quick status count indicators

### Evidence Details Panel
- Comprehensive view of selected evidence item
- Metadata section showing:
  - ID, name, uploader information
  - Framework association and current status
  - Upload/modification date
- Detailed description of the evidence
- List of controls satisfied by this evidence
- Review comments section showing feedback
- Action buttons:
  - Download: Retrieve the evidence file
  - Update: Modify the evidence record
  - Approve/Reject: Change the review status

## Responsive Behavior
- Filters panel collapses to dropdown/accordion on mobile
- Evidence table becomes scrollable horizontally on smaller screens
- Details panel stacks below the table on narrow viewports
- Action buttons adapt to available width
- Column visibility prioritization on smaller screens

## Interactions
- Clicking a row in the evidence table selects it and displays details
- Sorting by clicking column headers
- Selecting multiple evidence items for bulk actions
- Filtering updates the table in real-time
- Hovering on statuses shows tooltips with additional information
- Approval/Rejection actions trigger confirmation dialog
- Download initiates file download to user's device
- Upload button opens file selection dialog or drag-and-drop zone 