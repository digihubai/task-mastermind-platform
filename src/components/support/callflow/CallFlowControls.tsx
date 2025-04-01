
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CallFlow } from "@/types/support";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Download, 
  Upload, 
  Save,
  List,
  LayoutGrid
} from "lucide-react";

interface CallFlowControlsProps {
  flow: CallFlow;
  viewMode: "list" | "canvas";
  onChangeViewMode: (mode: "list" | "canvas") => void;
  onUpdateFlow: (updates: Partial<CallFlow>) => void;
  onAddNode: (type: string) => void;
  onSave: () => void;
  onExport: () => void;
}

export const CallFlowControls: React.FC<CallFlowControlsProps> = ({
  flow,
  viewMode,
  onChangeViewMode,
  onUpdateFlow,
  onAddNode,
  onSave,
  onExport,
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Call Flow Designer</h3>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onChangeViewMode("list")}
            className={viewMode === "list" ? "bg-accent" : ""}
          >
            <List size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onChangeViewMode("canvas")}
            className={viewMode === "canvas" ? "bg-accent" : ""}
          >
            <LayoutGrid size={16} />
          </Button>
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
          className="resize-none h-20 mb-2"
        />
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Language</label>
            <Select
              value={flow.language}
              onValueChange={(value) => onUpdateFlow({ language: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Voice Type</label>
            <Select
              value={flow.voiceType}
              onValueChange={(value) => onUpdateFlow({ voiceType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural-female">Natural Female</SelectItem>
                <SelectItem value="natural-male">Natural Male</SelectItem>
                <SelectItem value="professional-female">Professional Female</SelectItem>
                <SelectItem value="professional-male">Professional Male</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 my-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddNode('greeting')}
          className="gap-1"
        >
          <Plus size={16} />
          <span>Greeting</span>
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
          onClick={() => onAddNode('menu')}
          className="gap-1"
        >
          <Plus size={16} />
          <span>Menu</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddNode('transfer')}
          className="gap-1"
        >
          <Plus size={16} />
          <span>Transfer</span>
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
      </div>
    </>
  );
};
