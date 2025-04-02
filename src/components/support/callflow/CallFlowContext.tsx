import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CallFlow, CallFlowNode, CallFlowEdge } from "@/types/support";
import { createNewCallNode } from "./utils";
import { useFlowConnections } from "@/hooks/use-flow-connections";

// Default flow if none is provided
const createDefaultFlow = (): CallFlow => ({
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
});

interface CallFlowContextType {
  currentFlow: CallFlow;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  viewMode: "list" | "canvas";
  setViewMode: (mode: "list" | "canvas") => void;
  handleAddNode: (type: string) => void;
  handleUpdateNode: (nodeId: string, updates: Partial<CallFlowNode>) => void;
  handleDeleteNode: (nodeId: string) => void;
  handleSaveFlow: () => void;
  handleExportFlow: () => void;
  handleUpdateFlow: (updates: Partial<CallFlow>) => void;
  handleAddEdge: (source: string, target: string) => void;
  handleRemoveEdge: (source: string, target: string) => void;
}

const CallFlowContext = createContext<CallFlowContextType | undefined>(undefined);

interface CallFlowProviderProps {
  children: React.ReactNode;
  initialFlow?: CallFlow;
  onSaveProp?: (flow: CallFlow) => void;
}

export const CallFlowProvider: React.FC<CallFlowProviderProps> = ({ 
  children, 
  initialFlow, 
  onSaveProp 
}) => {
  const [currentFlow, setCurrentFlow] = useState<CallFlow>(initialFlow || createDefaultFlow());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "canvas">("list");
  const { toast } = useToast();

  // Use our reusable flow connections hook
  const { 
    edges, 
    handleAddConnection, 
    handleRemoveConnection, 
    updateEdgesOnNodeChange 
  } = useFlowConnections<CallFlowNode, CallFlowEdge>(currentFlow.edges, {
    onConnectionAdded: (source, target, edge) => {
      // Additional callback logic if needed for call flow
    }
  });

  // Keep the flow's edges in sync with our connection hook state
  React.useEffect(() => {
    setCurrentFlow(prev => ({
      ...prev,
      edges: edges
    }));
  }, [edges]);

  const handleAddNode = (type: string) => {
    const newNode = createNewCallNode(type);
    
    setCurrentFlow(flow => ({
      ...flow,
      nodes: [...flow.nodes, newNode],
    }));
    
    setSelectedNodeId(newNode.id);
  };

  const handleUpdateNode = (nodeId: string, updates: Partial<CallFlowNode>) => {
    if (!nodeId) return;

    setCurrentFlow(flow => ({
      ...flow,
      nodes: flow.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...updates } : node
      ),
    }));
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

    setCurrentFlow(flow => ({
      ...flow,
      nodes: flow.nodes.filter((node) => node.id !== nodeId)
    }));
    
    // Use our reusable connection handler to update edges
    updateEdgesOnNodeChange(currentFlow.nodes.filter(node => node.id !== nodeId));
    
    setSelectedNodeId(null);
  };

  const handleSaveFlow = () => {
    const updatedFlow = {
      ...currentFlow,
      updatedAt: new Date().toISOString(),
    };
    
    if (onSaveProp) {
      onSaveProp(updatedFlow);
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

  // Use our shared connection handlers
  const handleAddEdge = (source: string, target: string) => {
    handleAddConnection(source, target);
  };

  const handleRemoveEdge = (source: string, target: string) => {
    handleRemoveConnection(source, target);
  };

  const value = {
    currentFlow,
    selectedNodeId,
    setSelectedNodeId,
    viewMode,
    setViewMode,
    handleAddNode,
    handleUpdateNode,
    handleDeleteNode,
    handleSaveFlow,
    handleExportFlow,
    handleUpdateFlow,
    handleAddEdge,
    handleRemoveEdge
  };

  return (
    <CallFlowContext.Provider value={value}>
      {children}
    </CallFlowContext.Provider>
  );
};

export const useCallFlow = (): CallFlowContextType => {
  const context = useContext(CallFlowContext);
  if (!context) {
    throw new Error("useCallFlow must be used within a CallFlowProvider");
  }
  return context;
};
