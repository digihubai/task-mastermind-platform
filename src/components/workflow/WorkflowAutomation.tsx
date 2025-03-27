
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Zap, ArrowDownUp, MessageSquare, Mail, Phone, Users, 
  Database, FileText, Webhook, Bot, Copy, Calendar, Clock 
} from "lucide-react";

interface WorkflowNodeProps {
  type: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onConfigure: () => void;
  isConfigured: boolean;
  isActive: boolean;
  onToggleActive: () => void;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  type,
  title,
  description,
  icon,
  onConfigure,
  isConfigured,
  isActive,
  onToggleActive
}) => {
  const getBgColor = () => {
    switch(type) {
      case 'trigger': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'action': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'condition': return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'integration': return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      default: return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };
  
  return (
    <Card className={`${getBgColor()} transition-all ${isActive ? 'opacity-100' : 'opacity-70'}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-full">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <Switch checked={isActive} onCheckedChange={onToggleActive} />
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-xs ${isConfigured ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
            {isConfigured ? 'Configured' : 'Needs setup'}
          </span>
          <Button variant="ghost" size="sm" onClick={onConfigure}>
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const WorkflowAutomation = () => {
  const [showConnector, setShowConnector] = useState(false);
  const [nodes, setNodes] = useState([
    { 
      id: 'trigger-1', 
      type: 'trigger', 
      title: 'New Ticket', 
      description: 'When a new support ticket is created', 
      icon: <MessageSquare size={18} className="text-blue-600 dark:text-blue-400" />,
      isConfigured: true,
      isActive: true
    },
    { 
      id: 'condition-1', 
      type: 'condition', 
      title: 'Check Priority', 
      description: 'Route based on ticket priority', 
      icon: <ArrowDownUp size={18} className="text-amber-600 dark:text-amber-400" />,
      isConfigured: true,
      isActive: true
    },
    { 
      id: 'action-1', 
      type: 'action', 
      title: 'Notify Team', 
      description: 'Send notification to appropriate team', 
      icon: <Users size={18} className="text-green-600 dark:text-green-400" />,
      isConfigured: true,
      isActive: true
    },
    { 
      id: 'integration-1', 
      type: 'integration', 
      title: 'CRM Update', 
      description: 'Update customer record in CRM', 
      icon: <Database size={18} className="text-purple-600 dark:text-purple-400" />,
      isConfigured: false,
      isActive: true
    }
  ]);

  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [workflowName, setWorkflowName] = useState("Support Ticket Triage");
  
  const handleConfigureNode = (nodeId: string) => {
    setActiveNode(nodeId);
    setShowConnector(true);
  };
  
  const handleToggleNodeActive = (nodeId: string) => {
    setNodes(nodes.map(node => 
      node.id === nodeId ? { ...node, isActive: !node.isActive } : node
    ));
    
    toast({
      title: "Node status updated",
      description: `The node has been ${nodes.find(n => n.id === nodeId)?.isActive ? 'deactivated' : 'activated'}.`
    });
  };
  
  const handleSaveConnector = () => {
    setNodes(nodes.map(node => 
      node.id === activeNode ? { ...node, isConfigured: true } : node
    ));
    
    setShowConnector(false);
    
    toast({
      title: "Connection configured",
      description: "The integration has been successfully configured."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{workflowName}</h2>
          <p className="text-muted-foreground text-sm">
            Automate support ticket handling
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Test</Button>
          <Button variant="outline">History</Button>
          <Button>Save</Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <WorkflowNode
              type={node.type}
              title={node.title}
              description={node.description}
              icon={node.icon}
              onConfigure={() => handleConfigureNode(node.id)}
              isConfigured={node.isConfigured}
              isActive={node.isActive}
              onToggleActive={() => handleToggleNodeActive(node.id)}
            />
            {index < nodes.length - 1 && (
              <div className="flex justify-center">
                <div className="h-6 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
              </div>
            )}
          </React.Fragment>
        ))}
        
        <Button variant="outline" className="mt-2 border-dashed">
          <Zap size={16} className="mr-2" />
          Add Node
        </Button>
      </div>
      
      {showConnector && (
        <Card className="mt-6 border-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4 space-y-4">
            <h3 className="text-md font-medium">Configure {nodes.find(n => n.id === activeNode)?.title}</h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Connection Type</Label>
                <Select defaultValue="direct">
                  <SelectTrigger>
                    <SelectValue placeholder="Select connection type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct">Direct Integration</SelectItem>
                    <SelectItem value="api">API Connection</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label>Target Service</Label>
                <Select defaultValue="salesforce">
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salesforce">Salesforce</SelectItem>
                    <SelectItem value="hubspot">HubSpot</SelectItem>
                    <SelectItem value="zendesk">Zendesk</SelectItem>
                    <SelectItem value="custom">Custom Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label>API Key or Token</Label>
                <Input type="password" value="••••••••••••••••" />
              </div>
              
              <div className="pt-2 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowConnector(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveConnector}>
                  Save Connection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkflowAutomation;
