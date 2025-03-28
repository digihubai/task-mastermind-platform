
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2,
  ListOrdered,
  Copy,
  PlusCircle,
  MinusCircle
} from "lucide-react";
import { toast } from "sonner";

interface OutlineStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const OutlineStep: React.FC<OutlineStepProps> = ({ 
  seoData, 
  onDataChange, 
  onNext, 
  onPrev 
}) => {
  const [loading, setLoading] = useState(false);
  
  // Generate outlines when the component mounts if none exist
  useEffect(() => {
    if (seoData.outlines.length === 0) {
      generateOutlines();
    }
  }, []);

  const generateOutlines = () => {
    setLoading(true);
    toast.info("Generating content outlines...");
    
    // Simulate generating outlines
    setTimeout(() => {
      const generatedOutlines = [
        {
          id: "outline-1",
          title: `Outline 1 for: ${seoData.selectedTitle}`,
          sections: [
            "Introduction to the Topic",
            `What is ${seoData.selectedKeywords[0]}?`,
            `Benefits of ${seoData.selectedKeywords[0]}`,
            `How to Implement ${seoData.selectedKeywords[0]}`,
            `Common Challenges with ${seoData.selectedKeywords[0]}`,
            `Future of ${seoData.selectedKeywords[0]}`,
            "Conclusion and Next Steps"
          ]
        },
        {
          id: "outline-2",
          title: `Outline 2 for: ${seoData.selectedTitle}`,
          sections: [
            "Understanding the Basics",
            `History of ${seoData.selectedKeywords[0]}`,
            `Key Components of ${seoData.selectedKeywords[0]}`,
            `Real-World Applications`,
            `Case Studies: Success Stories`,
            `Tools and Resources`,
            "Conclusion: Getting Started Today"
          ]
        },
        {
          id: "outline-3",
          title: `Outline 3 for: ${seoData.selectedTitle}`,
          sections: [
            "Introduction: Why This Matters",
            `The Evolution of ${seoData.selectedKeywords[0]}`,
            `Key Strategies for Success`,
            `Avoiding Common Pitfalls`,
            `Expert Insights and Tips`,
            `Measuring Results and ROI`,
            "Conclusion and Action Items"
          ]
        }
      ];
      
      onDataChange('outlines', generatedOutlines);
      setLoading(false);
      toast.success("Generated 3 content outlines!");
    }, 2000);
  };

  const selectOutline = (outline: any) => {
    onDataChange('selectedOutline', outline);
  };
  
  const copyOutline = (outline: any) => {
    const formattedOutline = `# ${outline.title}\n\n${outline.sections.map((section: string) => `## ${section}`).join('\n\n')}`;
    navigator.clipboard.writeText(formattedOutline);
    toast.success("Outline copied to clipboard!");
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-6">Step 3: Choose Your Outline</h2>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-4 block flex justify-between">
            <span>Select a content structure</span>
            <span className="text-muted-foreground">
              Title: {seoData.selectedTitle}
            </span>
          </label>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">Generating outlines...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {seoData.outlines.map((outline: any, index: number) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    seoData.selectedOutline?.id === outline.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => selectOutline(outline)}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-3">
                      {seoData.selectedOutline?.id === outline.id ? (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      ) : (
                        <ListOrdered className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                      <h3 className={`${seoData.selectedOutline?.id === outline.id ? 'font-medium' : ''}`}>
                        {outline.title}
                      </h3>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyOutline(outline);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="pl-8 space-y-1">
                    {outline.sections.map((section: string, sIndex: number) => (
                      <div key={sIndex} className="text-sm flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">{sIndex + 1}.</span>
                        <span>{section}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <Button
            variant="outline"
            className="mt-4 gap-2 w-full"
            onClick={generateOutlines}
            disabled={loading}
          >
            <RefreshCw size={16} />
            Generate New Outlines
          </Button>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="gap-2"
          disabled={loading}
        >
          <ArrowLeft size={16} />
          Previous Step
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!seoData.selectedOutline || loading}
          className="gap-2"
        >
          Next Step
          <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default OutlineStep;
