
import React from "react";
import { CallFlowNode } from "@/types/support";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConditionNodeEditorProps {
  node: CallFlowNode;
  onUpdateNode: (updates: Partial<CallFlowNode>) => void;
}

export const ConditionNodeEditor: React.FC<ConditionNodeEditorProps> = ({ node, onUpdateNode }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Condition Type</label>
        <Select 
          value={node.data?.conditionType || 'input-match'}
          onValueChange={(value) => onUpdateNode({ 
            data: { ...node.data, conditionType: value }
          })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select condition type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="input-match">Input Match</SelectItem>
            <SelectItem value="sentiment">Caller Sentiment</SelectItem>
            <SelectItem value="time">Time of Day</SelectItem>
            <SelectItem value="queue-length">Queue Length</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Condition Value</label>
        <Input
          value={node.data?.conditionValue || ''}
          onChange={(e) => onUpdateNode({ 
            data: { ...node.data, conditionValue: e.target.value }
          })}
          placeholder="Enter condition value..."
        />
        <p className="text-xs text-muted-foreground mt-1">
          {node.data?.conditionType === 'input-match' && 'Text or DTMF to match'}
          {node.data?.conditionType === 'sentiment' && 'Positive, Negative, or Neutral'}
          {node.data?.conditionType === 'time' && 'Format: 08:00-17:00'}
          {node.data?.conditionType === 'queue-length' && 'Max queue length (e.g. 5)'}
        </p>
      </div>
    </div>
  );
};
