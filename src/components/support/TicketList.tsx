
import React from "react";
import { SupportTicket } from "@/types/support";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  PlusCircle,
  Tag
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface TicketListProps {
  tickets: SupportTicket[];
  selectedTicketId?: string | null;
  onSelectTicket: (ticketId: string) => void;
  onNewTicket: () => void;
}

export const TicketList: React.FC<TicketListProps> = ({ 
  tickets, 
  selectedTicketId,
  onSelectTicket,
  onNewTicket
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "closed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tickets ({tickets.length})</h2>
        <Button onClick={onNewTicket} size="sm">
          <PlusCircle className="h-4 w-4 mr-1" />
          New
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedTicketId === ticket.id ? 'border-primary' : ''
              }`}
              onClick={() => onSelectTicket(ticket.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  {getStatusIcon(ticket.status)}
                  <div>
                    <h3 className="font-medium">{ticket.subject}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                      {ticket.description}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  <span>{ticket.department}</span>
                </div>
                <span>{formatDate(ticket.updatedAt)}</span>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
