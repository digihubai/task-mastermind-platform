
export interface TeamChannel {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy: string;
  isPrivate: boolean;
  members: string[];
  lastMessage?: {
    id: string;
    channelId: string;
    content: string;
    createdAt: string;
    senderId: string;
  };
  unreadCount: number;
  isPinned?: boolean;
}

export interface TeamGroup {
  id: string;
  name: string;
  members: string[];
  createdAt: string;
  createdBy: string;
  lastMessage?: {
    id: string;
    groupId: string;
    content: string;
    createdAt: string;
    senderId: string;
  };
  unreadCount: number;
  isPinned?: boolean;
}

export interface TeamMessage {
  id: string;
  channelId?: string;
  groupId?: string;
  content: string;
  createdAt: string;
  senderId: string;
  reactions?: MessageReaction[];
  attachments?: MessageAttachment[];
  mentions?: string[];
  replyTo?: string;
}

interface MessageReaction {
  emoji: string;
  count: number;
  users?: string[];
}

interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
}

// Additional types needed for other components
export interface ChatBotFlow {
  id: string;
  name: string;
  description?: string; // Added this property
  nodes: ChatBotNode[];
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
  language?: string;
}

export interface ChatBotNode {
  id: string;
  type: string;
  content: string;
  position?: { x: number; y: number };
  nextNodes?: string[]; // Changed from 'next' to 'nextNodes' for clarity
  next?: string[]; // Keep for backward compatibility
}

export interface SupportTicket {
  id: string;
  subject: string;
  description?: string; // Added description property
  status: 'open' | 'in-progress' | 'resolved' | 'closed'; // Fixed hyphen in 'in-progress'
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  userId: string;
  assigneeId?: string;
  assignedTo?: string; // Added for backward compatibility
  messages?: SupportMessage[];
  department?: string; // Added department field
  tags?: string[];
  source?: 'email' | 'chat' | 'whatsapp' | 'facebook' | 'telegram' | 'sms' | 'web'; // Added source field
  rating?: number; // Added rating field
  attachments?: any[]; // Added attachments field
  followUp?: boolean; // Added followUp field
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  content: string;
  createdAt: string;
  senderId: string;
  senderType?: 'user' | 'agent' | 'system'; // Added senderType field
  isInternal?: boolean;
  isRead?: boolean;
  attachments?: {
    id: string;
    url: string;
    name: string;
    type: string;
  }[];
}

export interface SupportUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  role?: 'customer' | 'agent' | 'admin';
  type?: string; // Added type field
  createdAt: string;
  lastActive?: string;
  lastActivity?: string; // Added for backward compatibility
  phone?: string; // Added phone field
  browser?: string; // Added browser field
  os?: string; // Added os field
  location?: string; // Added location field
  ip?: string; // Added ip field
  timezone?: string; // Added timezone field
  language?: string; // Added language field
  currentUrl?: string; // Added currentUrl field
}
