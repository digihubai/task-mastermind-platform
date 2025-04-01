
import React from "react";
import { CallFlowNode } from "@/types/support";
import { 
  PhoneCall, 
  MessageSquare, 
  Phone, 
  Menu, 
  ArrowDownUp, 
  UserSquare2 
} from "lucide-react";

interface NodeRendererProps {
  node: CallFlowNode;
  isSelected: boolean;
  onNodeClick: (e: React.MouseEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onConnectorMouseDown: (e: React.MouseEvent) => void;
  onConnectorMouseUp: (e: React.MouseEvent) => void;
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  isSelected,
  onNodeClick,
  onMouseDown,
  onConnectorMouseDown,
  onConnectorMouseUp
}) => {
  const getNodeIcon = (type: CallFlowNode['type']) => {
    switch (type) {
      case 'greeting':
        return <PhoneCall size={20} className="text-white" />;
      case 'message':
        return <MessageSquare size={20} className="text-white" />;
      case 'input':
        return <UserSquare2 size={20} className="text-white" />;
      case 'menu':
        return <Menu size={20} className="text-white" />;
      case 'transfer':
        return <Phone size={20} className="text-white" />;
      case 'condition':
        return <ArrowDownUp size={20} className="text-white" />;
      default:
        return <MessageSquare size={20} className="text-white" />;
    }
  };
  
  const getNodeColor = (type: CallFlowNode['type']) => {
    switch (type) {
      case 'greeting':
        return 'bg-blue-500';
      case 'message':
        return 'bg-green-500';
      case 'input':
        return 'bg-purple-500';
      case 'menu':
        return 'bg-amber-500';
      case 'transfer':
        return 'bg-red-500';
      case 'condition':
        return 'bg-indigo-500';
      default:
        return 'bg-primary';
    }
  };

  const getNodeLabel = (type: CallFlowNode['type']) => {
    switch (type) {
      case 'greeting':
        return 'Greeting';
      case 'message':
        return 'Message';
      case 'input':
        return 'Input';
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

  return (
    <div 
      onClick={onNodeClick}
      className={`absolute p-3 rounded-md shadow-md w-[120px] cursor-move ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      } bg-white`}
      style={{
        left: node.position.x,
        top: node.position.y,
      }}
      onMouseDown={onMouseDown}
    >
      <div className="flex flex-col items-center">
        <div className={`${getNodeColor(node.type)} p-2 rounded-full mb-2`}>
          {getNodeIcon(node.type)}
        </div>
        <div className="text-xs font-medium text-center truncate w-full">
          {getNodeLabel(node.type)}
        </div>
      </div>
      
      {/* Output connector */}
      <div 
        className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer border-2 border-white"
        onMouseDown={onConnectorMouseDown}
      />
      
      {/* Input connector */}
      <div
        className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full cursor-pointer border-2 border-white"
        onMouseUp={onConnectorMouseUp}
      />
    </div>
  );
};
