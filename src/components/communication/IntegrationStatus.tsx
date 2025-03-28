
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IntegrationStatusProps {
  className?: string;
}

// Integration status data - in a real app this would come from your backend
const integrations = [
  { 
    id: 'twilio', 
    name: 'Twilio', 
    description: 'Voice, SMS, Video', 
    status: 'connected', 
    icon: '🔊',
  },
  { 
    id: 'whatsapp', 
    name: 'WhatsApp', 
    description: 'Messaging', 
    status: 'connected',
    icon: '📱',
  },
  { 
    id: 'messenger', 
    name: 'Facebook', 
    description: 'Messaging', 
    status: 'connected',
    icon: '💬',
  },
  { 
    id: 'email', 
    name: 'Email', 
    description: 'Email', 
    status: 'connected',
    icon: '📧',
  }
];

const IntegrationStatus: React.FC<IntegrationStatusProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  const goToIntegrationsSettings = () => {
    navigate('/settings/integrations');
  };
  
  return (
    <Card className={`${className} h-full`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Channels</CardTitle>
            <CardDescription>Active integrations</CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-primary/10"
            onClick={goToIntegrationsSettings}
          >
            {integrations.filter(i => i.status === 'connected').length} active
            <ExternalLink className="ml-1 h-3 w-3" />
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {integrations.map((integration) => (
            <div 
              key={integration.id} 
              className="flex items-center bg-secondary/30 p-2 rounded-md"
            >
              <div className="w-6 h-6 flex items-center justify-center mr-1 bg-primary/10 rounded-md">
                <span className="text-sm">{integration.icon}</span>
              </div>
              <div>
                <div className="font-medium text-xs">{integration.name}</div>
              </div>
              <div className="ml-auto">
                <Badge 
                  variant="outline"
                  className={
                    integration.status === 'connected' 
                      ? 'bg-green-100 text-green-700 text-[10px] py-0 px-1.5 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-700 text-[10px] py-0 px-1.5 hover:bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400'
                  }
                >
                  {integration.status === 'connected' ? 'ON' : 'OFF'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationStatus;
