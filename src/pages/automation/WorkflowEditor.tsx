
import React from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import WorkflowHeader from "@/components/automation/workflow-editor/WorkflowHeader";
import WorkflowCanvas from "@/components/automation/workflow-editor/WorkflowCanvas";
import WorkflowSidebar from "@/components/automation/workflow-editor/WorkflowSidebar";
import { useWorkflowEditor } from "@/hooks/use-workflow-editor";

const WorkflowEditor = () => {
  const { id } = useParams<{ id: string }>();
  const {
    workflowName,
    setWorkflowName,
    steps,
    templateDescription,
    isAiGenerating,
    handleAddStep,
    handleSave,
    handleTest,
    handleAiGenerate
  } = useWorkflowEditor(id);

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <WorkflowHeader
          workflowName={workflowName}
          onChangeWorkflowName={setWorkflowName}
          description={templateDescription}
          onSave={handleSave}
          onTest={handleTest}
        />
        
        <div className="grid grid-cols-5 gap-6 flex-1">
          <WorkflowCanvas 
            steps={steps}
            onAddStep={handleAddStep}
          />
          
          <WorkflowSidebar
            workflowName={workflowName}
            onChangeWorkflowName={setWorkflowName}
            templateDescription={templateDescription}
            onAiGenerate={handleAiGenerate}
            isAiGenerating={isAiGenerating}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default WorkflowEditor;
