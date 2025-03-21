# Feature Specification: ASP-003 - Assessment Scheduling

## Overview
The Assessment Scheduling feature enables organizations to plan and manage their compliance assessment activities according to defined cycles, regulatory deadlines, and organizational priorities. This feature allows users to create assessment schedules, set up recurring assessments, manage assessment calendars, assign resources, and track assessment timelines. By providing structured scheduling capabilities, the platform helps organizations transition from reactive compliance activities to proactive, planned compliance programs that ensure continuous monitoring of controls and timely fulfillment of regulatory obligations. This systematic approach to assessment scheduling helps prevent compliance gaps, reduces last-minute assessment rushes, and ensures appropriate resource allocation.

## Affected Components
- **Backend:**
  - Schedule management service
  - Calendar service
  - Notification service
  - Resource allocation service
  - Recurrence pattern engine
  - API endpoints for scheduling
  - Integration with external calendars
- **Frontend:**
  - Assessment calendar view
  - Schedule management interface
  - Resource assignment interface
  - Timeline visualization
  - Notification configuration
  - Schedule conflict resolution

## Technical Dependencies
- Assessment Templates (ASP-001)
- Assessment Execution (ASP-002)
- Control Framework Model (UCF-001) for framework-based scheduling
- PostgreSQL for data storage
- Next.js for frontend rendering
- React for UI components
- React Big Calendar or similar for calendar visualization
- Cron-like expression parsing for recurrence
- Email/notification service
- JWT for authentication
- Tailwind CSS for styling
- React Query for data fetching

## User Stories
- As a Compliance Manager, I want to schedule recurring assessments so that our controls are evaluated at regular intervals.
- As a Compliance Officer, I want to view all upcoming assessments in a calendar so that I can plan resource allocation.
- As an Audit Coordinator, I want to receive notifications about upcoming assessments so that I can prepare stakeholders.
- As a Department Head, I want to see assessment schedules affecting my department so that I can prepare my team.
- As a CISO, I want to align assessment schedules with regulatory deadlines so that we have sufficient time to remediate before reporting.
- As a Risk Manager, I want to prioritize assessment schedules based on risk levels so that high-risk areas are assessed more frequently.
- As a Compliance Administrator, I want to manage assessment schedules across multiple regulatory frameworks so that we can optimize resource utilization.

## Acceptance Criteria
- System allows creation of one-time and recurring assessment schedules
- Users can define various recurrence patterns (daily, weekly, monthly, quarterly, annually)
- Calendar view displays all scheduled assessments with filtering options
- System sends configurable notifications about upcoming assessments
- Users can assign resources and estimate effort for scheduled assessments
- System detects scheduling conflicts and provides resolution options
- Assessment schedules can be linked to regulatory deadlines
- Users can modify schedules with appropriate audit trail
- System supports dynamic scheduling based on risk factors
- Scheduled assessments automatically create assessment instances when due
- Integration with popular calendar applications (Google Calendar, Outlook)
- System tracks schedule adherence and provides compliance metrics

## Integration Points
- Uses templates from Assessment Templates (ASP-001)
- Creates instances for Assessment Execution (ASP-002)
- References control frameworks from Control Framework Model (UCF-001)
- May inform Task Management (IMP-002) for resource planning
- May use Risk Assessment (RSK-001) data for risk-based scheduling
- Provides data to Implementation Dashboard (IMP-001)
- May leverage Assessment Execution (ASP-002) history for scheduling optimization

## Testing Strategy
- **Unit Tests:**
  - Test recurrence pattern calculations
  - Verify notification timing
  - Test schedule creation validation
  - Validate conflict detection
- **Integration Tests:**
  - Test end-to-end schedule to assessment creation
  - Verify notification delivery
  - Test calendar integration
  - Validate resource allocation conflicts
- **Performance Tests:**
  - Measure calendar rendering with many scheduled items
  - Test concurrent schedule creation
  - Benchmark notification processing for large user bases
  - Test recurrence calculations at scale

## Implementation Phases
1. **Initial Implementation (Sprint 7)**
   - Create scheduling data model
   - Implement basic schedule management
   - Develop calendar view
   - Create simple recurrence patterns
   - Implement basic notifications
   - Develop schedule-to-assessment instantiation

2. **Enhancements (Later Sprints - partially in MVP scope)**
   - Implement advanced recurrence patterns
   - Develop resource management capabilities
   - Create conflict detection and resolution
   - Implement external calendar integration
   - Develop risk-based scheduling
   - Create schedule optimization features

## UI/UX Design
- **Assessment Calendar**
  - Month, week, and day views
  - Color-coded by assessment type
  - Drag-and-drop scheduling
  - Filter by framework, department, or resource
  - Assessment status indicators
  - Quick actions on calendar items
  - Export options

- **Schedule Management Interface**
  - Schedule creation wizard
  - Recurrence pattern builder
  - Resource assignment panel
  - Conflict visualization
  - Bulk scheduling options
  - Schedule template functionality
  - Regulatory deadline alignment

- **Timeline View**
  - Gantt-style visualization
  - Resource allocation view
  - Critical path highlighting
  - Milestone markers
  - Zoom levels (month, quarter, year)
  - Drag-to-adjust timeline

- **Notification Configuration**
  - Notification type selection
  - Timing configuration
  - Recipient management
  - Template customization
  - Channel selection (email, in-app, etc.)
  - Escalation rules

## Data Model

```
AssessmentSchedules:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  name: string
  description: text
  template_id: uuid (foreign key to AssessmentTemplates)
  schedule_type: enum [one_time, recurring]
  status: enum [active, inactive, completed, archived]
  priority: enum [critical, high, medium, low]
  estimated_effort_hours: float (nullable)
  created_by_id: uuid (foreign key to Users)
  created_at: timestamp
  updated_at: timestamp

ScheduleOccurrences:
  id: uuid (primary key)
  schedule_id: uuid (foreign key to AssessmentSchedules)
  assessment_id: uuid (foreign key to Assessments, nullable)
  planned_start_date: date
  planned_end_date: date
  actual_start_date: date (nullable)
  actual_end_date: date (nullable)
  status: enum [scheduled, in_preparation, in_progress, completed, cancelled, postponed]
  occurrence_notes: text (nullable)
  created_at: timestamp
  updated_at: timestamp

RecurrencePatterns:
  id: uuid (primary key)
  schedule_id: uuid (foreign key to AssessmentSchedules)
  pattern_type: enum [daily, weekly, monthly, quarterly, annually, custom]
  interval: integer
  frequency: jsonb
  start_date: date
  end_date: date (nullable)
  end_after_occurrences: integer (nullable)
  days_of_week: integer[] (nullable, bitmask)
  day_of_month: integer (nullable)
  month_of_year: integer (nullable)
  week_of_month: integer (nullable)
  custom_expression: string (nullable)
  created_at: timestamp
  updated_at: timestamp

ScheduleResources:
  id: uuid (primary key)
  schedule_id: uuid (foreign key to AssessmentSchedules)
  user_id: uuid (foreign key to Users)
  role_id: uuid (foreign key to Roles, nullable)
  resource_type: enum [coordinator, assessor, reviewer, stakeholder]
  allocation_percentage: float
  notes: text (nullable)
  created_at: timestamp
  updated_at: timestamp

ScheduleNotifications:
  id: uuid (primary key)
  schedule_id: uuid (foreign key to AssessmentSchedules)
  notification_type: enum [pre_start, start, approaching_deadline, deadline_passed, completion]
  days_offset: integer
  enabled: boolean
  recipient_type: enum [specific_users, resource_roles, department_heads, all_stakeholders]
  recipient_ids: uuid[] (nullable)
  custom_message: text (nullable)
  notification_channels: string[]
  created_at: timestamp
  updated_at: timestamp

ScheduleDependencies:
  id: uuid (primary key)
  dependent_schedule_id: uuid (foreign key to AssessmentSchedules)
  prerequisite_schedule_id: uuid (foreign key to AssessmentSchedules)
  dependency_type: enum [start_to_start, start_to_finish, finish_to_start, finish_to_finish]
  offset_days: integer
  is_hard_dependency: boolean
  notes: text (nullable)
  created_at: timestamp
  updated_at: timestamp

RegulatoryDeadlines:
  id: uuid (primary key)
  organization_id: uuid (foreign key)
  framework_id: uuid (foreign key to ControlFrameworks, nullable)
  deadline_name: string
  deadline_description: text
  deadline_date: date
  recurrence_pattern_id: uuid (foreign key to RecurrencePatterns, nullable)
  linked_schedule_ids: uuid[] (foreign keys to AssessmentSchedules)
  created_at: timestamp
  updated_at: timestamp

ScheduleHistory:
  id: uuid (primary key)
  schedule_id: uuid (foreign key to AssessmentSchedules)
  action_type: enum [created, updated, status_changed, resource_changed, recurrence_changed]
  action_details: jsonb
  performed_by_id: uuid (foreign key to Users)
  performed_at: timestamp

ExternalCalendarSyncSettings:
  id: uuid (primary key)
  user_id: uuid (foreign key to Users)
  calendar_type: enum [google, outlook, ical]
  sync_enabled: boolean
  last_synced_at: timestamp (nullable)
  sync_token: string (nullable)
  calendar_id: string (nullable)
  created_at: timestamp
  updated_at: timestamp
```

## API Endpoints

- `GET /api/v1/assessment/schedules` - List assessment schedules
- `POST /api/v1/assessment/schedules` - Create assessment schedule
- `GET /api/v1/assessment/schedules/:id` - Get schedule details
- `PUT /api/v1/assessment/schedules/:id` - Update schedule
- `DELETE /api/v1/assessment/schedules/:id` - Delete schedule
- `POST /api/v1/assessment/schedules/:id/activate` - Activate schedule
- `POST /api/v1/assessment/schedules/:id/deactivate` - Deactivate schedule
- `POST /api/v1/assessment/schedules/:id/archive` - Archive schedule

- `GET /api/v1/assessment/schedules/:id/occurrences` - List schedule occurrences
- `POST /api/v1/assessment/schedules/:id/occurrences` - Add manual occurrence
- `PUT /api/v1/assessment/schedules/:id/occurrences/:occurrenceId` - Update occurrence
- `DELETE /api/v1/assessment/schedules/:id/occurrences/:occurrenceId` - Remove occurrence
- `POST /api/v1/assessment/schedules/:id/generate-occurrences` - Generate occurrences from pattern

- `GET /api/v1/assessment/schedules/:id/pattern` - Get recurrence pattern
- `POST /api/v1/assessment/schedules/:id/pattern` - Create/update recurrence pattern
- `DELETE /api/v1/assessment/schedules/:id/pattern` - Remove recurrence pattern

- `GET /api/v1/assessment/schedules/:id/resources` - List assigned resources
- `POST /api/v1/assessment/schedules/:id/resources` - Assign resource
- `PUT /api/v1/assessment/schedules/:id/resources/:resourceId` - Update resource assignment
- `DELETE /api/v1/assessment/schedules/:id/resources/:resourceId` - Remove resource

- `GET /api/v1/assessment/schedules/:id/notifications` - List notifications
- `POST /api/v1/assessment/schedules/:id/notifications` - Add notification
- `PUT /api/v1/assessment/schedules/:id/notifications/:notificationId` - Update notification
- `DELETE /api/v1/assessment/schedules/:id/notifications/:notificationId` - Remove notification

- `GET /api/v1/assessment/schedules/:id/dependencies` - List dependencies
- `POST /api/v1/assessment/schedules/:id/dependencies` - Add dependency
- `DELETE /api/v1/assessment/schedules/:id/dependencies/:dependencyId` - Remove dependency

- `GET /api/v1/assessment/calendar` - Get calendar of all scheduled assessments
- `GET /api/v1/assessment/calendar/upcoming` - Get upcoming assessments
- `GET /api/v1/assessment/calendar/user` - Get current user's assessment schedule

- `GET /api/v1/regulatory-deadlines` - List regulatory deadlines
- `POST /api/v1/regulatory-deadlines` - Create regulatory deadline
- `PUT /api/v1/regulatory-deadlines/:id` - Update regulatory deadline
- `DELETE /api/v1/regulatory-deadlines/:id` - Delete regulatory deadline

- `GET /api/v1/assessment/schedules/:id/history` - Get schedule history
- `POST /api/v1/assessment/schedules/:id/instantiate` - Create assessment from schedule

- `POST /api/v1/calendar/sync/settings` - Create/update calendar sync settings
- `GET /api/v1/calendar/sync/settings` - Get calendar sync settings
- `POST /api/v1/calendar/sync` - Trigger calendar synchronization

## Success Metrics
- 85% of compliance assessments are conducted according to schedule
- Schedule adherence improves by 40% compared to manual scheduling
- Resource utilization for assessment activities improves by 25%
- Reduction in emergency/last-minute assessments by 70%
- 90% of regulatory deadlines have associated assessment schedules
- User satisfaction with assessment scheduling is 4.0/5 or higher
- Time spent managing assessment schedules reduced by 50%

## Dependencies
- Assessment Templates (ASP-001) must be implemented
- Assessment Execution (ASP-002) must be implemented
- User authentication and permission system must be working
- Notification system must be available
- Basic UI components must be implemented
- Calendar integration capabilities

## Documentation Requirements
- **User Documentation:**
  - Guide to effective assessment scheduling
  - Tutorial on creating recurring schedules
  - Best practices for resource allocation
  - Instructions for calendar integration
  - Guidelines for regulatory deadline management

- **Developer Documentation:**
  - API reference for assessment scheduling
  - Documentation of recurrence pattern algorithms
  - Guide for extending notification types
  - Integration points with external calendar systems

## Resources and References
- [NIST SP 800-53A Assessment Scheduling](https://csrc.nist.gov/publications/detail/sp/800-53a/rev-4/final)
- [ISO 19011: Guidelines for Auditing Management Systems (Planning section)](https://www.iso.org/standard/70017.html)
- [iCalendar Specification (RFC 5545)](https://tools.ietf.org/html/rfc5545)
- [ISACA Compliance Program Management](https://www.isaca.org/resources/isaca-journal/issues/2018/volume-1/compliance-monitoring-and-enforcement-programs)
- [Google Calendar API](https://developers.google.com/calendar)
- [Microsoft Graph API for Outlook Calendar](https://docs.microsoft.com/en-us/graph/api/resources/calendar) 