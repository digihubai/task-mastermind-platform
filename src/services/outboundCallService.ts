
import { useQuery } from "@tanstack/react-query";

export interface CallCampaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Completed' | 'Draft';
  contacts: number;
  completed: number;
  conversion: number;
  startDate: string;
  endDate?: string;
  assignedTo: string[];
}

export interface CallScript {
  id: string;
  name: string;
  description: string;
  type: string;
  lastEdited: string;
  content?: string;
}

export interface ContactList {
  id: string;
  name: string;
  count: number;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
  source: string;
}

export interface CallStats {
  totalCalls: number;
  callsChange: number;
  answeredRate: number;
  answeredRateChange: number;
  avgCallDuration: string;
  durationChange: number;
  conversionRate: number;
  conversionChange: number;
  callOutcomes: {
    answered: number;
    voicemail: number;
    noAnswer: number;
    busy: number;
    failed: number;
  };
  dailyStats: Array<{
    day: string;
    total: number;
    answered: number;
    conversion: number;
  }>;
  agentPerformance: Array<{
    agent: string;
    calls: number;
    converted: number;
    avgDuration: number;
  }>;
}

// Mock data for campaigns
const mockCampaigns: CallCampaign[] = [
  {
    id: "camp-1",
    name: "Q2 Lead Generation",
    status: "Active",
    contacts: 500,
    completed: 320,
    conversion: 12.5,
    startDate: "2025-04-01",
    assignedTo: ["Jane Cooper", "Robert Fox"]
  },
  {
    id: "camp-2",
    name: "Product Demo Follow-up",
    status: "Active",
    contacts: 150,
    completed: 124,
    conversion: 28.3,
    startDate: "2025-03-15",
    assignedTo: ["Wade Warren"]
  },
  {
    id: "camp-3",
    name: "Event Outreach",
    status: "Completed",
    contacts: 300,
    completed: 300,
    conversion: 18.7,
    startDate: "2025-02-10",
    endDate: "2025-02-28",
    assignedTo: ["Esther Howard", "Jenny Wilson", "Cameron Williamson"]
  },
  {
    id: "camp-4",
    name: "Renewal Campaign",
    status: "Draft",
    contacts: 420,
    completed: 0,
    conversion: 0,
    startDate: "2025-05-01",
    assignedTo: []
  }
];

// Mock data for scripts
const mockScripts: CallScript[] = [
  {
    id: "script-1",
    name: "Product Demo Follow-up",
    description: "Script for following up after product demos",
    type: "Follow-up",
    lastEdited: "2 days ago",
    content: "Hello {name}, this is {agent} from DigiHub AI. I'm calling to follow up on the product demo you attended..."
  },
  {
    id: "script-2",
    name: "New Feature Introduction",
    description: "Introducing our latest AI-powered features",
    type: "Outreach",
    lastEdited: "1 week ago",
    content: "Hi {name}, I'm {agent} calling from DigiHub AI. We've just launched some exciting new features..."
  },
  {
    id: "script-3",
    name: "Renewal Script",
    description: "For contacting customers approaching renewal dates",
    type: "Renewal",
    lastEdited: "3 days ago",
    content: "Hello {name}, this is {agent} from DigiHub AI. I noticed your subscription is coming up for renewal..."
  },
  {
    id: "script-4",
    name: "Webinar Invitation",
    description: "Invite prospects to upcoming webinar",
    type: "Event",
    lastEdited: "Yesterday",
    content: "Hi {name}, this is {agent} from DigiHub AI. I'm reaching out to invite you to our upcoming webinar..."
  }
];

// Mock data for contact lists
const mockContactLists: ContactList[] = [
  {
    id: "list-1",
    name: "Q2 Prospects",
    count: 583,
    status: "Active",
    lastUpdated: "2 days ago",
    source: "Hubspot CRM"
  },
  {
    id: "list-2",
    name: "Product Demo Attendees",
    count: 147,
    status: "Active",
    lastUpdated: "Yesterday",
    source: "Zoom Webinars"
  },
  {
    id: "list-3",
    name: "Conference Leads",
    count: 304,
    status: "Inactive",
    lastUpdated: "2 weeks ago",
    source: "Manual Import"
  },
  {
    id: "list-4",
    name: "Renewal Candidates",
    count: 421,
    status: "Active",
    lastUpdated: "1 week ago",
    source: "Salesforce"
  }
];

// Mock data for call statistics
const mockCallStats: CallStats = {
  totalCalls: 1423,
  callsChange: 12,
  answeredRate: 42,
  answeredRateChange: 5,
  avgCallDuration: "3m 25s",
  durationChange: -2,
  conversionRate: 18,
  conversionChange: 7,
  callOutcomes: {
    answered: 598,
    voicemail: 412,
    noAnswer: 287,
    busy: 54,
    failed: 72
  },
  dailyStats: [
    { day: "Mar 1", total: 42, answered: 18, conversion: 4 },
    { day: "Mar 2", total: 53, answered: 24, conversion: 6 },
    { day: "Mar 3", total: 61, answered: 28, conversion: 7 },
    { day: "Mar 4", total: 47, answered: 22, conversion: 5 },
    { day: "Mar 5", total: 52, answered: 25, conversion: 5 },
    { day: "Mar 6", total: 38, answered: 16, conversion: 3 },
    { day: "Mar 7", total: 27, answered: 11, conversion: 2 },
    { day: "Mar 8", total: 45, answered: 19, conversion: 5 },
    { day: "Mar 9", total: 55, answered: 26, conversion: 7 },
    { day: "Mar 10", total: 62, answered: 30, conversion: 8 },
    { day: "Mar 11", total: 58, answered: 27, conversion: 6 },
    { day: "Mar 12", total: 63, answered: 29, conversion: 8 },
    { day: "Mar 13", total: 49, answered: 21, conversion: 5 },
    { day: "Mar 14", total: 44, answered: 20, conversion: 4 }
  ],
  agentPerformance: [
    { agent: "Jane Cooper", calls: 312, converted: 48, avgDuration: 3.7 },
    { agent: "Robert Fox", calls: 287, converted: 52, avgDuration: 4.2 },
    { agent: "Wade Warren", calls: 256, converted: 41, avgDuration: 3.1 },
    { agent: "Esther Howard", calls: 229, converted: 37, avgDuration: 3.8 },
    { agent: "Jenny Wilson", calls: 204, converted: 35, avgDuration: 2.9 },
    { agent: "Cameron Williamson", calls: 135, converted: 19, avgDuration: 2.6 }
  ]
};

// API function to fetch campaigns
export const fetchCallCampaigns = async (): Promise<CallCampaign[]> => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCampaigns), 500);
  });
};

// API function to fetch call scripts
export const fetchCallScripts = async (): Promise<CallScript[]> => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockScripts), 500);
  });
};

// API function to fetch contact lists
export const fetchContactLists = async (): Promise<ContactList[]> => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockContactLists), 500);
  });
};

// API function to fetch call statistics
export const fetchCallStats = async (): Promise<CallStats> => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCallStats), 500);
  });
};

// React Query hooks
export const useCallCampaigns = () => {
  return useQuery({
    queryKey: ['callCampaigns'],
    queryFn: fetchCallCampaigns
  });
};

export const useCallScripts = () => {
  return useQuery({
    queryKey: ['callScripts'],
    queryFn: fetchCallScripts
  });
};

export const useContactLists = () => {
  return useQuery({
    queryKey: ['contactLists'],
    queryFn: fetchContactLists
  });
};

export const useCallStats = () => {
  return useQuery({
    queryKey: ['callStats'],
    queryFn: fetchCallStats
  });
};
