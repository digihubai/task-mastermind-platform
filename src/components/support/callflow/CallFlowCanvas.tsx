
import React, { useState, useRef, useEffect } from "react";
import { CallFlowNode, CallFlowEdge } from "@/types/support";
import { 
  PhoneCall, 
  MessageSquare, 
  Phone, 
  Menu, 
  ArrowDownUp, 
  UserSquare2,
} from "lucide-react";

interface CallFlowCanvasProps {
  nodes: CallFlowNode[];
  edges: CallFlowEdge[];
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onUpdateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  onAddEdge: (source: string, target: string) => void;
  onRemoveEdge: (source: string, target: string) => void;
}

export const CallFlowCanvas: React.FC<CallFlowCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode,
  onUpdateNodePosition,
  onAddEdge,
  onRemoveEdge,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [draggingOffset, setDraggingOffset] = useState({ x: 0, y: 0 });
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  
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

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    
    // Start dragging
    const node = nodes.find(node => node.id === nodeId);
    if (!node) return;
    
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDraggingNodeId(nodeId);
    setDraggingOffset({ x: offsetX, y: offsetY });
    onSelectNode(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId) return;
    
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    
    const x = e.clientX - canvasRect.left - draggingOffset.x;
    const y = e.clientY - canvasRect.top - draggingOffset.y;
    
    onUpdateNodePosition(draggingNodeId, { x, y });
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };
  
  const handleConnectorMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setConnectingFrom(nodeId);
  };
  
  const handleConnectorMouseUp = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (connectingFrom && connectingFrom !== nodeId) {
      onAddEdge(connectingFrom, nodeId);
    }
    setConnectingFrom(null);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDraggingNodeId(null);
      setConnectingFrom(null);
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className="w-full h-[400px] bg-muted/20 border rounded-md relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Render edges */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {edges.map((edge) => {
          const sourceNode = nodes.find(node => node.id === edge.source);
          const targetNode = nodes.find(node => node.id === edge.target);
          
          if (!sourceNode || !targetNode) return null;
          
          const sourceX = sourceNode.position.x + 60; // Width of node / 2
          const sourceY = sourceNode.position.y + 30; // Height of node / 2
          const targetX = targetNode.position.x + 60; // Width of node / 2
          const targetY = targetNode.position.y + 30; // Height of node / 2
          
          return (
            <g key={edge.id}>
              <line
                x1={sourceX}
                y1={sourceY}
                x2={targetX}
                y2={targetY}
                stroke="rgba(100, 116, 139, 0.5)"
                strokeWidth={2}
                markerEnd="url(#arrow)"
              />
              <defs>
                <marker
                  id="arrow"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="rgba(100, 116, 139, 0.5)"
                  />
                </marker>
              </defs>
            </g>
          );
        })}
        
        {/* Render connecting line when dragging */}
        {connectingFrom && (
          <line
            x1={nodes.find(node => node.id === connectingFrom)?.position.x! + 60}
            y1={nodes.find(node => node.id === connectingFrom)?.position.y! + 30}
            x2={(document.getElementById("canvas-mouse-tracker") as HTMLDivElement)?.offsetLeft || 0}
            y2={(document.getElementById("canvas-mouse-tracker") as HTMLDivElement)?.offsetTop || 0}
            stroke="rgba(100, 116, 139, 0.5)"
            strokeWidth={2}
            strokeDasharray="4"
          />
        )}
      </svg>
      
      {/* Mouse tracker for drawing connections */}
      {connectingFrom && (
        <div 
          id="canvas-mouse-tracker" 
          className="absolute" 
          style={{ 
            left: 0, 
            top: 0, 
            transform: `translate(${0}px, ${0}px)`,
            pointerEvents: 'none' 
          }} 
        />
      )}

      {/* Render nodes */}
      {nodes.map((node) => (
        <div 
          key={node.id}
          onClick={(e) => {
            e.stopPropagation();
            onSelectNode(node.id);
          }}
          className={`absolute p-3 rounded-md shadow-md w-[120px] cursor-move ${
            selectedNodeId === node.id ? 'ring-2 ring-primary ring-offset-2' : ''
          } bg-white`}
          style={{
            left: node.position.x,
            top: node.position.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, node.id)}
        >
          <div className="flex flex-col items-center">
            <div className={`${getNodeColor(node.type)} p-2 rounded-full mb-2`}>
              {getNodeIcon(node.type)}
            </div>
            <div className="text-xs font-medium text-center truncate w-full">
              {node.type === 'greeting' ? 'Greeting' : 
               node.type === 'message' ? 'Message' :
               node.type === 'input' ? 'Input' :
               node.type === 'menu' ? 'Menu' :
               node.type === 'transfer' ? 'Transfer' :
               node.type === 'condition' ? 'Condition' :
               node.type}
            </div>
          </div>
          
          {/* Node connector */}
          <div 
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer border-2 border-white"
            onMouseDown={(e) => handleConnectorMouseDown(e, node.id)}
            onMouseUp={(e) => handleConnectorMouseUp(e, node.id)}
          />
          <div
            className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full cursor-pointer border-2 border-white"
            onMouseUp={(e) => handleConnectorMouseUp(e, node.id)}
          />
        </div>
      ))}
    </div>
  );
};
