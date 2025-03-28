
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Download, 
  Copy, 
  RefreshCw,
  CheckCircle2,
  Share,
  Globe
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOContentPreview from "./SEOContentPreview";
import { toast } from "sonner";

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
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(seoData.generatedContent);
    toast.success("Content copied to clipboard!");
  };
  
  const handleDownloadMarkdown = () => {
    const blob = new Blob([seoData.generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${seoData.selectedTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content downloaded as Markdown!");
  };

  const handlePublishToWordPress = () => {
    toast.info("Publishing to WordPress...");
    
    setTimeout(() => {
      toast.success("Published to WordPress successfully!");
    }, 1500);
  };

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-xl font-medium mb-6">Step 5: Generated Content</h2>
      
      <div className="space-y-6">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-6 text-lg">Generating your content...</p>
            <p className="text-muted-foreground mt-2">This may take a few moments</p>
          </div>
        ) : seoData.generatedContent ? (
          <>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview">
                <SEOContentPreview content={seoData.generatedContent} />
              </TabsContent>
              
              <TabsContent value="metadata">
                <Card className="border border-border/40 p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
                      <p className="font-medium">{seoData.selectedTitle}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Keywords</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {seoData.selectedKeywords.map((keyword: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-secondary text-xs rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Word Count</h3>
                      <p>{seoData.generatedContent.split(/\s+/).length}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Reading Time</h3>
                      <p>{Math.ceil(seoData.generatedContent.split(/\s+/).length / 200)} min</p>
                    </div>
                    
                    {seoData.selectedImages.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Selected Images</h3>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {seoData.selectedImages.map((imgUrl: string, idx: number) => (
                            <img 
                              key={idx}
                              src={imgUrl}
                              alt={`Selected image ${idx + 1}`}
                              className="rounded-md w-full h-auto aspect-video object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleCopyToClipboard}
              >
                <Copy size={16} />
                Copy to Clipboard
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleDownloadMarkdown}
              >
                <Download size={16} />
                Download as Markdown
              </Button>
              
              <Button 
                className="gap-2 ml-auto"
                onClick={handlePublishToWordPress}
              >
                <Globe size={16} />
                Publish to WordPress
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Something went wrong. Please try generating the content again.
            </p>
            <Button 
              onClick={onRegenerateContent}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        )}
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
        
        {seoData.generatedContent && (
          <Button 
            onClick={onRegenerateContent}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw size={16} />
            Regenerate Content
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ContentGenerationStep;
