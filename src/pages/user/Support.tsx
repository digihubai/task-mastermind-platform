
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Phone, PlusCircle, Calendar, Clock, History, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewTicketForm } from "@/components/support/NewTicketForm";
import { TicketList } from "@/components/support/TicketList";
import { TicketDetails } from "@/components/support/TicketDetails";
import { SupportTicket, SupportMessage } from "@/types/support";
import { useToast } from "@/hooks/use-toast";

const mockTickets: SupportTicket[] = [
  {
    id: "ticket-001",
    subject: "Setup assistance for chatbot",
    description: "I'm having trouble setting up the chatbot for my website. I've followed the documentation but the widget isn't appearing correctly.",
    status: "in_progress",
    priority: "medium",
    createdAt: "2023-04-10T14:30:00Z",
    updatedAt: "2023-04-11T09:15:00Z",
    userId: "user-123",
    department: "technical",
    tags: ["chatbot", "setup"]
  },
  {
    id: "ticket-002",
    subject: "API integration questions",
    description: "I need help understanding how to integrate your API with our custom CRM system. Are there any specific requirements or limitations?",
    status: "resolved",
    priority: "medium",
    createdAt: "2023-04-07T10:45:00Z", 
    updatedAt: "2023-04-08T16:20:00Z",
    userId: "user-123",
    department: "technical",
    tags: ["api", "integration"]
  },
  {
    id: "ticket-003",
    subject: "Billing inquiry",
    description: "I was charged twice for my subscription this month. Can you please check and refund the extra payment?",
    status: "resolved",
    priority: "high",
    createdAt: "2023-04-03T08:20:00Z",
    updatedAt: "2023-04-04T11:30:00Z",
    userId: "user-123",
    department: "billing",
    tags: ["billing", "payment"]
  }
];

const mockMessages: Record<string, SupportMessage[]> = {
  "ticket-001": [
    {
      id: "msg-001",
      ticketId: "ticket-001",
      content: "I'm having trouble setting up the chatbot for my website. I've followed the documentation but the widget isn't appearing correctly.",
      createdAt: "2023-04-10T14:30:00Z",
      senderId: "user-123",
      senderType: "user",
      isRead: true
    },
    {
      id: "msg-002",
      ticketId: "ticket-001",
      content: "Thank you for reaching out. Could you please share which integration method you're using (JavaScript snippet, WordPress plugin, etc.) and which browser you're testing with?",
      createdAt: "2023-04-10T15:45:00Z",
      senderId: "agent-456",
      senderType: "agent",
      isRead: true
    },
    {
      id: "msg-003",
      ticketId: "ticket-001",
      content: "I'm using the JavaScript snippet method and testing with Chrome. I've put the code in the <head> section as instructed, but nothing shows up.",
      createdAt: "2023-04-10T16:20:00Z",
      senderId: "user-123",
      senderType: "user",
      isRead: true
    },
    {
      id: "msg-004",
      ticketId: "ticket-001",
      content: "I've checked your account and noticed that the chatbot hasn't been fully configured yet. You'll need to complete the setup in the dashboard by setting up at least one initial message. I'll guide you through this process.",
      createdAt: "2023-04-11T09:15:00Z",
      senderId: "agent-456",
      senderType: "agent",
      isRead: true
    }
  ],
  "ticket-002": [
    {
      id: "msg-005",
      ticketId: "ticket-002",
      content: "I need help understanding how to integrate your API with our custom CRM system. Are there any specific requirements or limitations?",
      createdAt: "2023-04-07T10:45:00Z",
      senderId: "user-123",
      senderType: "user",
      isRead: true
    },
    {
      id: "msg-006",
      ticketId: "ticket-002",
      content: "Hello! I'd be happy to help with your API integration. Our API uses standard REST endpoints with JSON payloads. For CRM integrations, you'll want to focus on our Contacts and Conversations endpoints. There's a rate limit of 100 requests per minute, and each request requires authentication via API key or OAuth. Is there a specific part of the integration you're concerned about?",
      createdAt: "2023-04-07T11:30:00Z",
      senderId: "agent-789",
      senderType: "agent",
      isRead: true
    },
    {
      id: "msg-007",
      ticketId: "ticket-002",
      content: "Thanks for the quick response. I'm mainly concerned about real-time updates. Does your API support webhooks or some other way to get notified when new messages arrive?",
      createdAt: "2023-04-07T13:15:00Z",
      senderId: "user-123",
      senderType: "user",
      isRead: true
    },
    {
      id: "msg-008",
      ticketId: "ticket-002",
      content: "Yes, we do support webhooks for real-time updates. You can configure them in the API settings section of your dashboard. You can subscribe to events like 'new_message', 'conversation_assigned', etc. I've attached our webhook documentation for reference. Let me know if you need any clarification!",
      createdAt: "2023-04-08T09:20:00Z",
      senderId: "agent-789",
      senderType: "agent",
      isRead: true
    },
    {
      id: "msg-009",
      ticketId: "ticket-002",
      content: "Perfect, the webhook documentation is very helpful. I've set everything up and it's working now. Thank you for your assistance!",
      createdAt: "2023-04-08T15:45:00Z",
      senderId: "user-123",
      senderType: "user",
      isRead: true
    },
    {
      id: "msg-010",
      ticketId: "ticket-002",
      content: "You're welcome! I'm glad to hear it's working for you now. If you run into any other issues or have additional questions, don't hesitate to reach out. I'll mark this ticket as resolved, but feel free to reopen it if needed.",
      createdAt: "2023-04-08T16:20:00Z",
      senderId: "agent-789",
      senderType: "agent",
      isRead: true
    }
  ],
  "ticket-003": [
    {
      id: "msg-011",
      ticketId: "ticket-003",
      content: "I was charged twice for my subscription this month. Can you please check and refund the extra payment?",
      createdAt: "2023-04-03T08:20:00Z",
      senderId: "user-123",
      senderType: "user",
      isRead: true
    },
    {
      id: "msg-012",
      ticketId: "ticket-003",
      content: "I apologize for the inconvenience. I'm checking your billing records now. Could you please confirm which subscription plan you're on and the approximate dates of the charges?",
      createdAt: "2023-04-03T09:10:00Z",
      senderId: "agent-101",
      senderType: "agent",
      isRead: true
    },
    {
      id: "msg-013",
      ticketId: "ticket-003",
      content: "I'm on the Pro plan, and I was charged on April 1st and again on April 2nd. Both charges are for $49.99.",
      createdAt: "2023-04-03T09:45:00Z",
      senderId: "user-123",
      senderType: "user",
      isRead: true
    },
    {
      id: "msg-014",
      ticketId: "ticket-003",
      content: "Thank you for that information. I can confirm that there was a duplicate charge due to a system error on our end. I've processed a refund for the second charge of $49.99, which should appear in your account within 3-5 business days. I've also added a 20% discount coupon to your account for next month as a goodwill gesture for the inconvenience caused.",
      createdAt: "2023-04-04T11:30:00Z",
      senderId: "agent-101",
      senderType: "agent",
      isRead: true
    },
    {
      id: "msg-015",
      ticketId: "ticket-003",
      content: "Thank you for resolving this quickly and for the discount. I appreciate it!",
      createdAt: "2023-04-04T14:15:00Z",
      senderId: "user-123",
      senderType: "user",
      isRead: true
    }
  ]
};

const Support = () => {
  const { toast } = useToast();
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("support-options");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [messages, setMessages] = useState<Record<string, SupportMessage[]>>(mockMessages);

  const selectedTicket = selectedTicketId
    ? tickets.find((ticket) => ticket.id === selectedTicketId)
    : null;

  const ticketMessages = selectedTicketId
    ? messages[selectedTicketId] || []
    : [];

  const handleCreateTicket = (values: any) => {
    const newTicket: SupportTicket = {
      id: `ticket-${Date.now().toString().slice(-6)}`,
      subject: values.subject,
      description: values.description,
      status: "open",
      priority: values.priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "user-123",
      department: values.department,
      tags: []
    };

    const newMessage: SupportMessage = {
      id: `msg-${Date.now().toString().slice(-6)}`,
      ticketId: newTicket.id,
      content: values.description,
      createdAt: new Date().toISOString(),
      senderId: "user-123",
      senderType: "user",
      isRead: true
    };

    setTickets([newTicket, ...tickets]);
    setMessages({
      ...messages,
      [newTicket.id]: [newMessage]
    });

    setTicketDialogOpen(false);
    setActiveTab("my-tickets");
    
    toast({
      title: "Ticket created",
      description: "Your support ticket has been created successfully.",
    });
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicketId(ticket.id);
    setActiveTab("ticket-details");
  };

  const handleBackToTickets = () => {
    setSelectedTicketId(null);
    setActiveTab("my-tickets");
  };

  const handleReplyToTicket = (message: string) => {
    if (!selectedTicketId) return;

    const newMessage: SupportMessage = {
      id: `msg-${Date.now().toString().slice(-6)}`,
      ticketId: selectedTicketId,
      content: message,
      createdAt: new Date().toISOString(),
      senderId: "user-123",
      senderType: "user",
      isRead: false
    };

    const updatedTicket = tickets.map(ticket => 
      ticket.id === selectedTicketId
        ? { ...ticket, updatedAt: new Date().toISOString(), status: ticket.status === 'closed' ? 'open' : ticket.status }
        : ticket
    );

    setTickets(updatedTicket);
    setMessages({
      ...messages,
      [selectedTicketId]: [...(messages[selectedTicketId] || []), newMessage]
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Support</h1>
            <p className="text-muted-foreground mt-1">
              Get help and support for your account
            </p>
          </div>
          
          <Button 
            onClick={() => setTicketDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle size={18} />
            <span>New Support Ticket</span>
          </Button>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="support-options">Support Options</TabsTrigger>
            <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
          </TabsList>
          
          <TabsContent value="support-options" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 border border-border/40 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageSquare size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Chat with our support team in real-time
                </p>
                <Button variant="outline" className="w-full">Start Chat</Button>
              </Card>
              
              <Card className="p-6 border border-border/40 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">Knowledge Base</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Browse tutorials and documentation
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab("knowledge-base")}
                >
                  Browse Articles
                </Button>
              </Card>
              
              <Card className="p-6 border border-border/40 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">Contact Us</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Get in touch via email or phone
                </p>
                <Button variant="outline" className="w-full">Contact Options</Button>
              </Card>
            </div>
            
            <Card className="p-6 border border-border/40">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recent Activities</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => setActiveTab("my-tickets")}
                >
                  <span>View All</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
              
              <div className="space-y-4">
                {tickets.slice(0, 3).map((ticket) => (
                  <div key={ticket.id} className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0">
                    <div className="bg-secondary rounded-full p-2">
                      {ticket.status === 'open' || ticket.status === 'in_progress' ? (
                        <Clock size={18} className="text-blue-500" />
                      ) : (
                        <History size={18} className="text-green-500" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(ticket.updatedAt).toLocaleDateString()} · {ticket.department}
                          </p>
                        </div>
                        
                        <Badge variant="outline" className={
                          ticket.status === 'open' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          ticket.status === 'in_progress' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                          ticket.status === 'resolved' ? 'bg-green-50 text-green-800 border-green-200' :
                          'bg-gray-50 text-gray-800 border-gray-200'
                        }>
                          {ticket.status === 'in_progress' ? 'In Progress' : 
                           ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="my-tickets">
            {selectedTicketId && activeTab === "ticket-details" ? (
              <TicketDetails
                ticket={selectedTicket!}
                messages={ticketMessages}
                onBack={handleBackToTickets}
                onReply={handleReplyToTicket}
              />
            ) : (
              <TicketList 
                tickets={tickets} 
                onViewTicket={handleViewTicket} 
              />
            )}
          </TabsContent>
          
          <TabsContent value="knowledge-base" className="space-y-6">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Popular Articles</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md hover:border-primary/50 transition-colors cursor-pointer">
                  <h4 className="font-medium">Getting Started Guide</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn the basics of setting up your account and workspace
                  </p>
                </div>
                
                <div className="p-4 border rounded-md hover:border-primary/50 transition-colors cursor-pointer">
                  <h4 className="font-medium">API Documentation</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Comprehensive guide to our API endpoints and usage
                  </p>
                </div>
                
                <div className="p-4 border rounded-md hover:border-primary/50 transition-colors cursor-pointer">
                  <h4 className="font-medium">Chatbot Configuration</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    How to set up and customize your AI chatbot
                  </p>
                </div>
                
                <div className="p-4 border rounded-md hover:border-primary/50 transition-colors cursor-pointer">
                  <h4 className="font-medium">Billing & Subscriptions</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Understanding your billing cycle and subscription options
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 text-center border rounded-md hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex justify-center mb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <FileText size={20} className="text-primary" />
                    </div>
                  </div>
                  <h4 className="font-medium">Getting Started</h4>
                  <p className="text-xs text-muted-foreground mt-1">12 articles</p>
                </div>
                
                <div className="p-4 text-center border rounded-md hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex justify-center mb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MessageSquare size={20} className="text-primary" />
                    </div>
                  </div>
                  <h4 className="font-medium">Chatbot & AI</h4>
                  <p className="text-xs text-muted-foreground mt-1">28 articles</p>
                </div>
                
                <div className="p-4 text-center border rounded-md hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex justify-center mb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar size={20} className="text-primary" />
                    </div>
                  </div>
                  <h4 className="font-medium">Billing</h4>
                  <p className="text-xs text-muted-foreground mt-1">8 articles</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 border border-border/40">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recently Updated</h3>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <span>View All</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">New AI Features Released</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Learn about our latest AI capabilities and how to use them
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>Updated 2 days ago</span>
                  </div>
                </div>
                
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Webhook Integration Guide</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    How to set up webhooks for real-time notifications
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>Updated 5 days ago</span>
                  </div>
                </div>
                
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Mobile App Setup Instructions</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure your account for the mobile application
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>Updated 1 week ago</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="ticket-details">
            {selectedTicket && (
              <TicketDetails
                ticket={selectedTicket}
                messages={ticketMessages}
                onBack={handleBackToTickets}
                onReply={handleReplyToTicket}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <NewTicketForm
        open={ticketDialogOpen}
        onOpenChange={setTicketDialogOpen}
        onSubmit={handleCreateTicket}
      />
    </AppLayout>
  );
};

export default Support;
