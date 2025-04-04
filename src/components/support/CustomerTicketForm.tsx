
import React, { useState } from 'react';
import { SupportTicket } from "@/types/support";
import { useToast } from "@/hooks/use-toast";
import { ContactInfoStep } from './steps/ContactInfoStep';
import { AIChatStep } from './steps/AIChatStep';
import { TicketDetailsStep } from './steps/TicketDetailsStep';
import { SuccessStep } from './steps/SuccessStep';

interface CustomerTicketFormProps {
  onSubmitSuccess?: () => void;
  departmentId?: string;
  compact?: boolean;
  assistantName?: string;
  showBookingButton?: boolean;
  availableCategories?: string[];
  availableDepartments?: string[];
  showAiSupportOption?: boolean;
  successTitle?: string;
  successMessage?: string;
  successBodyText?: string;
  emailNotificationText?: string;
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

export const CustomerTicketForm: React.FC<CustomerTicketFormProps> = ({ 
  onSubmitSuccess,
  departmentId,
  compact = false,
  assistantName = "Support AI",
  showBookingButton = true,
  availableCategories = ["General", "Technical", "Billing", "Feature Request"],
  availableDepartments = ["Support", "Sales", "Billing", "Product", "Technical"],
  showAiSupportOption = true,
  successTitle = "Request Submitted",
  successMessage = "Thank you for contacting support",
  successBodyText = "Your support request has been submitted successfully. Our team will review it and get back to you as soon as possible.",
  emailNotificationText = "You will receive updates on your request via email at",
  requiredFields = { phone: false, company: false },
  optionalFields = { orderNumber: false, urgencyLevel: true, preferredContact: false, bestTimeToReach: false, custom: {} }
}) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<'contact' | 'details' | 'ai-chat'>('contact');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [showAIChat, setShowAIChat] = useState(false);
  
  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Optionally direct to AI chat first
    if (showAIChat) {
      setStep('ai-chat');
    } else {
      setStep('details');
    }
  };
  
  const handleSubmit = (ticketData: Partial<SupportTicket>) => {
    // Add department if provided in props
    if (departmentId) {
      ticketData.department = departmentId;
    }
    
    // Here you would typically make an API call to submit the ticket with customer info
    console.log('Customer ticket submitted:', { ...ticketData, customer: customerInfo });
    
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
    setStep('contact');
    setShowAIChat(false);
  };
  
  const handleSwitchToForm = () => {
    setStep('details');
  };

  // Render the appropriate step based on the current state
  if (submitted) {
    return (
      <SuccessStep
        customerEmail={customerInfo.email}
        onNewTicket={handleNewTicket}
        compact={compact}
        successTitle={successTitle}
        successMessage={successMessage}
        successBodyText={successBodyText}
        emailNotificationText={emailNotificationText}
      />
    );
  }
  
  if (step === 'contact') {
    return (
      <div className={compact ? "max-w-md mx-auto" : "max-w-2xl mx-auto"}>
        <div className="mb-4">
          <ContactInfoStep
            customerInfo={customerInfo}
            showAIChat={showAIChat}
            onChangeCustomerInfo={handleCustomerInfoChange}
            onToggleAIChat={() => setShowAIChat(!showAIChat)}
            onContinue={handleContinue}
            showAiSupportOption={showAiSupportOption}
            requiredFields={requiredFields}
          />
        </div>
      </div>
    );
  }
  
  if (step === 'ai-chat') {
    return (
      <div className={compact ? "max-w-md mx-auto" : "max-w-2xl mx-auto"}>
        <AIChatStep
          customerInfo={customerInfo}
          onSwitchToForm={handleSwitchToForm}
          onEditContactInfo={() => setStep('contact')}
          assistantName={assistantName}
          showBookingButton={showBookingButton}
        />
      </div>
    );
  }
  
  return (
    <div className={compact ? "max-w-md mx-auto" : "max-w-2xl mx-auto"}>
      <TicketDetailsStep
        customerInfo={customerInfo}
        onEditContactInfo={() => setStep('contact')}
        onSubmit={handleSubmit}
        onCancel={() => setStep('contact')}
        availableCategories={availableCategories}
        availableDepartments={availableDepartments}
        requiredFields={requiredFields}
        optionalFields={optionalFields}
      />
    </div>
  );
};
