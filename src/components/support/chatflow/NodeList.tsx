
import React from "react";
import { Button } from "@/components/ui/button";
import { ChatBotNode } from "@/types/support";
import { MessageSquare, Trash2 } from "lucide-react";

interface NodeListProps {
  nodes: ChatBotNode[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
}

export const NodeList: React.FC<NodeListProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  onDeleteNode,
}) => {
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

  return (
    <div className="space-y-2 mt-6">
      <h4 className="text-sm font-medium mb-2">Node List</h4>
      
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`p-3 border rounded-md cursor-pointer ${
            selectedNodeId === node.id ? 'border-primary' : 'border-border'
          }`}
          onClick={() => onSelectNode(node.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>{getNodeTypeLabel(node.type)}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNode(node.id);
              }}
            >
              <Trash2 size={16} />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {node.content || 'No content'}
          </p>
        </div>
      ))}
      
      {nodes.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          No nodes yet. Add a node to get started.
        </div>
      )}
    </div>
  );
};
