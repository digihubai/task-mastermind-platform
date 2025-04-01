
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Trash2, X } from "lucide-react";
import { WorkflowStep } from "@/hooks/use-workflow-editor";

interface WorkflowActionPanelProps {
  step: WorkflowStep;
  onUpdate: (updates: Partial<WorkflowStep>) => void;
  onDelete: () => void;
}

export function WorkflowActionPanel({ step, onUpdate, onDelete }: WorkflowActionPanelProps) {
  const renderStepConfig = () => {
    switch (step.type) {
      case 'trigger':
        return (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Trigger Type</label>
                <Select 
                  value="form" 
                  onValueChange={(value) => onUpdate({ config: { ...step.config, triggerType: value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="form">Form Submission</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="api">API Call</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="event">CRM Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Trigger Event</label>
                <Select 
                  value="new_record" 
                  onValueChange={(value) => onUpdate({ config: { ...step.config, triggerEvent: value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new_record">New Record Created</SelectItem>
                    <SelectItem value="updated_record">Record Updated</SelectItem>
                    <SelectItem value="deleted_record">Record Deleted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
        
      case 'action':
        return (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Action Type</label>
                <Select 
                  value={step.config?.actionType || "update_record"} 
                  onValueChange={(value) => onUpdate({ config: { ...step.config, actionType: value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="update_record">Update Record</SelectItem>
                    <SelectItem value="create_record">Create Record</SelectItem>
                    <SelectItem value="delete_record">Delete Record</SelectItem>
                    <SelectItem value="send_email">Send Email</SelectItem>
                    <SelectItem value="send_notification">Send Notification</SelectItem>
                    <SelectItem value="custom_code">Run Custom Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Description</label>
                <Textarea 
                  placeholder="Add a description for this action..."
                  value={step.config?.description || ""}
                  onChange={(e) => onUpdate({ config: { ...step.config, description: e.target.value } })}
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          </>
        );
        
      case 'condition':
        return (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Field to check</label>
                <Select 
                  value={step.config?.field || "status"} 
                  onValueChange={(value) => onUpdate({ config: { ...step.config, field: value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="assigned_to">Assigned To</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="created_date">Created Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Operator</label>
                <Select 
                  value={step.config?.operator || "equals"} 
                  onValueChange={(value) => onUpdate({ config: { ...step.config, operator: value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="not_equals">Not Equals</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="greater_than">Greater Than</SelectItem>
                    <SelectItem value="less_than">Less Than</SelectItem>
                    <SelectItem value="is_empty">Is Empty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Value</label>
                <Input 
                  placeholder="Enter comparison value"
                  value={step.config?.value || ""}
                  onChange={(e) => onUpdate({ config: { ...step.config, value: e.target.value } })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Branches</label>
                <div className="space-y-2 mt-2">
                  {(step.branches || []).map((branch, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        placeholder="Enter branch name"
                        value={branch.condition}
                        onChange={(e) => {
                          const newBranches = [...(step.branches || [])];
                          newBranches[index] = { ...branch, condition: e.target.value };
                          onUpdate({ branches: newBranches });
                        }}
                        className="flex-grow"
                      />
                      <Button 
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if ((step.branches || []).length > 2) {
                            const newBranches = [...(step.branches || [])];
                            newBranches.splice(index, 1);
                            onUpdate({ branches: newBranches });
                          }
                        }}
                        disabled={(step.branches || []).length <= 2}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newBranches = [...(step.branches || []), { condition: `Branch ${(step.branches || []).length + 1}` }];
                      onUpdate({ branches: newBranches });
                    }}
                    className="mt-2 w-full"
                  >
                    Add Branch
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
        
      case 'delay':
        return (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Delay Type</label>
                <Select 
                  value={step.config?.delayType || "fixed"} 
                  onValueChange={(value) => onUpdate({ config: { ...step.config, delayType: value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select delay type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Time</SelectItem>
                    <SelectItem value="until_time">Until Specific Time</SelectItem>
                    <SelectItem value="until_condition">Until Condition Met</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Duration</label>
                <div className="flex gap-2">
                  <Input 
                    type="number"
                    value={step.config?.duration || "1"}
                    onChange={(e) => onUpdate({ config: { ...step.config, duration: e.target.value } })}
                    min={1}
                  />
                  <Select 
                    value={step.config?.durationUnit || "minutes"} 
                    onValueChange={(value) => onUpdate({ config: { ...step.config, durationUnit: value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </>
        );
        
      case 'integration':
        return (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Integration Type</label>
                <Select 
                  value={step.config?.integration || "zapier"} 
                  onValueChange={(value) => onUpdate({ config: { ...step.config, integration: value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select integration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zapier">Zapier</SelectItem>
                    <SelectItem value="make">Make.com</SelectItem>
                    <SelectItem value="api">Custom API</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="asana">Asana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">API Key / Webhook URL</label>
                <Textarea 
                  placeholder="Enter API key or webhook URL"
                  value={step.config?.apiKey || ""}
                  onChange={(e) => onUpdate({ config: { ...step.config, apiKey: e.target.value } })}
                  rows={2}
                  className="font-mono text-xs resize-none"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Data to Send (JSON)</label>
                <Textarea 
                  placeholder='{"key": "value"}'
                  value={step.config?.data || ''}
                  onChange={(e) => onUpdate({ config: { ...step.config, data: e.target.value } })}
                  rows={5}
                  className="font-mono text-xs resize-none"
                />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="border rounded-md p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{step.type.charAt(0).toUpperCase() + step.type.slice(1)} Configuration</h3>
        
        {step.type !== 'trigger' && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1.5">Name</label>
          <Input 
            value={step.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
        </div>
        
        {renderStepConfig()}
      </div>
    </div>
  );
}
