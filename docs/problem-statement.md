# AI-Powered ERP Incident Triage System

## The Core Problem
When companies use Oracle ERP systems, things go wrong - invoices get stuck, integrations fail, users lose access. Right now, someone has to manually read these incident reports and figure out:

* How urgent is this?
* What type of problem is it?
* What should we do next?

---

## What I'll be building

### 1. Frontend (Web Interface)
A simple web page where users can:
* Submit new incidents (fill out a form with title, description, which ERP module, etc.)
* See a list of all incidents
* Click on an incident to see details
* Optionally filter by severity or module

### 2. Backend (API)
A server that:
* Receives incident submissions
* Automatically analyzes them to assign: **Severity** (P1/P2/P3 - how urgent?), **Category** (is this a data issue? integration failure? access problem?)
* Optionally: a summary or suggested next step
* Stores incidents in a database
* Serves data back to the frontend

### 3. AWS Integration
Use at least one free-tier AWS service, such as:
* **DynamoDB** - to store incidents
* **Lambda** - to run your backend code
* **S3** - to store logs or files
* **API Gateway** - to expose your API

---

## Example Workflow
1.  **User submits:** "Invoice #12345 stuck in AP module, blocking month-end close, production environment"
2.  **Backend receives it and analyzes:**
    * **Severity:** P1 (production + blocking business process)
    * **Category:** Data Issue
    * **Suggested action:** "Check AP approval workflow and invoice validation rules"
3.  **Storage:** Stores in DynamoDB with timestamp
4.  **Frontend:** Displays it in the incident list with a red P1 badge

---

## Real-World ERP Incidents (What Goes Wrong)

### Example Scenario 1: Invoice Stuck in AP
* **What happened:** Finance team tries to pay a $2M vendor invoice; Invoice is "stuck" in approval workflow; Payment deadline is today, late fees = $50K.
* **Root cause might be:** Manager on vacation, configuration limits, missing vendor data, or integration failure.
* **Business impact:** Vendor relationship damaged, late fees, potential supply disruption.

### Example Scenario 2: Month-End Close Blocked
* **What happened:** Last day of the fiscal quarter; Finance can't close the books because GL is showing errors; CFO needs to report earnings in 24 hours.
* **Root cause might be:** Currency conversion rates, strict validation rules, or unbalanced inter-company transactions.
* **Business impact:** SEC compliance risk, earnings report delayed, stock price impact.

### Example Scenario 3: Integration Failure
* **What happened:** Warehouse uses Oracle ERP to manage inventory; Sales orders from Salesforce aren't flowing into ERP; Customers' orders aren't being fulfilled.
* **Root cause might be:** Expired API authentication, data format changes, or network connectivity issues.
* **Business impact:** Lost sales, angry customers, operational chaos.

---

## How It's Handled Today (The Current State)

### Traditional Incident Management Process
1.  **Incident Creation:** Business users notice problems and create often vague tickets (e.g., "System is broken") in tools like ServiceNow or Jira.
2.  **Manual Triage (The Pain Point):** ERP specialists must spend 30 minutes to several hours per incident reading poorly written reports, asking clarifying questions, determining severity (P1-P3), and routing to the correct functional or technical team.
3.  **Investigation & Resolution:** Teams investigate, sometimes escalating to Oracle Support, leading to a total resolution time of 2-7 days for non-critical issues.

### The Problems with Current Approach
* **Too Slow:** Manual triage creates bottlenecks and routing errors.
* **Inconsistent Quality:** Severity and categorization depend on the individual analyst's experience.
* **Knowledge Silos:** Only senior staff know how to triage properly; no learning from past incidents.
* **Poor Data Quality:** Lack of critical context in initial submissions.
* **Reactive, Not Proactive:** No pattern detection for repeating issues.

---

## Existing Solutions & Competitors
The current market is divided between broad ITSM platforms and technical monitoring tools, but lacks a dedicated solution for ERP-specific business process triage:

* **ITSM Platforms:** Leaders like **ServiceNow**, **Jira**, and **BMC Remedy** offer generic automation but require extensive manual effort to understand ERP contexts.
* **AI Assistants:** Tools like **Moveworks** and **Espressive** handle general IT queries but lack the deep domain knowledge required for complex ERP workflows.
* **Infrastructure Monitoring:** **Oracle Enterprise Manager**, **Splunk**, and **Dynatrace** monitor technical health but do not address user-reported functional errors.
* **Niche & Custom Tools:** **Aavenir** provides narrow automation for AP/AR, while many firms use brittle, custom-built Python scripts that are difficult to maintain.

---

## The Market Gap (Why This Assignment Matters)
* **ERP Domain Intelligence:** Generic tools don't understand "AP aging report" or "inter-company eliminations."
* **Automated Enrichment:** Lack of auto-categorization for specific ERP configuration issues.
* **Knowledge Base Integration:** Past incidents aren't leveraged to provide auto-suggestions for recurring problems.
* **Business Impact Understanding:** Tools often fail to distinguish between critical "month-end" blocks and low-priority test environment issues.

---

## The Opportunity
* **Target Customers:** Large enterprises with Oracle ERP, Shared Services Centers, and companies with high ERP support spend.
* **Value Proposition:** Reduce triage time from 2 hours to 5 minutes (95% reduction), improve routing accuracy to 90%, and enable junior analysts to perform like experts.
* **ROI Example:** A company with 1,000 incidents/month could save $300K/year in analyst salaries and over $1M in avoided business losses through faster resolution.

---

## Key Takeaways
* ERP incidents are high-stakes (Financial close, payroll, etc.).
* Domain knowledge is critical; generic tools miss nuances.
* Speed and pattern recognition are essential for reducing business costs.
* There is currently no dominant player in AI-powered ERP incident triage.