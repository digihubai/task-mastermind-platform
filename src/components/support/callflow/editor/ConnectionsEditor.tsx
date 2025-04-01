
import React from "react";
import { CallFlowNode } from "@/types/support";

interface ConnectionsEditorProps {
  selectedNode: CallFlowNode;
  availableNodes: CallFlowNode[];
  connectedNodeIds: string[];
  onAddEdge: (source: string, target: string) => void;
  onRemoveEdge: (source: string, target: string) => void;
}

export const ConnectionsEditor: React.FC<ConnectionsEditorProps> = ({
  selectedNode,
  availableNodes,
  connectedNodeIds,
  onAddEdge,
  onRemoveEdge
}) => {
  const getNodeLabel = (node: CallFlowNode) => {
    switch (node.type) {
      case 'greeting':
        return 'Initial Greeting';
      case 'message':
        return `Message: ${node.data?.message?.substring(0, 20)}...`;
      case 'input':
        return `Input: ${node.data?.question?.substring(0, 20)}...`;
      case 'menu':
        return 'Menu Options';
      case 'transfer':
        return `Transfer to ${node.data?.department}`;
      case 'condition':
        return `Condition: ${node.data?.conditionType}`;
      default:
        return node.type;
    }
  };

  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Next Nodes</h4>
      
      <div className="space-y-2">
        {availableNodes
          .filter((node) => node.id !== selectedNode.id)
          .map((node) => (
            <div
              key={node.id}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`next-${node.id}`}
                  checked={connectedNodeIds.includes(node.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onAddEdge(selectedNode.id, node.id);
                    } else {
                      onRemoveEdge(selectedNode.id, node.id);
                    }
                  }}
                />
                <label htmlFor={`next-${node.id}`} className="text-sm">
                  {getNodeLabel(node)}
                </label>
              </div>
            </div>
          ))}
        
        {availableNodes.length <= 1 && (
          <div className="text-center py-2 text-muted-foreground">
            Add more nodes to create connections.
          </div>
        )}
      </div>
    </div>
  );
};
