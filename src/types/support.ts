
export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedTo?: string;
  department?: 'sales' | 'technical' | 'billing' | 'general';
  tags?: string[];
  attachments?: Attachment[];
  followUp?: boolean;
  customFields?: Record<string, string>;
  source?: 'chat' | 'email' | 'web' | 'whatsapp' | 'facebook' | 'telegram' | 'sms';
  rating?: number;
  ratingComment?: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  content: string;
  createdAt: string;
  senderId: string;
  senderType: 'user' | 'agent' | 'system';
  attachments?: Attachment[];
  isRead: boolean;
  isInternal?: boolean; // For internal notes visible only to agents
  isTranslated?: boolean;
  originalContent?: string; // Original content before translation
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
}

export interface SupportUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  lastActivity?: string;
  type: 'user' | 'agent' | 'admin';
  browser?: string;
  os?: string;
  location?: string;
  ip?: string;
  timezone?: string;
  language?: string;
  company?: string;
  currency?: string;
  phone?: string;
  currentUrl?: string;
  department?: string;
  notes?: string;
  customFields?: Record<string, string>;
  status?: 'online' | 'away' | 'offline';
}

export interface SupportConversation {
  id: string;
  userId: string;
  userName: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
  avatar?: string;
  isPinned?: boolean;
  tags?: string[];
  department?: string;
}

export interface ChatBotFlow {
  id: string;
  name: string;
  description?: string;
  nodes: ChatBotNode[];
  isActive: boolean;
  triggers?: ChatBotTrigger[];
  language?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatBotNode {
  id: string;
  type: 'start' | 'message' | 'input' | 'condition' | 'action' | 'transfer' | 'end';
  content: string;
  next?: string[];
  conditions?: ChatBotCondition[];
  actions?: ChatBotAction[];
  delay?: number;
  metadata?: Record<string, any>;
}

export interface ChatBotCondition {
  id: string;
  type: 'text' | 'intent' | 'entity' | 'custom';
  value: string;
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than';
  next: string;
}

export interface ChatBotAction {
  id: string;
  type: 'set_variable' | 'api_call' | 'send_email' | 'create_ticket' | 'custom';
  parameters: Record<string, any>;
}

export interface ChatBotTrigger {
  id: string;
  type: 'url' | 'time' | 'user_action' | 'custom';
  conditions: Record<string, any>;
  isActive: boolean;
}

// Team chat specific interfaces
export interface TeamChannel {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy: string;
  isPrivate: boolean;
  members: string[];
  lastMessage?: TeamMessage;
  unreadCount?: number;
  isPinned?: boolean;
  icon?: string;
}

export interface TeamGroup {
  id: string;
  name: string;
  members: string[];
  createdAt: string;
  createdBy: string;
  avatar?: string;
  lastMessage?: TeamMessage;
  unreadCount?: number;
  isPinned?: boolean;
}

export interface TeamMessage {
  id: string;
  channelId?: string;
  groupId?: string;
  content: string;
  createdAt: string;
  senderId: string;
  attachments?: Attachment[];
  reactions?: MessageReaction[];
  isEdited?: boolean;
  isPinned?: boolean;
  replyTo?: string;
  mentions?: string[];
  isRead?: Record<string, boolean>; // userId: hasRead
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface SavedReply {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: string;
  updatedBy: string;
  shortcut?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  agents: string[];
  email?: string;
  isDefault?: boolean;
  autoAssign?: boolean;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  isPublished: boolean;
  language?: string;
}

export interface KnowledgeBaseCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  order: number;
  articles?: number; // Count of articles
}

export interface SupportReport {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  data: any;
  createdAt: string;
  period: {
    start: string;
    end: string;
  };
}

export interface AgentSchedule {
  id: string;
  agentId: string;
  weekdays: Record<string, {
    isWorking: boolean;
    startTime?: string;
    endTime?: string;
  }>;
  exceptions: {
    date: string;
    isWorking: boolean;
    startTime?: string;
    endTime?: string;
    note?: string;
  }[];
}
