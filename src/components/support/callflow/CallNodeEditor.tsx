
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CallFlowNode, CallFlowEdge } from "@/types/support";
import { HelpCircle, Plus, Trash2 } from "lucide-react";

interface CallNodeEditorProps {
  selectedNode: CallFlowNode | null;
  availableNodes: CallFlowNode[];
  edges: CallFlowEdge[];
  onUpdateNode: (updates: Partial<CallFlowNode>) => void;
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

  const renderNodeEditor = () => {
    switch (selectedNode.type) {
      case 'greeting':
      case 'message':
        return (
          <div>
            <label className="text-sm font-medium mb-1 block">Message to Speak</label>
            <Textarea
              value={selectedNode.data?.message || ''}
              onChange={(e) => onUpdateNode({ data: { ...selectedNode.data, message: e.target.value } })}
              className="resize-none h-40"
              placeholder="Enter the message that will be spoken to the caller..."
            />
          </div>
        );
        
      case 'input':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Question to Ask</label>
              <Textarea
                value={selectedNode.data?.question || ''}
                onChange={(e) => onUpdateNode({ data: { ...selectedNode.data, question: e.target.value } })}
                className="resize-none h-20"
                placeholder="Enter the question to ask the caller..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Input Type</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedNode.data?.inputType || 'voice'}
                onChange={(e) => onUpdateNode({ 
                  data: { ...selectedNode.data, inputType: e.target.value }
                })}
              >
                <option value="voice">Voice Input</option>
                <option value="dtmf">DTMF (Touch Tone)</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
        );
        
      case 'menu':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Menu Introduction</label>
              <Textarea
                value={selectedNode.data?.introduction || ''}
                onChange={(e) => onUpdateNode({ 
                  data: { ...selectedNode.data, introduction: e.target.value }
                })}
                className="resize-none h-20"
                placeholder="Enter the introduction to the menu options..."
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Menu Options</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const options = selectedNode.data?.options || [];
                    onUpdateNode({
                      data: {
                        ...selectedNode.data,
                        options: [...options, { key: options.length + 1, description: '' }]
                      }
                    });
                  }}
                  className="gap-1"
                >
                  <Plus size={14} />
                  <span>Add Option</span>
                </Button>
              </div>
              
              <div className="space-y-2">
                {(selectedNode.data?.options || []).map((option: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      className="w-12 flex-shrink-0"
                      value={option.key}
                      onChange={(e) => {
                        const options = [...(selectedNode.data?.options || [])];
                        options[index] = { ...option, key: e.target.value };
                        onUpdateNode({
                          data: { ...selectedNode.data, options }
                        });
                      }}
                      placeholder="Key"
                    />
                    <Input
                      className="flex-grow"
                      value={option.description}
                      onChange={(e) => {
                        const options = [...(selectedNode.data?.options || [])];
                        options[index] = { ...option, description: e.target.value };
                        onUpdateNode({
                          data: { ...selectedNode.data, options }
                        });
                      }}
                      placeholder="Option description"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const options = selectedNode.data?.options.filter((_: any, i: number) => i !== index) || [];
                        onUpdateNode({
                          data: { ...selectedNode.data, options }
                        });
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
                
                {(!selectedNode.data?.options || selectedNode.data.options.length === 0) && (
                  <div className="text-sm text-muted-foreground py-2 text-center border rounded-md">
                    No options yet. Click "Add Option" to create menu options.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'transfer':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Transfer Message</label>
              <Textarea
                value={selectedNode.data?.message || ''}
                onChange={(e) => onUpdateNode({ 
                  data: { ...selectedNode.data, message: e.target.value }
                })}
                className="resize-none h-20"
                placeholder="Enter the message to play before transferring the call..."
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Department/Agent</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedNode.data?.department || ''}
                onChange={(e) => onUpdateNode({ 
                  data: { ...selectedNode.data, department: e.target.value }
                })}
              >
                <option value="">-- Select --</option>
                <option value="sales">Sales Department</option>
                <option value="support">Support Department</option>
                <option value="billing">Billing Department</option>
                <option value="technical">Technical Support</option>
                <option value="human-agent">Available Human Agent</option>
              </select>
            </div>
          </div>
        );
        
      case 'condition':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Condition Type</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedNode.data?.conditionType || 'input-match'}
                onChange={(e) => onUpdateNode({ 
                  data: { ...selectedNode.data, conditionType: e.target.value }
                })}
              >
                <option value="input-match">Input Match</option>
                <option value="sentiment">Caller Sentiment</option>
                <option value="time">Time of Day</option>
                <option value="queue-length">Queue Length</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Condition Value</label>
              <Input
                value={selectedNode.data?.conditionValue || ''}
                onChange={(e) => onUpdateNode({ 
                  data: { ...selectedNode.data, conditionValue: e.target.value }
                })}
                placeholder="Enter condition value..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                {selectedNode.data?.conditionType === 'input-match' && 'Text or DTMF to match'}
                {selectedNode.data?.conditionType === 'sentiment' && 'Positive, Negative, or Neutral'}
                {selectedNode.data?.conditionType === 'time' && 'Format: 08:00-17:00'}
                {selectedNode.data?.conditionType === 'queue-length' && 'Max queue length (e.g. 5)'}
              </p>
            </div>
          </div>
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
                      {node.type === 'greeting' ? 'Initial Greeting' : 
                       node.type === 'message' ? `Message: ${node.data?.message?.substring(0, 20)}...` :
                       node.type === 'input' ? `Input: ${node.data?.question?.substring(0, 20)}...` :
                       node.type === 'menu' ? 'Menu Options' :
                       node.type === 'transfer' ? `Transfer to ${node.data?.department}` :
                       node.type === 'condition' ? `Condition: ${node.data?.conditionType}` :
                       node.type}
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
      </div>
    </div>
  );
};
