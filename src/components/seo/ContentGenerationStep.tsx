import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Copy, RotateCcw, Loader, Globe, Link as LinkIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { fetchInternalLinks, fetchRelatedExternalLinks, insertLinksIntoContent } from "@/services/seoService";
import PublishToCMSDialog from "./PublishToCMSDialog";

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
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkType, setLinkType] = useState<'internal' | 'external' | 'both'>('both');
  const [externalLinks, setExternalLinks] = useState<Array<{title: string, url: string}>>([]);
  const [internalLinks, setInternalLinks] = useState<Array<{title: string, url: string}>>([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(seoData.generatedContent);
    toast.success("Content copied to clipboard");
  };
  
  const handleOpenLinkDialog = async () => {
    setShowLinkDialog(true);
    setIsLoadingLinks(true);
    
    try {
      const [internal, external] = await Promise.all([
        fetchInternalLinks(),
        fetchRelatedExternalLinks(seoData.topic, seoData.selectedKeywords)
      ]);
      
      setInternalLinks(internal);
      setExternalLinks(external);
    } catch (error) {
      console.error("Error fetching links:", error);
      toast.error("Failed to load link suggestions");
    } finally {
      setIsLoadingLinks(false);
    }
  };
  
  const handleAddLinks = () => {
    let updatedContent = seoData.generatedContent;
    
    if (linkType === 'internal' || linkType === 'both') {
      updatedContent = insertLinksIntoContent(updatedContent, internalLinks, false);
    }
    
    if (linkType === 'external' || linkType === 'both') {
      updatedContent = insertLinksIntoContent(updatedContent, externalLinks, true);
    }
    
    onDataChange("generatedContent", updatedContent);
    setShowLinkDialog(false);
    toast.success(`Added ${linkType === 'both' ? 'internal and external' : linkType} links to your content`);
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Generated SEO Content</h2>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleOpenLinkDialog}
              className="gap-2"
              disabled={isGenerating || !seoData.generatedContent}
            >
              <LinkIcon size={14} />
              Add Links
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopyToClipboard}
              className="gap-2"
              disabled={isGenerating || !seoData.generatedContent}
            >
              <Copy size={14} />
              Copy
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRegenerateContent} 
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader size={14} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RotateCcw size={14} />
                  Regenerate
                </>
              )}
            </Button>
          </div>
        </div>
        
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Loader className="h-12 w-12 animate-spin mb-4 opacity-70" />
            <h3 className="text-lg font-medium mb-2">Generating SEO-optimized content</h3>
            <p className="text-muted-foreground max-w-md">
              We're creating a comprehensive article based on your selected topic, keywords, title, 
              and outline structure.
            </p>
          </div>
        ) : seoData.generatedContent ? (
          <div className="border rounded-lg p-6 prose prose-sm max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: seoData.generatedContent.replace(/\n/g, '<br />') }} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Globe className="h-12 w-12 text-primary/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No content generated yet</h3>
            <p className="text-muted-foreground max-w-md">
              Click "Generate" to create SEO-optimized content based on your selected title and outline.
            </p>
            <Button className="mt-4" onClick={onRegenerateContent}>
              Generate Content Now
            </Button>
          </div>
        )}
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-1">
          <ChevronLeft size={16} />
          Back to Images
        </Button>
        
        {seoData.generatedContent && (
          <Button onClick={() => setIsPublishDialogOpen(true)} disabled={isGenerating} className="gap-2">
            <Globe size={16} />
            Publish to CMS
          </Button>
        )}
      </div>
      
      {isPublishDialogOpen && (
        <PublishToCMSDialog 
          isOpen={isPublishDialogOpen} 
          onClose={() => setIsPublishDialogOpen(false)}
          seoContent={{
            title: seoData.selectedTitle,
            content: seoData.generatedContent,
            keywords: seoData.selectedKeywords,
            images: seoData.selectedImages
          }}
        />
      )}
      
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Links to Content</DialogTitle>
            <DialogDescription>
              Add relevant internal and external links to improve SEO performance
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-center space-x-4">
              <Label>Link Types to Add:</Label>
              <Tabs defaultValue="both" onValueChange={(value) => setLinkType(value as 'internal' | 'external' | 'both')}>
                <TabsList>
                  <TabsTrigger value="internal">Internal Links</TabsTrigger>
                  <TabsTrigger value="external">External Links</TabsTrigger>
                  <TabsTrigger value="both">Both</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {isLoadingLinks ? (
              <div className="flex justify-center py-8">
                <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                {(linkType === 'internal' || linkType === 'both') && (
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <LinkIcon size={16} className="text-blue-500" />
                      Internal Links
                    </h3>
                    <div className="border rounded-md divide-y">
                      {internalLinks.map((link, i) => (
                        <div key={i} className="p-3 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{link.title}</p>
                            <p className="text-xs text-muted-foreground">{link.url}</p>
                          </div>
                          <Switch defaultChecked id={`internal-${i}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {(linkType === 'external' || linkType === 'both') && (
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <ExternalLink size={16} className="text-green-500" />
                      External Authority Links
                    </h3>
                    <div className="border rounded-md divide-y">
                      {externalLinks.map((link, i) => (
                        <div key={i} className="p-3 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{link.title}</p>
                            <p className="text-xs text-muted-foreground">{link.url}</p>
                          </div>
                          <Switch defaultChecked id={`external-${i}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowLinkDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddLinks}
              disabled={isLoadingLinks}
            >
              Add Selected Links
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentGenerationStep;
