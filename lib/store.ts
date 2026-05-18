import { create } from 'zustand';
import { KanbanTask } from './types';
import { SPRINT_TASKS } from './data';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface CoosState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  orgStage: 1 | 2 | 3;
  setOrgStage: (stage: 1 | 2 | 3) => void;
  tasks: KanbanTask[];
  updateTaskStatus: (taskId: string, newStatus: KanbanTask['status']) => void;
  addTask: (task: KanbanTask) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (message: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useStore = create<CoosState>((set, get) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  orgStage: 2,
  setOrgStage: (stage) => set({ orgStage: stage }),
  tasks: SPRINT_TASKS,
  updateTaskStatus: (taskId, newStatus) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === taskId ? { ...t, status: newStatus } : t)
  })),
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),
  chatMessages: [
    { sender: 'ai', text: 'Welcome to the AI Company Operating System (AI-CoOS). I have fully parsed `tech_company_blueprint.html` and `responsibility_management_system.html` into memory. Ask me anything about our company scaling plans, RACI matrices, SOPs, or deployment metrics!', timestamp: '11:12 AM' }
  ],
  sendChatMessage: (text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: ChatMessage = { sender: 'user', text, timestamp: time };
    
    // Add user message immediately
    set((state) => ({ chatMessages: [...state.chatMessages, userMessage] }));
    
    // Simple mock AI response logic based on blueprints
    setTimeout(() => {
      let aiResponse = "I've reviewed the blueprint. What specific section or team responsibility would you like me to detail?";
      const lower = text.toLowerCase();
      
      if (lower.includes('database') || lower.includes('postgres') || lower.includes('db')) {
        aiResponse = "According to Section 9 (Scaling), our PostgreSQL scaling strategy is: read replicas first → PgBouncer connection pooling → horizontal sharding → CQRS pattern. Additionally, SOP-ENG-001 mandates backward-compatible migrations via the Expand-Contract pattern.";
      } else if (lower.includes('git') || lower.includes('branch')) {
        aiResponse = "From Section 4 of the blueprint: we employ a 5-branch Git strategy: `main` (production-only, protected, needs 2 approvals), `develop` (integration branch), `feature/[name]` (short-lived, max 3-5 days), `hotfix/[name]` (from main, quick deploys), and `release/[ver]` (stabilization/fixes).";
      } else if (lower.includes('incident') || lower.includes('rollback')) {
        aiResponse = "Under our DevOps incident response protocol (SOP-OPS-003), any rollback is automatically executed via ArgoCD if errors exceed 5% or latency >3s for 5 mins. For critical P0 incidents, SRE/BE Leads act as Incident Commander with a 15-min SLA response target.";
      } else if (lower.includes('raci') || lower.includes('responsible')) {
        aiResponse = "The Responsibility Matrix (Section 16 / RACI) states: for PRDs, the Product Manager is Accountable (A) while Engineering/Design are Consulted (C). For technical designs, the EM is Accountable (A) and the implementing Engineer is Responsible (R). DevOps is Accountable for deployments.";
      } else if (lower.includes('compensation') || lower.includes('salary') || lower.includes('levels')) {
        aiResponse = "As defined in Section 17, our transparent compensation system benchmarks roles against Levels.fyi + Radford. Junior salaries are $60k-$90k, Mid is $90k-$140k, Senior is $140k-$200k, and Staff is $200k-$300k+. Promotions trigger a 15-25% pay bump.";
      } else if (lower.includes('dora') || lower.includes('deploy') || lower.includes('freq')) {
        aiResponse = "Our active engineering operations center tracks DORA metrics in real time. Currently, we operate at Elite status with a Deployment Frequency of 3.4/day, Lead Time under 45 mins, a Change Failure Rate of 3.1%, and an MTTR of 24 minutes.";
      } else if (lower.includes('ai') || lower.includes('llm') || lower.includes('token')) {
        aiResponse = "Section 8 outlines our LLMOps. We trace all model calls using Langfuse. Our RAG pipeline currently runs at 98% faithfulness and 96% relevancy on OpenAI GPT-4o, with an average latency of 1.2s. Cheap tasks route to GPT-4o-mini to protect token budget.";
      }
      
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponse, timestamp: time };
      set((state) => ({ chatMessages: [...state.chatMessages, aiMessage] }));
    }, 1000);
  },
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open })
}));
