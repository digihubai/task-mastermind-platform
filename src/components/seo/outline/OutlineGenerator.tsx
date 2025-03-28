
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
          <Label className="text-sm font-medium">Outline Topic (Optional)</Label>
          <Textarea 
            placeholder="Explain your idea"
            value={seoData.outlineTopic || seoData.topic || ""}
            onChange={(e) => onDataChange("outlineTopic", e.target.value)}
            className="min-h-[100px] mt-1"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium">Keywords</Label>
          <Input 
            value={(seoData.selectedKeywords || []).join(", ")}
            disabled
            className="bg-muted mt-1"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium">Number of Subtitles</Label>
          <Input 
            type="number" 
            value={seoData.subtitleCount || 10}
            onChange={(e) => onDataChange("subtitleCount", parseInt(e.target.value))}
            min={3}
            max={15}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium">Number of Outlines</Label>
          <Input 
            type="number" 
            value={seoData.outlineCount || 3}
            onChange={(e) => onDataChange("outlineCount", parseInt(e.target.value))}
            min={1}
            max={5}
            className="mt-1"
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
                <Label className="text-sm font-medium">Outline Style</Label>
                <Select 
                  value={seoData.outlineStyle || "comprehensive"}
                  onValueChange={(value) => onDataChange("outlineStyle", value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Audience Level</Label>
                <Select 
                  value={seoData.audienceLevel || "intermediate"}
                  onValueChange={(value) => onDataChange("audienceLevel", value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select audience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        
        <Button 
          onClick={onGenerateOutlines} 
          disabled={isGenerating || !seoData.selectedTitle}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          {isGenerating ? "Generating Outlines..." : "Generate Outline"}
        </Button>
      </div>
    </Card>
  );
};

export default OutlineGenerator;
