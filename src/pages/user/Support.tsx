
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { TicketList } from "@/components/support/TicketList";
import { TicketDetails } from "@/components/support/TicketDetails";
import { NewTicketForm } from "@/components/support/NewTicketForm";
import { SupportTicket, SupportMessage } from "@/types/support";
import { toast } from "sonner";

const Support = () => {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  
  // Sample data
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "ticket-1",
      subject: "Login issue on mobile app",
      description: "I'm unable to log in to the mobile app. It keeps showing an error message.",
      status: "open",
      priority: "high",
      category: "technical",
      createdAt: "2023-08-15T14:30:00Z",
      updatedAt: "2023-08-15T14:30:00Z",
      userId: "user-1",
      department: "Engineering",
      tags: ["mobile", "login"],
      messages: []
    },
    {
      id: "ticket-2",
      subject: "Billing question about subscription",
      description: "I have a question about my recent subscription charge.",
      status: "in_progress",
      priority: "medium",
      category: "billing",
      createdAt: "2023-08-12T09:15:00Z",
      updatedAt: "2023-08-14T11:20:00Z",
      userId: "user-1",
      department: "Billing",
      tags: ["subscription", "charge"],
      messages: []
    },
    {
      id: "ticket-3",
      subject: "Feature request: dark mode",
      description: "Would it be possible to add dark mode to the dashboard?",
      status: "closed",
      priority: "low",
      category: "feature",
      createdAt: "2023-08-05T16:45:00Z",
      updatedAt: "2023-08-10T13:30:00Z",
      userId: "user-1",
      department: "Product",
      tags: ["feature", "UI"],
      messages: []
    }
  ]);
  
  const [messages, setMessages] = useState<Record<string, SupportMessage[]>>({
    "ticket-1": [
      {
        id: "msg-1",
        ticketId: "ticket-1",
        content: "I'm unable to log in to the mobile app. It keeps showing an error message saying 'Authentication failed'. I've tried resetting my password but it still doesn't work.",
        createdAt: "2023-08-15T14:30:00Z",
        senderId: "user-1",
        senderType: "user",
        isRead: true,
        userId: "user-1",
        isInternal: false
      },
      {
        id: "msg-2",
        ticketId: "ticket-1",
        content: "I'm sorry to hear you're having trouble logging in. Could you please tell me what version of the mobile app you're using and what type of device?",
        createdAt: "2023-08-15T15:10:00Z",
        senderId: "agent-1",
        senderType: "agent",
        isRead: true,
        userId: "agent-1",
        isInternal: false
      },
      {
        id: "msg-3",
        ticketId: "ticket-1",
        content: "I'm using version 2.3.0 on an iPhone 12 with the latest iOS update.",
        createdAt: "2023-08-15T15:25:00Z",
        senderId: "user-1",
        senderType: "user",
        isRead: true,
        userId: "user-1",
        isInternal: false
      },
      {
        id: "msg-4",
        ticketId: "ticket-1",
        content: "Thank you for providing that information. We've identified an issue with that specific version on iOS. We're working on a fix and expect to release an update within 24 hours. In the meantime, you can log in through the web browser on your phone.",
        createdAt: "2023-08-15T15:45:00Z",
        senderId: "agent-1",
        senderType: "agent",
        isRead: true,
        userId: "agent-1",
        isInternal: false
      }
    ],
    "ticket-2": [
      {
        id: "msg-5",
        ticketId: "ticket-2",
        content: "I noticed a charge for $29.99 on my account, but I thought my plan was $19.99 per month. Can you explain this difference?",
        createdAt: "2023-08-12T09:15:00Z",
        senderId: "user-1",
        senderType: "user",
        isRead: true,
        userId: "user-1",
        isInternal: false
      },
      {
        id: "msg-6",
        ticketId: "ticket-2",
        content: "I'll look into this for you right away. Let me check your billing records.",
        createdAt: "2023-08-14T11:20:00Z",
        senderId: "agent-2",
        senderType: "agent",
        isRead: true,
        userId: "agent-2",
        isInternal: false
      }
    ],
    "ticket-3": [
      {
        id: "msg-7",
        ticketId: "ticket-3",
        content: "Would it be possible to add dark mode to the dashboard? It would be easier on the eyes when working late at night.",
        createdAt: "2023-08-05T16:45:00Z",
        senderId: "user-1",
        senderType: "user",
        isRead: true,
        userId: "user-1",
        isInternal: false
      },
      {
        id: "msg-8",
        ticketId: "ticket-3",
        content: "Thanks for the suggestion! We've actually been planning to add dark mode. I've added your request to our feature tracker.",
        createdAt: "2023-08-07T10:30:00Z",
        senderId: "agent-3",
        senderType: "agent",
        isRead: true,
        userId: "agent-3",
        isInternal: false
      },
      {
        id: "msg-9",
        ticketId: "ticket-3",
        content: "Just wanted to let you know that we've implemented dark mode in our latest update. You can enable it in your account settings.",
        createdAt: "2023-08-10T13:30:00Z",
        senderId: "agent-3",
        senderType: "agent",
        isRead: true,
        userId: "agent-3",
        isInternal: false
      },
      {
        id: "msg-10",
        ticketId: "ticket-3",
        content: "That's great news! I've just updated and enabled dark mode. It looks fantastic, thank you!",
        createdAt: "2023-08-10T14:15:00Z",
        senderId: "user-1",
        senderType: "user",
        isRead: true,
        userId: "user-1",
        isInternal: false
      }
    ]
  });
  
  const handleSelectTicket = (ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      // Inject messages into the ticket
      setSelectedTicket({
        ...ticket,
        messages: messages[ticketId] || []
      });
      setShowNewTicketForm(false);
    }
  };
  
  const handleCreateTicket = (newTicket: Partial<SupportTicket>) => {
    const ticketId = `ticket-${Date.now()}`;
    const now = new Date().toISOString();
    
    const ticket: SupportTicket = {
      id: ticketId,
      subject: newTicket.subject || "Untitled Ticket",
      description: newTicket.description || "",
      status: "open",
      priority: newTicket.priority || "medium",
      category: newTicket.category || "general",
      createdAt: now,
      updatedAt: now,
      userId: "user-1",
      department: newTicket.department || "Support",
      tags: newTicket.tags || [],
      messages: []
    };
    
    const message: SupportMessage = {
      id: `msg-${Date.now()}`,
      ticketId: ticketId,
      content: newTicket.description || "",
      createdAt: now,
      senderId: "user-1",
      senderType: "user",
      isRead: true,
      userId: "user-1",
      isInternal: false
    };
    
    setTickets([ticket, ...tickets]);
    setMessages({
      ...messages,
      [ticketId]: [message]
    });
    
    setShowNewTicketForm(false);
    toast.success("Support ticket created successfully");
  };
  
  const handleReply = (content: string) => {
    if (!selectedTicket) return;
    
    const newMessage: SupportMessage = {
      id: `msg-${Date.now()}`,
      ticketId: selectedTicket.id,
      content,
      createdAt: new Date().toISOString(),
      senderId: "user-1",
      senderType: "user",
      isRead: false,
      userId: "user-1",
      isInternal: false
    };
    
    const updatedMessages = [
      ...(messages[selectedTicket.id] || []),
      newMessage
    ];
    
    setMessages({
      ...messages,
      [selectedTicket.id]: updatedMessages
    });
    
    if (selectedTicket.status === "closed") {
      // Reopen ticket when user replies to a closed ticket
      const updatedTickets = tickets.map(t => 
        t.id === selectedTicket.id ? { ...t, status: "open", updatedAt: new Date().toISOString() } : t
      );
      setTickets(updatedTickets);
      setSelectedTicket({
        ...selectedTicket,
        status: "open",
        updatedAt: new Date().toISOString(),
        messages: updatedMessages
      });
    } else {
      setSelectedTicket({
        ...selectedTicket,
        updatedAt: new Date().toISOString(),
        messages: updatedMessages
      });
    }
  };
  
  return (
    <AppLayout>
      <div className="p-6">
        {selectedTicket ? (
          <TicketDetails 
            ticket={selectedTicket}
            messages={selectedTicket.messages}
            onBack={() => setSelectedTicket(null)}
            onReply={handleReply}
          />
        ) : showNewTicketForm ? (
          <NewTicketForm 
            onSubmit={handleCreateTicket}
            onCancel={() => setShowNewTicketForm(false)}
          />
        ) : (
          <TicketList 
            tickets={tickets}
            onSelectTicket={handleSelectTicket}
            onNewTicket={() => setShowNewTicketForm(true)}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Support;
