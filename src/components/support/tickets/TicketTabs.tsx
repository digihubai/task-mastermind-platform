
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueueManagement } from "@/components/support/QueueManagement";
import { TicketStatusTabs } from "./TicketStatusTabs";
import { TicketFilters } from "./TicketFilters";
import { UseTicketFilteringResult } from "@/hooks/support/ticketFiltering";
import { SupportTicket } from "@/types/support";

interface TicketTabsProps {
  dashboardTab: string;
  setDashboardTab: (tab: string) => void;
  filteringProps: UseTicketFilteringResult;
  tickets: SupportTicket[];
  queues: any[];
  agents: any[];
  onViewTicket: (ticket: SupportTicket) => void;
}

export const TicketTabs: React.FC<TicketTabsProps> = ({
  dashboardTab,
  setDashboardTab,
  filteringProps,
  tickets,
  queues,
  agents,
  onViewTicket
}) => {
  return (
    <Tabs defaultValue="tickets" value={dashboardTab} onValueChange={setDashboardTab}>
      <TabsList>
        <TabsTrigger value="tickets">Tickets</TabsTrigger>
        <TabsTrigger value="queues">Queues & Agents</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tickets" className="mt-6 space-y-6">
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
        />
        
        <TicketStatusTabs
          activeTab={filteringProps.activeTab}
          setActiveTab={filteringProps.setActiveTab}
          filteredTickets={filteringProps.filteredTickets}
          allTicketsCount={tickets.length}
          onViewTicket={onViewTicket}
        />
      </TabsContent>
      
      <TabsContent value="queues" className="mt-6">
        <QueueManagement queues={queues} agents={agents} />
      </TabsContent>
    </Tabs>
  );
};
