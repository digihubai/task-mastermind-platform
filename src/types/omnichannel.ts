
export interface Conversation {
  id: string;
  name: string;
  message: string;
  unread: boolean;
  time: string;
  channel: string;
  status: string;
  priority: string;
  agent: string | null;
}

export interface Message {
  id: string;
  sender: 'customer' | 'ai' | 'human';
  content: string;
  time: string;
  channel: string;
}
