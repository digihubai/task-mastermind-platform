
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

interface ContactInfoStepProps {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  showAIChat: boolean;
  onChangeCustomerInfo: (field: string, value: string) => void;
  onToggleAIChat: () => void;
  onContinue: (e: React.FormEvent) => void;
}

export const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  customerInfo,
  showAIChat,
  onChangeCustomerInfo,
  onToggleAIChat,
  onContinue,
}) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email) {
      toast({
        title: "Required information missing",
        description: "Please provide your name and email address.",
        variant: "destructive"
      });
      return;
    }
    
    onContinue(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Full Name *
        </label>
        <Input
          id="name"
          name="name"
          value={customerInfo.name}
          onChange={(e) => onChangeCustomerInfo('name', e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={customerInfo.email}
          onChange={(e) => onChangeCustomerInfo('email', e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone"
          value={customerInfo.phone}
          onChange={(e) => onChangeCustomerInfo('phone', e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1">
          Company Name
        </label>
        <Input
          id="company"
          name="company"
          value={customerInfo.company}
          onChange={(e) => onChangeCustomerInfo('company', e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="useAI"
          checked={showAIChat}
          onChange={onToggleAIChat}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="useAI" className="text-sm">
          Try AI support first (recommended)
        </label>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">
          {showAIChat ? "Continue to AI Support" : "Continue to Support Request"}
        </Button>
      </div>
    </form>
  );
};
