
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { NewTicketForm } from '../NewTicketForm';
import { SupportTicket } from "@/types/support";

interface TicketDetailsStepProps {
  customerInfo: {
    name: string;
    email: string;
  };
  onEditContactInfo: () => void;
  onSubmit: (ticketData: Partial<SupportTicket>) => void;
  onCancel: () => void;
  availableCategories?: string[];
  availableDepartments?: string[];
}

export const TicketDetailsStep: React.FC<TicketDetailsStepProps> = ({
  customerInfo,
  onEditContactInfo,
  onSubmit,
  onCancel,
  availableCategories,
  availableDepartments
}) => {
  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Submit a new support request</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">{customerInfo.name}</p>
              <p className="text-sm text-muted-foreground">{customerInfo.email}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onEditContactInfo}
            >
              Edit Contact Info
            </Button>
          </div>
          <p className="text-muted-foreground mb-4">
            Please provide details about your issue, and our support team will get back to you as soon as possible.
          </p>
        </CardContent>
      </Card>
      
      <NewTicketForm 
        onSubmit={onSubmit}
        onCancel={onCancel}
        isCustomer={true}
        availableCategories={availableCategories}
        availableDepartments={availableDepartments}
      />
    </>
  );
};
