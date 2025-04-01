
import React from "react";
import { Button } from "@/components/ui/button";
import { CallFlowNode } from "@/types/support";
import { 
  PhoneCall, 
  MessageSquare, 
  Phone, 
  Menu, 
  ArrowDownUp,
  UserSquare2, 
  Trash2 
} from "lucide-react";

interface CallNodeListProps {
  nodes: CallFlowNode[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
}

export const CallNodeList: React.FC<CallNodeListProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  onDeleteNode,
}) => {
  const getNodeIcon = (type: CallFlowNode['type']) => {
    switch (type) {
      case 'greeting':
        return <PhoneCall size={16} />;
      case 'message':
        return <MessageSquare size={16} />;
      case 'input':
        return <UserSquare2 size={16} />;
      case 'menu':
        return <Menu size={16} />;
      case 'transfer':
        return <Phone size={16} />;
      case 'condition':
        return <ArrowDownUp size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  const getNodeTypeLabel = (type: CallFlowNode['type']) => {
    switch (type) {
      case 'greeting':
        return 'Greeting';
      case 'message':
        return 'Message';
      case 'input':
        return 'User Input';
      case 'menu':
        return 'Menu Options';
      case 'transfer':
        return 'Transfer Call';
      case 'condition':
        return 'Condition';
      default:
        return type;
    }
  };

  const getNodeContent = (node: CallFlowNode) => {
    if (node.type === 'greeting' || node.type === 'message') {
      return node.data?.message || 'No message';
    }
    if (node.type === 'input') {
      return node.data?.question || 'Input question';
    }
    if (node.type === 'menu') {
      return `${node.data?.options?.length || 0} options`;
    }
    if (node.type === 'transfer') {
      return node.data?.department || 'Transfer';
    }
    if (node.type === 'condition') {
      return node.data?.condition || 'Condition';
    }
    return 'No content';
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
              {getNodeIcon(node.type)}
              <span>{getNodeTypeLabel(node.type)}</span>
            </div>
            
            {node.id !== 'start-node' && (
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
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {getNodeContent(node)}
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
