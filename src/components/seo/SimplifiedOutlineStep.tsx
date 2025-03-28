
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  
  const handleGenerateOutline = async () => {
    if (!seoData.selectedTitle) {
      toast.error("Please select a title first");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate generating outline
    setTimeout(() => {
      const outline = {
        id: "outline-1",
        title: seoData.selectedTitle,
        sections: {
          introduction: {
            title: "Introduction",
            content: `An engaging introduction about ${seoData.topic} focusing on its importance and relevance.`
          },
          background: {
            title: "Understanding " + seoData.topic,
            content: "Background information and key concepts related to the topic.",
            subsections: [
              {
                title: "Key Benefits",
                content: `The primary advantages of implementing ${seoData.topic} in your business.`
              },
              {
                title: "Common Challenges",
                content: `Obstacles and challenges often faced when working with ${seoData.topic}.`
              }
            ]
          },
          implementation: {
            title: "Implementation Strategies",
            content: `Practical approaches to implementing ${seoData.topic} effectively.`,
            subsections: [
              {
                title: "Best Practices",
                content: "Industry best practices for optimal results."
              },
              {
                title: "Case Studies",
                content: "Real-world examples of successful implementations."
              }
            ]
          },
          conclusion: {
            title: "Conclusion",
            content: "Summary of key points and final thoughts."
          }
        }
      };
      
      onDataChange("outlines", [outline]);
      onDataChange("selectedOutline", outline);
      setIsGenerating(false);
      toast.success("Generated content outline");
    }, 1500);
  };
  
  useEffect(() => {
    if (seoData.selectedTitle && !seoData.selectedOutline) {
      handleGenerateOutline();
    }
  }, []);
  
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Content Outline</h2>
        <div className="space-y-4">
          <Button 
            onClick={handleGenerateOutline}
            disabled={isGenerating || !seoData.selectedTitle}
            className="w-full"
          >
            {isGenerating ? "Generating Outline..." : "Generate Content Outline"}
          </Button>
          
          {seoData.selectedOutline && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">{seoData.selectedOutline.title}</h3>
              
              <div className="space-y-3">
                {Object.entries(seoData.selectedOutline.sections).map(([key, section]: [string, any]) => (
                  <div key={key} className="border p-3 rounded-md">
                    <h4 className="font-medium">{section.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{section.content}</p>
                    
                    {section.subsections && section.subsections.length > 0 && (
                      <div className="ml-4 mt-3 space-y-2">
                        {section.subsections.map((subsection: any, index: number) => (
                          <div key={index} className="border-l-2 pl-3 py-1">
                            <h5 className="text-sm font-medium">{subsection.title}</h5>
                            <p className="text-xs text-muted-foreground mt-1">{subsection.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrev}>
              Back
            </Button>
            <Button 
              onClick={onNext}
              disabled={!seoData.selectedOutline}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SimplifiedOutlineStep;
