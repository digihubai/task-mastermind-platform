
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw, Loader, LinkIcon, Wand2 } from "lucide-react";
import { toast } from "sonner";

interface ContentActionButtonsProps {
  isGenerating: boolean;
  content: string;
  onCopy: () => void;
  onAddLinks: () => void;
  onRegenerateContent: () => void;
  onFixFormatting?: () => void;
}

const ContentActionButtons: React.FC<ContentActionButtonsProps> = ({
  isGenerating,
  content,
  onCopy,
  onAddLinks,
  onRegenerateContent,
  onFixFormatting
}) => {
  const handleFixFormatting = () => {
    if (onFixFormatting) {
      onFixFormatting();
    } else {
      toast.info("Formatting fix functionality is not available");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onAddLinks}
        className="gap-2"
        disabled={isGenerating || !content}
      >
        <LinkIcon size={14} />
        Add Links
      </Button>
      
      {onFixFormatting && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleFixFormatting}
          className="gap-2"
          disabled={isGenerating || !content}
        >
          <Wand2 size={14} />
          Fix Formatting
        </Button>
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onCopy}
        className="gap-2"
        disabled={isGenerating || !content}
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
  );
};

export default ContentActionButtons;
