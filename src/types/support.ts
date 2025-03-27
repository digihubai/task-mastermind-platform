// Team chat related types
export interface TeamMessage {
  id: string;
  channelId?: string;
  groupId?: string;
  content: string;
  createdAt: string;
  senderId: string;
  isPinned?: boolean;
  replyTo?: string;
  reactions?: {
    emoji: string;
    count: number;
    users?: string[];
  }[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    createdAt: string;
  }[];
  mentions?: string[];
}

export interface TeamChannel {
  id: string;
  name: string;
  description?: string;
  topic?: string;
  purpose?: string;
  createdAt: string;
  createdBy: string;
  isPrivate?: boolean;
  members: string[];
  lastMessage?: TeamMessage;
  unreadCount: number;
  isPinned?: boolean;
  icon?: string;
}

export interface TeamGroup {
  id: string;
  name: string;
  members: string[];
  createdAt: string;
  createdBy: string;
  lastMessage?: TeamMessage;
  unreadCount: number;
  isPinned?: boolean;
}

// Support ticket related types
export interface SupportTicket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  assigneeId?: string;
  messages: SupportMessage[];
  // Additional fields used in the app
  description?: string;
  department?: string;
  assignedTo?: string;
  tags?: string[];
  source?: string;
  rating?: number;
  followUp?: string;
  attachments?: any[];
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  content: string;
  createdAt: string;
  userId: string;
  isInternal: boolean;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  // Additional fields used in the app
  senderId?: string;
  senderType?: string;
  isRead?: boolean;
}

export interface SupportUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  company?: string;
  plan?: string;
  createdAt: string;
  lastLogin?: string;
  tickets?: SupportTicket[];
  // Additional fields used in the app
  type?: string;
  lastActivity?: string;
  phone?: string;
  browser?: string;
  os?: string;
  location?: string;
  ip?: string;
  timezone?: string;
  language?: string;
  currentUrl?: string;
}

export interface ChatBotFlow {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  nodes: ChatBotNode[];
  edges: {
    id: string;
    source: string;
    target: string;
    condition?: string;
  }[];
  isActive?: boolean;
  language?: string;
}

export interface ChatBotNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    name?: string;
    message?: string;
    options?: {
      id: string;
      text: string;
      nextNodeId?: string;
    }[];
    action?: string;
    parameters?: Record<string, any>;
    condition?: {
      field: string;
      operator: string;
      value: any;
    };
  };
  // Additional fields used in the app
  content?: string;
  next?: string[];
}
