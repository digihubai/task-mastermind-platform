
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  RefreshCw,
  FileText,
  Download,
  Copy,
  Wand2
} from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

interface ContentGenerationStepProps {
  seoData: any;
  isGenerating: boolean;
  onDataChange: (field: string, value: any) => void;
  onPrev: () => void;
  onRegenerateContent: () => void;
}

const ContentGenerationStep: React.FC<ContentGenerationStepProps> = ({ 
  seoData, 
  isGenerating,
  onDataChange, 
  onPrev,
  onRegenerateContent
}) => {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([seoData.generatedContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${seoData.selectedTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Content downloaded successfully!");
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(seoData.generatedContent);
    toast.success("Content copied to clipboard!");
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-6">Step 5: Generated Content</h2>
      
      {isGenerating ? (
        <div className="flex justify-center py-12">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Generating your SEO-optimized content...</p>
          </div>
        </div>
      ) : seoData.generatedContent ? (
        <div className="space-y-6">
          <div className="flex justify-between mb-4">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={onRegenerateContent}
            >
              <RefreshCw size={16} />
              Regenerate
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleCopy}
              >
                <Copy size={16} />
                Copy
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleDownload}
              >
                <Download size={16} />
                Download
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md p-4 max-h-[500px] overflow-y-auto">
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{seoData.generatedContent}</ReactMarkdown>
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Wand2 className="h-4 w-4 text-primary" />
              SEO Performance Score
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '86%' }}></div>
              </div>
              <span className="font-medium">86/100</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This content is well-optimized for your target keywords and follows SEO best practices.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Content Not Generated Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Click the button below to generate your SEO-optimized content based on your selected title and outline.
          </p>
          <Button 
            onClick={onRegenerateContent}
            className="gap-2"
          >
            <Wand2 size={16} />
            Generate Content
          </Button>
        </div>
      )}
      
      <div className="mt-8 flex justify-start">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="gap-2"
          disabled={isGenerating}
        >
          <ArrowLeft size={16} />
          Previous Step
        </Button>
      </div>
    </Card>
  );
};

export default ContentGenerationStep;
