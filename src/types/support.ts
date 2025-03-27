
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
