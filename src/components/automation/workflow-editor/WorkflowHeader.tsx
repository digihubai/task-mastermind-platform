
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Play, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WorkflowHeaderProps {
  workflowName: string;
  onChangeWorkflowName: (name: string) => void;
  description?: string;
  onSave: () => void;
  onTest: () => void;
  isLoading?: boolean;
}

const WorkflowHeader = ({
  workflowName,
  onChangeWorkflowName,
  description,
  onSave,
  onTest,
  isLoading = false,
}: WorkflowHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/automation/workflows")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Input
            value={workflowName}
            onChange={(e) => onChangeWorkflowName(e.target.value)}
            className="max-w-xs text-lg font-semibold h-auto py-1 px-2 bg-transparent border-none hover:bg-muted/50 focus-visible:bg-muted focus-visible:ring-0 focus-visible:border-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onTest} disabled={isLoading}>
            <Play className="h-4 w-4 mr-1" /> Test
          </Button>
          <Button onClick={onSave} disabled={isLoading} className="gap-1">
            <Save className="h-4 w-4" /> Save
            {isLoading && (
              <svg
                className="animate-spin ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </Button>
        </div>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default WorkflowHeader;
