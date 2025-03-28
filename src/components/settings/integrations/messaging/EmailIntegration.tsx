
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import MessagingServiceCard from './MessagingServiceCard';
import { useToast } from "@/hooks/use-toast";
import { EmailConfig, MessagingServiceProps } from './types';
import { useMessagingService } from './utils';

const EmailIntegration: React.FC<MessagingServiceProps> = ({ onConnect, onDisconnect }) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<{[key: string]: boolean}>({ email: false });
  const { simulateConnection, handleDisconnect } = useMessagingService();
  
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    host: "",
    port: "587",
    username: "",
    password: "",
    secure: false
  });

  const handleEmailConfigChange = (field: keyof EmailConfig, value: string | boolean) => {
    setEmailConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleConnect = () => {
    if (connected.email) {
      toast({
        title: "Already Connected",
        description: "Your Email is already connected.",
      });
      return;
    }

    if (!emailConfig.host || !emailConfig.username || !emailConfig.password) {
      toast({
        title: "SMTP Configuration Required",
        description: "Please enter your SMTP server details.",
        variant: "destructive",
      });
      return;
    }

    simulateConnection(
      'email', 
      setConnecting, 
      setConnected, 
      connected, 
      onConnect
    );
  };

  const handleEmailDisconnect = () => {
    handleDisconnect('email', setConnected, connected);
    setEmailConfig({
      host: "",
      port: "587",
      username: "",
      password: "",
      secure: false
    });
    
    if (onDisconnect) {
      onDisconnect('email');
    }
  };

  const emailService = {
    id: "email",
    name: "Email Integration",
    description: "Connect email for support tickets",
    icon: <Mail className="h-5 w-5 text-amber-600" />,
    backgroundColor: "bg-amber-100",
    textColor: "text-amber-600",
    connected: connected.email
  };

  return (
    <MessagingServiceCard 
      service={emailService}
      connecting={connecting}
      onConnect={handleConnect}
      onDisconnect={handleEmailDisconnect}
    >
      <div className="space-y-2">
        <Input
          placeholder="SMTP Server (e.g. smtp.gmail.com)"
          className="mb-2"
          value={emailConfig.host}
          onChange={(e) => handleEmailConfigChange('host', e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Port (e.g. 587)"
            value={emailConfig.port}
            onChange={(e) => handleEmailConfigChange('port', e.target.value)}
          />
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="secure-connection" 
              checked={emailConfig.secure}
              onChange={(e) => handleEmailConfigChange('secure', e.target.checked)} 
            />
            <label htmlFor="secure-connection" className="text-xs">SSL/TLS</label>
          </div>
        </div>
        <Input
          placeholder="Username/Email"
          className="mb-2 mt-2"
          value={emailConfig.username}
          onChange={(e) => handleEmailConfigChange('username', e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          className="mb-3"
          value={emailConfig.password}
          onChange={(e) => handleEmailConfigChange('password', e.target.value)}
        />
      </div>
    </MessagingServiceCard>
  );
};

export default EmailIntegration;
