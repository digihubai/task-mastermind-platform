
import React, { useState, useMemo } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, ArrowLeft, Filter, ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketList } from "@/components/support/TicketList";
import { TicketDetails } from "@/components/support/TicketDetails";
import { NewTicketForm } from "@/components/support/NewTicketForm";
import { QueueManagement } from "@/components/support/QueueManagement";
import { SupportTicket } from "@/types/support";
import { useToast } from "@/hooks/use-toast";
import { mockQueues } from "@/components/support/mock-data/queues";
import { mockAgents } from "@/components/support/mock-data/agents";
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
import { Badge } from "@/components/ui/badge";

const mockTickets: SupportTicket[] = [
  {
    id: "ticket-001",
    subject: "Setup assistance for chatbot",
    description: "I'm having trouble setting up the chatbot for my website. I've followed the documentation but the widget isn't appearing correctly.",
    status: "in_progress",
    priority: "medium",
    category: "technical",
    createdAt: "2023-04-10T14:30:00Z",
    updatedAt: "2023-04-11T09:15:00Z",
    userId: "user-123",
    assignedTo: "agent-456",
    department: "technical",
    tags: ["chatbot", "setup"],
    messages: [
      {
        id: "msg-1",
        ticketId: "ticket-001",
        content: "I've been trying to set up the chatbot following your documentation, but it's not showing up on my site.",
        createdAt: "2023-04-10T14:30:00Z",
        userId: "user-123",
        senderId: "user-123",
        senderType: "customer",
        isInternal: false,
        isRead: true
      },
      {
        id: "msg-2",
        ticketId: "ticket-001",
        content: "Could you tell me which browser and website you're using? I'll check the compatibility issues.",
        createdAt: "2023-04-11T09:15:00Z",
        userId: "agent-456",
        senderId: "agent-456",
        senderType: "agent",
        isInternal: false,
        isRead: true
      }
    ]
  },
  {
    id: "ticket-002",
    subject: "API integration questions",
    description: "I need help understanding how to integrate your API with our custom CRM system. Are there any specific requirements or limitations?",
    status: "open",
    priority: "low",
    category: "integration",
    createdAt: "2023-04-12T10:45:00Z", 
    updatedAt: "2023-04-12T10:45:00Z",
    userId: "user-456",
    department: "technical",
    tags: ["api", "integration"],
    messages: [
      {
        id: "msg-3",
        ticketId: "ticket-002",
        content: "I'm trying to integrate your API with our custom CRM. Do you have any specific requirements?",
        createdAt: "2023-04-12T10:45:00Z",
        userId: "user-456",
        senderId: "user-456",
        senderType: "customer",
        isInternal: false,
        isRead: true
      }
    ]
  },
  {
    id: "ticket-003",
    subject: "Billing inquiry",
    description: "I was charged twice for my subscription this month. Can you please check and refund the extra payment?",
    status: "open",
    priority: "high",
    category: "billing",
    createdAt: "2023-04-11T08:20:00Z",
    updatedAt: "2023-04-11T08:20:00Z",
    userId: "user-789",
    department: "billing",
    tags: ["billing", "payment"],
    messages: [
      {
        id: "msg-4",
        ticketId: "ticket-003",
        content: "I noticed I was charged twice this month for my subscription. Could you please check and refund the extra payment?",
        createdAt: "2023-04-11T08:20:00Z",
        userId: "user-789",
        senderId: "user-789",
        senderType: "customer",
        isInternal: false,
        isRead: true
      }
    ]
  }
];

const TicketsPage: React.FC = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [dashboardTab, setDashboardTab] = useState('tickets');

  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [agentFilter, setAgentFilter] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => 
    [...new Set(tickets.map(ticket => ticket.category).filter(Boolean))], [tickets]
  );
  
  const departments = useMemo(() => 
    [...new Set(tickets.map(ticket => ticket.department).filter(Boolean))], [tickets]
  );
  
  const priorities = useMemo(() => 
    [...new Set(tickets.map(ticket => ticket.priority).filter(Boolean))], [tickets]
  );

  const assignedAgents = useMemo(() => {
    const agentIds = [...new Set(tickets
      .filter(ticket => ticket.assignedTo)
      .map(ticket => ticket.assignedTo as string))];
      
    return agentIds.map(id => {
      const agent = mockAgents.find(a => a.id === id);
      return { id, name: agent ? agent.name : 'Unknown' };
    });
  }, [tickets]);

  const handleCreateTicket = (newTicket: Partial<SupportTicket>) => {
    const ticket: SupportTicket = {
      ...newTicket,
      id: `ticket-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'open',
      messages: [],
      tags: newTicket.tags || [],
      userId: 'user-current'
    } as SupportTicket;
    
    setTickets([ticket, ...tickets]);
    setShowNewTicketForm(false);
    
    toast({
      title: "Ticket created",
      description: "Your support ticket has been submitted successfully."
    });
  };

  const handleTicketClick = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
  };

  const handleBackToList = () => {
    setSelectedTicket(null);
  };

  const handleSendReply = (message: string) => {
    if (!selectedTicket || !message.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      ticketId: selectedTicket.id,
      content: message,
      createdAt: new Date().toISOString(),
      userId: 'agent-current',
      senderId: 'agent-current',
      senderType: 'agent',
      isInternal: false,
      isRead: true
    };

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
      updatedAt: new Date().toISOString()
    };

    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    );

    setTickets(updatedTickets);
    setSelectedTicket(updatedTicket);
    
    toast({
      title: "Reply sent",
      description: "Your response has been added to the ticket."
    });
  };

  const handleUpdateTicket = (ticketId: string, updateData: Partial<SupportTicket>) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const updatedTicket = { 
          ...ticket, 
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        setSelectedTicket(updatedTicket);
        return updatedTicket;
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    toast({
      title: "Ticket updated",
      description: `Ticket ${updateData.status || updateData.priority ? 'status' : 'details'} has been updated.`
    });
  };

  const toggleSortOrder = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter(null);
    setPriorityFilter(null);
    setCategoryFilter(null);
    setAgentFilter(null);
    setDepartmentFilter(null);
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const subjectMatch = ticket.subject.toLowerCase().includes(query);
        const descriptionMatch = ticket.description.toLowerCase().includes(query);
        if (!subjectMatch && !descriptionMatch) {
          return false;
        }
      }
      
      if (activeTab !== 'all' && ticket.status !== activeTab) {
        return false;
      }
      
      if (priorityFilter && priorityFilter !== "all" && ticket.priority !== priorityFilter) {
        return false;
      }
      
      // Fixed category filter to properly compare lowercase values
      if (categoryFilter && categoryFilter !== "all") {
        // Compare lowercase values to make matching case-insensitive
        if (ticket.category?.toLowerCase() !== categoryFilter.toLowerCase()) {
          return false;
        }
      }
      
      // Fixed department filter to properly compare lowercase values
      if (departmentFilter && departmentFilter !== "all") {
        // Compare lowercase values to make matching case-insensitive
        if (ticket.department?.toLowerCase() !== departmentFilter.toLowerCase()) {
          return false;
        }
      }
      
      if (agentFilter && agentFilter !== "all" && ticket.assignedTo !== agentFilter) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      if (!(sortField in a) || !(sortField in b)) {
        return 0;
      }
      
      if (sortField === 'createdAt' || sortField === 'updatedAt') {
        const dateA = new Date(a[sortField as keyof SupportTicket] as string).getTime();
        const dateB = new Date(b[sortField as keyof SupportTicket] as string).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (sortField === 'priority') {
        const priorityValues = { 'low': 1, 'medium': 2, 'high': 3, 'urgent': 4 };
        const priorityA = priorityValues[a.priority as keyof typeof priorityValues] || 0;
        const priorityB = priorityValues[b.priority as keyof typeof priorityValues] || 0;
        return sortOrder === 'asc' ? priorityA - priorityB : priorityB - priorityA;
      }
      
      const valueA = String(a[sortField as keyof SupportTicket]);
      const valueB = String(b[sortField as keyof SupportTicket]);
      
      return sortOrder === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }, [
    tickets, 
    searchQuery, 
    activeTab, 
    priorityFilter, 
    categoryFilter, 
    departmentFilter, 
    agentFilter,
    sortField,
    sortOrder
  ]);

  if (selectedTicket) {
    return (
      <AppLayout showModuleName moduleName="Support Tickets">
        <div className="space-y-6">
          <Button variant="ghost" onClick={handleBackToList} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tickets
          </Button>
          
          <div className="bg-background rounded-lg p-6 border">
            <TicketDetails 
              ticket={selectedTicket}
              onReply={handleSendReply}
              onUpdateTicket={handleUpdateTicket}
            />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showModuleName moduleName="Support Tickets">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Support Tickets</h1>
          <Button onClick={() => setShowNewTicketForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Internal Ticket
          </Button>
        </div>

        {showNewTicketForm ? (
          <NewTicketForm 
            onSubmit={handleCreateTicket} 
            onCancel={() => setShowNewTicketForm(false)} 
          />
        ) : (
          <>
            <Tabs defaultValue="tickets" value={dashboardTab} onValueChange={setDashboardTab}>
              <TabsList>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="queues">Queues & Agents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tickets" className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tickets..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4" />
                      Filters {(priorityFilter || categoryFilter || departmentFilter || agentFilter) && <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">!</Badge>}
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          Sort by
                          {sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleSortOrder('updatedAt')}>
                          Last Updated {sortField === 'updatedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleSortOrder('createdAt')}>
                          Date Created {sortField === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleSortOrder('priority')}>
                          Priority {sortField === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleSortOrder('status')}>
                          Status {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {(searchQuery || statusFilter || priorityFilter || categoryFilter || departmentFilter || agentFilter) && (
                      <Button variant="ghost" onClick={clearFilters}>
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
                
                {showFilters && (
                  <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Priority</label>
                        <Select 
                          value={priorityFilter || ""} 
                          onValueChange={(value) => setPriorityFilter(value || null)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Priorities" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Priorities</SelectItem>
                            {priorities.map((priority) => (
                              <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <Select 
                          value={categoryFilter || ""} 
                          onValueChange={(value) => setCategoryFilter(value || null)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Department</label>
                        <Select 
                          value={departmentFilter || ""} 
                          onValueChange={(value) => setDepartmentFilter(value || null)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Departments" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            {departments.map((department) => (
                              <SelectItem key={department} value={department}>{department}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Assigned Agent</label>
                        <Select 
                          value={agentFilter || ""} 
                          onValueChange={(value) => setAgentFilter(value || null)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Agents" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Agents</SelectItem>
                            {assignedAgents.map((agent) => (
                              <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                )}
                
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All Tickets</TabsTrigger>
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>All Tickets ({filteredTickets.length})</CardTitle>
                          {filteredTickets.length !== tickets.length && (
                            <Badge variant="outline">Filtered</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <TicketList 
                          tickets={filteredTickets} 
                          onViewTicket={handleTicketClick}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="open" className="mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Open Tickets ({filteredTickets.length})</CardTitle>
                          {filteredTickets.length !== tickets.filter(t => t.status === 'open').length && (
                            <Badge variant="outline">Filtered</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <TicketList 
                          tickets={filteredTickets}
                          onViewTicket={handleTicketClick}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="in_progress" className="mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>In Progress ({filteredTickets.length})</CardTitle>
                          {filteredTickets.length !== tickets.filter(t => t.status === 'in_progress').length && (
                            <Badge variant="outline">Filtered</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <TicketList 
                          tickets={filteredTickets}
                          onViewTicket={handleTicketClick}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="resolved" className="mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Resolved Tickets ({filteredTickets.length})</CardTitle>
                          {filteredTickets.length !== tickets.filter(t => t.status === 'resolved').length && (
                            <Badge variant="outline">Filtered</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <TicketList 
                          tickets={filteredTickets}
                          onViewTicket={handleTicketClick}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="closed" className="mt-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>Closed Tickets ({filteredTickets.length})</CardTitle>
                          {filteredTickets.length !== tickets.filter(t => t.status === 'closed').length && (
                            <Badge variant="outline">Filtered</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <TicketList 
                          tickets={filteredTickets}
                          onViewTicket={handleTicketClick}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              <TabsContent value="queues" className="mt-6">
                <QueueManagement queues={mockQueues} agents={mockAgents} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default TicketsPage;
