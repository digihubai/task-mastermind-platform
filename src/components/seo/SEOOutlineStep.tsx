
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import OutlineGenerator from "./outline/OutlineGenerator";
import OutlineSelector from "./outline/OutlineSelector";
import { generateMockOutlines } from "./outline/mockOutlines";

interface SEOOutlineStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEOOutlineStep: React.FC<SEOOutlineStepProps> = ({ 
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
    if (seoData.title && (!generatedOutlines.length || generatedOutlines.length === 0)) {
      handleGenerateOutlines();
    }
  }, []);

  const handleGenerateOutlines = () => {
    setIsGenerating(true);
    toast.info("Generating outline options...");
    
    // Simulate API call
    setTimeout(() => {
      const mockOutlines = generateMockOutlines(seoData.selectedTitle);
      setGeneratedOutlines(mockOutlines);
      
      if (!selectedOutline && mockOutlines.length > 0) {
        setSelectedOutline(mockOutlines[0]);
        onDataChange("outline", mockOutlines[0]);
      }
      
      setIsGenerating(false);
      toast.success("Generated 3 outline options!");
    }, 1500);
  };
  
  const handleSelectOutline = (outline: string) => {
    setSelectedOutline(outline);
    onDataChange("outline", outline);
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

export default SEOOutlineStep;
