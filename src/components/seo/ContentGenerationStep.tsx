
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Globe } from "lucide-react";
import ContentActionButtons from "./ContentActionButtons";
import ContentDisplay from "./ContentDisplay";
import AddLinksDialog from "./AddLinksDialog";
import PublishToCMSDialog from "./PublishToCMSDialog";
import { useContentGeneration } from "@/hooks/useContentGeneration";

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
        
        <ContentDisplay 
          isGenerating={isGenerating}
          content={seoData.generatedContent}
          onRegenerateContent={onRegenerateContent}
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
