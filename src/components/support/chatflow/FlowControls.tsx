
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChatBotFlow } from "@/types/support";
import { 
  Plus, 
  Download, 
  Upload, 
  Save
} from "lucide-react";

interface FlowControlsProps {
  flow: ChatBotFlow;
  onUpdateFlow: (updates: Partial<ChatBotFlow>) => void;
  onAddNode: (type: string) => void;
  onSave: () => void;
  onExport: () => void;
}

export const FlowControls: React.FC<FlowControlsProps> = ({
  flow,
  onUpdateFlow,
  onAddNode,
  onSave,
  onExport,
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Flow Designer</h3>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download size={16} />
          </Button>
          <Button variant="outline" size="sm">
            <Upload size={16} />
          </Button>
          <Button size="sm" onClick={onSave}>
            <Save size={16} />
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <Input
          placeholder="Flow Name"
          value={flow.name}
          onChange={(e) => onUpdateFlow({ name: e.target.value })}
          className="mb-2"
        />
        <Textarea
          placeholder="Flow Description"
          value={flow.description || ''}
          onChange={(e) => onUpdateFlow({ description: e.target.value })}
          className="resize-none h-20"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 my-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddNode('start')}
          className="gap-1"
        >
          <Plus size={16} />
          <span>Start</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddNode('message')}
          className="gap-1"
        >
          <Plus size={16} />
          <span>Message</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddNode('input')}
          className="gap-1"
        >
          <Plus size={16} />
          <span>Input</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddNode('condition')}
          className="gap-1"
        >
          <Plus size={16} />
          <span>Condition</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddNode('action')}
          className="gap-1"
        >
          <Plus size={16} />
          <span>Action</span>
        </Button>
      </div>
    </>
  );
};
