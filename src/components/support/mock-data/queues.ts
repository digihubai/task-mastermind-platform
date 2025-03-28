
import { SupportQueue } from "@/types/omnichannel";

export const mockQueues: SupportQueue[] = [
  {
    id: "q1",
    name: "General Support",
    description: "General customer support inquiries",
    conversations: 12,
    waitTime: 8,
    priority: "medium",
    status: "active",
    agents: ["agent1", "agent2", "agent3"],
    channels: ["email", "website", "chat"],
    department: "Customer Support"
  },
  {
    id: "q2",
    name: "Technical Issues",
    description: "Technical support for product issues",
    conversations: 5,
    waitTime: 15,
    priority: "high",
    status: "active",
    agents: ["agent2", "agent4"],
    channels: ["email", "website"],
    department: "Technical Support"
  },
  {
    id: "q3",
    name: "Billing Inquiries",
    description: "Billing and payment related issues",
    conversations: 3,
    waitTime: 4,
    priority: "medium",
    status: "active",
    agents: ["agent5", "agent6"],
    channels: ["email", "phone"],
    department: "Billing"
  },
  {
    id: "q4",
    name: "VIP Customers",
    description: "Support for enterprise and VIP customers",
    conversations: 1,
    waitTime: 2,
    priority: "high",
    status: "active",
    agents: ["agent1", "agent7"],
    channels: ["email", "phone", "chat"],
    department: "Enterprise Support"
  },
  {
    id: "q5",
    name: "After Hours",
    description: "Support outside of regular business hours",
    conversations: 7,
    waitTime: 45,
    priority: "low",
    status: "paused",
    agents: [],
    channels: ["email", "website"],
    department: "Customer Support"
  }
];
