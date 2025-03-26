
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, ArrowRight, Plus, Save, Play, Undo, Redo, Share, Settings,
  MessageSquare, Mail, Phone, Users, Database, FileText, Zap, ArrowDownUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WorkflowEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workflowName, setWorkflowName] = useState("New Workflow");
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const templateData = {
    1: {
      name: "Customer Support IVR",
      description: "Interactive voice response system for customer support",
      steps: [
        { id: "trigger", type: "trigger", name: "Phone Call Received", icon: <Phone size={20} /> },
        { id: "step1", type: "action", name: "Welcome Message", icon: <MessageSquare size={20} /> },
        { id: "step2", type: "condition", name: "Language Selection", icon: <ArrowDownUp size={20} /> },
        { id: "step3", type: "action", name: "Route to Department", icon: <Users size={20} /> },
      ]
    },
    2: {
      name: "Multi-Channel Chat Support",
      description: "Manage customer chat from multiple channels",
      steps: [
        { id: "trigger", type: "trigger", name: "Message Received", icon: <MessageSquare size={20} /> },
        { id: "step1", type: "condition", name: "Check Channel Type", icon: <ArrowDownUp size={20} /> },
        { id: "step2", type: "action", name: "Auto Response", icon: <MessageSquare size={20} /> },
        { id: "step3", type: "action", name: "Create Support Ticket", icon: <FileText size={20} /> },
      ]
    }
  };

  const template = id && templateData[Number(id)] ? templateData[Number(id)] : {
    name: "New Workflow",
    description: "Create your workflow from scratch",
    steps: [
      { id: "trigger", type: "trigger", name: "Select Trigger", icon: <Zap size={20} /> },
    ]
  };

  const [steps, setSteps] = useState(template.steps);

  const handleAddStep = () => {
    const newStep = {
      id: `step${steps.length}`,
      type: "action",
      name: "New Step",
      icon: <MessageSquare size={20} />
    };
    
    setSteps([...steps, newStep]);
  };

  const handleSave = () => {
    toast({
      title: "Workflow saved",
      description: "Your workflow has been saved successfully"
    });
  };

  const handleTest = () => {
    toast({
      title: "Test mode activated",
      description: "Your workflow is now running in test mode"
    });
  };

  const handleAiGenerate = () => {
    setIsAiGenerating(true);
    
    // Simulate AI generating workflow suggestions
    setTimeout(() => {
      const aiSuggestedSteps = [
        ...steps,
        { id: `step${steps.length}`, type: "action", name: "AI Suggested: Personalized Response", icon: <MessageSquare size={20} /> },
        { id: `step${steps.length + 1}`, type: "condition", name: "AI Suggested: Check Sentiment", icon: <ArrowDownUp size={20} /> },
        { id: `step${steps.length + 2}`, type: "action", name: "AI Suggested: Update CRM", icon: <Database size={20} /> }
      ];
      
      setSteps(aiSuggestedSteps);
      setIsAiGenerating(false);
      
      toast({
        title: "AI workflow enhancement complete",
        description: "3 new steps have been added to your workflow"
      });
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => navigate('/automation/templates')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <Input
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="text-xl font-bold h-9 px-2 w-[300px] bg-transparent border-transparent focus-visible:bg-background"
              />
              <p className="text-muted-foreground text-sm">{template.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleTest} className="gap-1">
              <Play className="h-4 w-4" /> Test
            </Button>
            <Button variant="outline" className="gap-1">
              <Share className="h-4 w-4" /> Share
            </Button>
            <Button onClick={handleSave} className="gap-1 bg-violet-600 hover:bg-violet-700">
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-6 flex-1">
          <div className="col-span-4 bg-card rounded-xl border border-border p-6 overflow-auto">
            <div className="flex flex-col items-center gap-2 min-h-[500px]">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <Card className={`w-64 border ${step.type === 'trigger' ? 'border-violet-400 bg-violet-50 dark:bg-violet-900/20' : step.type === 'condition' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step.type === 'trigger' ? 'bg-violet-100 text-violet-700 dark:bg-violet-800 dark:text-violet-300' : step.type === 'condition' ? 'bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300'}`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{step.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{step.type}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {index < steps.length - 1 && (
                    <div className="h-6 flex items-center justify-center">
                      <ArrowDown className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </React.Fragment>
              ))}
              
              <Button 
                variant="outline" 
                className="mt-4 border-dashed border-2 w-64"
                onClick={handleAddStep}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Step
              </Button>
            </div>
          </div>
          
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
                    onChange={(e) => setWorkflowName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Description</label>
                  <Textarea 
                    rows={3}
                    placeholder="Describe what this workflow does..."
                    defaultValue={template.description}
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
                  onClick={handleAiGenerate}
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
        </div>
      </div>
    </AppLayout>
  );
};

// Arrow down component for the workflow steps
const ArrowDown = ({ className }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 5V19M12 19L19 12M12 19L5 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default WorkflowEditor;
