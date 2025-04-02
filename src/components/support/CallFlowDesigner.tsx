
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CallFlow, CallFlowNode } from "@/types/support";
import { useToast } from "@/hooks/use-toast";
import { CallFlowControls } from "./callflow/CallFlowControls";
import { CallNodeList } from "./callflow/CallNodeList";
import { CallNodeEditor } from "./callflow/CallNodeEditor";
import { CallFlowPreview } from "./callflow/CallFlowPreview";
import { CallFlowCanvas } from "./callflow/CallFlowCanvas";
import { createNewCallNode } from "./callflow/utils";
import { CallFlowProvider, useCallFlow } from "./callflow/CallFlowContext";

interface CallFlowDesignerProps {
  flow?: CallFlow;
  onSave?: (flow: CallFlow) => void;
}

// Container component that provides context to children
export const CallFlowDesigner: React.FC<CallFlowDesignerProps> = (props) => {
  return (
    <CallFlowProvider initialFlow={props.flow} onSaveProp={props.onSave}>
      <CallFlowDesignerContent />
    </CallFlowProvider>
  );
};

// Content component that uses the context
const CallFlowDesignerContent: React.FC = () => {
  const { 
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
  } = useCallFlow();

  const selectedNode = selectedNodeId
    ? currentFlow.nodes.find((node) => node.id === selectedNodeId)
    : null;
    
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
              handleUpdateNode(id, { position });
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
