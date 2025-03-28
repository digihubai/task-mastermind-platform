
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketList } from "@/components/support/TicketList";
import { SupportTicket } from "@/types/support";

interface TicketStatusTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredTickets: SupportTicket[];
  allTicketsCount: number;
  onViewTicket: (ticket: SupportTicket) => void;
}

export const TicketStatusTabs: React.FC<TicketStatusTabsProps> = ({
  activeTab,
  setActiveTab,
  filteredTickets,
  allTicketsCount,
  onViewTicket
}) => {
  // Get counts of tickets by status
  const getStatusCount = (status: string): number => {
    if (status === 'all') return allTicketsCount;
    return filteredTickets.filter(ticket => ticket.status === status).length;
  };

  return (
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
              {filteredTickets.length !== allTicketsCount && (
                <Badge variant="outline">Filtered</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <TicketList 
              tickets={filteredTickets} 
              onViewTicket={onViewTicket}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="open" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Open Tickets ({getStatusCount('open')})</CardTitle>
              {filteredTickets.length !== getStatusCount('open') && (
                <Badge variant="outline">Filtered</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <TicketList 
              tickets={filteredTickets.filter(ticket => ticket.status === 'open')}
              onViewTicket={onViewTicket}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="in_progress" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>In Progress ({getStatusCount('in_progress')})</CardTitle>
              {filteredTickets.length !== getStatusCount('in_progress') && (
                <Badge variant="outline">Filtered</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <TicketList 
              tickets={filteredTickets.filter(ticket => ticket.status === 'in_progress')}
              onViewTicket={onViewTicket}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="resolved" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Resolved Tickets ({getStatusCount('resolved')})</CardTitle>
              {filteredTickets.length !== getStatusCount('resolved') && (
                <Badge variant="outline">Filtered</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <TicketList 
              tickets={filteredTickets.filter(ticket => ticket.status === 'resolved')}
              onViewTicket={onViewTicket}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="closed" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Closed Tickets ({getStatusCount('closed')})</CardTitle>
              {filteredTickets.length !== getStatusCount('closed') && (
                <Badge variant="outline">Filtered</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <TicketList 
              tickets={filteredTickets.filter(ticket => ticket.status === 'closed')}
              onViewTicket={onViewTicket}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
