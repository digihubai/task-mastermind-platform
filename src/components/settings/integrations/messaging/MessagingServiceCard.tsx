
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2, ArrowRight } from "lucide-react";
import { MessagingService } from './types';

interface MessagingServiceCardProps {
  service: MessagingService;
  connecting: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  children?: React.ReactNode;
}

const MessagingServiceCard: React.FC<MessagingServiceCardProps> = ({
  service,
  connecting,
  onConnect,
  onDisconnect,
  children
}) => {
  return (
    <Card className="p-5 border">
      <div className="flex items-center gap-3 mb-4">
        <div className={`${service.backgroundColor} p-2 rounded-full`}>
          {service.icon}
        </div>
        <div>
          <h4 className="font-medium">{service.name}</h4>
          <p className="text-xs text-muted-foreground">{service.description}</p>
        </div>
      </div>
      
      {service.connected ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Connected</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onDisconnect}
          >
            <X className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      ) : (
        <>
          {children}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onConnect}
            disabled={connecting === service.id}
          >
            {connecting === service.id ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : service.id === "twilio" ? (
              <>
                Get a Phone Number
              </>
            ) : (
              <>
                Connect <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </>
      )}
    </Card>
  );
};

export default MessagingServiceCard;
