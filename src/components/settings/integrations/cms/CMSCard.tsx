
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Loader2, ArrowRight } from "lucide-react";
import { CMSCardProps } from './types';

const CMSCard: React.FC<CMSCardProps> = ({
  platform,
  name,
  description,
  icon,
  backgroundColor,
  textColor,
  url,
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
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Connected</span>
          </div>
          <p className="text-xs truncate">{url}</p>
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
          <Input
            placeholder={`https://your-${platform}-site.com`}
            className="mb-3"
            value={url}
            onChange={(e) => onInputChange(e.target.value)}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onConnect}
            disabled={connecting}
          >
            {connecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
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

export default CMSCard;
