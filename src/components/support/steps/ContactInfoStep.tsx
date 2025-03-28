
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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
  showAiSupportOption?: boolean;
  requiredFields?: {
    phone?: boolean;
    company?: boolean;
  };
}

export const ContactInfoStep: React.FC<ContactInfoStepProps> = ({
  customerInfo,
  showAIChat,
  onChangeCustomerInfo,
  onToggleAIChat,
  onContinue,
  showAiSupportOption = true,
  requiredFields = { phone: false, company: false }
}) => {
  return (
    <form onSubmit={onContinue}>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name *
          </label>
          <Input
            id="name"
            placeholder="John Doe"
            value={customerInfo.name}
            onChange={(e) => onChangeCustomerInfo("name", e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={customerInfo.email}
            onChange={(e) => onChangeCustomerInfo("email", e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone Number {requiredFields.phone && '*'}
          </label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            value={customerInfo.phone}
            onChange={(e) => onChangeCustomerInfo("phone", e.target.value)}
            required={requiredFields.phone}
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Company Name {requiredFields.company && '*'}
          </label>
          <Input
            id="company"
            placeholder="Acme Inc."
            value={customerInfo.company}
            onChange={(e) => onChangeCustomerInfo("company", e.target.value)}
            required={requiredFields.company}
          />
        </div>
        
        {showAiSupportOption && (
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="ai-chat" 
              checked={showAIChat} 
              onCheckedChange={onToggleAIChat}
            />
            <label htmlFor="ai-chat" className="text-sm font-medium cursor-pointer">
              Try AI support first (recommended)
            </label>
          </div>
        )}
        
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </div>
    </form>
  );
};
