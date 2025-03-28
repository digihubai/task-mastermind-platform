
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface SuccessStepProps {
  customerEmail: string;
  onNewTicket: () => void;
  compact?: boolean;
  successTitle?: string;
  successMessage?: string;
  successBodyText?: string;
  emailNotificationText?: string;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  customerEmail,
  onNewTicket,
  compact = false,
  successTitle = "Request Submitted",
  successMessage = "Thank you for contacting support",
  successBodyText = "Your support request has been submitted successfully. Our team will review it and get back to you as soon as possible.",
  emailNotificationText = "You will receive updates on your request via email at"
}) => {
  return (
    <Card className={compact ? "max-w-md mx-auto" : "max-w-2xl mx-auto"}>
      <CardHeader>
        <CardTitle>{successTitle}</CardTitle>
        <CardDescription>{successMessage}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{successBodyText}</p>
        <p>{emailNotificationText} <strong>{customerEmail}</strong>.</p>
        <div className="flex justify-end">
          <Button 
            onClick={onNewTicket}
            className="text-primary hover:underline"
          >
            Submit another request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
