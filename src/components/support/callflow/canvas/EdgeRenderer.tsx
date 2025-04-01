
import React from "react";
import { CallFlowNode, CallFlowEdge } from "@/types/support";

interface EdgeRendererProps {
  edges: CallFlowEdge[];
  nodes: CallFlowNode[];
  connectingFrom: string | null;
}

export const EdgeRenderer: React.FC<EdgeRendererProps> = ({ 
  edges, 
  nodes, 
  connectingFrom 
}) => {
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {/* Render edges */}
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
  );
};
