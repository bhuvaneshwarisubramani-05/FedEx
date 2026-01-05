export interface Case {
  id: string;
  caseNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  invoiceNumber: string;
  invoiceAmount: number;
  dueDate: string;
  ageingDays: number;
  ageingBucket: '0-30' | '31-60' | '61-90' | '90+';
  aiPriorityScore: number;
  recoveryProbability: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  recommendedAction: string;
  assignedDCA: string;
  assignedAgent?: string;
  status: 'New' | 'In Progress' | 'Payment Promised' | 'Disputed' | 'Closed' | 'Escalated';
  region: 'North' | 'South' | 'East' | 'West';
  timeline: TimelineEvent[];
  comments: Comment[];
  documents: Document[];
  slaDeadline: string;
  slaStatus: 'On Track' | 'At Risk' | 'Breached';
}

export interface TimelineEvent {
  id: string;
  date: string;
  action: string;
  user: string;
  details: string;
}

export interface Comment {
  id: string;
  date: string;
  user: string;
  text: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  uploadedDate: string;
}

export interface DCAPerformance {
  name: string;
  totalCases: number;
  closedCases: number;
  recoveredAmount: number;
  recoveryRate: number;
  avgResolutionDays: number;
  slaBreach: number;
}

export const mockCases: Case[] = [
  {
    id: '1',
    caseNumber: 'FDX-2026-001',
    customerName: 'Acme Corporation',
    customerEmail: 'finance@acmecorp.com',
    customerPhone: '+1-555-0101',
    invoiceNumber: 'INV-45678',
    invoiceAmount: 125000,
    dueDate: '2025-11-15',
    ageingDays: 51,
    ageingBucket: '31-60',
    aiPriorityScore: 87,
    recoveryProbability: 75,
    riskLevel: 'High',
    recommendedAction: 'Immediate legal notice - customer has payment history issues',
    assignedDCA: 'CollectPro Solutions',
    assignedAgent: 'Sarah Johnson',
    status: 'In Progress',
    region: 'North',
    slaDeadline: '2026-01-20',
    slaStatus: 'On Track',
    timeline: [
      { id: 't1', date: '2026-01-05', action: 'Case Assigned', user: 'Admin', details: 'Assigned to CollectPro Solutions' },
      { id: 't2', date: '2026-01-04', action: 'AI Analysis', user: 'System', details: 'Priority score calculated: 87' },
      { id: 't3', date: '2026-01-03', action: 'Case Created', user: 'System', details: 'Case imported from finance system' },
    ],
    comments: [
      { id: 'c1', date: '2026-01-05', user: 'Sarah Johnson', text: 'Called customer, left voicemail. Will follow up tomorrow.' },
    ],
    documents: [
      { id: 'd1', name: 'Invoice_45678.pdf', type: 'PDF', uploadedBy: 'System', uploadedDate: '2026-01-03' },
      { id: 'd2', name: 'Payment_Terms.pdf', type: 'PDF', uploadedBy: 'System', uploadedDate: '2026-01-03' },
    ],
  },
  {
    id: '2',
    caseNumber: 'FDX-2026-002',
    customerName: 'TechStart Industries',
    customerEmail: 'accounts@techstart.com',
    customerPhone: '+1-555-0102',
    invoiceNumber: 'INV-45679',
    invoiceAmount: 87500,
    dueDate: '2025-10-20',
    ageingDays: 77,
    ageingBucket: '61-90',
    aiPriorityScore: 92,
    recoveryProbability: 62,
    riskLevel: 'Critical',
    recommendedAction: 'Escalate to legal - Multiple failed payment promises',
    assignedDCA: 'DebtCare Associates',
    assignedAgent: 'Michael Chen',
    status: 'Escalated',
    region: 'West',
    slaDeadline: '2026-01-10',
    slaStatus: 'At Risk',
    timeline: [
      { id: 't1', date: '2026-01-05', action: 'Status Updated', user: 'Michael Chen', details: 'Escalated to legal team' },
      { id: 't2', date: '2026-01-02', action: 'Payment Promise Broken', user: 'Michael Chen', details: 'Customer failed to pay as promised' },
      { id: 't3', date: '2025-12-28', action: 'Payment Promised', user: 'Michael Chen', details: 'Customer promised payment by Jan 2' },
      { id: 't4', date: '2025-12-20', action: 'Case Assigned', user: 'Admin', details: 'Assigned to DebtCare Associates' },
    ],
    comments: [
      { id: 'c1', date: '2026-01-05', user: 'Michael Chen', text: 'Customer not responding. Recommending legal action.' },
      { id: 'c2', date: '2026-01-02', user: 'Michael Chen', text: 'Payment not received as promised. Attempted contact, no response.' },
    ],
    documents: [
      { id: 'd1', name: 'Invoice_45679.pdf', type: 'PDF', uploadedBy: 'System', uploadedDate: '2025-12-20' },
      { id: 'd2', name: 'Payment_Promise_Email.pdf', type: 'PDF', uploadedBy: 'Michael Chen', uploadedDate: '2025-12-28' },
    ],
  },
  {
    id: '3',
    caseNumber: 'FDX-2026-003',
    customerName: 'Global Logistics Ltd',
    customerEmail: 'billing@globallogistics.com',
    customerPhone: '+1-555-0103',
    invoiceNumber: 'INV-45680',
    invoiceAmount: 45000,
    dueDate: '2025-12-01',
    ageingDays: 35,
    ageingBucket: '31-60',
    aiPriorityScore: 68,
    recoveryProbability: 88,
    riskLevel: 'Medium',
    recommendedAction: 'Send payment reminder email - Customer has good payment history',
    assignedDCA: 'CollectPro Solutions',
    assignedAgent: 'Emily Rodriguez',
    status: 'Payment Promised',
    region: 'East',
    slaDeadline: '2026-01-25',
    slaStatus: 'On Track',
    timeline: [
      { id: 't1', date: '2026-01-04', action: 'Payment Promised', user: 'Emily Rodriguez', details: 'Customer committed to pay by Jan 15' },
      { id: 't2', date: '2026-01-03', action: 'Contact Made', user: 'Emily Rodriguez', details: 'Spoke with CFO, acknowledged debt' },
      { id: 't3', date: '2025-12-30', action: 'Case Assigned', user: 'Admin', details: 'Assigned to CollectPro Solutions' },
    ],
    comments: [
      { id: 'c1', date: '2026-01-04', user: 'Emily Rodriguez', text: 'CFO confirmed payment will be processed on Jan 15. Sending confirmation email.' },
    ],
    documents: [
      { id: 'd1', name: 'Invoice_45680.pdf', type: 'PDF', uploadedBy: 'System', uploadedDate: '2025-12-30' },
    ],
  },
  {
    id: '4',
    caseNumber: 'FDX-2026-004',
    customerName: 'MetroMart Retailers',
    customerEmail: 'payables@metromart.com',
    customerPhone: '+1-555-0104',
    invoiceNumber: 'INV-45681',
    invoiceAmount: 152000,
    dueDate: '2025-09-10',
    ageingDays: 117,
    ageingBucket: '90+',
    aiPriorityScore: 95,
    recoveryProbability: 45,
    riskLevel: 'Critical',
    recommendedAction: 'Legal action required - Account severely overdue',
    assignedDCA: 'RecoverNow Inc',
    assignedAgent: 'David Park',
    status: 'Disputed',
    region: 'South',
    slaDeadline: '2026-01-08',
    slaStatus: 'Breached',
    timeline: [
      { id: 't1', date: '2026-01-03', action: 'Dispute Raised', user: 'David Park', details: 'Customer disputes invoice accuracy' },
      { id: 't2', date: '2025-12-15', action: 'Case Assigned', user: 'Admin', details: 'Assigned to RecoverNow Inc' },
    ],
    comments: [
      { id: 'c1', date: '2026-01-03', user: 'David Park', text: 'Customer claims services not rendered as per contract. Escalating to FedEx for verification.' },
    ],
    documents: [
      { id: 'd1', name: 'Invoice_45681.pdf', type: 'PDF', uploadedBy: 'System', uploadedDate: '2025-12-15' },
      { id: 'd2', name: 'Dispute_Letter.pdf', type: 'PDF', uploadedBy: 'David Park', uploadedDate: '2026-01-03' },
    ],
  },
  {
    id: '5',
    caseNumber: 'FDX-2026-005',
    customerName: 'BuildRight Construction',
    customerEmail: 'admin@buildright.com',
    customerPhone: '+1-555-0105',
    invoiceNumber: 'INV-45682',
    invoiceAmount: 68000,
    dueDate: '2025-12-20',
    ageingDays: 16,
    ageingBucket: '0-30',
    aiPriorityScore: 55,
    recoveryProbability: 92,
    riskLevel: 'Low',
    recommendedAction: 'Send automated reminder - Recent overdue',
    assignedDCA: 'DebtCare Associates',
    assignedAgent: 'Jessica Lee',
    status: 'New',
    region: 'North',
    slaDeadline: '2026-02-05',
    slaStatus: 'On Track',
    timeline: [
      { id: 't1', date: '2026-01-02', action: 'Case Assigned', user: 'Admin', details: 'Assigned to DebtCare Associates' },
      { id: 't2', date: '2026-01-02', action: 'Case Created', user: 'System', details: 'Case imported from finance system' },
    ],
    comments: [],
    documents: [
      { id: 'd1', name: 'Invoice_45682.pdf', type: 'PDF', uploadedBy: 'System', uploadedDate: '2026-01-02' },
    ],
  },
  {
    id: '6',
    caseNumber: 'FDX-2026-006',
    customerName: 'HealthPlus Medical',
    customerEmail: 'finance@healthplus.com',
    customerPhone: '+1-555-0106',
    invoiceNumber: 'INV-45683',
    invoiceAmount: 93000,
    dueDate: '2025-11-30',
    ageingDays: 36,
    ageingBucket: '31-60',
    aiPriorityScore: 71,
    recoveryProbability: 81,
    riskLevel: 'Medium',
    recommendedAction: 'Phone call follow-up - Customer responsive to calls',
    assignedDCA: 'CollectPro Solutions',
    assignedAgent: 'Sarah Johnson',
    status: 'In Progress',
    region: 'West',
    slaDeadline: '2026-01-30',
    slaStatus: 'On Track',
    timeline: [
      { id: 't1', date: '2026-01-05', action: 'Contact Made', user: 'Sarah Johnson', details: 'Email sent to finance department' },
      { id: 't2', date: '2026-01-01', action: 'Case Assigned', user: 'Admin', details: 'Assigned to CollectPro Solutions' },
    ],
    comments: [
      { id: 'c1', date: '2026-01-05', user: 'Sarah Johnson', text: 'Sent payment reminder email. Awaiting response.' },
    ],
    documents: [
      { id: 'd1', name: 'Invoice_45683.pdf', type: 'PDF', uploadedBy: 'System', uploadedDate: '2026-01-01' },
    ],
  },
  {
    id: '7',
    caseNumber: 'FDX-2026-007',
    customerName: 'Premier Foods Inc',
    customerEmail: 'accounts@premierfoods.com',
    customerPhone: '+1-555-0107',
    invoiceNumber: 'INV-45684',
    invoiceAmount: 41500,
    dueDate: '2025-12-10',
    ageingDays: 26,
    ageingBucket: '0-30',
    aiPriorityScore: 48,
    recoveryProbability: 94,
    riskLevel: 'Low',
    recommendedAction: 'Automated reminder sufficient - Excellent payment history',
    assignedDCA: 'RecoverNow Inc',
    status: 'New',
    region: 'East',
    slaDeadline: '2026-02-10',
    slaStatus: 'On Track',
    timeline: [
      { id: 't1', date: '2026-01-05', action: 'Case Created', user: 'System', details: 'Case imported from finance system' },
    ],
    comments: [],
    documents: [
      { id: 'd1', name: 'Invoice_45684.pdf', type: 'PDF', uploadedBy: 'System', uploadedDate: '2026-01-05' },
    ],
  },
  {
    id: '8',
    caseNumber: 'FDX-2026-008',
    customerName: 'Diamond Electronics',
    customerEmail: 'payments@diamondelectronics.com',
    customerPhone: '+1-555-0108',
    invoiceNumber: 'INV-45685',
    invoiceAmount: 178000,
    dueDate: '2025-10-05',
    ageingDays: 92,
    ageingBucket: '90+',
    aiPriorityScore: 89,
    recoveryProbability: 58,
    riskLevel: 'Critical',
    recommendedAction: 'Urgent: Consider legal proceedings - High value, long overdue',
    assignedDCA: 'CollectPro Solutions',
    assignedAgent: 'Emily Rodriguez',
    status: 'In Progress',
    region: 'South',
    slaDeadline: '2026-01-12',
    slaStatus: 'At Risk',
    timeline: [
      { id: 't1', date: '2026-01-04', action: 'Follow-up Call', user: 'Emily Rodriguez', details: 'Discussed payment plan options' },
      { id: 't2', date: '2025-12-18', action: 'Case Assigned', user: 'Admin', details: 'Assigned to CollectPro Solutions' },
    ],
    comments: [
      { id: 'c1', date: '2026-01-04', user: 'Emily Rodriguez', text: 'Customer requested payment plan. Awaiting approval from FedEx.' },
    ],
    documents: [
      { id: 'd1', name: 'Invoice_45685.pdf', type: 'PDF', uploadedBy: 'System', uploadedDate: '2025-12-18' },
    ],
  },
];

export const dcaPerformance: DCAPerformance[] = [
  {
    name: 'CollectPro Solutions',
    totalCases: 145,
    closedCases: 98,
    recoveredAmount: 4250000,
    recoveryRate: 67.6,
    avgResolutionDays: 28,
    slaBreach: 5,
  },
  {
    name: 'DebtCare Associates',
    totalCases: 132,
    closedCases: 89,
    recoveredAmount: 3680000,
    recoveryRate: 67.4,
    avgResolutionDays: 31,
    slaBreach: 8,
  },
  {
    name: 'RecoverNow Inc',
    totalCases: 118,
    closedCases: 74,
    recoveredAmount: 2940000,
    recoveryRate: 62.7,
    avgResolutionDays: 35,
    slaBreach: 12,
  },
];

export const recoveryTrendData = [
  { month: 'Jul', recovered: 820000, target: 900000 },
  { month: 'Aug', recovered: 950000, target: 900000 },
  { month: 'Sep', recovered: 780000, target: 900000 },
  { month: 'Oct', recovered: 1120000, target: 900000 },
  { month: 'Nov', recovered: 980000, target: 900000 },
  { month: 'Dec', recovered: 1050000, target: 900000 },
];

export const ageingDistributionData = [
  { bucket: '0-30 Days', cases: 45, amount: 1850000 },
  { bucket: '31-60 Days', cases: 68, amount: 3420000 },
  { bucket: '61-90 Days', cases: 52, amount: 2680000 },
  { bucket: '90+ Days', cases: 35, amount: 2950000 },
];
