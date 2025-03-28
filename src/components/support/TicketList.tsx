
import React from "react";
import { SupportTicket } from "@/types/support";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TicketItem } from "./ticket/TicketItem";

export interface TicketListProps {
  tickets: SupportTicket[];
  selectedTicketId?: string | null;
  onSelectTicket?: (ticketId: string) => void;
  onViewTicket?: (ticket: SupportTicket) => void;
}

export const TicketList: React.FC<TicketListProps> = ({ 
  tickets, 
  selectedTicketId,
  onSelectTicket,
  onViewTicket
}) => {
  const handleTicketClick = (ticket: SupportTicket) => {
    if (onViewTicket) {
      onViewTicket(ticket);
    } else if (onSelectTicket) {
      onSelectTicket(ticket.id);
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tickets ({tickets.length})</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {tickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              isSelected={selectedTicketId === ticket.id}
              onClick={() => handleTicketClick(ticket)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
