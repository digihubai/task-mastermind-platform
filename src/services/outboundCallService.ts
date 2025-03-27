
import { useQuery } from "@tanstack/react-query";

// Types
export interface CallCampaign {
  id: string;
  name: string;
  status: 'active' | 'scheduled' | 'completed' | 'paused';
  calls: number;
  answered: number;
  completedCalls: number;
  totalCalls: number;
  answerRate: number;
  conversions: number;
  conversionRate: number;
  trend: 'up' | 'down';
  createdAt: string;
}

export interface CallRecord {
  id: string;
  contactName: string;
  phoneNumber: string;
  campaignId: string;
  campaignName: string;
  status: 'completed' | 'not-answered' | 'voicemail' | 'scheduled';
  duration: number;
  notes: string;
  outcome: string;
  timestamp: string;
}

export interface CallStats {
  totalCalls: number;
  answeredCalls: number;
  answerRate: number;
  avgDuration: string;
  conversionRate: number;
}

// Mock Data
const mockCampaigns: CallCampaign[] = [
  {
    id: "camp-1",
    name: "Lead Follow-up",
    status: 'active',
    calls: 248,
    answered: 92,
    completedCalls: 92,
    totalCalls: 248,
    answerRate: 37,
    conversions: 28,
    conversionRate: 11,
    trend: "up",
    createdAt: new Date().toISOString()
  },
  {
    id: "camp-2",
    name: "Customer Feedback",
    status: 'active',
    calls: 120,
    answered: 45,
    completedCalls: 45,
    totalCalls: 120,
    answerRate: 38,
    conversions: 22,
    conversionRate: 18,
    trend: "up",
    createdAt: new Date().toISOString()
  },
  {
    id: "camp-3",
    name: "Product Announcement",
    status: 'paused',
    calls: 215,
    answered: 58,
    completedCalls: 58,
    totalCalls: 215,
    answerRate: 27,
    conversions: 12,
    conversionRate: 6,
    trend: "down",
    createdAt: new Date().toISOString()
  }
];

const mockCallStats: CallStats = {
  totalCalls: 1248,
  answeredCalls: 398,
  answerRate: 32,
  avgDuration: "2m 48s",
  conversionRate: 14
};

const mockCallRecords: CallRecord[] = [
  {
    id: "call-1",
    contactName: "John Smith",
    phoneNumber: "+1 (555) 123-4567",
    campaignId: "camp-1",
    campaignName: "Lead Follow-up",
    status: "completed",
    duration: 165, // seconds
    notes: "Customer requested a follow-up email",
    outcome: "Interested",
    timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    id: "call-2",
    contactName: "Jane Doe",
    phoneNumber: "+1 (555) 234-5678",
    campaignId: "camp-1",
    campaignName: "Lead Follow-up",
    status: "voicemail",
    duration: 45, // seconds
    notes: "Left voicemail about new features",
    outcome: "Voicemail",
    timestamp: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
  },
  {
    id: "call-3",
    contactName: "Robert Johnson",
    phoneNumber: "+1 (555) 345-6789",
    campaignId: "camp-2",
    campaignName: "Customer Feedback",
    status: "completed",
    duration: 320, // seconds
    notes: "Very positive feedback, interested in upgrade",
    outcome: "Success",
    timestamp: new Date(Date.now() - 10800000).toISOString() // 3 hours ago
  },
  {
    id: "call-4",
    contactName: "Sarah Williams",
    phoneNumber: "+1 (555) 456-7890",
    campaignId: "camp-3",
    campaignName: "Product Announcement",
    status: "not-answered",
    duration: 0, // seconds
    notes: "No answer, try again tomorrow",
    outcome: "No Answer",
    timestamp: new Date(Date.now() - 14400000).toISOString() // 4 hours ago
  }
];

// Service functions
export const useCallCampaigns = () => {
  return useQuery({
    queryKey: ['outbound-campaigns'],
    queryFn: async () => {
      // Simulate API request
      return new Promise<CallCampaign[]>((resolve) => {
        setTimeout(() => resolve(mockCampaigns), 500);
      });
    }
  });
};

export const useCallStats = () => {
  return useQuery({
    queryKey: ['outbound-call-stats'],
    queryFn: async () => {
      // Simulate API request
      return new Promise<CallStats>((resolve) => {
        setTimeout(() => resolve(mockCallStats), 500);
      });
    }
  });
};

export const useCallRecords = () => {
  return useQuery({
    queryKey: ['outbound-call-records'],
    queryFn: async () => {
      // Simulate API request
      return new Promise<CallRecord[]>((resolve) => {
        setTimeout(() => resolve(mockCallRecords), 500);
      });
    }
  });
};
