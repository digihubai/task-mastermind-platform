
import React from "react";
import { ChatBotNode } from "@/types/support";
import { MessageSquare, ArrowRight, CornerDownRight } from "lucide-react";

interface FlowPreviewProps {
  nodes: ChatBotNode[];
}

export const FlowPreview: React.FC<FlowPreviewProps> = ({ nodes }) => {
  const getNodeTypeLabel = (type: ChatBotNode['type']) => {
    switch (type) {
      case 'start':
        return 'Start';
      case 'message':
        return 'Message';
      case 'input':
        return 'User Input';
      case 'condition':
        return 'Condition';
      case 'action':
        return 'Action';
      default:
        return type;
    }
  };

  if (nodes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Add nodes to your flow to see a preview.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {nodes.map((node) => (
        <div key={node.id} className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <MessageSquare size={18} className="text-primary" />
            </div>
            <span className="font-medium">
              {getNodeTypeLabel(node.type)}: {node.content?.substring(0, 30)}
              {node.content && node.content.length > 30 ? '...' : ''}
            </span>
          </div>
          
          {node.next && node.next.length > 0 && (
            <div className="pl-8 space-y-1">
              {node.next.map((nextId) => {
                const nextNode = nodes.find((n) => n.id === nextId);
                return nextNode ? (
                  <div key={nextId} className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CornerDownRight size={14} />
                    <ArrowRight size={14} />
                    <span>
                      {getNodeTypeLabel(nextNode.type)}: {nextNode.content?.substring(0, 20)}
                      {nextNode.content && nextNode.content.length > 20 ? '...' : ''}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
