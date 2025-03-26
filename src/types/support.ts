
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
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  content: string;
  createdAt: string;
  senderId: string;
  senderType: 'user' | 'agent' | 'system';
  attachments?: { name: string; url: string; type: string }[];
  isRead: boolean;
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
}

export interface ChatBotFlow {
  id: string;
  name: string;
  description?: string;
  nodes: ChatBotNode[];
  isActive: boolean;
}

export interface ChatBotNode {
  id: string;
  type: 'start' | 'message' | 'input' | 'condition' | 'action';
  content: string;
  next?: string[];
}
