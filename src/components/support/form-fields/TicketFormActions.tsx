
import React from "react";
import { Button } from "@/components/ui/button";

interface TicketFormActionsProps {
  onCancel: () => void;
  isCustomer?: boolean;
}

export const TicketFormActions: React.FC<TicketFormActionsProps> = ({ 
  onCancel, 
  isCustomer = false 
}) => {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">
        {isCustomer ? "Submit Request" : "Create Ticket"}
      </Button>
    </div>
  );
};
