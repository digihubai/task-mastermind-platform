
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
              <CardTitle>Open Tickets ({filteredTickets.length})</CardTitle>
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
      
      <TabsContent value="in_progress" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>In Progress ({filteredTickets.length})</CardTitle>
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
      
      <TabsContent value="resolved" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Resolved Tickets ({filteredTickets.length})</CardTitle>
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
      
      <TabsContent value="closed" className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Closed Tickets ({filteredTickets.length})</CardTitle>
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
    </Tabs>
  );
};
