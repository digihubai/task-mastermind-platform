
import React from "react";
import { Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusIcon } from "./StatusIcon";
import { PriorityBadge } from "./PriorityBadge";
import { SupportTicket } from "@/types/support";
import { formatDate } from "./formatDate";

interface TicketItemProps {
  ticket: SupportTicket;
  isSelected?: boolean;
  onClick: () => void;
}

export const TicketItem: React.FC<TicketItemProps> = ({ 
  ticket, 
  isSelected = false,
  onClick 
}) => {
  return (
    <Card
      className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? 'border-primary' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <StatusIcon status={ticket.status} />
          <div>
            <h3 className="font-medium">{ticket.subject}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
              {ticket.description}
            </p>
          </div>
        </div>
        <PriorityBadge priority={ticket.priority} />
      </div>
      
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Tag className="h-3 w-3" />
          <span>{ticket.department}</span>
        </div>
        <span>{formatDate(ticket.updatedAt)}</span>
      </div>
    </Card>
  );
};
