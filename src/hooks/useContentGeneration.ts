
import { useState, useCallback } from "react";
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
  
  // New function to fix formatting issues in the generated content
  const handleFixFormatting = useCallback(() => {
    if (!seoData.generatedContent) {
      toast.error("No content to fix");
      return;
    }
    
    let content = seoData.generatedContent;
    
    // Fix missing spacing after headings
    content = content.replace(/<\/h[1-6]>(?!\s|<)/g, '</h$&>\n\n');
    
    // Fix missing spacing after paragraphs
    content = content.replace(/<\/p>(?!\s|<)/g, '</p>\n\n');
    
    // Fix missing spacing after lists
    content = content.replace(/<\/ul>(?!\s|<)/g, '</ul>\n\n');
    content = content.replace(/<\/ol>(?!\s|<)/g, '</ol>\n\n');
    
    // Fix missing spacing after blockquotes
    content = content.replace(/<\/blockquote>(?!\s|<)/g, '</blockquote>\n\n');
    
    // Fix missing spacing after tables
    content = content.replace(/<\/table>(?!\s|<)/g, '</table>\n\n');
    
    // Fix missing spacing after images
    content = content.replace(/<\/img>(?!\s|<)/g, '</img>\n\n');
    content = content.replace(/(<img[^>]*>)(?!\s|<)/g, '$1\n\n');
    
    // Remove excessive line breaks (more than 2)
    content = content.replace(/\n{3,}/g, '\n\n');
    
    // Ensure proper heading hierarchy (h1 before h2, etc.)
    const headingMatch = content.match(/<h([1-6])[^>]*>/);
    if (headingMatch && headingMatch[1] !== '1') {
      // If the first heading isn't h1, replace it
      content = content.replace(/<h([2-6])[^>]*>(.+?)<\/h[2-6]>/, '<h1>$2</h1>');
    }
    
    onDataChange("generatedContent", content);
    toast.success("Content formatting has been fixed");
  }, [seoData.generatedContent, onDataChange]);
  
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
    handleAddLinks,
    handleFixFormatting // New function to fix formatting
  };
};
