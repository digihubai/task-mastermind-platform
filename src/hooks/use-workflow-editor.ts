
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Mail, Phone, Users, Database, FileText, Zap, ArrowDownUp } from "lucide-react";
import React from "react";

export interface WorkflowStep {
  id: string;
  type: "trigger" | "action" | "condition";
  name: string;
  icon: React.ReactNode;
}

export interface WorkflowTemplate {
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export const useWorkflowEditor = (initialTemplateId?: string) => {
  const { toast } = useToast();
  
  const templateData: Record<number, WorkflowTemplate> = {
    1: {
      name: "Customer Support IVR",
      description: "Interactive voice response system for customer support",
      steps: [
        { id: "trigger", type: "trigger", name: "Phone Call Received", icon: React.createElement(Phone, { size: 20 }) },
        { id: "step1", type: "action", name: "Welcome Message", icon: React.createElement(MessageSquare, { size: 20 }) },
        { id: "step2", type: "condition", name: "Language Selection", icon: React.createElement(ArrowDownUp, { size: 20 }) },
        { id: "step3", type: "action", name: "Route to Department", icon: React.createElement(Users, { size: 20 }) },
      ]
    },
    2: {
      name: "Multi-Channel Chat Support",
      description: "Manage customer chat from multiple channels",
      steps: [
        { id: "trigger", type: "trigger", name: "Message Received", icon: React.createElement(MessageSquare, { size: 20 }) },
        { id: "step1", type: "condition", name: "Check Channel Type", icon: React.createElement(ArrowDownUp, { size: 20 }) },
        { id: "step2", type: "action", name: "Auto Response", icon: React.createElement(MessageSquare, { size: 20 }) },
        { id: "step3", type: "action", name: "Create Support Ticket", icon: React.createElement(FileText, { size: 20 }) },
      ]
    }
  };
  
  const defaultTemplate = {
    name: "New Workflow",
    description: "Create your workflow from scratch",
    steps: [
      { id: "trigger", type: "trigger", name: "Select Trigger", icon: React.createElement(Zap, { size: 20 }) },
    ]
  };

  const template = initialTemplateId && templateData[Number(initialTemplateId)]
    ? templateData[Number(initialTemplateId)]
    : defaultTemplate;

  const [workflowName, setWorkflowName] = useState(template.name);
  const [steps, setSteps] = useState<WorkflowStep[]>(template.steps);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const handleAddStep = () => {
    const newStep = {
      id: `step${steps.length}`,
      type: "action" as const,
      name: "New Step",
      icon: React.createElement(MessageSquare, { size: 20 })
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
        { id: `step${steps.length}`, type: "action" as const, name: "AI Suggested: Personalized Response", icon: React.createElement(MessageSquare, { size: 20 }) },
        { id: `step${steps.length + 1}`, type: "condition" as const, name: "AI Suggested: Check Sentiment", icon: React.createElement(ArrowDownUp, { size: 20 }) },
        { id: `step${steps.length + 2}`, type: "action" as const, name: "AI Suggested: Update CRM", icon: React.createElement(Database, { size: 20 }) }
      ];
      
      setSteps(aiSuggestedSteps);
      setIsAiGenerating(false);
      
      toast({
        title: "AI workflow enhancement complete",
        description: "3 new steps have been added to your workflow"
      });
    }, 2000);
  };

  return {
    workflowName,
    setWorkflowName,
    steps,
    setSteps,
    isAiGenerating,
    templateDescription: template.description,
    handleAddStep,
    handleSave,
    handleTest,
    handleAiGenerate
  };
};
