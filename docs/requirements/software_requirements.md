# Software Requirements Specification Document

## System Design
- **MVP Focus:**  
  - Deliver core GRC functionality including compliance assessments, risk management, control mapping, policy management, audit tracking, vendor management, and action management.
  - Integrate an advanced dashboard and guided workflow to support role-specific GRC tasks.
- **Modular Layout:**  
  - Distinct modules for risk assessments, control monitoring, policy reviews, audit logs, incident reporting, vendor management, and action management.
- **Responsiveness:**  
  - Adapt design for desktop and mobile devices.

## Architecture Pattern
- **Monolithic Architecture for MVP:**  
  - Prioritize rapid development and deployment.
  - Internally modularize the code to facilitate future migration to microservices.
- **Layered Structure:**  
  - Clear separation between presentation, business logic, and data access layers.
- **Modular Monolith with Bounded Contexts:**  
  - Structure the codebase into well-defined domains (e.g., compliance, risk, audit, vendor management, action management) using Domain-Driven Design (DDD) principles to enable new features with minimal impact.

## State Management
- **Centralized State:**  
  - Utilize a global state store (e.g., Redux for React) to manage dashboards, notifications, user sessions, and core GRC modules.
- **Local Component State:**  
  - Use local state for forms and guided workflows.
- **Real-Time Synchronization:**  
  - Implement basic WebSocket integration or polling for critical updates (e.g., notifications, risk alerts).

## Data Flow
- **Client-Server Interaction:**  
  - Front-end communicates with the Supabase-based backend via RESTful APIs.
  - Server processes data and synchronizes it with the global state.
- **Event-Driven Notifications:**  
  - Use WebSockets or polling to push real-time updates for GRC alerts and risk events.
- **Separation of Concerns:**  
  - Clearly separate data retrieval, processing, and presentation.

## Technical Stack
- **Backend:**  
  - **Supabase:**  
    - Managed PostgreSQL database with built-in authentication and real-time capabilities.
    - Exposes RESTful APIs (via PostgREST) and supports potential GraphQL integration.
- **Frontend:**  
  - **Next.js with TypeScript:**  
    - Supports server-side rendering, static site generation, and dynamic routing.
  - **Windshield CSS:**  
    - Provides a responsive, accessible, and consistent UI.
- **Real-Time Communication:**  
  - **Socket.io:**  
    - For implementing essential real-time notifications.
- **API:**  
  - RESTful endpoints delivering JSON responses.
- **Deployment:**  
  - Use Vercel for Next.js and Supabase managed services for the backend.

## Route Design
- **RESTful Endpoint Hierarchy:**  
  - `/api/v1/dashboard` – Dashboard metrics and risk summaries.
  - `/api/v1/workflow` – Endpoints for guided workflow tasks.
  - `/api/v1/notifications` – Alerts and real-time notifications.
  - `/api/v1/settings` – User configuration and account management.
  - `/api/v1/grc` – Endpoints for core GRC modules: controls, policies, audit logs, risk assessments, vendor management, and action management.
- **Nested Routes:**  
  - Organize endpoints to encapsulate module-specific functionalities.
- **API Versioning:**  
  - Start with `/api/v1/` to maintain backward compatibility and support feature evolution.
- **Feature Toggles:**  
  - Integrate feature toggles to gradually roll out new functionalities without affecting existing APIs.

## API Design
- **RESTful API Endpoints:**  
  - Implement CRUD operations for core entities: Users, Assessments, Controls, Policies, Assets, Notifications, Tasks, Audit Logs, Reports, Incidents, Vendors, Risks, and Actions.
- **Standardized JSON Responses:**  
  - Ensure consistent error handling and response formatting.
- **Documentation:**  
  - Use Swagger/OpenAPI for comprehensive API documentation.
- **Security:**  
  - Secure endpoints using JWT-based authentication and role-based access control.

## Scalability & Evolution Recommendations
- **Decoupled Communication:**  
  - Use asynchronous messaging or event-driven patterns (e.g., a message bus) within the monolith to decouple modules.
- **Continuous Integration & Automated Testing:**  
  - Implement CI/CD pipelines and comprehensive tests (unit, integration, end-to-end) to catch regressions as new features are added.
- **Microkernel/Plugin Architecture (Future-Proofing):**  
  - Design the system to support a plugin-like architecture so that new features can be integrated with minimal refactoring.
- **API Versioning & Feature Toggles:**  
  - Maintain API versioning and use feature toggles to gradually roll out new functionalities.

## Database Design ERD

### Streamlined MVP Core ERD
This diagram represents the minimal set of entities required to deliver the core GRC functionality in SimplTrust for rapid MVP development. In addition to the basic entities (Users, Assessments, Tasks, Actions, Assets, and Risks), the MVP ERD now also includes key entities such as Evidence, Controls, and Policies that were present in the original proposal.

```mermaid
erDiagram
    %% Core Authentication & User Management
    USERS ||--o{ ASSESSMENTS : "creates"
    
    %% Compliance Assessments & Tasks
    ASSESSMENTS ||--o{ TASKS : "contains"
    TASKS ||--o{ TASK_ACTIONS : "includes"
    ACTIONS ||--o{ TASK_ACTIONS : "contributes"
    
    %% Risk Management & Evidence
    ASSESSMENTS ||--o{ RISKS : "evaluates"
    ASSESSMENTS ||--o{ EVIDENCE : "documents"
    ASSETS ||--o{ RISKS : "faces"
    USERS ||--o{ ASSETS : "manages"
    
    %% Compliance Controls & Policies
    ASSESSMENTS ||--o{ CONTROLS : "applies"
    CONTROLS ||--o{ POLICIES : "inform"
    
    %% Entities definition
    USERS {
      int id PK
      string name
      string email
      string role
      string password_hash
    }
    ASSESSMENTS {
      int id PK
      int user_id FK
      string title
      date created_at
      date updated_at
    }
    TASKS {
      int id PK
      int assessment_id FK
      string description
      string status
      date due_date
    }
    ACTIONS {
      int id PK
      string description
      string status
      date due_date
      string impact
    }
    TASK_ACTIONS {
      int task_id FK
      int action_id FK
      float contribution_factor
    }
    ASSETS {
      int id PK
      string asset_name
      string asset_type
      text description
    }
    RISKS {
      int id PK
      string risk_name
      text description
      string likelihood
      string impact
      text mitigation_plan
      int asset_id FK
      int assessment_id FK
    }
    EVIDENCE {
      int id PK
      int assessment_id FK
      string evidence_type
      text details
      date collected_at
    }
    CONTROLS {
      int id PK
      string control_name
      text description
      int assessment_id FK
    }
    POLICIES {
      int id PK
      string policy_name
      text description
      date effective_date
    }


### Extended ERD - post MVP (as this will increase complexity)

erDiagram
    %% Strategic & Enterprise Context
    COMPANY ||--o{ USERS : "employs"
    COMPANY ||--o{ PLANS : "defines"
    PLANS ||--o{ GOALS : "targets"
    GOALS ||--|| PLANS : "aligns with"
    
    %% Core Entities (MVP Core Reused)
    USERS ||--o{ ASSESSMENTS : "creates"
    ASSESSMENTS ||--o{ TASKS : "contains"
    TASKS ||--o{ TASK_ACTIONS : "includes"
    ACTIONS ||--o{ TASK_ACTIONS : "contributes"
    ASSESSMENTS ||--o{ RISKS : "evaluates"
    ASSETS ||--o{ RISKS : "faces"
    USERS ||--o{ ASSETS : "manages"
    ASSESSMENTS ||--o{ EVIDENCE : "documents"
    ASSESSMENTS ||--o{ CONTROLS : "applies"
    CONTROLS ||--o{ POLICIES : "aligns with"
    
    %% Regulatory & Compliance Details
    REGULATIONS ||--o{ CONTROLS : "defines"
    REGULATIONS ||--|| ARTICLES : "comprises"
    
    %% Audit, Incident and Change Management
    ASSESSMENTS ||--o{ AUDIT_LOGS : "generates"
    ASSETS ||--o{ INCIDENTS : "experiences"
    INCIDENTS ||--|| PROBLEMS : "triggers"
    CHANGE ||--|| DOCUMENTS : "records"
    
    %% Knowledge & Documentation
    KNOWLEDGE_ITEMS ||--|| DOCUMENTS : "supports"
    USERS ||--|| VERSIONS : "maintains"
    
    %% Vendor & External Management
    VENDORS ||--o{ ASSETS : "supplies"
    
    %% Optional Context and Relationships
    CONTEXT ||--|| GOALS : "informs"
    
    %% Entities definition (Extended set)
    COMPANY {
      int id PK
      string name
      string industry
      string description
    }
    PLANS {
      int id PK
      int company_id FK
      string name
      text description
    }
    GOALS {
      int id PK
      int plan_id FK
      string name
      text description
    }
    REGULATIONS {
      int id PK
      string regulation_code
      string name
      text description
    }
    CONTROLS {
      int id PK
      string control_name
      text description
      int regulation_id FK
    }
    POLICIES {
      int id PK
      string policy_name
      text description
      date effective_date
    }
    ARTICLES {
      int id PK
      int regulation_id FK
      string title
      text content
    }
    AUDIT_LOGS {
      int id PK
      int user_id FK
      string event
      text details
      date timestamp
    }
    INCIDENTS {
      int id PK
      int asset_id FK
      string incident_type
      text description
      date reported_at
    }
    PROBLEMS {
      int id PK
      string description
      date reported_at
    }
    CHANGE {
      int id PK
      string description
      date change_date
    }
    DOCUMENTS {
      int id PK
      string title
      text content
      date created_at
    }
    KNOWLEDGE_ITEMS {
      int id PK
      string title
      text content
    }
    VERSIONS {
      int id PK
      string version_number
      date release_date
    }
    VENDORS {
      int id PK
      string vendor_name
      string contact_info
      int risk_rating
    }
    CONTEXT {
      int id PK
      string description
    }