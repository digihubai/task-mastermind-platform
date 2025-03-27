
import { useQuery } from "@tanstack/react-query";

// Types
export interface IVRFlow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  nodes: IVRNode[];
  createdAt: string;
  updatedAt: string;
}

export interface IVRNode {
  id: string;
  type: 'greeting' | 'menu' | 'transfer' | 'voicemail' | 'message' | 'input' | 'condition';
  content: string;
  options?: {
    key: string;
    label: string;
    nextNodeId: string;
  }[];
  nextNodeId?: string;
}

export interface IVRMetrics {
  totalCalls: number;
  avgCallDuration: string;
  transferRate: number;
  abandonRate: number;
  menuCompletionRate: number;
}

export interface IVRPhoneNumber {
  id: string;
  phoneNumber: string;
  friendlyName: string;
  flowId: string;
  flowName: string;
  active: boolean;
  createdAt: string;
}

// Mock Data
const mockIVRFlows: IVRFlow[] = [
  {
    id: "flow-1",
    name: "Main Office Reception",
    description: "Main reception flow for business hours",
    status: 'active',
    nodes: [
      {
        id: "node-1",
        type: "greeting",
        content: "Welcome to DigiHub. Thank you for calling.",
        nextNodeId: "node-2"
      },
      {
        id: "node-2",
        type: "menu",
        content: "For sales, press 1. For support, press 2. For billing, press 3. For all other inquiries, press 0.",
        options: [
          { key: "1", label: "Sales", nextNodeId: "node-3" },
          { key: "2", label: "Support", nextNodeId: "node-4" },
          { key: "3", label: "Billing", nextNodeId: "node-5" },
          { key: "0", label: "Other", nextNodeId: "node-6" }
        ]
      },
      {
        id: "node-3",
        type: "transfer",
        content: "Transferring you to our sales department.",
        nextNodeId: ""
      },
      {
        id: "node-4",
        type: "transfer",
        content: "Transferring you to our support team.",
        nextNodeId: ""
      },
      {
        id: "node-5",
        type: "transfer",
        content: "Transferring you to our billing department.",
        nextNodeId: ""
      },
      {
        id: "node-6",
        type: "voicemail",
        content: "Please leave a message after the tone.",
        nextNodeId: ""
      }
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "flow-2",
    name: "After Hours",
    description: "Flow for after business hours",
    status: 'active',
    nodes: [
      {
        id: "node-1",
        type: "greeting",
        content: "Thank you for calling DigiHub. Our office is currently closed.",
        nextNodeId: "node-2"
      },
      {
        id: "node-2",
        type: "menu",
        content: "For urgent support, press 1. To leave a message, press 2.",
        options: [
          { key: "1", label: "Urgent Support", nextNodeId: "node-3" },
          { key: "2", label: "Leave Message", nextNodeId: "node-4" }
        ]
      },
      {
        id: "node-3",
        type: "transfer",
        content: "Transferring you to our on-call support team.",
        nextNodeId: ""
      },
      {
        id: "node-4",
        type: "voicemail",
        content: "Please leave your name, number, and a brief message. We'll return your call during business hours.",
        nextNodeId: ""
      }
    ],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const mockIVRMetrics: IVRMetrics = {
  totalCalls: 1248,
  avgCallDuration: "2m 35s",
  transferRate: 68,
  abandonRate: 12,
  menuCompletionRate: 92
};

const mockPhoneNumbers: IVRPhoneNumber[] = [
  {
    id: "num-1",
    phoneNumber: "+1 (555) 123-4567",
    friendlyName: "Main Office",
    flowId: "flow-1",
    flowName: "Main Office Reception",
    active: true,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "num-2",
    phoneNumber: "+1 (555) 234-5678",
    friendlyName: "Support Line",
    flowId: "flow-2",
    flowName: "After Hours",
    active: true,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Service functions
export const useIVRFlows = () => {
  return useQuery({
    queryKey: ['ivr-flows'],
    queryFn: async () => {
      // Simulate API request
      return new Promise<IVRFlow[]>((resolve) => {
        setTimeout(() => resolve(mockIVRFlows), 500);
      });
    }
  });
};

export const useIVRMetrics = () => {
  return useQuery({
    queryKey: ['ivr-metrics'],
    queryFn: async () => {
      // Simulate API request
      return new Promise<IVRMetrics>((resolve) => {
        setTimeout(() => resolve(mockIVRMetrics), 500);
      });
    }
  });
};

export const useIVRPhoneNumbers = () => {
  return useQuery({
    queryKey: ['ivr-phone-numbers'],
    queryFn: async () => {
      // Simulate API request
      return new Promise<IVRPhoneNumber[]>((resolve) => {
        setTimeout(() => resolve(mockPhoneNumbers), 500);
      });
    }
  });
};
