
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WorkflowStep from "./WorkflowStep";
import StepConnector from "./StepConnector";

interface WorkflowStep {
  id: string;
  type: "trigger" | "action" | "condition";
  name: string;
  icon: React.ReactNode;
}

interface WorkflowCanvasProps {
  steps: WorkflowStep[];
  onAddStep: () => void;
}

const WorkflowCanvas = ({ steps, onAddStep }: WorkflowCanvasProps) => {
  return (
    <div className="col-span-4 bg-card rounded-xl border border-border p-6 overflow-auto">
      <div className="flex flex-col items-center gap-2 min-h-[500px]">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <WorkflowStep step={step} />
            
            {index < steps.length - 1 && <StepConnector />}
          </React.Fragment>
        ))}
        
        <Button 
          variant="outline" 
          className="mt-4 border-dashed border-2 w-64"
          onClick={onAddStep}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Step
        </Button>
      </div>
    </div>
  );
};

export default WorkflowCanvas;
