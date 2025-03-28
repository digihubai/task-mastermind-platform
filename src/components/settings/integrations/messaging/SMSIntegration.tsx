
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MessagingServiceCard from './MessagingServiceCard';
import { MessagingService } from './types';
import { Phone } from "lucide-react";

interface SMSIntegrationProps {
  connected: boolean;
  connecting: string | null;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

const SMSIntegration: React.FC<SMSIntegrationProps> = ({
  connected,
  connecting,
  onConnect,
  onDisconnect
}) => {
  const smsService: MessagingService = {
    id: "sms",
    name: "SMS",
    description: "Connect SMS provider for text messaging",
    icon: <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
    backgroundColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
    connected
  };

  return (
    <MessagingServiceCard
      service={smsService}
      connecting={connecting}
      onConnect={() => onConnect("sms")}
      onDisconnect={() => onDisconnect("sms")}
    >
      <div className="space-y-3 mb-4">
        <div className="mb-4">
          <Label>SMS Provider</Label>
          <select className="w-full px-2 py-2 mt-1 bg-background text-sm border rounded-md">
            <option value="twilio">Twilio</option>
            <option value="messagebird">MessageBird</option>
            <option value="nexmo">Nexmo (Vonage)</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="sms-account-sid">Account SID</Label>
          <Input id="sms-account-sid" placeholder="Enter your Account SID" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="sms-auth-token">Auth Token</Label>
          <Input id="sms-auth-token" type="password" placeholder="Enter your Auth Token" className="mt-1" />
        </div>
        
        <div>
          <Label htmlFor="sms-phone-number">Sender Phone Number</Label>
          <Input id="sms-phone-number" placeholder="+1234567890" className="mt-1" />
        </div>
      </div>
    </MessagingServiceCard>
  );
};

export default SMSIntegration;
