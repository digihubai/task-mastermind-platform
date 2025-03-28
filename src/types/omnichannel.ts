
export interface Conversation {
  id: string;
  name: string;
  message: string;
  unread: boolean;
  time: string;
  channel: string; // e.g., "website", "email", "whatsapp", "messenger", "telegram", "slack", "sms"
  status: string;
  priority: string;
  agent: string | null;
  lastUpdated?: string;
  isAiHandled?: boolean;
  assignmentStatus?: 'ai' | 'waiting_for_human' | 'assigned_to_human' | 'unassigned';
  assignedToHumanAt?: string;
  assignedHumanAgent?: string;
  customerId: string; // Added customerId to link conversations across channels
}

export interface Message {
  id: string;
  sender: 'customer' | 'ai' | 'human';
  content: string;
  time: string;
  channel: string; // Must match the conversation channel to properly filter messages
  isRead?: boolean;
  customerId: string; // Added customerId to link messages to conversations
  attachments?: Array<{
    type: string;
    url: string;
    name: string;
  }>;
}

export interface AIAssistantConfig {
  name: string;
  welcomeMessage: string;
  model: 'gpt-4o' | 'gpt-4o-mini' | 'claude-3' | 'gemini';
  autoAssign: boolean;
  autoAssignThreshold: number;
  enabledChannels: {
    website: boolean;
    email: boolean;
    whatsapp: boolean;
    messenger: boolean;
    telegram: boolean;
    slack: boolean;
    sms: boolean;
  };
}

export interface HumanAgent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  assignedConversations: number;
  maxConcurrentChats?: number;
}
