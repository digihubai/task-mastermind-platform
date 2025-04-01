
import React, { useState, useRef, useEffect } from "react";
import { CallFlowNode, CallFlowEdge } from "@/types/support";
import { NodeRenderer } from "./canvas/NodeRenderer";
import { EdgeRenderer } from "./canvas/EdgeRenderer";
import { useCanvasInteractions } from "./canvas/useCanvasInteractions";

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
  
  const { 
    draggingNodeId,
    connectingFrom,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleConnectorMouseDown,
    handleConnectorMouseUp,
    setDraggingNodeId,
    setConnectingFrom
  } = useCanvasInteractions({
    nodes,
    onSelectNode,
    onUpdateNodePosition
  });

  // Global mouse up handler
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDraggingNodeId(null);
      setConnectingFrom(null);
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [setDraggingNodeId, setConnectingFrom]);

  return (
    <div 
      ref={canvasRef} 
      className="w-full h-[400px] bg-muted/20 border rounded-md relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* SVG for edges */}
      <EdgeRenderer 
        edges={edges} 
        nodes={nodes} 
        connectingFrom={connectingFrom} 
      />
      
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
        <NodeRenderer
          key={node.id}
          node={node}
          isSelected={selectedNodeId === node.id}
          onNodeClick={(e) => {
            e.stopPropagation();
            onSelectNode(node.id);
          }}
          onMouseDown={(e) => handleMouseDown(e, node.id)}
          onConnectorMouseDown={(e) => handleConnectorMouseDown(e, node.id)}
          onConnectorMouseUp={(e) => {
            handleConnectorMouseUp(e, node.id);
            if (connectingFrom && connectingFrom !== node.id) {
              onAddEdge(connectingFrom, node.id);
            }
          }}
        />
      ))}
    </div>
  );
};
