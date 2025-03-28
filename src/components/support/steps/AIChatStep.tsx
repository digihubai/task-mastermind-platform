
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChatInterface } from '@/components/chatbot/ChatInterface';

interface AIChatStepProps {
  customerInfo: {
    name: string;
    email: string;
  };
  onSwitchToForm: () => void;
  onEditContactInfo: () => void;
}

export const AIChatStep: React.FC<AIChatStepProps> = ({
  customerInfo,
  onSwitchToForm,
  onEditContactInfo,
}) => {
  return (
    <div className="space-y-4">
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
      
      <div className="h-[400px]">
        <ChatInterface 
          title="Support AI"
          config={{
            initialMessage: `Hello ${customerInfo.name}! I'm your AI support assistant. How can I help you today?`,
            modelName: "gpt-4o",
            maxTokens: 1000,
            temperature: 0.7
          }}
          variant="embedded"
        />
      </div>
      
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onSwitchToForm}>
          Create Support Ticket
        </Button>
        <div>
          <Button>
            Book a Meeting
          </Button>
        </div>
      </div>
    </div>
  );
};
