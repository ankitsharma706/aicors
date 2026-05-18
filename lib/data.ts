import {
  MetricItem,
  RevenueStream,
  TargetCustomerTier,
  OrgNode,
  EngineeringTeam,
  WorkflowStep,
  GitBranchRule,
  RaciActivity,
  KanbanTask,
  LLMOpsMetric,
  K8sService,
  SecurityIncident,
  EmployeeInfo,
  ClientAccount,
  SopDoc
} from './types';

export const FOUNDATION_METRICS: MetricItem[] = [
  { id: 'arr', name: 'Annual Run Rate (ARR)', value: '$1.44M', change: '+24%', trend: 'up', color: 'blue' },
  { id: 'mrr', name: 'Monthly Recurring Revenue', value: '$120K', change: '+20%', trend: 'up', color: 'indigo' },
  { id: 'nrr', name: 'Net Revenue Retention (NRR)', value: '112%', change: '+2%', trend: 'up', color: 'emerald' },
  { id: 'ltv_cac', name: 'LTV : CAC Ratio', value: '3.6 : 1', change: '+0.4', trend: 'up', color: 'violet' },
  { id: 'cac_payback', name: 'CAC Payback Period', value: '14.2 mo', change: '-1.5 mo', trend: 'up', color: 'teal' },
  { id: 'gross_margin', name: 'Gross Margin', value: '78.5%', change: '+1.2%', trend: 'up', color: 'sky' },
  { id: 'deploy_freq', name: 'Deployment Frequency', value: '3.4 / day', change: '+15%', trend: 'up', color: 'amber' },
  { id: 'uptime', name: 'Infrastructure Uptime', value: '99.94%', change: '+0.02%', trend: 'up', color: 'green' }
];

export const REVENUE_STREAMS: RevenueStream[] = [
  { name: 'SaaS Subscriptions', type: 'Recurring', margin: '70-85%', priority: 'Primary', currentValue: 72000, projectedValue: 95000 },
  { name: 'Enterprise Licenses', type: 'Recurring Annual', margin: '60-75%', priority: 'Primary', currentValue: 24000, projectedValue: 35000 },
  { name: 'AI Product Sales', type: 'Usage-based', margin: '50-65%', priority: 'High', currentValue: 12000, projectedValue: 20000 },
  { name: 'Agency / Custom Dev', type: 'Project-based', margin: '35-50%', priority: 'Supporting', currentValue: 8000, projectedValue: 5000 },
  { name: 'Consulting / Retainers', type: 'Recurring', margin: '60-80%', priority: 'High', currentValue: 4000, projectedValue: 5000 },
  { name: 'White-label Reselling', type: 'Licensing', margin: '40-60%', priority: 'Opportunistic', currentValue: 0, projectedValue: 2000 }
];

export const CUSTOMER_TIERS: TargetCustomerTier[] = [
  { tier: 'Tier 1', name: 'Core', description: 'SMBs (10–200 employees) needing SaaS tools, automation, or custom platforms. High volume, highly repeatable sales cycles.', value: 'SMB / Startups' },
  { tier: 'Tier 2', name: 'Growth', description: 'Mid-market companies (200–2000 employees) requiring enterprise integrations, AI features, dedicated customer success, and formal SLAs.', value: 'Mid-Market' },
  { tier: 'Tier 3', name: 'Enterprise', description: 'Large enterprises needing custom secure AI platforms, compliance certifications, tailored SLAs, and multi-region dedicated deployments.', value: 'Enterprise' }
];

export const COMPETITIVE_ADVANTAGES = [
  'AI-first product development (20-30% dev acceleration via custom LLMOps workflows)',
  'Speed of execution (weekly deployments and rapid scoping to custom feature delivery)',
  'Full-stack ownership model (minimizes handoff friction between design, API, and UI)',
  'Scalable cloud architecture (multi-region, automated scaling, robust caching models)',
  'Proprietary AI tooling (vector search, RAG pipelines, internal agent-based automation)',
  'Enterprise security posture (Zero-trust IAM, continuous SOC 2 readiness auditing)'
];

export const FOUNDER_RESPONSIBILITIES = [
  {
    founder: 'Founder 1 / CEO',
    focus: 'Vision, fundraising, enterprise sales, strategic partnerships, hiring key leaders, brand, board relations',
    style: 'Strategic, market-driven, outreach obsessed'
  },
  {
    founder: 'Founder 2 / CTO',
    focus: 'System architecture, engineering execution, product roadmap, AI strategy, dev operations, security, tech hiring',
    style: 'Technical, product-driven, architecture-obsessed'
  }
];

export const ORG_DATA: OrgNode = {
  name: 'Alex Rivera',
  role: 'CEO & Founder',
  department: 'Executive',
  level: 'ceo',
  bio: 'Focuses on vision, fundraising, enterprise deals, and corporate partnerships.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
  children: [
    {
      name: 'Sarah Chen',
      role: 'CTO & Co-Founder',
      department: 'Engineering',
      level: 'vp',
      bio: 'Directs technical architecture, engineering workflows, security, and AI strategy.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80',
      children: [
        {
          name: 'David Miller',
          role: 'VP of Engineering',
          department: 'Engineering',
          level: 'vp',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80',
          children: [
            {
              name: 'Marcus Vance',
              role: 'Engineering Manager (Full Stack)',
              department: 'Engineering',
              level: 'lead',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80'
            },
            {
              name: 'Elena Rostova',
              role: 'DevOps & Platform Lead',
              department: 'Platform',
              level: 'lead',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80'
            },
            {
              name: 'Jayden Park',
              role: 'AI Operations Lead',
              department: 'AI Ops',
              level: 'lead',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'
            }
          ]
        }
      ]
    },
    {
      name: 'Michael Vance',
      role: 'Head of Sales',
      department: 'Sales',
      level: 'vp',
      bio: 'Drives pipeline generation, outbound strategies, and ARR/MRR scaling.',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      name: 'Sophia Sterling',
      role: 'Head of Operations & HR',
      department: 'Operations',
      level: 'vp',
      bio: 'Manages payroll, Greenhouse pipeline, recruitment, and employee relations.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80'
    }
  ]
};

export const ENGINEERING_TEAMS: EngineeringTeam[] = [
  { name: 'Frontend Squad', purpose: 'UI, UX fidelity, and client-side performance', stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], size: 4, kpis: ['LCP < 2.5s', 'CLS < 0.1', 'Bundle Size < 250kb'], leadName: 'Marcus Vance' },
  { name: 'Backend Squad', purpose: 'Relational databases, high throughput APIs, and microservices logic', stack: ['NestJS', 'PostgreSQL', 'Redis', 'TypeScript', 'Docker'], size: 5, kpis: ['p99 Latency < 500ms', 'Database queries < 100ms', 'Service Uptime 99.9%'], leadName: 'Marcus Vance' },
  { name: 'AI/ML Operations', purpose: 'LLM integration, RAG pipeline scaling, agents, and observability', stack: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'Langfuse'], size: 3, kpis: ['Hallucination rate < 0.5%', 'Avg token cost / call', 'Observability tracing 100%'], leadName: 'Jayden Park' },
  { name: 'DevOps & Platform', purpose: 'Cloud architecture, Docker containers, EKS orchestration, and CI/CD pipelines', stack: ['AWS', 'Kubernetes', 'Terraform', 'GitHub Actions', 'ArgoCD'], size: 2, kpis: ['Deployment frequency', 'MTTR < 1 hour', 'Infra costs per tenant'], leadName: 'Elena Rostova' }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { step: 1, name: 'Idea & Discovery', description: 'Business alignment, identify product need, stakeholder interviews.', teams: ['Product', 'Sales', 'CS'], docs: ['Opportunity Brief'], tools: ['Notion', 'Mixpanel'] },
  { step: 2, name: 'Market Research', description: 'Analyze market patterns, competitor capabilities, pricing strategies.', teams: ['Product', 'Marketing'], docs: ['Competitive Analysis'], tools: ['G2', 'Mixpanel'] },
  { step: 3, name: 'Requirements (PRD)', description: 'Codify user persona, requirements, acceptance criteria, boundaries.', teams: ['Product', 'Engineering'], docs: ['Product Requirement Document'], tools: ['Notion', 'Jira'] },
  { step: 4, name: 'UI/UX Design', description: 'Design components, wireframes, animations, interactive prototypes.', teams: ['Design', 'Product'], docs: ['Figma Prototype', 'Dev-Ready Design'], tools: ['Figma'] },
  { step: 5, name: 'Architecture Design (ADR)', description: 'Outline database migrations, endpoint design, systems changes, scaling rules.', teams: ['Engineering', 'DevOps'], docs: ['Architecture Decision Record'], tools: ['draw.io', 'Notion'] },
  { step: 6, name: 'Backend Development', description: 'Database updates, models, controllers, queue configuration, service layers.', teams: ['Backend', 'AI'], docs: ['OpenAPI / Swagger Spec'], tools: ['VS Code', 'GitHub', 'Postman'] },
  { step: 7, name: 'Frontend Development', description: 'Component mapping, storybook implementation, layout assembly, responsive coding.', teams: ['Frontend'], docs: ['Component Library docs'], tools: ['Next.js', 'Tailwind', 'Storybook'] },
  { step: 8, name: 'API Integration & Testing', description: 'Wire client to REST/WebSocket API endpoints. Address latency, caching, and state.', teams: ['Full Stack', 'QA'], docs: ['Integration test report'], tools: ['Playwright', 'React Query'] },
  { step: 9, name: 'QA & Regression', description: 'Exploratory testing, regression test suite runs, automated test validation.', teams: ['QA', 'Engineering'], docs: ['Test Plan', 'Bug Reports'], tools: ['Cypress', 'Playwright', 'TestRail'] },
  { step: 10, name: 'Security Review', description: 'Dependency auditing, SAST scanning, access checks, secrets verification.', teams: ['Security', 'Engineering'], docs: ['Security Checklist'], tools: ['Snyk', 'SonarQube'] },
  { step: 11, name: 'DevOps / CI-CD', description: 'Assemble Docker images, Helm charts, configure environment variables.', teams: ['DevOps'], docs: ['Deployment Runbook'], tools: ['GitHub Actions', 'Docker'] },
  { step: 12, name: 'Deployment', description: 'GitOps deploy through ArgoCD, rolling pod updates, smoke tests.', teams: ['DevOps', 'Engineering'], docs: ['Release Notes'], tools: ['ArgoCD', 'EKS', 'AWS'] },
  { step: 13, name: 'Monitoring', description: 'Establish dashboards, error thresholds, Sentry integrations, performance rules.', teams: ['DevOps', 'Engineering'], docs: ['SLO / SLA Documentation'], tools: ['Grafana', 'Sentry', 'Prometheus'] },
  { step: 14, name: 'Scaling', description: 'Replicas configuration, horizontal scaling parameters, edge CDN routing.', teams: ['Platform', 'DevOps'], docs: ['Capacity Scaling Plan'], tools: ['Kubernetes HPA'] },
  { step: 15, name: 'Maintenance', description: 'Incident response, security updates, bug hotfixes, post-mortems.', teams: ['All Teams'], docs: ['Changelog', 'Incident Post-Mortem'], tools: ['PagerDuty', 'Jira'] }
];

export const GIT_BRANCHING_RULES: GitBranchRule[] = [
  { name: 'main', pattern: 'main', rules: ['Production release only', 'Protected branch', 'Requires 2 review approvals', 'Requires automated CI verification'] },
  { name: 'develop', pattern: 'develop', rules: ['Staging release environment', 'Continuous integration target', 'Squash merges only', 'Daily builds'] },
  { name: 'feature', pattern: 'feature/[story-id]-[short-name]', rules: ['Branch off develop', 'Max lifetime: 3-5 days', 'Requires rebase before PR', 'Scoped to a single ticket'] },
  { name: 'hotfix', pattern: 'hotfix/[incident-id]-[short-name]', rules: ['Branch off main', 'Direct emergency patch', 'Merges to both main and develop', 'Deploys immediately'] }
];

export const RACI_ACTIVITIES: RaciActivity[] = [
  { activity: 'Write PRD', pm: 'A', em: 'C', engineer: 'C', design: 'C', qa: 'I', devops: 'I', security: '', cto: 'I' },
  { activity: 'UI/UX Design', pm: 'C', em: 'I', engineer: 'C', design: 'A', qa: 'I', devops: '', security: '', cto: '' },
  { activity: 'Technical Design (ADR)', pm: 'I', em: 'A', engineer: 'R', design: 'I', qa: 'I', devops: 'C', security: 'C', cto: 'A' },
  { activity: 'Implementation', pm: 'I', em: 'A', engineer: 'R', design: 'I', qa: 'I', devops: 'I', security: '', cto: '' },
  { activity: 'Code Review', pm: 'I', em: 'A', engineer: 'R', design: '', qa: '', devops: '', security: 'C', cto: '' },
  { activity: 'QA Testing', pm: 'C', em: 'I', engineer: 'R', design: 'I', qa: 'A', devops: 'I', security: '', cto: '' },
  { activity: 'Release Decision', pm: 'A', em: 'C', engineer: 'I', design: 'I', qa: 'R', devops: 'C', security: 'I', cto: 'C' },
  { activity: 'Execute Production Deploy', pm: 'I', em: 'I', engineer: 'I', design: '', qa: 'I', devops: 'A', security: 'I', cto: 'I' },
  { activity: 'Incident containment', pm: 'I', em: 'C', engineer: 'C', design: '', qa: 'C', devops: 'R', security: 'A', cto: 'C' },
  { activity: 'GDPR / Regulatory filing', pm: 'C', em: '', engineer: '', design: '', qa: '', devops: '', security: 'R', cto: 'C' }
];

export const JIRA_AUTOMATIONS = [
  { trigger: 'PR opened with Jira ID', action: 'Auto-link PR, move ticket to "In Review"', benefit: 'No manual status updates for developers' },
  { trigger: 'PR merged to develop', action: 'Move ticket to "QA Ready", alert #qa-sprint channel', benefit: 'QA tests immediately, zero handoff gap' },
  { trigger: 'Ticket in "In Progress" > 3d', action: 'Slack ping assignee and manager', benefit: 'Highlights silent blockers' },
  { trigger: 'P0 Critical bug created', action: 'Create incident Slack room, page on-call via PagerDuty', benefit: 'Immediate incident triage triggers' }
];

export const DORA_METRICS = [
  { name: 'Deployment Frequency', value: '3.4 / day', target: 'Multiple daily deploys', status: 'Elite' },
  { name: 'Lead Time for Changes', value: '45 mins', target: 'Under 1 hour (Commit to Prod)', status: 'Elite' },
  { name: 'Change Failure Rate', value: '3.1%', target: 'Under 5%', status: 'Elite' },
  { name: 'Mean Time to Restore (MTTR)', value: '24 mins', target: 'Under 1 hour', status: 'Elite' }
];

export const LLM_OPS_METRICS: LLMOpsMetric[] = [
  { feature: 'AI Copilot (RAG)', cost: 0.042, latency: '1.2s', faithfulness: 0.98, relevancy: 0.96, usage: 14500 },
  { feature: 'Auto Ticket Writer', cost: 0.008, latency: '0.8s', faithfulness: 0.99, relevancy: 0.97, usage: 8900 },
  { feature: 'Standup Summarizer', cost: 0.015, latency: '2.1s', faithfulness: 0.95, relevancy: 0.92, usage: 3400 },
  { feature: 'SEO Content Generator', cost: 0.075, latency: '4.5s', faithfulness: 0.92, relevancy: 0.90, usage: 1200 }
];

export const K8S_SERVICES: K8sService[] = [
  {
    name: 'api-gateway',
    status: 'healthy',
    type: 'Kong API Gateway',
    pods: [
      { id: 'pod-gw-1', name: 'api-gateway-7cfd859-9wws5', status: 'healthy', cpu: '14%', memory: '128MB', restarts: 0 },
      { id: 'pod-gw-2', name: 'api-gateway-7cfd859-a2jk8', status: 'healthy', cpu: '11%', memory: '132MB', restarts: 0 }
    ]
  },
  {
    name: 'auth-service',
    status: 'healthy',
    type: 'Node.js Microservice',
    pods: [
      { id: 'pod-ath-1', name: 'auth-service-54aa68d-l2pq9', status: 'healthy', cpu: '8%', memory: '245MB', restarts: 1 }
    ]
  },
  {
    name: 'ai-orchestrator',
    status: 'healthy',
    type: 'FastAPI Python Service',
    pods: [
      { id: 'pod-ai-1', name: 'ai-orchestrator-91ff8cc-3jks7', status: 'healthy', cpu: '42%', memory: '890MB', restarts: 0 },
      { id: 'pod-ai-2', name: 'ai-orchestrator-91ff8cc-f5h2b', status: 'healthy', cpu: '38%', memory: '912MB', restarts: 0 }
    ]
  },
  {
    name: 'queue-processor',
    status: 'warning',
    type: 'Go Background Worker',
    pods: [
      { id: 'pod-qp-1', name: 'queue-processor-f4219cc-8hhj1', status: 'warning', cpu: '94%', memory: '54MB', restarts: 4 }
    ]
  }
];

export const SECURITY_INCIDENTS: SecurityIncident[] = [
  { id: 'SEC-2026-004', title: 'Brute force vectors blocked on OAuth endpoints', severity: 'medium', status: 'resolved', detectedTime: '2026-05-17 22:15', incidentCommander: 'Elena Rostova', summary: 'Rate limits via Redis triggered on IP block. Attacking IPs blacklisted at WAF layer.' },
  { id: 'SEC-2026-003', title: 'SOC 2 continuous compliance audit alert: missing IAM MFA key', severity: 'low', status: 'resolved', detectedTime: '2026-05-15 08:30', incidentCommander: 'Sarah Chen', summary: 'New contractor did not enable MFA within 24h grace window. Okta access locked automatically, resolved via MFA pairing.' }
];

export const EMPLOYEES: EmployeeInfo[] = [
  { name: 'Alex Rivera', role: 'CEO & Founder', level: 'Staff', salary: '$180K', department: 'Executive', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80', status: 'active', performance: 'exceeds' },
  { name: 'Sarah Chen', role: 'CTO & Co-Founder', level: 'Staff', salary: '$175K', department: 'Engineering', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80', status: 'active', performance: 'exceeds' },
  { name: 'Marcus Vance', role: 'Full Stack Tech Lead', level: 'Staff', salary: '$165K', department: 'Engineering', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80', status: 'active', performance: 'exceeds' },
  { name: 'Elena Rostova', role: 'DevOps & Platform Lead', level: 'Senior', salary: '$145K', department: 'Engineering', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80', status: 'active', performance: 'meets' },
  { name: 'Jayden Park', role: 'AI Ops Architect', level: 'Senior', salary: '$155K', department: 'Engineering', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80', status: 'active', performance: 'exceeds' },
  { name: 'Emma Watson', role: 'Junior Frontend Engineer', level: 'Junior', salary: '$85K', department: 'Engineering', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80', status: 'active', performance: 'meets' },
  { name: 'Ryan Reynolds', role: 'Product Designer', level: 'Senior', salary: '$130K', department: 'Design', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80', status: 'active', performance: 'meets' }
];

export const CLIENT_ACCOUNTS: ClientAccount[] = [
  { name: 'Acme Global', stage: 'enterprise-sla', acv: 240000, mrr: 20000, healthScore: 98, contact: 'J. Peterson', slackChannel: '#client-acme-global' },
  { name: 'Vanguard Systems', stage: 'post-delivery', acv: 120000, mrr: 10000, healthScore: 92, contact: 'S. Patel', slackChannel: '#client-vanguard' },
  { name: 'Stellar Tech', stage: 'delivery', acv: 96000, mrr: 8000, healthScore: 84, contact: 'A. Sterling', slackChannel: '#client-stellar' },
  { name: 'Omni Retail', stage: 'pre-sale', acv: 48000, mrr: 4000, healthScore: 78, contact: 'R. Garcia', slackChannel: '#client-omni-retail' }
];

export const SOP_DOCS: SopDoc[] = [
  {
    id: 'SOP-ENG-001',
    title: 'Backward-Compatible Database Migrations',
    owner: 'Marcus Vance',
    date: '2026-04-10',
    purpose: 'Ensure database structure updates occur with zero downtime and permit safe rollback operations.',
    scope: 'All database alterations involving PostgreSQL collections.',
    steps: [
      'Expand: Add the new column or table without deleting or renaming the old elements. Keep writing to both if needed.',
      'Transition: Write new code that reads from the new layout but writes to both (double-write). Migrate existing records in batches.',
      'Contract: Update code to rely exclusively on the new structure. Ensure no queries point to the old setup.',
      'Cleanup: Verify safety, remove double-writes, and drop the old fields in a separate release.'
    ],
    tags: ['Engineering', 'Database', 'PostgreSQL']
  },
  {
    id: 'SOP-OPS-003',
    title: 'Incident Escalation and Rollback',
    owner: 'Elena Rostova',
    date: '2026-05-02',
    purpose: 'Standardize emergency steps when critical features fail or error budgets are breached.',
    scope: 'Any operational regression labeled P0 or P1.',
    steps: [
      'Automatic Rollback: Trigger immediate git reversion in ArgoCD if error rates surpass 5% or p99 > 3s for 5 mins.',
      'Declare Incident: Open dedicated Slack incident channel, flag stakeholders, assign Incident Commander.',
      'Containment: Isolate the faulty microservice, route traffic to cache or static fallbacks.',
      'Post-Mortem: Assemble team within 48h to document timeline, impact, and build 30-day preventative roadmap.'
    ],
    tags: ['DevOps', 'Incidents', 'Operations']
  }
];

export const SPRINT_TASKS: KanbanTask[] = [
  { id: 'TSK-101', title: 'Implement backward-compatible migrations for billing table', description: 'Add billing_plan_v2 columns without dropping original references. Include fallback logic in models.', storyPoints: 5, priority: 'P1', assignee: { name: 'Marcus Vance', role: 'Full Stack Tech Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&h=50&q=80' }, epic: 'Billing Refactor', category: 'task', status: 'in_progress', tags: ['Backend', 'PostgreSQL'] },
  { id: 'TSK-102', title: 'Build interactive D3.js Org Chart visualizer', description: 'Interactive nodes with glowing neon effects, detail hovercards, stage filters (Startup/Growth/Enterprise).', storyPoints: 8, priority: 'P1', assignee: { name: 'Emma Watson', role: 'Junior Frontend Engineer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50&h=50&q=80' }, epic: 'Dashboard V2', category: 'story', status: 'in_review', tags: ['Frontend', 'D3.js'] },
  { id: 'TSK-103', title: 'Verify Langfuse RAG prompt evaluation models', description: 'Validate prompt templates inside CI checks. Measure Groundedness and Hallucination metrics against test datasets.', storyPoints: 3, priority: 'P0', assignee: { name: 'Jayden Park', role: 'AI Ops Architect', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=50&h=50&q=80' }, epic: 'AI Trust Engine', category: 'spike', status: 'qa_ready', tags: ['AI Ops', 'Langfuse'] },
  { id: 'TSK-104', title: 'Optimize EKS Auto-Scaling groups for prompt surges', description: 'Set HPA thresholds based on custom Prometheus metrics representing GPU queue latency.', storyPoints: 5, priority: 'P2', assignee: { name: 'Elena Rostova', role: 'DevOps & Platform Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&h=50&q=80' }, epic: 'Scale Ops', category: 'task', status: 'todo', tags: ['DevOps', 'AWS', 'Kubernetes'] },
  { id: 'TSK-105', title: 'Fix mobile Safari profile picture upload regression', description: 'Profile picture upload fails due to canvas aspect ratio conversions in Safari browser engine.', storyPoints: 2, priority: 'P0', assignee: { name: 'Emma Watson', role: 'Junior Frontend Engineer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50&h=50&q=80' }, epic: 'User Profile V2', category: 'bug', status: 'in_progress', tags: ['Frontend', 'Safari-Fix'] }
];
