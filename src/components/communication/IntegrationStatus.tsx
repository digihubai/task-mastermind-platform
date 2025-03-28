
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import platform-specific icons
import {
  BrandFacebook,
  BrandTwitter,
  BrandWhatsapp,
  BrandTelegram,
  BrandSlack
} from "@/components/ui/custom-icons"; // These would need to be created or imported from a library

interface IntegrationStatusProps {
  className?: string;
}

// Integration status data - in a real app this would come from your backend
const integrations = [
  { 
    id: 'twilio', 
    name: 'Twilio', 
    description: 'Voice, SMS', 
    status: 'connected', 
    icon: '🔊'
  },
  { 
    id: 'whatsapp', 
    name: 'WhatsApp Business', 
    description: 'Messaging', 
    status: 'connected',
    icon: '📱'
  },
  { 
    id: 'messenger', 
    name: 'Facebook Messenger', 
    description: 'Messaging', 
    status: 'connected',
    icon: '💬'
  },
  { 
    id: 'smtp', 
    name: 'Email (SMTP)', 
    description: 'Email communications', 
    status: 'connected',
    icon: '📧'
  },
  { 
    id: 'telegram', 
    name: 'Telegram', 
    description: 'Messaging', 
    status: 'not_connected',
    icon: '📨'
  }
];

const IntegrationStatus: React.FC<IntegrationStatusProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  const goToIntegrationsSettings = () => {
    navigate('/settings/integrations');
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Channel Integrations</CardTitle>
            <CardDescription>Connected platforms and services</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={goToIntegrationsSettings}>
            <Settings className="h-4 w-4 mr-2" />
            Manage
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {integrations.map((integration) => (
            <div 
              key={integration.id} 
              className="flex items-center justify-between bg-secondary/30 p-2 rounded-md"
            >
              <div className="flex items-center">
                <span className="text-lg mr-2">{integration.icon}</span>
                <div>
                  <div className="font-medium text-sm">{integration.name}</div>
                  <div className="text-xs text-muted-foreground">{integration.description}</div>
                </div>
              </div>
              <Badge 
                variant={integration.status === 'connected' ? 'default' : 'outline'}
                className={
                  integration.status === 'connected' 
                    ? 'bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400'
                }
              >
                {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationStatus;
