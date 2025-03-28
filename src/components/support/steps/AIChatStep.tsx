
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
  assistantName?: string;
  showBookingButton?: boolean;
}

export const AIChatStep: React.FC<AIChatStepProps> = ({
  customerInfo,
  onSwitchToForm,
  onEditContactInfo,
  assistantName = "Support AI",
  showBookingButton = true,
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
      
      <div className="h-[400px] rounded-lg shadow-sm hover:shadow-md transition-all">
        <ChatInterface 
          title={assistantName}
          config={{
            initialMessage: `Hello ${customerInfo.name}! 👋 I'm your ${assistantName} assistant. How can I help you today?`,
            modelName: "gpt-4o",
            maxTokens: 1000,
            temperature: 0.7
          }}
          variant="embedded"
          accentColor="#8B5CF6"
        />
      </div>
      
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onSwitchToForm} className="hover:bg-muted transition-all">
          Create Support Ticket
        </Button>
        {showBookingButton && (
          <div>
            <Button className="bg-violet-600 hover:bg-violet-700 transition-all">
              Book a Meeting
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
