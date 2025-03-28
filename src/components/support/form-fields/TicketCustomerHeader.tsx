
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface TicketCustomerHeaderProps {
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  onEditContactInfo: () => void;
}

export const TicketCustomerHeader: React.FC<TicketCustomerHeaderProps> = ({ 
  customerInfo, 
  onEditContactInfo 
}) => {
  return (
    <div className="flex items-center mb-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onEditContactInfo}
        className="p-0 h-auto mr-2"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
      </Button>
      <div>
        <div className="text-sm font-medium">{customerInfo.name}</div>
        <div className="text-xs text-muted-foreground">{customerInfo.email}</div>
      </div>
    </div>
  );
};
