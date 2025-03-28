
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupportTicket } from "@/types/support";
import { useToast } from "@/hooks/use-toast";
import { TicketDetails } from "@/components/support/TicketDetails";
import { TicketStatusTabs } from "@/components/support/tickets/TicketStatusTabs";
import { TicketFilters } from "@/components/support/tickets/TicketFilters";
import { NewTicketSection } from "@/components/support/tickets/NewTicketSection";
import { useTicketFiltering } from "@/hooks/useTicketFiltering";
import { mockQueues } from "@/components/support/mock-data/queues";
import { mockAgents } from "@/components/support/mock-data/agents";

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
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [dashboardTab, setDashboardTab] = useState('tickets');
  
  const filteringProps = useTicketFiltering(tickets, mockAgents);
  
  const handleCreateTicket = (newTicket: Partial<SupportTicket>) => {
    console.log('Creating new ticket with data:', newTicket);
    
    // Make sure category and department are saved correctly
    const ticket: SupportTicket = {
      ...newTicket,
      id: `ticket-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'open',
      messages: [],
      tags: newTicket.tags || [],
      userId: 'user-current',
      category: newTicket.category || '',
      department: newTicket.department || ''
    } as SupportTicket;
    
    console.log('New ticket created:', ticket);
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
        <NewTicketSection 
          showNewTicketForm={showNewTicketForm}
          setShowNewTicketForm={setShowNewTicketForm}
          onCreateTicket={handleCreateTicket}
        />

        {!showNewTicketForm && (
          <>
            <TicketFilters
              searchQuery={filteringProps.searchQuery}
              setSearchQuery={filteringProps.setSearchQuery}
              priorityFilter={filteringProps.priorityFilter}
              setPriorityFilter={filteringProps.setPriorityFilter}
              categoryFilter={filteringProps.categoryFilter}
              setCategoryFilter={filteringProps.setCategoryFilter}
              departmentFilter={filteringProps.departmentFilter}
              setDepartmentFilter={filteringProps.setDepartmentFilter}
              agentFilter={filteringProps.agentFilter}
              setAgentFilter={filteringProps.setAgentFilter}
              sortField={filteringProps.sortField}
              setSortField={filteringProps.setSortField}
              sortOrder={filteringProps.sortOrder}
              setSortOrder={filteringProps.setSortOrder}
              showFilters={filteringProps.showFilters}
              setShowFilters={filteringProps.setShowFilters}
              clearFilters={filteringProps.clearFilters}
              categories={filteringProps.categories}
              departments={filteringProps.departments}
              priorities={filteringProps.priorities}
              assignedAgents={filteringProps.assignedAgents}
              toggleSortOrder={filteringProps.toggleSortOrder}
            />
            
            <TicketStatusTabs
              activeTab={filteringProps.activeTab}
              setActiveTab={filteringProps.setActiveTab}
              filteredTickets={filteringProps.filteredTickets}
              allTicketsCount={tickets.length}
              onViewTicket={handleTicketClick}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default TicketsPage;
