
import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Settings } from "lucide-react";

interface VisionChatHeaderProps {
  onShare: () => void;
  onSettings: () => void;
}

const VisionChatHeader = ({ onShare, onSettings }: VisionChatHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4 pb-2 border-b">
      <h3 className="text-lg font-medium">Vision Chat</h3>
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={onShare}
        >
          <Share2 size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={onSettings}
        >
          <Settings size={16} />
        </Button>
      </div>
    </div>
  );
};

export default VisionChatHeader;
