
import { Conversation, Message } from "@/types/omnichannel";

// Mock conversations data
export const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    message: "I need help with my recent order #45678",
    unread: true,
    time: "5m",
    channel: "email",
    status: "open",
    priority: "high",
    agent: null
  },
  {
    id: "2",
    name: "Michael Brown",
    message: "When will my subscription renew?",
    unread: false,
    time: "25m",
    channel: "chat",
    status: "active",
    priority: "medium",
    agent: "AI Assistant"
  },
  {
    id: "3",
    name: "David Wilson",
    message: "Thank you for your quick response!",
    unread: false,
    time: "1h",
    channel: "sms",
    status: "closed",
    priority: "low",
    agent: "John D."
  },
  {
    id: "4",
    name: "Jennifer Martinez",
    message: "I'd like to upgrade my plan",
    unread: true,
    time: "2h",
    channel: "instagram",
    status: "open",
    priority: "high",
    agent: null
  },
  {
    id: "5",
    name: "Robert Davis",
    message: "Can you explain how the AI features work?",
    unread: false,
    time: "3h",
    channel: "twitter",
    status: "active",
    priority: "medium",
    agent: "AI Assistant"
  },
  {
    id: "6",
    name: "Emily Wilson",
    message: "I need help setting up my account",
    unread: false,
    time: "1d",
    channel: "facebook",
    status: "waiting",
    priority: "medium",
    agent: null
  },
  {
    id: "7",
    name: "Thomas Anderson",
    message: "Left a voicemail about subscription issues",
    unread: true,
    time: "1d",
    channel: "phone",
    status: "open",
    priority: "high",
    agent: null
  }
];

// Mock messages data
export const mockMessages: Message[] = [
  {
    id: "1",
    sender: "customer",
    content: "Hello, I recently placed an order (#45678) but haven't received a shipping confirmation yet. Can you help me check the status?",
    time: "10:32 AM",
    channel: "email"
  },
  {
    id: "2",
    sender: "ai",
    content: "Hi Sarah, thank you for reaching out. I'd be happy to help you check on your order status. Let me look that up for you right away.",
    time: "10:34 AM",
    channel: "email"
  },
  {
    id: "3",
    sender: "ai",
    content: "I can see that your order #45678 has been processed and is currently being prepared for shipping. It should be shipped within the next 24 hours, and you'll receive an email confirmation once it's on the way.",
    time: "10:35 AM",
    channel: "email"
  },
  {
    id: "4",
    sender: "customer",
    content: "That's great to know! Do you have an estimated delivery date?",
    time: "10:38 AM",
    channel: "email"
  },
  {
    id: "5",
    sender: "ai",
    content: "Based on your location and the shipping method selected (Standard Shipping), your estimated delivery date is June 15-16. Would you like me to provide tracking information once it's available?",
    time: "10:40 AM",
    channel: "email"
  },
  {
    id: "6",
    sender: "customer",
    content: "Yes, please send me the tracking information when available. Also, is it possible to upgrade to express shipping?",
    time: "10:42 AM",
    channel: "email"
  },
  {
    id: "7",
    sender: "human",
    content: "Hi Sarah, this is John from customer support. I'm taking over from our AI assistant. Yes, we can definitely upgrade your shipping to express. There would be an additional fee of $12.50. Would you like to proceed with the upgrade?",
    time: "10:45 AM",
    channel: "email"
  }
];
