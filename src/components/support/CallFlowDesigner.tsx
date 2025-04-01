
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CallFlow } from "@/types/support";
import { useToast } from "@/hooks/use-toast";
import { CallFlowControls } from "./callflow/CallFlowControls";
import { CallNodeList } from "./callflow/CallNodeList";
import { CallNodeEditor } from "./callflow/CallNodeEditor";
import { CallFlowPreview } from "./callflow/CallFlowPreview";
import { CallFlowCanvas } from "./callflow/CallFlowCanvas";
import { createNewCallNode } from "./callflow/utils";

export interface CallFlowDesignerProps {
  flow?: CallFlow;
  onSave?: (flow: CallFlow) => void;
}

export const CallFlowDesigner: React.FC<CallFlowDesignerProps> = ({
  flow: initialFlow,
  onSave,
}) => {
  // Default flow if none is provided
  const defaultFlow: CallFlow = {
    id: `flow-${Date.now()}`,
    name: "New Call Flow",
    description: "A new interactive voice response flow",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    nodes: [
      {
        id: "start-node",
        type: "greeting",
        position: { x: 100, y: 100 },
        data: { message: "Hello, thank you for calling. How can we help you today?" }
      }
    ],
    edges: [],
    isActive: false,
    language: "en",
    voiceType: "natural-female"
  };

  const [currentFlow, setCurrentFlow] = useState<CallFlow>(initialFlow || defaultFlow);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "canvas">("list");
  const { toast } = useToast();

  const selectedNode = selectedNodeId
    ? currentFlow.nodes.find((node) => node.id === selectedNodeId)
    : null;

  const handleAddNode = (type: string) => {
    const newNode = createNewCallNode(type);
    
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
    // Don't delete the start node
    if (nodeId === "start-node") {
      toast({
        title: "Cannot delete start node",
        description: "The greeting node is required for all call flows.",
        variant: "destructive"
      });
      return;
    }

    setCurrentFlow({
      ...currentFlow,
      nodes: currentFlow.nodes.filter((node) => node.id !== nodeId),
      // Also update any node that has this one as next
      edges: currentFlow.edges.filter(edge => 
        edge.source !== nodeId && edge.target !== nodeId
      )
    });
    
    setSelectedNodeId(null);
  };

  const handleSaveFlow = () => {
    if (onSave) {
      onSave(currentFlow);
    } else {
      toast({
        title: "Flow saved",
        description: "Your call flow has been saved successfully.",
      });
    }
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

  const handleUpdateFlow = (updates: Partial<CallFlow>) => {
    setCurrentFlow({
      ...currentFlow,
      ...updates,
    });
  };

  const handleAddEdge = (source: string, target: string) => {
    // Check if this edge already exists
    const edgeExists = currentFlow.edges.some(
      edge => edge.source === source && edge.target === target
    );
    
    if (!edgeExists) {
      setCurrentFlow({
        ...currentFlow,
        edges: [...currentFlow.edges, { id: `${source}-${target}`, source, target }]
      });
    }
  };

  const handleRemoveEdge = (source: string, target: string) => {
    setCurrentFlow({
      ...currentFlow,
      edges: currentFlow.edges.filter(
        edge => !(edge.source === source && edge.target === target)
      )
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-6 border border-border/40 lg:col-span-1">
        <CallFlowControls 
          flow={currentFlow}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
          onUpdateFlow={handleUpdateFlow}
          onAddNode={handleAddNode}
          onSave={handleSaveFlow}
          onExport={handleExportFlow}
        />
        
        {viewMode === "list" && (
          <CallNodeList 
            nodes={currentFlow.nodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            onDeleteNode={handleDeleteNode}
          />
        )}
      </Card>
      
      <Card className="p-6 border border-border/40 lg:col-span-2">
        {viewMode === "list" ? (
          <CallNodeEditor 
            selectedNode={selectedNode}
            availableNodes={currentFlow.nodes}
            edges={currentFlow.edges}
            onUpdateNode={handleUpdateNode}
            onAddEdge={handleAddEdge}
            onRemoveEdge={handleRemoveEdge}
          />
        ) : (
          <CallFlowCanvas 
            nodes={currentFlow.nodes}
            edges={currentFlow.edges}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            onUpdateNodePosition={(id, position) => {
              setCurrentFlow({
                ...currentFlow,
                nodes: currentFlow.nodes.map(node => 
                  node.id === id ? { ...node, position } : node
                )
              });
            }}
            onAddEdge={handleAddEdge}
            onRemoveEdge={handleRemoveEdge}
          />
        )}
      </Card>
      
      <Card className="p-6 border border-border/40 lg:col-span-3">
        <h3 className="text-lg font-medium mb-4">Call Flow Preview</h3>
        
        <div className="border rounded-md p-4 min-h-[200px]">
          <CallFlowPreview nodes={currentFlow.nodes} edges={currentFlow.edges} />
        </div>
      </Card>
    </div>
  );
};

export default CallFlowDesigner;
