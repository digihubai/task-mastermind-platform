
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2,
  ListChecks,
  Copy
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
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Generate outlines when component mounts if none exist
    if (seoData.outlines.length === 0) {
      generateOutlines();
    }
  }, []);

  const generateOutlines = () => {
    setIsGenerating(true);
    toast.info("Generating content outlines...");
    
    // Simulate generating outlines based on the title and keywords
    setTimeout(() => {
      const outlines = [
        {
          id: '1',
          title: `Outline for: ${seoData.selectedTitle}`,
          sections: [
            'Introduction to the topic',
            'Current trends and industry insights',
            'Key benefits and advantages',
            'Common challenges and solutions',
            'Implementation strategies',
            'Case studies and examples',
            'Best practices and recommendations',
            'Future outlook and predictions',
            'Conclusion'
          ]
        },
        {
          id: '2',
          title: `Alternative structure for: ${seoData.selectedTitle}`,
          sections: [
            'What is ' + seoData.selectedKeywords[0] + '?',
            'Why ' + seoData.selectedKeywords[0] + ' matters in today\'s world',
            'Top 5 strategies for implementing ' + seoData.selectedKeywords[0],
            'How leading companies are using ' + seoData.selectedKeywords[0],
            'Step-by-step guide to getting started',
            'Measuring success and ROI',
            'Tools and resources',
            'Expert opinions and insights',
            'Key takeaways'
          ]
        },
        {
          id: '3',
          title: `Comprehensive guide to: ${seoData.selectedTitle}`,
          sections: [
            'Executive summary',
            'Historical context and evolution',
            'Core principles and fundamentals',
            'Comparative analysis with alternatives',
            'Technical requirements and specifications',
            'Implementation roadmap',
            'Success metrics and KPIs',
            'Troubleshooting common issues',
            'Industry best practices',
            'Future developments and innovations'
          ]
        }
      ];
      
      onDataChange('outlines', outlines);
      setIsGenerating(false);
      toast.success("Generated 3 content outlines!");
    }, 2000);
  };

  const selectOutline = (outline: any) => {
    onDataChange('selectedOutline', outline);
  };
  
  const copyOutline = (outline: any) => {
    const outlineText = `# ${outline.title}\n\n${outline.sections.map((section: string) => `## ${section}`).join('\n\n')}`;
    navigator.clipboard.writeText(outlineText);
    toast.success("Outline copied to clipboard!");
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-6">Step 3: Choose Your Outline</h2>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-4 block flex justify-between">
            <span>Select an outline for your content</span>
            <span className="text-muted-foreground">
              Based on: {seoData.selectedTitle}
            </span>
          </label>
          
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Generating outlines based on your title...</p>
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
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        {seoData.selectedOutline?.id === outline.id ? (
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        ) : (
                          <ListChecks className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className={seoData.selectedOutline?.id === outline.id ? 'font-medium' : ''}>
                            {outline.title}
                          </span>
                          
                          <ul className="mt-3 space-y-1">
                            {outline.sections.map((section: string, idx: number) => (
                              <li key={idx} className="text-sm text-muted-foreground">
                                • {section}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
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
                </div>
              ))}
              
              <Button
                variant="outline"
                className="mt-4 gap-2 w-full"
                onClick={generateOutlines}
              >
                <RefreshCw size={16} />
                Generate More Outlines
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="gap-2"
        >
          <ArrowLeft size={16} />
          Previous Step
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!seoData.selectedOutline && !isGenerating}
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
