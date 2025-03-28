
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TicketList } from '@/components/support/TicketList';
import { SupportTicket } from '@/types/support';
import { useNavigate } from 'react-router-dom';

interface RecentTicketsTabProps {
  tickets: SupportTicket[];
  onViewTicket: (ticket: SupportTicket) => void;
}

const RecentTicketsTab: React.FC<RecentTicketsTabProps> = ({ tickets, onViewTicket }) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Tickets</CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate('/support/tickets')}>
          View all tickets
        </Button>
      </CardHeader>
      <CardContent>
        <TicketList tickets={tickets} onViewTicket={onViewTicket} />
      </CardContent>
    </Card>
  );
};

export default RecentTicketsTab;
