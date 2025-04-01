
import React from "react";
import { CallFlowNode, CallFlowEdge } from "@/types/support";
import { 
  PhoneCall, 
  MessageSquare, 
  Phone, 
  Menu, 
  ArrowDownUp, 
  UserSquare2,
  ArrowRight, 
  CornerDownRight 
} from "lucide-react";

interface CallFlowPreviewProps {
  nodes: CallFlowNode[];
  edges: CallFlowEdge[];
}

export const CallFlowPreview: React.FC<CallFlowPreviewProps> = ({ nodes, edges }) => {
  const getNodeIcon = (type: CallFlowNode['type']) => {
    switch (type) {
      case 'greeting':
        return <PhoneCall size={18} className="text-blue-500" />;
      case 'message':
        return <MessageSquare size={18} className="text-green-500" />;
      case 'input':
        return <UserSquare2 size={18} className="text-purple-500" />;
      case 'menu':
        return <Menu size={18} className="text-amber-500" />;
      case 'transfer':
        return <Phone size={18} className="text-red-500" />;
      case 'condition':
        return <ArrowDownUp size={18} className="text-indigo-500" />;
      default:
        return <MessageSquare size={18} className="text-primary" />;
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
        return 'Menu';
      case 'transfer':
        return 'Transfer';
      case 'condition':
        return 'Condition';
      default:
        return type;
    }
  };

  const getNodeContent = (node: CallFlowNode) => {
    if (node.type === 'greeting' || node.type === 'message') {
      return node.data?.message || '';
    }
    if (node.type === 'input') {
      return node.data?.question || '';
    }
    if (node.type === 'menu') {
      return node.data?.introduction || '';
    }
    if (node.type === 'transfer') {
      return `Transfer to ${node.data?.department || 'department'}`;
    }
    if (node.type === 'condition') {
      return `Check ${node.data?.conditionType || 'condition'}`;
    }
    return '';
  };

  if (nodes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Add nodes to your flow to see a preview.
      </div>
    );
  }

  // Find the start node (usually greeting)
  const startNode = nodes.find(node => node.id === 'start-node') || nodes[0];
  
  // Recursive function to render node and its children
  const renderNodeTree = (node: CallFlowNode, depth = 0) => {
    // Find all edges that start from this node
    const nodeEdges = edges.filter(edge => edge.source === node.id);
    // Find the target nodes
    const targetNodes = nodeEdges.map(edge => 
      nodes.find(n => n.id === edge.target)
    ).filter(Boolean) as CallFlowNode[];
    
    return (
      <div key={node.id} className="mb-4" style={{ marginLeft: `${depth * 20}px` }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-primary/10 p-2 rounded-full">
            {getNodeIcon(node.type)}
          </div>
          <div>
            <span className="font-medium">
              {getNodeTypeLabel(node.type)}
            </span>
            <p className="text-sm text-muted-foreground">
              {getNodeContent(node).substring(0, 60)}
              {getNodeContent(node).length > 60 ? '...' : ''}
            </p>
          </div>
        </div>
        
        {targetNodes.length > 0 && (
          <div className="pl-8 space-y-1 mt-1 border-l-2 border-dashed border-muted">
            {targetNodes.map(targetNode => renderNodeTree(targetNode, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {renderNodeTree(startNode)}
    </div>
  );
};
