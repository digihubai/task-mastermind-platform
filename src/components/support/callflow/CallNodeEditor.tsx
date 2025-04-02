
import React from "react";
import { CallFlowNode, CallFlowEdge } from "@/types/support";
import { HelpCircle } from "lucide-react";
import { NodeEditorEmpty } from "./editor/NodeEditorEmpty";
import { TextNodeEditor } from "./editor/TextNodeEditor";
import { InputNodeEditor } from "./editor/InputNodeEditor";
import { MenuNodeEditor } from "./editor/MenuNodeEditor";
import { TransferNodeEditor } from "./editor/TransferNodeEditor";
import { ConditionNodeEditor } from "./editor/ConditionNodeEditor";
import { ConnectionsEditor } from "./editor/ConnectionsEditor";

interface CallNodeEditorProps {
  selectedNode: CallFlowNode | null;
  availableNodes: CallFlowNode[];
  edges: CallFlowEdge[];
  onUpdateNode: (nodeId: string, updates: Partial<CallFlowNode>) => void;
  onAddEdge: (source: string, target: string) => void;
  onRemoveEdge: (source: string, target: string) => void;
}

export const CallNodeEditor: React.FC<CallNodeEditorProps> = ({
  selectedNode,
  availableNodes,
  edges,
  onUpdateNode,
  onAddEdge,
  onRemoveEdge,
}) => {
  if (!selectedNode) {
    return <NodeEditorEmpty />;
  }

  // Wrapper function to match the interface expected by child components
  const handleUpdateNode = (updates: Partial<CallFlowNode>) => {
    onUpdateNode(selectedNode.id, updates);
  };

  const renderNodeEditor = () => {
    switch (selectedNode.type) {
      case 'greeting':
      case 'message':
        return (
          <TextNodeEditor 
            node={selectedNode} 
            onUpdateNode={handleUpdateNode} 
          />
        );
        
      case 'input':
        return (
          <InputNodeEditor 
            node={selectedNode} 
            onUpdateNode={handleUpdateNode} 
          />
        );
        
      case 'menu':
        return (
          <MenuNodeEditor 
            node={selectedNode} 
            onUpdateNode={handleUpdateNode} 
          />
        );
        
      case 'transfer':
        return (
          <TransferNodeEditor 
            node={selectedNode} 
            onUpdateNode={handleUpdateNode} 
          />
        );
        
      case 'condition':
        return (
          <ConditionNodeEditor 
            node={selectedNode} 
            onUpdateNode={handleUpdateNode} 
          />
        );
        
      default:
        return (
          <div className="text-center py-4 text-muted-foreground">
            No editor available for this node type.
          </div>
        );
    }
  };

  // Find existing connections for this node
  const outgoingConnections = edges.filter(edge => edge.source === selectedNode.id);
  const connectedNodeIds = outgoingConnections.map(edge => edge.target);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Edit Node</h3>
      </div>
      
      <div className="space-y-6">
        {renderNodeEditor()}
        
        <ConnectionsEditor 
          selectedNode={selectedNode}
          availableNodes={availableNodes}
          connectedNodeIds={connectedNodeIds}
          onAddEdge={onAddEdge}
          onRemoveEdge={onRemoveEdge}
        />
      </div>
    </div>
  );
};
