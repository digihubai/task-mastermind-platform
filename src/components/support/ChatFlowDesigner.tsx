
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChatBotFlow, ChatBotNode } from "@/types/support";
import { 
  Plus, 
  MessageSquare, 
  Download, 
  Upload, 
  Save, 
  Trash2, 
  ArrowRight,
  HelpCircle,
  CornerDownRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatFlowDesignerProps {
  flow: ChatBotFlow;
  onSave: (flow: ChatBotFlow) => void;
}

export const ChatFlowDesigner: React.FC<ChatFlowDesignerProps> = ({
  flow,
  onSave,
}) => {
  const [currentFlow, setCurrentFlow] = useState<ChatBotFlow>(flow);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const { toast } = useToast();

  const selectedNode = selectedNodeId
    ? currentFlow.nodes.find((node) => node.id === selectedNodeId)
    : null;

  const handleAddNode = (type: ChatBotNode['type']) => {
    const newNode: ChatBotNode = {
      id: `node-${Date.now()}`,
      type,
      content: type === 'start' ? 'Start' : '',
      next: [],
    };

    setCurrentFlow({
      ...currentFlow,
      nodes: [...currentFlow.nodes, newNode],
    });
    
    setSelectedNodeId(newNode.id);
  };

  const handleUpdateNode = (updates: Partial<ChatBotNode>) => {
    if (!selectedNodeId) return;

    setCurrentFlow({
      ...currentFlow,
      nodes: currentFlow.nodes.map((node) =>
        node.id === selectedNodeId ? { ...node, ...updates } : node
      ),
    });
  };

  const handleDeleteNode = (nodeId: string) => {
    setCurrentFlow({
      ...currentFlow,
      nodes: currentFlow.nodes.filter((node) => node.id !== nodeId),
    });
    
    // Remove references to this node from other nodes' next arrays
    setCurrentFlow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) => ({
        ...node,
        next: node.next?.filter((nextId) => nextId !== nodeId) || [],
      })),
    }));
    
    setSelectedNodeId(null);
  };

  const handleSaveFlow = () => {
    onSave(currentFlow);
    toast({
      title: "Flow saved",
      description: "Your chatbot flow has been saved successfully.",
    });
  };

  const handleExportFlow = () => {
    const dataStr = JSON.stringify(currentFlow, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${currentFlow.name.toLowerCase().replace(/\s+/g, '-')}-flow.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

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
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-6 border border-border/40 lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Flow Designer</h3>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportFlow}>
              <Download size={16} />
            </Button>
            <Button variant="outline" size="sm">
              <Upload size={16} />
            </Button>
            <Button size="sm" onClick={handleSaveFlow}>
              <Save size={16} />
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <Input
            placeholder="Flow Name"
            value={currentFlow.name}
            onChange={(e) => setCurrentFlow({ ...currentFlow, name: e.target.value })}
            className="mb-2"
          />
          <Textarea
            placeholder="Flow Description"
            value={currentFlow.description || ''}
            onChange={(e) => setCurrentFlow({ ...currentFlow, description: e.target.value })}
            className="resize-none h-20"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 my-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddNode('start')}
            className="gap-1"
          >
            <Plus size={16} />
            <span>Start</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddNode('message')}
            className="gap-1"
          >
            <Plus size={16} />
            <span>Message</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddNode('input')}
            className="gap-1"
          >
            <Plus size={16} />
            <span>Input</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddNode('condition')}
            className="gap-1"
          >
            <Plus size={16} />
            <span>Condition</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddNode('action')}
            className="gap-1"
          >
            <Plus size={16} />
            <span>Action</span>
          </Button>
        </div>
        
        <div className="space-y-2 mt-6">
          <h4 className="text-sm font-medium mb-2">Node List</h4>
          
          {currentFlow.nodes.map((node) => (
            <div
              key={node.id}
              className={`p-3 border rounded-md cursor-pointer ${
                selectedNodeId === node.id ? 'border-primary' : 'border-border'
              }`}
              onClick={() => setSelectedNodeId(node.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  <span>{getNodeTypeLabel(node.type)}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNode(node.id);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {node.content || 'No content'}
              </p>
            </div>
          ))}
          
          {currentFlow.nodes.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No nodes yet. Add a node to get started.
            </div>
          )}
        </div>
      </Card>
      
      <Card className="p-6 border border-border/40 lg:col-span-2">
        {selectedNode ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Edit Node: {getNodeTypeLabel(selectedNode.type)}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Content</label>
                <Textarea
                  value={selectedNode.content}
                  onChange={(e) => handleUpdateNode({ content: e.target.value })}
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
                  {currentFlow.nodes
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
                            handleUpdateNode({
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
                            ({node.content.substring(0, 20)}
                            {node.content.length > 20 ? '...' : ''})
                          </span>
                        </label>
                      </div>
                    ))}
                  
                  {currentFlow.nodes.length <= 1 && (
                    <div className="text-center py-2 text-muted-foreground">
                      Add more nodes to create connections.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center">
            <HelpCircle size={48} className="text-muted-foreground/50 mb-2" />
            <h3 className="text-lg font-medium">Select a Node</h3>
            <p className="text-sm text-muted-foreground">
              Select a node from the left panel to edit its properties.
            </p>
          </div>
        )}
      </Card>
      
      <Card className="p-6 border border-border/40 lg:col-span-3">
        <h3 className="text-lg font-medium mb-4">Flow Preview</h3>
        
        <div className="border rounded-md p-4 min-h-[200px]">
          {currentFlow.nodes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Add nodes to your flow to see a preview.
            </div>
          ) : (
            <div className="space-y-4">
              {currentFlow.nodes.map((node) => (
                <div key={node.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MessageSquare size={18} className="text-primary" />
                    </div>
                    <span className="font-medium">{getNodeTypeLabel(node.type)}: {node.content.substring(0, 30)}{node.content.length > 30 ? '...' : ''}</span>
                  </div>
                  
                  {node.next && node.next.length > 0 && (
                    <div className="pl-8 space-y-1">
                      {node.next.map((nextId) => {
                        const nextNode = currentFlow.nodes.find((n) => n.id === nextId);
                        return nextNode ? (
                          <div key={nextId} className="flex items-center gap-1 text-sm text-muted-foreground">
                            <CornerDownRight size={14} />
                            <ArrowRight size={14} />
                            <span>{getNodeTypeLabel(nextNode.type)}: {nextNode.content.substring(0, 20)}{nextNode.content.length > 20 ? '...' : ''}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
