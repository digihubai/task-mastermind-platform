
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

type StepType = "trigger" | "action" | "condition";

interface WorkflowStepProps {
  step: {
    id: string;
    type: StepType;
    name: string;
    icon: React.ReactNode;
  };
}

const WorkflowStep = ({ step }: WorkflowStepProps) => {
  const getStepStyles = (type: StepType) => {
    switch (type) {
      case "trigger":
        return {
          cardClass: "border-violet-400 bg-violet-50 dark:bg-violet-900/20",
          iconClass: "bg-violet-100 text-violet-700 dark:bg-violet-800 dark:text-violet-300",
        };
      case "condition":
        return {
          cardClass: "border-amber-400 bg-amber-50 dark:bg-amber-900/20",
          iconClass: "bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-300",
        };
      default:
        return {
          cardClass: "border-blue-400 bg-blue-50 dark:bg-blue-900/20",
          iconClass: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300",
        };
    }
  };

  const { cardClass, iconClass } = getStepStyles(step.type);

  return (
    <Card className={`w-64 border ${cardClass}`}>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${iconClass}`}>
          {step.icon}
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">{step.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{step.type}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowStep;
