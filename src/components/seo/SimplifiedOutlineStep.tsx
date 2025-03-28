
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import OutlineGenerator from "./outline/OutlineGenerator";
import OutlineSelector from "./outline/OutlineSelector";
import { generateMockOutlines } from "./outline/mockOutlines";

interface SimplifiedOutlineStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SimplifiedOutlineStep: React.FC<SimplifiedOutlineStepProps> = ({ 
  seoData, 
  onDataChange, 
  onNext, 
  onPrev 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutlines, setGeneratedOutlines] = useState<string[]>([]);
  const [selectedOutline, setSelectedOutline] = useState("");

  // Auto-generate outlines when component loads if we have a title
  useEffect(() => {
    if (seoData.selectedTitle && (!generatedOutlines || generatedOutlines.length === 0)) {
      handleGenerateOutlines();
    }
  }, []);
  
  const handleGenerateOutlines = () => {
    if (!seoData.selectedTitle) {
      toast.error("Please select a title first");
      return;
    }
    
    setIsGenerating(true);
    toast.info("Generating outline options...");
    
    // Simulate API call
    setTimeout(() => {
      const mockOutlines = generateMockOutlines(seoData.selectedTitle);
      setGeneratedOutlines(mockOutlines);
      
      if (!selectedOutline && mockOutlines.length > 0) {
        setSelectedOutline(mockOutlines[0]);
        onDataChange("selectedOutline", mockOutlines[0]);
      }
      
      setIsGenerating(false);
      toast.success("Generated outline options!");
    }, 1500);
  };
  
  const handleSelectOutline = (outline: string) => {
    setSelectedOutline(outline);
    onDataChange("selectedOutline", outline);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <OutlineGenerator 
        seoData={seoData}
        onDataChange={onDataChange}
        isGenerating={isGenerating}
        onGenerateOutlines={handleGenerateOutlines}
      />
      
      <OutlineSelector 
        generatedOutlines={generatedOutlines}
        selectedOutline={selectedOutline}
        onSelectOutline={handleSelectOutline}
        onGenerateOutlines={handleGenerateOutlines}
        onNext={onNext}
        onPrev={onPrev}
        seoData={seoData}
      />
    </div>
  );
};

export default SimplifiedOutlineStep;
