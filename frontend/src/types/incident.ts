export type Severity = 'P1' | 'P2' | 'P3';
export type Status = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type ERPModule = 'AP' | 'AR' | 'GL' | 'Inventory' | 'HR' | 'Payroll';
export type Environment = 'Production' | 'Test';

export interface Incident {
  incidentId: string;
  title: string;
  description: string;
  module: ERPModule;
  environment: Environment;
  businessUnit?: string;
  submittedBy: string;
  createdAt: string;
  status: Status;
  aiSeverity: Severity;
  aiSeverityReason: string;
  aiCategory: string;
  aiConfidence: number;
  aiSuggestions: string[];
}

export interface CreateIncidentRequest {
  title: string;
  description: string;
  module: ERPModule;
  environment: Environment;
  businessUnit?: string;
}

export interface IncidentStats {
  p1Count: number;
  p2Count: number;
  p3Count: number;
  totalOpen: number;
}
