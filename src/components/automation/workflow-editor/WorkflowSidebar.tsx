
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface WorkflowSidebarProps {
  workflowName: string;
  onChangeWorkflowName: (value: string) => void;
  templateDescription: string;
  onAiGenerate: () => void;
  isAiGenerating: boolean;
}

const WorkflowSidebar = ({
  workflowName,
  onChangeWorkflowName,
  templateDescription,
  onAiGenerate,
  isAiGenerating
}: WorkflowSidebarProps) => {
  return (
    <div className="col-span-1">
      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Workflow Name</label>
            <Input 
              value={workflowName}
              onChange={(e) => onChangeWorkflowName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <Textarea 
              rows={3}
              placeholder="Describe what this workflow does..."
              defaultValue={templateDescription}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Category</label>
            <Select defaultValue="customer-service">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="sales">Sales & CRM</SelectItem>
                <SelectItem value="project">Project Management</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4 bg-violet-50 text-violet-700 hover:bg-violet-100 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:hover:bg-violet-900/30 dark:border-violet-800"
            onClick={onAiGenerate}
            disabled={isAiGenerating}
          >
            {isAiGenerating ? "Generating..." : "AI: Improve Workflow"}
          </Button>
        </TabsContent>
        
        <TabsContent value="help">
          <div className="text-sm space-y-4">
            <div>
              <h3 className="font-medium">Workflow Basics</h3>
              <p className="text-muted-foreground mt-1">
                Workflows are automated processes with triggers and actions.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Triggers</h3>
              <p className="text-muted-foreground mt-1">
                Events that start your workflow (messages, calls, form submissions).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Actions</h3>
              <p className="text-muted-foreground mt-1">
                Tasks performed when conditions are met (send message, create ticket).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Conditions</h3>
              <p className="text-muted-foreground mt-1">
                Logic that determines workflow path based on data.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowSidebar;
