
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
  nodes: ChatBotNode[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatBotNode {
  id: string;
  type: string;
  content: string;
  position: { x: number; y: number };
  nextNodes: string[];
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  userId: string;
  assigneeId?: string;
  messages: SupportMessage[];
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  content: string;
  createdAt: string;
  senderId: string;
  isInternal: boolean;
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
  role: 'customer' | 'agent' | 'admin';
  createdAt: string;
  lastActive?: string;
}
