
import React from "react";
import { CallFlowNode } from "@/types/support";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface MenuNodeEditorProps {
  node: CallFlowNode;
  onUpdateNode: (updates: Partial<CallFlowNode>) => void;
}

export const MenuNodeEditor: React.FC<MenuNodeEditorProps> = ({ node, onUpdateNode }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Menu Introduction</label>
        <Textarea
          value={node.data?.introduction || ''}
          onChange={(e) => onUpdateNode({ 
            data: { ...node.data, introduction: e.target.value }
          })}
          className="resize-none h-20"
          placeholder="Enter the introduction to the menu options..."
        />
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium">Menu Options</label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const options = node.data?.options || [];
              onUpdateNode({
                data: {
                  ...node.data,
                  options: [...options, { key: options.length + 1, description: '' }]
                }
              });
            }}
            className="gap-1"
          >
            <Plus size={14} />
            <span>Add Option</span>
          </Button>
        </div>
        
        <div className="space-y-2">
          {(node.data?.options || []).map((option: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                className="w-12 flex-shrink-0"
                value={option.key}
                onChange={(e) => {
                  const options = [...(node.data?.options || [])];
                  options[index] = { ...option, key: e.target.value };
                  onUpdateNode({
                    data: { ...node.data, options }
                  });
                }}
                placeholder="Key"
              />
              <Input
                className="flex-grow"
                value={option.description}
                onChange={(e) => {
                  const options = [...(node.data?.options || [])];
                  options[index] = { ...option, description: e.target.value };
                  onUpdateNode({
                    data: { ...node.data, options }
                  });
                }}
                placeholder="Option description"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const options = node.data?.options.filter((_: any, i: number) => i !== index) || [];
                  onUpdateNode({
                    data: { ...node.data, options }
                  });
                }}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
          
          {(!node.data?.options || node.data.options.length === 0) && (
            <div className="text-sm text-muted-foreground py-2 text-center border rounded-md">
              No options yet. Click "Add Option" to create menu options.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
