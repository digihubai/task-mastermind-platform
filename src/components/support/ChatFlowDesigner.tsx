
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChatBotFlow } from "@/types/support";
import { useToast } from "@/hooks/use-toast";
import { FlowControls } from "./chatflow/FlowControls";
import { NodeList } from "./chatflow/NodeList";
import { NodeEditor } from "./chatflow/NodeEditor";
import { FlowPreview } from "./chatflow/FlowPreview";
import { createNewNode } from "./chatflow/utils";

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

  const handleAddNode = (type: string) => {
    const newNode = createNewNode(type);
    
    setCurrentFlow({
      ...currentFlow,
      nodes: [...currentFlow.nodes, newNode],
    });
    
    setSelectedNodeId(newNode.id);
  };

  const handleUpdateNode = (updates: Partial<any>) => {
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

  const handleUpdateFlow = (updates: Partial<ChatBotFlow>) => {
    setCurrentFlow({
      ...currentFlow,
      ...updates,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-6 border border-border/40 lg:col-span-1">
        <FlowControls 
          flow={currentFlow}
          onUpdateFlow={handleUpdateFlow}
          onAddNode={handleAddNode}
          onSave={handleSaveFlow}
          onExport={handleExportFlow}
        />
        
        <NodeList 
          nodes={currentFlow.nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          onDeleteNode={handleDeleteNode}
        />
      </Card>
      
      <Card className="p-6 border border-border/40 lg:col-span-2">
        <NodeEditor 
          selectedNode={selectedNode}
          availableNodes={currentFlow.nodes}
          onUpdateNode={handleUpdateNode}
        />
      </Card>
      
      <Card className="p-6 border border-border/40 lg:col-span-3">
        <h3 className="text-lg font-medium mb-4">Flow Preview</h3>
        
        <div className="border rounded-md p-4 min-h-[200px]">
          <FlowPreview nodes={currentFlow.nodes} />
        </div>
      </Card>
    </div>
  );
};
