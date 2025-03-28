
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Copy, Download, RotateCcw, Loader, Globe, LinkIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublishToCMSDialog from "@/components/seo/PublishToCMSDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  const [activeTab, setActiveTab] = useState("preview");
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [showLinksDialog, setShowLinksDialog] = useState(false);
  const [linkOptions, setLinkOptions] = useState({
    internal: true,
    external: true
  });
  const [linkProcessing, setLinkProcessing] = useState(false);
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(seoData.generatedContent);
    toast.success("Content copied to clipboard!");
  };
  
  const handleDownloadContent = () => {
    // Create a blob from the content
    const blob = new Blob([seoData.generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${seoData.selectedTitle.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Content downloaded as Markdown file");
  };
  
  const handleApplyLinks = () => {
    if (!linkOptions.internal && !linkOptions.external) {
      toast.error("Please select at least one link type");
      return;
    }
    
    setLinkProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Get the current content
      let updatedContent = seoData.generatedContent;
      
      // Add mock internal links
      if (linkOptions.internal) {
        updatedContent = updatedContent.replace(
          /## Key Strategies/,
          "## Key Strategies\n\nLearn more about our [comprehensive strategy framework](/strategies) and [methodology](/methodology) for best results."
        );
      }
      
      // Add mock external links
      if (linkOptions.external) {
        updatedContent = updatedContent.replace(
          /## Advanced Techniques/,
          "## Advanced Techniques\n\nAccording to [industry research](https://example.com/research) and [expert analysis](https://example.com/analysis), these techniques can significantly improve outcomes."
        );
      }
      
      // Update content
      onDataChange("generatedContent", updatedContent);
      
      // Close dialog
      setShowLinksDialog(false);
      setLinkProcessing(false);
      
      toast.success(`Successfully added ${linkOptions.internal && linkOptions.external ? 'internal and external' : linkOptions.internal ? 'internal' : 'external'} links to your content`);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Generated Content</h2>
          <div className="flex items-center gap-2">
            {!isGenerating && seoData.generatedContent && (
              <>
                <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="gap-1">
                  <Copy size={14} />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadContent} className="gap-1">
                  <Download size={14} />
                  Download
                </Button>
                <Button 
                  variant="outline"
                  size="sm" 
                  onClick={() => setShowLinksDialog(true)} 
                  className="gap-1"
                >
                  <LinkIcon size={14} />
                  Add Links
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setShowPublishDialog(true)} 
                  className="gap-1"
                >
                  <Globe size={14} />
                  Publish to CMS
                </Button>
              </>
            )}
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Loader className="h-12 w-12 animate-spin mb-6 opacity-70" />
                <h3 className="text-xl font-medium mb-2">Generating SEO-optimized content</h3>
                <p className="text-muted-foreground max-w-lg">
                  We're creating comprehensive content based on your title, outline, and selected keywords.
                  This might take a minute...
                </p>
              </div>
            ) : seoData.generatedContent ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ 
                  __html: seoData.generatedContent
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, '<br />')
                    .replace(/^(.+)$/gm, '<p>$1</p>')
                    .replace(/<p><\/p>/g, '')
                    .replace(/# (.+)/g, '<h1>$1</h1>')
                    .replace(/## (.+)/g, '<h2>$1</h2>')
                    .replace(/### (.+)/g, '<h3>$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.+?)\*/g, '<em>$1</em>')
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                 }} />
                
                {/* Display images inline if selected */}
                {seoData.selectedImages && seoData.selectedImages.length > 0 && (
                  <div className="my-6">
                    <h4 className="text-lg font-medium mb-3">Featured Images</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {seoData.selectedImages.map((imageUrl: string, index: number) => (
                        <img 
                          key={index}
                          src={imageUrl}
                          alt={`Featured image ${index + 1} for "${seoData.selectedTitle}"`}
                          className="rounded-md overflow-hidden aspect-video object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-muted-foreground">
                  No content generated yet. Click "Generate Content" to create your SEO content.
                </p>
                <Button onClick={onRegenerateContent} className="mt-4">
                  Generate Content Now
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="markdown">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Loader className="h-12 w-12 animate-spin mb-6 opacity-70" />
                <h3 className="text-xl font-medium mb-2">Generating Markdown</h3>
                <p className="text-muted-foreground max-w-lg">
                  Creating markdown content for your SEO article...
                </p>
              </div>
            ) : seoData.generatedContent ? (
              <pre className="p-4 bg-muted rounded-md overflow-auto whitespace-pre-wrap text-sm h-[500px]">
                {seoData.generatedContent}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-muted-foreground">
                  No content generated yet. Click "Generate Content" to create your SEO content.
                </p>
                <Button onClick={onRegenerateContent} className="mt-4">
                  Generate Content Now
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
      
      {!isGenerating && seoData.generatedContent && (
        <Card className="p-6 border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
          <h3 className="text-lg font-medium mb-3">SEO Success Score: 92/100</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your content is well-optimized for your target keywords and meets all SEO criteria.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h4 className="text-sm font-medium">Keyword Usage</h4>
              <p className="text-2xl font-semibold text-green-600">95%</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Readability</h4>
              <p className="text-2xl font-semibold text-green-600">89%</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Structure</h4>
              <p className="text-2xl font-semibold text-green-600">94%</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Originality</h4>
              <p className="text-2xl font-semibold text-amber-600">86%</p>
            </div>
          </div>
        </Card>
      )}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-1">
          <ChevronLeft size={16} />
          Back to Images
        </Button>
        
        {seoData.generatedContent && !isGenerating && (
          <Button 
            variant="outline" 
            onClick={onRegenerateContent}
            className="gap-1"
          >
            <RotateCcw size={16} />
            Regenerate Content
          </Button>
        )}
      </div>
      
      {/* Add Links Dialog */}
      <Dialog open={showLinksDialog} onOpenChange={setShowLinksDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Links to Your Content</DialogTitle>
            <DialogDescription>
              Enhance your SEO by adding relevant internal and external links to your content.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-start space-x-3">
              <div>
                <Checkbox 
                  id="internal-links" 
                  checked={linkOptions.internal}
                  onCheckedChange={(checked) => 
                    setLinkOptions(prev => ({...prev, internal: !!checked}))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="internal-links" className="font-medium">
                  Internal Links
                </Label>
                <p className="text-sm text-muted-foreground">
                  Add links to other pages on your website for better site structure and SEO.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div>
                <Checkbox 
                  id="external-links" 
                  checked={linkOptions.external}
                  onCheckedChange={(checked) => 
                    setLinkOptions(prev => ({...prev, external: !!checked}))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="external-links" className="font-medium">
                  External Links (Authority Sites)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Add links to reputable external sources to increase content credibility and authority.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLinksDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyLinks} disabled={linkProcessing}>
              {linkProcessing ? (
                <>
                  <Loader size={16} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Apply Links</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <PublishToCMSDialog 
        isOpen={showPublishDialog}
        onClose={() => setShowPublishDialog(false)}
        seoData={seoData}
      />
    </div>
  );
};

export default ContentGenerationStep;
