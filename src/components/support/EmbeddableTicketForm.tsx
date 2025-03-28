
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CustomerTicketForm } from './CustomerTicketForm';

export interface EmbeddableTicketFormProps {
  compact?: boolean;
  customTitle?: string;
  customDescription?: string;
  successTitle?: string;
  successMessage?: string;
  successBodyText?: string;
  emailNotificationText?: string;
  departmentId?: string;
  theme?: 'light' | 'dark' | 'auto';
  availableCategories?: string[];
  availableDepartments?: string[];
  showAiSupportOption?: boolean;
  requiredFields?: {
    phone?: boolean;
    company?: boolean;
  };
  optionalFields?: {
    orderNumber?: boolean;
    urgencyLevel?: boolean;
    preferredContact?: boolean;
    bestTimeToReach?: boolean;
    custom?: {[key: string]: boolean};
  };
}

export const EmbeddableTicketForm: React.FC<EmbeddableTicketFormProps> = ({ 
  compact = false,
  customTitle = "Support Request",
  customDescription = "Submit a new support request and we'll get back to you as soon as possible.",
  successTitle = "Request Submitted",
  successMessage = "Thank you for contacting support",
  successBodyText = "Your support request has been submitted successfully. Our team will review it and get back to you as soon as possible.",
  emailNotificationText = "You will receive updates on your request via email at",
  departmentId,
  theme = 'auto',
  availableCategories,
  availableDepartments,
  showAiSupportOption = true,
  requiredFields = { phone: false, company: false },
  optionalFields = { orderNumber: false, urgencyLevel: true, preferredContact: false, bestTimeToReach: false, custom: {} }
}) => {
  const [submitted, setSubmitted] = useState(false);
  
  return (
    <div className={`embeddable-form ${compact ? 'max-w-md' : 'max-w-2xl'} mx-auto`} 
         data-theme={theme}>
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>{customTitle}</CardTitle>
          <CardDescription>{customDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerTicketForm 
            onSubmitSuccess={() => setSubmitted(true)}
            departmentId={departmentId}
            availableCategories={availableCategories}
            availableDepartments={availableDepartments}
            showAiSupportOption={showAiSupportOption}
            requiredFields={requiredFields}
            optionalFields={optionalFields}
            compact={compact}
            successTitle={successTitle}
            successMessage={successMessage}
            successBodyText={successBodyText}
            emailNotificationText={emailNotificationText}
          />
        </CardContent>
      </Card>
    </div>
  );
};

// Re-export the FormCustomizationInterface from its own file
export { FormCustomizationInterface } from './form-customization/FormCustomizationInterface';

// Re-export the embedding utilities
export { createEmbeddableTicketForm } from './embed/EmbedUtils';
