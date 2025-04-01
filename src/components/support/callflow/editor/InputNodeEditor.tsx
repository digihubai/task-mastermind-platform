
import React from "react";
import { CallFlowNode } from "@/types/support";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InputNodeEditorProps {
  node: CallFlowNode;
  onUpdateNode: (updates: Partial<CallFlowNode>) => void;
}

export const InputNodeEditor: React.FC<InputNodeEditorProps> = ({ node, onUpdateNode }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Question to Ask</label>
        <Textarea
          value={node.data?.question || ''}
          onChange={(e) => onUpdateNode({ data: { ...node.data, question: e.target.value } })}
          className="resize-none h-20"
          placeholder="Enter the question to ask the caller..."
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Input Type</label>
        <Select 
          value={node.data?.inputType || 'voice'}
          onValueChange={(value) => onUpdateNode({ 
            data: { ...node.data, inputType: value }
          })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select input type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="voice">Voice Input</SelectItem>
            <SelectItem value="dtmf">DTMF (Touch Tone)</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
