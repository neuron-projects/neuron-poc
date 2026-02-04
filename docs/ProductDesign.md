# ERP Incident Triage Portal - UI Design & User Journeys

## Simple UI Design (POC)

### 1. Dashboard / Home Screen
```text
┌─────────────────────────────────────────────────────────────┐
│  🔧 ERP Incident Triage Portal          [+ New Incident]    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📊 Quick Stats                                              │
│  ┌──────────┬──────────┬──────────┬──────────┐             │
│  │   P1     │   P2     │   P3     │  Total   │             │
│  │   🔴 3   │   🟡 12  │   🟢 25  │    40    │             │
│  └──────────┴──────────┴──────────┴──────────┘             │
│                                                               │
│  🔍 Filters:  [All Severities ▼] [All Modules ▼] [🔎 Search]│
│                                                               │
│  📋 Recent Incidents                                         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 🔴 INC-001 | Invoice stuck in AP approval               ││
│  │    AP Module | Production | P1 - Critical               ││
│  │    Category: Configuration Issue                        ││
│  │    Created: 2 hours ago                                 ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ 🟡 INC-002 | Integration failure - AR to Salesforce    ││
│  │    AR Module | Production | P2 - High                   ││
│  │    Category: Integration Failure                        ││
│  │    Created: 5 hours ago                                 ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ 🟢 INC-003 | User access request for GL reports        ││
│  │    GL Module | Test | P3 - Medium                       ││
│  │    Category: Security/Access                            ││
│  │    Created: 1 day ago                                   ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│                                    [Load More]               │
└─────────────────────────────────────────────────────────────┘
```

### 2. New Incident Form
```text
┌─────────────────────────────────────────────────────────────┐
│  ← Back                    Create New Incident               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Title *                                                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Invoice stuck in approval workflow                       ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  Description *                                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Invoice INV-12345 for $50K is stuck in AP approval.     ││
│  │ Manager John Smith needs to approve but system shows    ││
│  │ "approval hierarchy error". This is blocking month-end  ││
│  │ close for our Finance team.                             ││
│  │                                                          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ERP Module *                                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ [Accounts Payable (AP)        ▼]                        ││
│  └─────────────────────────────────────────────────────────┘│
│  Options: AP, AR, GL, Inventory, HR, Payroll, Other         │
│                                                               │
│  Environment *                                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ ○ Production    ● Test                                  ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  Business Unit                                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ North America Finance                                    ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│                                [Cancel]  [Submit Incident]   │
└─────────────────────────────────────────────────────────────┘
```

### 3. Incident Detail View
```text
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard              INC-001                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Invoice stuck in AP approval                                │
│  🔴 P1 - Critical  |  Status: Open  |  Created: 2 hrs ago   │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 📝 Basic Information                                     ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ Module:         Accounts Payable (AP)                   ││
│  │ Environment:    Production                              ││
│  │ Business Unit:  North America Finance                   ││
│  │ Submitted by:   sarah.johnson@company.com              ││
│  │ Created:        Feb 01, 2026 09:15 AM                  ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 📄 Description                                           ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ Invoice INV-12345 for $50K is stuck in AP approval.     ││
│  │ Manager John Smith needs to approve but system shows    ││
│  │ "approval hierarchy error". This is blocking month-end  ││
│  │ close for our Finance team.                             ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 🤖 AI-Generated Insights                                ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ Severity:  🔴 P1 - Critical                             ││
│  │ Reason:    Production environment + blocking business   ││
│  │            process (month-end close)                    ││
│  │                                                          ││
│  │ Category:  Configuration Issue                          ││
│  │ Confidence: 85%                                         ││
│  │                                                          ││
│  │ 💡 Suggested Actions:                                   ││
│  │ 1. Verify approval hierarchy setup for AP module        ││
│  │ 2. Check if approver limit exceeds invoice amount      ││
│  │ 3. Confirm John Smith has active approver role         ││
│  │                                                          ││
│  │ 📊 Similar Incidents: 3 found (all resolved)           ││
│  │    → Most common fix: Reset approval hierarchy          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 🔄 Status Update                                         ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ [Open ▼]  [Update Status]                              ││
│  │ Options: Open, In Progress, Resolved, Closed           ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## User Journeys

### Journey 1: Business User Submits Critical Incident
**Persona:** Sarah (Finance Manager)  
**Goal:** Get help with blocked invoice ASAP  
**Pain Point:** Doesn't know technical jargon, just knows business impact

#### Steps:
1. **Lands on Dashboard**
    - Sees "+ New Incident" button prominently
    - Clicks it immediately
2. **Fills Out Form**
    - Title: "Invoice stuck" (simple, non-technical)
    - Description: Explains in business terms
    - Selects: AP Module, Production, Finance business unit
    - Clicks Submit
3. **Sees Confirmation**
    - Gets incident number: INC-001
    - Sees AI assigned P1 severity
    - Feels reassured it's being treated as urgent
4. **Checks Status Later**
    - Returns to dashboard
    - Sees incident at top (sorted by severity)
    - Clicks to view details
    - Sees suggested actions (feels progress is being made)

> [!NOTE]
> **Success Metric:** Incident created in <2 minutes, correctly prioritized

---

### Journey 2: IT Support Analyst Triages Incoming Incidents
**Persona:** Mike (Level 2 Support Analyst)  
**Goal:** Quickly assess and route incidents to correct teams  
**Pain Point:** Too many incidents, not enough context

#### Steps:
1. **Lands on Dashboard**
    - Sees 40 total incidents
    - Filters to "P1" only (sees 3 critical)
    - Focuses on those first
2. **Opens Critical Incident**
    - Clicks INC-001
    - Reads AI-generated insights
    - Sees: Category = "Configuration Issue"
    - Sees: Suggested actions with specific steps
3. **Validates AI Assessment**
    - Reads original description
    - Agrees with P1 severity (month-end close mentioned)
    - Agrees with category (approval hierarchy error)
4. **Takes Action**
    - Updates status to "In Progress"
    - Routes to AP Functional team (knows which team based on category)
    - Includes AI suggestions in routing notes

> [!NOTE]
> **Success Metric:** Triage time reduced from 30 min → 5 min per incident

---

### Journey 3: ERP Admin Researches Patterns
**Persona:** Linda (Senior ERP Administrator)  
**Goal:** Identify recurring issues to fix root cause  
**Pain Point:** Same issues repeat, no visibility into patterns

#### Steps:
1. **Lands on Dashboard**
    - Uses search bar: "approval hierarchy"
    - Finds 8 incidents with similar keywords
2. **Reviews Pattern**
    - Notices all 8 are from AP module
    - All categorized as "Configuration Issue"
    - All from same business unit: "North America Finance"
3. **Identifies Root Cause**
    - Realizes approval setup needs fixing for NA Finance
    - Plans preventive fix for next maintenance window
4. **Creates Internal Knowledge Article**
    - Uses incident data to document solution
    - Next time, support can resolve faster

> [!NOTE]
> **Success Metric:** Proactive problem solving, reduced repeat incidents

---

### Journey 4: New Support Analyst Gets Trained
**Persona:** Jessica (New Hire, Week 1)  
**Goal:** Learn how to handle ERP incidents  
**Pain Point:** Overwhelmed by ERP complexity

#### Steps:
1. **Shadows Senior Analyst**
    - Watches Mike handle incidents
    - Sees AI suggestions providing guidance
2. **Handles First Incident Alone**
    - Opens incident about GL report access
    - Reads AI category: "Security/Access"
    - Sees suggested action: "Verify user roles in GL module"
3. **Follows AI Guidance**
    - Feels confident because steps are specific
    - Successfully routes to security team
    - Gets positive feedback
4. **Learns Faster**
    - Uses AI insights as training tool
    - Becomes productive in days vs. weeks

> [!NOTE]
> **Success Metric:** Reduced onboarding time, consistent quality

---

## Module-Wise Features

### Module 1: Incident Submission (User-Facing)
**Features:**
- Simple form with required fields only
- Dropdown for ERP modules (prevents typos)
- Environment toggle (Prod/Test)
- Rich text description box
- Auto-save draft (nice-to-have)
- Mobile-responsive design

*Why: Reduces barrier to entry, ensures data quality*

---

### Module 2: AI Enrichment Engine (Backend)
**Features:**
- **Severity Assignment**
    - Rule: Production + keywords ("critical", "down", "blocking") = P1
    - Rule: Test environment = max P3
    - Rule: Month-end/year-end mentions = upgrade priority
- **Category Classification**
    - Keyword matching:
        - "access", "login", "permission" → Security/Access
        - "integration", "API", "sync" → Integration Failure
        - "approval", "workflow", "hierarchy" → Configuration Issue
        - "data", "missing", "incorrect" → Data Issue
    - Confidence score (0-100%)
- **Auto-Generated Summary (Optional)**
    - Extract key entities: invoice numbers, user names, amounts
    - Generate 1-sentence summary
- **Suggested Next Steps (Optional)**
    - Based on category, provide 2-3 action items
    - Example: "Configuration Issue" → "Check setup in module X"

*Why: Core differentiator, saves triage time*

---

### Module 3: Incident Dashboard (User-Facing)
**Features:**
- **List View**
    - Sortable by: Severity, Date, Module
    - Color-coded severity badges (Red/Yellow/Green)
    - Pagination or infinite scroll
- **Filters**
    - By severity (P1/P2/P3)
    - By module (AP, AR, GL, etc.)
    - By status (Open, In Progress, Resolved)
    - By date range
- **Quick Stats**
    - Count by severity
    - Total open incidents
    - Average resolution time (nice-to-have)
- **Search**
    - Full-text search across title + description
    - Search by incident ID

*Why: Central hub for all users, quick access to info*

---

### Module 4: Incident Detail View (User-Facing)
**Features:**
- **Complete Information Display**
    - All original submission fields
    - AI-generated insights in separate card
    - Visual hierarchy (important info first)
- **Status Management**
    - Dropdown to update status
    - Timestamp tracking for each status change
- **AI Insights Display**
    - Severity with reasoning
    - Category with confidence score
    - Suggested actions (numbered list)
    - Similar incidents count
- **Action Buttons**
    - Edit incident (if needed)
    - Download/Export (PDF, JSON)
    - Copy incident ID

*Why: Single source of truth, enables informed decisions*