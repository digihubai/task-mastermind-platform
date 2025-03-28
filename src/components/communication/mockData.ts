import { Conversation, Message } from "@/types/omnichannel";

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

export const mockMessages: Message[] = [
  {
    id: "msg1",
    customerId: "customer-1",
    sender: 'customer',
    content: "Hello, I'm having trouble with my recent order #12345. It was supposed to arrive yesterday but I haven't received it yet.",
    time: "10:30 AM",
    channel: "website"
  },
  {
    id: "msg2",
    customerId: "customer-1",
    sender: 'ai',
    content: "I'm sorry to hear about the delay with your order. Let me check the status for you right away.",
    time: "10:32 AM",
    channel: "website"
  },
  {
    id: "msg3",
    customerId: "customer-1",
    sender: 'customer',
    content: "Thank you, I appreciate your help.",
    time: "10:33 AM",
    channel: "website"
  },
  {
    id: "msg4",
    customerId: "customer-1",
    sender: 'ai',
    content: "I can see that your order #12345 has been processed and is currently being prepared for shipping. It should be shipped within the next 24 hours and you'll receive an email confirmation.",
    time: "10:35 AM",
    channel: "website"
  },
  {
    id: "msg5",
    customerId: "customer-1",
    sender: 'customer',
    content: "That's great to know! Do you have an estimated delivery date?",
    time: "10:38 AM",
    channel: "website"
  },
  {
    id: "msg6",
    customerId: "customer-1",
    sender: 'ai',
    content: "Based on your location and the shipping method selected (Standard Shipping), your estimated delivery date is June 15-16. Would you like me to provide tracking information once it is available?",
    time: "10:40 AM",
    channel: "website"
  },
  {
    id: "msg7",
    customerId: "customer-1",
    sender: 'customer',
    content: "Yes, please send me the tracking information when available. Also, is it possible to upgrade to express shipping?",
    time: "10:42 AM",
    channel: "website"
  },
  {
    id: "msg8",
    customerId: "customer-1",
    sender: 'human',
    content: "Hi Sarah, this is John from customer support. I'm taking over from our AI assistant. Yes, we can definitely upgrade your shipping to express. There would be an additional fee of $12.50. Would you like to proceed with the upgrade?",
    time: "10:45 AM",
    channel: "website"
  },
  {
    id: "emsg1",
    customerId: "customer-1",
    sender: 'customer',
    content: "Hello, I also sent this email about my order #12345. Any updates?",
    time: "10:40 AM",
    channel: "email"
  },
  {
    id: "emsg2",
    customerId: "customer-1",
    sender: 'ai',
    content: "Thank you for your email. I can see you've also contacted us via the website. I've already provided status updates there. Would you prefer to continue our conversation over email instead?",
    time: "10:45 AM",
    channel: "email"
  },
  {
    id: "smsg1",
    customerId: "customer-1",
    sender: 'customer',
    content: "Hi, this is John Smith texting about order #12345",
    time: "11:00 AM",
    channel: "sms"
  },
  {
    id: "smsg2",
    customerId: "customer-1",
    sender: 'ai',
    content: "Hello John, I see you've contacted us through multiple channels. I'm coordinating all your communications about order #12345. Would you like a summary of what we've discussed so far?",
    time: "11:05 AM",
    channel: "sms"
  },
  {
    id: "emsg3",
    customerId: "customer-2",
    sender: 'customer',
    content: "Hello, can you please check the status of my refund for order #54321? It's been over a week now.",
    time: "Yesterday",
    channel: "email"
  },
  {
    id: "emsg4",
    customerId: "customer-2",
    sender: 'ai',
    content: "Thank you for reaching out about your refund. I'll look into this right away. Could you please confirm the email address associated with your order?",
    time: "Yesterday",
    channel: "email"
  },
  {
    id: "wmsg1",
    customerId: "customer-3",
    sender: 'customer',
    content: "Hi there, I wanted to know when my subscription will renew? I'm currently on the monthly plan.",
    time: "2 days ago",
    channel: "whatsapp"
  },
  {
    id: "smsg3",
    customerId: "customer-4",
    sender: 'customer',
    content: "Need to change shipping address for order #78901 to 123 New Street, Cityville, State 54321",
    time: "Jul 12",
    channel: "sms"
  },
  {
    id: "smsg4",
    customerId: "customer-4",
    sender: 'human',
    content: "I've updated the shipping address for your order #78901. Thank you for letting us know before it shipped!",
    time: "Jul 12",
    channel: "sms"
  },
];

export const savedReplies = [
  { id: "reply1", keyword: "hello", text: "Hello! How can I assist you today?" },
  { id: "reply2", keyword: "thanks", text: "Thank you for reaching out to us. We appreciate your business!" },
  { id: "reply3", keyword: "refund", text: "I understand you're asking about a refund. Let me check the status of that for you." },
  { id: "reply4", keyword: "shipping", text: "Your order is currently being processed and will be shipped within 1-2 business days." },
  { id: "reply5", keyword: "payment", text: "We accept all major credit cards, PayPal, and Apple Pay as payment methods." },
  { id: "reply6", keyword: "hours", text: "Our customer support team is available Monday to Friday, 9 AM to 6 PM EST." },
  { id: "reply7", keyword: "discount", text: "We currently have a 15% discount for first-time customers. Use code WELCOME15 at checkout." },
  { id: "reply8", keyword: "contact", text: "You can reach our support team at support@example.com or call us at 1-800-123-4567." }
];

export const queueStats = {
  currentPosition: 3,
  estimatedWaitTime: "5 minutes",
  agentsAvailable: 2,
  totalInQueue: 7,
  maxConcurrentChats: 3
};
