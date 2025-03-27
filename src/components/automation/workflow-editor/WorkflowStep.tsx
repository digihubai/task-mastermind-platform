
import React from "react";
import { cn } from "@/lib/utils";

interface WorkflowStepProps {
  step: {
    id: string;
    type: "trigger" | "action" | "condition";
    name: string;
    icon: React.ReactNode;
  };
  className?: string;
}

const WorkflowStep = ({ step, className }: WorkflowStepProps) => {
  // Determine step color based on type
  const stepTypeStyles = {
    trigger: "bg-violet-100 border-violet-200 text-violet-700 dark:bg-violet-900/30 dark:border-violet-800 dark:text-violet-300",
    action: "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300",
    condition: "bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300"
  };

  // Determine label based on step type
  const stepTypeLabel = {
    trigger: "Trigger",
    action: "Action",
    condition: "Condition"
  };

  return (
    <div className={cn("border rounded-md p-4 w-64", stepTypeStyles[step.type], className)}>
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center mr-3">
          {step.icon}
        </div>
        <div>
          <p className="text-xs font-medium">{stepTypeLabel[step.type]}</p>
          <h4 className="font-medium">{step.name}</h4>
        </div>
      </div>
    </div>
  );
};

export default WorkflowStep;
