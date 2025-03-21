# SimplTrust: Minimum Viable Product (MVP) Definition

## Overview

The SimplTrust MVP is designed following lean startup principles to deliver immediate value to Small and Medium-sized Enterprises (SMEs) struggling with compliance and cybersecurity risk management. Rather than implementing the full platform sequentially, we focus on validating key differentiators early while building only the minimal necessary supporting functionality.

## Target Users

- **Compliance and Risk Managers**: Professionals managing multiple regulatory frameworks with limited resources
- **IT Administrators**: Staff responsible for implementing and monitoring cybersecurity measures
- **Operations Managers**: Executives overseeing compliance as part of business operations
- **SME Leadership**: Decision-makers in regulated industries (manufacturing, automotive, aerospace)

## Core Value Propositions & Differentiators

1. **Simplify Complexity with AI**: Transform complex compliance requirements into clear, actionable tasks using AI guidance (primary differentiator)
2. **Eliminate Redundant Work**: Reduce compliance overhead through a unified control framework that maps to multiple regulations (primary differentiator)
3. **Business-Centric Approach**: Contextualize compliance within business capabilities and assets (primary differentiator)
4. **Save Time and Resources**: Reduce manual compliance work through automation and guided workflows
5. **Improve Risk Visibility**: Provide clear visualization of compliance status and security risks

## Value-Driven MVP Approach

Our MVP is structured to validate our primary differentiators first, following lean startup principles:

1. **Build-Measure-Learn**: Each sprint delivers testable functionality for key differentiators
2. **Minimal Viable Product**: Only implementing what's necessary to validate core hypotheses
3. **Customer Development**: Incorporating feedback loops throughout development
4. **Rapid Iteration**: Enabling quick pivots based on validated learning

## Key Assumptions to Validate

1. **AI Guidance Value**: SMEs struggle with translating compliance requirements into action and will find AI-driven recommendations valuable
2. **Consolidated Framework Efficiency**: A unified control framework will significantly reduce redundant compliance work
3. **Business Context Importance**: Linking compliance to business capabilities and assets will improve decision-making
4. **Expertise Gap**: SMEs lack compliance expertise and will value a system that reduces expertise requirements

## MVP Feature Set by Epic

The MVP is structured around epics that represent major value streams:

### Epic E05: AI-Powered Action Planning (Key Differentiator)

**Core Functionality**:
- AI-powered recommendation engine for compliance gaps
- Actionable task generation with clear instructions
- Prioritization based on business impact
- Basic implementation tracking dashboard

**Minimal Implementation**:
- Initial implementation in Sprint 2, enhanced in Sprints 3-4
- Starting with common patterns, expanding to context-aware recommendations

### Epic E02: Unified Compliance Framework (Key Differentiator)

**Core Functionality**:
- Mapping of key regulations (ISO 27001, NIS2, GDPR)
- Consolidated control overview showing redundancy elimination
- Visual representation of control coverage across frameworks

**Minimal Implementation**:
- Initial implementation in Sprint 2
- Starting with 2-3 key frameworks, focusing on high-value control mappings

### Epic E01: Compliance Landscape Definition (Supporting)

**Core Functionality**:
- Simplified regulatory applicability questionnaire
- Basic business capability mapping
- Industry templates for common sectors

**Minimal Implementation**:
- Streamlined version in Sprint 1
- Focused on gathering just enough information to enable differentiators

### Epic E03: Asset Risk Management (Supporting)

**Core Functionality**:
- Basic asset inventory management
- Asset categorization and criticality rating
- Linking assets to compliance controls and business functions

**Minimal Implementation**:
- Initial implementation in Sprint 3
- Simplified data model with essential fields only

### Epic E04: Assessment & Gap Analysis (Supporting)

**Core Functionality**:
- Simplified assessment templates for key controls
- Basic gap identification mechanism
- Simple visualization of compliance status

**Minimal Implementation**:
- Minimal version in Sprint 4, enhanced in Sprint 5
- Focused on generating inputs for AI recommendations

### Epic E06: Documentation & Evidence (Supporting)

**Core Functionality**:
- Basic evidence storage and organization
- Linking evidence to controls and assessments

**Minimal Implementation**:
- Basic foundation in Sprint 5, completed in Sprint 6
- Simplified version with essential functionality only

### Epic E07: Continuous Compliance (Supporting)

**Core Functionality**:
- Simple monitoring of compliance status
- Basic training module framework

**Minimal Implementation**:
- Minimal version in Sprint 6
- Focus on demonstrating the concept rather than full implementation

## Technical Approach for MVP

### Frontend
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context API + SWR for data fetching
- **Charts/Visualization**: Minimal implementation with Recharts

### Backend
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth
- **API**: RESTful endpoints with JSON responses
- **AI Integration**: OpenAI API or similar for recommendation engine

### Development Approach
- **Vertical Slices**: Building complete features across stack for early testing
- **Feature Flags**: Enabling gradual rollout and A/B testing
- **Progressive Enhancement**: Starting with core functionality, enhancing iteratively

## Out of Scope for MVP

To maintain focus on validating key differentiators, we explicitly exclude:

1. **Advanced AI Customization**: Basic AI recommendations only, customization in post-MVP
2. **Comprehensive Framework Coverage**: Limited to 2-3 key regulatory frameworks
3. **Integration with External Systems**: No SIEM or asset management integration
4. **Advanced Reporting**: Only essential reports needed to demonstrate value
5. **Mobile Application**: Web-responsive only
6. **Customizable Workflows**: Standard workflows only in MVP

## Success Criteria

The MVP will be considered successful if it validates our key assumptions:

1. **Differentiator Validation**:
   - Users actively engage with AI recommendations (usage metrics)
   - Qualitative feedback confirms value of unified framework
   - Business context features show meaningful usage

2. **Problem-Solution Fit**:
   - 30%+ reduction in time spent on compliance activities
   - Non-experts successfully complete compliance tasks
   - NPS score of 30+ with specific positive feedback on differentiators

3. **Engagement Metrics**:
   - At least 10 SMEs actively using the platform
   - Completion of end-to-end compliance workflows
   - Regular return usage (weekly active users)

## Implementation Timeline

The MVP is planned for development over 6 two-week sprints (12 weeks total), with the following value-focused timeline:

- **Sprints 1-2**: Platform foundation and first key differentiator (Unified Framework & AI foundation)
- **Sprints 3-4**: Second and third key differentiators (Business Context & AI Action Planning)
- **Sprints 5-6**: Supporting functionality and MVP completion

For detailed sprint planning, see the [Agile Roadmap](../agile_roadmap/roadmap.md) document.

## Learning Plan

To maximize validated learning from our MVP:

1. **User Interviews**: Bi-weekly structured interviews with early users
2. **Usage Analytics**: Tracking feature usage, time spent, and conversion rates
3. **A/B Testing**: Testing variations of key features when possible
4. **Feedback Mechanisms**: In-app feedback tools and regular check-ins

## Post-MVP Direction

The roadmap beyond MVP will be determined by validated learning, focusing on:

1. **Enhancing validated differentiators**: Building on what users find most valuable
2. **Addressing identified gaps**: Resolving limitations discovered during MVP usage
3. **Expanding to adjacent value streams**: Adding capabilities that complement proven core value 