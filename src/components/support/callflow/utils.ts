
import { CallFlowNode } from "@/types/support";

export const createNewCallNode = (type: string): CallFlowNode => {
  const newNodeId = `node-${Date.now()}`;
  const basePosition = { x: 100, y: 100 };

  switch (type) {
    case 'greeting':
      return {
        id: newNodeId,
        type: 'greeting',
        position: basePosition,
        data: { message: "Hello, thank you for calling. How can we help you today?" }
      };
    
    case 'message':
      return {
        id: newNodeId,
        type: 'message',
        position: basePosition,
        data: { message: "I understand. Let me help you with that." }
      };
    
    case 'input':
      return {
        id: newNodeId,
        type: 'input',
        position: basePosition,
        data: { 
          question: "Could you please tell me what you're calling about today?",
          inputType: 'voice'
        }
      };
    
    case 'menu':
      return {
        id: newNodeId,
        type: 'menu',
        position: basePosition,
        data: { 
          introduction: "Please choose from the following options:",
          options: [
            { key: "1", description: "Sales" },
            { key: "2", description: "Support" },
            { key: "3", description: "Billing" }
          ]
        }
      };
    
    case 'transfer':
      return {
        id: newNodeId,
        type: 'transfer',
        position: basePosition,
        data: { 
          message: "I'll transfer you to a specialist who can help you. Please hold.",
          department: "support" 
        }
      };
    
    case 'condition':
      return {
        id: newNodeId,
        type: 'condition',
        position: basePosition,
        data: { 
          conditionType: "input-match",
          conditionValue: ""
        }
      };
      
    default:
      return {
        id: newNodeId,
        type: 'message',
        position: basePosition,
        data: { message: "Default message" }
      };
  }
};
