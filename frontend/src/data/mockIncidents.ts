import { Incident } from '@/types/incident';

export const mockIncidents: Incident[] = [
  {
    incidentId: 'INC-001',
    title: 'Invoice stuck in approval workflow',
    description: 'Invoice INV-12345 for $50,000 is stuck in the approval workflow. The invoice has been pending for 3 days and the vendor is requesting payment. The approval hierarchy shows the invoice requires CFO approval but the CFO account appears to be locked.',
    module: 'AP',
    environment: 'Production',
    businessUnit: 'North America Finance',
    submittedBy: 'john.smith@company.com',
    createdAt: '2026-02-01T09:15:00Z',
    status: 'Open',
    aiSeverity: 'P1',
    aiSeverityReason: 'Production environment + blocking business process + financial impact over $10K',
    aiCategory: 'Configuration Issue',
    aiConfidence: 0.92,
    aiSuggestions: [
      'Check approval hierarchy setup in AP module',
      'Verify CFO account status and unlock if necessary',
      'Review approval threshold limits configuration',
      'Consider emergency approval bypass if time-critical'
    ]
  },
  {
    incidentId: 'INC-002',
    title: 'Payroll calculation discrepancy',
    description: 'Several employees in the APAC region are reporting incorrect overtime calculations in their January payroll. The issue affects approximately 50 employees.',
    module: 'Payroll',
    environment: 'Production',
    businessUnit: 'APAC Operations',
    submittedBy: 'sarah.chen@company.com',
    createdAt: '2026-02-01T14:30:00Z',
    status: 'In Progress',
    aiSeverity: 'P1',
    aiSeverityReason: 'Production environment + affects employee compensation + regulatory compliance risk',
    aiCategory: 'Calculation Error',
    aiConfidence: 0.88,
    aiSuggestions: [
      'Review overtime rate configuration for APAC region',
      'Check recent configuration changes to payroll rules',
      'Verify holiday calendar setup for affected countries',
      'Run comparison report against previous payroll period'
    ]
  },
  {
    incidentId: 'INC-003',
    title: 'Inventory sync failure with warehouse system',
    description: 'The nightly inventory synchronization between the ERP and warehouse management system failed. Stock levels are not reflecting actual warehouse counts.',
    module: 'Inventory',
    environment: 'Production',
    businessUnit: 'Supply Chain',
    submittedBy: 'mike.johnson@company.com',
    createdAt: '2026-02-01T06:00:00Z',
    status: 'Open',
    aiSeverity: 'P2',
    aiSeverityReason: 'Production environment + data integrity issue + no immediate financial blocking',
    aiCategory: 'Integration Failure',
    aiConfidence: 0.85,
    aiSuggestions: [
      'Check integration logs for error details',
      'Verify WMS API connectivity and credentials',
      'Review data mapping configuration',
      'Initiate manual sync as temporary workaround'
    ]
  },
  {
    incidentId: 'INC-004',
    title: 'GL posting errors in test environment',
    description: 'Test environment is showing errors when posting journal entries to the general ledger. Error message indicates dimension validation failure.',
    module: 'GL',
    environment: 'Test',
    businessUnit: 'Corporate Finance',
    submittedBy: 'lisa.wong@company.com',
    createdAt: '2026-01-31T16:45:00Z',
    status: 'Resolved',
    aiSeverity: 'P3',
    aiSeverityReason: 'Test environment + no production impact + standard configuration testing',
    aiCategory: 'Configuration Issue',
    aiConfidence: 0.95,
    aiSuggestions: [
      'Verify dimension setup matches production',
      'Check required dimension rules on GL accounts',
      'Review recent test data imports',
      'Compare chart of accounts structure'
    ]
  },
  {
    incidentId: 'INC-005',
    title: 'AR aging report not generating',
    description: 'The weekly AR aging report scheduled job is failing. Finance team needs this report for credit review meetings.',
    module: 'AR',
    environment: 'Production',
    businessUnit: 'Credit & Collections',
    submittedBy: 'david.park@company.com',
    createdAt: '2026-02-01T08:00:00Z',
    status: 'Open',
    aiSeverity: 'P2',
    aiSeverityReason: 'Production environment + reporting delay + workaround available via manual export',
    aiCategory: 'Batch Job Failure',
    aiConfidence: 0.90,
    aiSuggestions: [
      'Check batch job execution logs',
      'Verify report server connectivity',
      'Review recent changes to AR aging parameters',
      'Generate report manually as interim solution'
    ]
  },
  {
    incidentId: 'INC-006',
    title: 'New hire onboarding workflow incomplete',
    description: 'HR onboarding workflow for new employees is not triggering position assignment step. Affecting 5 new hires this week.',
    module: 'HR',
    environment: 'Production',
    businessUnit: 'Human Resources',
    submittedBy: 'jennifer.lee@company.com',
    createdAt: '2026-01-30T11:20:00Z',
    status: 'Closed',
    aiSeverity: 'P2',
    aiSeverityReason: 'Production environment + HR process delay + limited employee impact',
    aiCategory: 'Workflow Configuration',
    aiConfidence: 0.87,
    aiSuggestions: [
      'Review workflow step conditions',
      'Check position management integration',
      'Verify workflow template version',
      'Process affected employees manually'
    ]
  },
  {
    incidentId: 'INC-007',
    title: 'Vendor payment batch rejected by bank',
    description: 'Weekly payment batch of 150 vendor payments totaling $2.3M was rejected by the bank. Error indicates invalid account format.',
    module: 'AP',
    environment: 'Production',
    businessUnit: 'Treasury',
    submittedBy: 'robert.chen@company.com',
    createdAt: '2026-02-01T15:00:00Z',
    status: 'Open',
    aiSeverity: 'P1',
    aiSeverityReason: 'Production environment + high financial value + vendor relationship impact',
    aiCategory: 'Payment Processing',
    aiConfidence: 0.94,
    aiSuggestions: [
      'Review bank file format specifications',
      'Check vendor bank account data quality',
      'Verify recent changes to payment format',
      'Contact bank for specific rejection details'
    ]
  },
  {
    incidentId: 'INC-008',
    title: 'Inventory valuation report discrepancy',
    description: 'Monthly inventory valuation report shows $50K variance compared to GL balance. Need reconciliation before month-end close.',
    module: 'Inventory',
    environment: 'Production',
    businessUnit: 'Accounting',
    submittedBy: 'anna.martinez@company.com',
    createdAt: '2026-01-31T09:30:00Z',
    status: 'In Progress',
    aiSeverity: 'P2',
    aiSeverityReason: 'Production environment + financial reporting impact + month-end deadline',
    aiCategory: 'Data Reconciliation',
    aiConfidence: 0.82,
    aiSuggestions: [
      'Run inventory to GL reconciliation report',
      'Check for pending inventory transactions',
      'Review cost adjustment entries',
      'Verify valuation method consistency'
    ]
  }
];
