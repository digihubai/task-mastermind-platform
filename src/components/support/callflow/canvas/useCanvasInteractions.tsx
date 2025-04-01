
import { useState, useRef } from "react";
import { CallFlowNode } from "@/types/support";

interface CanvasInteractionsProps {
  nodes: CallFlowNode[];
  onSelectNode: (nodeId: string) => void;
  onUpdateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
}

export const useCanvasInteractions = ({
  nodes,
  onSelectNode,
  onUpdateNodePosition
}: CanvasInteractionsProps) => {
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [draggingOffset, setDraggingOffset] = useState({ x: 0, y: 0 });
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);

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
    
    const canvasRect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
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
  };

  return {
    draggingNodeId,
    connectingFrom,
    setDraggingNodeId,
    setConnectingFrom,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleConnectorMouseDown,
    handleConnectorMouseUp
  };
};
