# Guided Workflow Wireframe

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
| +---------------------------------+  +-----------------------------------------------------------+  +--------+ |
| |                                 |  | RISK ASSESSMENT WORKFLOW                                  |  |        | |
| | WORKFLOW PROGRESS               |  +-----------------------------------------------------------+  |        | |
| |                                 |  |                                                           |  |        | |
| | [███████████████------] 65%     |  |  STEP 3: RISK EVALUATION                                  |  |        | |
| |                                 |  |                                                           |  |        | |
| | ● 1. Scope Definition          |  |  +-----------------------------------------------------+  |  |        | |
| | ● 2. Risk Identification       |  |  | Question 1 of 5:                                    |  |  |        | |
| | ○ 3. Risk Evaluation    ◄      |  |  |                                                     |  |  |        | |
| | ○ 4. Risk Treatment            |  |  | How would you rate the potential impact of this     |  |  |        | |
| | ○ 5. Documentation             |  |  | risk to your organization?                          |  |  |        | |
| |                                 |  |  |                                                     |  |  |        | |
| |                                 |  |  | ○ Critical - Severe business impact                |  |  | HELP   | |
| | SAVED AUTOMATICALLY             |  |  | ○ High - Significant business impact               |  |  | PANEL  | |
| | Last updated: 2 mins ago        |  |  | ○ Medium - Moderate business impact                |  |  |        | |
| |                                 |  |  | ○ Low - Minor business impact                      |  |  | What   | |
| | [SAVE AND EXIT]                 |  |  | ○ Negligible - Minimal business impact             |  |  | is     | |
| |                                 |  |  |                                                     |  |  | risk   | |
| |                                 |  |  +-----------------------------------------------------+  |  | impact?| |
| |                                 |  |                                                           |  |        | |
| | COMPLETION TIME                 |  |  +-----------------------------------------------------+  |  | How   | |
| | Estimated: 45 minutes           |  |  | Additional Context (Optional):                      |  |  | to     | |
| | Elapsed: 28 minutes             |  |  |                                                     |  |  | rate   | |
| |                                 |  |  | [                                                 ] |  |  | impact?| |
| |                                 |  |  | [                                                 ] |  |  |        | |
| |                                 |  |  | [                                                 ] |  |  | Risk   | |
| |                                 |  |  |                                                     |  |  | rating | |
| |                                 |  |  +-----------------------------------------------------+  |  | guide  | |
| |                                 |  |                                                           |  |        | |
| |                                 |  |  ASSET AFFECTED: Customer Data Management System         |  |  |        | |
| |                                 |  |  THREAT: Unauthorized Access                             |  |  | [MORE | |
| |                                 |  |  VULNERABILITY: Weak Authentication Controls             |  |  | INFO] | |
| |                                 |  |                                                           |  |        | |
| |                                 |  |  +-------------------------------------+  +------------+ |  |        | |
| |                                 |  |  | [SAVE AND PREVIOUS]                 |  | [NEXT]     | |  |        | |
| |                                 |  |  +-------------------------------------+  +------------+ |  |        | |
| +---------------------------------+  +-----------------------------------------------------------+  +--------+ |
|                                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------+
```

## Elements Description

### Navigation
- Consistent top navigation bar matching other screens
- Current workflow highlighted in navigation

### Progress Tracking
- Left sidebar showing overall workflow progress
- Visual progress bar with percentage completion
- Step-by-step breakdown with clear indicators:
  - Completed steps (filled circles)
  - Current step (outlined circle with arrow)
  - Upcoming steps (outlined circles)
- Auto-save functionality with timestamp
- Estimated and elapsed time indicators

### Main Content Area
- Clear workflow title and current step indicator
- Question-based interface with multiple choice options
- Context panel showing related assets, threats, and vulnerabilities
- Optional text input field for additional context/notes
- Previous and Next navigation buttons

### Help Panel
- Right sidebar with contextual guidance
- Quick links to relevant help topics
- Expandable information sections
- "More Info" button for detailed guidance

## Step Sequence
1. **Scope Definition** (Completed)
   - Define assessment boundaries
   - Select relevant frameworks
   - Identify key assets

2. **Risk Identification** (Completed)
   - Map threats to assets
   - Identify vulnerabilities
   - Document potential risk scenarios

3. **Risk Evaluation** (Current)
   - Rate impact and likelihood
   - Calculate risk scores
   - Prioritize risks

4. **Risk Treatment** (Upcoming)
   - Select treatment options
   - Assign controls
   - Define mitigation actions

5. **Documentation** (Upcoming)
   - Generate assessment report
   - Review documentation
   - Sign-off and approval

## Responsive Behavior
- Progress sidebar collapses to top progress bar on mobile
- Help panel becomes expandable accordion on smaller screens
- Question options stack vertically on narrow viewports
- Navigation buttons remain fixed at bottom of viewport

## Interactions
- Clicking on completed steps allows review/edit of previous responses
- Help panel sections expand/collapse on click
- Hovering over terms provides tooltip definitions
- Form data automatically saved on input changes
- Warning dialog appears when attempting to exit with unsaved changes 