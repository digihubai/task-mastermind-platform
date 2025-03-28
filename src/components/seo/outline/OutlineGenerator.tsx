
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw } from "lucide-react";

interface OutlineGeneratorProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  isGenerating: boolean;
  onGenerateOutlines: () => void;
}

const OutlineGenerator: React.FC<OutlineGeneratorProps> = ({
  seoData,
  onDataChange,
  isGenerating,
  onGenerateOutlines,
}) => {
  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-semibold mb-4">Generate Outline</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Outline Topic</label>
          <Textarea 
            placeholder="Explain your idea"
            value={seoData.outlineTopic || seoData.topic || ""}
            onChange={(e) => onDataChange("outlineTopic", e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Keywords</label>
          <Input 
            value={(seoData.selectedKeywords || []).join(", ")}
            disabled
            className="bg-muted"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Number of Sections</label>
            <Input 
              type="number" 
              value={seoData.subtitleCount || 5}
              onChange={(e) => onDataChange("subtitleCount", parseInt(e.target.value))}
              min={3}
              max={15}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Outline Style</label>
            <select 
              className="w-full p-2 border rounded-md"
              onChange={(e) => onDataChange("outlineStyle", e.target.value)}
              value={seoData.outlineStyle || "comprehensive"}
            >
              <option value="comprehensive">Comprehensive</option>
              <option value="concise">Concise</option>
              <option value="technical">Technical</option>
            </select>
          </div>
        </div>
        
        <Button 
          onClick={onGenerateOutlines} 
          disabled={isGenerating || !seoData.selectedTitle}
          className="w-full"
        >
          {isGenerating ? "Generating Outlines..." : "Generate Outline Options"}
        </Button>
      </div>
    </Card>
  );
};

export default OutlineGenerator;
