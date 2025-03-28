
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2,
  FileText,
  Copy
} from "lucide-react";
import { toast } from "sonner";

interface TitleStepProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const TitleStep: React.FC<TitleStepProps> = ({ 
  seoData, 
  onDataChange, 
  onNext, 
  onPrev 
}) => {
  const generateMoreTitles = () => {
    toast.info("Generating more title options...");
    
    // Simulate generating more titles
    setTimeout(() => {
      const additionalTitles = [
        `The Future of ${seoData.selectedKeywords[0]}: Trends to Watch`,
        `How to Implement ${seoData.selectedKeywords[0]} in Your Business Strategy`,
        `${seoData.selectedKeywords[0]} 101: A Beginner's Guide to Success`,
        `Advanced ${seoData.selectedKeywords[0]} Techniques for Professionals`,
        `${seoData.selectedKeywords[0]}: Debunking Common Myths and Misconceptions`
      ];
      
      onDataChange('titles', [...seoData.titles, ...additionalTitles]);
      toast.success("Generated 5 more title options!");
    }, 1500);
  };

  const selectTitle = (title: string) => {
    onDataChange('selectedTitle', title);
  };
  
  const copyTitle = (title: string) => {
    navigator.clipboard.writeText(title);
    toast.success("Title copied to clipboard!");
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-6">Step 2: Choose Your Title</h2>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-4 block flex justify-between">
            <span>Select a title for your content</span>
            <span className="text-muted-foreground">
              Selected keywords: {seoData.selectedKeywords.join(', ')}
            </span>
          </label>
          
          <div className="space-y-3">
            {seoData.titles.map((title: string, index: number) => (
              <div 
                key={index}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  seoData.selectedTitle === title
                    ? 'border-primary bg-primary/5'
                    : 'hover:bg-accent/50'
                }`}
                onClick={() => selectTitle(title)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {seoData.selectedTitle === title ? (
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    ) : (
                      <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    )}
                    <span className={seoData.selectedTitle === title ? 'font-medium' : ''}>
                      {title}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyTitle(title);
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            className="mt-4 gap-2 w-full"
            onClick={generateMoreTitles}
          >
            <RefreshCw size={16} />
            Generate More Titles
          </Button>
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
          disabled={!seoData.selectedTitle}
          className="gap-2"
        >
          Next Step
          <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default TitleStep;
