
import React from "react";
import { CallFlowNode } from "@/types/support";
import { Textarea } from "@/components/ui/textarea";

interface TextNodeEditorProps {
  node: CallFlowNode;
  onUpdateNode: (updates: Partial<CallFlowNode>) => void;
}

export const TextNodeEditor: React.FC<TextNodeEditorProps> = ({ node, onUpdateNode }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">Message to Speak</label>
      <Textarea
        value={node.data?.message || ''}
        onChange={(e) => onUpdateNode({ data: { ...node.data, message: e.target.value } })}
        className="resize-none h-40"
        placeholder="Enter the message that will be spoken to the caller..."
      />
    </div>
  );
};
