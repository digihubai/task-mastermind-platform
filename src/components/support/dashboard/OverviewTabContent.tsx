
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SupportTicket } from "@/types/support";
import { TicketList } from "@/components/support/TicketList";
import { useNavigate } from 'react-router-dom';

interface OverviewTabContentProps {
  tickets: SupportTicket[];
  onViewTicket: (ticket: SupportTicket) => void;
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({ 
  tickets,
  onViewTicket
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Tickets</CardTitle>
          <Button variant="link" size="sm" onClick={() => navigate('/support/tickets')}>
            View all
          </Button>
        </CardHeader>
        <CardContent>
          {tickets.length > 0 ? (
            <TicketList 
              tickets={tickets} 
              onViewTicket={onViewTicket}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No recent tickets found. Create a new ticket to get started.
            </p>
          )}
        </CardContent>
      </Card>
      
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/20 p-4 rounded-md">
              <h3 className="text-sm font-medium">Resolution Rate</h3>
              <p className="text-2xl font-bold mt-2">87%</p>
              <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
            </div>
            <div className="bg-muted/20 p-4 rounded-md">
              <h3 className="text-sm font-medium">Avg. Response Time</h3>
              <p className="text-2xl font-bold mt-2">3.2h</p>
              <p className="text-xs text-muted-foreground mt-1">-10% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTabContent;
