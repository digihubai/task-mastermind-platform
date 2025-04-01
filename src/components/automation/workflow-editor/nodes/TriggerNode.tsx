
import React from "react";
import { Handle, Position } from "reactflow";
import { Zap } from "lucide-react";

interface TriggerNodeProps {
  data: {
    name: string;
    type: string;
    selected?: boolean;
    onAddStep?: (type: string, afterId: string) => void;
  };
}

const TriggerNode: React.FC<TriggerNodeProps> = ({ data }) => {
  return (
    <div className={`rounded-lg border shadow-sm bg-white p-3 min-w-[180px] ${
      data.selected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
    }`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Zap className="h-4 w-4 text-blue-600" />
        </div>
        <div>
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            {data.type === 'trigger' ? 'Start trigger' : 'Trigger'}
          </p>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 !w-3 !h-3 border-2 border-white"
      />
    </div>
  );
};

export default TriggerNode;
