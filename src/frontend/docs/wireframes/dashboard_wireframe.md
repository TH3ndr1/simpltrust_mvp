# Dashboard Wireframe

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
|  +-------------------+  +------------------------------------------------------------------+  +---------------+ |
|  |                   |  | COMPLIANCE DASHBOARD                                             |  |               | |
|  | ORGANIZATION      |  +------------------------------------------------------------------+  | NOTIFICATIONS | |
|  | SUMMARY           |                                                                        |               | |
|  |                   |  +------------------+  +------------------+  +------------------+     | +-----------+  | |
|  | - Name            |  | RISK SCORE       |  | TASK SUMMARY     |  | COMPLIANCE SCORE |     | | Alert 1   |  | |
|  | - GRC Status      |  |                  |  |                  |  |                  |     | +-----------+  | |
|  | - Risk Level      |  | [GAUGE CHART]    |  | To Do: XX        |  | [PROGRESS BAR]   |     |               | |
|  | - Active Tasks    |  | 78/100           |  | In Progress: XX  |  | 82% Complete     |     | +-----------+  | |
|  |                   |  |                  |  | Completed: XX    |  |                  |     | | Alert 2   |  | |
|  |                   |  +------------------+  +------------------+  +------------------+     | +-----------+  | |
|  +-------------------+                                                                       |               | |
|                        +------------------------------------------------------------------+  | +-----------+  | |
|  +-------------------+ | RECENT ACTIVITIES                                                |  | | Alert 3   |  | |
|  |                   | |                                                                  |  | +-----------+  | |
|  | QUICK ACTIONS     | | +---------+ +----------------------------------------+ +-------+ |  |               | |
|  |                   | | | Date    | | Activity                               | | User  | |  | +-----------+  | |
|  | [Start Assessment]| | +---------+ +----------------------------------------+ +-------+ |  | | Alert 4   |  | |
|  |                   | | | 05/15   | | Updated ISO 27001 evidence             | | Tom   | |  | +-----------+  | |
|  | [Upload Evidence] | | +---------+ +----------------------------------------+ +-------+ |  |               | |
|  |                   | | | 05/14   | | Completed Risk Assessment for Q2       | | Sarah | |  |               | |
|  | [Generate Report] | | +---------+ +----------------------------------------+ +-------+ |  |               | |
|  |                   | | | 05/13   | | Added new control for data privacy     | | Alex  | |  | [View All]    | |
|  +-------------------+ | +---------+ +----------------------------------------+ +-------+ |  |               | |
|                        |                                                [View All]        |  +---------------+ |
|  +-------------------+ +------------------------------------------------------------------+                    |
|  |                   |                                                                                          |
|  | UPCOMING          | +------------------------------------------------------------------+                    |
|  | DEADLINES         | | FRAMEWORK COMPLIANCE                                             |                    |
|  |                   | |                                                                  |                    |
|  | - 05/20: Complete | | [BAR CHART]                                                      |                    |
|  |   Quarterly Risk  | |                                                                  |                    |
|  |   Assessment      | | ISO 27001 |████████████████████████████--------| 85%             |                    |
|  |                   | | SOC 2     |██████████████████----------------| 60%                |                    |
|  | - 06/05: Submit   | | GDPR      |████████████████████████----------| 75%                |                    |
|  |   Annual Report   | | HIPAA     |████████████████--------------------| 50%              |                    |
|  |                   | |                                                                  |                    |
|  +-------------------+ +------------------------------------------------------------------+                    |
|                                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------+
```

## Elements Description

### Navigation
- Top navigation bar with logo, main menu items, and profile link
- Menu items include Home, Tasks, Risks, and Help
- Profile section in top-right for user settings

### Organization Summary
- Quick view of organization details
- GRC status indicator
- Summary of risk level and active tasks

### Dashboard Widgets
1. **Risk Score**
   - Gauge chart visualization
   - Numeric score out of 100
   - Color-coded risk level indication

2. **Task Summary**
   - Overview of task statuses
   - Count of To Do, In Progress, and Completed tasks
   - Quick indicator of workload distribution

3. **Compliance Score**
   - Progress bar visualization
   - Percentage completion indicator
   - Visual indication of compliance health

4. **Recent Activities**
   - Chronological list of recent platform activities
   - Date, activity description, and user information
   - "View All" link for complete activity history

5. **Framework Compliance**
   - Bar chart showing compliance percentage by framework
   - Visual progress for each supported compliance framework
   - Color-coded status indicators

### Quick Actions
- Prominent buttons for common tasks
- Start Assessment button
- Upload Evidence button
- Generate Report button

### Notifications & Alerts
- Real-time notifications panel
- Critical alerts highlighted
- "View All" option for notification history

### Upcoming Deadlines
- Time-sensitive items requiring attention
- Due dates with clear visual priority
- Brief description of required actions

## Responsive Behavior
- On smaller screens, widgets will stack vertically
- Sidebar elements will collapse into a mobile menu
- Critical widgets (Risk Score, Task Summary) remain most prominent
- "Hamburger" menu replaces top navigation on mobile

## Interactions
- Clicking widgets opens detailed view of that section
- Quick action buttons trigger respective workflows
- Notifications can be marked as read or dismissed
- Recent Activities entries link to the specific items 