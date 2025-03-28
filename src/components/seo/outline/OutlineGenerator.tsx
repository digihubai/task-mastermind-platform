
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown } from "lucide-react";

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
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Outline Topic (Optional)</label>
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
        
        <div>
          <label className="block text-sm font-medium mb-1">Number of Subtitles</label>
          <Input 
            type="number" 
            value={seoData.subtitleCount || 10}
            onChange={(e) => onDataChange("subtitleCount", parseInt(e.target.value))}
            min={3}
            max={15}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Number of Outlines</label>
          <Input 
            type="number" 
            value={seoData.outlineCount || 3}
            onChange={(e) => onDataChange("outlineCount", parseInt(e.target.value))}
            min={1}
            max={5}
          />
        </div>
        
        <div className="pt-2">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between"
            onClick={() => onDataChange("showAdvancedOptions", !seoData.showAdvancedOptions)}
          >
            <span>Advanced Options</span>
            <ChevronDown size={16} className={`transition-transform ${seoData.showAdvancedOptions ? 'rotate-180' : ''}`} />
          </Button>
          
          {seoData.showAdvancedOptions && (
            <div className="mt-3 space-y-3 border-t pt-3">
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
                  <option value="creative">Creative</option>
                  <option value="academic">Academic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Audience Level</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => onDataChange("audienceLevel", e.target.value)}
                  value={seoData.audienceLevel || "intermediate"}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        <Button 
          onClick={onGenerateOutlines} 
          disabled={isGenerating || !seoData.selectedTitle}
          className="w-full bg-purple-800 hover:bg-purple-900 text-white"
        >
          {isGenerating ? "Generating Outlines..." : "Generate Outline"}
        </Button>
      </div>
    </Card>
  );
};

export default OutlineGenerator;
