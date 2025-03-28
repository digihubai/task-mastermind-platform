
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateSEOTitles } from "@/services/seo";

interface TitleStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const TitleStep: React.FC<TitleStepProps> = ({ seoData, onDataChange, onNext, onPrev }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateTitles = async () => {
    if (!seoData.selectedKeywords || seoData.selectedKeywords.length === 0) {
      toast.error("Please select at least one keyword first");
      return;
    }
    
    setIsGenerating(true);
    try {
      const titles = await generateSEOTitles(
        seoData.topic,
        seoData.selectedKeywords,
        seoData.numberOfTitles || 5,
        "mixed"
      );
      onDataChange("titles", titles);
      if (titles && titles.length > 0) {
        onDataChange("selectedTitle", titles[0]);
      }
      toast.success("Generated title suggestions");
    } catch (error) {
      console.error("Error generating titles:", error);
      toast.error("Failed to generate titles");
    } finally {
      setIsGenerating(false);
    }
  };
  
  useEffect(() => {
    if (seoData.selectedKeywords?.length > 0 && (!seoData.titles || seoData.titles.length === 0)) {
      handleGenerateTitles();
    }
  }, []);
  
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Choose Your Title</h2>
        <div className="space-y-4">
          <Button 
            onClick={handleGenerateTitles}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? "Generating Titles..." : "Generate Title Suggestions"}
          </Button>
          
          <div className="space-y-2 mt-4">
            {seoData.titles && seoData.titles.map((title: string, index: number) => (
              <div 
                key={index}
                className={`p-3 border rounded-md cursor-pointer ${
                  seoData.selectedTitle === title ? "border-primary bg-primary/5" : "hover:bg-accent/50"
                }`}
                onClick={() => onDataChange("selectedTitle", title)}
              >
                {title}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrev}>
              Back
            </Button>
            <Button 
              onClick={onNext}
              disabled={!seoData.selectedTitle}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TitleStep;
