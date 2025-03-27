
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  Search, 
  Filter, 
  Clock, 
  RefreshCcw, 
  Tag, 
  ArrowUp, 
  ArrowDown,
  User,
  Edit,
  PlusCircle,
} from "lucide-react";
import { TicketList } from "@/components/support/TicketList";
import { TicketDetails } from "@/components/support/TicketDetails";
import { UserDetails } from "@/components/support/UserDetails";
import { ChatFlowDesigner } from "@/components/support/ChatFlowDesigner";
import { SupportTicket, SupportMessage, SupportUser, ChatBotFlow } from "@/types/support";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const mockTickets: SupportTicket[] = [
  {
    id: "ticket-001",
    subject: "Setup assistance for chatbot",
    description: "I'm having trouble setting up the chatbot for my website. I've followed the documentation but the widget isn't appearing correctly.",
    status: "in-progress",
    priority: "medium",
    createdAt: "2023-04-10T14:30:00Z",
    updatedAt: "2023-04-11T09:15:00Z",
    userId: "user-123",
    assigneeId: "agent-456",
    department: "technical",
    tags: ["chatbot", "setup"]
  },
  {
    id: "ticket-002",
    subject: "API integration questions",
    description: "I need help understanding how to integrate your API with our custom CRM system. Are there any specific requirements or limitations?",
    status: "open",
    priority: "low",
    createdAt: "2023-04-12T10:45:00Z", 
    updatedAt: "2023-04-12T10:45:00Z",
    userId: "user-456",
    department: "technical",
    tags: ["api", "integration"]
  },
  {
    id: "ticket-003",
    subject: "Billing inquiry",
    description: "I was charged twice for my subscription this month. Can you please check and refund the extra payment?",
    status: "open",
    priority: "high",
    createdAt: "2023-04-11T08:20:00Z",
    updatedAt: "2023-04-11T08:20:00Z",
    userId: "user-789",
    department: "billing",
    tags: ["billing", "payment"]
  },
  {
    id: "ticket-004",
    subject: "Feature request: Multiple language support",
    description: "I'd like to request support for multiple languages in the chatbot. Our customers are international and we need to serve them in their native languages.",
    status: "open",
    priority: "medium",
    createdAt: "2023-04-10T15:10:00Z",
    updatedAt: "2023-04-10T15:10:00Z",
    userId: "user-101",
    department: "general",
    tags: ["feature-request", "languages"]
  },
  {
    id: "ticket-005",
    subject: "Account upgrade assistance",
    description: "I want to upgrade from the Basic plan to the Pro plan, but I have some questions about the transition process and what happens to my existing data.",
    status: "resolved",
    priority: "medium",
    createdAt: "2023-04-09T11:25:00Z",
    updatedAt: "2023-04-10T13:40:00Z",
    userId: "user-202",
    assigneeId: "agent-789",
    department: "sales",
    tags: ["account", "upgrade"]
  },
  {
    id: "ticket-006",
    subject: "Website integration error",
    description: "After updating my website theme, the chatbot is no longer visible. I'm getting a JavaScript error in the console related to your widget.",
    status: "closed",
    priority: "urgent",
    createdAt: "2023-04-08T09:15:00Z",
    updatedAt: "2023-04-09T16:30:00Z",
    userId: "user-303",
    assigneeId: "agent-456",
    department: "technical",
    tags: ["website", "javascript", "error"]
  },
  {
    id: "ticket-007",
    subject: "Data export request",
    description: "I need to export all my customer conversation data for compliance purposes. Is there a way to download this in a structured format?",
    status: "in-progress",
    priority: "high",
    createdAt: "2023-04-07T14:50:00Z",
    updatedAt: "2023-04-08T10:20:00Z",
    userId: "user-404",
    assigneeId: "agent-123",
    department: "technical",
    tags: ["data", "export", "compliance"]
  },
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
      createdAt: "2023-04-12T10:45:00Z",
      senderId: "user-456",
      senderType: "user",
      isRead: false
    }
  ],
  "ticket-003": [
    {
      id: "msg-006",
      ticketId: "ticket-003",
      content: "I was charged twice for my subscription this month. Can you please check and refund the extra payment?",
      createdAt: "2023-04-11T08:20:00Z",
      senderId: "user-789",
      senderType: "user",
      isRead: false
    }
  ]
};

const mockUsers: SupportUser[] = [
  {
    id: "user-123",
    name: "John Smith",
    email: "john.smith@example.com",
    type: "user",
    createdAt: "2023-01-15T10:30:00Z",
    lastActive: "2023-04-10T16:20:00Z",
    browser: "Chrome",
    os: "Windows 10",
    location: "New York, United States",
    ip: "192.168.1.1",
    timezone: "America/New_York",
    language: "English",
    company: "Acme Inc.",
    phone: "+1 (555) 123-4567"
  },
  {
    id: "user-456",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    type: "user",
    createdAt: "2023-02-20T14:45:00Z",
    lastActive: "2023-04-12T10:45:00Z",
    browser: "Firefox",
    os: "macOS",
    location: "London, United Kingdom",
    ip: "192.168.1.2",
    timezone: "Europe/London",
    language: "English",
    company: "Tech Solutions Ltd",
    phone: "+44 20 1234 5678"
  },
  {
    id: "user-789",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@example.com",
    type: "user",
    createdAt: "2023-03-05T09:15:00Z",
    lastActive: "2023-04-11T08:20:00Z",
    browser: "Safari",
    os: "iOS",
    location: "Madrid, Spain",
    ip: "192.168.1.3",
    timezone: "Europe/Madrid",
    language: "Spanish",
    company: "Global Services SA",
    phone: "+34 91 123 4567"
  }
];

const initialChatFlow: ChatBotFlow = {
  id: "flow-001",
  name: "Customer Support Flow",
  description: "Initial flow for handling customer support inquiries",
  nodes: [
    {
      id: "node-001",
      type: "start",
      content: "Start",
      nextNodes: ["node-002"]
    },
    {
      id: "node-002",
      type: "message",
      content: "Hello! How can I help you today?",
      nextNodes: ["node-003"]
    },
    {
      id: "node-003",
      type: "input",
      content: "What type of issue are you experiencing?",
      nextNodes: ["node-004", "node-005"]
    },
    {
      id: "node-004",
      type: "message",
      content: "I understand you're having a technical issue. Let me gather some more information to help you.",
      nextNodes: []
    },
    {
      id: "node-005",
      type: "message",
      content: "I'll connect you with our billing department to resolve your payment issue.",
      nextNodes: []
    }
  ],
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  language: "en"
};

const SupportRequests = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("tickets");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [messages, setMessages] = useState<Record<string, SupportMessage[]>>(mockMessages);
  const [users, setUsers] = useState<SupportUser[]>(mockUsers);
  const [chatFlow, setChatFlow] = useState<ChatBotFlow>(initialChatFlow);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setStatusPriority] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const selectedTicket = selectedTicketId
    ? tickets.find((ticket) => ticket.id === selectedTicketId)
    : null;

  const selectedUser = selectedUserId
    ? users.find((user) => user.id === selectedUserId)
    : null;

  const ticketMessages = selectedTicketId
    ? messages[selectedTicketId] || []
    : [];

  const userTickets = selectedUserId
    ? tickets.filter((ticket) => ticket.userId === selectedUserId)
    : [];

  const filteredTickets = tickets
    .filter((ticket) => {
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          ticket.subject.toLowerCase().includes(query) ||
          ticket.description?.toLowerCase().includes(query) ||
          ticket.id.toLowerCase().includes(query) ||
          ticket.userId.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter((ticket) => {
      // Apply status filter
      if (statusFilter) {
        return ticket.status === statusFilter;
      }
      return true;
    })
    .filter((ticket) => {
      // Apply priority filter
      if (priorityFilter) {
        return ticket.priority === priorityFilter;
      }
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicketId(ticket.id);
    setActiveTab("ticket-details");
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setActiveTab("user-details");
  };

  const handleBackToTickets = () => {
    setSelectedTicketId(null);
    setActiveTab("tickets");
  };

  const handleBackToUsers = () => {
    setSelectedUserId(null);
    setActiveTab("users");
  };

  const handleReplyToTicket = (message: string) => {
    if (!selectedTicketId) return;

    const newMessage: SupportMessage = {
      id: `msg-${Date.now().toString().slice(-6)}`,
      ticketId: selectedTicketId,
      content: message,
      createdAt: new Date().toISOString(),
      senderId: "agent-456",
      senderType: "agent",
      isRead: true
    };

    // Update the ticket status if it was open
    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicketId
        ? { 
            ...ticket, 
            updatedAt: new Date().toISOString(), 
            status: ticket.status === 'open' ? 'in-progress' : ticket.status,
            assigneeId: ticket.assigneeId || "agent-456"
          }
        : ticket
    );

    setTickets(updatedTickets);
    setMessages({
      ...messages,
      [selectedTicketId]: [...(messages[selectedTicketId] || []), newMessage]
    });
    
    toast({
      title: "Reply sent",
      description: "Your response has been sent to the customer.",
    });
  };

  const handleSaveChatFlow = (updatedFlow: ChatBotFlow) => {
    setChatFlow(updatedFlow);
    toast({
      title: "Flow saved",
      description: "The chatbot flow has been updated successfully.",
    });
  };

  const handleToggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Support Requests</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer support tickets and inquiries
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Tickets</span>
              <Badge variant="secondary" className="ml-1">{tickets.filter(t => t.status === 'open' || t.status === 'in-progress').length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="chatflow" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>Chat Flow</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Tag size={16} />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tickets">
            <Card className="p-6 border border-border/40">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input 
                    placeholder="Search tickets by ID, subject, or description..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={16} />
                        <span>Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("open")}>
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
                        In Progress
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("resolved")}>
                        Resolved
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("closed")}>
                        Closed
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setStatusPriority(null)}>
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusPriority("urgent")}>
                        Urgent
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusPriority("high")}>
                        High
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusPriority("medium")}>
                        Medium
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusPriority("low")}>
                        Low
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleToggleSort}
                  >
                    <Clock size={16} />
                    <span>Date</span>
                    {sortOrder === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter(null);
                      setStatusPriority(null);
                      setSortOrder("desc");
                    }}
                  >
                    <RefreshCcw size={16} />
                  </Button>
                </div>
              </div>
              
              <TicketList
                tickets={filteredTickets}
                onViewTicket={handleViewTicket}
              />
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
          
          <TabsContent value="users">
            <Card className="p-6 border border-border/40">
              <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="Search users..." className="pl-10" />
                </div>
                
                <Button className="flex items-center gap-2">
                  <PlusCircle size={16} />
                  <span>Add User</span>
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b">
                      <th className="font-medium py-3 px-4">User</th>
                      <th className="font-medium py-3 px-4">Email</th>
                      <th className="font-medium py-3 px-4">Created</th>
                      <th className="font-medium py-3 px-4">Last Activity</th>
                      <th className="font-medium py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border/40 hover:bg-muted/30">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-secondary w-8 h-8 rounded-full flex items-center justify-center">
                              <User size={16} />
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : "Never"}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => handleViewUser(user.id)}
                            >
                              <span>View</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Edit size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {users.length} users
                </p>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="user-details">
            {selectedUser && (
              <UserDetails
                user={selectedUser}
                tickets={userTickets}
                onBack={handleBackToUsers}
                onViewTicket={handleViewTicket}
                onEdit={() => {
                  toast({
                    title: "Edit user",
                    description: "User edit functionality coming soon.",
                  });
                }}
                onStartConversation={() => {
                  toast({
                    title: "Start conversation",
                    description: "Direct messaging functionality coming soon.",
                  });
                }}
              />
            )}
          </TabsContent>
          
          <TabsContent value="chatflow">
            <ChatFlowDesigner
              flow={chatFlow}
              onSave={handleSaveChatFlow}
            />
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="p-6 border border-border/40">
              <h3 className="text-lg font-medium mb-6">Support Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="p-4 border border-border/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Open Tickets</p>
                      <p className="text-3xl font-semibold mt-1">
                        {tickets.filter(t => t.status === 'open').length}
                      </p>
                    </div>
                    <div className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 p-2 rounded-full">
                      <MessageSquare size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {tickets.filter(t => t.status === 'open' && new Date(t.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length} new in last 24h
                  </p>
                </Card>
                
                <Card className="p-4 border border-border/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="text-3xl font-semibold mt-1">
                        {tickets.filter(t => t.status === 'in-progress').length}
                      </p>
                    </div>
                    <div className="bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 p-2 rounded-full">
                      <Clock size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Avg response time: 2.5 hours
                  </p>
                </Card>
                
                <Card className="p-4 border border-border/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Resolved</p>
                      <p className="text-3xl font-semibold mt-1">
                        {tickets.filter(t => t.status === 'resolved').length}
                      </p>
                    </div>
                    <div className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-2 rounded-full">
                      <MessageSquare size={20} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Avg resolution time: 8 hours
                  </p>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 border border-border/40">
                  <h4 className="text-sm font-medium mb-4">Tickets by Department</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Technical</span>
                        <span className="text-sm">
                          {tickets.filter(t => t.department === 'technical').length}
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full rounded-full" 
                          style={{ 
                            width: `${(tickets.filter(t => t.department === 'technical').length / tickets.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Billing</span>
                        <span className="text-sm">
                          {tickets.filter(t => t.department === 'billing').length}
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500 h-full rounded-full" 
                          style={{ 
                            width: `${(tickets.filter(t => t.department === 'billing').length / tickets.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Sales</span>
                        <span className="text-sm">
                          {tickets.filter(t => t.department === 'sales').length}
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-purple-500 h-full rounded-full" 
                          style={{ 
                            width: `${(tickets.filter(t => t.department === 'sales').length / tickets.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">General</span>
                        <span className="text-sm">
                          {tickets.filter(t => t.department === 'general').length}
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-orange-500 h-full rounded-full" 
                          style={{ 
                            width: `${(tickets.filter(t => t.department === 'general').length / tickets.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 border border-border/40">
                  <h4 className="text-sm font-medium mb-4">Tickets by Priority</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Urgent</span>
                        <span className="text-sm">
                          {tickets.filter(t => t.priority === 'urgent').length}
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-red-500 h-full rounded-full" 
                          style={{ 
                            width: `${(tickets.filter(t => t.priority === 'urgent').length / tickets.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">High</span>
                        <span className="text-sm">
                          {tickets.filter(t => t.priority === 'high').length}
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-orange-500 h-full rounded-full" 
                          style={{ 
                            width: `${(tickets.filter(t => t.priority === 'high').length / tickets.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Medium</span>
                        <span className="text-sm">
                          {tickets.filter(t => t.priority === 'medium').length}
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-yellow-500 h-full rounded-full" 
                          style={{ 
                            width: `${(tickets.filter(t => t.priority === 'medium').length / tickets.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Low</span>
                        <span className="text-sm">
                          {tickets.filter(t => t.priority === 'low').length}
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full rounded-full" 
                          style={{ 
                            width: `${(tickets.filter(t => t.priority === 'low').length / tickets.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SupportRequests;
