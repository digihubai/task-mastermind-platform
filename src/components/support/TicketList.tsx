
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SupportTicket } from "@/types/support";
import { Eye, MessageSquare, Tag } from "lucide-react";

interface TicketListProps {
  tickets: SupportTicket[];
  onViewTicket: (ticket: SupportTicket) => void;
}

export const TicketList: React.FC<TicketListProps> = ({ tickets, onViewTicket }) => {
  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400";
      case 'in_progress':
        return "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400";
      case 'resolved':
        return "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400";
      case 'closed':
        return "bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'urgent':
        return "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400";
      case 'high':
        return "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400";
      case 'medium':
        return "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400";
      case 'low':
        return "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Card key={ticket.id} className="p-4 border border-border/40 hover:border-primary/50 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium truncate">{ticket.subject}</h3>
                <Badge variant="outline" className={getStatusColor(ticket.status)}>
                  {ticket.status.replace('_', ' ')}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                {ticket.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>#{ticket.id.slice(0, 8)}</span>
                <span>•</span>
                <span>Created {formatDate(ticket.createdAt)}</span>
                {ticket.department && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Tag size={12} />
                      {ticket.department}
                    </span>
                  </>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => onViewTicket(ticket)}
            >
              <Eye size={16} />
              <span>View</span>
            </Button>
          </div>
        </Card>
      ))}
      
      {tickets.length === 0 && (
        <div className="text-center py-8">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-2 text-lg font-medium">No tickets found</h3>
          <p className="text-sm text-muted-foreground">There are no support tickets matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
