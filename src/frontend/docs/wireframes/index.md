# SimpleTrust Wireframe Documentation

## Overview

This directory contains the wireframe documentation for the SimpleTrust platform, developed as part of UX-001-000: Create initial design mockups and wireframes.

## Contents

### Planning Documents

- [Wireframe Plan](./wireframe_plan.md) - Initial planning document outlining key screens and design approach
- [Wireframe Summary](./wireframe_summary.md) - Summary of completed wireframes and implementation plan
- [Design System Foundation](./design_system_foundation.md) - Core design system specifications for implementation

### Wireframes

1. [Dashboard](./dashboard_wireframe.md) - Main operational hub for the platform
2. [Guided Workflow](./guided_workflow_wireframe.md) - Step-by-step process wizard for assessments and tasks
3. [Evidence Management](./evidence_management_wireframe.md) - Repository for compliance evidence
4. [Controls & Policies](./controls_policies_wireframe.md) - Library for controls and governance documentation

## Next Steps

1. Review wireframes with stakeholders for feedback
2. Begin implementation of the design system in code
3. Create high-fidelity mockups for select key screens
4. Develop functional prototypes for user testing

## Wireframe Preview

```
+-----------------------------------------------------------------------------------------------------------------+
|                                                                                                                 |
|  +-------------------------------------------+  +-SimpleT-Logo-+  +------+  +--------+  +--------+  +--------+  |
|  | SIMPLETRUST                               |  |              |  | Home |  | Tasks  |  | Risks   |  | Help   |  |
|  +-------------------------------------------+  +--------------+  +------+  +--------+  +--------+  +--------+  |
|                                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------+
|                                                                                                                 |
|  +-------------------+  +------------------------------------------------------------------+  +---------------+ |
|  |                   |  | COMPLIANCE DASHBOARD                                             |  |               | |
|  | ORGANIZATION      |  +------------------------------------------------------------------+  | NOTIFICATIONS | |
|  | SUMMARY           |                                                                        |               | |
|  |                   |  +------------------+  +------------------+  +------------------+     |               | |
|  | - Name            |  | RISK SCORE       |  | TASK SUMMARY     |  | COMPLIANCE SCORE |     |               | |
|  | - GRC Status      |  |                  |  |                  |  |                  |     |               | |
|  | - Risk Level      |  | [GAUGE CHART]    |  | To Do: XX        |  | [PROGRESS BAR]   |     |               | |
|  | - Active Tasks    |  | 78/100           |  | In Progress: XX  |  | 82% Complete     |     |               | |
|  |                   |  |                  |  | Completed: XX    |  |                  |     |               | |
|  +-------------------+  +------------------+  +------------------+  +------------------+     +---------------+ |
|                                                                                                                 |
+-----------------------------------------------------------------------------------------------------------------+
```

## Design Color Palette

Primary: `#2563EB` (Blue)  
Secondary: `#0F172A` (Dark Blue)  
Accent: `#7C3AED` (Purple)  
Success: `#10B981` (Green)  
Warning: `#F59E0B` (Amber)  
Error: `#EF4444` (Red)  
Info: `#3B82F6` (Light Blue) 