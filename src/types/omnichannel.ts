
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
}

export interface Message {
  id: string;
  sender: 'customer' | 'ai' | 'human';
  content: string;
  time: string;
  channel: string; // Must match the conversation channel to properly filter messages
  isRead?: boolean;
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
