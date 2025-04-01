
import React from "react";
import { Handle, Position } from "reactflow";
import { Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const DelayNode = ({ data }) => {
  const getDelayText = () => {
    if (!data.config) return 'Wait...';
    
    if (data.config.delayType === 'fixed') {
      return `Wait ${data.config.duration || 1} ${data.config.durationUnit || 'minutes'}`;
    }
    
    if (data.config.delayType === 'until_time') {
      return `Wait until specific time`;
    }
    
    if (data.config.delayType === 'until_condition') {
      return `Wait until condition met`;
    }
    
    return 'Wait...';
  };

  return (
    <div className={`rounded-lg border shadow-sm bg-white p-3 min-w-[180px] ${
      data.selected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
    }`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center flex-shrink-0">
          <Clock className="h-4 w-4 text-purple-600" />
        </div>
        <div>
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            {getDelayText()}
          </p>
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-purple-500 !w-3 !h-3 border-2 border-white"
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-purple-500 !w-3 !h-3 border-2 border-white"
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

export default DelayNode;
