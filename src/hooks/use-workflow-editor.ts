import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useFlowConnections } from './use-flow-connections';

export interface WorkflowStep {
  id: string;
  type: "trigger" | "action" | "condition" | "delay" | "integration" | "branch";
  name: string;
  icon?: React.ReactNode;
  config?: any;
  branches?: {
    condition: string;
    nextStepId?: string;
  }[];
  nextStepId?: string;
  position?: { x: number, y: number };
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: WorkflowStep[];
  isPopular?: boolean;
  thumbnail?: string;
}

// Mock API data - in production, this would be replaced with actual API calls
const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'lead-nurturing',
    name: 'Lead Nurturing',
    description: 'Automatically nurture leads with personalized emails based on behavior',
    category: 'marketing',
    isPopular: true,
    steps: [
      {
        id: 'trigger-1',
        type: 'trigger',
        name: 'New Lead Created',
        icon: undefined
      },
      {
        id: 'action-1',
        type: 'action',
        name: 'Send Welcome Email',
        icon: undefined
      },
      {
        id: 'delay-1',
        type: 'delay',
        name: 'Wait 3 Days',
        icon: undefined,
        config: { delay: '3d' }
      },
      {
        id: 'condition-1',
        type: 'condition',
        name: 'Opened Email?',
        icon: undefined,
        branches: [
          { 
            condition: 'Yes', 
            nextStepId: 'action-2' 
          },
          { 
            condition: 'No', 
            nextStepId: 'action-3' 
          }
        ]
      },
      {
        id: 'action-2',
        type: 'action',
        name: 'Send Product Info',
        icon: undefined
      },
      {
        id: 'action-3',
        type: 'action',
        name: 'Send Follow-up Email',
        icon: undefined
      }
    ]
  },
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding',
    description: 'Guide new customers through product onboarding steps',
    category: 'customer-service',
    steps: [
      {
        id: 'trigger-1',
        type: 'trigger',
        name: 'New Customer Created',
        icon: undefined
      },
      {
        id: 'action-1',
        type: 'action',
        name: 'Send Welcome Message',
        icon: undefined
      }
    ]
  }
];

const MOCK_WORKFLOWS = [
  {
    id: '1',
    name: 'Lead Qualification',
    description: 'Qualify leads based on criteria and route to appropriate sales rep',
    steps: [
      {
        id: 'trigger-1',
        type: 'trigger',
        name: 'New Lead Form Submission',
        icon: undefined
      },
      {
        id: 'condition-1',
        type: 'condition',
        name: 'Lead Score > 80?',
        icon: undefined,
        branches: [
          { condition: 'Yes', nextStepId: 'action-1' },
          { condition: 'No', nextStepId: 'action-2' }
        ]
      },
      {
        id: 'action-1',
        type: 'action',
        name: 'Assign to Sales Rep',
        icon: undefined
      },
      {
        id: 'action-2',
        type: 'action',
        name: 'Add to Nurturing Campaign',
        icon: undefined
      }
    ]
  },
  {
    id: '2',
    name: 'Support Ticket Routing',
    description: 'Route support tickets based on priority and category',
    steps: [
      {
        id: 'trigger-1',
        type: 'trigger',
        name: 'New Support Ticket Created',
        icon: undefined
      },
      {
        id: 'condition-1',
        type: 'condition',
        name: 'Priority Check',
        icon: undefined,
        branches: [
          { condition: 'High', nextStepId: 'action-1' },
          { condition: 'Medium', nextStepId: 'action-2' },
          { condition: 'Low', nextStepId: 'action-3' }
        ]
      },
      {
        id: 'action-1',
        type: 'action',
        name: 'Assign to Senior Support',
        icon: undefined
      },
      {
        id: 'action-2',
        type: 'action',
        name: 'Assign to Regular Support Queue',
        icon: undefined
      },
      {
        id: 'action-3',
        type: 'action',
        name: 'Send Auto-Response with FAQ',
        icon: undefined
      }
    ]
  },
  {
    id: '3',
    name: 'Order Fulfillment',
    description: 'Process new orders from payment to shipping',
    steps: [
      {
        id: 'trigger-1',
        type: 'trigger',
        name: 'New Order Received',
        icon: undefined
      },
      {
        id: 'action-1',
        type: 'action',
        name: 'Verify Payment',
        icon: undefined
      },
      {
        id: 'condition-1',
        type: 'condition',
        name: 'Payment Verified?',
        icon: undefined,
        branches: [
          { condition: 'Yes', nextStepId: 'action-2' },
          { condition: 'No', nextStepId: 'action-3' }
        ]
      },
      {
        id: 'action-2',
        type: 'action',
        name: 'Create Shipping Label',
        icon: undefined
      },
      {
        id: 'action-3',
        type: 'action',
        name: 'Send Payment Failure Email',
        icon: undefined
      }
    ]
  },
  {
    id: '4',
    name: 'Customer Follow-up',
    description: 'Automated follow-up sequence for new customers',
    steps: [
      {
        id: 'trigger-1',
        type: 'trigger',
        name: 'New Customer Created',
        icon: undefined,
        nextStepId: 'action-1'
      },
      {
        id: 'action-1',
        type: 'action',
        name: 'Send Welcome Email',
        icon: undefined,
        nextStepId: 'delay-1'
      },
      {
        id: 'delay-1',
        type: 'delay',
        name: 'Wait 3 Days',
        icon: undefined,
        config: { delay: '3d' },
        nextStepId: 'action-2'
      },
      {
        id: 'action-2',
        type: 'action',
        name: 'Send Follow-up Email',
        icon: undefined,
        nextStepId: 'delay-2'
      },
      {
        id: 'delay-2',
        type: 'delay',
        name: 'Wait 7 Days',
        icon: undefined,
        config: { delay: '7d' },
        nextStepId: 'condition-1'
      },
      {
        id: 'condition-1',
        type: 'condition',
        name: 'Product Used?',
        icon: undefined,
        branches: [
          { condition: 'Yes', nextStepId: 'action-3' },
          { condition: 'No', nextStepId: 'action-4' }
        ]
      },
      {
        id: 'action-3',
        type: 'action',
        name: 'Send Feedback Request',
        icon: undefined,
        nextStepId: 'integration-1'
      },
      {
        id: 'action-4',
        type: 'action',
        name: 'Send Re-engagement Email',
        icon: undefined
      },
      {
        id: 'integration-1',
        type: 'integration',
        name: 'Create Task in Asana',
        icon: undefined,
        config: { integration: 'asana', action: 'create_task' }
      }
    ]
  }
];

export function useWorkflowEditor(id?: string) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [workflowName, setWorkflowName] = useState('New Workflow');
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [templateDescription, setTemplateDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [connections, setConnections] = useState<{from: string, to: string}[]>([]);

  const { 
    edges,
    handleAddConnection,
    handleRemoveConnection,
    updateEdgesOnNodeChange
  } = useFlowConnections<WorkflowStep, { id: string; source: string; target: string }>(
    connections.map(conn => ({ 
      id: `${conn.from}-${conn.to}`, 
      source: conn.from, 
      target: conn.to 
    }))
  );

  useEffect(() => {
    setConnections(
      edges.map(edge => ({ from: edge.source, to: edge.target }))
    );
  }, [edges]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      setTimeout(() => {
        const workflow = MOCK_WORKFLOWS.find(wf => wf.id === id);
        
        if (workflow) {
          setWorkflowName(workflow.name);
          setTemplateDescription(workflow.description);
          setSteps(workflow.steps);
          
          const newConnections: {from: string, to: string}[] = [];
          workflow.steps.forEach(step => {
            if (step.nextStepId) {
              newConnections.push({
                from: step.id,
                to: step.nextStepId
              });
            }
            
            if (step.branches) {
              step.branches.forEach(branch => {
                if (branch.nextStepId) {
                  newConnections.push({
                    from: step.id,
                    to: branch.nextStepId
                  });
                }
              });
            }
          });
          
          setConnections(newConnections);
        }
        
        setIsLoading(false);
      }, 500);
    } else {
      setWorkflowName('New Workflow');
      setTemplateDescription('');
      setSteps([
        {
          id: `trigger-${Date.now()}`,
          type: 'trigger',
          name: 'Workflow Start',
          icon: undefined
        }
      ]);
      setConnections([]);
    }
  }, [id]);

  const handleAddStep = (type: WorkflowStep['type'] = 'action', afterStepId?: string) => {
    const newStepId = `${type}-${Date.now()}`;
    
    let stepName = 'New Action';
    if (type === 'condition') stepName = 'New Condition';
    if (type === 'delay') stepName = 'Delay';
    if (type === 'integration') stepName = 'Integration';
    if (type === 'branch') stepName = 'Branch';
    
    const newStep: WorkflowStep = {
      id: newStepId,
      type,
      name: stepName,
      icon: undefined
    };
    
    if (type === 'condition') {
      newStep.branches = [
        { condition: 'Yes' },
        { condition: 'No' }
      ];
    }
    
    if (type === 'delay') {
      newStep.config = { delay: '1d' };
    }
    
    if (type === 'integration') {
      newStep.config = { integration: 'zapier', action: 'webhook' };
    }
    
    setSteps(prev => [...prev, newStep]);
    
    if (afterStepId) {
      const afterStep = steps.find(step => step.id === afterStepId);
      if (afterStep) {
        if (afterStep.type === 'condition' && afterStep.branches) {
        } else {
          handleAddConnection(afterStepId, newStepId);
        }
      }
    }
    
    return newStepId;
  };

  const handleConnectSteps = (fromId: string, toId: string, branchIndex?: number) => {
    handleAddConnection(fromId, toId, branchIndex ? `branch-${branchIndex}` : undefined);
    
    if (typeof branchIndex === 'number') {
      setSteps(prev => prev.map(step => {
        if (step.id === fromId && step.type === 'condition' && step.branches) {
          const newBranches = [...step.branches];
          newBranches[branchIndex] = {
            ...newBranches[branchIndex],
            nextStepId: toId
          };
          return {
            ...step,
            branches: newBranches
          };
        }
        return step;
      }));
    }
  };

  const handleDisconnectSteps = (fromId: string, toId: string) => {
    handleRemoveConnection(fromId, toId);
    
    setSteps(prev => prev.map(step => {
      if (step.id === fromId) {
        if (step.nextStepId === toId) {
          return { ...step, nextStepId: undefined };
        }
        
        if (step.branches) {
          const newBranches = step.branches.map(branch => {
            if (branch.nextStepId === toId) {
              return { ...branch, nextStepId: undefined };
            }
            return branch;
          });
          return { ...step, branches: newBranches };
        }
      }
      return step;
    }));
  };

  const handleUpdateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  const handleDeleteStep = (stepId: string) => {
    if (steps.find(step => step.id === stepId)?.type === 'trigger') {
      toast({
        title: "Cannot delete trigger",
        description: "A workflow must have a trigger step.",
        variant: "destructive"
      });
      return;
    }
    
    setSteps(prev => prev.filter(step => step.id !== stepId));
    
    updateEdgesOnNodeChange(steps.filter(step => step.id !== stepId));
  };

  const handleSave = () => {
    setIsLoading(true);
    
    const updatedSteps: WorkflowStep[] = steps.map(step => {
      const stepConnections = connections.filter(conn => conn.from === step.id);
      
      if (step.type === 'condition' && step.branches) {
        return step;
      } else if (stepConnections.length > 0) {
        return {
          ...step,
          nextStepId: stepConnections[0].to
        };
      }
      
      return step;
    });
    
    setTimeout(() => {
      toast({
        title: "Workflow saved",
        description: `Successfully saved "${workflowName}"`,
      });
      
      setIsLoading(false);
      
      if (!id) {
        navigate('/automation/workflows');
      }
    }, 800);
  };

  const handleTest = () => {
    toast({
      title: "Test initiated",
      description: "Your workflow test has started. Check the results in the test panel.",
    });
  };

  const handleAiGenerate = () => {
    setIsAiGenerating(true);
    
    setTimeout(() => {
      toast({
        title: "AI Enhancement Complete",
        description: "Your workflow has been optimized with AI suggestions.",
      });
      
      handleAddStep('integration');
      
      setIsAiGenerating(false);
    }, 1500);
  };

  return {
    workflowName,
    setWorkflowName,
    templateDescription,
    setTemplateDescription,
    steps,
    connections,
    isLoading,
    isAiGenerating,
    handleAddStep,
    handleConnectSteps,
    handleDisconnectSteps,
    handleUpdateStep,
    handleDeleteStep,
    handleSave,
    handleTest,
    handleAiGenerate
  };
}
