
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
  csatScore?: number; // Customer satisfaction score (0-100)
  csatSubmitted?: boolean; // Whether the customer submitted a CSAT survey
}

export interface Message {
  id: string;
  sender: 'customer' | 'ai' | 'human';
  content: string;
  time: string;
  channel: string; // Must match the conversation channel to properly filter messages
  isRead?: boolean;
  customerId: string; // Added customerId to link messages to conversations
  conversationId: string; // Adding this to fix the error
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
  enableCSAT: boolean;
  csatThreshold: number;
  enabledChannels: {
    website: boolean;
    email: boolean;
    whatsapp: boolean;
    messenger: boolean;
    telegram: boolean;
    slack: boolean;
    sms: boolean;
    instagram: boolean;
    twitter: boolean;
    viber: boolean;
    line: boolean;
    wechat: boolean;
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
  responseTime?: number; // Average response time in minutes
  specialties?: string[]; // Areas of expertise (e.g. technical, billing)
  languages?: string[]; // Languages the agent can speak
  department?: string; // Department the agent belongs to
  availability?: {
    startTime: string; // HH:MM format
    endTime: string; // HH:MM format
    timeZone: string; // e.g. 'America/New_York'
    daysOfWeek: number[]; // 0-6 (Sunday to Saturday)
  };
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  type: string;
  createdAt: string;
  lastActivity: string;
  browser: string;
  language: string;
  company: string;
  currency: string;
  currentUrl: string;
  ip: string;
  location: string;
  os: string;
  phone: string;
  timezone: string;
  conversationId: string;
  userId: string;
}

export interface SavedReply {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUsed?: string;
  usageCount?: number;
  isFavorite?: boolean;
  createdAt: string;
}

export interface CSATSurvey {
  id: string;
  conversationId: string;
  customerId: string;
  score: number; // 0-100
  wasResolved: boolean;
  wouldRecommend: boolean;
  comments?: string;
  submittedAt: string;
}

export interface SupportQueue {
  id: string;
  name: string;
  description?: string;
  conversations: number;
  waitTime: number; // Average wait time in minutes
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'paused';
  agents: string[]; // IDs of agents assigned to this queue
  channels?: string[]; // Channels this queue handles
  department?: string; // Department this queue belongs to
}
