
export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedTo?: string;
  department: string;
  tags: string[];
  messages: SupportMessage[];
  metadata?: {
    orderNumber?: string;
    urgencyLevel?: string;
    preferredContact?: string;
    bestTimeToReach?: string;
    customFields?: {[key: string]: string};
    attachments?: string[];
  };
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  content: string;
  createdAt: string;
  senderId: string;
  senderType: string;
  userId: string;
  isInternal: boolean;
  isRead: boolean;
}

export interface SupportUser {
  id: string;
  name: string;
  email: string;
  role: string;
  type: string;
  createdAt: string;
  lastActivity: string;
  browser: string;
  os: string;
  location: string;
  ip: string;
  timezone: string;
  language: string;
  company: string;
  phone: string;
}

export interface ChatBotNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
  content?: string;
  next?: string[];
}

export interface ChatBotFlow {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  nodes: ChatBotNode[];
  edges: any[];
  isActive: boolean;
  language: string;
}

export interface ChatBotMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'bot';
  metadata?: any;
}

export interface ChatConfig {
  initialMessage: string;
  modelName: string;
  apiKey?: string;
  maxTokens: number;
  temperature: number;
}

// Call Flow Types
export interface CallFlowNode {
  id: string;
  type: 'greeting' | 'message' | 'input' | 'menu' | 'transfer' | 'condition';
  position: { x: number; y: number };
  data: any;
}

export interface CallFlowEdge {
  id: string;
  source: string;
  target: string;
}

export interface CallFlow {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  nodes: CallFlowNode[];
  edges: CallFlowEdge[];
  isActive: boolean;
  language: string;
  voiceType: string;
}

// Team Chat Types
export interface TeamChannel {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  members: string[];
  messageCount: number;
  unreadCount?: number;
  isPinned?: boolean;
  topic?: string;
  icon?: string;
  createdAt: string;
  createdBy?: string;
  updatedBy?: string;
  purpose?: string;
  isActive?: boolean;
}

export interface TeamGroup {
  id: string;
  name: string;
  description?: string;
  channels: TeamChannel[];
  members: string[];
  unreadCount?: number;
  isPinned?: boolean;
  createdAt: string;
  createdBy?: string;
  updatedAt?: string;
  isActive?: boolean;
}

export interface TeamMessage {
  id: string;
  channelId: string;
  content: string;
  contentType: 'text' | 'image' | 'file' | 'code' | 'gif';
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  edited?: boolean;
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  isPinned?: boolean;
  parentId?: string;
  threadReplies?: number;
  attachments?: Array<{
    id: string;
    url: string;
    type: string;
    name: string;
    size?: number;
  }>;
  createdAt: string;
  replyTo?: string;
  groupId?: string;
}
