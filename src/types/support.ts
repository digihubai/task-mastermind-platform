
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
}
