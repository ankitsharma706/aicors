export interface MetricItem {
  id: string;
  name: string;
  value: string | number;
  change?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

export interface RevenueStream {
  name: string;
  type: string;
  margin: string;
  priority: string;
  currentValue: number;
  projectedValue: number;
}

export interface TargetCustomerTier {
  tier: string;
  name: string;
  description: string;
  value: string;
}

export interface OrgNode {
  name: string;
  role: string;
  department: string;
  level: 'ceo' | 'vp' | 'lead' | 'ic';
  children?: OrgNode[];
  avatar?: string;
  bio?: string;
}

export interface EngineeringTeam {
  name: string;
  purpose: string;
  stack: string[];
  size: number;
  kpis: string[];
  leadName: string;
}

export interface WorkflowStep {
  step: number;
  name: string;
  description: string;
  teams: string[];
  docs: string[];
  tools: string[];
}

export interface GitBranchRule {
  name: string;
  pattern: string;
  rules: string[];
}

export interface RaciRole {
  role: string;
  name: string;
  avatar: string;
}

export interface RaciActivity {
  activity: string;
  pm: 'R' | 'A' | 'C' | 'I' | '';
  em: 'R' | 'A' | 'C' | 'I' | '';
  engineer: 'R' | 'A' | 'C' | 'I' | '';
  design: 'R' | 'A' | 'C' | 'I' | '';
  qa: 'R' | 'A' | 'C' | 'I' | '';
  devops: 'R' | 'A' | 'C' | 'I' | '';
  security: 'R' | 'A' | 'C' | 'I' | '';
  cto: 'R' | 'A' | 'C' | 'I' | '';
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  storyPoints: number;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  assignee: {
    name: string;
    role: string;
    avatar: string;
  };
  epic: string;
  category: 'story' | 'task' | 'bug' | 'spike' | 'chore';
  status: 'todo' | 'in_progress' | 'in_review' | 'qa_ready' | 'done';
  tags: string[];
  blocker?: string;
}

export interface LLMOpsMetric {
  feature: string;
  cost: number;
  latency: string;
  faithfulness: number;
  relevancy: number;
  usage: number;
}

export interface K8sPod {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'error';
  cpu: string;
  memory: string;
  restarts: number;
}

export interface K8sService {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  type: string;
  pods: K8sPod[];
}

export interface SecurityIncident {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'contained' | 'resolved';
  detectedTime: string;
  incidentCommander: string;
  summary: string;
}

export interface EmployeeInfo {
  name: string;
  role: string;
  level: string;
  salary: string;
  department: string;
  avatar: string;
  status: 'active' | 'onboarding' | 'pip' | 'offboarded';
  performance: 'exceeds' | 'meets' | 'developing';
}

export interface ClientAccount {
  name: string;
  stage: 'pre-sale' | 'delivery' | 'post-delivery' | 'enterprise-sla';
  acv: number;
  mrr: number;
  healthScore: number;
  contact: string;
  slackChannel: string;
}

export interface SopDoc {
  id: string;
  title: string;
  owner: string;
  date: string;
  purpose: string;
  scope: string;
  steps: string[];
  tags: string[];
}
