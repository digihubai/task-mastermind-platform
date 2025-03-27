
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
