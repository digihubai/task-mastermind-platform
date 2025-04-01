
import React from "react";
import { Handle, Position } from "reactflow";
import { GitBranch, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConditionNode = ({ data }) => {
  return (
    <div className={`rounded-lg border shadow-sm bg-white p-3 min-w-[200px] ${
      data.selected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
    }`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-amber-100 flex items-center justify-center flex-shrink-0">
          <GitBranch className="h-4 w-4 text-amber-600" />
        </div>
        <div>
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            {data.config?.field ? `${data.config.field} ${data.config.operator || '='} ${data.config.value || '?'}` : 'Condition'}
          </p>
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-amber-500 !w-3 !h-3 border-2 border-white"
      />
      
      <div className="mt-3 border-t pt-3">
        <div className="space-y-2">
          {(data.branches || []).map((branch, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-xs font-medium">{branch.condition}</span>
              
              <Handle
                id={`branch-${index}`}
                type="source"
                position={Position.Bottom}
                className="!relative !transform-none !translate-x-0 !translate-y-0 !static !inline-block ml-2 !bg-amber-500 !w-3 !h-3 border-2 border-white"
              />
              
              {!branch.nextStepId && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => data.onAddStep('action', data.id)}
                >
                  <Plus className="h-3 w-3 mr-1" /> Add
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConditionNode;
