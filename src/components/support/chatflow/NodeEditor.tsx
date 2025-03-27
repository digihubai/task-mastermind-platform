
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { ChatBotNode } from "@/types/support";
import { MessageSquare, HelpCircle } from "lucide-react";

interface NodeEditorProps {
  selectedNode: ChatBotNode | null;
  availableNodes: ChatBotNode[];
  onUpdateNode: (updates: Partial<ChatBotNode>) => void;
}

export const NodeEditor: React.FC<NodeEditorProps> = ({
  selectedNode,
  availableNodes,
  onUpdateNode,
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

  if (!selectedNode) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <HelpCircle size={48} className="text-muted-foreground/50 mb-2" />
        <h3 className="text-lg font-medium">Select a Node</h3>
        <p className="text-sm text-muted-foreground">
          Select a node from the left panel to edit its properties.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Edit Node: {getNodeTypeLabel(selectedNode.type)}</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Content</label>
          <Textarea
            value={selectedNode.content}
            onChange={(e) => onUpdateNode({ content: e.target.value })}
            className="resize-none h-40"
            placeholder={
              selectedNode.type === 'message'
                ? 'Enter the message to display to the user...'
                : selectedNode.type === 'input'
                ? 'Enter the question to ask the user...'
                : selectedNode.type === 'condition'
                ? 'Enter the condition logic...'
                : selectedNode.type === 'action'
                ? 'Enter the action to perform...'
                : ''
            }
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Next Nodes</label>
          
          <div className="space-y-2">
            {availableNodes
              .filter((node) => node.id !== selectedNode.id)
              .map((node) => (
                <div
                  key={node.id}
                  className="flex items-center gap-2 p-2 border rounded-md"
                >
                  <input
                    type="checkbox"
                    id={`next-${node.id}`}
                    checked={selectedNode.next?.includes(node.id) || false}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      onUpdateNode({
                        next: isChecked
                          ? [...(selectedNode.next || []), node.id]
                          : selectedNode.next?.filter((id) => id !== node.id) || [],
                      });
                    }}
                  />
                  <label htmlFor={`next-${node.id}`} className="flex items-center gap-1 text-sm cursor-pointer">
                    <MessageSquare size={14} />
                    <span>{getNodeTypeLabel(node.type)}</span>
                    <span className="text-xs text-muted-foreground">
                      ({node.content?.substring(0, 20)}
                      {node.content && node.content.length > 20 ? '...' : ''})
                    </span>
                  </label>
                </div>
              ))}
            
            {availableNodes.length <= 1 && (
              <div className="text-center py-2 text-muted-foreground">
                Add more nodes to create connections.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
