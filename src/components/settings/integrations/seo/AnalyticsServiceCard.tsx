
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AnalyticsServiceProps } from './types';

const AnalyticsServiceCard: React.FC<AnalyticsServiceProps> = ({
  service,
  name,
  description,
  icon,
  backgroundColor,
  apiKey,
  connected,
  connecting,
  onInputChange,
  onConnect,
  onDisconnect
}) => {
  return (
    <Card className="p-5 border">
      <div className="flex items-center gap-3 mb-4">
        <div className={`${backgroundColor} p-2 rounded-full`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      
      {connected ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600 font-medium">Connected</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Input
            placeholder={`${name} API Key`}
            className="mb-3"
            value={apiKey}
            onChange={(e) => onInputChange(e.target.value)}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onConnect}
            disabled={connecting}
          >
            {connecting ? "Connecting..." : "Connect"}
          </Button>
        </>
      )}
    </Card>
  );
};

export default AnalyticsServiceCard;
