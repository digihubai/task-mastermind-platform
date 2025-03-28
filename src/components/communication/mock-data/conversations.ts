
import type { Conversation } from "@/types/omnichannel";

export const mockConversations: Conversation[] = [
  {
    id: "1",
    customerId: "customer-1",
    name: "John Smith",
    message: "I'm having trouble with my recent order #12345",
    unread: true,
    time: "10:32 AM",
    channel: "website",
    status: "open",
    priority: "high",
    agent: "AI Assistant",
    isAiHandled: true,
    assignmentStatus: "ai"
  },
  {
    id: "2",
    customerId: "customer-2",
    name: "Sarah Johnson",
    message: "Can you please check the status of my refund?",
    unread: false,
    time: "Yesterday",
    channel: "email",
    status: "active",
    priority: "medium",
    agent: "AI Assistant",
    isAiHandled: true,
    assignmentStatus: "ai"
  },
  {
    id: "3",
    customerId: "customer-3",
    name: "Michael Brown",
    message: "When will my subscription renew?",
    unread: true,
    time: "2 days ago",
    channel: "whatsapp",
    status: "waiting",
    priority: "low",
    agent: null,
    assignmentStatus: "unassigned"
  },
  {
    id: "4",
    customerId: "customer-4",
    name: "Emily Wilson",
    message: "I need to change my shipping address",
    unread: false,
    time: "Jul 12",
    channel: "sms",
    status: "closed",
    priority: "high",
    agent: "Thomas Anderson",
    assignmentStatus: "assigned_to_human",
    assignedHumanAgent: "Thomas Anderson",
    assignedToHumanAt: "2023-07-12T14:32:00Z"
  },
  {
    id: "5",
    customerId: "customer-5",
    name: "David Lee",
    message: "Is there a discount for annual plans?",
    unread: true,
    time: "Jul 10",
    channel: "messenger",
    status: "open",
    priority: "medium",
    agent: null,
    assignmentStatus: "unassigned"
  },
  {
    id: "6",
    customerId: "customer-6",
    name: "Jennifer Martinez",
    message: "I'd like to upgrade my plan",
    unread: false,
    time: "Jul 8",
    channel: "instagram",
    status: "active",
    priority: "high",
    agent: "AI Assistant",
    isAiHandled: true,
    assignmentStatus: "ai"
  },
  {
    id: "7",
    customerId: "customer-7",
    name: "Robert Davis",
    message: "Can you explain how the API works?",
    unread: false,
    time: "Jul 5",
    channel: "twitter",
    status: "closed",
    priority: "low",
    agent: "Jessica Clark",
    assignmentStatus: "waiting_for_human"
  },
  {
    id: "8",
    customerId: "customer-1",
    name: "John Smith",
    message: "I also sent you an email about my order",
    unread: false,
    time: "10:40 AM",
    channel: "email",
    status: "open",
    priority: "medium",
    agent: "AI Assistant",
    isAiHandled: true,
    assignmentStatus: "ai"
  },
  {
    id: "9",
    customerId: "customer-1",
    name: "John Smith",
    message: "Texting about my order issue",
    unread: true,
    time: "11:00 AM",
    channel: "sms",
    status: "open",
    priority: "medium",
    agent: "AI Assistant",
    isAiHandled: true,
    assignmentStatus: "ai"
  },
];
