
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NewTicketForm } from './NewTicketForm';
import { SupportTicket } from "@/types/support";
import { useToast } from "@/hooks/use-toast";

interface CustomerTicketFormProps {
  onSubmitSuccess?: () => void;
}

export const CustomerTicketForm: React.FC<CustomerTicketFormProps> = ({ 
  onSubmitSuccess 
}) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  
  const handleSubmit = (ticketData: Partial<SupportTicket>) => {
    // Here you would typically make an API call to submit the ticket
    console.log('Customer ticket submitted:', ticketData);
    
    // Show success message
    toast({
      title: "Support request submitted",
      description: "We've received your request and will get back to you soon."
    });
    
    setSubmitted(true);
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };
  
  const handleNewTicket = () => {
    setSubmitted(false);
  };
  
  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Request Submitted</CardTitle>
          <CardDescription>Thank you for contacting support</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your support request has been submitted successfully. Our team will review it and get back to you as soon as possible.</p>
          <p>You will receive updates on your request via email.</p>
          <div className="flex justify-end">
            <button 
              onClick={handleNewTicket}
              className="text-primary hover:underline"
            >
              Submit another request
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Submit a new support request</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Please provide details about your issue, and our support team will get back to you as soon as possible.
          </p>
        </CardContent>
      </Card>
      
      <NewTicketForm 
        onSubmit={handleSubmit}
        onCancel={() => {
          if (onSubmitSuccess) onSubmitSuccess();
        }}
        isCustomer={true}
      />
    </div>
  );
};
