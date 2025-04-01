
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Clock, 
  GitBranch, 
  Workflow, 
  FileCode, 
  Sparkles,
  Plus
} from "lucide-react";
import { WorkflowStep } from "@/hooks/use-workflow-editor";

interface WorkflowSidebarProps {
  workflowName: string;
  onChangeWorkflowName: (value: string) => void;
  templateDescription: string;
  onAiGenerate: () => void;
  isAiGenerating: boolean;
  onAddStep: (type: WorkflowStep['type']) => void;
}

const WorkflowSidebar = ({
  workflowName,
  onChangeWorkflowName,
  templateDescription,
  onAiGenerate,
  isAiGenerating,
  onAddStep
}: WorkflowSidebarProps) => {
  return (
    <div className="h-full">
      <Tabs defaultValue="steps" className="w-full h-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>
        
        <TabsContent value="steps" className="h-full border rounded-md p-4">
          <div className="space-y-4">
            <h3 className="font-medium">Add Steps</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline"
                className="h-auto py-3 px-3 flex flex-col items-center justify-center"
                onClick={() => onAddStep('action')}
              >
                <Workflow className="h-5 w-5 mb-1 text-blue-500" />
                <span className="text-xs">Action</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-auto py-3 px-3 flex flex-col items-center justify-center"
                onClick={() => onAddStep('condition')}
              >
                <GitBranch className="h-5 w-5 mb-1 text-amber-500" />
                <span className="text-xs">Condition</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-auto py-3 px-3 flex flex-col items-center justify-center"
                onClick={() => onAddStep('delay')}
              >
                <Clock className="h-5 w-5 mb-1 text-purple-500" />
                <span className="text-xs">Delay</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-auto py-3 px-3 flex flex-col items-center justify-center"
                onClick={() => onAddStep('integration')}
              >
                <Zap className="h-5 w-5 mb-1 text-green-500" />
                <span className="text-xs">Integration</span>
              </Button>
            </div>
            
            <h3 className="font-medium pt-4">Templates</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-3 text-left"
              >
                <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-1 text-left">
                  <p className="font-medium text-sm">API Request</p>
                  <p className="text-xs text-muted-foreground">Make HTTP requests to external APIs</p>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-3 text-left"
              >
                <div className="w-8 h-8 rounded-md bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FileCode className="h-4 w-4 text-green-600" />
                </div>
                <div className="space-y-1 text-left">
                  <p className="font-medium text-sm">Data Transformation</p>
                  <p className="text-xs text-muted-foreground">Process and transform data between steps</p>
                </div>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="border rounded-md p-4">
          <div className="space-y-4">
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
                className="resize-none"
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
            
            <div className="space-y-2">
              <label className="text-sm font-medium mb-1.5 block">Execution Schedule</label>
              <Select defaultValue="instant">
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant (Trigger-based)</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="custom">Custom Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4 bg-violet-50 text-violet-700 hover:bg-violet-100 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:hover:bg-violet-900/30 dark:border-violet-800"
              onClick={onAiGenerate}
              disabled={isAiGenerating}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isAiGenerating ? "Generating..." : "AI: Improve Workflow"}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="help" className="border rounded-md p-4">
          <div className="text-sm space-y-4">
            <div>
              <h3 className="font-medium">Workflow Basics</h3>
              <p className="text-muted-foreground mt-1">
                Workflows are automated processes with triggers and actions. Drag elements from the sidebar to build your workflow.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Triggers</h3>
              <p className="text-muted-foreground mt-1">
                Events that start your workflow (form submissions, new records, scheduled events).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Actions</h3>
              <p className="text-muted-foreground mt-1">
                Tasks performed when conditions are met (send message, update record, API calls).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Conditions</h3>
              <p className="text-muted-foreground mt-1">
                Logic that determines workflow path based on data. Create branches for different conditions.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Delays</h3>
              <p className="text-muted-foreground mt-1">
                Add waiting periods between actions (wait minutes, hours, days or until specific conditions).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Integrations</h3>
              <p className="text-muted-foreground mt-1">
                Connect with external services like Zapier, Stripe, or custom APIs.
              </p>
            </div>
            
            <div className="pt-2">
              <Button variant="link" className="p-0 h-auto text-primary">
                View Documentation
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowSidebar;
