
import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import WorkflowTemplates from "@/components/automation/workflow-editor/WorkflowTemplates";

const WorkflowTemplatesPage = () => {
  const navigate = useNavigate();

  const handleCreateWorkflow = () => {
    navigate('/automation/editor');
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">Workflow Templates</h1>
            <p className="text-muted-foreground mt-1">Start with pre-built workflows for your business needs</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-10 w-[250px]" />
            </div>
            <Button onClick={handleCreateWorkflow} className="gap-2 bg-violet-600 hover:bg-violet-700">
              <Plus size={16} /> Create Custom
            </Button>
          </div>
        </div>

        <WorkflowTemplates />
      </div>
    </AppLayout>
  );
};

export default WorkflowTemplatesPage;
