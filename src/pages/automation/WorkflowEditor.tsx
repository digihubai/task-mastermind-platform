
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import WorkflowHeader from "@/components/automation/workflow-editor/WorkflowHeader";
import WorkflowCanvas from "@/components/automation/workflow-editor/WorkflowCanvas";
import WorkflowSidebar from "@/components/automation/workflow-editor/WorkflowSidebar";
import { WorkflowActionPanel } from "@/components/automation/workflow-editor/WorkflowActionPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  useWorkflowEditor, 
  WorkflowStep 
} from "@/hooks/use-workflow-editor";

const WorkflowEditor = () => {
  const { id } = useParams<{ id: string }>();
  const {
    workflowName,
    setWorkflowName,
    steps,
    connections,
    templateDescription,
    isAiGenerating,
    isLoading,
    handleAddStep,
    handleConnectSteps,
    handleDisconnectSteps,
    handleUpdateStep,
    handleDeleteStep,
    handleSave,
    handleTest,
    handleAiGenerate
  } = useWorkflowEditor(id);
  
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("canvas");
  
  const selectedStep = steps.find(step => step.id === selectedStepId);

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <WorkflowHeader
          workflowName={workflowName}
          onChangeWorkflowName={setWorkflowName}
          description={templateDescription}
          onSave={handleSave}
          onTest={handleTest}
          isLoading={isLoading}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="border-b mb-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="canvas" className="px-8">Visual Editor</TabsTrigger>
              <TabsTrigger value="code" className="px-8">JSON Editor</TabsTrigger>
              <TabsTrigger value="test" className="px-8">Test & Debug</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 h-full">
            <TabsContent value="canvas" className="mt-0 flex-1 h-full">
              <div className="grid grid-cols-5 gap-6 h-full">
                <WorkflowCanvas 
                  steps={steps}
                  connections={connections}
                  selectedStepId={selectedStepId}
                  onSelectStep={setSelectedStepId}
                  onAddStep={handleAddStep}
                  onConnect={handleConnectSteps}
                  onDisconnect={handleDisconnectSteps}
                  onUpdateStepPosition={(id, position) => {
                    handleUpdateStep(id, { position });
                  }}
                />
                
                <div className="col-span-1">
                  {selectedStep ? (
                    <WorkflowActionPanel 
                      step={selectedStep} 
                      onUpdate={(updates) => handleUpdateStep(selectedStepId!, updates)}
                      onDelete={() => {
                        handleDeleteStep(selectedStepId!);
                        setSelectedStepId(null);
                      }}
                    />
                  ) : (
                    <WorkflowSidebar
                      workflowName={workflowName}
                      onChangeWorkflowName={setWorkflowName}
                      templateDescription={templateDescription}
                      onAiGenerate={handleAiGenerate}
                      isAiGenerating={isAiGenerating}
                      onAddStep={(type) => {
                        const newId = handleAddStep(type);
                        setSelectedStepId(newId);
                      }}
                    />
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="mt-0">
              <div className="bg-muted rounded-md p-4 h-[600px] overflow-auto font-mono text-sm">
                <pre>{JSON.stringify({ name: workflowName, steps, connections }, null, 2)}</pre>
              </div>
            </TabsContent>
            
            <TabsContent value="test" className="mt-0">
              <div className="grid grid-cols-2 gap-6">
                <div className="border rounded-md p-6">
                  <h3 className="text-lg font-medium mb-4">Test Workflow</h3>
                  <p className="text-muted-foreground mb-4">
                    Run your workflow with test data to see how it performs.
                  </p>
                  <button 
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    onClick={handleTest}
                  >
                    Run Test
                  </button>
                </div>
                
                <div className="border rounded-md p-6">
                  <h3 className="text-lg font-medium mb-4">Debug Console</h3>
                  <div className="bg-muted rounded-md p-4 h-[400px] overflow-auto">
                    <div className="text-muted-foreground">
                      <p>No test results yet. Click "Run Test" to start.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default WorkflowEditor;
