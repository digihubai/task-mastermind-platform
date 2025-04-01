
import React from "react";
import { CallFlowNode } from "@/types/support";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransferNodeEditorProps {
  node: CallFlowNode;
  onUpdateNode: (updates: Partial<CallFlowNode>) => void;
}

export const TransferNodeEditor: React.FC<TransferNodeEditorProps> = ({ node, onUpdateNode }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Transfer Message</label>
        <Textarea
          value={node.data?.message || ''}
          onChange={(e) => onUpdateNode({ 
            data: { ...node.data, message: e.target.value }
          })}
          className="resize-none h-20"
          placeholder="Enter the message to play before transferring the call..."
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Department/Agent</label>
        <Select 
          value={node.data?.department || ''}
          onValueChange={(value) => onUpdateNode({ 
            data: { ...node.data, department: value }
          })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">-- Select --</SelectItem>
            <SelectItem value="sales">Sales Department</SelectItem>
            <SelectItem value="support">Support Department</SelectItem>
            <SelectItem value="billing">Billing Department</SelectItem>
            <SelectItem value="technical">Technical Support</SelectItem>
            <SelectItem value="human-agent">Available Human Agent</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
