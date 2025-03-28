
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Globe, AlertCircle } from "lucide-react";
import ContentActionButtons from "./ContentActionButtons";
import ContentDisplay from "./ContentDisplay";
import AddLinksDialog from "./AddLinksDialog";
import PublishToCMSDialog from "./PublishToCMSDialog";
import { useContentGeneration } from "@/hooks/useContentGeneration";
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
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);
  
  useEffect(() => {
    // Debug logging to identify issues
    console.log("ContentGenerationStep rendered with data:", {
      content: seoData.generatedContent ? `${seoData.generatedContent.slice(0, 50)}...` : null,
      title: seoData.selectedTitle,
      outline: seoData.selectedOutline ? `${seoData.selectedOutline.slice(0, 50)}...` : null,
      keywords: seoData.selectedKeywords,
      images: seoData.selectedImages?.length || 0
    });
    
    // Automatically trigger content generation if we have required data but no content
    if (!seoData.generatedContent && 
        seoData.selectedTitle && 
        (seoData.selectedOutline || seoData.outline) && 
        seoData.selectedKeywords?.length > 0 &&
        !isGenerating) {
      console.log("Auto-triggering content generation");
      onRegenerateContent();
    }
    
    // Check if content has repetitive placeholders
    if (seoData.generatedContent && 
        seoData.generatedContent.includes("This section explores key aspects of") && 
        seoData.generatedContent.match(/This section explores key aspects of/g)?.length > 2) {
      setContentError("We detected repetitive content in the generated text. Please regenerate for better quality.");
    } else {
      setContentError(null);
    }
  }, [seoData, isGenerating, onRegenerateContent]);
  
  const handleContentChange = (newContent: string) => {
    onDataChange("generatedContent", newContent);
  };
  
  const {
    linkType,
    setLinkType,
    showLinkDialog,
    setShowLinkDialog,
    externalLinks,
    internalLinks,
    isLoadingLinks,
    handleCopyToClipboard,
    handleOpenLinkDialog,
    handleAddLinks
  } = useContentGeneration({
    seoData,
    onDataChange
  });
  
  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border/40">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Generated SEO Content</h2>
          
          <ContentActionButtons 
            isGenerating={isGenerating}
            content={seoData.generatedContent}
            onCopy={handleCopyToClipboard}
            onAddLinks={handleOpenLinkDialog}
            onRegenerateContent={onRegenerateContent}
          />
        </div>
        
        {contentError && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-3 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <p className="text-sm">{contentError}</p>
          </div>
        )}
        
        <ContentDisplay 
          isGenerating={isGenerating}
          content={seoData.generatedContent}
          onRegenerateContent={onRegenerateContent}
          onContentChange={handleContentChange}
        />
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-1">
          <ChevronLeft size={16} />
          Back to Links
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
      
      <AddLinksDialog 
        isOpen={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
        linkType={linkType}
        setLinkType={setLinkType}
        internalLinks={internalLinks}
        externalLinks={externalLinks}
        isLoadingLinks={isLoadingLinks}
        onAddLinks={handleAddLinks}
      />
    </div>
  );
};

export default ContentGenerationStep;
