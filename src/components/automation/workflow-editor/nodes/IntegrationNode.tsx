
import React from "react";
import { Handle, Position } from "reactflow";
import { Zap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const IntegrationNode = ({ data }) => {
  const getIntegrationLabel = () => {
    if (!data.config) return 'External Integration';
    
    const integrationNames = {
      zapier: 'Zapier',
      make: 'Make.com',
      api: 'Custom API',
      stripe: 'Stripe',
      slack: 'Slack',
      asana: 'Asana'
    };
    
    return integrationNames[data.config.integration] || 'External Integration';
  };

  return (
    <div className={`rounded-lg border shadow-sm bg-white p-3 min-w-[180px] ${
      data.selected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
    }`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-green-100 flex items-center justify-center flex-shrink-0">
          <Zap className="h-4 w-4 text-green-600" />
        </div>
        <div>
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            {getIntegrationLabel()}
          </p>
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-green-500 !w-3 !h-3 border-2 border-white"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-green-500 !w-3 !h-3 border-2 border-white"
      />
      
      {!data.nextStepId && (
        <div className="mt-3 border-t pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs flex items-center justify-center gap-1"
            onClick={() => data.onAddStep('action', data.id)}
          >
            <Plus className="h-3 w-3" /> Add Next Step
          </Button>
        </div>
      )}
    </div>
  );
};

export default IntegrationNode;
