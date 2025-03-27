
import { ChatBotNode } from "@/types/support";

export const getNodeTypeLabel = (type: ChatBotNode['type']) => {
  switch (type) {
    case 'start':
      return 'Start';
    case 'message':
      return 'Message';
    case 'input':
      return 'User Input';
    case 'condition':
      return 'Condition';
    case 'action':
      return 'Action';
    default:
      return type;
  }
};

export const createNewNode = (type: string): ChatBotNode => {
  return {
    id: `node-${Date.now()}`,
    type: type as ChatBotNode['type'],
    position: { x: 0, y: 0 },
    data: {
      name: type === 'start' ? 'Start' : '',
      message: '',
    },
    content: type === 'start' ? 'Start' : '',
    next: [],
  };
};
