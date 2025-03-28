
import { useState } from "react";
import { toast } from "sonner";
import { fetchInternalLinks, fetchRelatedExternalLinks, insertLinksIntoContent } from "@/services/seo";

interface UseContentGenerationProps {
  seoData: any;
  onDataChange: (field: string, value: any) => void;
}

export const useContentGeneration = ({ seoData, onDataChange }: UseContentGenerationProps) => {
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
  
  return {
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
  };
};
