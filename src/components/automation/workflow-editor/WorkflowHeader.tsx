
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Play, Share, Save } from "lucide-react";

interface WorkflowHeaderProps {
  workflowName: string;
  onChangeWorkflowName: (value: string) => void;
  description: string;
  onSave: () => void;
  onTest: () => void;
}

const WorkflowHeader = ({
  workflowName,
  onChangeWorkflowName,
  description,
  onSave,
  onTest
}: WorkflowHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => navigate('/automation/templates')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <Input
            value={workflowName}
            onChange={(e) => onChangeWorkflowName(e.target.value)}
            className="text-xl font-bold h-9 px-2 w-[300px] bg-transparent border-transparent focus-visible:bg-background"
          />
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onTest} className="gap-1">
          <Play className="h-4 w-4" /> Test
        </Button>
        <Button variant="outline" className="gap-1">
          <Share className="h-4 w-4" /> Share
        </Button>
        <Button onClick={onSave} className="gap-1 bg-violet-600 hover:bg-violet-700">
          <Save className="h-4 w-4" /> Save
        </Button>
      </div>
    </div>
  );
};

export default WorkflowHeader;
