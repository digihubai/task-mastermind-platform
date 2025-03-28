
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { NewTicketForm } from "@/components/support/NewTicketForm";
import { SupportTicket } from "@/types/support";

interface NewTicketSectionProps {
  showNewTicketForm: boolean;
  setShowNewTicketForm: (show: boolean) => void;
  onCreateTicket: (ticket: Partial<SupportTicket>) => void;
}

export const NewTicketSection: React.FC<NewTicketSectionProps> = ({
  showNewTicketForm,
  setShowNewTicketForm,
  onCreateTicket
}) => {
  return (
    <>
      {showNewTicketForm ? (
        <NewTicketForm 
          onSubmit={onCreateTicket} 
          onCancel={() => setShowNewTicketForm(false)} 
        />
      ) : (
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Support Tickets</h1>
          <Button onClick={() => setShowNewTicketForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Internal Ticket
          </Button>
        </div>
      )}
    </>
  );
};
