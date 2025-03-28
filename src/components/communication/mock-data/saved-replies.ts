
export interface SavedReply {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
}

export const mockSavedReplies: SavedReply[] = [
  {
    id: "reply-1",
    title: "Welcome Message",
    content: "Hello! Thank you for reaching out to us. How can I help you today?",
    category: "greeting",
    tags: ["welcome", "greeting"],
    createdAt: "2023-05-15T12:00:00Z"
  },
  {
    id: "reply-2",
    title: "Thank You for Your Patience",
    content: "Thank you for your patience while we look into this matter. I appreciate your understanding.",
    category: "courtesy",
    tags: ["thanks", "patience"],
    createdAt: "2023-05-16T10:30:00Z"
  },
  {
    id: "reply-3",
    title: "Technical Support Available",
    content: "If you're experiencing technical difficulties, our specialized support team is available 24/7. Would you like me to connect you with a technical expert?",
    category: "support",
    tags: ["technical", "support"],
    createdAt: "2023-05-17T09:45:00Z"
  },
  {
    id: "reply-4",
    title: "Request for More Information",
    content: "To better assist you, could you please provide more details about the issue you're experiencing? Screenshots or error messages would be very helpful if available.",
    category: "support",
    tags: ["information", "details"],
    createdAt: "2023-05-18T14:20:00Z"
  },
  {
    id: "reply-5",
    title: "Closing Message",
    content: "Is there anything else I can help you with today? If not, thank you for contacting us, and have a great day!",
    category: "closing",
    tags: ["closing", "goodbye"],
    createdAt: "2023-05-19T11:10:00Z"
  },
  {
    id: "reply-6",
    title: "Billing Question Response",
    content: "For billing inquiries, I recommend checking our billing FAQ page at example.com/billing-faq. If you still have questions, please provide your account number, and I'll look into it for you.",
    category: "billing",
    tags: ["billing", "payment"],
    createdAt: "2023-05-20T13:30:00Z"
  },
  {
    id: "reply-7",
    title: "Feature Request Acknowledgment",
    content: "Thank you for your feature suggestion! We value customer feedback and will forward your request to our product team for consideration in future updates.",
    category: "product",
    tags: ["feature", "feedback"],
    createdAt: "2023-05-21T10:00:00Z"
  }
];
