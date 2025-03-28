
import type { Message } from "@/types/omnichannel";

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
