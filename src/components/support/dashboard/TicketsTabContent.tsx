
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SupportTicket } from "@/types/support";
import { TicketList } from "@/components/support/TicketList";
import { useNavigate } from 'react-router-dom';

interface TicketsTabContentProps {
  tickets: SupportTicket[];
  onViewTicket: (ticket: SupportTicket) => void;
}

const TicketsTabContent: React.FC<TicketsTabContentProps> = ({ 
  tickets,
  onViewTicket
}) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>All Support Tickets</CardTitle>
        <Button size="sm" onClick={() => navigate('/support/tickets')}>
          View all tickets
        </Button>
      </CardHeader>
      <CardContent>
        <TicketList 
          tickets={tickets} 
          onViewTicket={onViewTicket}
        />
      </CardContent>
    </Card>
  );
};

export default TicketsTabContent;
