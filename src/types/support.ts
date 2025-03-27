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
