
import { HumanAgent } from "@/types/omnichannel";

export const mockAgents: HumanAgent[] = [
  {
    id: "agent1",
    name: "John Smith",
    email: "john.smith@digihub.com",
    avatar: "https://github.com/shadcn.png",
    status: "online",
    assignedConversations: 3,
    maxConcurrentChats: 5,
    responseTime: 4,
    specialties: ["technical", "product"],
    languages: ["English", "Spanish"],
    department: "Customer Support",
    availability: {
      startTime: "09:00",
      endTime: "17:00",
      timeZone: "America/New_York",
      daysOfWeek: [1, 2, 3, 4, 5]
    }
  },
  {
    id: "agent2",
    name: "Sarah Johnson",
    email: "sarah.johnson@digihub.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    status: "online",
    assignedConversations: 5,
    maxConcurrentChats: 5,
    responseTime: 6,
    specialties: ["technical", "integration"],
    languages: ["English", "French"],
    department: "Technical Support"
  },
  {
    id: "agent3",
    name: "Michael Brown",
    email: "michael.brown@digihub.com",
    status: "away",
    assignedConversations: 2,
    maxConcurrentChats: 4,
    responseTime: 8,
    specialties: ["general", "onboarding"],
    languages: ["English"],
    department: "Customer Support"
  },
  {
    id: "agent4",
    name: "Emily Davis",
    email: "emily.davis@digihub.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    status: "online",
    assignedConversations: 0,
    maxConcurrentChats: 3,
    responseTime: 3,
    specialties: ["technical", "apis"],
    languages: ["English", "German"],
    department: "Technical Support"
  },
  {
    id: "agent5",
    name: "Robert Wilson",
    email: "robert.wilson@digihub.com",
    status: "offline",
    assignedConversations: 0,
    maxConcurrentChats: 5,
    responseTime: 10,
    specialties: ["billing", "accounting"],
    languages: ["English"],
    department: "Billing"
  }
];
