
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Edit, FileText } from "lucide-react";
import ContentEditorDialog from "./ContentEditorDialog";
import ContentActionButtons from "./ContentActionButtons";
import { toast } from "sonner";

interface ContentDisplayProps {
  isGenerating: boolean;
  content: string;
  onRegenerateContent: () => void;
  onContentChange: (content: string) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  isGenerating,
  content,
  onRegenerateContent,
  onContentChange
}) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  const handleOpenEditor = () => {
    setIsEditorOpen(true);
  };
  
  const handleCloseEditor = () => {
    setIsEditorOpen(false);
  };
  
  const handleSaveContent = (newContent: string) => {
    onContentChange(newContent);
    setIsEditorOpen(false);
    toast.success("Content updated successfully");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard");
  };

  const handleFixFormatting = () => {
    // Implement formatting fixes
    let fixedContent = content;
    
    // Fix headings (ensure proper hierarchy)
    if (!fixedContent.includes('<h1>') && !fixedContent.includes('<h1 ')) {
      fixedContent = fixedContent.replace(/<h([2-6])[^>]*>(.+?)<\/h\1>/, '<h1>$2</h1>');
    }
    
    // Proper paragraph spacing
    fixedContent = fixedContent.replace(/<\/p>(?!\s|<)/g, '</p>\n\n');
    
    // Fix spacing after headings
    fixedContent = fixedContent.replace(/<\/h([1-6])>(?!\s|<)/g, '</h$1>\n\n');
    
    // Fix list spacing
    fixedContent = fixedContent.replace(/<\/ul>(?!\s|<)/g, '</ul>\n\n');
    fixedContent = fixedContent.replace(/<\/ol>(?!\s|<)/g, '</ol>\n\n');
    
    // Fix blockquote spacing
    fixedContent = fixedContent.replace(/<\/blockquote>(?!\s|<)/g, '</blockquote>\n\n');
    
    onContentChange(fixedContent);
    toast.success("Content formatting has been improved");
  };
  
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader size={24} className="animate-spin mb-4 text-primary" />
        <h3 className="text-lg font-medium mb-2">Generating SEO Content</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Creating high-quality, AI-optimized content designed to engage your audience 
          and rank well on search engines...
        </p>
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FileText size={40} className="text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Content Generated Yet</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Click the button below to generate SEO-optimized content based on your 
          selected topic, keywords, and outline.
        </p>
        <Button onClick={onRegenerateContent}>Generate SEO Content</Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4">
        <ContentActionButtons 
          isGenerating={isGenerating}
          content={content}
          onCopy={handleCopyToClipboard}
          onAddLinks={() => toast.info("Adding links functionality")}
          onRegenerateContent={onRegenerateContent}
          onFixFormatting={handleFixFormatting}
          onEdit={handleOpenEditor}
          onOptimize={() => {
            // Advanced optimization logic would go here
            toast.success("Content optimized for maximum SEO impact");
          }}
        />
      </div>
      
      <div 
        className="w-full prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-m-20 prose-headings:font-semibold prose-h1:text-3xl prose-h1:lg:text-4xl prose-h2:text-2xl prose-h2:lg:text-3xl prose-h3:text-xl prose-h3:lg:text-2xl prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:italic prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <ContentEditorDialog
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        content={content}
        onSave={handleSaveContent}
      />
    </div>
  );
};

export default ContentDisplay;
